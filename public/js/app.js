console.log('i m running');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageThree = document.getElementById('message-3');
const messageFour = document.getElementById('message-4');
const messageFive = document.getElementById('message-5');
const messageSix = document.getElementById('message-6');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	console.log(location);
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	messageThree.textContent = '';
	messageFour.textContent = '';
	messageFive.textContent = '';
	messageSix.textContent = '';

	fetch(`/weather?address=${location}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				messageOne.textContent = data.error;
			} else {
				console.log(data);
				console.log(data.location);
				messageOne.textContent = data.location;
				messageTwo.textContent =
					"It's currently " + data.description + ' in ' + data.location;
				messageThree.textContent =
					'Temperature outside is ' + data.temp + '°celcius';
				messageFour.textContent = 'Humidity outside is ' + data.humidity + '%';
				messageFive.textContent = 'Cloud outside is ' + data.cloud + '%';
				messageSix.textContent =
					'Showing result for city ' + '♥' + data.city + '♥';
			}
		});
	});
});
