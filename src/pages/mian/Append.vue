<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加账号</span>
    </div>
    <div id="Append_box">
      <el-form
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :model="ruleForm"
      >
        <el-form-item label="账号" prop="acc">
          <el-input type="text" autocomplete="off" v-model="ruleForm.acc"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" autocomplete="off" v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="ruleForm.userGroup" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <span>{{msgs}}</span>
        <el-form-item>
          <el-button type="primary" @click="clickrefer">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { add } from "../../api/api";
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
      ruleForm: {
        acc: "",
        pwd: "",
        userGroup: "",
      },
      msgs: "",
    };
  },
  methods: {
    clickrefer() {
      add(this.ruleForm.acc, this.ruleForm.pwd, this.ruleForm.userGroup).then(
        (res) => {
          if (
            !(this.ruleForm.acc && this.ruleForm.pwd && this.ruleForm.userGroup)
          ) {
            this.msgs = "请正确输入";
          } else {
            if (res.data.code == 0) {
              this.$router.push("/");
              this.$message({
                message: "恭喜你，添加成功",
                type: "success",
              });
            }
          }
        }
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
#Append_box {
  width: 325px;
  span {
    color: red;
  }
}
</style>