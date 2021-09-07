
const Order = require('../../models/user_order');

const getAllOrderInfoController = {
  // showUser 获取用户数据并返回到页面
  getAllOrderInfo: async function(req,res,next){
    try{
      let orderInfo = req.body
      console.log(orderInfo);

      Order.cors(res);
      

      let userData = await Order.join('order_item', 'order_item.item_id', 'user_order.item_id','user_order.item_id',orderInfo.item_id,
      )
       
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = getAllOrderInfoController;