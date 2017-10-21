$(document).ready(function(){

// Setup Variables and Function Calls
// =====================================================================================

  // Hide Search Results HTML
  $('#searchResults').hide();

  // Show chardin.js overlay (site instructions) only once
  if (localStorage.getItem('instructionState') != 'shown'){
    $('#movieTable').css("margin-top", "150px");
      $('body').chardinJs('start');
      localStorage.setItem('instructionState','shown');
  }

  // Stop showing instructions when screen is clicked
  $('body').on('click', function() {
    $(this).chardinJs('stop');
    $('#movieTable').css("margin-top", "20px");
  });


// The Movie DB API | AJAX call
// =====================================================================================

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=e78bedc80954fdbe9d13505b16448776",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(settings).done(function (response) {
    //console.log(response.results);


// Populate Top 20 Movie Grid - Image Loop
// =====================================================================================

    // Top 20 Movie Image loop
    for (var i = 0; i < response.results.length ; i++) {
      var topMovieImg = $("<img class='img img-responsive topMovie'>")
      var topMovieSrc = "https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path;
      topMovieImg.attr("src", topMovieSrc);
      topMovieImg.attr('data-title', response.results[i].title);
      topMovieImg.attr('class', 'movieTitleSearch');
      topMovieImg.css({margin:'10px', align:'center', display:'inline', height: '350px', width:'250px'});
      $('#movieGrid').append(topMovieImg);
    };
  });

// Initalize Firebase Database
// =====================================================================================

  // Setup Variables 
  // =====================================================================================
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZvaB7V67-3e53_b0-zoFZ8HcjgocLqZ0",
    authDomain: "reel-it-2a1c2.firebaseapp.com",
    databaseURL: "https://reel-it-2a1c2.firebaseio.com",
    projectId: "reel-it-2a1c2",
    storageBucket: "",
    messagingSenderId: "105428438933"
  };

  firebase.initializeApp(config);        

  var database = firebase.database();     

// The Movie DB API | Functions
// =====================================================================================

// Search the API for a movie and retrieve data for search results page
var searchForMovie = function(movie) {
  $('#movieTable').hide();
  $('#searchResults').show();
  $("#firstPage").hide();
  $(".frontPage").hide();
  $(".movieDivRecs").empty();
  $(".castMain").empty();

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
    //console.log(respond);
    movieID = respond.results[0].id;
    //console.log("ID: " + movieID);

  var setting = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/"+movieID+"?append_to_response=videos,credits,similar,images,recommendations,keywords,reviews&language=en-US&api_key=e78bedc80954fdbe9d13505b16448776",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(setting).done(function (response) {

  // Generate Movie Div
    var movieDiv = $("<div class='movie'>");

  // Movie URL (through TMDB)
    var movieURL = settings.url;

  // Movie Title
    var title = response.title;
    var movieTitleDisplay = $("<h2>").text(title);
    $(".movieDivTitle").html(movieTitleDisplay);

  // Movie Review/Score
    var rating = response.vote_average;
    $(".progress-bar").attr("aria-valuenow", rating);
    var ratingPercent = (rating * 10);
    $(".progress-bar").css("width", ratingPercent + "%");
    $(".movieRating").text(ratingPercent + "%");

  // Progress Bar Color
    var progressBarColor;
    if (rating >=8) progressBarColor = "#00C851"
    else if (rating >=5.5) progressBarColor = "#ffbb33"
    else if (rating >=0) progressBarColor = "#ff4444"
    $("#progressbar").css('background-color', progressBarColor);

  // Movie Released Date
    var released = moment(response.release_date, 'YYYY-MM-DD');
    var convertedReleased = released.format('MMMM DD YYYY')
    var movieDateDisplay = $("<p>").text(convertedReleased);
    $(".movieDivRelease").html(movieDateDisplay);

  // Link to Stream
    var movieStream = $("<a>");
    var movieStreamURL = ("http://www.canistream.it/search/movie/" + encodedMov);
    movieStream.addClass("btn btn-stream btn-sm btn-primary");
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
      //var movieRecURL = ("https://www.themoviedb.org/movie/" + movieRecID);
      //var movieRecStream = ("https://www.fan.tv/movies/" + movieRecID);
      movieRec.addClass("btn btn-recom btn-sm btn-default recommendedButton");
      movieRec.attr("role", "button");
      movieRec.attr('data-title', response.recommendations.results[i].title);
      movieRec.text(movieRecTitle);
     $(".movieDivRecs").append(movieRec);
    }; 

  // Cast
    var castMainList = response.credits.cast;
    var castTrim = (castMainList.length * 0) + 4;
      
    for(var j = 0; j < 4; j++){
      var castDiv = $("<div>");
      castDiv.addClass("castDiv col-xs-6 col-md-3 text-center");
      cast_idj = $(this).val(response.credits.cast[j]);
      var headshotURL = "https://image.tmdb.org/t/p/w185/" + response.credits.cast[j].profile_path;
      
      // If headshot does not exist, replace with a placeholder image
      var re = new RegExp("['null']$");
      if (re.test(headshotURL)) {
        headshotURL = 'assets/images/castPlaceholder.png';
      }

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
      thumbnailDisplay.append(captionDisplay);

      castDiv.html(thumbnailDisplay)
      $(".castMain").append(castDiv);
    };

  // Code for Firebase push
    database.ref().push({
      movieName: title,
      releaseDate: convertedReleased,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  // Prepend Movie
    $("#movies-view").html(movieDiv);
  });

  // End of ajax function
  });

  // End of searchForMovie function
  };

