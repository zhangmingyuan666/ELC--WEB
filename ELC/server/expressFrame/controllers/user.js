// 引用用户模版数据
const User = require('../models/user_info.js');

const userController = {
  // showUser 获取用户数据并返回到页面
  showUser: async function(req,res,next){
    try{
      User.cors(res);
      let userData = await User.all()
      res.json(200,{
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json(0,{ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = userController;
