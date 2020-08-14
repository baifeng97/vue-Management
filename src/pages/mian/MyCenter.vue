<template>
  <el-card class="box-card" body-style="padding: 0 20px">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
    </div>
    <ul class="text item">
      <li>管理员ID：{{id}}</li>
      <li>账号：{{acc}}</li>
      <li>用户组：{{userGroup}}</li>
      <li>创建时间：{{ctime}}</li>
      <li>
        管理员头像：
        <el-avatar shape="square" :size="100" :src="imgUrl"></el-avatar>
        <el-upload
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uploaddata"
        >
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { accountinfo } from "@/api/api";
import { getTime } from "@/utils/utils";

export default {
  data() {
    return {
      id: "",
      acc: "",
      userGroup: "",
      ctime: "",
      uploaddata:{},
      imgUrl:''
    };
  },
  created() {
    this.uploaddata = {id: localStorage.id}
    this.getImages()
  },
  methods:{
    handleAvatarSuccess(res){
      if(res.code==0){
        this.$bus.$emit('Imgs')
        
      }
      this.getImages()
    },
    getImages(){
    accountinfo(localStorage.id).then((res) => {
      this.id = res.data.accountInfo.id;
      this.acc = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.ctime = res.data.accountInfo.ctime;
      this.imgUrl = res.data.accountInfo.imgUrl;
      this.ctime = getTime(this.ctime);
    });
  }
  },
  
};
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
.box-card {
  .el-card_body {
    padding: 0 20px;
  }
  .text {
    list-style: none;
    li {
      &:not(:last-child) {
        border-bottom: 1px solid #eceef1;
        line-height: 60px;
      }

      &:last-child {
        display: flex;
        line-height: 130px;
        align-items: center;
        border-top: 1px solid #eceef1;
      }
    }
  }
}
</style>