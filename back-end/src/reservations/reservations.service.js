const knex = require("../db/connection");

const tableName = "reservations";

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
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

function update(newData, reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update(newData)
    .returning("*")
    .then((data) => data[0]);
}

function updateStatus(updatedReservation) {
  return knex(tableName)
  .select('*')
  .where({ reservation_id: updatedReservation.reservation_id })
  .update({ status: updatedReservation.status })
  .returning('*');
}

module.exports = {
  create,
  list,
  listByDate,
  read,
  update,
  updateStatus
};
