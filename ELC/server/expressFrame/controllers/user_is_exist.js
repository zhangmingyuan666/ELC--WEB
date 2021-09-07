// 引用用户模版数据
const User = require('../models/user_info.js');

const userIsExistController = {
  // showUser 获取用户数据并返回到页面
  userIsExist: async function(req,res,next){
    try{
      console.log(req.body);
      User.cors(res);
      let Info = req.body;

      let userData = await User.all();
      let isExist = 1;
      //此处获得所有用户的用户名，然后判断是否有已经存在的用户名
      userData.forEach((userValue) => {
        if(userValue.username == Info.username){
          res.json({ code: 200, message: "该用户存在，添加成功", data: userValue })
          isExist = 0
        }})

        if(isExist != 0){
          res.json({ code: 0, message: "该用户不存在，添加失败", data: {}})
        }
    }catch(e){
      res.json({ code: 0, message: "该用户不存在，添加失败", data: e })
    }
  },
}

module.exports = userIsExistController;
