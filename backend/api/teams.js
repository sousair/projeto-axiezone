module.exports = app => {
    const saveTeam = async (req, res) => {
        const { exists, notExists } = app.api.validation

        const team = { ...req.body }

        if (req.params.id) team.id = req.params.id

        try {
            exists(team.name, 'Nome do time não informado.')
            exists(team.type, 'Tipo/Categoria não informado.')
            exists(team.rent, 'Cobrança semanal não informada.')
            exists(team.description, 'Adicione uma descrição para o seu time')
            exists(team.cashPolitic, 'Informe como será feita a cobrança e quando será o seu dia')
            exists(team.devolutionPolitic, 'Informe como será feita a devolução do time')
            exists(team.accountId, 'Informe a carteira da conta com os axies')

            const teamFromDataBase = await app.db('teams')
                .where({ accountId: team.accountId })
                .first()

            if (!team.id) notExists(teamFromDataBase, 'Essa carteira já cadastrada no sistema')

            team.ownerId = req.user.id
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (team.id) {
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
            .orderBy('id')
            .then(teams => res.json(teams))
            .catch(error => res.status(500).send(error))
    }

    const getTeamsWithoutPlayer = (req, res) => {
        app.db('teams')
            .whereNull('playerId')
            .orderBy('id')
            .then(teams => res.json(teams))
            .catch(error => res.status(500).send(error))
    }

    const getTeamsByOwnerId = (req, res) => {
        app.db('teams')
            .where({ ownerId: req.user.id })
            .orderBy('id')
            .then(teams => res.status(200).json(teams))
            .catch(error => res.status(500).send(error))
    }

    const getTeamById = (req, res) => {
        app.db('teams')
            .where({ id: req.params.id })
            .first()
            .then(team => app.api.usingAxieInfinityAPI.getAxiesTeam(team, team.accountId))
            .then(async team => await app.api.cards.getTeamCards(team))
            .then(team => res.status(200).json(team))
            .catch(error => res.status(500).send(error))
    }

    return { saveTeam, getAllTeams, getTeamById, getTeamsByOwnerId, getTeamsWithoutPlayer }
}