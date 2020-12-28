exports.up = function (knex, Promisse) {
    return knex.schema.createTable('teams', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('type').notNull()
        table.integer('rent').notNull()
        table.integer('ownerId').references('id').inTable('users').notNull()
        table.integer('playerId').unique()
        table.string('description', 1000).notNull()
        table.string('cashPolitic', 500).notNull()
        table.string('devolutionPolitic', 500).notNull()
        table.string('addInfo', 500)
        table.string('accountId').notNull()
        table.string('axie1id').notNull()
        table.string('axie2id').notNull()
        table.string('axie3id').notNull()
        table.string('imgUrl', 1000)
    })
};

exports.down = function (knex, Promisse) {
    return knex.schema.dropTable('teams')
};
