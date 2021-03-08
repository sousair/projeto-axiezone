module.exports = app => {

    const { notExists } = app.api.validation

    getCard = part => {
        return app.db('cards')
            .select('name', 'type', 'cost', 'cardName', 'damage', 'shield', 'description', 'imgUrl')
            .where({ name: part.name, type: part.type })
            .first()
    }

    getTeamCards = async team => {
        const newAxiesPromises = await team.axies.map(async axie => {
            const newPartsPromises = axie.parts.map(async part => {
                return await getCard(part)
            })

            await Promise.all(newPartsPromises).then(values => axie.parts = values)

            return axie
        })

        await Promise.all(newAxiesPromises).then(axiesArray => team.axies = axiesArray)
        
        return team
    }

    saveCards = async (req, res) => {
        app.db.insert(req.body.cards)
            .into('cards')
            .then(_ => res.status(204).send())
            .catch(error => res.status(500).send(error))
    }


    saveCard = async (req, res) => {
        const card = { ...req.params }
        try {
            const cardFromDataBase = app.db('cards')
                .where({ name: card.name, type: card.type })
                .first()

            notExists(cardFromDataBase, 'Carta não existente no banco de dados')
        } catch (msg) {
            res.status(400).send(msg)
        }

        app.db('cards')
            .update(card)
            .where({ name: card.name, type: card.type })
            .then(_ => res.status(200).send())
            .catch(error => res.satus(500).send(error))

    }

    return { saveCards, saveCard, getTeamCards }
}