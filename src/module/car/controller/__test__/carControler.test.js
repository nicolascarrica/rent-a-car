/* eslint-disable no-undef */
const CarController = require('../carController');
const createTestCar = require('./cars.fixture');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const Car = require('../../entity/car');

const serviceMock = {
    save: jest.fn(),
    delete: jest.fn(() => Promise.resolve(true)),
    getById: jest.fn((id) => createTestCar(id)),
    getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestCar(id + 1))),
}

const uploadMock ={
    single: jest.fn(),
};
const reqMock = {
    params: { id:1 },
};
const resMock = {
    render: jest.fn(),
    redirect: jest.fn(),
};
const mockController = new CarController(uploadMock, serviceMock);

describe('Car controller', () => {
    afterEach(() => {
        Object.values(serviceMock).forEach((mockFn) => mockFn.mockClear());
        Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
    });
    describe('Test routes', () => {
        test('Test each route', () => {
            const app = {
                get: jest.fn(),
                post: jest.fn(),
            };
            mockController.configureRoutes(app);
            expect(app.get).toHaveBeenCalled();
            expect(app.post).toHaveBeenCalled();
            expect(uploadMock.single).toHaveBeenCalled();
        });
    });
    describe('index', () => {
        test('Index render page index.njk', async () => {
            const cars = serviceMock.getAll();
            await mockController.index(reqMock, resMock);
            expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
            expect(resMock.render).toHaveBeenCalledTimes(1);
            expect(resMock.render).toHaveBeenCalledWith('car/views/index.njk', {
                cars,
            });
        });
    });
    describe('Create', () =>{
        test('Create should render create.njk', async () => {
            await mockController.create(reqMock, resMock);
            expect(resMock.render).toHaveBeenCalledTimes(1)
            expect(resMock.render).toHaveBeenCalledWith('car/views/create.njk')
        });
    });
    describe('View', () =>{
        test('View should reder view.njk', async () => {
            const car = serviceMock.getById(1);
            await mockController.view(reqMock, resMock);
            expect(serviceMock.getById).toHaveBeenCalledTimes(2);
            expect(resMock.render).toHaveBeenCalledTimes(1);
            expect(resMock.render).toHaveBeenCalledWith('car/views/view.njk', {
                car,
            });
        });
        test('View throw Error Car Id Not Defined', async () => {
            const requestWhitoutId = { params: { id: undefined } };
            await expect(mockController.view(requestWhitoutId, resMock)).rejects.toThrowError(
                CarIdNotDefinedError,
            );
        });
    });
    describe('Edit', () => {
        test('Edit should render edit.njk', async () => {
            const car = serviceMock.getById(1);
            await mockController.edit(reqMock, resMock);
            expect(serviceMock.getById).toHaveBeenCalledTimes(2);
            expect(resMock.render).toHaveBeenCalledTimes(1);
            expect(resMock.render).toHaveBeenCalledWith('car/views/edit.njk', {
                car,
            });
        });
        test('Edit throw Error Car Id Not Defined', async () => {
            const requestWhitoutId = { params: { id: undefined } };
            await expect(mockController.edit(requestWhitoutId, resMock)).rejects.toThrowError(
                CarIdNotDefinedError,
            );
        });
    });
    describe('Confirm Delete', () => {
        test('Confirm Delete should render delete.njk', async () => {
            const car = serviceMock.getById(1);
            await mockController.confirmDelete(reqMock, resMock);
            expect(serviceMock.getById).toHaveBeenCalledTimes(2);
            expect(resMock.render).toHaveBeenCalledTimes(1);
            expect(resMock.render).toHaveBeenCalledWith('car/views/delete.njk', {
                id: car.id 
            });
        });
        test('Edit throw Error Car Id Not Defined', async () => {
            const requestWhitoutId = { params: { id: undefined } };
            await expect(mockController.confirmDelete(requestWhitoutId, resMock)).rejects.toThrowError(
                CarIdNotDefinedError,
            );
        });
    });
    describe('Delete', () => {
        test('Delete should call delete method and redirect to /car', async () =>{
            const FAKE_CAR = new Car({ id:1 });
            serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CAR));
            const redirectMock = jest.fn();

            await mockController.delete({ params: { id: 1 } }, { redirect: redirectMock });
            expect(serviceMock.delete).toHaveBeenCalledTimes(1);
            expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_CAR);

            expect(redirectMock).toHaveBeenCalledTimes(1);
            expect(redirectMock).toHaveBeenCalledWith('/car');
        });
    });
    describe('Save', () => {
        test('save should call the save method', async () =>{
            const formMock = {
                body: {
                    id:1,
                    brand:'VolskWagen',
                    model: 'Gol Trend',
                    km: '50220',
                    year: '2017',
                    color: 'Red',
                    air: 'Yes',
                    passenger: '5',
                    transmission: 'Manual',
                    price: '12000',
                },
                file:{
                    path: '/img/1677377494262.jpg'
                },
            };
            await mockController.save(formMock, resMock);
            expect(serviceMock.save).toHaveBeenCalledTimes(1);
            expect(serviceMock.save).toHaveBeenCalledWith(expect.any(Car));
            expect(serviceMock.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    img: '/img/1677377494262.jpg',
                }),
            );
            const savedCar = serviceMock.save.mock.calls[0][0];
            expect(savedCar.id).toBe(1);
            expect(savedCar.brand).toBe('VolskWagen');
            expect(savedCar.model).toBe('Gol Trend');
            expect(savedCar.km).toBe(50220);
            expect(savedCar.year).toBe(2017);
            expect(savedCar.color).toBe('Red');
            expect(savedCar.air).toBe('Yes');
            expect(savedCar.passenger).toBe(5);
            expect(savedCar.transmission).toBe('Manual');
            expect(savedCar.price).toBe(12000);
            expect(resMock.redirect).toHaveBeenCalledTimes(1);
            expect(resMock.redirect).toHaveBeenCalledWith('/car/');



        });
    });   
});


