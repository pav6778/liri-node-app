require("dotenv").config();
let fs = require("fs");
let axios = require("axios");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let moment = require("moment");
let nodeArg = process.argv;
let searchTerm = process.argv[2];
let spotify = new Spotify(keys.spotify);
let input = [];
for(let i = 2; i < nodeArg.length; i++) {
	if(i > 2 && i < nodeArg.length) {
		input.push(nodeArg[i])
	}
}

if(searchTerm === "spotify-this-song") {
spotifyReq("spotify-this-song", input)
}
if(searchTerm === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(err, data){
		if(err){
			console.log(err)
		}
		let inputArr = data.split(",")
			if(inputArr.length === 2) {
				spotifyReq(inputArr[0],inputArr[1])
			}else if (dataArr.length === 1){
				spotifyReq(inputArr[0]);
			}
		})
	}
	input = input.join(" ")
	
	function spotifyReq(spotifyCommand, spotifySong) {
		if(spotifyCommand === "spotify-this-song"){
		if(spotifySong === undefined) {
			spotifySong = "all the small things"
		}
spotify.search({
	type: "track",
	query: spotifySong,
	limit: 1
}, function(err, data) {
	if(err) {
		console.log(err)
	}
	console.log('\n')
	console.log('-------------8&--------8&-----&8-8&-------8&------------')
	console.log('-------------8&---------------&8---8&-------------------')
	console.log('-------------8&--------8&-----&8&8&-------8&------------')
	console.log('-------------8&--------8&-----&8--8&------8&------------')
	console.log('-------------8&-&-&-&--8& ----&8----8&----8&------------')
	console.log('\n')
	console.log("Band Name: " + data.tracks.items[0].artists[0].name)
	console.log('---------------------------------------------------------')
	console.log("Song Name: "+ data.tracks.items[0].name)
	console.log('---------------------------------------------------------')
	console.log("URI: "+data.tracks.items[0].uri)
	console.log('---------------------------------------------------------')
	console.log("Album Name: " + data.tracks.items[0].album.name)
	console.log('---------------------------------------------------------')
})
}

}

if(searchTerm === "concert-this") {
axios({
	url:"https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp",
	method: "GET",
	limit: 1
})
.then((response) => {
	console.log('\n')
	console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*')
	console.log("| Response status " + response.status + " " + response.statusText+'  |')
	console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*')
	console.log('\n')
	console.log('-------------8&--------8&-----&8-8&-------8&------------')
	console.log('-------------8&---------------&8---8&-------------------')
	console.log('-------------8&--------8&-----&8&8&-------8&------------')
	console.log('-------------8&--------8&-----&8--8&------8&------------')
	console.log('-------------8&-&-&-&--8& ----&8----8&----8&------------')
	console.log('\n')
	console.log("Venue: " + response.data[0].venue.name)
	console.log('---------------------------------------------------------')
	console.log("Country: " + response.data[0].venue.country)
	console.log('---------------------------------------------------------')
	console.log("City: "+response.data[0].venue.city)
	console.log('---------------------------------------------------------')
	console.log("Date and Time: " + moment((response.data[0].datetime)).format("MM/DD/YYYY"))
	console.log('---------------------------------------------------------')
	console.log(response.data[0].offers[0].type + " for " + response.data[0].lineup[0] + " " + response.data[0].offers[0].status)
	console.log('---------------------------------------------------------')
});
}

if(searchTerm === "movie-this"){
	if(input === '') {
		input = "Mr Nobody"
	}
	input = input.split(" ")
	input = input.join("+")
axios({
	url: "http://www.omdbapi.com/?t="+input+"&apikey=30acebd3",
	method: "GET",
	limit: 1
}).then((response) => {

	console.log('\n')
	console.log('-------------------------8&--------8&-----&8-8&-------8&------------------------')
	console.log('-------------------------8&---------------&8---8&-------------------------------')
	console.log('-------------------------8&--------8&-----&8&8&-------8&------------------------')
	console.log('-------------------------8&--------8&-----&8--8&------8&------------------------')
	console.log('-------------------------8&-&-&-&--8& ----&8----8&----8&------------------------')
	console.log('\n')
	console.log("==============================")
	console.log("Title: "+response.data.Title)
	console.log("------------------------------")
	console.log("Year: "+response.data.Year)
	console.log("------------------------------")
	console.log("Rated: "+response.data.Rated)
	console.log("------------------------------")
	console.log("Ratings: "+response.data.Ratings[1].Source+": "+response.data.Ratings[1].Value)
	console.log("------------------------------")
	console.log("Produced: "+response.data.Production)
	console.log("------------------------------")
	console.log("Language/s: "+response.data.Language)
	console.log("------------------------------")
	console.log('\n')
	console.log("--------------------------------------PLOT--------------------------------------")
	
	console.log(response.data.Plot)
	console.log("--------------------------------------------------------------------------------")
	console.log('\n')
	console.log("-------------------------------------ACTORS-------------------------------------")
	console.log(response.data.Actors)
	console.log("--------------------------------------------------------------------------------")
})
}

