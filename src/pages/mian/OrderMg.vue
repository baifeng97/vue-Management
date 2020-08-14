<template>
  <div id="OrderMg_box">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input placeholder="订单号" v-model="orderNo"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input placeholder="收货人" v-model="consignee"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="手机号" v-model="phone"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="订单状态" v-model="orderState">
          <el-option v-for="(item,index) in option" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickquery">查询</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" v-loading="isloading">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="clickedit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block block_box2">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 查询模态框 -->
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单号:" :label-width="formLabelWidth" prop="orderNo">
          <span>{{form.orderNo}}</span>
        </el-form-item>
        <el-form-item label="下单时间:" :label-width="formLabelWidth" prop="orderTime">
          <span>{{form.orderTime}}</span>
        </el-form-item>
        <el-form-item prop="phone" label="手机号:" :label-width="formLabelWidth">
          <span>{{form.phone}}</span>
        </el-form-item>
        <el-form-item prop="consignee" label="收货人:" :label-width="formLabelWidth">
          <span>{{form.consignee}}</span>
        </el-form-item>
        <el-form-item prop="deliverAddress" label="配送地址:" :label-width="formLabelWidth">
          <span>{{form.deliverAddress}}</span>
        </el-form-item>
        <el-form-item prop="deliveryTime" label="送达时间:" :label-width="formLabelWidth">
          <span>{{form.deliveryTime}}</span>
        </el-form-item>
        <el-form-item prop="remarks" label="用户备注:" :label-width="formLabelWidth">
          <span>{{form.remarks}}</span>
        </el-form-item>
        <el-form-item prop="orderAmount" label="订单金额:" :label-width="formLabelWidth">
          <span>{{form.orderAmount}}</span>
        </el-form-item>
        <el-form-item prop="orderState" label="订单状态:" :label-width="formLabelWidth">
          <span>{{form.orderState}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisibles">
      <el-form :model="editobj">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="editobj.orderNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下单时间:" :label-width="formLabelWidth" prop="orderTime">
          <el-input v-model="editobj.orderTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="editobj.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="consignee" label="收货人:" :label-width="formLabelWidth">
          <el-input v-model="editobj.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="deliverAddress" label="配送地址:" :label-width="formLabelWidth">
          <el-input v-model="editobj.deliverAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="deliveryTime" label="送达时间:" :label-width="formLabelWidth">
          <el-input v-model="editobj.deliveryTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="remarks" label="用户备注:" :label-width="formLabelWidth">
          <el-input v-model="editobj.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="orderAmount" label="订单金额:" :label-width="formLabelWidth">
          <el-input v-model="editobj.orderAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select placeholder="订单状态" v-model="editobj.orderState">
          <el-option v-for="(item,index) in option" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="clickEnsure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderlist, orderdetail,orderedit } from "@/api/api";
import { getTime } from "@/utils/utils";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      option: ["已受理", "派送中", "已完成", "全部"],
      date: null,
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      dialogFormVisibles:false,
      form: {
        
      },
      editobj:{},
      isloading:false,
      
    };
  },
  created() {
    this.getorderlist();
  },
  methods: {
    //获取列表
    getorderlist(paramsex) {
      this.isloading = true;
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getTime(obj.orderTime);
          obj.deliveryTime = getTime(obj.deliveryTime);
        }
        this.tableData = arr;
        this.total = res.data.total;
        this.isloading = false;
      });
    },
    //条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getorderlist();
    },
    //页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderlist(this.paramsex);
    },
    //点击查询
    clickquery() {
      //如果用户选择了时间
      let { orderNo, consignee, phone, orderState } = this;
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date)
        paramsex.date = JSON.stringify([
          getTime(this.date[0]),
          getTime(this.date[1]),
        ]);

      this.paramsex = paramsex;
      this.getorderlist(this.paramsex);
    },
    //查看
    handleClick(row) {
      this.dialogFormVisible = true;
      orderdetail(row.id).then((res) => {
        this.form.orderTime = getTime(res.data.data.orderTime);
        this.form.deliveryTime = getTime(res.data.data.deliveryTime);
        this.form=res.data.data;
      });
    },
    //编辑
    clickedit(row) {
      this.editobj={...row}
      
      this.dialogFormVisibles=true
      
    },
    clickEnsure(){
      orderedit(this.editobj).then(res=>{
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "商品数据修改成功！"
          });
          //刷新数据
          this.getorderlist();
          //关闭模态框
          this.dialogFormVisibles = false;
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
#OrderMg_box {
  background-color: #fff;
}
.el-form {
  padding: 20px 20px 0;
}
.block {
  padding: 0px 20px;
}
.block_box2 {
  margin-top: 40px;
}
.el-input {
  width: 200px;
}
.demonstration {
  margin-right: 10px;
  font-size: 14px;
}
.el-button {
  margin-left: 10px;
  margin-bottom: 50px;
}
</style>