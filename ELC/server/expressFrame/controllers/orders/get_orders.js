const Order = require('../../models/user_order');

const getOrderController = {
  // showUser 获取用户数据并返回到页面
  getOrder: async function(req,res,next){
    try{
      Order.cors(res);
      
      let userData = await Order.join_without_choose('user_info', 'user_info.user_id', 'user_order.order_applyer_id', ['user_id','item_count','username', 'order_name', 'order_id', 'order_name','order_hexiao_status', 'item_id'])
       
      res.json(200,{
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json(0,{ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = getOrderController;
