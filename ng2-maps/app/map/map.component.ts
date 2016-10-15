import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from "@angular/core";
import { Subscription } from 'rxjs';
import {registerElement, isKnownView} from 'nativescript-angular/element-registry';
import { Location, getCurrentLocation } from 'nativescript-geolocation';
import { RouterExtensions } from "nativescript-angular/router";
import * as timer from 'timer';
import { MapView, Marker, Position, Polyline } from 'nativescript-google-maps-sdk';

import { Toast } from '../shared/toast';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "app-map",
    styleUrls: ['map/map.component.css'],
    templateUrl: 'map/map.component.html',
})
export class MapComponent implements OnInit, OnDestroy {

    latitude: number = 43.979;
    longitude: number = -70.363;
    zoom: number = 8;
    tilt: number = 0;
    bearing: number = 0;
    padding: number[] = [5, 5, 5, 5];

    mapView: MapView;

    constructor() {
    }

    public ngOnInit(): void {
        console.log("ngOnInit() called");
        this.setCurrentLocation();
    }

    public ngOnDestroy(): void {
    }

    public placeMapMarker(latitude: number, longitude: number, title?: string) {

        console.log("Setting a marker...");
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(latitude, longitude);
        marker.title = title ? title : '';
        // marker.snippet = "Australia";
        marker.userData = { index : 1};
        this.mapView.addMarker(marker);
    }

    updateCurrentLocationFromInput(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.placeMapMarker(latitude, longitude);
        this.centerMap(latitude, longitude);
    }

    setCurrentLocation() {
        console.log('setCurrentLocation() called: ' + new Date());

        let location: Promise<Location> = getCurrentLocation({desiredAccuracy: 1000, updateDistance: 1000, minimumUpdateTime: 2000});
        // NOTE: For this to work, the Android permmission must be set to
        // android.permission.ACCESS_FINE_LOCATION or android.permission.ACCESS_COARSE_LOCATION
        // in AndroidManifest.xml
	    // <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
        location
            .then((location) =>  {
                if (location) {
                    this.longitude = location.longitude;
                    this.latitude = location.latitude;
                    console.log('Current location reset (Lat/Long): ' + this.latitude + '/' + this.longitude);
                    this.placeMapMarker(this.latitude, this.longitude);
                }})
            .catch(error => console.log('setCurrentLocation() ERROR: ', error));
       Toast.showToast('Current location set');
    }

    /**
     * Move the displayed map to a new location
     */
    centerMap(latitude: number, longitude: number) {
        this.mapView.latitude = latitude;
        this.mapView.longitude = longitude;
        this.mapView.updateCamera();
    }

    createPosition(latitude: number, longitude: number): Position {
        let position = new Position();
        position.latitude = latitude;
        position.longitude = longitude;
        return position;
    }

/***************** Start Map Events *****************/

    onMapReady(event) {
        console.log("onMapReady()", event.object);
        this.mapView = event.object;
        this.placeMapMarker(this.latitude, this.longitude, 'My Location');
    }

    onMarkerSelect(event) {
        console.log("onMarkerSelect()", event);
    }

    onMarkerBeginDragging(event) {
        console.log("onMarkerBeginDragging()", event);
    }

    onMarkerEndDragging(event) {
        console.log("onMarkerEndDragging()", event);
    }

    onMarkerDrag(event) {
        console.log("onMarkerDrag()", event);
    }

    onCameraChanged(event) {
        console.log("onCameraChanged()",JSON.stringify(event.camera));
    }

    onCoordinateTapped(args) {
        console.log("onCoordinateTapped()", args.position);
        let lat: number = args.position.latitude;
        let long: number = args.position.longitude;
        let msg: string = "Location Tapped (Long/Lat): " +  lat.toFixed(3) + '/' + long.toFixed(3);
        this.centerMap(lat, long);
        console.log(msg);
        Toast.showToast(msg);
    }

    onCoordinateLongPress(args) {
        console.log("onCoordinateLongPress()", args.position);
        let msg: string = "Location Long Pressed (Long/Lat): " +  args.position.latitude.toFixed(3) + '/' + args.position.longitude.toFixed(3);
        console.log(msg);
        Toast.showToast(msg);
    }

/***************** End Map Events *****************/
}
