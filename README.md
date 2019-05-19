# open-unmix-demo

Standalone Source Separation Demo Player that loads pre-processed multitrack audio files.

<img width="1067" alt="Screenshot 2019-05-19 at 16 32 09" src="https://user-images.githubusercontent.com/72940/57983568-b475bd00-7a53-11e9-8e34-47c7ae3a7b81.png">

## Download

See [releases section](https://github.com/sigsep/open-unmix-demo-electron/releases)

## Usage

```

## Example config file

Lets assume we a folder with subfolders for each audio tracks, separated into different sources:

```
tracks/track_1/vocals.m4a
tracks/track_1/bass.m4a
tracks/track_1/drums.m4a
tracks/track_1/other.m4a
...
```

Specifying a `config.json` file like following would be sufficient to load the files into the demo player. Note that `audiopath` is a relative path with respect to the path of the config file.

```json
{
    "title": "Open-Unmix Demo",
    "audiopath": "tracks",
    "tagline": "my great separation method",
    "tracks": [
        { "path": "track_1", "name": "Artist - Title"},
    ], 
    "targets": ["bass", "drums", "other", "vocals"],
    "extension": [".m4a"], "mimetype": "audio/mp4"
}
```

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
