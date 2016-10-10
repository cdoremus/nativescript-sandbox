import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from "@angular/core";
import { Subscription } from 'rxjs';
import {registerElement, isKnownView} from 'nativescript-angular/element-registry';
import { Location, getCurrentLocation } from 'nativescript-geolocation';
import { RouterExtensions } from "nativescript-angular/router";
import * as timer from 'timer';

// let mapsModule = require("nativescript-google-maps-sdk");
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';


import 'ui/core/view';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "app-map",
    styles: [
        `
        .mapBorder {
            border-color: blue;
            border-width: 5;
        }
        .gridBorder {
        }
        Label {
            font-size: 20;
            font-weight: bold;
            text-align: center;
            vertical-align: center;
            margin-right: 5;
        }
        TextField {
            width:350;
        }
        Label.myLocation {
            font-family: "FontAwesome";
            font-size: 55;
            color: blue;
            margin-left: 20;
            margin-right: 5;
        }
        .updateButton {
            font-size: 16;
            font-style: normal;
            font-weight: normal;
            height: 60;
        }

        `
    ],
    templateUrl: "map/map.component.html",
})
export class MapComponent implements OnInit, OnDestroy {

    latitude: number = -33.86;
    longitude: number = 151.20;
    latitudeInput: number;
    longitudeInput: number;
    zoom: number = 8;
    tilt: number = 0;
    bearing: number = 0;
    padding: number[] = [5, 5, 5, 5];

    mapView;

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

    updateCurrentLocationFromInput() {
        this.latitude = this.latitudeInput;
        this.longitude = this.longitudeInput;
        this.placeMapMarker(this.latitude, this.longitude);
    }

    updateInputFromCurrentLocation() {
        this.latitudeInput = this.latitude;
        this.longitudeInput = this.longitude;
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
                    this.updateInputFromCurrentLocation();
                    this.placeMapMarker(this.latitude, this.longitude);
                }})
            .catch(error => console.log('setCurrentLocation() ERROR: ', error));
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

/***************** End Map Events *****************/
}
