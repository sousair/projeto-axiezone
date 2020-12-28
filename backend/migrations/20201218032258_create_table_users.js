exports.up = function (knex, Promisse) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.string('nickname').notNull().unique()
        table.string('cell').notNull()
        table.string('walletAdress').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.boolean('hasTeam').notNull().defaultTo(false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};