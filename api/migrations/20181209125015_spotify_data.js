
exports.up = function (knex, Promise) {
    return knex.schema.createTable('spotify_data', (t) => {
        t.string('spotify_id').unique().primary();
        t.string('name').notNullable();
        t.string('uri').notNullable();
        t.string('image').notNullable();
    });
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('spotify_data');
};
