const Base = require('./base');

class User extends Base {
 //用户的订单表
  constructor(props = 'user_order'){
    super(props);
  }
}

module.exports = new User();