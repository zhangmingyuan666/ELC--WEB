const User = require('../models/user_application');

const getApplicationController = {
  // showUser 获取用户数据并返回到页面
  getApplication: async function(req,res,next){
    try{
      User.cors(res);
      
      let userData = await User.join_without_choose('user_info', 'user_info.user_id', 'user_application.user_id', );

      console.log(userData);
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

module.exports = getApplicationController;
