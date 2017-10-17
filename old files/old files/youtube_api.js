$(document).ready(function(){


$(function(){
  $("#submitButton").on("click", (function(){
  // $('#search-form').submit(function(event){ // when the user clicks submit....
    event.preventDefault(); // prevent the form from submitting
    var searchTerm = $('.query').val(); // take whatever is in the search field and put it in searchTerm
    getRequest(searchTerm); //call the function "getRequest" and pass it the search term
  // });
}));
});

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){


$(function(){
  $("#submitButton").on("click", (function(){
  // $('#search-form').submit(function(event){ // when the user clicks submit....
    event.preventDefault(); // prevent the form from submitting
    var searchTerm = $('.query').val(); // take whatever is in the search field and put it in searchTerm
    getRequest(searchTerm); //call the function "getRequest" and pass it the search term
  // });
  
  }));

});

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

$(document).ready(function(){


$(function(){
  $("#submitButton").on("click", (function(){
  // $('#search-form').submit(function(event){ // when the user clicks submit....
    event.preventDefault(); // prevent the form from submitting
    var searchTerm = $('.query').val(); // take whatever is in the search field and put it in searchTerm
    getRequest(searchTerm); //call the function "getRequest" and pass it the search term
  // });
}));
});

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