(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09e04d27"],{1834:function(t,e,n){},5866:function(t,e,n){},"6b5d":function(t,e,n){"use strict";var s=n("5866"),a=n.n(s);a.a},bb51:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home clearfix"},[n("ul",[t._l(t.list,function(t){return n("GoodsCard",{key:t.id,attrs:{item:t}})}),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[8,12,16],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],2)])},a=[],i=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),r=n("2f62"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{on:{click:function(e){return t.handleGoodsInfo(t.item._id)}}},[n("img",{attrs:{src:t.axios.defaults.baseURL+t.item.images[0]}}),n("p",[t._v(t._s(t.item.name))]),n("div",{staticClass:"bottom"},[n("span",{staticClass:"money"},[t._v(t._s(t._f("money")(t.item.price)))]),n("span",{staticClass:"num"},[t._v(t._s(t.item.sales)+"人付款")])])])},c=[],u=(n("a481"),{props:{item:{type:Object,default:function(){return{}}}},data:function(){return{}},filters:{money:function(t){return"￥"+t.toFixed(2)}},methods:{handleGoodsInfo:function(t){this.$router.replace("/goods/"+t)}}}),d=u,l=(n("d56f"),n("2877")),h=Object(l["a"])(d,o,c,!1,null,"dde8f5d8",null),f=h.exports;function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,s)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(n,!0).forEach(function(e){Object(i["a"])(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var m={name:"home",data:function(){return{currentPage:0,total:0,limit:8,page:1,list:[]}},methods:{handleSizeChange:function(t){this.limit=t,this.init()},handleCurrentChange:function(t){var e=this;this.axios.get("/goods/query",{params:{limit:8,status:1,skip:t-1}}).then(function(t){1===t.data.status?(e.list=t.data.data,e.total=t.data.count):alert(404)})},init:function(t){var e=this;this.axios.get("/goods/query",{params:{type:t,limit:this.limit,status:1}}).then(function(t){1===t.data.status?(e.list=t.data.data,e.total=t.data.count):alert(404)})},getRecommend:function(){var t=this;this.axios.get("/goods/recommend/user").then(function(e){1===e.data.status?(t.list=e.data.data,t.total=e.data.count):t.$message.error("暂无推荐商品")})},referGoods:function(t){switch(t){case"home":this.init();break;case"recommend":if(!0===this.login_status){this.$router.push("/login_register/login");break}this.getRecommend();break;case"new":this.$message({type:"warning",message:"此功能暂不可用"});break;case"hot":this.$message({type:"warning",message:"此功能暂不可用"});break;case"precent":this.$message({type:"warning",message:"此功能暂不可用"});break}}},watch:{goods_type:function(t,e){t&&this.init(t)},"$route.query.menu":function(t,e){this.$store.dispatch("changeAnsyc_goods_type",""),this.referGoods(t)}},computed:g({},Object(r["b"])({goods_type:"goods_type",login_status:"login_status"})),components:{GoodsCard:f},created:function(){this.$route.query.menu?this.referGoods(this.$route.query.menu):this.init(this.goods_type)}},b=m,y=(n("6b5d"),Object(l["a"])(b,s,a,!1,null,"19511c5b",null));e["default"]=y.exports},d56f:function(t,e,n){"use strict";var s=n("1834"),a=n.n(s);a.a}}]);
//# sourceMappingURL=chunk-09e04d27.cd446ca6.js.map