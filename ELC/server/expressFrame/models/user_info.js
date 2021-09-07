const Base = require('./base');

class User extends Base {
  // 定义参数默认值为 user_info 表
  constructor(props = 'user_info'){
    super(props);
  }
}

module.exports = new User();
