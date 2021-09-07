const OrderChild = require('../../models/order_child');

const FinishPayController = {
  // showUser 获取用户数据并返回到页面
  FinishPay: async function(req,res,next){
    try{
      let orderInfo = req.body
      console.log(orderInfo);

      OrderChild.cors(res);
      

      let userData = await OrderChild.update('order_child_id' , orderInfo.order_child_id, orderInfo)

      res.json({
        code: 200,
        message: "操作成功",
        data: orderInfo
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = FinishPayController;