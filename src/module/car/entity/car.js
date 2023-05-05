module.exports = class Car {
    /**
     * @param {number} id
     * @param {string} brand
     * @param {string} model
     * @param {number} km
     * @param {number} year
     * @param {string} color
     * @param {string} air
     * @param {string} passenger
     * @param {string} transmission
     * @param {string} price
     * @param {string} img
     * @param {string} reservations
     * @param {string} creationDate
     * @param {string} updatedDate
     */
    constructor(
        id,
        brand,
        model,
        km,
        year,
        color,
        air,
        passenger,
        transmission,
        price,
        img,
        reservations,
        creationDate,
        updatedDate,
    ) {
        this.id = id;
        this.brand = brand,
        this.model = model;
        this.km = km;
        this.year = year;
        this.color = color;
        this.air = air;
        this.passenger = passenger;
        this.transmission = transmission;
        this.price = price;
        this.img = img;
        this.reservations = reservations;
        this.creationDate = creationDate;
        this.updatedDate = updatedDate;
    }
}

