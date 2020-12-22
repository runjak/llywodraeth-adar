# llywodraeth-adar

We do not trust the eye in the sky. The flittering, fluttering, winged eye. The electric, radio controlled, eye recharging on landlines.
After all: if birds are real how come only the government can produce or own them?

## requirements

* ffmpeg
* chrome
* node
* yarn

## sources & inspirations

* [Twitch Plays Pokémon](https://en.wikipedia.org/wiki/Twitch_Plays_Pok%C3%A9mon)
* [jibon57/bbb-recorder](https://github.com/jibon57/bbb-recorder)

## environment

* `RTMP_URL`
  * Url to RTMP endpoint. Example: `RTMP_URL="rtmp://…"`
  * Path to a file for testing purposes. Example: `RTMP_URL="/tmp/test.flv"`
* `START_URL`
  * Url that the software should visit initially.
* `FFMPEG_SERVER`
  * Something like `ws://localhost` pointing to where your ffmpeg server lives.
* `FFMPEG_SERVER_PORT`
  * Port used for the local connection from chrome to ffmpeg served via a websocket.
* `WS_AUTH_TOKEN`
  * A token used to verify that the client should be able to stream using the websocket.
  * Set it to something like `pwgen 32 1`.

## experiments

Verified that streaming works using an ffmpeg command like this:

```bash
ffmpeg -i $input -f flv -vcodec libx264 -acodec aac $rtmp_endpoint
```

