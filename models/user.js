'use strict';
module.exports = (sequelize, DataTypes) => {
    const bcrypt = require('bcrypt')
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                user.password = bcrypt.hashSync(user.password, 8)
            }
        }
    });
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};