
exports.up = function (knex, Promise) {
    return knex.schema.createTable('artists', (t) => {
        t.increments('id').primary();
        t.string('name').notNullable();
        t.string('spotify_id');
        t.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('artists');
};
