import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit, OnDestroy {
  public map: GoogleMap;
  public mapId = 'resultMap';

  private _destroy$ = new Subject();

  constructor(private platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public async loadMap() {
    const userCurrentLocation = { latitude: 0, longitude: 0 };

    this.map = GoogleMaps.create(this.mapId, {
      gestures: {
        rotate: false,
        scroll: false,
        tilt: false,
        zoom: false
      },
      controls: {
        zoom: false,
        mapToolbar: false,
        compass: false,
        myLocationButton: false,
        myLocation: false
      },
      mapType: 'MAP_TYPE_NORMAL',
      camera: {
        tilt: 0,
        bearing: 0,
        padding: 170,
        target: [
          {
            lat: userCurrentLocation.latitude,
            lng: userCurrentLocation.longitude
          }
        ]
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is loaded');
      this.map.addMarkerSync({
        position: {
          lat: userCurrentLocation.latitude,
          lng: userCurrentLocation.longitude
        }
      });
    });
  }
}
