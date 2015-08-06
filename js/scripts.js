var app = {};
app.location = "";
app.keywords = {};
app.offset = "";
app.etsyResult = {};
app.masterItem = {};
app.image = {};


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
			limit: 12,
			offset: 0,
			includes: "MainImage"
		},
	});

	$.when(etsyCall).then(function(res) {
		var etsyResult = res.results;
		console.log(etsyResult);
		app.runResults(etsyResult);
	});
};

app.runResults = function(etsyResult) {
	for (var i = 0; i < etsyResult.length; i++) {
	//Define variables for API call stuff.
		var masterItem = etsyResult[i];
		console.log(masterItem);
		var image = masterItem.MainImage.url_fullxfull;
		console.log(image);
		// app.itemName = app.Results.
		// app.itemPrice = app.Results.
		// app.itemDescription = app.Results.
		// app.link = app.Results.	
	}
};



$(function(){
	app.init();
});