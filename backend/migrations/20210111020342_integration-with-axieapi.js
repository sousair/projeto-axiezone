exports.up = function(knex) {
  return knex.schema.table('teams', table => {
      table.dropColumn('axie1id')
      table.dropColumn('axie2id')
      table.dropColumn('axie3id')
})
};

exports.down = function(knex) {
  // Sem necessidade de regredir a tabela
};
