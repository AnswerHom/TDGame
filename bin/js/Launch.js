var Browser = Laya.Browser;
var Stage = Laya.Stage;
var LEvent = Laya.Event;
var EventDispatcher = Laya.EventDispatcher;
var LImage = Laya.Image;
var Box = Laya.Box;
var Dictionary = Laya.Dictionary;
var Sprite = Laya.Sprite;
var Point = Laya.Point;
var Texture = Laya.Texture;
var List = Laya.List;
var Graphics = Laya.Graphics;
var Loader = Laya.Loader;
var Handler = Laya.Handler;
var Label = Laya.Label;
var Page = td.gui.base.Page;
var Path = td.Path;
var UIRoot = td.UIRoot;
var PageDef = tb.gui.page.PageDef;
var BlackBorder = td.BlackBorder;
var StringU = td.utils.StringU;
var ObjectPools = td.utils.ObjectPools;
var onIPhoneX = false;
var isDebug = true;
var Launch = /** @class */ (function () {
    function Launch() {
        // 浏览器可视高宽（在设备上的像素高宽）
        this._designWidth = 0;
        this._designHeight = 0;
        // 客户端画布缩放比
        this._clientScale = 1;
        this._showStat = false;
        // 程序集合
        this._apps = [];
        // 浏览器可视原始高宽
        this._browserClientWidth = 0;
        this._browserClientHeight = 0;
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        // 初始化舞台
        Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        // 是否IPhoneX
        if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
            onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
        }
        // 抗锯齿
        Config.isAntialias = true;
        //开启使用WorkerLoader来加载解码图片的功能
        Laya.WorkerLoader.enable = true;
        //调试面板
        this.showStat = true;
        Laya.loader.maxLoader = 3;
        Laya.loader.retryNum = 3;
        Laya.loader.retryDelay = 3000;
        Loader.maxTimeOut = 15000;
        Loader.typeMap["data"] = Loader.BUFFER;
        Loader.typeMap["bin"] = Loader.BUFFER;
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置横竖屏
        Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
        // 监听窗口大小变化
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);
        //主心跳
        Laya.stage.frameLoop(1, this, this.onUpdate);
        this.initGame();
    }
    Object.defineProperty(Launch.prototype, "showStat", {
        get: function () {
            return this._showStat;
        },
        set: function (v) {
            this._showStat = v;
            this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
        },
        enumerable: true,
        configurable: true
    });
    // 心跳更新
    Launch.prototype.onUpdate = function () {
        var timer = Laya.timer.currTimer;
        var diff = timer - this._prevUpdateTimer;
        // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
        this._prevUpdateTimer = timer;
        if (!diff) {
            return;
        }
        // 这样做才能防止白边
        this.checkClientSize();
        // 更新设计分辨率
        // Laya.stage.designWidth = this._designWidth;
        if (Laya.stage.width != this._designWidth)
            Laya.stage.width = this._designWidth;
        // Laya.stage.designHeight = this._designHeight;
        if (Laya.stage.height != this._designHeight)
            Laya.stage.height = this._designHeight;
        // 心跳
        for (var _i = 0, _a = this._apps; _i < _a.length; _i++) {
            var app = _a[_i];
            app.onUpdate(diff);
        }
        // 对象池
        ObjectPools.update(diff);
    };
    Launch.prototype.initGame = function () {
        var app = new GameApp();
        app.pageVisibility = "***";
        //打开加载界面
        app.uiRoot.general.open(PageDef.LOAD);
        this._apps.push(app);
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);
        this.onResize();
    };
    // 游戏窗口尺寸发生变化
    Launch.prototype.onResize = function () {
        console.log('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio);
        console.log('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio);
        console.log('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.deviceXDPI, screen.deviceYDPI, screen.pixelDepth);
        console.log('onIPhoneX', onIPhoneX);
        this.checkClientSize();
        var clientScale = this._clientScale;
        var clientWidth = this._clientWidth;
        var clientHeight = this._clientHeight;
        for (var _i = 0, _a = this._apps; _i < _a.length; _i++) {
            var app = _a[_i];
            app.onResize(clientWidth, clientHeight, clientScale);
        }
    };
    // 校验浏览器可视屏幕像素
    Launch.prototype.checkClientSize = function () {
        var browser_clientWidth = Browser.clientWidth;
        var browser_clientHeight = Browser.clientHeight;
        if (!Browser.onPC && this._prevBrowserClientWidth) {
            if ((browser_clientWidth == this._prevBrowserClientWidth
                && browser_clientHeight != this._prevBrowserClientHeight)
                || (browser_clientHeight == this._prevBrowserClientHeight
                    && browser_clientWidth != this._prevBrowserClientWidth)) {
                return;
            }
        }
        var __width = browser_clientWidth;
        var __height = browser_clientHeight;
        switch (Laya.stage.screenMode) {
            case Stage.SCREEN_VERTICAL:
                browser_clientHeight = Math.max(__width, __height);
                browser_clientWidth = Math.min(__width, __height);
                break;
            case Stage.SCREEN_HORIZONTAL:
                browser_clientHeight = Math.min(__width, __height);
                browser_clientWidth = Math.max(__width, __height);
                break;
        }
        if (this._browserClientWidth == browser_clientWidth && this._browserClientHeight == browser_clientHeight) {
            return;
        }
        this._browserClientWidth = browser_clientWidth;
        this._browserClientHeight = browser_clientHeight;
        this._prevBrowserClientWidth = browser_clientWidth;
        this._prevBrowserClientHeight = browser_clientHeight;
        this._designWidth = this._browserClientWidth * Browser.pixelRatio;
        this._designHeight = this._browserClientHeight * Browser.pixelRatio;
        var wScale = this._designWidth / Launch.widthDesginPixelw;
        var hScale = this._designHeight / Launch.heightDesginPixelw;
        this._clientScale = Math.min(wScale, hScale);
        if (wScale > hScale) {
            this._clientWidth = Launch.heightDesginPixelw * (this._designWidth / this._designHeight);
            this._clientHeight = Launch.heightDesginPixelw;
        }
        else {
            this._clientWidth = Launch.widthDesginPixelw;
            this._clientHeight = Launch.widthDesginPixelw * (this._designHeight / this._designWidth);
        }
    };
    // 美术设计画布像素高宽
    Launch.widthDesginPixelw = 1280;
    Launch.heightDesginPixelw = 720;
    return Launch;
}());
new Launch();
//# sourceMappingURL=Launch.js.map