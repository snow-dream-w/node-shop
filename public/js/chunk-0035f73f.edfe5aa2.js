(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0035f73f"],{"10c2":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"hover clearfix"},[t("div",{staticClass:"content"},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/user/upload","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"单击更换头像",placement:"bottom"}},[t("el-avatar",{attrs:{size:50,src:e.avatar}})],1)],1),e._m(0),t("div",{staticClass:"info"},[t("div",{staticClass:"edit"},[t("el-row",[t("b",[e._v(" 基本信息：")]),t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",disabled:!e.disabled},on:{click:function(r){e.disabled=!e.disabled}}})],1)],1),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"注册手机",prop:"telephone",disabled:""}},[t("el-input",{attrs:{disabled:""},model:{value:e.ruleForm.telephone,callback:function(r){e.$set(e.ruleForm,"telephone",r)},expression:"ruleForm.telephone"}})],1),t("el-form-item",{attrs:{label:"昵称",prop:"name",disabled:""}},[t("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),t("el-form-item",{attrs:{label:"性别",prop:"sex"}},[t("el-select",{attrs:{placeholder:"请选择活动区域",disabled:e.disabled},model:{value:e.ruleForm.sex,callback:function(r){e.$set(e.ruleForm,"sex",r)},expression:"ruleForm.sex"}},[t("el-option",{attrs:{label:"男",value:"男"}}),t("el-option",{attrs:{label:"女",value:"女"}})],1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.disabled,expression:"!disabled"}]},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("提交")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1),t("el-divider"),t("change-password")],1)],1)],1)])])},s=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"title"},[t("span",[e._v(" 编辑个人资料")])])}],l=(t("7f7f"),t("4917"),function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("div",{staticClass:"edit"},[t("el-row",[t("b",[e._v(" 修改密码：")]),t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",disabled:!e.disabled},on:{click:function(r){e.disabled=!e.disabled}}})],1)],1),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"原密码",prop:"oldpass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",disabled:e.disabled},model:{value:e.ruleForm.oldpass,callback:function(r){e.$set(e.ruleForm,"oldpass",r)},expression:"ruleForm.oldpass"}})],1),t("el-form-item",{attrs:{label:"新密码",prop:"pass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",disabled:e.disabled},model:{value:e.ruleForm.pass,callback:function(r){e.$set(e.ruleForm,"pass",r)},expression:"ruleForm.pass"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",disabled:e.disabled},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.disabled,expression:"!disabled"}]},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("提交")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)}),o=[],i={data:function(){var e=this,r=function(r,t,a){""===t?a(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),a())},t=function(r,t,a){""===t?a(new Error("请再次输入密码")):t!==e.ruleForm.pass?a(new Error("两次输入密码不一致!")):a()};return{ruleForm:{oldpass:"",pass:"",checkPass:""},rules:{pass:[{validator:r,trigger:"blur"}],checkPass:[{validator:t,trigger:"blur"}]},disabled:!0}},methods:{submitForm:function(e){var r=this;this.$refs[e].validate(function(e){e&&r.axios.post("/user/edit/password",{oldPassword:r.ruleForm.oldpass,newPassword:r.ruleForm.pass}).then(function(e){1===e.data.status?(r.$message({message:"密码修改成功！",type:"success"}),r.disabled=!0,r.ruleForm.oldpass="",r.ruleForm.pass="",r.ruleForm.checkPass=""):r.$message.error(e.data.data)})})},resetForm:function(e){this.$refs[e].resetFields()}}},n=i,u=(t("4dad"),t("2877")),d=Object(u["a"])(n,l,o,!1,null,"c7e62642",null),c=d.exports,m={data:function(){var e=function(e,r,t){r.match(/^[a-zA-Z0-9_\-\u4e00-\u9fa5]{4,12}$/)?t():t(new Error("请输入中英文字符、数字或下划线组成的4-20位昵称！"))};return{avatar:"/avatar/default.png",ruleForm:{telephone:"17865579761",name:"",sex:"男"},rules:{name:[{required:!0,message:"请输入昵称!",trigger:"change"},{validator:e,trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}]},disabled:!0}},methods:{submitForm:function(e){var r=this;this.$refs[e].validate(function(e){e&&r.axios.post("/user/edit/info",{name:r.ruleForm.name,sex:r.ruleForm.sex}).then(function(e){1===e.data.status?(r.$message({message:"修改成功！",type:"success"}),r.disabled=!r.disabled):r.$message.error("修改失败，请重新尝试！")})})},resetForm:function(e){this.$refs[e].resetFields()},handleAvatarSuccess:function(e,r){this.avatar=URL.createObjectURL(r.raw)},beforeAvatarUpload:function(e){var r="image/jpeg"===e.type|"image/png"===e.type,t=e.size/1024/1024<4;return r||this.$message.error("上传头像图片只能是JPG/PNG格式!"),t||this.$message.error("上传头像图片大小不能超过 4MB!"),r&&t}},components:{changePassword:c},created:function(){var e=this;this.axios.get("/user/person").then(function(r){0===r.data.status&&e.$router.push("/login_register/login"),e.ruleForm.telephone=r.data.data.telephone,e.ruleForm.name=r.data.data.name,e.ruleForm.sex=r.data.data.sex,e.avatar=r.data.data.avatar})}},p=m,f=(t("237e"),Object(u["a"])(p,a,s,!1,null,"305da4c4",null));r["default"]=f.exports},"237e":function(e,r,t){"use strict";var a=t("6473"),s=t.n(a);s.a},4917:function(e,r,t){"use strict";var a=t("cb7c"),s=t("9def"),l=t("0390"),o=t("5f1b");t("214f")("match",1,function(e,r,t,i){return[function(t){var a=e(this),s=void 0==t?void 0:t[r];return void 0!==s?s.call(t,a):new RegExp(t)[r](String(a))},function(e){var r=i(t,e,this);if(r.done)return r.value;var n=a(e),u=String(this);if(!n.global)return o(n,u);var d=n.unicode;n.lastIndex=0;var c,m=[],p=0;while(null!==(c=o(n,u))){var f=String(c[0]);m[p]=f,""===f&&(n.lastIndex=l(u,s(n.lastIndex),d)),p++}return 0===p?null:m}]})},"4dad":function(e,r,t){"use strict";var a=t("63b2"),s=t.n(a);s.a},"63b2":function(e,r,t){},6473:function(e,r,t){}}]);
//# sourceMappingURL=chunk-0035f73f.edfe5aa2.js.map