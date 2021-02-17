exports.up = function(knex) {
    return knex.schema.table('rent_solicitations', table => {
        table.dropColumn('status')
  })
  };
  
  exports.down = function(knex) {
    // Sem necessidade de regredir a tabela
  };  