// YouTube API | Functions
// =====================================================================================

  // Find popular YouTube videos based on the movie that was searched
  function popularGetRequest(searchTerm){
    var userQuery = searchTerm;

    var params = {
      part: 'snippet',
      key: 'AIzaSyAUqswQE4ND2epzoyNKkS9_CX_QxTK6ILs',
      q: userQuery,
      maxResults: 4,
      type: "video"
    };
    url = 'https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, params, function(data){
      popularShowResults(data.items);
    });
  }

  // Display results
  function popularShowResults(results){         
    var htmlPopular = "";      

    $.each(results, function(index,items){     
      htmlPopular += '<a class="popular" target="_blank" href=' + "https://www.youtube.com/watch?v=" + items.id.videoId + '>';
      htmlPopular += '<img src=' + items.snippet.thumbnails.medium.url + '>';
      htmlPopular += '<img src = "assets/images/play.png" class="playbutton">'; 
      htmlPopular += '</a>';
    });

    $('#popular').html(htmlPopular);         
  }

  // Find trailers on YouTube based on the movie that was searched
  function trailersGetRequest(searchTerm){
    var userQuery = searchTerm + "trailer";

    var params = {
      part: 'snippet',
      key: 'AIzaSyAUqswQE4ND2epzoyNKkS9_CX_QxTK6ILs',
      q: userQuery,
      maxResults: 4,
      type: "video",
    };
    url = 'https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, params, function(data){
      trailersShowResults(data.items);      
    });
  }

  // Display results
  function trailersShowResults(results){ 
    var htmlTrailers = ""; 

    $.each(results, function(index,items){
      htmlTrailers += '<a class="popular" target="_blank" href=' + "https://www.youtube.com/watch?v=" + items.id.videoId + '>';
      htmlTrailers += '<img src=' + items.snippet.thumbnails.medium.url + '>'; 
      htmlTrailers += '<img src = "assets/images/play.png" class="playbutton">';
      htmlTrailers += '</a>';
    });

    $('#trailers').html(htmlTrailers); 
  }

  // Find video reviews on YouTube based on the movie that was searched
  function reviewsGetRequest(searchTerm){
    var userQuery = searchTerm + "review";

    var params = {
      part: 'snippet',
      key: 'AIzaSyAUqswQE4ND2epzoyNKkS9_CX_QxTK6ILs',
      q: userQuery,
      maxResults: 4,
      type: "video",
    };
    url = 'https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, params, function(data){
      reviewsShowResults(data.items);      
    });
  }

  // Display results
  function reviewsShowResults(results){ 
    var htmlReviews = ""; 

    $.each(results, function(index,items){
      htmlReviews += '<a class="popular" target="_blank" href=' + "https://www.youtube.com/watch?v=" + items.id.videoId + '>';
      htmlReviews += '<img src=' + items.snippet.thumbnails.medium.url + '>'; 
      htmlReviews += '<img src = "assets/images/play.png" class="playbutton">';
      htmlReviews += '</a>';
    });

    $('#reviews').html(htmlReviews); 
  }

  // Make every image on the page responsive via Bootstrap
  $("<img>").addClass("img img-responsive");


