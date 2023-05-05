const { Model, DataTypes} = require('sequelize');

module.exports = class CarModel extends Model {
    /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof CarModel}
   */
  static setup(sequelizeInstance) {
    CarModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            km: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            air: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            passenger: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                  min: 1,
                },
            },
            transmission: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            img: {
                type: DataTypes.STRING,
            },        
        },
        {
            sequelize: sequelizeInstance,
            modelName: 'Car',
            underscored: true,
            initialAutoIncrement: 1,
            paranoid: true,
        },
    );
    return CarModel;
  }
}