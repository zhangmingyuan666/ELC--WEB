
const Val = require('../models/user_application');

const changeStatusController = {
  // showUser 获取用户数据并返回到页面
  changeStatus: async function(req,res,next){
    try{
      isRun = 1;
      // 用于判断程序是否进行
      newApplyData = req.body;
      //准备提交的数据
      console.log(newApplyData);
      //从前端传递回来的申请数据
    
      Val.cors(res);


      console.log(Val);
      let joinInfo = await Val.join('user_info','user_application.user_id' ,'user_info.user_id','apply_id',newApplyData.apply_id);
      console.log(joinInfo[0]);
      
      joinInfoObj = joinInfo[0];
      //目前在数据库中检索出的对象joinInfoObj
      if(joinInfoObj.add_type == '管理员'){
        if(joinInfoObj.admin_id_1 != null ){
          
          newApplyData.admin_id_2 = newApplyData.admin_id_1;
          newApplyData.admin_id_1 = joinInfoObj.admin_id_1;
          newApplyData.apply_status = '已批准';
          newApplyData.user_status = "admin";
          
        }
      }else if(joinInfoObj.add_type == '核销员'){
        newApplyData.apply_status = '已批准';
        newApplyData.user_status = "hexiao";
      }else{
        newApplyData.apply_status = '已批准';
        newApplyData.user_status = "header";
      }
        await Val.join_update('user_info','user_application.user_id' ,'user_info.user_id','apply_id',newApplyData.apply_id, newApplyData);
      
        res.json({
          code: 200,
          message: "已批准",
          data: newApplyData
        })
    }catch(e){
      res.json({ code: 0, message: "批准失败", data: e })
    }
  },
}
module.exports = changeStatusController
