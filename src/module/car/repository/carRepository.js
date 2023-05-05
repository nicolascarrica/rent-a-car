const CarNotFoundError = require('./error/carNotFoundError');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');

const { fromModelToEntity } = require('../mapper/carMapper');

module.exports = class CarRepository {
    /**
     * @param {typeof import('../model/carModel')} carModel
     */
    constructor(carModel) {
        this.carModel = carModel;
    }

    /**
     * @param {import('../entity/car')} car
     */

    async save(car) {
        let carModel;

        const buildOptions = { isNewRecord: !car.id };
        carModel = this.carModel.build(car, buildOptions);

        carModel = await carModel.save();

        return fromModelToEntity(carModel);
    }

    /**
     * @param {import('../entity/car')} car
     * @returns {Promise<Boolean>}  devuelve true si se borró algo, false si no se borró nada.
     */

    async delete(car){
        if (!car || !car.id){
            throw new CarIdNotDefinedError('The car id is not defined');
        }
        return Boolean(await this.carModel.destroy({ where: { id: car.id } })); 
    }

    /**
     * @param {Number} id
     * @param {Promise<import('../entity/car')>}
     */
    async getById(id) {
        const carModel = await this.carModel.findByPk(id);

        if (carModel === undefined) {
            throw new CarNotFoundError(`Car with ID not found: ${id}`);
        }
        return fromModelToEntity(carModel);
    }
    /**
     * @param {import('../entity/car')} car
     * @returns {Promise<Boolean>}
     */

    async getAll() {
        const cars = await this.carModel.findAll();
        const carsAll = cars.map((car) => fromModelToEntity(car));
        return carsAll;
    }

};