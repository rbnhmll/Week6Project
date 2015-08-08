var app = {};
app.location = "";
app.keywords = {};
app.etsyResult = {};
app.masterItem = {};
app.image = {};
app.offset = 0;



app.init = function() {
	app.grabInputs();
};

//On submit grab location and keywords from form.
app.grabInputs = function() {
	
	$(".submit").on("click", function(evnt){
		evnt.preventDefault();
		if ($(".city").val() === "" && $(".keyword").val() === "") {
			alert("Please fill in your city and keyword(s).");
		}
		else if ($(".city").val() === "") {
			alert("Please fill in your city.");
		}
		else if ($(".keyword").val() === "") {
			alert("Please fill in your search keywords.");
		}
		else {
			$(".results-container").empty();
			app.location = $(".city").val();
			app.keywords = $(".keyword").val();
			// console.log(app.location);
			// console.log(app.keywords);
			app.ajaxCall();
		}
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
			offset: app.offsetMultiplier,
			includes: "MainImage"
		},
	});

	$.when(etsyCall).then(function(res) {
		$(".nav-controls").removeClass("hide");
		var etsyResult = res.results;
		// console.log(etsyResult);
		app.runResults(etsyResult);
	});
};


function truncate(name, charLength){
   if (name.length > charLength)
   return name.substring(0,charLength)+	'...';
   else
      return name;
}

//Trun function limits the character length of name and description



 app.runResults = function(etsyResult) {
 	if (etsyResult.length === 0) {
 		var giphy = $("<img>").attr("src", "http://i.giphy.com/lrNS45C9Df904.gif").addClass("giphy");
 		var none = $("<h3>").text("Oops, your keywords do not return any results for your city. Try making your query more general. Or maybe it's just not your day? These things happen.");
 		$(".results-container").append(none.addClass("oops"), giphy);
 		$(".nav-controls").addClass("hide");
 	}
	for (var i = 0; i < etsyResult.length; i++) {
	//Define variables for API call stuff.
		var masterItem = etsyResult[i];
		var image = masterItem.MainImage.url_fullxfull;
		var name = $('<h3>').text(truncate(masterItem.title, 20));
		var price = $("<p>").text('$' + masterItem.price);
		var description = $('<p>').addClass('etsy-description').text(truncate(masterItem.description, 150));
		console.log(masterItem);
		var link = masterItem.url;
		etsyLink = $("<a target='_blank'>").attr('href', link).text('Buy on Etsy');
		var makeDiv = $("<div>").addClass("priceBuy");
		var itemImage = $('<div>').addClass('img-responsive');
		itemImage.css('backgroundImage', 'url(' + image + ')');
		var titleContainer = $('<div>').addClass("title-container");
		var $etsyContainer = $('<div>').addClass("etsy-container");
		
		$etsyContainer.append(itemImage, titleContainer.append(name), description, makeDiv.append(price, etsyLink) ).fadeIn(1000);
	$(".results-container").append($etsyContainer);
	}
};


$(".show-more").on("click", function(){
	app.offset += 1;
	app.offsetMultiplier = app.offset * 12;
	app.ajaxCall();
});



$(function(){
	app.init();
});








