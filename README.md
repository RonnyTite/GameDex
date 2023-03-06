# GameDex

## Installation 

run `npm install`

### Launch server 

`npm run serve`

# Create Android build ( APK )

#### Source: https://dev.to/hexcube/build-an-android-app-with-ionic-without-android-studio-487i

Exexute from project root, everytime we need to build an APK


- Sync changes from your Ionic project to the Android part

```
npx cap sync
```

-  Build for Android and generate apk

```
cd android && ./gradlew assembleDebug && cd ..
```

If the build completes successfully, we'll find the apk at android/app/build/outputs/apk/debug/app-debug.apk



#### Tools  for picking colors

https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors

https://m3.material.io/theme-builder#/custom

https://ionicframework.com/docs/theming/dark-mode