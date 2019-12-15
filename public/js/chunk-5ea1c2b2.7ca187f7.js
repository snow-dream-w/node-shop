(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ea1c2b2"],{"10c2":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"hover clearfix"},[t("div",{staticClass:"content"},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.axios.defaults.baseURL+"/user/upload","with-credentials":!0,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"单击更换头像",placement:"bottom"}},[t("el-avatar",{attrs:{size:50,src:e.avatar}})],1)],1),e._m(0),t("div",{staticClass:"info"},[t("div",{staticClass:"edit"},[t("el-row",[t("b",[e._v(" 基本信息：")]),t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",disabled:!e.disabled},on:{click:function(a){e.disabled=!e.disabled}}})],1)],1),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"注册手机",prop:"telephone",disabled:""}},[t("el-input",{attrs:{disabled:""},model:{value:e.ruleForm.telephone,callback:function(a){e.$set(e.ruleForm,"telephone",a)},expression:"ruleForm.telephone"}})],1),t("el-form-item",{attrs:{label:"昵称",prop:"name",disabled:""}},[t("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}})],1),t("el-form-item",{attrs:{label:"性别",prop:"sex"}},[t("el-select",{attrs:{placeholder:"请选择活动区域",disabled:e.disabled},model:{value:e.ruleForm.sex,callback:function(a){e.$set(e.ruleForm,"sex",a)},expression:"ruleForm.sex"}},[t("el-option",{attrs:{label:"男",value:"男"}}),t("el-option",{attrs:{label:"女",value:"女"}})],1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.disabled,expression:"!disabled"}]},[t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.submitForm("ruleForm")}}},[e._v("提交")]),t("el-button",{on:{click:function(a){return e.resetForm("ruleForm")}}},[e._v("重置")])],1),t("el-divider"),t("change-password")],1)],1)],1)])])},s=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"title"},[t("span",[e._v(" 编辑个人资料")])])}],l=(t("7f7f"),t("4917"),function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"edit"},[t("el-row",[t("b",[e._v(" 修改密码：")]),t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",disabled:!e.disabled},on:{click:function(a){e.disabled=!e.disabled}}})],1)],1),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"原密码",prop:"oldpass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",disabled:e.disabled},model:{value:e.ruleForm.oldpass,callback:function(a){e.$set(e.ruleForm,"oldpass",a)},expression:"ruleForm.oldpass"}})],1),t("el-form-item",{attrs:{label:"新密码",prop:"pass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",disabled:e.disabled},model:{value:e.ruleForm.pass,callback:function(a){e.$set(e.ruleForm,"pass",a)},expression:"ruleForm.pass"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",disabled:e.disabled},model:{value:e.ruleForm.checkPass,callback:function(a){e.$set(e.ruleForm,"checkPass",a)},expression:"ruleForm.checkPass"}})],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.disabled,expression:"!disabled"}]},[t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.submitForm("ruleForm")}}},[e._v("提交")]),t("el-button",{on:{click:function(a){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)}),o=[],i={data:function(){var e=this,a=function(a,t,r){""===t?r(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),r())},t=function(a,t,r){""===t?r(new Error("请再次输入密码")):t!==e.ruleForm.pass?r(new Error("两次输入密码不一致!")):r()};return{ruleForm:{oldpass:"",pass:"",checkPass:""},rules:{pass:[{validator:a,trigger:"blur"}],checkPass:[{validator:t,trigger:"blur"}]},disabled:!0}},methods:{submitForm:function(e){var a=this;this.$refs[e].validate(function(e){e&&a.axios.post("/user/edit/password",{oldPassword:a.ruleForm.oldpass,newPassword:a.ruleForm.pass}).then(function(e){1===e.data.status?(a.$message({message:"密码修改成功！",type:"success"}),a.disabled=!0,a.ruleForm.oldpass="",a.ruleForm.pass="",a.ruleForm.checkPass=""):a.$message.error(e.data.data)})})},resetForm:function(e){this.$refs[e].resetFields()}}},n=i,u=(t("4dad"),t("2877")),d=Object(u["a"])(n,l,o,!1,null,"c7e62642",null),c=d.exports,m={data:function(){var e=function(e,a,t){a.match(/^[a-zA-Z0-9_\-\u4e00-\u9fa5]{4,12}$/)?t():t(new Error("请输入中英文字符、数字或下划线组成的4-20位昵称！"))};return{avatar:"/avatar/default.png",ruleForm:{telephone:"17865579761",name:"",sex:"男"},rules:{name:[{required:!0,message:"请输入昵称!",trigger:"change"},{validator:e,trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}]},disabled:!0}},methods:{submitForm:function(e){var a=this;this.$refs[e].validate(function(e){e&&a.axios.post("/user/edit/info",{name:a.ruleForm.name,sex:a.ruleForm.sex}).then(function(e){1===e.data.status?(a.$message({message:"修改成功！",type:"success"}),a.disabled=!a.disabled):a.$message.error("修改失败，请重新尝试！")})})},resetForm:function(e){this.$refs[e].resetFields()},handleAvatarSuccess:function(e,a){this.avatar=URL.createObjectURL(a.raw)},beforeAvatarUpload:function(e){var a="image/jpeg"===e.type|"image/png"===e.type,t=e.size/1024/1024<4;return a||this.$message.error("上传头像图片只能是JPG/PNG格式!"),t||this.$message.error("上传头像图片大小不能超过 4MB!"),a&&t}},components:{changePassword:c},created:function(){var e=this;this.axios.get("/user/person").then(function(a){0===a.data.status&&e.$router.push("/login_register/login"),e.ruleForm.telephone=a.data.data.telephone,e.ruleForm.name=a.data.data.name,e.ruleForm.sex=a.data.data.sex,e.avatar=e.axios.defaults.baseURL+a.data.data.avatar})}},p=m,f=(t("1ddd"),Object(u["a"])(p,r,s,!1,null,"02b1b05e",null));a["default"]=f.exports},"1ddd":function(e,a,t){"use strict";var r=t("a37c"),s=t.n(r);s.a},4917:function(e,a,t){"use strict";var r=t("cb7c"),s=t("9def"),l=t("0390"),o=t("5f1b");t("214f")("match",1,function(e,a,t,i){return[function(t){var r=e(this),s=void 0==t?void 0:t[a];return void 0!==s?s.call(t,r):new RegExp(t)[a](String(r))},function(e){var a=i(t,e,this);if(a.done)return a.value;var n=r(e),u=String(this);if(!n.global)return o(n,u);var d=n.unicode;n.lastIndex=0;var c,m=[],p=0;while(null!==(c=o(n,u))){var f=String(c[0]);m[p]=f,""===f&&(n.lastIndex=l(u,s(n.lastIndex),d)),p++}return 0===p?null:m}]})},"4dad":function(e,a,t){"use strict";var r=t("63b2"),s=t.n(r);s.a},"63b2":function(e,a,t){},a37c:function(e,a,t){}}]);
//# sourceMappingURL=chunk-5ea1c2b2.7ca187f7.js.map