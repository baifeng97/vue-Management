<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../../public/image/2.png" />
          <div class="indent_box">
            <h3 class>总订单</h3>
            <h4>{{form.totalOrder}}</h4>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../../public/image/3.png" />
          <div class="indent_box">
            <h3 class>总销售额</h3>
            <h4>{{form.totalAmount}}</h4>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../../public/image/4.png" />
          <div class="indent_box">
            <h3 class>今日订单数</h3>
            <h4>{{form.todayOrder}}</h4>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <img src="../../../public/image/5.png" />
          <div class="indent_box">
            <h3 class>今日销售额</h3>
            <h4>{{form.totayAmount}}</h4>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- echarts框 -->
    <div id="myChart" style="width: 100%;height:500px;"></div>
  </div>
</template>

<script>
import { totaldata } from "@/api/api";
export default {
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    
    var echarts = require("echarts");
    var myChart = echarts.init(document.getElementById("myChart"));
    totaldata(this.form).then((res) => {
      this.form={...res.data}
      let option={
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单数据", "金额数据"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },

        ],

      }
      myChart.setOption(option);
    });
  },
 
    
    
    // drawLine() {
    //   var echarts = require("echarts");
    //   var myChart = echarts.init(document.getElementById("myChart"));
    //   myChart.setOption({
    //     
    //   });
    // },
 
  
};
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
    .bg-purple-dark {
      background: #fff;
    }
    .bg-purple-light {
      background: #fff;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #fff;
    }
    .bg-purple {
      background: #fff;
      height: 100px;
      display: flex;
      align-content: center;
      justify-content: space-between;

      .indent_box {
        flex: 1;
        text-align: center;
        align-self: center;

        h3 {
          margin: 0;
          color: #d1d1d1;
        }
        h4 {
          margin: 0;
        }
      }
    }
  }
}
#myChart {
  background-color: #fff;
}
</style>