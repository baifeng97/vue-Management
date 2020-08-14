<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <div id="password_box">
      <el-form
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :model="ruleForm"
      >
        <el-form-item label="原密码" prop="pwd">
          <el-input type="password" autocomplete="off" v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <span>{{msgss}}</span>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" autocomplete="off" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" autocomplete="off" v-model="ruleForm.checkPass"></el-input>
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
import { checkoldpwd } from "../../api/api";
import { editpwd } from "../../api/api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pass: [{ validator: validatePass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
      ruleForm: {
        pwd: "",
        pass: "",
        checkPass: "",
      },
      msgs: "",
      msgss: "",
    };
  },
  methods: {
    clickrefer() {
      checkoldpwd(this.ruleForm.pwd, localStorage.id).then((resa) => {
        if (
          !(this.ruleForm.pwd && this.ruleForm.pass && this.ruleForm.checkPass)
        ) {
          this.msgs = "请正确输入";
        } else {
          if (resa.data.code == 0) {
            editpwd(this.ruleForm.pass, localStorage.id).then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "恭喜你，修改成功",
                  type: "success",
                });
              }
            });
          } else {
            this.msgss = "请输入正确密码";
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
#password_box {
  width: 325px;
  span {
    color: red;
  }
}
</style>
