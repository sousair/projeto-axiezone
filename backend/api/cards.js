module.exports = app => {

    const { exists } = app.api.validation

    saveCards = async (req, res) => {
        app.db.insert(req.body.cards)
            .into('cards')
            .then(_ => res.status(204).send(_))
            .catch(error => res.status(500).send(error)) 
    }

    getCard = async (req, res) => {

        const card = { ...req.params }

        app.db('cards')
            .select('name', 'type', 'cost', 'cardName', 'damage', 'shield', 'description', 'imgUrl')
            .where({ name: card.name, type: card.type })
            .first()
            .then(card => res.json(card))
    }

    return { saveCards, getCard }
}