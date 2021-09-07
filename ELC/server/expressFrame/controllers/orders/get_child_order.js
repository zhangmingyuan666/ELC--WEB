
const OrderChild = require('../../models/order_child');

const getOrderChildInfoController = {
  // showUser 获取用户数据并返回到页面
  getOrderChildInfo: async function(req,res,next){
    try{
      let orderInfo = req.body
      console.log(orderInfo);

      OrderChild.cors(res);
      

      let userData = await OrderChild.join_two_tables(
      'user_order', 'order_child.order_id', 'user_order.order_id',
      'user_info','user_info.user_id','order_child.user_id', 
      'order_child.order_id', orderInfo.order_id,
      ['order_child_id','user_info.user_id', 'username', 'child_should_pay' ,'order_child_status', 'child_already_pay'] )
       console.log(userData);
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

module.exports = getOrderChildInfoController;