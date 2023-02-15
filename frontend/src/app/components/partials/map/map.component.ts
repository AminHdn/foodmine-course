import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { icon, LatLng, latLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, TileLayer, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input()
  order!:Order;
  @Input()
  readonly=false;
private readonly MARKER_ZOOM_LEVEL=16;
private readonly MARKER_ICON = icon({
  iconUrl:
    'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});
private readonly DEFAULT_LATLNG:LatLngTuple = [13.75,21.62];

@ViewChild('map',{static:true})//ViewChild is a decorator  its responsibility is selecting a tag from the view file that is html file and putting it inside the field its first property is selector and since we are using angular reference(#map in html tag) we can directly write the name of the reference here and static:true makes it available inside ng on init since
mapRef!:ElementRef;//ElementRef is part of angular but it has the native javascript element as a property as a property inside it so you can use it any time like this.mapRef.nativeElement
map!:Map;
  currentMarker!:Marker;

  constructor(private locationService: LocationService) { }

  ngOnChanges(): void {//listen to the changes
    if(!this.order)return;

    this.initializeMap();

    if(this.readonly &&this.addressLatLng){
      this.showLocationOnReadonlyMode();

    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng,this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();

  }

  

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);


    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed)return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}