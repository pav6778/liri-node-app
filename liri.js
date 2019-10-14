require("dotenv").config();

let axios = require("axios")
let keys = require("./keys.js");
let Spotify = require("node-spotify-api")
let nodeArg = process.argv;
let searchTerm = process.argv[2];
var spotify = new Spotify(keys.spotify);
let input = []

// let songStr = stringy.join(" ")
for(var i = 2; i < nodeArg.length; i++) {
	if(i > 2 && i < nodeArg.length) {
		input.push(nodeArg[i])
	}
}
 input = input.join(" ")

if(searchTerm === "spotify-this-song"){
spotify.search({
	type: "track",
	query: input,
	limit: 1
}, function(err, data) {
	if(err) {
		console.log(err)
	}
	console.log(data.tracks.items)
})
}
if(searchTerm === "concert-this") {
axios({
	url:"https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp",
	method: "GET",
	limit: 1
})
.then((response) => {
	console.log(response.status)
	console.log(response.statusText)
	console.log(response.data[0].venue.name)
	console.log(response.data[0].datetime)
	console.log(response.data[0].venue.city)
	console.log(response.data[0].venue.country)
});
}