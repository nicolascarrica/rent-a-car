require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const nunjucks = require('nunjucks');


const configureDependencyInjection = require('./config/di');
const { init: initCarModule } = require('./module/car/module');
const { init: initUserModule} = require('./module/user/module');
const { init: initReservationModule} = require('./module/reservation/module');

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
    autoescape: true,
    express: app,
  });

const container = configureDependencyInjection(app);

initCarModule(app, container);
initUserModule(app, container);
initReservationModule(app, container)

/**
 * @type {import('./module/car/controller/carController')} carController
 */

const carController = container.get('CarController');
app.get('/', carController.index.bind(carController));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
