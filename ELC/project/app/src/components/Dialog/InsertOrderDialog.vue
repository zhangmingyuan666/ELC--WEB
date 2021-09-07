<template>
  <div>
    <el-dialog
      title="增加你的购买请求"
      v-model="dialogInsert"
      @close="$emit('changeStatus', false)"
    >
      <el-form
        :model="nowInfo"
        :rules="rules"
        ref="nowInfo"
        class="demo-ruleForm"
      >
        <el-form-item
          label="订单的名字"
          :label-width="formLabelWidth"
          prop="order_name"
        >
          <el-input
            v-model="nowInfo.order_name"
            autocomplete="off"
            ref="name"
          ></el-input>
        </el-form-item>
        <el-form-item label="物品的种类" :label-width="formLabelWidth">
          <el-tag :key="tag" v-for="tag in itemInfo">
            名称：{{ tag.item_name }}
          </el-tag>

          <el-button @click="getAllItems()" class="space"
            >查看所有物资</el-button
          >
        </el-form-item>
        <el-form-item
          label="物资的个数"
          :label-width="formLabelWidth"
          prop="item_count"
        >
          <el-input
            v-model.number="nowInfo.item_count"
            autocomplete="off"
            ref="count"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="订单的购买备注" :label-width="formLabelWidth">
          <el-input
            v-model="nowInfo.order_remark"
            type="textarea"
            ref="textarea"
            :rows="2"
            autocomplete="off"
            plac
          ></el-input>
        </el-form-item>
        <el-form-item
          label="选择购买对象(仅管理员)"
          v-if="userStatus == 'admin'"
          :label-width="formLabelWidth"
        >
          <el-button
            :rows="2"
            autocomplete="off"
            plac
            @click="chooseAllVisitor()"
          >
            是否为所有会员添加购买请求
          </el-button>
        </el-form-item>
        <el-form-item label="购买会员" :label-width="formLabelWidth">
          <el-tag
            :key="tag"
            v-for="tag in beManagedList"
            closable
            @close="handleClose(tag)"
            label="需要添加请求的成员"
          >
            用户名：{{ tag.username }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 加入新的用户</el-button
          >
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('changeStatus', false)">取 消</el-button>
          <el-button type="primary" @click="submitInsertOrder('nowInfo')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <get-all-item
      :nn-info="itemInfo"
      :dialog-item="dialogItemTableVisible"
      v-model="dialogItemTableVisible"
      @change-status="changeStatus"
    >
    </get-all-item>
  </div>
</template>

<script>
import Qs from "qs";
import { post, get } from "../../../server/base";
import getAllItem from "./GetAllItemDialog.vue";

export default {
  props: {
    dialogInsert: {
      type: Boolean,
    },
    peopleBeManaged: {
      type: Array,
    },
    allVisitorList: {
      type: Array,
    },
  },
  computed: {
    getUserId() {
      return sessionStorage.getItem("id");
    },
    getUserStatus() {
      return sessionStorage.getItem("user_status");
    },
  },
  data() {
    return {
      nowInfo: {
        order_applyer_id: this.getUserId,
        order_name: "",
        item_count: 0,
      },

      formLabelWidth: "180px",
      dialogInsertFormVisible: this.dialogInsert,

      dialogItemTableVisible: false,
      //用来管理所有物资dialog是不是打开的
      itemInfo: [],
      //传递给子组件，用来接收我们新加入的物资

      beManagedList: [],

      //下面两个用来控制tab标签
      inputVisible: false,
      inputValue: "",

      //用来控制管理员是否给所有用户添加订单
      allVisitorStatus: false,
      userStatus: this.getUserStatus,

      rules: {
        order_name: [
          { required: true, message: "请输入订单名字", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],

        item_count: [
          { required: true, message: "物资数目不能为空" },
          { type: "number", message: "长度在 1 到 20 个数字", min: 1, max: 20 },
        ],
      },
    };
  },
  components: {
    getAllItem,
  },
  methods: {
    submitInsertOrder(formName) {
      if (this.beManagedList.length && this.itemInfo.length) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("submit!");
            this.$confirm("此操作将提交订单, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                let obj1 = { childOrderId: this.beManagedList };
                let obj2 = { itemInfo: this.itemInfo };
                let obj3 = { order_applyer_id: sessionStorage.getItem("id") };
                Object.assign(this.nowInfo, obj1, obj2, obj3);
                //用于给我们的对象追加属性
                console.log(this.nowInfo);

                let insertOrder = {
                  order_remark: this.nowInfo.order_remark,
                  order_applyer_id: this.nowInfo.order_applyer_id,
                  item_id: this.nowInfo.itemInfo[0].item_id,
                  item_count: this.nowInfo.item_count,
                  order_name: this.nowInfo.order_name,
                };
                let data = Qs.stringify(insertOrder);
                post("insert-order", data)
                  .then((res, req) => {
                    console.log(res);

                    if (res.data.code == 200) {
                      let newOrderIndex = res.data.data[0];
                      for (
                        let i = 0;
                        i < this.nowInfo.childOrderId.length;
                        i++
                      ) {
                        let orderChildInsertData = {
                          order_id: newOrderIndex,
                          child_should_pay:
                            this.nowInfo.itemInfo[0].item_price *
                            this.nowInfo.item_count,
                          user_id: this.nowInfo.childOrderId[i].user_id,
                        };
                        let childData = Qs.stringify(orderChildInsertData);
                        post("/insert-child-order", childData)
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      }
                      this.$message({
                        type: "success",
                        message: "提交订单成功!",
                      });
                      this.dialogInsertFormVisible = false;
                      console.log(this.dialogInsertFormVisible);
                      this.$emit("changeStatus", this.dialogInsertFormVisible);
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                    this.$message({
                      type: "success",
                      message: "提交订单失败!",
                    });
                  });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消提交订单",
                });
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message({
          type: "info",
          message: "加入物品的种类或者购买会员不可为空",
        });
      }
    },

    //管理allItemInfo的代码
    getAllItems() {
      this.dialogItemTableVisible = true;
    },
    changeStatus(val) {
      this.dialogItemTableVisible = val;
    },

    // 管理tag的代码
    handleClose(tag) {
      this.beManagedList.splice(this.beManagedList.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      let userInfo = {
        user_id: "",
        username: inputValue,
      };

      let isExist = 0;
      this.beManagedList.forEach((ele) => {
        if (ele.username == userInfo.username) {
          isExist = 1;
        }
      });

      if (!isExist) {
        let data = Qs.stringify(userInfo);
        post("user-is-exist", data)
          .then((res, req) => {
            console.log(res);
            console.log(req);
            console.log(this.beManagedList);

            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "增加成功",
              });
              if (inputValue) {
                this.beManagedList.push({
                  user_id: res.data.data.user_id,
                  username: res.data.data.username,
                });
              }
              this.inputVisible = false;
              this.inputValue = "";
            } else {
              this.$message({
                type: "info",
                message: "此用户不存在,添加失败",
              });
              this.inputVisible = false;
              this.inputValue = "";
            }
          })
          .catch((e) => {
            console.log(e);
            this.inputVisible = false;
            this.inputValue = "";
          });
      } else {
        this.$message({
          type: "info",
          message: "此用户已经存在于添加列表之中",
        });
        this.inputVisible = false;
        this.inputValue = "";
      }
    },
    chooseAllVisitor() {
      this.allVisitorStatus = !this.allVisitorStatus;
      if (this.allVisitorStatus == true) {
        this.beManagedList = this.allVisitorList;
      } else {
        this.beManagedList = [];
      }
    },
  },
  mounted() {
    this.beManagedList = this.peopleBeManaged;

    this.userStatus = this.getUserStatus;
  },
  updated() {
    console.log(this.dialogInsertFormVisible);

    this.beManagedList = this.peopleBeManaged;
  },
};
</script>

<style scoped>
.width {
  width: 120px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.space {
  margin-left: 20px;
}
</style>