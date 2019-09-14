import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  
    url = "http://localhost/cultureservice/";
    events = [];
  
    constructor(public http:Http) {}
  
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

}