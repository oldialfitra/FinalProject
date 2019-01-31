'use strict';
module.exports = (sequelize, DataTypes) => {
    const bcrypt = require('bcryptjs')
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                user.password = bcrypt.hashSync(user.password, 8);
            }
        }
    });
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.ShareFile)
    };
    return User;
};