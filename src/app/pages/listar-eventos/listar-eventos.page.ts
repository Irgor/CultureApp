import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonContent } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.page.html',
  styleUrls: ['./listar-eventos.page.scss'],
})
export class ListarEventosPage implements OnInit {
  @ViewChild(IonContent, null) IonContent: IonContent;

  constructor(public http:HttpClient, private route: ActivatedRoute, private router:Router, private storage:Storage) { }

  private url: string = AppModule.getUrl();
 
  events = [];
  
  preco;


  type: string;
  codEventos;
  private sub: any;

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
   });

    var r = null;
    if(this.type === "Geral"){
      r = this.http.get(this.url + "getEventos.php");
    }else if(this.type === "ita" || this.type === "sesc"){
      r = this.http.get(this.url + "getEventosSite.php?origem=" + this.type);

    }else if(this.type == 'favs'){
      r = "favs";
      await this.storage.get("favs").then(
         res => {
          this.codEventos = res;
          console.log(this.codEventos);
        }
      );
    }else if(this.type.includes("cat")){
      var param = this.type.split("_");
      var categoria = param[1];
      console.log(categoria);
      r = this.http.get(this.url + "getEventosByCat.php?cat=" + categoria);
    }else if(this.type == "hoje"){
      r = this.http.get(this.url + "getEventosByData.php");
    }else if(this.type.includes("classi")){
      var param = this.type.split("_");
      var classi = param[1];
      r = this.http.get(this.url + "getEventosByClassi.php?classi=" + classi);
    }
    


    if(r != 'favs'){
      r.subscribe(
        data =>{
          this.events = data;
          console.log(this.events);
          for (let i = 0; i < this.events.length; i++) {
            
            

            if(this.events[i].imgEvento == "undefined"){
              this.events[i].imgEvento = "../../assets/img/noimage.png";
            }
            
            if(this.events[i].valorEvento == "0"){
              this.preco = "Gratuito";
            }else{
              this.preco = "R$" + this.events[i].valorEvento; 
            }
            
          }
          
          console.log(data);
          
          
        }
      );
    }else if(r == 'favs'){
      for (let i = 0; i < this.codEventos.length; i++) {
        if(this.codEventos[i].length != 0){
          var s = this.http.get(this.url + "getEventoByCod.php?cod=" + this.codEventos[i].cod);
          s.subscribe(
            data => {
              this.events.push(data);
            }
          );
        }
      }
    }
        
  }

  abrirEvento(cod){
    this.router.navigate(["/evento/" + cod]);
  }
  

}
