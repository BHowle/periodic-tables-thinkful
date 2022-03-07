const knex = require("../db/connection");

const tableName = "reservations";

function create(newReservation) {
  return knex('reservations').insert(newReservation).returning('*');
}

function list() {
  return knex(tableName).select("*").orderBy("reservation_time");
}
function listByDate(reservation_date) {
  return knex(tableName)
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}
function read(reservation_id) {
  return knex(tableName)
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}
module.exports = {
  create,
  list,
  listByDate,
  read,
};
