const { column } = require('../models/knex');
const knex = require('../models/knex');

class Base{
  constructor(props){
    this.table = props;
  }

  // 查找
  all (){
    return knex(this.table).select();
  }

  //search by 条件;

  search (value){
    return knex(this.table).where('user_id', '=', value).select();
  }

  //登陆方法
  login (username){
    return knex(this.table).where('username', '=', username).select();
  }

  // 新增
  insert (params){
    return knex(this.table).insert(params);
  }

  // 更改
  update (columnname, id, params){
    return knex(this.table).where(columnname, '=', id).update(params);
  }

  // 删除
  delete (columnname, id){
    return knex(this.table).where(columnname, '=', id).del();
  }

  //联表的操作
  //table2为join的表 val1 是表1的值 val2等同于table2.val2
  //val1 val2两个参数为判断条件
  //id用于获得需要调整的索引
  join(table2, val1, val2, id_name ,id, params){
    return knex(this.table).join(table2, val1, val2).where(id_name, '=', id).select(params);
  }

  join_without_choose(table2 ,val1 , val2, params){
    return knex(this.table).join(table2, val1, val2).select(params);
  }

  join_two_tables(table2 ,val1 , val2, table3, val3, val4, columnname, id,params){
    return knex(this.table).join(table2, val1, val2).join(table3, val3, val4).where(columnname, '=', id).select(params);
  }

  join_two_tables_without_choose(table2 ,val1 , val2, table3, val3, val4,params){
    return knex(this.table).join(table2, val1, val2).join(table3, val3, val4).select(params);
  }

  join_update(table2, val1, val2, id_name ,id ,params){
    return knex(this.table).join(table2, val1, val2).where(id_name, '=', id).update(params);
  }

  cors(res){
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许跨域的源地址是什么，可以设置为*，也可以设成你的源地址

    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // 设置返回数据类型
    
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS, POST"); // 控制哪种请求是可以跨域的
    
    res.setHeader("Access-Control-Allow-Credentials", true); // 跨域的时候是否携带cookie
  }


}

module.exports = Base;