// iTunes API | Functions
// =====================================================================================

  // Search movie in the iTunes API, display the director, and a link to the movie if it is available on iTunes
  var iTunesSearch = function(searchTermiTunes) {

    $(".moviePurchase").empty();
    $(".director").empty();
      
    var queryURLiTunes = "https://itunes.apple.com/search?term="+ searchTermiTunes +"&entity=movie&limit=1";

    $('#movieResults').empty();
    
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURLiTunes,
        method: "GET",
        dataType: "jsonp"
      })
    .done(function(data) {

        var requestData = data.results;
      
        for (var i = 0; i<requestData.length; i++){

          // Storing callback result into variables
          var itunesMovieTitle = requestData[i].trackCensoredName;
          var itunesMovieImage = requestData[i].artworkUrl100;
          var itunesMovieDirector = requestData[i].artistName;
          var itunesMovieRating = requestData[i].contentAdvisoryRating;
          var itunesMovieDescription = requestData[i].longDescription;
          var mainItunesLink = requestData[i].trackViewUrl;

          // Creating a div that displays images, movie title, trailer, rating etc
          var newMovieDivDisplay = $('<div class="htmlMovieDisplay">');
          var movieImageFile = $('<img class="imageFile">');

          movieImageFile.attr('src', itunesMovieImage);

          var itunesRatingDiv = $('<p>');
          itunesRatingDiv.html("Rated: " + itunesMovieRating);
  
          var directorDiv = $('<p>');
          directorDiv.append(itunesMovieDirector);

          var linkDiv = $('<a>').attr('href', mainItunesLink).attr("target", "_blank").text('View in iTunes');
          linkDiv.addClass("btn btn-sm btn-primary btn-itunes");
          linkDiv.attr("role", "button");

          // Appending movie div into Search Results page
          newMovieDivDisplay.append(itunesRatingDiv);
          newMovieDivDisplay.append(directorDiv);
          newMovieDivDisplay.append(linkDiv);

          $(".moviePurchase").append(linkDiv);
          $(".director").append(directorDiv);
          $(".ratingFCC").html(itunesRatingDiv);
         }
               
    // end of ajax call
    });
  };   

// Firebase Main Processes 
// =====================================================================================

  // Firebase watcher + initial loader 
  database.ref().orderByChild('dateAdded').limitToLast(10).on("child_added", function(childSnapshot) {

    // Create row
    var $movieRow = $('<tr>');

    // Create cells
    var $movieNameCell = $('<td>');
    var $releaseDateCell = $('<td>');

    // Movie name cell
    var currentMovieTitle = childSnapshot.val().movieName;
    var $movieNameContents = $('<p>');
    $movieNameContents.attr('class', 'databaseMovieTitle');
    $movieNameContents.attr('data-title', currentMovieTitle);
    $movieNameContents.html(currentMovieTitle);
    $movieNameCell.html($movieNameContents);
    $movieRow.append($movieNameCell);

    // Release date cell
    $releaseDateCell.html(childSnapshot.val().releaseDate);
    $movieRow.append($releaseDateCell);

    // Add row to table
    $("#moviesGoHere").prepend($movieRow);

  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });


// Click Functions
// =====================================================================================

  // Five functions are run to create a search result page
  var searchProcess = function(query) {
    searchForMovie(query);
    reviewsGetRequest(query);
    popularGetRequest(query);
    trailersGetRequest(query);
    iTunesSearch(query);
  };

  // Clicking the submit button runs a search
  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    $('body').chardinJs('stop');
    var query = $(".query").val().trim();
    if(query ==""){
      $("#movieTitle").attr("placeholder","Please enter a valid movie title")
      validate({input: ""}, {input: {presence: {allowEmpty: false}}})
    };
    searchProcess(query);
  });

  // Clicking a Top 20 movie runs a search
  $('body').delegate(".movieTitleSearch", "click", function() {
    $('body').chardinJs('stop');
    $('html,body').scrollTop(0);
    var query = $(this).attr('data-title');
    searchProcess(query);
  });

  // Clicking a Recent Search movie title runs a search
  $('body').delegate(".databaseMovieTitle", "click", function() {
    $('html,body').scrollTop(0);
    var query = $(this).attr('data-title');
    searchProcess(query);
  });

  // Clicking a recommended movie button runs a search
  $('body').delegate(".recommendedButton", "click", function() {
    $('html,body').scrollTop(0);
    var query = $(this).attr('data-title');
    searchProcess(query);
  });

// End of $(document).ready function
});




