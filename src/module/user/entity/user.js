module.exports = class User {
    /**
     * @param {number} id
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} documentType
     * @param {number} documentNumber
     * @param {string} nationality
     * @param {string} address
     * @param {string} phone
     * @param {string} email
     * @param {string} birthdate
     * @param {string} reservations
     * @param {string} creationDate
     * @param {string} updatedDate
     */

    constructor (
        id,
        firstName,
        lastName,
        documentType,
        documentNumber,
        nationality,
        address,
        phone,
        email,
        birthdate,
        reservations,
        creationDate,
        updatedDate
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.nationality = nationality;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.birthdate = birthdate;
        this.reservations = reservations
        this.creationDate = creationDate;
        this.updatedDate = updatedDate;
    }


}