import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cadastro;
  login;
  esqueceusenha;
  voltar;
  background;
  buttonbackground;
  numero;

  private url = 'http://localhost:80/CultureService/';
  
  dataNascimentoUsuarioTemp = "";
  
  user = {nomeUsuario: '', senhaUsuario: '', emailUsuario: '', dataNascimentoUsuario: ''};
  senhadois: string;

  userLogin = {login: '', senha: ''};
 
  logar: number;
constructor(public http:Http,private router: Router) {


  window.onload = () => {
      var numero = Math.floor((Math.random()*20)+1);

      this.background = document.getElementById('Container');
      this.background.setAttribute("style","background-image: url(../../assets/IMG/"+numero+".png);");

      console.log(numero);

      if(numero == 1){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2fd9ad !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2fd9ad !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2fd9ad !important;");

      }else if(numero == 2){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #ffd31a !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #ffd31a !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #ffd31a !important;");

      }else if(numero == 3){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #c63041 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #c63041 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #c63041 !important;");

      }else if(numero == 4){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #1b6ce1 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #1b6ce1 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #1b6ce1 !important;");

      }else if(numero == 5){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #1b2334 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #1b2334 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #1b2334 !important;");

      }else if(numero == 6){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2ce56d !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2ce56d !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2ce56d !important;");

      }else if(numero == 7){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #cfcac4 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #cfcac4 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #cfcac4 !important;");

      }else if(numero == 8){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #fa8222 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #fa8222 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #fa8222 !important;");

      }else if(numero == 9){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #e7401c !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #e7401c !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #e7401c !important;");

      }else if(numero == 10){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #d1331d !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #d1331d !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color:  #d1331d !important;");

      }else if(numero == 11){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2ddfdd !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2ddfdd !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2ddfdd !important;");

      }else if(numero == 12){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #eb184b !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #eb184b !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #eb184b !important;");

      }else if(numero == 13){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #6688e7 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #6688e7 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #6688e7 !important;");

      }else if(numero == 14){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

      }else if(numero == 15){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #dd8711 !important;");

      }else if(numero == 15){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #40cfec !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #40cfec !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #40cfec !important;");

      }else if(numero == 16){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #e25e20 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #e25e20 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #e25e20 !important;");

      }else if(numero == 17){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #ae3fd9 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #ae3fd9 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #ae3fd9 !important;");

      }else if(numero == 18){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #b0542c !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #b0542c !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #b0542c !important;");

      }else if(numero == 19){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #2dae19 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #2dae19 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #2dae19 !important;");

      }else if(numero == 20){
        this.buttonbackground = document.getElementById('botaoColorir1');
        this.buttonbackground.setAttribute("style","background-color: #3c92a5 !important;");

        this.buttonbackground = document.getElementById('botaoColorir2');
        this.buttonbackground.setAttribute("style","background-color: #3c92a5 !important;");

        this.buttonbackground = document.getElementById('botaoColorir3');
        this.buttonbackground.setAttribute("style","background-color: #3c92a5 !important;");

      }
    };
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
      resolve =>{
        resolve.text;
        if(resolve.status == 200){
          alert("Cadastrado com sucesso!");
          this.BotaoVoltar();
        }
      }, err =>{
        console.log(err);
      }
    );
  }

  loginUser(){
    this.http.get(this.url + "loginUser.php?login=" + this.userLogin.login + "&senha=" + this.userLogin.senha).subscribe(
      data =>{
        var response = data;
        console.log(response);
        this.logar = response['_body'];
        console.log(this.logar);
        if(this.logar == 1){
          alert("dados Incorretos");
        }else if(this.logar == 2){
          this.router.navigateByUrl("/tabs/tab1");
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

  
ngOnInit() {}

}
