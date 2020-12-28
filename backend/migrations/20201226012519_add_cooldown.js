exports.up = function(knex, Promisse) {
    return knex.schema.table('users', table => {
        table.bigInteger('cooldown')
    })
};

exports.down = function(knex, Promisse) {
    return knex.schema.table('users', table => {
        table.dropColumn('cooldown')
    })
};
