const sequelize = require('./index')
const { DataTypes } = require('sequelize');

const result = sequelize.define("result", {
    Studentname: DataTypes.STRING,
    RollNo: {
        type: DataTypes.STRING,
        primaryKey: true
    },

    DateOfBirth: DataTypes.STRING,
    EmailId: DataTypes.STRING,
    Score: DataTypes.INTEGER

}, {
    timestamps: false
});

module.exports = result;

