function initialize() {
    var coordenadas = {lat: -23.5540153, lng: -46.3981533};

    var mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 18,
        center: coordenadas,
        mapTypeId: google.maps.MapTypeId.ROADMAP   
    });

}
initialize();