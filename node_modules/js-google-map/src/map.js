let google;

class Map {

  setMap(DivId, centerLat, centerLng, zoom) {
    let mapDiv = document.getElementById(DivId);
    let map = new google.maps.Map(mapDiv, {
      center: {lat: centerLat, lng: centerLng},
      zoom: zoom
    });
    console.log("map is set and ready");
    return map;
  }

}

export {Map};
