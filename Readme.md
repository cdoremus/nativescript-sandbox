## NativeScript Sandbox ng2-maps branch

### This repo holds code experiments with NativeScript and Angular 2 using native geolocation and the Google Maps SDK


---
## Building and installing the application
This has only been tested with Android right now as I do not own a Mac, but it should be runnable in iOS.
Install the android and iOS platforms files using these commands:
```
tns platform add android
tns platform add ios
```
Install the required NativeScript plugins using these commands:
```
tns plugin add nativescript-google-maps-sdk
tns plugin add nativescript-geolocation
```
You need to obtain an `Google Maps Android API` and `Google Maps SDK for iOS` API key
using the [Google Developers Console](https://console.developers.google.com) and then
configure keys in the application by following the directions in
the [Nativescript Google Maps SDK plugin Readme file](https://github.com/dapriett/nativescript-google-maps-sdk).

Running the app in a USB-connected Android phone:
```
tns run android
```
The android emulator does not properly render the map created using Google Maps API, so this app needs to be run using a real phone.

Run the app in iOS using this command:
```
tns run ios
```
It is not know if the app runs in the iOS emulator or just an iOS device.