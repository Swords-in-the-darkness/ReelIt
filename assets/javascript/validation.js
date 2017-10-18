
function formValidation() {

	
	var formValidation = $('#movieTitle').val().trim();


	if (formValidation == "") {
		$('.form-validation').text("Please enter a valid movie title");

	}

	if (formValidation.length >= 1) {
		$('.form-validation').empty();
	}

	if (formValidation.length >= 30){

		$('.form-validation').text("Please enter a movie title with less than 30 characters");

	}

	
 


}

	








