import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  
    url = "http://localhost/cultureservice/";
    events = [];
  
    constructor(public http:Http,private router: Router) {}
  
    ngOnInit(){
      this.http.get(this.url+"getEventos.php").subscribe(
        data => {
          var resp = data['_body'];
          var json = JSON.parse(resp);
          console.log(json);
          this.events = json;
        }
      );
    }

    abrirEvento(a){
      this.router.navigate(["/tabs/tab2/" + a]);
    }

}
