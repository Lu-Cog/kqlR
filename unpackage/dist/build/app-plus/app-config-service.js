
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/index/password","pages/index/memberBar","pages/index/logistics","pages/index/contract","pages/wallet/wallet","pages/order/order","pages/order/completeOrder","pages/order/receivingOrders","pages/order/arrival","pages/order/arrivalYy","pages/order/shopInfo","pages/order/orderDetails","pages/index/clause","pages/index/help","pages/wallet/account"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"我的","navigationBarBackgroundColor":"#FF9EC3","backgroundColor":"#F8F8F8"},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"kqlR","compilerVersion":"3.6.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/index/password","meta":{},"window":{"navigationBarTitleText":"密碼變更"}},{"path":"/pages/index/memberBar","meta":{},"window":{"navigationBarTitleText":"密碼變更","navigationStyle":"custom"}},{"path":"/pages/index/logistics","meta":{},"window":{"navigationBarTitleText":"物流手冊","enablePullDownRefresh":false}},{"path":"/pages/index/contract","meta":{},"window":{"navigationBarTitleText":"扛氣來的定型化契約","enablePullDownRefresh":false}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTitleText":"錢包","enablePullDownRefresh":false}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"訂單","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/order/completeOrder","meta":{},"window":{"navigationBarTitleText":"訂單詳情","enablePullDownRefresh":false}},{"path":"/pages/order/receivingOrders","meta":{},"window":{"navigationBarTitleText":"即時單","enablePullDownRefresh":false}},{"path":"/pages/order/arrival","meta":{},"window":{"navigationBarTitleText":"抵達配送","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/order/arrivalYy","meta":{},"window":{"navigationBarTitleText":"抵達配送","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/order/shopInfo","meta":{},"window":{"navigationBarTitleText":"瓦斯行","enablePullDownRefresh":false}},{"path":"/pages/order/orderDetails","meta":{},"window":{"navigationBarTitleText":"訂單詳情","enablePullDownRefresh":false}},{"path":"/pages/index/clause","meta":{},"window":{"navigationBarTitleText":"條款","enablePullDownRefresh":false}},{"path":"/pages/index/help","meta":{},"window":{"navigationBarTitleText":"幫助中心","enablePullDownRefresh":false}},{"path":"/pages/wallet/account","meta":{},"window":{"navigationBarTitleText":"帳號設定","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});