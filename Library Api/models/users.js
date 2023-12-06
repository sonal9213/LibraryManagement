const sequelize = require('./index')
const { DataTypes } = require('sequelize');
const users = sequelize.define("usersTable", {

    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: DataTypes.STRING,
    teacher: DataTypes.BOOLEAN


}, {
    timestamps: false
})

module.exports=users;