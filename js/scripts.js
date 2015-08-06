var app = {};
app.location = "";
app.keywords = {};


app.init = function() {
	app.grabInputs();
};

//On submit grab location and keywords from form.
app.grabInputs = function() {
	
	$(".submit").on("click", function(evnt){
		evnt.preventDefault();
		app.location = $(".city").val();
		app.keywords = $(".keyword").val();
		console.log(app.location);
		console.log(app.keywords);
		app.ajaxCall();
	});

};


app.ajaxCall = function() {
	var etsyCall = $.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "hbizcfvbrwvtk55vvj68ohdm",
			location: app.location,
			keywords: app.keywords,
			who_made: "i_did",
			includes: "MainImage"
		},
		// success: function(){
		// console.log("It worked!");}
	});

	$.when(etsyCall).then(function(res) {
		var etsyResult = res;
		console.log(etsyResult);
		// app.displayVenues(venueResult);
	});
};

$(function(){
	app.init();
});