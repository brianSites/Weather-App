var lat;

var long;

var position;

var api;

var data;

var proxy = "https://cors-anywhere.herokuapp.com/";

if (navigator.geolocation) {

	navigator.geolocation.getCurrentPosition(position => {

		lat = position.coords.latitude;

		long = position.coords.longitude;

		api = `${proxy}https://api.darksky.net/forecast/9d4a472ce2d997a8a3dcc2fcec18b397/${lat},${long}`;

		$.ajax({

			url: api,

			type: "GET",

			success: result => {

				load(result);

			},

			error: error => {

				console.log(`Error ${error}`);

			}

		})

	});

} else {

	alert("Your browser does not support navigation.geolocation");

}

function writeData (data) {

	$("#topbar-timezone").html(data.timezone.replace("_", " "));

	$("#temperature-degree-number").html(data.currently.temperature);

	$("#temperature-degree-type").html("F");

	$("#description-string").html(data.currently.summary);

}

function setIcon (iconName) {

	var skycons = new Skycons({ "color": "white" })

	skycons.add("topbar-icon", iconName);

	skycons.play();

}

function load (data) {
	
	setIcon(data.currently.icon);

	writeData(data);

	console.log(data);

}

load();