exports.up = function(knex) {
    return knex.schema.createTable('cards', table => {
        // table.string('name').notNull()
        table.string('name').notNull()
        table.string('type').notNull()
        table.integer('cost').notNull()
        table.string('cardName').notNull()
        table.integer('damage').notNull()
        table.integer('shield').notNull()
        table.string('description').notNull()
        table.string('imgUrl').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cards')
};
