exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.integer('teamId').references('id').inTable('teams')
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('teamId')
    })
};
