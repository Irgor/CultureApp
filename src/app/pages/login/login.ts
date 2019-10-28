import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AppComponent } from '../../app.component';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Storage } from '@ionic/storage';
import { AppModule } from '../../app.module';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  cadastro;
  login;
  esqueceusenha;
  voltar;
  background;
  buttonbackground;
  numero;

  // url = 'http://cultureapi.atwebpages.com/CultureService/';
  private url: string = AppModule.getUrl();
  
  dataNascimentoUsuarioTemp = "";
  
  user = {nomeUsuario: '', senhaUsuario: '', emailUsuario: '', dataNascimentoUsuario: ''};
  senhadois: string;

  userLogin = {login: '', senha: ''};
 
  logar: number;
constructor(public http:HttpClient,private router: Router, public storage: Storage, public afAuth: AngularFireAuth, public app:AppComponent,  public menuCtrl: MenuController) {
  this.menuCtrl.enable(false);
  this.menuCtrl.swipeEnable(false);
}


  saveUser(){
    var dataN = this.dataNascimentoUsuarioTemp.substring(0,10);
    this.user.dataNascimentoUsuario = dataN;
    
    if(this.senhadois != this.user.senhaUsuario){
      alert("As senhas nao coinciden");
    }else{
      var data = JSON.stringify(this.user);
      this.cadastroUser(data);
    }

  }

  cadastroUser(data){
    this.http.get(this.url + "cadUser.php?json=" + data).subscribe(
      data =>{
        console.log(data);
        if(data[0] == 0){
          alert("Erro ao Cadastrar");
        }else if(data[0] == -1){
          alert("Email já existe");                 
        }else{
          this.BotaoVoltar();      
        }
      }, err =>{
        console.log(err);
      }
    );
  }

  usuario;
  nome;
   loginUser(){
    this.http.get(this.url + "loginUser.php?login=" + this.userLogin.login + "&senha=" + this.userLogin.senha).subscribe(
       data =>{
        console.log(data);
        if(data[0] == 0){
          alert("dados Incorretos");
        }else{
          this.storage.set("cod", data[0]);
          this.storage.set("did_login", true);

          var r = this.http.get(this.url + "/getDadosUsuario.php?cod=" + data[0]);
            r.subscribe(
               data => {
                this.usuario = data[0];
                console.log(this.usuario.nomeUsuario);
                 this.storage.set('user', this.usuario.nomeUsuario);
                 this.app.usuarioLogin();
                 this.router.navigateByUrl("/tutorial");
              }
          );
        }
      }, err =>{
        console.log(err);
      }
    );
    
  }

  BotaoVoltar(){
    this.login = document.getElementById('Logar');
    this.login.setAttribute("class","login animacaoItens");
    this.login.setAttribute("style","display: block");

    this.cadastro = document.getElementById('Cadastro');
    this.cadastro.setAttribute("style","display: none;");

    this.esqueceusenha = document.getElementById('EsqueceuSenha');
    this.esqueceusenha.setAttribute("style","display: none;")

    this.voltar = document.getElementById('voltarBut');
    this.voltar.setAttribute("style","display: none");

    
  }

  Cadastrar(){
    this.login = document.getElementById('Logar');
    this.login.setAttribute("style","display: none");

    this.cadastro = document.getElementById('Cadastro');
    this.cadastro.setAttribute("class","login animacaoItens");
    this.cadastro.setAttribute("style","display: block;");

    this.voltar = document.getElementById('voltarBut');
    this.voltar.setAttribute("style","display:block");

  }

  ForgotPass(){
    this.login = document.getElementById('Logar');
    this.login.setAttribute("style","display: none");
    
    this.esqueceusenha = document.getElementById('EsqueceuSenha');
    this.esqueceusenha.setAttribute("class","login animacaoItens")
    this.esqueceusenha.setAttribute("style","display: block;");

    this.voltar = document.getElementById('voltarBut');
    this.voltar.setAttribute("style","display:block");
  }

  ngOnInit(){

    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);

    this.storage.get("did_login").then(res => {
      if (res) {
        this.router.navigateByUrl('/tutorial', { replaceUrl: true });
      }
    });

    
      var numero = Math.floor((Math.random()*20) + 1);

      
      var imgs = ['https://imgur.com/zqEVSZ1', 'https://imgur.com/L0yczdC', 'https://imgur.com/1M4feJt', 'https://imgur.com/9euZJCq', 'https://imgur.com/NYgATtR', 'https://imgur.com/zNMI9HC', 'https://imgur.com/ziyG8Bm', 'https://imgur.com/dAnMvpp', 'https://imgur.com/Rjaq2Xb', 'https://imgur.com/ZsyqH66', 'https://imgur.com/xsEtlCA', 'https://imgur.com/NWckoZ8', 'https://imgur.com/30p94xx', 'https://imgur.com/lZNGvmN', 'https://imgur.com/TXwgLQE', 'https://imgur.com/cSTIqqO', 'https://imgur.com/kUwLdBd', 'https://imgur.com/JI3AcmV', 'https://imgur.com/byzD6Jb', 'https://imgur.com/6km5nxs']

      this.background = document.getElementById('Container');
      this.background.setAttribute("style","--background: url("+imgs[numero - 1]+".png) no-repeat center center / cover");

      console.log(imgs[numero]);

      if(numero == 1){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2fd9ad !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #2fd9ad !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2fd9ad !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2fd9ad !important;");

      }else if(numero == 2){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #ffd31a !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #ffd31a !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #ffd31a !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #ffd31a !important;");

      }else if(numero == 3){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #c63041 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #c63041 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #c63041 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #c63041 !important;");

      }else if(numero == 4){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #1b6ce1 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #1b6ce1 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #1b6ce1 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #1b6ce1 !important;");

      }else if(numero == 5){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #1b2334 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #1b2334 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #1b2334 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #1b2334 !important;");

      }else if(numero == 6){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2ce56d !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #2ce56d !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2ce56d !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2ce56d !important;");

      }else if(numero == 7){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #cfcac4 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #cfcac4 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #cfcac4 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #cfcac4 !important;");

      }else if(numero == 8){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #fa8222 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #fa8222 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #fa8222 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #fa8222 !important;");

      }else if(numero == 9){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #e7401c !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #e7401c !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #e7401c !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #e7401c !important;");

      }else if(numero == 10){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #d1331d !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #d1331d !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #d1331d !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color:  #d1331d !important;");

      }else if(numero == 11){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2ddfdd !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #2ddfdd !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2ddfdd !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2ddfdd !important;");

      }else if(numero == 12){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #eb184b !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #eb184b !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #eb184b !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #eb184b !important;");

      }else if(numero == 13){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #6688e7 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #6688e7 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #6688e7 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #6688e7 !important;");

      }else if(numero == 14){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #dd8711 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

      }else if(numero == 15){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #dd8711 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

      }else if(numero == 15){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #40cfec !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #40cfec !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #40cfec !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #40cfec !important;");

      }else if(numero == 16){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #e25e20 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #e25e20 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #e25e20 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #e25e20 !important;");

      }else if(numero == 17){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #ae3fd9 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #ae3fd9 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #ae3fd9 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #ae3fd9 !important;");

      }else if(numero == 18){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #b0542c !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #b0542c !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #b0542c !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #b0542c !important;");

      }else if(numero == 19){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2dae19 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #2dae19 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2dae19 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2dae19 !important;");

      }else if(numero == 20){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #3c92a5 !important;");

        this.buttonbackground = document.getElementById('botaoColorir4');
        this.buttonbackground.setAttribute("style","--background: #3c92a5 !important;");
        
        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #3c92a5 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #3c92a5 !important;");

      
    };
  }

  ngAfterContentInit()  {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }
  ngAfterViewInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  async loginGoogle(){
      await this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
      console.log(this.afAuth);

      // i:f(a.user.emailVerified){
      //   this.storage.set("cod", '0');
      //   this.storage.set("did_login", true);
      //   console.log(a);
      //   var aux = JSON.stringify(a);
      //   this.storage.set('user', aux);
      //   this.app.usuarioLogin();
      //   this.router.navigateByUrl('/tutorial', { replaceUrl: true });
      // }
  }


}
