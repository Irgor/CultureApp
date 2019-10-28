import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AppModule } from '../../app.module';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', null) scheduleList: IonList;
  
  private url: string = AppModule.getUrl();

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  usuario;

  eventosCima1 = [];
  eventosCima2 = [];
  eventosBaixo = [];
  eventos;


  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public http:HttpClient,
    public storage: Storage,
    public menuCtrl: MenuController
  ) { 
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }

  preco;
  ngOnInit() {
    this.storage.get('did_login').then(res => {
      if (res !== true) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
    

    this.ios = this.config.get('mode') === 'ios';

    var r = this.http.get(this.url + "getEventos.php");
    r.subscribe(
      data => {
        this.eventos = data;

        console.log(this.eventos);
        var corEvento = {corEvento: ''}; 

        for (let i = 0; i < this.eventos.length; i++) {
          
          if(this.eventos[i].imgEvento == "undefined"){
            this.eventos[i].imgEvento = "../../assets/img/noimage.png";
          }

          if(this.eventos[i].classificacaoIndicativa == "Livre"){
            this.eventos[i].corEvento = "0c9447";

          }else if(this.eventos[i].classificacaoIndicativa == "10 anos"){
            this.eventos[i].corEvento = "0f7dc2";

          }else if(this.eventos[i].classificacaoIndicativa == "12 anos"){
            this.eventos[i].corEvento = "f8c411";
            
          }else if(this.eventos[i].classificacaoIndicativa == "14 anos"){
            this.eventos[i].corEvento = "e67824";
            
          }else if(this.eventos[i].classificacaoIndicativa == "16 anos"){
            this.eventos[i].corEvento = "db2827";
            
          }else if(this.eventos[i].classificacaoIndicativa == "18 anos"){
            this.eventos[i].corEvento = "1d1815";

          }


          if(this.eventos[i].valorEvento == "0"){
            this.preco = "Gratuito";
          }else{
            this.preco = "R$" + this.eventos[i].valorEvento; 
          }

        }


        for (let i = 0; i < 4; i++) {
          this.eventosCima1.push(this.eventos[i]);
        }
        for (let i = 4; i < 8; i++) {
          this.eventosCima2.push(this.eventos[i]);
        }

        for (let i = 8; i < 13; i++) {
          this.eventosBaixo.push(this.eventos[i]);
        }

        console.log(this.eventosCima1);
        console.log(this.eventosCima2);


      }
    );


  }

  abrirEvento(a){
    this.router.navigateByUrl("/evento/" + a);
  }
  
  listarEventos(type){
    this.router.navigate(["/listar-eventos/" + type]);
  }

  abrirCat(x){
    this.router.navigateByUrl("/listar-eventos/" + x);
  }

  abrirSite(x){
    this.router.navigateByUrl("/listar-eventos/" + x);
  }

  abrirHoje(){
    this.router.navigateByUrl("/listar-eventos/hoje");
  }

  
}
