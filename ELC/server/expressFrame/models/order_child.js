const Base = require('./base');

class User extends Base {
 //用户的订单表
  constructor(props = 'order_child'){
    super(props);
  }
}

module.exports = new User();