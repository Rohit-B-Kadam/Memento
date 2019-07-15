# Memento - Smart Photo Management Application

- Cross-platform Desktop Application which help to organize all your photos.
- This Project provide features like Timeline, Searching, Sharing and Hiding Events.
- Project also use Face recongnition which help to search photo by person name using face-api.js.
- Free up the space by detecting duplicate photos. We calcalate checksum using md5 to predict photo is duplicate or not.
- Bootstrap and package your project with Angular 7 and Electron (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v7.1.4
- Electron v4.0.0
- Electron Builder v20.28.1

## To run the project

Install dependencies with npm :

``` bash
npm install
```

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> 

``` bash
npm start
```

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |
