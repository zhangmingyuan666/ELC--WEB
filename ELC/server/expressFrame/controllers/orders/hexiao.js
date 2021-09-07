const Order = require('../../models/user_order');

const hexiaoOrderController = {
  // showUser 获取用户数据并返回到页面
  hexiaoOrder: async function(req,res,next){
    try{
      Order.cors(res);
      
      HeXiaoValue = req.body;
      console.log(HeXiaoValue);
      console.log(HeXiaoValue.order_id);
      
      await Order.update('order_id', HeXiaoValue.order_id, HeXiaoValue)
       
      res.json(200,{
        code: 200,
        message: "操作成功",
        data: HeXiaoValue
      })
    }catch(e){
      res.json(0,{ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = hexiaoOrderController;