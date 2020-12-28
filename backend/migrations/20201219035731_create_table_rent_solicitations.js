exports.up = function (knex, Promisse) {
    return knex.schema.createTable('rent_solicitations', table => {
        table.increments('id').primary()
        table.integer('teamId').references('id').inTable('teams').notNull()
        table.integer('playerId').references('id').inTable('users').notNull()
        table.string('status').notNull().defaultTo('Em analise')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('rent_solicitations')
};
