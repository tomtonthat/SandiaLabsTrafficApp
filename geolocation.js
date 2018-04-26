$(document).ready(function () {

//traveltimespage
  var Carlislse = new google.maps.LatLng(35.055230, -106.604314);
  var Truman = new google.maps.LatLng(35.057476, -106.588603);
  var Gibson = new google.maps.LatLng(35.058033, -106.561149);
  var Wyoming = new google.maps.LatLng(35.048843, -106.550587);
  var Eubank = new google.maps.LatLng(35.054138, -106.533598 );
  var w = document.getElementById("travelTimes");
  
      function getTravelTimes() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          w.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    
      function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng (lat, lng);
  
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [latlng],
        destinations: [Carlislse, Truman, Gibson, Wyoming, Eubank],
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(Date.now() + 0),  // for the time N milliseconds from now.
          trafficModel: 'bestguess'
        },
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      }, callback);
    
      function callback(response, status) {
        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
      
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance.text;
              var duration = element.duration.text;
              var traffic = element.duration_in_traffic.text;
              var from = origins[i];
              var to = destinations[j];
              console.log(response);
              w.innerHTML = "Carlisle: " + response.rows[0].elements[0].duration_in_traffic.text + 
              "<br>Truman: " + response.rows[0].elements[1].duration_in_traffic.text +
              "<br>Gibson: " + response.rows[0].elements[2].duration_in_traffic.text +
              "<br>Wyoming: " + response.rows[0].elements[3].duration_in_traffic.text +
              "<br>Eubank: " + response.rows[0].elements[4].duration_in_traffic.text;
            }
          }
        }
      }
    }
      $('#getTravelTimes').on('click', function(){
        console.log("#getTravelTimes Clicked");
        getTravelTimes();
      });

  //map page
  var y = document.getElementById("map-canvas");
  var mapLatitude;
  var mapLongitude;
  var userlocation;
  var Carlislse = new google.maps.LatLng(35.055230, -106.604314);
  var Truman = new google.maps.LatLng(35.057476, -106.588603);
  var Gibson = new google.maps.LatLng(35.058033, -106.561149);
  var Wyoming = new google.maps.LatLng(35.048843, -106.550587);
  var Eubank = new google.maps.LatLng(35.054138, -106.533598 );

  function getMapLocation() {
    console.log("getMapLocation");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showMapPosition);
    } else {
      y.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showMapPosition(position) {
    console.log("showMapPosition");
    mapLatitude = position.coords.latitude;
    mapLongitude = position.coords.longitude;
    userlocation = new google.maps.LatLng(mapLatitude,mapLongitude);
    getMap();
  }

  function getMap() {
    console.log("getMap");
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng( 35.074210, -106.584101 )
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              mapOptions);
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);    
    var marker0 = new google.maps.Marker({
      position: userlocation,
      map: map,
      title:"You are here!",
      icon: {
        url: "images/markers/svg/sports.svg",
        scaledSize: new google.maps.Size(32, 32)
      }
    });
    var marker1 = new google.maps.Marker({
      position: Carlislse,
      map: map,
      title:"Carlisle Gate",
      icon: {
        url: "images/markers/svg/little-flag.svg",
        scaledSize: new google.maps.Size(32, 32)
      }
    });
    var marker2 = new google.maps.Marker({
      position: Truman,
      map: map,
      title:"Truman Gate",
      icon: {
        url: "images/markers/svg/little-flag.svg",
        scaledSize: new google.maps.Size(32, 32)
      }
    });
    var marker3 = new google.maps.Marker({
      position: Wyoming,
      map: map,
      title:"Wyoming Gate",
      icon: {
        url: "images/markers/svg/little-flag.svg",
        scaledSize: new google.maps.Size(32, 32)
      }
    });
    var marker4 = new google.maps.Marker({
      position: Gibson,
      map: map,
      title:"Gibson Gate",
      icon: {
        url: "images/markers/svg/little-flag.svg",
        scaledSize: new google.maps.Size(32, 32)
      }
    });
    var marker5 = new google.maps.Marker({
      position: Eubank,
      map: map,
      title:"Eubank Gate",
      icon: {
        url: "images/markers/svg/little-flag.svg",
        scaledSize: new google.maps.Size(32, 32)
      }
    });
  }

  $( document ).on( "pageshow", "#mapPage", function( event ) {
    getMapLocation();
  });
});
