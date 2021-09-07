const ChildOrder = require('../../models/order_child');

const insertChildOrderController = {
  // showUser 获取用户数据并返回到页面
  insertChildOrder: async function(req,res,next){
    try{
      ChildOrder.cors(res);
      
      console.log(req);
       let insertValue = req.body;
       console.log(insertValue);
      
      let orderId = await ChildOrder.insert(insertValue);
      
      // let orderId = Order.insert(insertData);

      // let childOrderCount = insertValue.childOrderId.length
      // for(let i =0 ;i<childOrderCount;i++){
      //   let orderChildInsertData = {
      //     order_id:orderId,
      //     child_should_pay:insertValue.itemInfo[0].item_price,
      //     user_id:insertValue.childOrderId[i].user_id,

      //   }
      //   ChildOrder.insert(orderChildInsertData);
      // }



      res.json({
        code: 200,
        message: "操作成功",
        data: insertValue
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = insertChildOrderController;