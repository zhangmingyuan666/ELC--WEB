// 引用用户模版数据
const User = require('../models/user_info.js');

const userController = {
  // showUser 获取用户数据并返回到页面
  userLogin: async function(req,res,next){
    try{
       console.log(req.body);
      
       let userData = await User.login(req.body.username)
       console.log(userData);
       console.log(userData[0].password);
       //这是根据用户输入的用户名调取回来的数据库
       User.cors(res);
       if(userData[0].password == req.body.password){
         res.json({
           code: 200,
           message: "登录成功",
           data: userData
         })
         console.log(res);
         
       }else{
         res.json({
           code: 0, message: "账号或密码错误，登陆失败", data: {}
         })
      }
    }catch(e){
      res.json({ code: 0, message: "账号或密码错误，登陆失败", data: e })
    }
  },
}

module.exports = userController;
