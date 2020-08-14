<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <div class="text item">
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input placeholder="商品名称" v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="category" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.cateName"
                :label="item.label"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number v-model="num" :min="0" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <div class="block">
              <el-avatar shape="square" :size="150">
                <el-upload
                  action="ITEMS_IMG_UPLOAD"
                  list-type="picture-card"
                  
                  :on-success="handleAvatarSuccess"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="GET_ITEMS_IMG + imgs" alt />
                </el-dialog>
              </el-avatar>
            </div>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="goodsDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="clickAdd">添加商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { categories,goodsadd,ITEMS_IMG_UPLOAD,
  GET_ITEMS_IMG, } from "@/api/api";
export default {
  data() {
    return {
      cateName: "",
      options: [],
      num: 0,
      ITEMS_IMG_UPLOAD: "",
      GET_ITEMS_IMG: "",
      dialogVisible: false,
      name: "",
      goodsDesc: "",
      category:'',
      imgs:''
    };
  },
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    categories().then((res) => {
      this.options = res.data.categories;
    });
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.imgs = res.imgUrl;
        
      }
      
    },
    clickAdd() {
      
      
      goodsadd(
        this.name,
        this.category,
        this.num,
        this.imgs,
        this.goodsDesc
      ).then((res) => {
        console.log(res)
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
          this.name=''
          this.category=''
          this.num=''
          this.goodsDesc=''
        }else{
          this.$message({
            message: "添加失败",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.item {
  width: 430px;
}
</style>