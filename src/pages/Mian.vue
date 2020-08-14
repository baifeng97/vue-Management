<template>
  <el-container style="border: 1px solid #eee">
    <el-aside style="width: 200px">
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div class="take_away">
          <el-avatar :size="40">
            <img src="../../public/image/1.jpg" />
          </el-avatar>外卖商家中心
        </div>
        <div v-for="(item,index) in powerarr" :key="index">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(child,index) in item.children"
                :key="index"
                :index="child.url"
              >{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 60px">
          <div>
            <el-breadcrumb-item v-for="(item,index) in headlist" :key="index">{{item}}</el-breadcrumb-item>
          </div>
          <div id="user_box">
            <span>欢迎你，{{username}}</span>
            <el-avatar :size="40">
              <img :src="headimg" />
            </el-avatar>
          </div>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, accountinfo } from "../api/api";
export default {
  data() {
    return {
      curIndex: 0,
      username: "",
      list: [
        {
          url: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/OrderMg",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/Order",
          icon: "el-icon-s-finance",
          name: "商品管理",
          children: [
            {
              url: "/main/List",
              name: "商品列表",
            },
            {
              url: "/main/Merchandise",
              name: "商品添加",
            },
            {
              url: "/main/Classify",
              name: "商品分类",
            },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/ShopMg",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/main/Account",
          icon: "el-icon-s-custom",
          name: "账号管理",
          children: [
            {
              url: "/main/AccountList",
              name: "账号列表",
            },
            {
              url: "/main/Append",
              name: "添加账号",
            },
            {
              url: "/main/ChangePwd",
              name: "修改密码",
            },
            {
              url: "/main/MyCenter",
              name: "个人中心",
            },
          ],
          roles: ["super"],
        },
        {
          url: "/main/Comm",
          icon: "el-icon-s-finance",
          name: "销售统计",
          children: [
            {
              url: "/main/CommodityStat",
              name: "商品统计",
            },
            {
              url: "/main/OrderStats",
              name: "订单统计",
            },
          ],
          roles: ["super"],
        },
      ],
      curhash: "",
      headimg: "",
      headlist:[],
    };
  },

  computed: {
    powerarr() {
      let newarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
      return newarr;
    },
  },
  created() {
    this.curhash = this.$route.path;

    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      } else {
        this.username = "请登录";
      }
    });
    //刷新个人信息
    this.refreshinfo();
    //监听
    this.$bus.$on("Imgs", () => {
      this.refreshinfo();
    });
    //初始化二级导航
    this.headlist=this.$route.meta.headlist
  },
  methods: {
    clickCut(index) {
      this.curIndex = index;
    },
    //刷新个人信息封装函数
    refreshinfo() {
      accountinfo(localStorage.id).then((res) => {
        this.headimg = res.data.accountInfo.imgUrl;
      });
    },
  },
  watch:{
    $route(to){
      this.headlist=to.meta.headlist
    }
  }
};
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}
#user_box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-menu {
  height: 100%;

  .take_away {
    color: #fff;
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: center;
  }
}

.el-main {
  background-color: #f0f2f5;
}
</style>