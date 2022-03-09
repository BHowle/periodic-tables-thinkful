const router = require('express').Router({ mergeParams: true });
const controller = require('./tables.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/:tableId/seat')
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/:tableId")
  .get(controller.read)
  .all(methodNotAllowed)

router
  .route('/')
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;