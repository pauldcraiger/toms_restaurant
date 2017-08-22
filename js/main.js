// Set up and initialize Google Map

var map;

function initMap() {
// Styles a map in night mode.
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.8054491, lng: -73.9654415},
      zoom: 15,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
            ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
            ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#bdbdbd"
          }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
            ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
      ]
    }
  ] 
});

var marker = new google.maps.Marker({
      position: {lat: 40.8054491, lng: -73.9654415},
      map: map,
      title: "Tom's Restaurant"
    });
}

// Set up and initialize Firebase


// this information is provided by Firebase when you create the project
var config = {
    apiKey: "AIzaSyAGWWgvacPrxHhAswNAEqjSpKzdHNhtWm0",
    authDomain: "toms-restaurant.firebaseapp.com",
    databaseURL: "https://toms-restaurant.firebaseio.com",
    projectId: "toms-restaurant",
    storageBucket: "",
    messagingSenderId: "967146365202"
};

firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {};

// listen for reservation form submit and use form data
$('#makeReservation').on('submit', function(event) {
  event.preventDefault();
  reservationData.name = $('.reservation-name').val();
  reservationData.day = $('.reservation-day').val();

  // create a collection for reservations
  var reservationReference = database.ref('reservations');

  // add form data to the database
  reservationReference.push(reservationData);

  // reset the form fields
  $('.reservation-name').val('');
  $('.reservation-day').val('');

});

<!--
// listen for when a reservation is deleted
$(".reservationsBody").on("click", function() {
  console.log($(this));
});
-->

// listen for reservation changes in the database
function getReservations(msg) {
  console.log(msg);

  // when database activity occurs
  database.ref('reservations').on('value', function(results) {

    // assign Firebase object to a variable
    var allReservations = results.val();
    console.log("results: " + results);

    // remove all reservations from DOM before appending list reservations
    console.log("Empty the reservations table");
    $('#reservationsTable > tbody').empty();

    // iterate (loop) through all returned reservations
    
    for (var entry in allReservations) {

      var name = allReservations[entry].name;
      var day = allReservations[entry].day;
      var referenceId = entry;

      var tableRow = "<tr data-id=" + referenceId + "><td>" + name + "</td><td>" + day + "</td></tr>";
      $('#reservationsTable > tbody:last-child').append(tableRow);

    } 

  });

}
getReservations("initial load");