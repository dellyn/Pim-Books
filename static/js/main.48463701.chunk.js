(this["webpackJsonppim-books"]=this["webpackJsonppim-books"]||[]).push([[0],{24:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),i=n.n(s),a=n(17),r=n.n(a),o=n(4),l=n(11),j=n(2),u=(n(24),n(8)),b=n.n(u),d=n(12),h="https://www.googleapis.com/books/v1/volumes",O="AIzaSyCk0s2_fiQKK0hX5PB6pYk8srDqOO6-3Ds",m=function(){var e=Object(d.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if((n=e.sent).ok){e.next=5;break}throw new Error("Could not fetch ".concat(t," +, re\u0441eived ").concat(n.status));case 5:return e.next=7,n.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(d.a)(b.a.mark((function e(t){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(h,"/").concat(t),e.next=3,m(n);case 3:return c=e.sent,e.abrupt("return",N(c));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(d.a)(b.a.mark((function e(t,n){var c,s,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c="&startIndex=0&maxResults=".concat(n,"&"),s=v(h,"?q=",t,c,O),e.next=4,m(s);case 4:return i=e.sent,e.abrupt("return",i.items.map(g));case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(d.a)(b.a.mark((function e(t){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"&startIndex=0&maxResults=8&",n=v(h,"?q=",t,"&startIndex=0&maxResults=8&",O),e.next=4,m(n);case 4:return c=e.sent,e.abrupt("return",c.items.map(k));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce((function(e,t){return e+t}))},k=function(e){var t=e.volumeInfo;return{id:e.id,title:t.title,infoLink:t&&t.infoLink||null}},g=function(e){var t=e.volumeInfo,n=e.id,c=t.imageLinks;return{id:n,title:t.title,infoLink:t&&t.infoLink||null,imageLink:c&&c.thumbnail||null}},N=function(e){var t=e||null,n=t.volumeInfo,c=t.id,s=n.title,i=n.description,a=n.publisher,r=n.infoLink,o=n.authors;return{title:s||"Unknown",publisher:a||"Unknown",description:i||"See more info by link",infoLink:r||"",publishedDate:n.publishedDate||"Unknown",pageCount:n.printedPageCount||"Unknown",categories:n.categories||["Unknown"],authors:o||["Unknown"],language:n.language||"Unknown",imageLink:"https://books.google.com/books/content/images/frontcover/".concat(c,"?fife=w400-h600")||null}},w=(n(26),function(e){return Object(c.jsx)("div",{className:"preloader",children:Object(c.jsx)("div",{className:"loadingio-spinner-eclipse-jj1coo66vk",children:Object(c.jsx)("div",{className:"ldio-27z186wqjt5",children:Object(c.jsx)("div",{})})})})}),_=(n(27),n.p+"static/media/book-cover.ea339476.jpg"),S=function(e){var t=Object(s.useState)(10),n=Object(o.a)(t,1)[0],i=Object(s.useState)(!1),a=Object(o.a)(i,2),r=a[0],j=a[1],u=Object(s.useState)([]),b=Object(o.a)(u,2),d=b[0],h=b[1],O=Object(s.useState)(""),m=Object(o.a)(O,2),f=m[0],v=m[1],k=Object(s.useState)(),g=Object(o.a)(k,2),N=g[0],S=g[1],y=Object(s.useState)(!1),I=Object(o.a)(y,2),L=I[0],B=I[1],C=Object(s.useState)(n),D=Object(o.a)(C,2),P=D[0],U=D[1],A=Object(s.useState)([]),E=Object(o.a)(A,2),q=E[0],R=E[1],T=Object(s.useState)(!1),z=Object(o.a)(T,2),J=z[0],K=z[1],M=Object(s.useState)(""),Q=Object(o.a)(M,2),F=Q[0],H=Q[1],X=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:P;e(f,n).then((function(e){j(!1),t(e),B(!1),K(!1)})).catch((function(){j(!1),B(!0),K(!1),R([])}))};Object(s.useEffect)((function(){if(B(!1),f.trim()){var e=setTimeout((function(){X(x,R)}),500);return S(e),function(){clearTimeout(e)}}R([])}),[f]),Object(s.useEffect)((function(){H(f)}),[d]);var Y=function(){if(P>=n&&P<=30){var e=P+n;U(e),K(!0),X(p,h,e)}},G=function(e,t){if(e.length>t){var n=0;return e.trim().split(" ").filter((function(e){return(n+=e.length)<=t&&" "+e})).join(" ")+".."}return e},V=d.map((function(t,n){var s=t.title,i=t.imageLink,a=t.id,r=G(s,20);return Object(c.jsx)("li",{className:"result_list-item",onClick:function(){return e.openBookDetails(a)},children:Object(c.jsxs)(l.b,{to:"/pim-book/book/"+a,children:[Object(c.jsx)("img",{src:i||_}),Object(c.jsx)("p",{children:r})]})},n)})),W=q.map((function(t,n){var s=t.id,i=G(t.title,40);return Object(c.jsx)("li",{onClick:function(){return e.openBookDetails(s)},className:"live_list-item",children:Object(c.jsxs)(l.b,{to:"/pim-book/book/"+s,children:[Object(c.jsx)("img",{src:"https://www.flaticon.com/svg/static/icons/svg/482/482631.svg",className:"live_icon",alt:"icon"}),i]})},n)})),Z=function(){var e=d.length;return!J&&e<40&&!r&&e===P?Object(c.jsx)("button",{onClick:Y,className:"more-books_btn",children:"Show more books"}):J?Object(c.jsx)(w,{}):null},$=function(){return Object(c.jsxs)("li",{className:"live_list-item results-not-found",children:[Object(c.jsx)("img",{src:"https://www.flaticon.com/svg/static/icons/svg/482/482631.svg",className:"live_icon",alt:"icon"}),'No books were found for "',Object(c.jsx)("b",{children:f}),'"']})},ee=L&&f,te=0!==q.length||ee;return Object(c.jsx)("div",{className:"search",children:Object(c.jsxs)("div",{className:"container",children:[Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),f===F||L||(X(p,h,P),j(!0),R([]),clearTimeout(N))},className:te?"form_live form":"form",children:[Object(c.jsxs)("div",{className:"labels",children:[Object(c.jsx)("input",{className:"labels_input",type:"text",onChange:function(e){var t=e.target.value;v(t)},value:f,placeholder:"Search",autoFocus:!0}),Object(c.jsx)("input",{className:"labels_button",type:"submit",value:"Search"})]}),Object(c.jsx)("ul",{className:"live_list",children:ee?Object(c.jsx)($,{}):W}),Object(c.jsx)("p",{className:"status",children:0!==d.length&&"Query result: '".concat(F,"'")})]}),Object(c.jsxs)("div",{className:"result",children:[Object(c.jsx)("ul",{className:"result_list",children:r?Object(c.jsx)(w,{}):V}),Object(c.jsx)("div",{className:"more-books",children:Object(c.jsx)(Z,{})})]})]})})},y=(n(36),function(e){var t=Object(s.useState)(null),n=Object(o.a)(t,2),i=n[0],a=n[1],r=Object(s.useState)(!1),l=Object(o.a)(r,2),j=l[0],u=l[1],b=e.activeBookId;b&&localStorage.setItem("activeBookId",b);var d=localStorage.getItem("activeBookId");if(Object(s.useEffect)((function(){var e=b||d;e&&f(e).then((function(e){a(e)}))}),[b]),!i)return Object(c.jsx)("div",{className:"center",children:Object(c.jsx)(w,{})});var h=i.title,O=i.publisher,m=i.description,p=i.infoLink,x=i.publishedDate,v=i.pageCount,k=i.categories,g=i.authors,N=i.language,_=i.imageLink,S=function(e){return e.map((function(e,t){return Object(c.jsx)("span",{children:e},t)}))};return Object(c.jsx)("div",{className:"book-details",children:Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("div",{className:"cover",children:Object(c.jsx)("div",{className:"cover_block"})}),Object(c.jsxs)("div",{className:"book",children:[Object(c.jsxs)("div",{className:"preview",children:[Object(c.jsx)("img",{src:_,alt:"book",className:"preview_img"}),Object(c.jsx)("a",{href:p,className:"preview_link button-styles",children:"Learn More"})]}),Object(c.jsxs)("div",{className:"info",children:[Object(c.jsx)("h2",{className:"info_title",children:h}),Object(c.jsx)("div",{className:"info_authors",children:Object(c.jsx)("p",{children:S(g)})}),Object(c.jsxs)("div",{className:"description",children:[Object(c.jsx)("span",{className:"key",children:"About Book:"})," ",Object(c.jsx)("p",{children:function(e){var t=e.replaceAll(/(\<(\/?[^>]+)>)/g," ");return t.length<225||j?t:t.slice(0,225)+".."}(m)}),!j&&m.length>225&&Object(c.jsxs)("div",{className:"description_wrapper",children:[Object(c.jsx)("i",{className:"arrow down"}),Object(c.jsx)("button",{onClick:function(){return u(!0)},children:"Show All"})]})]}),Object(c.jsxs)("ul",{className:"list",children:[Object(c.jsxs)("li",{className:"list_categories",children:[Object(c.jsx)("span",{className:"list_key",children:"Categories:"}),S(k)]}),Object(c.jsxs)("li",{children:[Object(c.jsx)("span",{className:"list_key",children:"Publish Date:"}),Object(c.jsx)("span",{children:x})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)("span",{className:"list_key",children:"Print Page:"}),Object(c.jsx)("span",{children:v})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)("span",{className:"list_key",children:"Publisher:"}),Object(c.jsx)("span",{children:O})]}),Object(c.jsxs)("li",{children:[Object(c.jsx)("span",{className:"list_key",children:"Language:"}),Object(c.jsx)("span",{children:N})]})]})]})]})]})})}),I=(n(37),function(){return Object(c.jsxs)("div",{className:"center",children:[Object(c.jsxs)("div",{className:"page-not-found",children:[Object(c.jsx)("div",{className:"error",children:"404"}),Object(c.jsx)("div",{className:"title",children:"Page not found"})]}),Object(c.jsx)("a",{href:"http://localhost:3000/pim-book",className:"redirect button-styles",children:"Home Page"})]})}),L=function(){var e=Object(s.useState)(null),t=Object(o.a)(e,2),n=t[0],i=t[1];return Object(c.jsx)(l.a,{children:Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)(j.c,{children:[Object(c.jsxs)(j.a,{path:"/pim-book/",exact:!0,children:[Object(c.jsxs)("h1",{className:"logo",children:["Pim",Object(c.jsx)("span",{children:"Book"})]}),Object(c.jsx)(S,{openBookDetails:function(e){console.log(e),i(e)}})]}),Object(c.jsx)(j.a,{path:"/pim-book/book/:id",children:Object(c.jsx)(y,{activeBookId:n})}),Object(c.jsx)(j.a,{children:Object(c.jsx)(I,{})})]})})})};r.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(L,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.48463701.chunk.js.map