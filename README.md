# League of Legends helper client

League of Legends client side application featuring:

* summoner search (requires API key and Node.js proxy to work)
* match history search
* rune calculator
* itemset editor

Built with typescript react redux

### Development:

`npm run dev` to launch HMR server (defaults to :3000 port) with API proxy (defaults to :3001 port)

### Production:

`npm run build` to build app.

### TODO

* [x] Create proper app layout
* [x] Summoner search
* [x] Match lists
* [x] Api key check on init and key persist
* [x] Draggable item editor
* [x] Rune calculator
* [x] Block summoner search if API key is missing
* [ ] Cover with tests
* [ ] Proper design
* [ ] In-depth stats
* [ ] Spectate game
* [ ] Static data search
* [ ] Move static to store
