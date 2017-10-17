// Reel It / Firebase
// =====================================================================================

$(document).ready(function(){

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

  // Data variables
  var favorited = false;
  var title = '';
  var released = '';
  var releaseDate = '';
  var yellowStar = '<i class="fa fa-star favoriteStar" aria-hidden="true" data-favorited="true"></i>';
  var emptyStar = '<i class="fa fa-star-o favoriteStar" aria-hidden="true" data-favorited="false"></i>';

  // Main Processes 
  // =====================================================================================


  // Form
  $(function(){

  $("input").expandable({
    width: 600,
    duration: 300,
  });
  });



  // Firebase code                      

  // Firebase watcher + initial loader 
      database.ref().on("child_added", function(childSnapshot) {

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
      var $movieNameContents = $('<a>');
      $movieNameContents.attr('href', childSnapshot.val().movieUrl);
      $movieNameContents.html(childSnapshot.val().movieName);
      $movieNameCell.html($movieNameContents);
      $movieRow.append($movieNameCell);

      // Release date cell
      $releaseDateCell.html(childSnapshot.val().releaseDate);
      $movieRow.append($releaseDateCell);

      // Add row to table
        $("#moviesGoHere").append($movieRow);

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


});

