const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();
const mongoose = require('mongoose');

const port = 3001 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const connectionString = process.env.DB;

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => {
		console.log('Connected to Mongo Database!');
	});

app.listen(port, () => {
	console.log(`listening on Port ${port}🚀`);
});
