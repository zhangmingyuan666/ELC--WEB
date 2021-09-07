// 引用用户模版数据
const User = require('../models/user_info.js');

const userController = {
  // showUser 获取用户数据并返回到页面
  userRegister: async function(req,res,next){
    try{
      console.log(req.body);

      let registerInfo = req.body;

      let userData = await User.all();
      let isExist = 1;
      //这个用于判断是否有已经存在的用户名
      
      User.cors(res);
      //此处获得所有用户的用户名，然后判断是否有已经存在的用户名
      userData.forEach((userValue) => {
        console.log(userValue);
        if(userValue.username == registerInfo.username){
          
          res.json({
            code: 0, message: "注册失败,该账号已被注册", data: {}
          })
          isExist = 0
        }

      })
      
      if(isExist!=0){
        let newUserData = await User.insert(registerInfo)
        //此处的返回值是用户的id值
        //此处得到新加进去的用户名
        console.log(newUserData);
          res.json({
            code: 200,
            message: "注册成功",
            data: registerInfo,
          })
      }
    }catch(e){
      res.json({ code: 0, message: "注册失败", data: e })
    }
  },
}

module.exports = userController;
