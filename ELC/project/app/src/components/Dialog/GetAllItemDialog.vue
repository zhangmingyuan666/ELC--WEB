<template>
  <div>
    <el-dialog
      title="所有物品的信息"
      v-model="dialogItem"
      @close="$emit('changeStatus', false)"
      append-to-body
    >
      <h5>如果您需要添加信息，请前往物资管理页面</h5>
      <el-table :data="allIntemInfo" style="width: 140%" max-height="350">
        <el-table-column
          property="item_id"
          label="物资id"
          width="150"
        ></el-table-column>
        <el-table-column
          property="item_name"
          label="物资名字"
          width="200"
        ></el-table-column>
        <el-table-column
          property="item_price"
          label="物资单价"
        ></el-table-column>
        <el-table-column
          property="item_remark"
          label="物资备注"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              @click.prevent="addItemToTag(scope.$index, allIntemInfo)"
              :disabled="disabled"
            >
              +
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-tag
        v-for="tag in itemInfo"
        :key="tag"
        closable
        @close="handleClose(tag)"
      >
        {{ tag.item_name }}
      </el-tag>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('changeStatus', false)">取 消</el-button>
          <el-button type="primary" @click="correctInsertItem()"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { get, post } from "../../../server/base";
import Qs from "qs";
export default {
  props: {
    nnInfo: {
      type: Array,
    },
    dialogItem: {
      type: Boolean,
    },
  },
  data() {
    return {
      dialogItemTableVisible: this.dialogItem,
      itemInfo: this.nnInfo,
      allIntemInfo: [],
      disabled: false,
    };
  },

  methods: {
    correctInsertItem() {
      this.dialogItemTableVisible = false;
      console.log(this.dialogItemTableVisible);
      this.$emit("changeStatus", this.dialogItemTableVisible);
    },
    getItems() {
      get("get-item")
        .then((res) => {
          console.log(res);
          this.allIntemInfo = res.data.data;
          console.log(this.allIntemInfo);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addItemToTag(index, rows) {
      console.log(rows);
      console.log(index);
      //可以获取index
      console.log(rows[index]);
      this.itemInfo.push(rows[index]);
      console.log(this.itemInfo);
      this.disabled = true;
    },
    handleClose(tag) {
      this.itemInfo.splice(this.itemInfo.indexOf(tag), 1);
      console.log(this.itemInfo);
      console.log(this.nnInfo);
      this.disabled = false;
    },
  },
  mounted() {
    this.getItems();
  },
  updated() {
    this.dialogItemTableVisible = this.dialogItem;
    console.log(this.itemInfo);
  },
};
</script>

<style lang="scss" scoped>
</style>