<template>
  <div class="materialmannagement">
    <welcome-content>
      <template v-slot:welcome_title>
        <h1>物资管理</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处，你可以增加或者删除物资</p>
        <p>在此处增加或删除的物品，你可以在这里看到物品的详情</p>
        <p>然后在新增订单的时候，我们可以加入在这里储存的物资</p>
      </template>
    </welcome-content>

    <button class="btn btn-big margin" @click="dialogInsertFormVisible = true">
      增加物资
    </button>

    <welcome-content class="margin">
      <template v-slot:welcome_title>
        <h1>查看所有物资</h1>
      </template>
      <template v-slot:welcome_content>
        <p>在此处，你可以查看，删除,编辑物资</p>
      </template>
    </welcome-content>

    <div class="margin">
      <ul>
        <li class="th">
          <div class="name">商品名字</div>
          <div class="price">物资价格</div>
        </li>
        <li v-for="(item, index) in itemsInfo" :key="index">
          <div class="name">{{ item.item_name }}</div>
          <div class="price">{{ item.item_price + "元" }}</div>
          <div class="edit btn-success btn-small" @click="edit(item, $event)">
            编辑
          </div>
          <div
            class="delete btn-error btn-small"
            @click="delete_item(item, $event)"
          >
            删除
          </div>
          <div
            class="all-info btn-other btn-small"
            @click="getAllInfo(item, $event)"
          >
            详情
          </div>
        </li>
      </ul>
    </div>

    <insert-item-dialog
      :dialog-insert="dialogInsertFormVisible"
      v-model="dialogInsertFormVisible"
      @change-status="changeStatus"
    >
    </insert-item-dialog>
    <all-item-info-dialog
      :nn-info="nowInfo"
      :dialog-table="dialogTableVisible"
      v-model="dialogTableVisible"
      @change-status="changeStatus"
    >
    </all-item-info-dialog>
    <edit-item-dialog
      :nn-info="nowInfo"
      :dialog-form="dialogFormVisible"
      v-model="dialogFormVisible"
      @change-status="changeStatus"
    ></edit-item-dialog>
  </div>
</template>

<script>
import WelcomeContent from "./WelcomeContent.vue";
import { get, post } from "../../server/base";
import EditItemDialog from "./Dialog/EditItemDialog.vue";
import InsertItemDialog from "./Dialog/InsertItemDialog.vue";
import AllItemInfoDialog from "./Dialog/AllItemInfoDialog.vue";
import Qs from "qs";
export default {
  name: "MaterialManagement",
  data() {
    return {
      itemsInfo: [],
      itemId: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogInsertFormVisible: false,
      nowInfo: {},
      //即被点击序列的内容

      formLabelWidth: "120px",
      imageUrl: "",
      sendImgUrl: "",
    };
  },
  components: {
    WelcomeContent,
    EditItemDialog,
    InsertItemDialog,
    AllItemInfoDialog,
  },
  methods: {
    edit(item, event) {
      this.dialogFormVisible = true;
      console.log(item);
      this.nowInfo = item;
      console.log(event);
      this.imageUrl = "";
    },
    getAllInfo(item, event) {
      this.dialogTableVisible = true;
      console.log(item);
      this.nowInfo = item;
      console.log(event);
      this.imageUrl = item.item_pic;
    },

    getItems() {
      get("get-item")
        .then((res, req) => {
          console.log(res);
          console.log(req);
          this.itemsInfo = [];
          let val = res.data.data;
          console.log(val);
          this.itemsInfo = val;
          console.log(this.itemsInfo);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteOrEditIsValue() {
      get("get-orders")
        .then((res, req) => {
          console.log(res);
          console.log(req);
          let arrId = [];
          res.data.data.forEach((ele) => {
            arrId.push(ele.item_id);
          });
          this.itemId = [...new Set(arrId)];
          //用于数组去重
          console.log(this.itemId);
          //通过其中的ID判断这个物品有没有被使用过，如果被使用过，就不可以删除，且核销的时候要注意退钱，核销过的订单不进行退钱，核销前的订单需要退钱
        })
        .catch((e) => {
          console.log(e);
        });
    },

    delete_item(item, $event) {
      //参与了订单的物品无法删除
      let deleteIsValue = 1;
      this.itemId.forEach((ele) => {
        if (ele == item.item_id) {
          deleteIsValue = 0;
        }
      });
      if (deleteIsValue) {
        this.nowInfo = item;
        console.log(item);
        let data = Qs.stringify(this.nowInfo);

        this.$confirm("此操作将永久删除该物资, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            post("/del-item", data)
              .then((res, req) => {
                console.log(res);
                console.log(req);
              })
              .catch((e) => {
                console.log(e);
              });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getItems();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "此物品参与了许多订单，无法删除",
        });
      }
    },
    handleAdd() {
      this.addshow = true;
    },
    changeStatus(val) {
      this.dialogFormVisible = val;
      this.dialogTableVisible = val;
      this.dialogInsertFormVisible = val;
      this.getItems();
    },
  },
  mounted() {
    this.getItems();
    console.log(this.itemsInfo);
    this.deleteOrEditIsValue();
  },
};
</script>

<style scoped>
.materialmannagement {
  height: 100%;
  width: 100%;
}
ul {
  width: 60%;
  margin: auto;
}
li {
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding: 8px 35px;

  border-bottom: 1px solid #000;
}

li:nth-child(1) {
  font-weight: 600;
  font-size: 20px;
}

li .name {
  width: 120px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

li .price {
  margin-left: 30px;
}
li .edit {
  margin-left: auto;
}

li .delete {
  margin-left: 20px;
}

li .all-info {
  margin-left: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>