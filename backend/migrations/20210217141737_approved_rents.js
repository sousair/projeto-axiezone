exports.up = function (knex, Promisse) {
    return knex.schema.createTable('approved_rent', table => {
        table.integer('id').primary()
        table.integer('teamId').references('id').inTable('teams').notNull()
        table.integer('playerId').references('id').inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('approved_rent')
};