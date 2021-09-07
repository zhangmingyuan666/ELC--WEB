const configs = {
  mysql: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Hh5201123',  // 自己设置的密码
    database: 'user' // 数据库的名字
  },
  // 打印错误
  log: {
    error (message) {
      console.log('[knex error]', message)
    }
  }
}

module.exports = configs;
