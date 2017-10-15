
$("#submitButton").on("click", function(event) {
  event.preventDefault();
  $(".movieDivRecs").empty();
  $(".castMain").empty();
  var movie = $(".query").val().trim();
  var encodedMov = encodeURIComponent(movie);
  var movieID;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/search/movie?&query=" + encodedMov +
      "&api_key=e78bedc80954fdbe9d13505b16448776",
    "method": "GET",
  };
  $.ajax(settings).done(function(respond) {
    console.log(respond);
    movieID = respond.results[0].id;
    console.log("ID: " + movieID);

https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images

var setting = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/"+movieID+"?append_to_response=videos,credits,similar,images,recommendations,keywords,reviews&language=en-US&api_key=e78bedc80954fdbe9d13505b16448776",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(setting).done(function (response) {
  console.log(response);


// Generate Movie Div
    var movieDiv = $("<div class='movie'>");

// Movie ID
    // var movieID = response.results[0].id;
    console.log("ID: " + movieID);

// Movie URL (through TMDB)
    var movieURL = settings.url;
    // console.log("movieURL: " + movieURL);

// Movie Title
    var title = response.title;
    // console.log("title: " + title);
    var movieTitleDisplay = $("<h2>").text(title);
    $(".movieDivTitle").html(movieTitleDisplay);

// Movie Review/Score
    var rating = response.vote_average;
    $(".progress-bar").attr("aria-valuenow", rating);
    var ratingPercent = (rating * 10);
    $(".progress-bar").css("width", ratingPercent + "%");
    $(".movieRating").text(ratingPercent + "%");
    // $(".movieDivVote").html(movieRatingDisplay);


// Movie Released Date
    var released = response.release_date;
    // console.log("released: " + released)
    var movieDateDisplay = $("<p>").text(released);
    $(".movieDivRelease").html(movieDateDisplay);

// Link to Stream
    var movieStream = $("<a>");
    var movieStreamURL = ("http://www.canistream.it/search/movie/" + encodedMov);
      movieStream.addClass("btn btn-stream btn-md btn-warning");
      movieStream.attr("role", "button")
      movieStream.attr("target", "_blank")
      movieStream.attr("href", movieStreamURL);
      movieStream.text("Streaming Here");
     $(".movieDivStream").html(movieStream);
   

// Movie Plot
    var plot = response.overview;
    var moviePlotDisplay = $("<p>").text(plot);
    $(".movieDivPlot").html(moviePlotDisplay);

// Movie Homepage
    var movieWebsite = response.homepage;
    var movieHomepage = $("<a>")
    movieHomepage.attr("href", movieWebsite);
    movieHomepage.attr("target", "_blank");
    movieHomepage.attr("role", "button");
    movieHomepage.addClass("btn btn-warning btn-md btn-webpage");
    // console.log(movieHomepage);
    $(".movieDivHomepage").html(movieHomepage.href);


 //  Movie Genres
    var genreList = response.genres;
    for(var i = 0; i < genreList.length; i++){
    var movieGenre = $("<a>");
    var movieGenreID = response.genres[i].id;
    var movieGenreName = response.genres[i].name;
    var movieGenreURL = ("https://www.themoviedb.org/genre/" + movieGenreID + "-" + movieGenreName);
      movieGenre.addClass("btn btn-genre btn-sm btn-primary");
      movieGenre.attr("role", "button");
      movieGenre.attr("target", "_blank");
      movieGenre.attr("href", movieGenreURL);
      movieGenre.text(movieGenreName);
     $(".movieDivGenre").append(movieGenre);
   }; 


// Movie Image (poster or backdrop)
    // var imgURL = "https://image.tmdb.org/t/p/w500/" + response.backdrop_path;
    var imgURL = "https://image.tmdb.org/t/p/w500/" + response.poster_path;
    var image = $("<img>").attr("src", imgURL);
    image.addClass("img-responsive");
    movieDiv.html(image);


 //  Movie Reccomendations
    var movieRecList = response.recommendations.results;
    for(var i = 0; i < movieRecList.length; i++){
    var movieRec = $("<a>");
    var movieRecID = response.recommendations.results[i].id;
    var movieRecTitle = response.recommendations.results[i].title;
    var movieRecURL = ("https://www.themoviedb.org/movie/" + movieRecID);
    var movieRecStream = ("https://www.fan.tv/movies/" + movieRecID);
      movieRec.addClass("btn btn-recom btn-sm btn-default");
      movieRec.attr("role", "button")
      movieRec.attr("target", "_blank")
      movieRec.attr("href", movieRecURL);
      movieRec.text(movieRecTitle);
     $(".movieDivRecs").append(movieRec);
   }; 

// Cast
    var castMainList = response.credits.cast;
    console.log("Cast arr length: " + castMainList.length);
    var castTrim = (castMainList.length * 0) + 4;
    console.log("Cast trim: " + castTrim);
    
    for(var j = 0; j < 4; j++){
      var castDiv = $("<div>");
      castDiv.addClass("castDiv col-xs-6 col-md-3 text-center");
      cast_idj = $(this).val(response.credits.cast[j]);
      // castDiv.attr("data-name",response.credits.cast[j])
      var headshotURL = "https://image.tmdb.org/t/p/w185/" + response.credits.cast[j].profile_path;
      var headshot = $("<img>").attr("src", headshotURL);
      headshot.addClass("img-responsive");
      var thumbnailDisplay = $("<div class='thumbnail'>").html(headshot);

      var actorName = response.credits.cast[j].name;
      var characterName = response.credits.cast[j].character;
      var actorCharacterDisplay = $("<h6 class='actorCharacter'>").text("Character: " + characterName);
      var actorNameDisplay = $("<h4 class='actorName'>").text(actorName);

      var actorInfo = $("<a>");
      var actorID = response.credits.cast[j].id;
      var actorURL = ("https://www.themoviedb.org/person/" + actorID);
        actorInfo.addClass("btn btn-recom btn-xs btn-default");
        actorInfo.attr("role", "button");
        actorInfo.attr("target", "_blank");
        actorInfo.attr("href", actorURL);
        actorInfo.text("More"); 
      
      var captionDisplay = $("<div class='caption'>").html(actorNameDisplay).append(actorCharacterDisplay).append(actorInfo);
      (thumbnailDisplay).append(captionDisplay);

      (castDiv).html(thumbnailDisplay)
      // .append(captionDisplay);
      $(".castMain").append(castDiv);
      


};

 // Prepend Movie
    $("#movies-view").html(movieDiv);
  });

});
});

