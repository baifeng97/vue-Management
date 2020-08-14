//引入
import axios from 'axios'

axios.defaults.baseURL='http://127.0.0.1:5000'
//-------------------------------------------------------图片接口API------------------------------------------------//
//商品图片的上传接口地址
export const ITEMS_IMG_UPLOAD=axios.defaults.baseURL+'/goods/goods_img_upload';
//获取商品图片地址
export const GET_ITEMS_IMG=axios.defaults.baseURL+'/upload/imgs/goods_img/';
//店铺图片上传接口
export const PIC_URL=axios.defaults.baseURL+'/shop/upload';
//店铺图片地址接口
export const PIC_URLS=axios.defaults.baseURL+'/upload/shop/';
//-------------------------------------------------------登录API------------------------------------------------//
//登录接口
//account  账号
//password  密码
export var Login=(account,password)=>axios.post('/users/checkLogin',{account,password});

//验证token是否过期
export var checktoken=(token)=>axios.get('/users/checktoken',{params:{token}});
//-------------------------------------------------------账号管理API------------------------------------------------//
//添加账号
//account  账号
//password  密码
//userGroup 用户组，权限
export var add=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup});
//修改密码
//newPwd 新密码
//id 帐号id
export var editpwd=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id});
//验证旧密码
//oldPwd 旧密码
//id 帐号id
export var checkoldpwd=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}});
//获取账号列表
//currentPage 当前页码
//pageSize 每页条数
export var list=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}});
//删除账号
//id 帐号id
export var del=(id)=>axios.get('/users/del',{params:{id}});
//修改账号
//id 帐号id
//account 账号
//userGroup 用户组
export var edit=(params)=>axios.post('/users/edit',params);
//批量删除账号
//ids 要删除数据的id组成的数组（字符串格式的数组
export var batchdel=(ids)=>axios.get('/users/batchdel',{params:{ids}});
//个人中心
//id 帐号id
export var accountinfo=(id)=>axios.get('/users/accountinfo',{params:{id}});
//-------------------------------------------------------分类API------------------------------------------------//
//添加分类
export var addcate=(cateName,state)=>axios.post('/goods/addcate',{cateName,state});
//获取分类列表
//currentPage 当前页码
//pageSize 每页条数
export var catelist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}});
//删除分类删除分类
//id 帐号id
export var delcate=(id)=>axios.get('/goods/delcate',{params:{id}});
//查询所有分类名称
export var categories=()=>axios.get('/goods/categories',{params:{}});
//修改分类
export var editcate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state});
//头像上传
//id 帐号id
export var upload=(id)=>axios.post('/users/avatar_upload',{id});
//图片上传接口
export var imgupload=()=>axios.post('/goods/goods_img_upload');
//-------------------------------------------------------商品管理API------------------------------------------------//
//添加商品
//name 商品名称
//category 商品分类
//price 商品价格
//imgUrl 商品图片地址
//goodsDesc 商品描述
export var goodsadd=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc});
//获取商品列表
//currentPage 当前页码
//pageSize 每页条数
export var goodslist=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}});
//删除商品
export var goodsdel=(id)=>axios.get('/goods/del',{params:{id}});
//修改商品
export var goodsedit=(params)=>axios.post('/goods/edit',params);
//-------------------------------------------------------订单管理API------------------------------------------------//
//获取订单列表
export var orderlist=(params)=>axios.get('/order/list',{params});
//获取订单详情
export var orderdetail=(id)=>axios.get('/order/detail',{params:{id}});
//修改订单
export var orderedit=(params)=>axios.post('/order/edit',params);
//订单报表接口
export var ordertotal=(date)=>axios.get('/order/ordertotal',{params:{date}});
//-------------------------------------------------------店铺管理API------------------------------------------------//
//获取店铺详情
export var shopinfo=()=>axios.get('/shop/info',{params:{}});
//店铺内容修改
export var shopedit=(params)=>axios.post('/shop/edit',params);
//首页报表接口
export var totaldata=()=>axios.get('/order/totaldata',{params:{}});






