// 引用item模版数据
const Item = require('../models/order_item.js');

const editItemController = {
  // showUser 获取用户数据并返回到页面
  editItem: async function(req,res,next){
    try{
      console.log(req.body);

      let EditInfo = req.body;
      console.log(EditInfo.item_id);
      Item.cors(res);
      //此处获得所有用户的用户名，然后判断是否有已经存在的用户名

        let newUserData = await Item.update('item_id',EditInfo.item_id, EditInfo)
        //此处的返回值是用户的id值
        //此处得到新加进去的用户名
        console.log(newUserData);
          res.json({
            code: 200,
            message: "编辑物品成功",
            data: EditInfo,
          })

    }catch(e){
      res.json({ code: 0, message: "编辑失败", data: e })
    }
  },
}

module.exports = editItemController;