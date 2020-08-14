<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button style="float: right" type="primary" @click="clickHold">保存</el-button>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" v-model="form.bulletin" autocomplete="off" style rows="5"></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <div class="block">
              <el-avatar shape="square" :size="150">
                <el-upload
                  :action="PIC_URL"
                  :on-success="handleAvatarSuccessS"
                  :show-file-list="false"
                >
                  <img width="100%" :src="PIC_URLS + form.avatar" />
                </el-upload>
              </el-avatar>
            </div>
          </el-form-item>
          <el-form-item label="店铺图片" class="mgs_box">
            <div class="block">
              <el-upload
                :action="PIC_URL"
                :on-success="handleAvatarSuccess"
                list-type="picture-card"
                :on-remove="removeImgs"
                :file-list="shopImgs"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="form.deliveryPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="form.score" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.sellCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8择抢购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker
              v-model="form.date"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { shopinfo, PIC_URL, PIC_URLS, shopedit } from "@/api/api";
import { getTime } from "@/utils/utils";
export default {
  data() {
    return {
      PIC_URL: "",
      PIC_URLS: "",
      form: {
        name: "",
        bulletin: "",
        avatar: "1590473180839.webp",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: "",
        pics: [],
        date: [],
        minPrice: "",
        dates: [],
        headPicUrl: "",
        id:0,
      },
      shopImgs: [],
    };
  },
  methods: {
    shopinfo() {
      shopinfo().then((res) => {
        this.form = { ...res.data.data };
        //填回照片墙
        this.shopImgs = this.form.pics.map((imgstr) => {
          return {
            name: imgstr,
            url: PIC_URLS + imgstr,
          };
        });
      });
    },
    //上传店铺头像
    handleAvatarSuccessS(res) {
      if (res.code == 0) {
        this.form.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺头像上传成功！",
        });
      }
    },
    //上传店铺图片
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.pics.push(res.imgUrl);
      }
    },
    //删除图片
    removeImgs(res) {
      this.form.pics.splice(this.form.pics.indexOf(res.name), 1);
    },
    //点击保存修改店铺数据
    clickHold() {
      var params={
        id:this.form.id,
        name:this.form.name,
        bulletin:this.form.bulletin,
        avatar:this.form.avatar,
        deliveryPrice:this.form.deliveryPrice,
        deliveryTime: this.form.deliveryTime,
        description: this.form.description,
        score: this.form.score,
        sellCount: this.form.sellCount,
        date:JSON.stringify([
          getTime(this.form.date[0]),
          getTime(this.form.date[1])
        ]),
        supports: JSON.stringify(this.form.supports),
        pics: JSON.stringify(this.form.pics)
      }
      shopedit(params).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "店铺信息修改成功！",
          });
        } else {
          this.$message({
            type: "success",
            message: "店铺信息修改失败！",
          });
        }
      });
      this.shopinfo();
    },
  },

  created() {
    this.shopinfo();
    this.PIC_URLS = PIC_URLS;
    this.PIC_URL = PIC_URL;
  },
};
</script>

<style scoped lang="less">
.item {
  width: 430px;
}
.el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.el-image {
  width: 150px;
}
</style>