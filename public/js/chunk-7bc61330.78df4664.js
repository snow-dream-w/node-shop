(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bc61330"],{"0c30":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"order-content clearfix"},[a("div",{staticClass:"content"},[a("person-avatar"),a("div",{staticClass:"order"},[a("el-table",{attrs:{data:t.tableData,border:"",id:"table"}},[a("el-table-column",{attrs:{label:"商品",width:"580"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-table",{attrs:{data:e.row.goodsInfo,border:""}},[a("el-table-column",{attrs:{width:"108"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"80px",height:"80px"},attrs:{src:t.row.goodsId.images[0]}})]}}],null,!0)}),a("el-table-column",{attrs:{label:"名称",prop:"goodsId.name",width:"180"}}),a("el-table-column",{attrs:{label:"单价",prop:"goodsId.price",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s(e.row.goodsId.price.toFixed(2))+"元")]}}],null,!0)}),a("el-table-column",{attrs:{label:"数量",prop:"num",width:"90"}}),a("el-table-column",{attrs:{label:"单位",prop:"goodsId.unit",width:"90"}})],1)]}}])}),a("el-table-column",{attrs:{label:"实付款",width:"85"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s(e.row.total.toFixed(2))+"元")]}}])}),a("el-table-column",{attrs:{prop:"status",label:"订单状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("ul",t._l(t.statusEnum,function(n,r){return e.row.status==r?a("li",{key:r},[t._v(t._s(n))]):t._e()}),0)]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"operate-menu",attrs:{type:"text",size:"small"},on:{click:function(a){return t.orderDetails(e.row)}}},[t._v("订单详情")]),1===e.row.status?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.goPay(e.row._id)}}},[t._v("去付款")]):t._e(),0===e.row.status||4===e.row.status?a("el-button",{attrs:{type:"danger",size:"small"}},[t._v("删除订单")]):t._e(),a("br"),1===e.row.status?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.confirmCancel(e.row._id)}}},[t._v("   取消订单")]):t._e()]}}])})],1)],1)],1)])])},r=[],o=(a("55dd"),{data:function(){return{tableData:[],statusEnum:["已取消","待付款","待发货","已发货","已完成"]}},watch:{"$route.path":function(){var t=this.$route.params.status;this.initOrder(t)}},methods:{orderDetails:function(t){this.$router.push("/order_detail/"+t.id)},goPay:function(t){this.$router.push("/pay_order/".concat(t))},confirmCancel:function(t){var e=this;this.$confirm("确认取消订单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.cancelOrder(t)}).catch(function(){e.$message({type:"info",message:"已取消操作"})})},cancelOrder:function(t){var e=this;this.axios.post("/order/cancel",{_id:t}).then(function(t){if(1===t.data.status){e.$message({type:"success",message:"订单取消成功"});var a=e.$route.params.status;e.initOrder(a)}else e.$message.error("订单取消失败，请重新尝试！")})},initOrder:function(t){var e=this,a="";a=t?"/order/orderInfo/".concat(t):"/order/orderInfo",this.axios.get(a).then(function(t){e.tableData=t.data.data,e.tableData.sort(function(t,e){return new Date(e.updatedAt).getTime()-new Date(t.updatedAt).getTime()})})}},created:function(){var t=this.$route.params.status;this.initOrder(t)}}),s=o,i=(a("c3af"),a("da0a"),a("2877")),l=Object(i["a"])(s,n,r,!1,null,"225ac395",null);e["default"]=l.exports},"18e3":function(t,e,a){},"2f21":function(t,e,a){"use strict";var n=a("79e5");t.exports=function(t,e){return!!t&&n(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,a){"use strict";var n=a("5ca1"),r=a("d8e8"),o=a("4bf8"),s=a("79e5"),i=[].sort,l=[1,2,3];n(n.P+n.F*(s(function(){l.sort(void 0)})||!s(function(){l.sort(null)})||!a("2f21")(i)),"Array",{sort:function(t){return void 0===t?i.call(o(this)):i.call(o(this),r(t))}})},"9c45":function(t,e,a){},c3af:function(t,e,a){"use strict";var n=a("18e3"),r=a.n(n);r.a},da0a:function(t,e,a){"use strict";var n=a("9c45"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-7bc61330.78df4664.js.map