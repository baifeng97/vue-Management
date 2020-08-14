<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号列表</span>
    </div>
    <div class="text item">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="isloading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
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

    <el-row>
      <el-button type="danger" @click="toggleSelection([multipleSelection])">批量删除</el-button>
      <el-button type="primary">取消选择</el-button>
    </el-row>
    <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="form.userGroup" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickEnsure">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { list, edit, del, batchdel } from "@/api/api";
import { getTime } from "@/utils/utils";

export default {
  data() {
    return {
      options: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      multipleSelection: [],
      total: 10,
      form: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      isloading: false,
    };
  },

  methods: {
    getuserlist() {
      this.isloading = true;
      list(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getTime(obj.ctime);
        }
        this.tableData = arr;
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
          del(row.id).then((res) => {
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

    //批量删除
    toggleSelection(rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (rows) {
            rows.forEach((row) => {
              this.$refs.multipleTable.toggleRowSelection(row);
              batchdel(row).then((res) => {
                if (res.data.code == 0) {
                  this.getuserlist();
                }
              });
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
          this.$message({
            type: "success",
            message: "批量删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //返回的值
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var arrs = [];
      for (const vals of this.multipleSelection) {
        arrs.push(vals.id);
      }
      var newarr = JSON.stringify(arrs);
      this.multipleSelection = newarr;
    },
    //修改账号
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    clickEnsure() {
      edit(this.form).then((res) => {
        if (res.data.code == 0) {
          this.getuserlist();
          this.$message({
            type: "success",
            message: "账号修改成功 ",
          });
        }
        this.dialogFormVisible = false;
      });
    },
  },
  created() {
    this.getuserlist();
  },
};
</script>

<style scoped>
.el-input {
  width: 220px;
}
.block {
  margin-top: 20px;
}
.el-row {
  margin-top: 20px;
}
</style>