# React-Tjube
React port of the tjube.ninja party video player.

## Purpose
Tjube.ninja is a party video player that allows people to add videos to a public screen.
People can add videos by visiting the remote.
The screens and remotes can all be accessed through the tjube.ninja webapp on any device with a webbrowser that supports JavaScript.

Website: http://tjube.ninja

## Prior Art
This project has been inspired by [ProTube](http://protu.be/) and [YouTube Tv](https://www.youtube.com/tv/).

## Install and run
```
git clone https://github.com/tjallingt/react-tjube
cd react-tjube
npm install
npm run build
npm start
```
If you have `yarn` installed it is recommended to use it instead of `npm`.

## TODO
I should probably move this to `create-react-app` so i dont need to manage my own webpack setup.
Currently i require the server because of routing and socket.io.
The routing can be moved to client side using `react-router` and then i won't need to use express for that.
As for websockets, i can separate out a special socket.io server or use a database with real time client communication such as pouchDB.
Using PouchDB also allows some more advanced features such as showing the current playlist on the remote.

## Licence
MIT
