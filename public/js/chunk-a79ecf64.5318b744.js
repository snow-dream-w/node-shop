(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a79ecf64"],{"251e":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"order"},[e("div",{staticClass:"orderDetail"},[e("div",{staticClass:"title"},[t._v("订单详情")]),e("div",{staticClass:"content"},[e("div",{staticClass:"info"},[e("div",{staticClass:"address"},[t._v("\n          收货信息：\n          "),e("span",[e("span",[t._v(t._s(t.tableData[0]&&t.tableData[0].telephone))]),e("span",[t._v(" "+t._s(t.tableData[0]&&t.tableData[0].name))]),e("br"),e("span",[t._v("     "+t._s(t.tableData[0]&&t.tableData[0].address.area.join(" "))+" "+t._s(t.tableData[0]&&t.tableData[0].address.details))])])]),e("hr"),e("div",{staticClass:"orderInfo"},[e("span",[t._v("订单金额：")]),e("span",{staticClass:"name",staticStyle:{color:"red"}},[t._v(t._s(t.tableData[0]&&t.tableData[0].total.toFixed(2)))]),e("br"),e("span",[t._v("订单编号：")]),e("span",{staticClass:"name"},[t._v(t._s(t.tableData[0]&&t.tableData[0]._id))]),e("br"),e("span",[t._v("下单时间：")]),e("span",{staticClass:"name"},[t._v(t._s(t._f("formatDate")(t.tableData[0]&&t.tableData[0].updatedAt,"")))])])]),e("div",{staticClass:"status"},[e("span",{staticStyle:{lineHeight:"40px"}},[t._v("订单状态："+t._s(t.tableData[0]&&t.statusEnum[t.tableData[0].status]))]),e("div",[t._v("\n          您可以：\n          "),e("el-button",{attrs:{type:"primary",size:"small"}},[t._v("去付款")]),t._v(" \n          "),e("el-button",{attrs:{type:"primary",size:"small"}},[t._v("取消订单")]),e("el-button",{attrs:{type:"danger",size:"small"}},[t._v("删除订单")])],1)])])]),e("div",{staticClass:"title",staticStyle:{marginTop:"15px"}},[t._v("商品信息")]),e("div",{staticClass:"address"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",id:"table"}},[e("el-table-column",{attrs:{label:"商品",width:"879"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.row.goodsInfo,border:""}},[e("el-table-column",{attrs:{width:"120"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.goodsId.images[0]}})]}}],null,!0)}),e("el-table-column",{attrs:{label:"名称",prop:"goodsId.name",width:"180"}}),e("el-table-column",{attrs:{label:"单价",width:"140"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v(t._s(a.row.goodsId.price.toFixed(2)))]}}],null,!0)}),e("el-table-column",{attrs:{label:"数量",prop:"num",width:"140"}}),e("el-table-column",{attrs:{label:"单位",prop:"goodsId.unit",width:"140"}}),e("el-table-column",{attrs:{label:"操作",width:"135"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"}},[t._v("评价商品")]),e("el-button",{attrs:{type:"text",size:"small"}},[t._v("追评")])]}}],null,!0)})],1)]}}])}),e("el-table-column",{attrs:{label:"实付款",width:"120"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n          "+t._s(a.row.total.toFixed(2))+"\n        ")]}}])}),e("el-table-column",{attrs:{label:"订单状态",width:"125"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n          "+t._s(t.statusEnum[a.row.status])+"\n        ")]}}])})],1)],1)])},l=[],n={data:function(){return{tableData:[],statusEnum:["已取消","待付款","待发货","已发货","已完成"]}},filters:{formatDate:function(t){var a=new Date(t),e=a.getFullYear(),s=a.getMonth()+1,l=a.getDate(),n=a.getHours(),i=a.getMinutes(),r=a.getSeconds();return e+"-"+s+"-"+l+" "+n+":"+i+":"+r}},methods:{initOrder:function(t){var a=this;this.axios.get("/order/get/".concat(t)).then(function(t){1===t.data.status?a.tableData.push(t.data.data):a.$router.push("/*")})}},created:function(){var t=this.$route.params.id;this.initOrder(t)}},i=n,r=(e("a85b"),e("2877")),o=Object(r["a"])(i,s,l,!1,null,"5b2cb65c",null);a["default"]=o.exports},a85b:function(t,a,e){"use strict";var s=e("cc33"),l=e.n(s);l.a},cc33:function(t,a,e){}}]);
//# sourceMappingURL=chunk-a79ecf64.5318b744.js.map