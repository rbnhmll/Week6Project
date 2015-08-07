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
		// console.log(app.location);
		// console.log(app.keywords);
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
		// console.log(etsyResult);
		app.runResults(etsyResult);
	});
};

app.runResults = function(etsyResult) {

	for (var i = 0; i < etsyResult.length; i++) {
	//Define variables for API call stuff.
		var masterItem = etsyResult[i];
		console.log(masterItem);
		var image = masterItem.MainImage.url_fullxfull;
		var name = $('<h3>').text(masterItem.title);
		var price = $("<p>").text(masterItem.price);
		var description = $('<p>').addClass('etsy-description').text(masterItem.description);
		var link = masterItem.url;
		etsyLink = $("<a>").attr('href', link).text('Buy on Etsy');
		// var div = $('<div>').addClass('img-responsive').css('backgroundImage', 'url(' + image + ')');
		var itemImage = $('<div>').addClass('img-responsive');
		itemImage.css('backgroundImage', 'url(' + image + ')');
		var $etsyContainer = $('<div>').addClass("etsy-container");
		// $etsyContainer.append(item);
		$etsyContainer.append(itemImage, name, description, price, etsyLink)
	$(".results-container").append($etsyContainer);
	};
// $('<.img-responsive>').css('background-image', 'url(' + image + ')'); 
	//practice again!!!!!!!!!!!!<img src=" + image +  ">!!!!!!!!!!!!!!!!!!!!!!!!!*************
};




$(function(){
	app.init();
});