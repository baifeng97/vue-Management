<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <el-button style="float: right" type="primary" @click="clickClassify">添加分类</el-button>
    </div>
    <div class="text item">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类名称" width="330">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                :disabled="!scope.row.isedit"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >{{scope.row.isedit?"完成":"编辑"}}</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickDetermine">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>


    

<script>
import { addcate, catelist, delcate, editcate } from "@/api/api";
export default {
  data() {
    return {
      value: true,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        value: true,
      },
      formLabelWidth: "120px",
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      multipleSelection: [],
      total: 10,
    };
  },
  methods: {
    //获取列表
    getcatelist() {
      catelist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.state = obj.state == 1;
          obj.isedit = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
    //条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcatelist();
    },
    //页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcatelist();
    },
    //添加分类
    clickClassify() {
      this.dialogFormVisible = true;
    },
    clickDetermine() {
      // var values = this.$data.form.value;
      // var valuea=values ? '1':'0'

      addcate(this.form.name, this.form.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "添加失败",
            type: "success",
          });
        }
      });
      this.dialogFormVisible = false;
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
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
    handleEdit(index, row) {
      if (row.isedit) {
        row.isedit = false;
        editcate(row.id, row.cateName, row.state).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
        });
      } else {
        row.isedit = true;
      }
    },
  },
  created() {
    this.getcatelist();
  },
};
</script>

<style scoped>
.el-tag {
  border: none;
  color: #000;
  background-color: #fff;
}
</style>