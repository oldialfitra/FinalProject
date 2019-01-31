'use strict';
module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        extension: DataTypes.STRING
    }, {});
    File.associate = function(models) {
        // associations can be defined here
        // File.hasMany(models.ShareFile)
        File.belongsToMany(models.User, { through: 'ShareFile', foreignKey: 'FileId', otherKey: 'UserId' })
    };
    return File;
};