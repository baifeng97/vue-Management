<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
    </div>
    <div class="text item">
      <el-table :data="tableData" style="width: 100%" v-loading="isloading">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="photo">
          <template slot-scope="props">
            <img :src="GET_ITEMS_IMG+props.row.imgUrl" alt style="width:50px" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 修改模态框 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible" :label-width="formLabelWidth">
      <el-form ref="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model="editobj.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="editobj.category" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.cateName"
              :label="item.label"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="editobj.price" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <div class="block">
            <el-avatar shape="square" :size="150">
              <el-upload
                :action="ITEMS_IMG_UPLOAD"
                :on-success="handleAvatarSuccess"
                list-type="picture-card"
              >
                <i v-show="!editobj.imgUrl" class="el-icon-plus"></i>
                <img width="100%" v-show="editobj.imgUrl" :src="GET_ITEMS_IMG + editobj.imgUrl" />
              </el-upload>
            </el-avatar>
          </div>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="editobj.goodsDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickAffirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  goodslist,
  goodsdel,
  ITEMS_IMG_UPLOAD,
  GET_ITEMS_IMG,
  categories,
  goodsedit,
} from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 10,
      dialogTableVisible: false,
      dialogFormVisible: false,
      editobj: {},
      cateName: "",
      options: [],
      //dialogVisible: false,
      formLabelWidth: "120px",
      ITEMS_IMG_UPLOAD: "",
      GET_ITEMS_IMG: "",
      isloading: false,
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.editobj.imgUrl = res.imgUrl;
      }
    },
    //获取列表
    getuserlist() {
      this.isloading = true;
      goodslist(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.isloading = false;
      });
    },
    //条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getuserlist();
    },
    //页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserlist();
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsdel(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getuserlist();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //编辑
    handleEdit(row) {
      this.dialogFormVisible = true;

      categories().then((res) => {
        this.options = res.data.categories;
      });
      this.editobj = { ...row };
    },
    clickAffirm() {
      goodsedit(this.editobj).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        } else {
          this.$message({
            type: "success",
            message: "修改失败",
          });
        }
      });
      this.dialogFormVisible = false;
      this.getuserlist();
    },
  },
  //进入网页就执行
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.getuserlist();
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table-column {
  font-size: 12px;
}
</style>