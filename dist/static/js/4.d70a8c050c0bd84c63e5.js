webpackJsonp([4],{HxS9:function(e,r,s){r=e.exports=s("BkJT")(!0),r.push([e.i,"#login[data-v-e4708954]{position:absolute;background-color:#fff;padding:30px;width:300px;height:260px;left:0;right:0;top:0;bottom:0;margin:auto}.tips[data-v-e4708954]{color:red}","",{version:3,sources:["F:/demo/vueDemo/vue+vue-router+vuex+axios+element-ui+mock-demo/src/components/Login.vue"],names:[],mappings:"AACA,wBACE,kBAAmB,AACnB,sBAAuB,AACvB,aAAc,AACd,YAAa,AACb,aAAc,AACd,OAAQ,AACR,QAAS,AACT,MAAO,AACP,SAAU,AACV,WAAa,CACd,AACD,uBACE,SAAW,CACZ",file:"Login.vue",sourcesContent:["\n#login[data-v-e4708954] {\n  position: absolute;\n  background-color: #fff;\n  padding: 30px;\n  width: 300px;\n  height: 260px;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n}\n.tips[data-v-e4708954] {\n  color: red;\n}\n"],sourceRoot:""}])},Jp54:function(e,r,s){"use strict";var t=s("vMJZ");r.a={data:function(){return{loginForm:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:4,max:15,message:"长度在 4 到 15 个字符",trigger:"blur"}]},loginLoading:!1,registerLoading:!1,tips:"",registerFormVisible:!1,registerForm:{username:"",password:"",passwordConfirm:""}}},methods:{login:function(){var e=this;this.loginLoading=!0,this.$refs.loginForm.validate(function(r){r?e.$store.dispatch("Login",e.loginForm).then(function(r){var s=r.data.homeView||"/";e.$router.push({path:s}),e.$message({type:"success",message:"登录成功跳转到首页..."}),e.loginLoading=!1}).catch(function(r){e.tips="用户名或密码错误，请重新输入、、、 ",e.loginLoading=!1}):(e.$message({type:"info",showClose:!0,duration:0,message:"数据输入不符合要求，请检查数据！！"}),e.loginLoading=!1)})},register:function(){this.registerFormVisible=!0},registerHandler:function(){var e=this;this.registerLoading=!0,this.$refs.registerForm.validate(function(r){r?e.registerForm.password===e.registerForm.passwordConfirm?Object(t.e)(e.registerForm).then(function(){e.$message({type:"success",message:"注册成功，请使用该账户进行登录、、、"}),e.registerFormVisible=!1,e.registerLoading=!1}).catch(function(r){e.$message({type:"error",message:"注册失败，请重新输入或者联系管理员、、"}),e.registerLoading=!1}):(e.$message({type:"warning",message:"两次输入的密码不一致，请确认、、、"}),e.registerLoading=!1):(e.$message({type:"info",message:"数据输入不符合要求，请检查数据！！"}),e.registerLoading=!1)})}}}},KeK4:function(e,r,s){"use strict";var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{attrs:{id:"login"}},[s("el-form",{ref:"loginForm",attrs:{model:e.loginForm,rules:e.rules,"label-width":"100px"}},[s("h2",[e._v("系统登录")]),e._v(" "),s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{attrs:{"spell-check":"false"},model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{"spell-check":"false",type:"password"},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",loading:e.loginLoading},on:{click:function(r){r.preventDefault(),e.login(r)}}},[e._v("登录")]),e._v(" "),s("el-button",{on:{click:function(r){r.preventDefault(),e.register(r)}}},[e._v("注册")])],1)],1),e._v(" "),s("h3",{staticClass:"tips"},[e._v(e._s(e.tips))]),e._v(" "),s("h3",[e._v("用户名可以是：admin、table、excel、visitor")]),e._v(" "),e._m(0),e._v(" "),s("h4",[e._v("其他用户名将被拒绝登录")]),e._v(" "),s("el-dialog",{attrs:{title:"欢迎您注册账户",center:"","modal-append-to-body":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.registerFormVisible},on:{"update:visible":function(r){e.registerFormVisible=r}}},[s("el-form",{ref:"registerForm",attrs:{rules:e.rules,model:e.registerForm,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"用户名",prop:"username"}},[s("el-input",{attrs:{"spell-check":"false"},model:{value:e.registerForm.username,callback:function(r){e.$set(e.registerForm,"username",r)},expression:"registerForm.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{"spell-check":"false",type:"password"},model:{value:e.registerForm.password,callback:function(r){e.$set(e.registerForm,"password",r)},expression:"registerForm.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码",prop:"password"}},[s("el-input",{attrs:{"spell-check":"false",type:"password"},model:{value:e.registerForm.passwordConfirm,callback:function(r){e.$set(e.registerForm,"passwordConfirm",r)},expression:"registerForm.passwordConfirm"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",loading:e.registerLoading},on:{click:function(r){r.preventDefault(),e.registerHandler(r)}}},[e._v("确认注册")]),e._v(" "),s("el-button",{on:{click:function(r){r.preventDefault(),e.registerFormVisible=!1}}},[e._v("取 消")])],1)],1)],1)},o=[function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("h4",[e._v("每个用户名对应不同的权限，密码随便输入"),s("em",[e._v("4-15")]),e._v("位字符")])}],i={render:t,staticRenderFns:o};r.a=i},g41K:function(e,r,s){var t=s("HxS9");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);s("8bSs")("6e09be82",t,!0)},xJsL:function(e,r,s){"use strict";function t(e){s("g41K")}Object.defineProperty(r,"__esModule",{value:!0});var o=s("Jp54"),i=s("KeK4"),n=s("0HdQ"),a=t,l=n(o.a,i.a,!1,a,"data-v-e4708954",null);r.default=l.exports}});
//# sourceMappingURL=4.d70a8c050c0bd84c63e5.js.map