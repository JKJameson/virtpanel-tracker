const fs = require('fs')
const path = require('path');
var Server = require('bittorrent-tracker').Server

var server = new Server({
  udp: false, // enable udp server? [default=true]
  http: true, // enable http server? [default=true]
  ws: false, // enable websocket server? [default=true]
  stats: false, // enable web-based statistics? [default=true]
  trustProxy: true,
  filter: function (infoHash, params, cb) {
    var hash = path.basename(infoHash).toUpperCase()
    if (hash.length==40 && fs.existsSync('/tracker/'+hash)) {
      // If the callback is passed `null`, the torrent will be allowed.
      cb(null)
    } else {
      // If the callback is passed an `Error` object, the torrent will be disallowed
      // and the error's `message` property will be given as the reason.
      cb(new Error('disallowed torrent'))
    }
  }
})

server.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

server.on('listening', function () {
  console.log('listening on http port:' + server.http.address().port)
})

server.listen(80, '0.0.0.0')
