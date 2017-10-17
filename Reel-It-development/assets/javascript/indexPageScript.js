$(document).ready(function(){

// index.html Placeholder Image Loop
// =====================================================================================

    // Placeholder image SVG
    var placeholderSVG = '<div class="col-xs-6 col-sm-3 col-md-2 gutter-xs-xs gutter-margin-xs-xs"><img class="img-thumbnail" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWYwOTFlNTkwYSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1ZjA5MWU1OTBhIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4="></div>'
    
    // Placeholder loop
    for (var i = 0; i < 12; i++) {
      $('#movieGrid').append(placeholderSVG);
    }

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

$("#submitButton").on("click", function(event) {

  // Store search query
  var query = $('#movieTitle').val().trim();
  
  // Push search query to database
  database.ref().push({
    searchTerm : query
  });

  // Load search results page
  window.location.href='ReelIt-wCarousel.html';
});

// Expandable Form
// =====================================================================================

  // Expandable form
  // $("input").expandable({
  //   width: 600,
  //   duration: 300,
  // });

// Firebase Main Processes 
// =====================================================================================

// Firebase watcher + initial loader 
    database.ref().orderByChild('dateAdded').limitToLast(10).on("child_added", function(childSnapshot) {

    // Create row
    var $movieRow = $('<tr>');

    // Create cells
    var $favoritedCell = $('<td>');
    var $movieNameCell = $('<td>');
    var $releaseDateCell = $('<td>');

    // Favorite cell
    // If movie is favorited, display yellow start. If it is not, display blank star.
    //$favoritedCell.attr('class', 'favoriteStar')
    if (childSnapshot.val().favorited) {
      $favoritedCell.html(yellowStar);
    } else {
      $favoritedCell.html(emptyStar);
    };
    $movieRow.append($favoritedCell);

    // Movie name cell
    if (childSnapshot.val().movieUrl.length > 0) {
      var $movieNameContents = $('<a>');
      $movieNameContents.attr('href', childSnapshot.val().movieUrl);
      $movieNameContents.attr("target", "_blank")
      $movieNameContents.html(childSnapshot.val().movieName);
      $movieNameCell.html($movieNameContents);
    } else {
      var $movieName = $('<p>');
      $movieNameCell.text(childSnapshot.val().movieName);
    }
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

  $("#moviesGoHere").delegate(".favoriteStar", "click", function() {
      if ($(this).attr("data-favorited", "true")) {
        $(this).empty();
        $(this).parent().html(yellowStar);
      } else {
        $(this).empty();
        $(this).parent().html(emptyStar); 
      }
    });  

// End of $(document).ready function
});
