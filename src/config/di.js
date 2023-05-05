// configure DI container
const path = require('path');
const { default: DIContainer, object, use, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const {
    CarController, CarRepository, CarService, CarModel,
} = require('../module/car/module');

const {
  UserController, UserRepository, UserService, UserModel
} = require('../module/user/module');

const {
  ReservationController, ReservationService, ReservationRepository, ReservationModel,
} = require('../module/reservation/module');

function configureMainSequelizeDatabase(){
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_PATH,
    });
    return sequelize;
}

/**
 * @param {DIContainer} container
 */
function configureCarModule(container) {
    return CarModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureUserModule(container) {
  return UserModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} containe
 */
function configureReservationModel(container){
  const model = ReservationModel.setup(container.get('Sequelize'));
  model.setupAssociations(CarModel, UserModel);
  return model;
}


function configureMulter() {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, process.env.MULTER_UPLOADS_DIR);
      },
      filename(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });
  
    return multer({ storage });
  }

  /**
   * @param {DIContainer} container
   */
  function addCommonDefinitions(container) {
    container.add({
        Sequelize: factory(configureMainSequelizeDatabase),
        Multer: factory(configureMulter),
    });
  }

  /**
   * @param {DIContainer} container
   */

  function addCarModuleDefinitions(container){
    container.add ({
      CarController: object(CarController).construct(
        use('Multer'),
        use('CarService'),
      ),
      CarService: object(CarService).construct(use('CarRepository')),
      CarRepository: object(CarRepository).construct(use('CarModel')),
      CarModel: factory(configureCarModule),
    });
  }

  /**
   * @param {DIContainer} container
   */

  function addUserModuleDefinitions(container){
    container.add ({
      UserController: object(UserController).construct(
        use('UserService'),
      ),
      UserService: object(UserService).construct(use('UserRepository')),
      UserRepository: object(UserRepository).construct(use('UserModel')),
      UserModel: factory(configureUserModule),
    });
  }

  /**
   * @param {DIContainer} container
   */

  function addReservationModuleDefinitions(container) {
    container.add({
      ReservationController: object(ReservationController).construct(
        use('ReservationService'),
        use('CarService'),
        use('UserService'),
      ),
      ReservationService: object(ReservationService).construct(use('ReservationRepository')),
      ReservationRepository: object(ReservationRepository).construct(use('ReservationModel')),
      ReservationModel: factory(configureReservationModel),
    })
  }


  module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    addUserModuleDefinitions(container);
    addReservationModuleDefinitions(container);
    return container;
  }
