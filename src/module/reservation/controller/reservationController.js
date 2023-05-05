/* eslint-disable class-methods-use-this */
const { fromFormToEntity } = require('../mapper/reservationMapper');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');

module.exports = class ReservationController {
  /**
   * @param {import('../service/reservationService')} ReservationService
   * @param {import('../../car/service/carService')} CarService
   * @param {import('../../user/service/userService')} UserService
   */
  constructor(ReservationService, CarService, UserService) {
    this.reservationService = ReservationService;
    this.carService = CarService;
    this.userService = UserService;
    this.ROUTE_BASE = '/reservation';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/create`, this.create.bind(this));
    // app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/manage/pay/:id`, this.pay.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const users = await this.userService.getAll();
    const reservations = await this.reservationService.getAll();
    res.render('reservation/views/index.njk', {
      users,
      reservations,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();
    res.render('reservation/views/create.njk', {
      cars,
      users,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const reservationId = req.params.id;

    if (!reservationId) {
      throw new ReservationIdNotDefinedError();
    }
    const cars = await this.carService.getAll();
    const users = await this.userService.getAll();

    const reservation = await this.reservationService.getById(reservationId);
    res.render('reservation/views/edit.njk', {
      reservation,
      cars,
      users,
    });
  }

  // /**
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //  */
  // async view(req, res) {
  //   const { id } = req.params;
  //   if (!id) {
  //     throw new ReservationIdNotDefinedError();
  //   }

  //   const reservation = await this.reservationService.getById(id);
  //   res.render('reservation/views/view.njk', {
  //     reservation,
  //   });
  // }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const reservation = fromFormToEntity(req.body);

    const car = await this.carService.getById(reservation.carId);
    await this.reservationService.save(reservation, car);
    res.redirect('/reservation/');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async pay(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new ReservationIdNotDefinedError();
    }
    const reservation = await this.reservationService.getById(id);
    await this.reservationService.pay(reservation);
    res.redirect('/reservation/');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    const reservation = await this.reservationService.getById(id);
    await this.reservationService.delete(reservation);
    res.redirect('/reservation/');
  }
};
