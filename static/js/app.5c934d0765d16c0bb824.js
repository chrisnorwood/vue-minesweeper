webpackJsonp([1,0],[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var s=n(16),r=i(s),a=n(10),o=i(a);n(5),new r.default({el:"#app",template:"<App/>",components:{App:o.default}})},,function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=n(11),r=i(s),a=n(12),o=i(a);e.default={data:function(){return{difficulty:2,tiles:[],gameStart:0,elapsedTime:0,windowTimer:null,displayGame:!0,gameOver:!1,firstPlay:!0}},name:"app",components:{mineGame:o.default,appHeader:r.default},computed:{rows:function(){var t={1:8,2:12,3:15};return t[this.difficulty]},columns:function(){var t={1:10,2:15,3:20};return t[this.difficulty]},timer:function(){var t=Math.floor(this.elapsedTime/1e3),e=Math.floor(t/60),n=t-60*e;return 1==e.toString().length&&(e="0"+e),1==n.toString().length&&(n="0"+n),e+":"+n}},methods:{newGame:function(){this.firstPlay=!1,this.gameOver=!1,this.initTiles(),this.startTimer()},endGame:function(){clearInterval(this.windowTimer),this.windowTimer=null,this.gameOver=!0},setDiff:function(t){this.difficulty=t,this.newGame()},mineProbability:function(){var t={1:[10,9],2:[8,7],3:[6,5]},e=t[this.difficulty][0],n=t[this.difficulty][1];return Math.random()*e>n},initTiles:function(){var t=this;this.tiles=new Array(this.rows).fill(0).map(function(e,n){return new Array(t.columns).fill(0).map(function(e,i){return{row:n,column:i,classes:[],flagged:!1,mined:t.mineProbability()}})})},startTimer:function(){var t=this;this.gameStart=(new Date).getTime(),this.windowTimer=setInterval(function(){t.elapsedTime=(new Date).getTime()-t.gameStart},1e3)}},created:function(){this.initTiles()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["gameOver","timer","firstPlay","difficulty"],data:function(){return{settings:!1}},methods:{newGame:function(){this.$emit("newGame")},setDiff:function(t){this.toggleSettings(),this.$emit("setDiff",t)},thisDiffIs:function(t){return this.difficulty===t},toggleSettings:function(){this.settings=!this.settings}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["rows","columns","tiles","gameOver","firstPlay"],data:function(){return{gameWon:!1}},methods:{openAllMines:function(){this.tiles.forEach(function(t){t.forEach(function(t){t.mined&&t.classes.push("mined")})})},checkWin:function(){var t=this,e=!0;return this.tiles.forEach(function(n){n.forEach(function(n){t.isOpened(n)||n.mined||(e=!1)})}),e},isOpened:function(t){return!(t.classes.indexOf("opened")<0)},flagTile:function(t){t.flagged=!t.flagged},openTile:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.firstPlay)return void this.newGame();if(!this.isOpened(t)&&!this.gameOver){if(t.classes.indexOf("opened")<0&&t.classes.push("opened"),this.checkWin()&&(this.gameWon=!0,this.$emit("gameIsOver")),t.mined)return t.classes.push("mined"),this.$emit("gameIsOver"),void this.openAllMines();var i=this.collectNeighbors(t),s=this.countMines(i),r=!1;if(s>0){var a={1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight"};return void t.classes.push(a[s])}r=!0,r&&n&&i.forEach(function(t){var n=e;setTimeout(function(){n.openTile(t,!0)},2)})}},collectNeighbors:function(t){var e=this,n=[[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]],i=[];return n.forEach(function(n){var s=n[0],r=n[1],a=t.row+s,o=t.column+r;e.findTile(a,o)&&i.push(e.findTile(a,o))}),i},findTile:function(t,e){return t<this.rows&&t>=0&&e<this.columns&&e>=0&&this.tiles[t][e]},countMines:function(t){var e=0;return t.forEach(function(t){t.mined&&e++}),e},newGame:function(){this.gameWon=!1,this.$emit("newGame")}}}},function(t,e){},function(t,e){},,,,function(t,e,n){n(6);var i=n(1)(n(2),n(14),null,null);t.exports=i.exports},function(t,e,n){var i=n(1)(n(3),n(13),null,null);t.exports=i.exports},function(t,e,n){var i=n(1)(n(4),n(15),null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("nav",[t._m(0),t._v(" "),n("div",{staticClass:"info"},[t._v("(R-click to flag tile)")]),t._v(" "),n("div",{staticClass:"menu"},[n("ul",[n("li",[n("button",{staticClass:"timer"},[t._v(t._s(t.timer))])]),t._v(" "),n("li",[t.gameOver||t.firstPlay?n("button",{staticClass:"reset-button",on:{click:t.newGame}},[t._v("Start")]):n("button",{staticClass:"reset-button",on:{click:t.newGame}},[t._v("Reset")])]),t._v(" "),n("li",{staticClass:"dropdown-menu"},[n("button",{staticClass:"dropdown-toggle",on:{click:t.toggleSettings}},[t._v("\n                 \n            ")]),t._v(" "),n("transition",{attrs:{name:"fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.settings,expression:"settings"}],staticClass:"dropdown"},[n("button",{class:{selected:t.thisDiffIs(1)},on:{click:function(e){return t.setDiff(1)}}},[t._v("\n                  easy\n              ")]),t._v(" "),n("button",{class:{selected:t.thisDiffIs(2)},on:{click:function(e){return t.setDiff(2)}}},[t._v("\n                  normal\n              ")]),t._v(" "),n("button",{class:{selected:t.thisDiffIs(3)},on:{click:function(e){return t.setDiff(3)}}},[t._v("\n                  hard\n              ")])])])],1)])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"brand"},[n("h1",[t._v("Minesweeper")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("app-header",{attrs:{gameOver:t.gameOver,timer:t.timer,firstPlay:t.firstPlay,difficulty:t.difficulty},on:{newGame:t.newGame,setDiff:t.setDiff}}),t._v(" "),n("transition",{attrs:{name:"fade",mode:"out-in",appear:""}},[t.displayGame?n("mine-game",{attrs:{rows:t.rows,columns:t.columns,tiles:t.tiles,gameOver:t.gameOver,firstPlay:t.firstPlay},on:{gameIsOver:t.endGame,newGame:t.newGame}}):t._e()],1),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("p",[n("a",{attrs:{href:"http://chrisnorwood.io"}},[t._v("Chris Norwood")]),t._v(" "),n("a",{attrs:{href:"https://github.com/chrisnorwood/vue-minesweeper"}},[n("span",{staticClass:"github"})]),t._v("\n      2016 (Vue.js 2.0)\n    ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"game",attrs:{oncontextmenu:"return false;"}},[t._l(t.tiles,function(e){return n("div",{staticClass:"row"},t._l(e,function(e){return n("div",{staticClass:"tile",class:[e.classes,{flagged:e.flagged}],on:{click:function(n){return t.openTile(e,!0)},contextmenu:function(n){return t.flagTile(e)}}})}),0)}),t._v(" "),n("transition",{attrs:{name:"fade"}},[t.gameOver?n("section",{staticClass:"game-over"},[t.gameWon?n("span",[t._v("YOU WON!!")]):n("span",[t._v("GAME OVER")]),t._v(" "),n("button",{on:{click:t.newGame}},[t._v("Play Again")])]):t._e()])],2)},staticRenderFns:[]}}]);
//# sourceMappingURL=app.5c934d0765d16c0bb824.js.map