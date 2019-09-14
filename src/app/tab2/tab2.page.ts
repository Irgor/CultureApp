import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  evento = [];
  status;

  url = "http://localhost/cultureservice/";
  constructor(private route: ActivatedRoute, public http:Http,private router: Router, private geolocation: Geolocation) {}

  rua;



  ngOnInit(){
    var map;
    var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
    var directionsService = new google.maps.DirectionsService();

    this.route.params.subscribe( parametros => {
      if (parametros['id']) {
        var id = parametros['id'];

        var local = [];

        this.http.get(this.url + "getEventoByCod.php?cod=" + id).subscribe(
          data => {
            console.log(JSON.parse(data['_body']));
            this.evento = JSON.parse(data['_body'])[0];
            if(this.evento['statusEvento'] == 1){
              this.status = "Aberto";
            }else{
              this.status = "Fechado"
            }

            

            this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.evento['logradouroEvento'] + "+CA&key=AIzaSyCAckKLHl-T6HPk2pTVfxrjHXf4yLojpfw&amp").subscribe(
              data => {
                local = JSON.parse(data["_body"]);
                local = local['results']['0'].geometry.location
                console.log(local);
                
                var coordenadas = local;


                directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...
                var latlng = new google.maps.LatLng(local['lat'],  local['lng']);


                var mapa = new google.maps.Map(document.getElementById('mapa'), {
                    zoom: 18,
                    center: coordenadas,
                    mapTypeId: google.maps.MapTypeId.ROADMAP   
                });

                directionsDisplay.setMap(mapa);

                var marker = new google.maps.Marker({
                  position: coordenadas,
                  map: mapa,
                });
  

                var localLat;
                var localLng;

                this.geolocation.getCurrentPosition().then((resp) => {
                  localLat = resp.coords.latitude
                  localLng =  resp.coords.longitude

                  var coordPartida = new google.maps.LatLng(localLat,  localLng);

                  var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                    origin: coordPartida, // origem
                    destination: this.evento['logradouroEvento'], // destino
                    travelMode: google.maps.TravelMode.TRANSIT // meio de transporte, nesse caso, de carro
                  };
                
                  directionsService.route(request, function(result, status) {
                      if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                        directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
                      }
                  });


                }).catch((error) => {
                  console.log('Error getting location', error);
                });
                
              }
            );


          }
        );
      }
    });

    
    
  }

  voltarEvento(){
    this.router.navigateByUrl("/tabs/tab1");
  }

}
