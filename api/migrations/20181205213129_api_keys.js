
exports.up = function (knex, Promise) {
    return knex.schema.createTable('api_keys', (t) => {
        t.string('name').notNullable();
        t.string('access_token').notNullable();
        t.string('refresh_token').notNullable();
    });
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('api_keys');
};
