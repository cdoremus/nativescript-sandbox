## NativeScript Sandbox ng2-maps branch

### Thie repo holds code experiments with NativeScript and Angular 2 using geolocation and the Google Maps SDK

This app works with Android right now as I do not have a Mac to test on iOS.
Install the android platform files with this command:
```
tns platfrm add android
```

Required NativeScript plugins need to be installed using this command:
```
tns plugin add nativescript-google-maps-sdk

tns plugin add nativescript-geolocation

```

Issue this command to copy the file that will hold the Google Maps API key to the App_Resources folder:
```
cp -r node_modules/nativescript-google-maps-sdk/platforms/android/res/values app/App_Resources/Android/
```
When this is done, add your API key to the copied over nativescript_google_maps_api.xml file.

---

In order for the geolocation plugin to work properly, the following needs to be added to the AndroidManifest.xml file in app/App_Resources/Android

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>

```
