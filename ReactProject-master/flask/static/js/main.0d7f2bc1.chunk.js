(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(71)},39:function(e,t,a){},41:function(e,t,a){},68:function(e,t){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(32),o=a.n(r),u=(a(39),a(3)),i=a(4),c=a(6),m=a(5),p=a(7),l=(a(41),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).submitForm=function(e){e.preventDefault(),console.log("Form Submitted")},a.inputChange=function(e){a.props.updateUsername(e.target.value)},a.textUsername=s.a.createRef(),a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("form",{onSubmit:this.submitForm},s.a.createElement("input",{type:"text",name:"username",onChange:function(t){return e.inputChange(t)}}),s.a.createElement("input",{type:"text",name:"password"}),s.a.createElement("button",null,"Submit"))}}]),t}(s.a.Component)),d=a(8),h=a(33),f=a.n(h),g=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).updateMessage=function(e){a.setState({message:JSON.stringify(e)})},a.socket=f()("http://localhost:5000"),a.state={message:""},a.updateMessage=a.updateMessage.bind(Object(d.a)(Object(d.a)(a))),a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("join_room",function(e){alert(JSON.stringify(e)),this.updateMessage(JSON.stringify(e))}),this.sendMessage=function(t){t.preventDefault(),e.socket.emit("create",e.props.username)}}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h1",null,"Server Response"),s.a.createElement("h2",null,this.props.username),s.a.createElement("button",{onClick:this.sendMessage},"CONNECT TO FLASK"),s.a.createElement("h2",null,this.state.message))}}]),t}(s.a.Component),b=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).updateMessage=function(e){a.setState({message:e})},a.updateUsername=function(e){a.setState({username:e})},a.updatePassword=function(e){a.setState({password:e})},a.state={message:"",username:"",password:""},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(l,{updateMessage:this.updateMessage,updateUsername:this.updateUsername,updatePassword:this.updatePassword}),s.a.createElement(g,{updateMessage:this.updateMessage,updateUsername:this.updateUsername,updatePassword:this.updatePassword,message:this.state.message,username:this.state.username,password:this.state.password}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,2,1]]]);
//# sourceMappingURL=main.0d7f2bc1.chunk.js.map