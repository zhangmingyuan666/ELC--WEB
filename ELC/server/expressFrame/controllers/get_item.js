// 引用用户模版数据
const Item = require('../models/order_item');

const getItemController = {
  // showUser 获取用户数据并返回到页面
  getItem: async function(req,res,next){
    try{
      Item.cors(res);
      let Items = await Item.all()
      res.json(200,{
        code: 200,
        message: "操作成功",
        data: Items
      })
    }catch(e){
      res.json(0,{ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = getItemController;
