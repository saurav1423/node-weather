const request = require('request');

const forecast = (lat, long, loc, callback) => {
	const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7f5932c1c23169437430cb76a55554e8`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect to server', undefined);
		} else if (body.message) {
			callback('unable to find location', undefined);
		} else {
			const dataW = {
				location: loc,
				description: body.weather[0].description,
				temp: Math.round((body.main.temp - 273) * 10) / 10,
				humidity: body.main.humidity,
				cloud: body.clouds.all,
				city: body.name,
			};
			console.log(
				dataW.description,
				dataW.temp,
				dataW.humidity,
				dataW.cloud,
				dataW.city
			);
			callback(undefined, dataW);
		}
	});
};

module.exports = forecast;
