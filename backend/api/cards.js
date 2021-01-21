module.exports = app => {

    const { exists, notExists } = app.api.validation

    saveCards = async (req, res) => {
        app.db.insert(req.body.cards)
            .into('cards')
            .then(_ => res.status(204).send())
            .catch(error => res.status(500).send(error))
    }

    getCard = async (req, res) => {
        const card = { ...req.params }
        app.db('cards')
            .select('name', 'type', 'cost', 'cardName', 'damage', 'shield', 'description', 'imgUrl')
            .where({ name: card.name, type: card.type })
            .first()
            .then(card => res.status(200).json(card))
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

    return { saveCards, saveCard, getCard }
}