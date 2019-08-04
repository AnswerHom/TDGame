var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* UI
*/
var td;
(function (td) {
    var UIRoot = /** @class */ (function (_super) {
        __extends(UIRoot, _super);
        function UIRoot(app) {
            var _this = _super.call(this, app) || this;
            _this._mouseLock = false;
            _this._needAssetReady = false;
            _this._needSceneReady = false;
            PageDef.init();
            // 顶层ui
            _this._topUI = new td.gui.TopUI(app);
            // 一般UI层
            _this._generalUI = new td.gui.GeneralUI(app);
            // HUD层
            _this._HUD = new td.gui.HUD(app);
            _this.addChild(_this._HUD);
            _this.addChild(_this._generalUI);
            _this.addChild(_this._topUI);
            return _this;
        }
        Object.defineProperty(UIRoot.prototype, "top", {
            get: function () {
                return this._topUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "general", {
            get: function () {
                return this._generalUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "HUD", {
            get: function () {
                return this._HUD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "mouseLock", {
            set: function (v) {
                this._mouseLock = v;
            },
            enumerable: true,
            configurable: true
        });
        UIRoot.prototype.loadingWithoutLogin = function () {
            Laya.loader.load([], Handler.create(this, this.onNeedAssetLoaded));
        };
        UIRoot.prototype.onNeedAssetLoaded = function () {
            this._needAssetReady = true;
            this.checkReady();
        };
        UIRoot.prototype.checkReady = function () {
            if (this._needAssetReady && this._needSceneReady) {
                //可以进游戏了
                console.log("进入游戏了，打开hud界面");
                this.event(UIRoot.INIT);
            }
        };
        UIRoot.prototype.onAssetLoadedComplete = function () {
            // DisplayU.initMask();
        };
        /**
         * 打开某界面
         * @param pageid 界面id
         * @param page_type 界面类型 0二级 1顶层 2HUD
         */
        UIRoot.prototype.onOpenPanel = function (pageid, container) {
            container.open(pageid);
        };
        /**
         * 关闭某界面
         * @param pageid 界面id
         * @param page_type 界面类型 0二级 1顶层 2HUD
         */
        UIRoot.prototype.onClosePanel = function (pageid, container) {
            if (pageid == 0) {
                container.closeAll();
            }
            else {
                container.close(pageid);
            }
        };
        /**
         * 是否开启状态
         * @param page_id
         * @return
         *
         */
        UIRoot.prototype.isOpened = function (page_id) {
            return this._generalUI.isOpened(page_id);
        };
        //进入游戏了
        UIRoot.prototype.enterGame = function () {
        };
        UIRoot.prototype.resize = function (w, h) {
            this._clientWidth = w;
            this._clientHeight = h;
            this._topUI.resize(w, h);
            this._generalUI.resize(w, h);
            this._HUD.resize(w, h);
        };
        UIRoot.prototype.onKeyDown = function (e) {
        };
        UIRoot.prototype.update = function (diff) {
        };
        /*按下Enter键后*/
        UIRoot.prototype.onKeyEnter = function () {
            !this._topUI.enter() && this._generalUI.enter();
        };
        /*按下Esc键后*/
        UIRoot.prototype.onKeyESC = function () {
            !this._topUI.cancel() && this._generalUI.cancel();
        };
        //UI模式
        UIRoot.MODE_PC = 0; //PC模式
        UIRoot.MODE_HORIZONTAL = 1; //横屏模式
        UIRoot.MODE_VERTICAL = 2; //竖屏模式
        //热键枚举
        UIRoot.KEYCODE_A = 65; //A键
        UIRoot.KEYCODE_Q = 81; //Q键
        UIRoot.KEYCODE_Z = 90; //Z键
        UIRoot.KEYCODE_V = 86; //V键
        UIRoot.KEYCODE_ESC = 27; //eac键
        UIRoot.KEYCODE_M = 77; //M键
        UIRoot.KEYCODE_SPAPCE = 32; //Space键
        UIRoot.KEYCODE_TAB = 9; //Tab键
        UIRoot.KEYCODE_ENTER = 13; //enter键
        UIRoot.KEYCODE_UP = 38; //↑
        UIRoot.KEYCODE_DOWN = 40; //↓
        UIRoot.KEYCODE_LEFT = 37; //←
        UIRoot.KEYCODE_RIGHT = 39; //→
        // 初始化事件
        UIRoot.INIT = 'init';
        return UIRoot;
    }(td.gui.base.Container));
    td.UIRoot = UIRoot;
})(td || (td = {}));
//# sourceMappingURL=UIRoot.js.map