// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
require("dotenv").config()
var axios = require("axios");

if (process.argv[2] == "movie-this") {
    let movieName = process.argv[3]
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            console.log("The title of the movie is: " + response.data.Title)
            console.log("This movie was released in: " + response.data.Year)
            console.log("The IMDB Rating of the movie is: " + response.data.imdbRating)
            // console.log("The Rotten Tomatoes Rating of this movie is:")
            console.log("This movie was produced in: " + response.data.Country)
            console.log("The language of this movie is: " + response.data.Language)
            console.log("The plot of this movie is: " + response.data.Plot)
            console.log("The actors in this movie are: " + response.data.Actors)
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
} else if (process.argv[2] == "spotify-this-song") {

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    let type = typeof (process.argv[3])

    if (type == "string") {
        let songName = "";
        let nodeArgs = process.argv;

        for (let i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                songName = songName + " " + nodeArgs[i];

            } else {
                songName += nodeArgs[i];
            }
        }

        songName = songName.toString()
        consoled(songName)



    } else {
        let songName = "The Sign"
        consoled(songName)
    }

};



function consoled(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let lower = ""
        let rightArr;
        let index = []
        let array = data.tracks.items
        let song;

        for (i = 0; i < array.length; i++) {

            let song = data.tracks.items[i].name.toLowerCase();
            if (song == songName) {
                index.push(i)
            }
        }
        rightArr = data.tracks.items[index[0]]
        console.log("This song was made by " + rightArr.album.artists[0].name)
        console.log("The name of the song is " + rightArr.name)
        console.log("The album for this song is " + rightArr.album.name)
        console.log("Click the following link to hear this song " + rightArr.external_urls.spotify)
    })
}

