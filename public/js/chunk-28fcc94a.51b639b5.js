(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28fcc94a"],{7667:function(t,s,a){"use strict";var n=a("c4dc"),e=a.n(n);e.a},c4dc:function(t,s,a){},cf05:function(t,s,a){t.exports=a.p+"img/logo.82b9c7a5.png"},f1e6:function(t,s,a){"use strict";a.r(s);var n=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"index"},[a("div",{staticClass:"index2"},[a("div",{staticClass:"decoration"},[a("div",{staticClass:"content"},[a("div",{staticClass:"block"},[a("el-carousel",{attrs:{trigger:"click",direction:"vertical",height:"450px"}},t._l(t.goodsInfo.images,function(t){return a("el-carousel-item",{key:t._id},[a("img",{attrs:{src:t.src}})])}),1),a("vue-preview",{attrs:{list:t.list,thumbImageStyle:{width:"180px",height:"100px",margin:"4px",zIndex:10},previewBoxStyle:{border:"1px solid #eee"},tapToClose:!0},on:{close:t.closeHandler,destroy:t.destroyHandler}})],1),a("div",{staticClass:"detail"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"商品描述"}},[t._v("这是商品描述")]),a("el-tab-pane",{attrs:{label:"评论数量"+t.goodsInfo.commentNum}},[a("ul",t._l(t.comments,function(s){return a("li",{key:s.id},[a("img",{attrs:{src:s.image,width:"30"}}),a("span",[t._v(t._s(s.name))]),a("span",{staticClass:"date"},[t._v("2018-08-01")]),a("span",{staticClass:"delBtn"},[t._v("删除")]),a("p",[t._v(t._s(s.content))]),a("div",{staticClass:"nice"},[a("i",{staticClass:"el-icon-chat-dot-square"}),a("span",[t._v(t._s(s.num1))]),t._v("\n                       \n                      "),a("i",{staticClass:"el-icon-magic-stick"}),a("span",[t._v(t._s(s.num2))])])])}),0)])],1)],1)])]),a("div",{staticClass:"info"},[a("span",[t._v(t._s(t.goodsInfo.name))]),a("el-divider"),a("div",{staticClass:"first"},[t._v("\n          价格\n          "),a("span",{staticClass:"price"},[t._v("￥"+t._s(t.goodsInfo.price))]),t._v("\n          销量\n          "),a("span",[t._v(t._s(t.goodsInfo.sales))]),a("el-divider"),t._v("数量\n          "),a("el-input-number",{attrs:{min:1,max:t.goodsInfo.inventoryNum,label:"描述文字"},on:{change:t.handleChange},model:{value:t.buyNum,callback:function(s){t.buyNum=s},expression:"buyNum"}}),t._v(" 库存：\n          "),a("span",{staticClass:"num"},[t._v(t._s(t.goodsInfo.inventoryNum))]),t._v("件\n        ")],1),a("el-divider"),t._v(" \n        "),a("el-button",{attrs:{type:"primary"},on:{click:t.addCar}},[a("i",{staticClass:"el-icon-shopping-cart-2"}),t._v("加入购物车\n        ")]),t._v(" \n        "),a("el-button",{attrs:{type:"danger"},on:{click:t.buyGoods}},[a("i",{staticClass:"el-icon-trophy"}),t._v("立即购买\n        ")])],1)])])])},e=[],i={data:function(){return{goodsInfo:{images:[{id:1,src:null}],name:"Vue套餐",price:parseFloat(15.01),unit:"件",sales:5,inventoryNum:10,commentNum:15},buyNum:1,list:[{src:a("cf05"),w:720,h:400}],comments:[{id:1,image:a("cf05"),name:"吾忆那年秋",content:"这是一段评论内容",num1:10,num2:1e3},{id:2,image:a("cf05"),name:"吾忆那年秋",content:"这是一段评论内这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容容",num1:10,num2:1e3},{id:3,image:a("cf05"),name:"吾忆那年秋",content:"这是一段评论内容",num1:10,num2:1e3}]}},methods:{handleChange:function(t){console.log(t)},closeHandler:function(){console.log("closeHandler")},destroyHandler:function(){console.log("destroyHandler")},addCar:function(){var t=this;this.axios.post("/car/add",{goodsId:this.goodsInfo._id,num:this.buyNum}).then(function(s){1===s.data.status?t.$notify({title:"成功",message:"成功加入购物车",type:"success"}):"未登录"==s.data.data?t.$router.push("/login_register/login"):t.$router.push("*")})},buyGoods:function(){var t=this;this.axios.post("/car/add",{goodsId:this.goodsInfo._id,num:this.buyNum}).then(function(s){1===s.data.status?t.$router.push("/cart"):"未登录"==s.data.data?t.$router.push("/login_register/login"):t.$router.push("*")})}},created:function(){var t=this;this.axios.get("/goods/goodsDetail/"+this.$route.params.id).then(function(s){if(1===s.data.status){t.goodsInfo=s.data.data;for(var a=0;a<s.data.data.images.length;a++){var n={id:a,w:720,h:400,src:t.target_IP+s.data.data.images[a]};s.data.data.images[a]=n,t.list[a]=n}}else alert(404)})}},o=i,c=(a("7667"),a("2877")),r=Object(c["a"])(o,n,e,!1,null,"92a516b2",null);s["default"]=r.exports}}]);
//# sourceMappingURL=chunk-28fcc94a.51b639b5.js.map