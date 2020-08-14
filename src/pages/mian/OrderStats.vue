<template>
  <div class="echarts">
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickQuery">查询</el-button>
    </div>
    <div id="myChart" style="width: 100%;height:500px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ordertotal } from "@/api/api";
import { getTime } from "@/utils/utils";
export default {
  data(){
    return{
      date:[new Date('2020-04-01 00:00:00'),new Date()]
    }
  },
  methods: {
    //查询按钮
    clickQuery() {
      
      let timeArr = JSON.stringify([
        getTime(this.date[0]),
        getTime(this.date[1]),
      ]);

      this.refreshEcharts(timeArr);
    },
    //渲染echarts表格
    refreshEcharts(timeArr) {
      ordertotal(timeArr).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getTime(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
            name: "价格",
            min: 0,
            max: 150,
            interval: 20,
            axisLabel: {
              formatter: "{value} 元",
            },
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };
        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    
    this.sechart = echarts.init(document.getElementById("myChart"));
  },
  created() {
    this.clickQuery()
  },
  
};
</script>

<style scoped lang="less">
.demonstration {
  font-size: 14px;
  margin-right: 10px;
}
.el-button {
  margin-left: 10px;
}
#myChart {
  background-color: #fff;
  margin-top: 30px;
}
</style>