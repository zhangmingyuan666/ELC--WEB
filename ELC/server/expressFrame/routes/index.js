var express = require('express');
var router = express.Router();

//此处用于引入控制器
const userController = require('../controllers/user');
const loginController = require('../controllers/login');
const registerController = require('../controllers/register');
const getApplicationController = require('../controllers/get_apply');
const postApplicationController = require('../controllers/apply_power')
const changeStatusController = require('../controllers/change_status')
const getItemsController = require('../controllers/get_item')
const insertItemController = require('../controllers/insert_item')
const editItemController = require('../controllers/edit_item')
const deleteItemController = require('../controllers/delete_item')
const getOrderController = require('../controllers/orders/get_orders');
const getOrderItemController = require('../controllers/orders/get_order_all_info');
const getOrderChildInfoController = require('../controllers/orders/get_child_order')
const userIsExistController = require('../controllers/user_is_exist');
const insertOrderController = require('../controllers/orders/insert_order');
const insertChildOrderController = require('../controllers/orders/insert_child_order');
const hexiaoOrderController = require('../controllers/orders/hexiao');
const getVisitorAccountController = require('../controllers/orders/get_visitors_child_order')
const getAllChildInfoController = require( '../controllers/orders/get_child_order_all_info');
const FinishPayController = require('../controllers/orders/finish_pay');
const editOrderChildStatusController =require('../controllers/orders/edit_child_order_status');
const searchVisitorOrderController = require( '../controllers/orders/search_visitor_order')
// 接口api----用于做最简单的测试
router.get('/get_user', userController.showUser);

//接口：用于判断一个用户是否存在
router.post('/user-is-exist',userIsExistController.userIsExist)

// 登录api
router.post('/login', loginController.userLogin);
// 注册api
router.post('/register', registerController.userRegister)


//以下是权限后台
//获得有关权限的申请
router.get('/get-application', getApplicationController.getApplication)
//申请权限
router.post('/send-apply', postApplicationController.postApplication)
//用于改变权限
router.post('/change-status', changeStatusController.changeStatus)


//以下是物资后台
//用于获取后端物资
router.get('/get-item', getItemsController.getItem);
//用于新增物资
router.post('/insert-item',insertItemController.insertItem)
//用于编辑物资
router.post('/edit-item', editItemController.editItem);
//用于删除物资
router.post('/del-item', deleteItemController.deleteItem)


//以下是订单后台
//用于获取后台订单及子订单

//以下是获得首页中的订单基本信息
router.get('/get-orders', getOrderController.getOrder);
//以下是获得订单物品的详细信息（订单物品与订单之间的联表）
router.post('/get-item-orders', getOrderItemController.getAllOrderInfo);
//以下是获得子订单的接口
router.post('/get-child-orders', getOrderChildInfoController.getOrderChildInfo)
//以下是增加订单的接口
router.post('/insert-order', insertOrderController.insertOrder);
//下面是增加子订单的接口
router.post('/insert-child-order',insertChildOrderController.insertChildOrder)


//下面是核销接口
router.post('/hexiao-order', hexiaoOrderController.hexiaoOrder)

//下方是查看一个用户所有应付订单的接口
router.post('/get-account', getVisitorAccountController.getVisitorAccount)
//下方是查看一个用户应付订单详细信息
router.post('/get-all-child-info', getAllChildInfoController.getAllChildInfo);
//用于填写支付订单
router.post('/finish-pay', FinishPayController.FinishPay)
//用于编辑子订单
router.post('/edit-order-child-status', editOrderChildStatusController.editOrderChildStatus);


//用于通过搜索获得子订单
router.get('/search-order', searchVisitorOrderController.searchVisitorOrder)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的兄弟叫顺溜之物资核销系统' });
});

module.exports = router;
