
exports.up = function(knex) {
    return knex.schema.createTable('card', function(table){
        table.increments('id').primary(),
        table.decimal('limit_credit'),
       
        table.string('account_id')
            .notNullable()
            .references('id')
            .inTable('account')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('card');
};
