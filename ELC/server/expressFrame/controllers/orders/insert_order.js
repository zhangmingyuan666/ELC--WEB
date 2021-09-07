const Order = require('../../models/user_order');

const insertOrderController = {
  // showUser 获取用户数据并返回到页面
  insertOrder: async function(req,res,next){
    try{
      Order.cors(res);
      
      console.log(req);
      let insertValue = req.body;
      
      console.log(insertValue);
      
      let orderId = await Order.insert(insertValue);
      
      res.json({
        code: 200,
        message: "操作成功",
        data: orderId
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = insertOrderController;
