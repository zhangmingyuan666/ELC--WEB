// 引用item模版数据
const Item = require('../models/order_item.js');

const deleteItemController = {
  // showUser 获取用户数据并返回到页面
  deleteItem: async function(req,res,next){
    try{
      console.log(req.body);

      let DeleteInfo = req.body;
      Item.cors(res);
      //此处获得所有用户的用户名，然后判断是否有已经存在的用户名
      console.log(DeleteInfo.item_id);

        let deleteItemData = await Item.delete('item_id', DeleteInfo.item_id)
        //此处的返回值是用户的id值
        //此处得到新加进去的用户名
        console.log(deleteItemData);
          res.json({
            code: 200,
            message: "删除物品成功",
            data: DeleteInfo,
          })

    }catch(e){
      res.json({ code: 0, message: "删除失败", data: e })
    }
  },
}

module.exports = deleteItemController;