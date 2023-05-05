const { fromFormToEntity } = require('../mapper/userMapper');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');

module.exports = class UserController{
    /**
     * @param {import('../service/userService')} UserService
     */
    constructor(UserService) {
        this.userService = UserService;
        this.ROUTE_BASE = '/user';
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
        app.post(`${ROUTE}/save`, this.save.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async index(req, res) {
        const users = await this.userService.getAll();
        res.render('user/views/index.njk',{
            users,
        });
    }

    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async create(req, res) {
        res.render('user/views/create.njk');
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async view(req, res) {
        const { id } = req.params;
        if (!id) {
          throw new UserIdNotDefinedError();
        }
        const user = await this.userService.getById(id);
        res.render('user/views/view.njk', {
          user,
        });
    }

    async edit(req, res) {
        const { id } = req.params;
        if(!id) {
            throw new UserIdNotDefinedError();
        }
        const user = await this.userService.getById(id);
        res.render('user/views/edit.njk', {
            user,
        });
    }

    async confirmDelete(req, res) {
        const  { id } = req.params;
        if(!id) {
            throw new UserIdNotDefinedError();
        }
        const user = await this.userService.getById(id);
        res.render('user/views/delete.njk', { id: user.id });

    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async delete(req, res) {
        const { id }= req.params;
        const user = await this.userService.getById(id);
        await this.userService.delete(user);
        res.redirect('/user');
    }


    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async save(req, res) {
        const user = fromFormToEntity(req.body);
        await this.userService.save(user);
        res.redirect('/user/');
    }


}

