$(document).ready(function(){

// Firebase | JavaScript Code
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

  // New data variables
  var favorited = false;
  var yellowStar = '<i class="fa fa-star favoriteStar" aria-hidden="true" data-favorited="true"></i>';
  var emptyStar = '<i class="fa fa-star-o favoriteStar" aria-hidden="true" data-favorited="false"></i>';


// The Movie DB API | JavaScript Code
// =====================================================================================

database.ref().limitToLast(1).on("child_added", function(snapshot) {
  var movie = snapshot.val().searchTerm;

  $(".frontPage").hide(1000);
  $(".movieDivRecs").empty();
  $(".castMain").empty();
  //movie = $(".query").val().trim();
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
      var released = moment(response.release_date, 'YYYY-MM-DD');
      var convertedReleased = released.format('MMMM DD YYYY')
      var movieDateDisplay = $("<p>").text(convertedReleased);
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

    // Code for Firebase push
      database.ref().push({
        favorited: favorited,
        movieName: title,
        movieUrl: movieWebsite,
        releaseDate: convertedReleased,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  // Prepend Movie
    $("#movies-view").html(movieDiv);
  });

  // End of ajax function
  });



//////////////////////////////////////////////////////////////////////////////////////////////////////////

// YouTube API | JavaScript Code
// =====================================================================================

$(function(){

  $("#submitButton").on("click", (function(){
  // $('#search-form').submit(function(event){ // when the user clicks submit....
    event.preventDefault(); // prevent the form from submitting
    var searchTerm = $('.query').val(); // take whatever is in the search field and put it in searchTerm
    getRequest(searchTerm); //call the function "getRequest" and pass it the search term
  // }); 
  }));


  function getRequest(searchTerm){
    var userQuery = searchTerm;

    //alert(typeof(userQuery));
    var params = {
      part: 'snippet',
      key: 'AIzaSyAUqswQE4ND2epzoyNKkS9_CX_QxTK6ILs',
      q: userQuery,
      maxResults: 4,
      type: "video"
    };
    url = 'https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, params, function(data){
      console.log(data);
      //debugger;
      showResults(data.items);
      console.log(data.items);
      
    });
  }

  function showResults(results){ //shows the results to the user
    var htmlPopular = ""; // variable to hold the html
    $.each(results, function(index,items){ //for each of the results
  //debugger;
      //html += '<p>' + items.snippet.thumbnails.default.url + '</p>'; // create a new paragraph with the title
      htmlPopular += '<a href=' + "https://www.youtube.com/watch?v=" + items.id.videoId + '>';
      htmlPopular += '<img src=' + items.snippet.thumbnails.medium.url + '>'; 
      htmlPopular += '</a>';
      // console.log(items.snippet.thumbnails.default.url);
      console.log(items.id.videoId);
    });
    $('#popular').html(htmlPopular); // display each of those paragraphs on the page
  }
});

$(function(){

  $("#submitButton").on("click", (function(){
  // $('#search-form').submit(function(event){ // when the user clicks submit....
    event.preventDefault(); // prevent the form from submitting
    var searchTerm = $('.query').val(); // take whatever is in the search field and put it in searchTerm
    getRequest(searchTerm); //call the function "getRequest" and pass it the search term
  // });
  
  }));


  function getRequest(searchTerm){
    var userQuery = searchTerm + "trailer";

    //alert(typeof(userQuery));
    var params = {
      part: 'snippet',
      key: 'AIzaSyAUqswQE4ND2epzoyNKkS9_CX_QxTK6ILs',
      q: userQuery,
      maxResults: 4,
      type: "video",
    };
    url = 'https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, params, function(data){
      console.log(data);
      //debugger;
      showResults(data.items);
      console.log(data.items);
      
    });
  }

  function showResults(results){ //shows the results to the user
    var htmlTrailers = ""; // variable to hold the html
    $.each(results, function(index,items){ //for each of the results
  //debugger;
      //html += '<p>' + items.snippet.thumbnails.default.url + '</p>'; // create a new paragraph with the title
      htmlTrailers += '<a href=' + "https://www.youtube.com/watch?v=" + items.id.videoId + '>';
      htmlTrailers += '<img src=' + items.snippet.thumbnails.medium.url + '>'; 
      htmlTrailers += '</a>';

      //console.log(items.snippet.thumbnails.default.url);
      console.log(items.id.videoId);
    });
    $('#trailers').html(htmlTrailers); // display each of those paragraphs on the page
  }
});


////////////////////////////////////////////////////////////////////////////////////////

$(function(){

  $("#submitButton").on("click", (function(){
  // $('#search-form').submit(function(event){ // when the user clicks submit....
    event.preventDefault(); // prevent the form from submitting
    var searchTerm = $('.query').val(); // take whatever is in the search field and put it in searchTerm
    getRequest(searchTerm); //call the function "getRequest" and pass it the search term
  // });
  }));


  function getRequest(searchTerm){
    var userQuery = searchTerm + "review";

    //alert(typeof(userQuery));
    var params = {
      part: 'snippet',
      key: 'AIzaSyAUqswQE4ND2epzoyNKkS9_CX_QxTK6ILs',
      q: userQuery,
      maxResults: 4,
      type: "video",
    };
    url = 'https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, params, function(data){
      console.log(data);
      //debugger;
      showResults(data.items);
      console.log(data.items);
      
    });
  }

  function showResults(results){ //shows the results to the user
    var htmlReviews = ""; // variable to hold the html
    $.each(results, function(index,items){ //for each of the results
  //debugger;
      //html += '<p>' + items.snippet.thumbnails.default.url + '</p>'; // create a new paragraph with the title
      htmlReviews += '<a href=' + "https://www.youtube.com/watch?v=" + items.id.videoId + '>';
      htmlReviews += '<img src=' + items.snippet.thumbnails.medium.url + '>'; 
      htmlReviews += '</a>';

      //console.log(items.snippet.thumbnails.default.url);
      console.log(items.id.videoId);
    });
    $('#reviews').html(htmlReviews); // display each of those paragraphs on the page
  }

  $("<img>").addClass("img img-responsive");
});



