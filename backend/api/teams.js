const { userParams } = require("../configs/db")

module.exports = app => {
    const saveTeam = async (req, res) => {
        const { exists, notExists } = app.api.validation

        const team = { ...req.body }

        if(req.params.id) team.id = req.params.id

        try {
            exists(team.name, 'Nome do time não informado.')
            exists(team.type, 'Tipo/Categoria não informado.')
            exists(team.rent, 'Cobrança semanal não informada.')
            exists(team.ownerMail, 'Email do dono não informado.') // Implementar um melhor jeito de pegar o ID do dono atráves do login.
            exists(team.description, 'Adicione uma descrição para o seu time')
            exists(team.cashPolitic, 'Informe como será feita a cobrança e quando será o seu dia')
            exists(team.devolutionPolitic, 'Informe como será feita a devolução do time')
            exists(team.accountId, 'Infome a carteira da conta com os axies')
            exists(team.axie1id, 'Informe o ID de todos os Axies')
            exists(team.axie2id, 'Informe o ID de todos os Axies')
            exists(team.axie3id, 'Informe o ID de todos os Axies')

            const teamFromDataBase = await app.db('teams')
                .where({ accountId: team.accountId })
                .first()
            
            if(!team.id) notExists(teamFromDataBase, 'Essa carteira já cadastrada no sistema')

            const ownerFromDataBase = await app.db('users')
                .where({ email: team.ownerMail })
                .first()
            
            delete team.ownerMail

            team.ownerId = parseInt(ownerFromDataBase.id)

        } catch (msg) {
            res.status(400).send(msg)
        }

        if(team.id) {
            app.db('teams')
                .update(team)
                .where({ id: team.id })
                .then(_ => res.status(204).send())
                .catch(error => res.status(500).send(error))
        } else {
            app.db('teams')
                .insert(team)
                .then(_ => res.status(204).send())
                .catch(error => res.status(500).send(error))
        }

    }

    const getAllTeams = (req, res) => {
        app.db('teams')
            .then(teams => res.json(teams))
            .catch(error => res.status(500).send(error))
    }

    const getTeamsWithoutPlayer = (req, res) => {
        app.db('teams')
            .whereNull('playerId')
            .then(teams => res.json(teams))
            .catch(error => res.status(500).send(error))
    }

    const getTeamById = (req, res) => {

        if(req.body.byOwnerId) {
            app.db('teams')
                .where({ ownerId: req.params.id })
                .first()
                .then(teams => res.json(teams))
        } else {
            app.db('teams')
                .where({ id: req.params.id })
                .first()
                .then(team => res.json(team))
        }
    }

    return { saveTeam, getAllTeams, getTeamById, getTeamsWithoutPlayer }
}