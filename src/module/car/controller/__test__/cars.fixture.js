// eslint-disable-next-line import/no-unresolved
const Car = require('../../entity/car');

module.exports = function createTestCar(id) {
    return new Car(
        id,
        'VolskWagen',
        'Gol Trend',
        '50220',
        '2017',
        'Red',
        'Yes',
        '5',
        'Manual',
        '12000',
        '/img/1677377494262.jpg',
        undefined,
        undefined,
    );
}