const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const stat = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory for static files
app.use(express.static(stat));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Saurav Kumar',
	});
});
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Saurav Kumar',
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Saurav Kumar',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		res.send('please provide a valid address');
	} else {
		geocode(
			req.query.address,
			(error, { latitude, longitude, location } = {}) => {
				if (error) {
					return res.send({ error });
				}
				console.log('error', error);
				console.log('data', { latitude, longitude, location });

				forecast(
					latitude,
					longitude,
					location,
					(error, { location, description, temp, humidity, cloud, city }) => {
						if (error) {
							return res.send({ error });
						}
						console.log('error', error);
						console.log(location);
						res.send({ location, description, temp, humidity, cloud, city });
					}
				);
			}
		);
	}
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: '404',
		error: 'Help article not found',
		name: 'saurav kumar',
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title: '404',
		error: 'page not found',
		name: 'saurav kumar',
	});
});

app.listen(port, () => {
	console.log('server is listening');
});
