// 引用item模版数据
const Item = require('../models/order_item.js');

const insertItemController = {
  // showUser 获取用户数据并返回到页面
  insertItem: async function(req,res,next){
    try{
      console.log(req.body);

      let InsertInfo = req.body;
   
      Item.cors(res);
      //此处获得所有用户的用户名，然后判断是否有已经存在的用户名

        let newUserData = await Item.insert(InsertInfo)
        //此处的返回值是用户的id值
        //此处得到新加进去的用户名
        console.log(newUserData);
          res.json({
            code: 200,
            message: "新增物品成功",
            data: InsertInfo,
          })

    }catch(e){
      res.json({ code: 0, message: "注册失败", data: e })
    }
  },
}

module.exports = insertItemController;