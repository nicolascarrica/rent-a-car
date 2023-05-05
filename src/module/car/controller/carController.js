/* eslint-disable class-methods-use-this */
const { fromFormToEntity } = require('../mapper/carMapper');
const CarIdNotDefinedError = require('./error/CarIdNotDefinedError');

module.exports = class CarController {
    /**
     * @param {import('../service/carService')} CarService
     */
    constructor(uploadMiddleware, CarService) {
        this.uploadMiddleware = uploadMiddleware;
        this.carService = CarService;
        this.ROUTE_BASE = '/car';
    }

    /**
     * @param {import('express').Application} app
     */
    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE;
        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/create`, this.create.bind(this));
        app.get(`${ROUTE}/view/:id`, this.view.bind(this));
        app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));       
        app.get(`${ROUTE}/delete/:id`, this.confirmDelete.bind(this));
        app.post(`${ROUTE}/delete/:id`, this.delete.bind(this));
        app.post(`${ROUTE}/save`, this.uploadMiddleware.single('img'), this.save.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async index(req, res) {
        const cars = await this.carService.getAll();
        res.render('car/views/index.njk',{
            cars,
        });
    }

    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async create(req, res) {
        res.render('car/views/create.njk');
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async view(req, res) {
        const { id } = req.params;
        if (!id) {
          throw new CarIdNotDefinedError();
        }
        const car = await this.carService.getById(id);
        res.render('car/views/view.njk', {
          car,
        });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async edit(req, res) {
        const { id } = req.params;
        if(!id) {
            throw new CarIdNotDefinedError();
        }
        const car = await this.carService.getById(id);
        res.render('car/views/edit.njk', {
            car,
        });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async confirmDelete(req, res) {
        const  { id } = req.params;
        if(!id) {
            throw new CarIdNotDefinedError();
        }
        const car = await this.carService.getById(id);
        res.render('car/views/delete.njk', { id: car.id });

    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async delete(req, res) {
        const { id }= req.params;
        const car = await this.carService.getById(id);
        await this.carService.delete(car);
        res.redirect('/car');
    }
    

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async save(req, res) {
        const car = fromFormToEntity(req.body);
        if (req.file) {
          const { path } = req.file;
          car.img = path;
        }
        await this.carService.save(car);
        res.redirect('/car/');
    }












};