//-----------------------------------------------------------
//-----------------Begin ITUNES movie search api ------------
//-----------------------------------------------------------

    var searchTerm = "";
    var queryURL = "";
    var requestData = "";


  $('#submitButton').on('click', function(event) {
        event.preventDefault();
    $(".moviePurchase").empty();
    $(".director").empty();

    var searchTermi =  $('.query').val().trim();
      
    var queryURLi = "https://itunes.apple.com/search?term="+ searchTermi +"&entity=movie&limit=1";

   

    $('#movieResults').empty();

    
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURLi,
          method: "GET",
          dataType: "jsonp"
        })
      .done(function(data) {

          var requestData = data.results;

          

          for (var i = 0; i<requestData.length; i++){

            // store our call back result into variables
            var itunesMovieTitle = requestData[i].trackCensoredName;
            console.log(itunesMovieTitle);

            var itunesMovieImage = requestData[i].artworkUrl100;
            console.log(itunesMovieImage);

            var itunesMovieDirector = requestData[i].artistName;
            console.log(itunesMovieDirector);

            var itunesMovieRating = requestData[i].contentAdvisoryRating;
            console.log(itunesMovieRating);

            var itunesMovieDescription = requestData[i].longDescription;
            console.log(itunesMovieDescription);

           

            var mainItunesLink = requestData[i].trackViewUrl;
            console.log(mainItunesLink);

            //creating a div to put all our imags, movie title, trailer, rating etc

            var newMovieDivDisplay = $('<div class="htmlMovieDisplay">');
            var movieImageFile = $('<img class="imageFile">');

            movieImageFile.attr('src', itunesMovieImage);

         
            var itunesRatingDiv = $('<p>');

            itunesRatingDiv.append("Rated: " + itunesMovieRating);

            

            var directorDiv = $('<p>');

            directorDiv.append("Director: " + itunesMovieDirector);

            

            var linkDiv = $('<a>').attr('href', mainItunesLink).attr("target", "_blank").text('View in iTunes');
            linkDiv.addClass("btn btn-sm btn-primary btn-itunes");
            linkDiv.attr("role", "button");

            //appending our movie div with all the api information into our main html page
           //  newMovieDivDisplay.append(titleDiv);
            // newMovieDivDisplay.append(movieImageFile);
            newMovieDivDisplay.append(itunesRatingDiv);
            // newMovieDivDisplay.append(descriptionDiv);
            newMovieDivDisplay.append(directorDiv);
            // newMovieDivDisplay.append(videoDiv);
            newMovieDivDisplay.append(linkDiv);

            // $('#movieResults').append(newMovieDivDisplay);
            $(".moviePurchase").append(linkDiv);
            $(".director").append(directorDiv);
            $(".ratingFCC").append(itunesRatingDiv);




            console.log(requestData[i]);




           }
               

        // end of ajax call
       });


//End of on click function
});



          

          for (var i = 0; i<requestData.length; i++){

            var itunesMovieTitle = requestData[i].trackCensoredName;

            console.log(itunesMovieTitle);

            var itunesMovieImage = requestData[i].artworkUrl100;
            console.log(itunesMovieImage);

            var itunesMovieDirector = requestData[i].artistName;
            console.log(itunesMovieDirector);

            var itunesMovieRating = requestData[i].contentAdvisoryRating;
            console.log(itunesMovieRating);

            var itunesMovieDescription = requestData[i].longDescription;
            console.log(itunesMovieDescription);

            // var itunesMovieTrailer = requestData[i].previewUrl;
            // console.log(itunesMovieTrailer);

            var mainItunesLink = requestData[i].trackViewUrl;

            var newMovieDivDisplay = $('<div class="htmlMovieDisplay">');
            var movieImageFile = $('<img class="imageFile">');

            movieImageFile.attr('src', itunesMovieImage);

         
          var itunesRatingDiv = $('<p>');

            itunesRatingDiv.append(itunesMovieRating);

            var descriptionDiv = $('<p>');

            descriptionDiv.append(itunesMovieDescription);

            var directorDiv = $('<p>');

            directorDiv.append("Director: " + itunesMovieDirector);


            var titleDiv = $('<p>');

            titleDiv.append(itunesMovieTitle);

            var linkDiv = $('<a>').attr('href', mainItunesLink).text('Here is a movie link to purchase ' + itunesMovieTitle);


            newMovieDivDisplay.append(titleDiv);
            newMovieDivDisplay.append(movieImageFile);
            newMovieDivDisplay.append(itunesRatingDiv);
            newMovieDivDisplay.append(descriptionDiv);
            newMovieDivDisplay.append(directorDiv);
            newMovieDivDisplay.append(linkDiv);


            $('#movieResults').append(newMovieDivDisplay);

            // When searching for movies by query, can I filter those results by genre within the URL?
            // Can I accomiplish the above using a genreID in combination with the search term?
            // If you can accomplish that with genre ID, store the genre IDs in an array of objects or as items in a select menu, etc...

           }
});
});