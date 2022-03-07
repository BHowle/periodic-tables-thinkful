const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  if (date) {
    res.json({ data: await service.listByDate(date) });
    console.log(date)
  } else {
    res.json({ data: await service.list() });
  }
}
function read(req, res, next){
  const { reservation } = res.locals;
  res.json({data: reservation});
}
async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({
    data: newReservation
  });
}
//Testing properties
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);
//Validation middleware
async function reservationExists(req, res, next){
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if(reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`
  });
}
function peopleIsValid(req, res, next) {
  const { people } = req.body.data;
  const isValid = Number.isInteger(people);
  if (!isValid || people < 1) {
    return next({
      status: 400,
      message: "Number of people entered is an invalid number.",
    });
  }
  next();
}
function timeIsValid(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let today = new Date();
  let resDateTime = reservation_date + " " + reservation_time;
  let resAsDate = new Date(resDateTime);

  const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (reservation_time.match(timeReg) === null) {
    return next({
      status: 400,
      message: "reservation_time is not a valid time.",
    });
  }
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: "Reservation must be between 10:30AM and 9:30PM.",
    });
  }
  if (isNaN(resAsDate.getDate())) {
    return next({
      status: 400,
      message: "reservation_date is not a valid date.",
    });
  }
  if (resAsDate < today) {
    return next({
      status: 400,
      message: "Reservation must be booked for future date.",
    });
  }
  next();
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    peopleIsValid,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
};
