import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides, IonContent } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild(IonContent, null) content: IonContent;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
    ) {
      var pri = {msg: this.frases[0], who: 0};
      this.shirley.push(pri);
      var resp = {msg: '', who: 0};
      resp.msg = this.frases[this.cont];
      resp.who = 0;
      this.shirley.push(resp);
      this.cont++;
    }

    cont = 1;

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/schedule', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  //aqui começa o meu (dedo no cu e gritaria)
  frases = ['Eu sou a Shirley e irei te auxiliar durante a sua primeira experiência com o nosso App!', 'Vamos começar?', '../../assets/'];
  shirley = [];

  frasesN = ['Prazer, sou a Shirley, um Bot que irá te ajudar a entender o nosso app!', 'Prazer, sou a Shirley, um Bot que irá te ajudar a entender o nosso app!'];
  
  next(){
    var obj = {msg: '', who: 0, img: ''};
    obj.msg = 'Ok! Entendi.';
    obj.who = 1;
    this.shirley.push(obj);

    var resp = {msg: '', who: 0};
    resp.msg = this.frases[this.cont];
    resp.who = 0;
    this.shirley.push(resp);
    this.cont++;
    
    this.content.scrollToBottom(200);
  }

  volta(){
    var obj = {msg: '', who: 0};
    obj.msg = 'Não entendi.';
    obj.who = 1;
    this.shirley.push(obj);
    
    this.cont--;
    var resp = {msg: '', who: 0};
    resp.msg = this.frasesN[this.cont];
    resp.who = 0;
    this.shirley.push(resp);
    this.cont++;
    
    this.content.scrollToBottom(200);
  }


}
