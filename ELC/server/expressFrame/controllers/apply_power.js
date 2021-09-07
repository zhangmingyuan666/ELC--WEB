const User = require('../models/user_application');

const postApplicationController = {
  // showUser 获取用户数据并返回到页面
  postApplication: async function(req,res,next){
    try{
      newApplyData = req.body;
      console.log(newApplyData);
      //从前端传递回来的申请数据
      User.cors(res);

      let newApplyData_value = await User.insert(newApplyData)
      console.log(newApplyData_value);
      res.json({
        code: 200,
        message: "操作成功",
        data: req.body
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}
module.exports = postApplicationController;