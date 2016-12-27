
import browserSync from 'browser-sync'

import config from '../config'


class Server {
  static run() {
    return browserSync({
      files: config.dest,
      server: {
        baseDir: config.dest
      }
    })
  }
}

export default Server
