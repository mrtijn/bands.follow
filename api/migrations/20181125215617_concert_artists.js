
exports.up = function(knex, Promise) {
    return knex.schema.createTable('concert_artists', (t) => {
        t.integer('concert_id').notNullable();
        t.integer('artist_id').notNullable();
    });
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('concert_artists');
};
