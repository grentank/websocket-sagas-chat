const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message }) {
      this.hasMany(Message, { foreignKey: 'authorId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    hashpass: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
