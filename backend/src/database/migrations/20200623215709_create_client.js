
exports.up = function(knex) {
   return knex.schema.createTable('client', function(table){
        table.string('id').primary(),
        table.string('name').notNullable();
        table.string('document').notNullable();
        table.string('type').notNullable();
        table.string('score').notNullable();
    })
};

exports.down = function(knex) {
   return knex.schema.dropTable('client');
};
