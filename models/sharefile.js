'use strict';
module.exports = (sequelize, DataTypes) => {
    const ShareFile = sequelize.define('ShareFile', {
        UserId: DataTypes.INTEGER,
        FileId: DataTypes.INTEGER,
        limit: DataTypes.INTEGER
    }, {});
    ShareFile.associate = function(models) {
        // associations can be defined here
        ShareFile.belongsTo(models.User)
        ShareFile.belongsTo(models.File)
    };
    return ShareFile;
};