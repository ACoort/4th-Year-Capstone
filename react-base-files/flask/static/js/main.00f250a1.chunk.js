(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n(70)},38:function(e,t,n){},40:function(e,t,n){},67:function(e,t){},70:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(32),c=n.n(o),i=(n(38),n(3)),u=n(4),s=n(6),l=n(5),m=n(7),p=(n(40),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(l.a)(t).call(this,e))).submitForm=function(e){e.preventDefault(),console.log("Form Submitted")},n.inputChange=function(e){n.props.updateUsername(e.target.value)},n.textUsername=r.a.createRef(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:this.submitForm},r.a.createElement("input",{type:"text",name:"username",onChange:function(t){return e.inputChange(t)}}),r.a.createElement("input",{type:"text",name:"password"}),r.a.createElement("button",null,"Submit"))}}]),t}(r.a.Component)),h=n(18),f=n.n(h),d=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={endpoint:"localhost:5000"},n.send=function(){f()(n.state.endpoint).emit("connect")},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return f()(this.state.endpoint).on("create",function(e){console.log(e)}),r.a.createElement("div",null,r.a.createElement("h1",null,"Server Response"),r.a.createElement("h2",null,this.props.username),r.a.createElement("button",{onClick:function(){return e.send()}},"CONNECT TO FLASK"))}}]),t}(r.a.Component),b=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:""},n.updateUsername=function(e){n.setState({username:e})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(p,{updateUsername:this.updateUsername}),r.a.createElement(d,{username:this.state.username}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,2,1]]]);
//# sourceMappingURL=main.00f250a1.chunk.js.map