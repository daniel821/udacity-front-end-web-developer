'use strict';

var map;
// Top 10 Tourist Attractions in Sydney CBD
var attractions = [
	{ name:'Royal Botanic Gardens, Sydney', lat: -33.8641859, long: 151.2165708 },
	{ name:'Chinese Garden of Friendship', lat: -33.8765192, long: 151.2027618 },
	{ name:'St Mary\'s Cathedral, Sydney', lat: -33.8711905, long: 151.2133254 },
	{ name:'Queen Victoria Building', lat: -33.8722587, long: 151.2043105 },
	{ name:'Sydney Harbour Bridge', lat: -33.8523018, long: 151.2085984 },
	{ name:'Sydney Opera House', lat: -33.8566708, long: 151.2141916 },
	{ name:'The Rocks, Sydney', lat: -33.8587583, long: 151.2036359 },
	{ name:'Hyde Park, Syndey', lat: -33.8731383, long: 151.2112757 },
	{ name:'Darling Harbour', lat: -33.8748755, long: 151.1987113 },
	{ name:'Sydney Tower', lat: -33.8704515, long: 151.2067003 }
];

function Location(attraction) {
	var self = this;
	this.title = attraction.name;
	this.lng = attraction.long;
	this.lat = attraction.lat;
	this.visible = ko.observable(false);
	this.infowindow = new google.maps.InfoWindow();


	// Set InfoWindow content from wikipedia search
	this.getContent = function() {
		var wikiLinks = [];
		var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + self.title + '&format=json&callback=wikiCallback';

		$.getJSON({
			url: wikiUrl,
			dataType: "jsonp",
			}).done(function(response){
				var resultList = response[1];
				for (var i=0; i < resultList.length; i++){
					var resultStr = resultList[i];
					var link = 'http://en.wikipedia.org/wiki/' + resultStr;
					wikiLinks.push('<li><a href="' + link + '" target="_blank">' + resultStr + '</a></li>');
				}
				if (wikiLinks.length > 0){
					self.content = '<h2>' + self.title + '</h2>' + wikiLinks;
				} else {
					self.content = '<h2>' + self.title + '</h2>' + '<h4>No Content Found</h4>';
				}
			}).fail(function() {
				self.content = '<h2>' + self.title + '</h2>' + '<h4>Failed to load. Something went wrong...</h4>';
				console.log('getJSON request failed...');
			});
	}();

	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(attraction.lat, attraction.long),
		map: map,
		title: attraction.name,
	});

	this.showMarker = ko.computed(
		function() {
			if(this.visible() === true) {
				this.marker.setMap(map);
			} else {
				this.marker.setMap(null);
			}
			return true;
		}, this);

	//Configure infowindow and Animation
	this.openInfowindow = function() {
		map.panTo(self.marker.getPosition());
		self.infowindow.setContent(self.content);
		self.infowindow.open(map, self.marker);
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
      	setTimeout(
			function() {
				self.infowindow.close();
	      		self.marker.setAnimation(null);
	     	}, 2100
		);
	};

	this.addListener = google.maps.event.addListener(
		self.marker,'click', this.openInfowindow
	);
}

function AppViewModel() {
	var self = this;

	this.query = ko.observable('');
	this.locations = ko.observableArray([]);

	attractions.forEach(function(location){
		self.locations.push( new Location(location));
	});

    map = new google.maps.Map(
        document.getElementById('map'), {
	        zoom: 15,
	        center: new google.maps.LatLng(-33.8629342, 151.2093885),
	        disableDefaultUI: true
		});

	// Keyword filter and list all locations by default
	this.filteredLocations = ko.computed(
		function(){
			var search = self.query().toLowerCase();
			if (!search){
				self.locations().forEach(
					function(location){
						location.visible(true);
					});
				return self.locations();
			} else {
				return ko.utils.arrayFilter(self.locations(),
					function(location) {
						var isVisble = location.title.toLowerCase().indexOf(search) >= 0;
						location.visible(isVisble);
						return isVisble;
				});
			}
		}, self);
}

function initMap() {
	ko.applyBindings(new AppViewModel());
}

function error() {
	alert("Google Maps failed to load...");
}
