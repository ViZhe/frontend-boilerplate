
import del from 'del'

import config from '../config'


/**
 * Clean task
 * @class Clean
 */
class Clean {

  /**
   * Delete dest folder
   * @returns {*}
   */
  static delete() {
    return del(config.dest)
  }
}

export default Clean
