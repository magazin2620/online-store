require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { routes } = require('./routes');
const sequelize = require('./db');
const models = require('./models');

// db
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .then(async () => await sequelize.sync())
  .catch((error) => {
    console.log('Unable to connect to the database:', error);
  });

// app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach((item) => {
  app.use(`/api/${item}`, require(`./routes/${item}`));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });
}

// server
const PORT = process.env.PORT || 3000;
http.createServer({}, app).listen(PORT);
console.log(`Server running at port: ${PORT}`);
