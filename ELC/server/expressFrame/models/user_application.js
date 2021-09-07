const Base = require('./base');

class User extends Base {
  constructor(props = 'user_application'){
    super(props);
  }
}

module.exports = new User();