/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
const CarService = require('../carService');
const CarNotDefinedError = require('../error/CarNotDefinedError');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const Car = require('../../entity/car');

const repositoryMock = {
    save: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn()
};

const service = new CarService(repositoryMock);
describe('Car Service', () => {
    afterEach(() => {
        Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
    });
    describe('Save', () => {
        test('Save Car and call repository save once', () =>{
            service.save({});
            expect(repositoryMock.save).toHaveBeenCalledTimes(1)
        });
        test('Save throw Error Car Not Defined', async () => {
            await expect(service.save).rejects.toThrowError(CarNotDefinedError);
        });
    });

    describe('Delete', () => {
        test('Delete Car and call repository save once', () =>{
            service.delete(new Car({ id: 1 }));
            expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
        });
        test('Delete throw Error Car Not Defined', async () => {
            await expect(service.delete).rejects.toThrowError(CarNotDefinedError);
        });
    });

    describe('GetById', () => {
        test('Get Car and call repository save once', () =>{
            service.getById(new Car({ id: 1 }));
            expect(repositoryMock.getById).toHaveBeenCalledTimes(1)
        });
        test('Get Car throw Error Car Id Not Defined', async () => {
            await expect(service.getById).rejects.toThrowError(CarIdNotDefinedError);
        });
    });

    describe('GetAll', () => {
        test('Get All Car and call repository save once', () =>{
            service.getAll();
            expect(repositoryMock.getAll).toHaveBeenCalledTimes(1)
        });
    });

});