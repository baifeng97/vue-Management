<template>
  <div id="body_box">
    <div id="login_box">
      <h4>系统登录</h4>
      <p>
        <el-input prefix-icon="el-icon-user-solid" v-model="acc"></el-input>
      </p>
      <p>
        <el-input prefix-icon="el-icon-lock" v-model="pwd" show-password></el-input>
      </p>
      <span>{{msgs}}</span>
      <p>
        <el-button size="medium" type="primary" @click="clicklogin">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import {Login} from "../api/api";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      msgs: "",
    };
  },
  methods: {
    clicklogin() {
      Login(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.id=res.data.id;
          localStorage.token=res.data.token;
          localStorage.role=res.data.role;
          localStorage.acc=this.acc;
          this.$router.push("/main/index");
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          
        } else {
          this.msgs = res.data.msg;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
#body_box {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  position: relative;
  #login_box {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h4 {
      color: #fff;
      margin-bottom: 30px;
    }
    p {
      margin-top: 20px;
    }
    span{
      color: red;
    }
    .el-input {
      width: 300px;
    }
    .el-button {
      width: 300px;
    }
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>