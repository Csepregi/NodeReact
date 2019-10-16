(window.webpackJsonpphonebookserverside=window.webpackJsonpphonebookserverside||[]).push([[0],{20:function(e,t,n){e.exports=n(43)},25:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),c=n.n(o),u=(n(25),n(14)),i=n(3),s=function(e){var t=e.searchName,n=e.handleSearch;return a.a.createElement("div",null,"search: ",a.a.createElement("input",{value:t,onChange:n}))},l=function(e){var t=e.name,n=e.number,r=e.onSubmit;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t.value,onChange:t.handleName})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:n.value,onChange:n.handleNumber})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},f=function(e){var t=e.persons,n=e.searchText,r=e.deletePerson;return a.a.createElement(a.a.Fragment,null,a.a.createElement("ul",null,t.filter((function(e){return e.name.toLowerCase().indexOf(n.toLowerCase())>-1})).map((function(e){return a.a.createElement("li",{key:e.name},e.name," ",e.number,a.a.createElement("button",{onClick:r(e.id,e.name)},"Delete"))}))))},m=n(2),d=n.n(m),b="/api/persons",h=function(){return d.a.get(b).then((function(e){return e.data}))},p=function(e){return d.a.post(b,e).then((function(e){return e.data}))},v=function(e,t){return console.log(e),d.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},E=function(e,t){return d.a.put("".concat(b,"/").concat(e),t).then((function(e){return e.data}))},O=n(15),g=n(16),j=n(18),y=n(17),w=n(19),k=function(e){var t=e.message,n=e.isError;return t?a.a.createElement("div",{style:{color:n?"red":"green",border:"0.2em solid currentColor",borderRadius:"0.3em",fontSize:"125%",padding:"0.3em 0.5em",backgroundColor:"white",margin:"0.5em 0.5em"}},t):null},S=function(e){function t(){var e,n;Object(O.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(j.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(a)))).lastNotificationId=0,n.state={messages:[]},n}return Object(w.a)(t,e),Object(g.a)(t,[{key:"addItem",value:function(e,t){var n=this,r=this.lastNotificationId++;this.setState((function(n){return{messages:n.messages.concat({id:r,text:e,isError:t})}})),setTimeout((function(){n.setState((function(e){return{messages:e.messages.filter((function(e){return e.id!==r}))}}))}),5e3)}},{key:"showMessage",value:function(e){this.addItem(e,!1)}},{key:"showError",value:function(e){this.addItem(e,!0)}},{key:"render",value:function(){var e=this.state.messages;return a.a.createElement("div",{style:{position:"fixed",top:0,left:0}},e.slice(-4).map((function(e){return a.a.createElement(k,{key:e.id,message:e.text,isError:e.isError})})))}}]),t}(a.a.Component);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var C=function(){var e=Object(r.useRef)(null),t=Object(r.useCallback)((function(t){return e.current.showError(t)}),[e]),n=Object(r.useState)([]),o=Object(i.a)(n,2),c=o[0],m=o[1],d=Object(r.useState)(""),b=Object(i.a)(d,2),O=b[0],g=b[1],j=Object(r.useState)(""),y=Object(i.a)(j,2),w=y[0],k=y[1],C=Object(r.useState)(""),x=Object(i.a)(C,2),D=x[0],N=x[1];Object(r.useEffect)((function(){h().then((function(e){m(e)}))}),[]);var I=function(){var e=c.find((function(e){return e.name===O}));if(!e)return!1;if(!window.confirm("".concat(O," is already in the phonebook.\nDo you want to update the number?")))return!1;var t=e.id;return E(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{number:w})).then((function(e){m(c.map((function(n){return n.id!==t?n:e}))),g(""),k("")})),!0};return a.a.createElement("div",null,a.a.createElement(S,{ref:e}),a.a.createElement("h2",null,"Phonebook"),a.a.createElement(s,{value:D,handleSearch:function(e){N(e.target.value)}}),a.a.createElement(l,{onSubmit:function(e){e.preventDefault();c.filter((function(e){return e.name===O}));if(!I()){var n={name:O,number:w};p(n).then((function(e){m(c.concat(n)),g(""),k("")})).catch((function(e){(function(e){return!(!e.isAxiosError||!e.response||400!==e.response.status)&&(t(e.response.data&&e.response.data.error||e.message),!0)})(e)||t("Failed to add ".concat(n.name,". ").concat(e))}))}},name:{value:O,handleName:function(e){g(e.target.value)}},number:{value:w,handleNumber:function(e){k(e.target.value)}}}),a.a.createElement(f,{persons:c,searchText:D,deletePerson:function(e,t){return function(){window.confirm("Delete ".concat(t))&&v(e,t).then((function(){m(c.filter((function(t){return t.id!==e})))}))}}}))};c.a.render(a.a.createElement(C,null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.64eb5fbb.chunk.js.map