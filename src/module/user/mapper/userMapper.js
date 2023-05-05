const User = require('../entity/user');

exports.fromModelToEntity = ({
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
}) => new User(
    Number(id),
    firstName,
    lastName,
    documentType,
    Number(documentNumber),
    nationality,
    address,
    phone,
    email,
    birthdate,
    reservations ? reservations.map(reservationMapper) : reservations,
    creationDate,
    updatedDate
);

exports.fromFormToEntity = ({
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
}) => new User(
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
);