'use strict';
const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports = (sequelize, DataTypes) => {
    const bcrypt = require('bcryptjs')
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Wrong E-mail'
                },
                isUnique(value) {
                    return User.findOne({
                            where: {
                                email: value,
                                id: {
                                    [Op.ne]: this.id
                                }
                            }
                        })
                        .then(function(data) {
                            if (data !== null) {
                                throw new Error(`Duplicated Email`)

                            }
                        })
                        .catch(function(err) {
                            throw new Error(err)
                        })
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                // let salt = bcrypt.genSalt(10)
                user.password = bcrypt.hashSync(user.password, 8);
            }
        }
    });
    User.associate = function(models) {
        // associations can be defined here
        User.belongsToMany(models.File, { through: 'ShareFile', foreignKey: 'UserId', otherKey: 'FileId' })
    };
    return User;
};