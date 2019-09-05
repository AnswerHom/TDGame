/*
* name
*/
// 是否iphoneX
var onIPhoneX = false;
var GameApp = (function () {
    function GameApp() {
        this.isNoLogin = false;
        this.mutedMusic = false;
        this.mutedSound = false;
        this.delayTime = 0;
        this.pageVisibility = '';
        //下次更新开放域
        this._nextUpdateOpenZoneTime = 0;
        this._clientX = 0;
        this._clientY = 0;
        // 客户端画布缩放比
        this._clientScale = 1;
        var url = location.href;
        this.isNoLogin = true;
        // 初始化场景
        this._sceneRoot = new SceneRoot(this);
        Laya.stage.addChild(this._sceneRoot);
        // 初始化ui
        this._uiRoot = new UIRoot(this);
        Laya.stage.addChild(this._uiRoot);
        // 黑色边框
        this._blackBorder = new BlackBorder(this);
        Laya.stage.addChild(this._blackBorder);
        Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_OUT, this, this.onMouseHandler);
        Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseHandler);
        //通过消息透传通知开发数据域sharedCanvas的尺寸大小，以及缩放比例信息
        //正式环境
        this._date = new Date();
    }
    Object.defineProperty(GameApp.prototype, "clientX", {
        get: function () {
            return this._clientX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "clientY", {
        get: function () {
            return this._clientY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "uiRoot", {
        get: function () {
            return this._uiRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "sceneRoot", {
        get: function () {
            return this._sceneRoot;
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.onMouseHandler = function (e) {
    };
    // 心跳更新
    GameApp.prototype.onUpdate = function (diff) {
        this._uiRoot && this._uiRoot.update(diff);
        this._sceneRoot && this._sceneRoot.update(diff);
    };
    /**
     * 根据时间戳获取本周一日期
     * @param value 时间戳毫秒
     * @return 2018419
     */
    GameApp.prototype.getWeekOneDayByTime = function (value) {
        if (!value)
            return 0;
        this._date.setTime(value);
        // //当日时间毫秒
        // let dayTime:number = this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
        //获取当前星期几 0-6(星期天-星期六)
        var week = this._date.getDay();
        if (week == 0)
            week = 7;
        var time = value - (week - 1) * 86400000;
        if (time > 0)
            this._date.setTime(time);
        //获取当前年月日
        var year = this._date.getFullYear();
        var mounth = this._date.getMonth();
        var day = this._date.getDate();
        var str = year.toString() + mounth.toString() + day.toString();
        return parseInt(str);
    };
    Object.defineProperty(GameApp.prototype, "clientScale", {
        get: function () {
            return this._clientScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "clientWidth", {
        get: function () {
            return this._clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "clientHeight", {
        get: function () {
            return this._clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "mouseLock", {
        set: function (v) {
            this._uiRoot && (this._uiRoot.mouseLock = v);
        },
        enumerable: true,
        configurable: true
    });
    // 游戏窗口尺寸发生变化
    GameApp.prototype.onResize = function (width, height, clientScale) {
        this._clientWidth = width;
        this._clientHeight = height;
        this._clientScale = clientScale;
        var x = 0, y = 0;
        //判断IPhoneX
        if (onIPhoneX) {
            //Iphone X 安全区域距离顶部
            var IPHONEX_TOP = 44 / 812;
            //Iphone X 安全区域距离底部
            var IPHONEX_BOTTOM = 34 / 812;
            if (Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL) {
                //正横屏 
                width = width * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                // x偏移
                x = width * IPHONEX_TOP * clientScale;
            }
            else if (Laya.stage.screenMode == Stage.SCREEN_VERTICAL) {
                // 竖屏
                height = height * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                // y偏移
                y = height * IPHONEX_TOP * clientScale;
            }
            else {
                if (window.orientation == 0) {
                    // 竖屏
                    height = height * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                    // y偏移
                    y = height * IPHONEX_TOP * clientScale;
                }
                else if (window.orientation == 90) {
                    //正横屏 
                    width = width * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                    // x偏移
                    x = width * IPHONEX_TOP * clientScale;
                }
                else if (window.orientation == -90) {
                    //反横屏
                    width = width * (1 - IPHONEX_TOP - IPHONEX_BOTTOM);
                    // x偏移
                    x = width * IPHONEX_BOTTOM * clientScale;
                }
            }
        }
        if (this._uiRoot) {
            this._uiRoot.x = x;
            this._uiRoot.y = y;
            this._uiRoot.scale(clientScale, clientScale);
            this._uiRoot.resize(width, height);
            this._uiRoot.graphics.clear();
            x = x / clientScale;
            y = y / clientScale;
            this._uiRoot.graphics.drawRect(-x, -y, this._clientWidth, y, '#00000');
            this._uiRoot.graphics.drawRect(-x, height, this._clientWidth, this._clientHeight - y - height, '#00000');
            this._uiRoot.graphics.drawRect(-x, 0, x, height, '#00000');
            this._uiRoot.graphics.drawRect(width, 0, this._clientWidth - x - width, height, '#00000');
        }
        this._blackBorder && this._blackBorder.scale(clientScale, clientScale);
        this._blackBorder && this._blackBorder.resize(width, height);
    };
    return GameApp;
}());
//# sourceMappingURL=GameApp.js.map