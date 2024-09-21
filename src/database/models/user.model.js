const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	return sequelize.define('user', 
  {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
    email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
    password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    adress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
    created_at: {
			type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull : true,
		},
    deleted_at: {
			type: DataTypes.DATE,
      allowNull: true
		}
	},
  {
    freezeTableName: true,
  }
  );
};