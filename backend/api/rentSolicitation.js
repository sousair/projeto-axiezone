module.exports = app => {

    const makeSolicitation = async (req, res) => {
        
        const { exists, notExists } = app.api.validation
        
        const solicitation = { ...req.body }
        
        try {
            // Requisitos para a solicitação ser feita.
            exists(solicitation.teamId, 'Informe o ID do time desejado.')

            solicitation.playerId = req.user.id
            
            // Verificar se o player já não possui time.
            if(req.user.hasTeam === true) throw 'Player já possui time'

            // Date.now() nos dá o dia de hoje em milisegundos
            // e precisamos ter um cooldown de 15 dias para
            // o player assumir outro time.
            const twoWeeksInMiliSeconds = 1296000000

            if(Date.now() < (parseInt(playerFromDataBase.cooldown) + twoWeeksInMiliSeconds)) throw 'Player foi distituido de um time recentemente'
            
            // Verificar se a solicitação não está sendo feita pelo próprio dono do time.
            const teamFromDataBase = await app.db('teams')
                .where({ id: solicitation.teamId })
                .first()

            if(teamFromDataBase.ownerId == solicitation.playerId) throw 'Você não pode alugar seu próprio time'

            // Verificar se o player já não fez uma requisição para o mesmo time.
            const solicitationFromDataBase = await app.db('rent_solicitations')
                .where({ playerId: solicitation.playerId, teamId: solicitation.teamId })
                .first()
            
            notExists(solicitationFromDataBase, 'Solicitação para este time já realizada.') 

        } catch(msg) {
            return res.status(400).send(msg)
        }

        // Inserir a Solicitação no banco de dados.
        app.db('rent_solicitations')
            .insert(solicitation)
            .then(_ => res.status(204).send('Solicitação realizada com sucesso'))
            .catch(error => res.status(500).send(error))
    }

    const aproveSolicitation = async (req, res) => {

        const solicitationFromDataBase = await app.db('rent_solicitations')
            .where({ id: req.params.id })
            .first()

        // Apagar as solicitações já feitas para aquele time
        await app.db('rent_solicitations')
            .whereNot({ playerId: solicitationFromDataBase.playerId })
            .andWhere({ teamId: solicitationFromDataBase.teamId }).del()
            .catch(error => res.status(500).send(error))
        
        // Apagar as solicitações já feitas pelo player à outros times
        await app.db('rent_solicitations')
            .whereNot({ teamId: solicitationFromDataBase.teamId })
            .andWhere({ playerId: solicitationFromDataBase.playerId }).del()
            .catch(error => res.status(500).send(error))

        // Setar o playerId do team com o Id do player que fez a solicitação
        await app.db('teams')
            .update({ playerId: solicitationFromDataBase.playerId})
            .where({ id: solicitationFromDataBase.teamId })
            .catch(error => res.status(500).send(error))
        
        // Setar o status do player como já tem time
        await app.db('users')
            .update({ hasTeam: true })
            .where({ id: solicitationFromDataBase.playerId })
            .catch(error => res.status(500).send(error))

        // Atualizar a solicitação para aprovada
        solicitationFromDataBase.status = 'Aprovada!'

        app.db('rent_solicitations')
            .update(solicitationFromDataBase)
            .where({ id: req.params.id })
            .then(_ => res.status(204).send('Solicitação aprovada'))
            .catch(error => res.status(500).send(error))
    }

    const cancelSolicitation = async (req, res) => {

        const solicitationFromDataBase = await app.db('rent_solicitations')
            .where({ id: req.params.id })
            .first()

        // Caso a solicitação já tenha sido aprovada, e o player já está em posse do time,
        // temos que destitiur o player, adicionar o cooldown de 15 dias para outra soliciatação
        // e deixar o time sem playerId
        if(solicitationFromDataBase.status == 'Aprovada!') {
            await app.db('users')
                .update({ hasTeam: false, cooldown: Date.now()})
                .where({ id: solicitationFromDataBase.playerId })
                .catch(error => res.status(500).send(error))

            await app.db('teams')
                .update({ playerId: null })
                .where({ id: solicitationFromDataBase.teamId })
                .catch(error => res.status(500).send(error))

            await app.db('rent_solicitations')
                .where({ id: req.params.id }).del()
                .then(_ => res.status(204).send('Solicitação cancelada'))
                .catch(error => res.status(500).send(error))
            
        } else {
            await app.db('rent_solicitations')
                .where({ id: req.params.id }).del()
                .then(_ => res.status(204).send('Solicitação cancelada'))
                .catch(error => res.status(500).send(error))
        }

    }

    const getAllSolicitations = (req, res) => {
        app.db('rent_solicitations')
            .then(solicitations => res.json(solicitations))
            .catch(error => res.status(500).send(error))
    }

    return { makeSolicitation, aproveSolicitation, cancelSolicitation, getAllSolicitations }
}