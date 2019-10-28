import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { darkStyle } from './map-dark-style';

declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', null) mapElement: ElementRef;

  constructor(
    private geolocation: Geolocation,
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform,
    ) {}

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyCAckKLHl-T6HPk2pTVfxrjHXf4yLojpfw'
    );

    let map;
    this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;
      
      var localLat;
      var localLng;
      var latlng;
      this.geolocation.getCurrentPosition().then((resp) => {
        localLat = resp.coords.latitude
        localLng =  resp.coords.longitude
        latlng = new google.maps.LatLng(localLat,  localLng);

        map = new googleMaps.Map(mapEle, {
          center: latlng,
          zoom: 16,
          styles: style,
        });
  
        mapData.forEach((markerData: any) => {
            const infoWindow = new googleMaps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });
  
          const marker = new googleMaps.Marker({
            position: latlng,
            map,
            title: markerData.name,
            icon: "../../assets/img/pinCulture.png"
          });
  
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
  
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      }).catch((error) => {
          alert(error);
      });


      
    });

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({styles: darkStyle});
          } else if (map) {
            map.setOptions({styles: []});
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

