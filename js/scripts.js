var app{}

// var lat = 43.648622;
// var lon= -79.397335;
// Above long and lat is for Tdot. In variables in case we need to use them later 

app.init = function() {

  console.log('test check');

  navigator.geolocation.getCurrentPosition(function(success) {
    // console.log('etsy api sucks');
    app.lat = success.coords.latitude;
    app.lon = success.coords.longitude;
    console.log(success);
  });

  

}

$(function(){
  app.init();
});
