
exports.up = function(knex) {
    return knex.schema.createTable('account', table =>{
        table.string('id').primary(),
        table.string('number').notNullable();
        table.string('agency').notNullable();
        table.string('type_account').notNullable();
        table.decimal('overdraft')

        table.string('client_id')
            .notNullable()
            .references('id')
            .inTable('client')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('account');
};
