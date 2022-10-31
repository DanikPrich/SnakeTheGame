(function(){"use strict";var e={7655:function(e,t,n){n.r(t),n.d(t,{default:function(){return G}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"game"},[t("keyboard-events",{on:{keyup:e.keyboardEvent}}),t("game-field"),t("button",{on:{click:e.startGame}},[e._v("Start")]),t("button",{on:{click:e.refreshGame}},[e._v(" Refresh ")]),t("span",{directives:[{name:"show",rawName:"v-show",value:e.$gameOver,expression:"$gameOver"}],staticClass:"game__over"},[e._v("GAME OVER!")])],1)},r=[],i=n(3822),o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"game__field"},e._l(e.$field,(function(n){return t("div",{staticClass:"game__line"},e._l(n,(function(e){return t("div",{staticClass:"game__block",class:{"game__block-head":0==e,"game__block-body":1==e,"game__block-food":2==e}})})),0)})),0)},s=[],c={data(){return{}},computed:{...(0,i.rn)("snakeGame",{$field:"field"})}},d=c,l=n(1001),h=(0,l.Z)(d,o,s,!1,null,"73eee1c4",null),u=h.exports,f=function(){var e=this,t=e._self._c;return t("div")},m=[],v={created(){const e=this;this.handler=function(t){e.$emit("keyup",t)},window.addEventListener("keyup",this.handler)},beforeDestroy(){window.removeEventListener("keyup",this.handler)}},g=v,p=(0,l.Z)(g,f,m,!1,null,"6abe5cb4",null),b=p.exports,k={name:"SnakeGame",data(){return{interval:null}},components:{gameField:u,keyboardEvents:b},watch:{$gameOver(e,t){1==e&&clearInterval(this.interval)}},computed:{...(0,i.rn)("snakeGame",{$field:"field",$head:"head",$gameActive:"gameActive",$gameOver:"gameOver"})},methods:{...(0,i.nv)({gameInit:"snakeGame/gameInit",gameTick:"snakeGame/gameTick"}),...(0,i.OI)({changeXHead:"snakeGame/changeXHead",changeDirection:"snakeGame/changeDirection",setGameActive:"snakeGame/setGameActive"}),startGame(){this.$gameActive||(this.setGameActive(!0),this.interval=setInterval((()=>{this.gameTick()}),300))},refreshGame(){clearInterval(this.interval),this.gameInit()},keyboardEvent(e){switch(e.code){case"ArrowUp":this.changeDirection(0);break;case"ArrowRight":this.changeDirection(1);break;case"ArrowDown":this.changeDirection(2);break;case"ArrowLeft":this.changeDirection(3);break}}},mounted(){this.gameInit()}},_=k,O=(0,l.Z)(_,a,r,!1,null,"79becb79",null),G=O.exports},1652:function(e,t,n){var a=n(6369),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],o=n(1001),s={},c=(0,o.Z)(s,r,i,!1,null,null,null),d=c.exports,l=n(2631);n(7655);a.ZP.use(l.ZP);const h=[{path:"/",name:"snake",component:()=>Promise.resolve().then(n.bind(n,7655))}],u=new l.ZP({mode:"history",base:"/SnakeTheGame/",routes:h});var f=u,m=n(3822),v={namespaced:!0,state:{field:[],fieldLength:15,head:[0,0],direction:0,gameOver:!1,gameActive:!1,foodPos:[]},mutations:{setField(e,t){e.field=t},changeHead(e,t){e.head=t},changeYHead(e,t){a.ZP.set(e.head,0,t)},changeXHead(e,t){a.ZP.set(e.head,1,t)},changeDirection(e,t){e.direction=t},setGameOver(e,t){e.gameOver=t},setGameActive(e,t){e.gameActive=t},setFoodPosition(e,t){e.foodPos=t}},getters:{},actions:{refreshField({commit:e,state:t}){let n=Array(t.fieldLength).fill().map((()=>Array(t.fieldLength)));for(let a=0;a<t.fieldLength;a++)for(let e=0;e<t.fieldLength;e++)n[a][e]=null;return n},gameInit({commit:e,state:t,dispatch:n}){e("setGameOver",!1),e("setGameActive",!1),n("refreshField").then((a=>{e("changeHead",[Math.floor(t.fieldLength/2),Math.floor(t.fieldLength/2)]),a[t.head[0]][t.head[1]]=0,e("setField",a),n("setRandomFoodPosition")}))},gameTick({commit:e,state:t,dispatch:n,getters:a}){n("refreshField").then((a=>{if(t.gameOver)e("setGameActive",!1);else{switch(e("setGameActive",!0),t.direction){case 0:t.head[0]-1>=0?e("changeYHead",t.head[0]-1):e("setGameOver",!0);break;case 1:t.head[1]+1<t.fieldLength?e("changeXHead",t.head[1]+1):e("setGameOver",!0);break;case 2:t.head[0]+1<t.fieldLength?e("changeYHead",t.head[0]+1):e("setGameOver",!0);break;case 3:t.head[1]-1>=0?e("changeXHead",t.head[1]-1):e("setGameOver",!0);break}a[t.foodPos[0]][t.foodPos[1]]=2,a[t.head[0]][t.head[1]]=0,t.foodPos[0]===t.head[0]&&t.foodPos[1]===t.head[1]&&(console.log("hit"),n("setRandomFoodPosition")),e("setField",a)}}))},setRandomFoodPosition({state:e,commit:t}){t("setFoodPosition",[Math.floor(Math.random()*(e.fieldLength-1)),Math.floor(Math.random()*(e.fieldLength-1))])}}};a.ZP.use(m.ZP);var g=new m.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{snakeGame:v}});a.ZP.config.productionTip=!1,new a.ZP({router:f,store:g,render:e=>e(d)}).$mount("#app")}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,a,r,i){if(!a){var o=1/0;for(l=0;l<e.length;l++){a=e[l][0],r=e[l][1],i=e[l][2];for(var s=!0,c=0;c<a.length;c++)(!1&i||o>=i)&&Object.keys(n.O).every((function(e){return n.O[e](a[c])}))?a.splice(c--,1):(s=!1,i<o&&(o=i));if(s){e.splice(l--,1);var d=r();void 0!==d&&(t=d)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[a,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,i,o=a[0],s=a[1],c=a[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(c)var l=c(n)}for(t&&t(a);d<o.length;d++)i=o[d],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},a=self["webpackChunkproject"]=self["webpackChunkproject"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(1652)}));a=n.O(a)})();
//# sourceMappingURL=app.cd9340a2.js.map