const ReservationController = require('./controller/reservationController');
const ReservationService = require('./service/reservationService');
const ReservationRepository = require('./repository/reservationRepository');
const ReservationModel = require('./model/reservationModel');
/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {ReservationController} controller;
   */
  const controller = container.get('ReservationController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  ReservationController,
  ReservationService,
  ReservationRepository,
  ReservationModel,
};
