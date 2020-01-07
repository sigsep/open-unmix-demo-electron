# Open-unmix desktop demo player

Standalone Source Separation Demo Player that loads pre-processed multitrack audio files.

<img width="1067" alt="Screenshot 2019-05-19 at 16 32 09" src="https://user-images.githubusercontent.com/72940/57983568-b475bd00-7a53-11e9-8e34-47c7ae3a7b81.png">

## Download

See [releases section](https://github.com/sigsep/open-unmix-demo-electron/releases)

## Usage

Every time you open the demo player it will prompt for root folder.

### Provide audio files

Lets assume we a folder with subfolders for each audio tracks, separated into different sources:

```
tracks/track_1/vocals.m4a
tracks/track_1/bass.m4a
tracks/track_1/drums.m4a
tracks/track_1/other.m4a
tracks/track_2/vocals.m4a
tracks/track_2/other.m4a
...
```

just open the folder `tracks` when the application starts.

## Development

```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Build for all platforms 
```
npm run electron:build  -- --mac --win --linux --x64
```
