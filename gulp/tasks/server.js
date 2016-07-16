
import browserSync from 'browser-sync'

import config from '../config'


/**
 * Server task
 * @class Server
 */
class Server {
  /**
   * Run server for development
   * @returns {*}
   */
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
