
const OrderChild = require('../../models/order_child');

const getAllChildInfoController = {
  // showUser 获取用户数据并返回到页面
  getAllChildInfo: async function(req,res,next){
    try{
      let orderInfo = req.body
      console.log(orderInfo);

      OrderChild.cors(res);
      

      let userData = await OrderChild.join_two_tables('user_order', 'user_order.order_id', 'order_child.order_id',
      'order_item', 'order_item.item_id','user_order.item_id',
      'user_order.order_id',orderInfo.order_id,
      )

      let myInfo = {}
      userData.forEach((element) => {
        if(element.user_id == orderInfo.user_id){
            myInfo = element
        }
      });
       
      res.json({
        code: 200,
        message: "操作成功",
        data: myInfo
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = getAllChildInfoController;