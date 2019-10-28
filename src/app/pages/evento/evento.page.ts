import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var google;
@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  
  constructor(public http:HttpClient, private router:Router, private route: ActivatedRoute, private geolocation: Geolocation,  public storage: Storage, private navCtrl: NavController) {}
  private url: string = AppModule.getUrl();


  cod;
  private sub: any;
  img = "../../assets/img/load.png";

  evento = [];
  temp;
  preco;

  coracao;
  site = "";
  cat;
  eventosBaixo1 = [];
  eventosBaixo2 = [];
  isIndicacoes = true;
  ngOnInit() { 

    



    var map;
    var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
    var directionsService = new google.maps.DirectionsService();

    var local = [];
    var tempdata
    this.sub = this.route.params.subscribe( params => {
      this.cod = params['cod'];

      this.storage.get("favs").then(
        res => {
          for (let i = 0; i < res.length; i++) {
            if(this.cod == res[i].cod){
              var el = document.getElementById("fav");
              el.setAttribute("name","heart");
            }
            
          }
        }
      );

      var r =  this.http.get(this.url + "getEventoByCod.php?cod=" + this.cod );
      r.subscribe(
        async data => {
          this.temp = data;
          this.evento = this.temp;
          console.log(this.evento);
          var datae = this.evento['dataInicioEvento'];
          datae = datae.substring(5,datae.length);
          datae = datae.replace("-","/");
          console.log(datae);
          this.evento['dataInicioEvento'] = datae;
          this.img = this.evento['imgEvento'];
          if(this.evento['valorEvento'] == "0"){
            this.preco = "Gratuito";
          }else{
            this.preco = "R$" + this.evento['valorEvento']; 
          }

          if(this.evento['origemEvento'] == "Itau Cultural"){
            this.site = "/ita";
          }else if(this.evento['origemEvento'] == "Sesc"){
            this.site = "/sesc";
          }
          this.cat = this.evento['nomeCategoria'];

          var cat = this.evento['nomeCategoria'];
          console.log(cat);

          var s = this.http.get(this.url + "getEventosByCat.php?cat=" + cat);
          s.subscribe(
            data =>{
              var a = data;
              if(a['length'] < 4){
                this.isIndicacoes = false;
              }
              for(let i = 0; i < a['length']; i++){
                if(i <= 1){
                  this.eventosBaixo1.push(a[i]);
                }else{
                  this.eventosBaixo2.push(a[i]);
                }
                if(i == 3){
                  break;
                }
              }
            }
          );



          console.log("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.evento['logradouroEvento'] + " " + this.evento['numeroEvento'] + "+CA&key=AIzaSyCAckKLHl-T6HPk2pTVfxrjHXf4yLojpfw&amp");
          var req =  this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.evento['logradouroEvento'] + "+CA&key=AIzaSyCAckKLHl-T6HPk2pTVfxrjHXf4yLojpfw&amp");
          req.subscribe(
            data => {
              tempdata = data;
              local = tempdata
              console.log(local);

                var locallng = local['results'][0].geometry.location.lng;
                var locallat = local['results'][0].geometry.location.lat;

                directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...
                var latlng = new google.maps.LatLng(locallat,  locallng);


                var mapa = new google.maps.Map(document.getElementById('mapa'), {
                    zoom: 18,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP   
                });

                directionsDisplay.setMap(mapa);

                var marker = new google.maps.Marker({
                  position: latlng,
                  map: mapa,
                  icon: "../../assets/img/pinCulture.png"
                });
  

                var localLat;
                var localLng;

                this.geolocation.getCurrentPosition().then((resp) => {
                  localLat = resp.coords.latitude
                  localLng =  resp.coords.longitude

                  var coordPartida = new google.maps.LatLng(localLat,  localLng);

                  var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                    origin: coordPartida, // origem
                    destination: latlng, // destino
                    travelMode: google.maps.TravelMode.TRANSIT   // meio de transporte, nesse caso, de carro
                  };
                
                  directionsService.route(request, function(result, status) {
                      if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                        directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
                      }
                  });


                  

                });


            });
          });

         

        });

   
  }

  fuckGoBack() {
    this.navCtrl.back();
  }

  fav(x){
    var el = document.getElementById("fav");
    var obj = {cod: x};
    this.storage.get('favs').then(
      res => {
       var pass = true;
       if(res == null ){
          res = [obj];
          el.setAttribute("name","heart");
        }else {
          var ex = false;
          var ind = 0;
          for(let i = 0; i < res.length; i++){
            if(res[i].cod == obj.cod){
              ex = true;
              ind = i;
            }
          }

          if(ex){
            console.log(ind);
            res = res.slice(0, ind);
            res.push(res.slice(ind, res.length + 1));
            el.setAttribute("name","heart-empty");
          }else{
            res.push(obj);
            el.setAttribute("name","heart");
          }




        }

        this.storage.set('favs', res);

        

      }
    );

  }
  eventosSite(){
    this.router.navigateByUrl("/listar-eventos" +  this.site);
  }

  eventosCat(){
    var param = "/cat_" + this.cat;
    this.router.navigateByUrl("/listar-eventos" +  param);
  }

  eventosClassi(){
    var param = "/classi_" + this.evento['classificacaoIndicativa'];
    this.router.navigateByUrl("/listar-eventos" +  param);
  }
  
 
  

}
