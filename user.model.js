const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(
   'dbname',
   'username',
   '',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


const User = sequelize.define("users", {
   firstName: {
     type: DataTypes.STRING,
     allowNull: false
   },
   lastName: {
     type: DataTypes.STRING,
     allowNull: false
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false
   },
   birthDate: {
     type: DataTypes.DATEONLY,
   }, 
   registrationDate: {
     type: DataTypes.DATEONLY,
   },
   ipAddress: {
     type: DataTypes.STRING,
     allowNull: false
   },  
   status: {
     type: DataTypes.ENUM('lead','demo','client'),
   }
});

sequelize.sync().then(() => {
   console.log('Users table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports=User;
