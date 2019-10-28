import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';


import { Events, MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  appPages = [
    {
      title: 'Início',
      url: '/app/tabs/schedule',
      icon: 'home'
    },
    {
      title: 'Notificações',
      url: '/app/tabs/speakers',
      icon: 'notifications'
    },
    {
      title: 'Localização',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'Mensagens',
      url: '/app/tabs/about',
      icon: 'mail'
    }
  ];
  loggedIn = true;
  dark = false;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    public http:HttpClient,
    public menuCtrl:MenuController
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
  

    this.usuarioLogin();

  }

  async usuarioLogin(){
    await this.storage.get('did_login').then(res => {
      if (res !== true) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
    await this.storage.get("cod").then(cod => {
      if(cod == '-1'){
        this.usuario.push('...');
      }else if(cod == '0'){
        this.storage.get('user').then(data => {

          this.googleLogin = true;
          this.usuario = JSON.parse(data);
          console.log(this.usuario);
        })
      }else{
        this.googleLogin = false;
        this.storage.get('user').then(data => {
          this.usuario = data;
        })
      }
    });
  }

  googleLogin = false;
  usuario = [];

  // url = "http://cultureapi.atwebpages.com/CultureService/";
  //url = "http://localhost/cultureservice/";

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.statusBar.show();
      this.splashScreen.hide();
    });

   
    

  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
      this.storage.set("did_login", false);
      this.storage.set("cod", '-1');
      this.storage.set('user', '');
      this.menuCtrl.enable(false);
      this.menuCtrl.swipeEnable(false);
      return this.router.navigateByUrl('/login');
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

}
