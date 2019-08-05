var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* ui页面
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app) || this;
                    // 是否打开
                    _this.isOpened = false;
                    // 是否关闭中
                    _this._isCloseing = false;
                    /**是否播放开启、关闭界面音效 */
                    _this._isPlayOCSound = true;
                    /**是否启用模态窗 */
                    _this._isModal = true;
                    /**是否可以点击模态窗关闭界面 */
                    _this._isClickModalClose = false;
                    /**是否启用缓动大开效果*/
                    _this._isTweenOpen = true;
                    /**是否启用load*/
                    _this._isOpenLoad = true;
                    _this._blackColor = null;
                    _this._blackAlpha = 0.75;
                    _this._mouseThrough = true;
                    //是否已经释放UI计数
                    _this._isSubBgCount = false;
                    _this._onOpenFunc = onOpenFunc;
                    _this._onCloseFunc = onCloseFunc;
                    _this.mouseThrough = true;
                    return _this;
                }
                Object.defineProperty(Page.prototype, "dataSource", {
                    /**数据*/
                    get: function () {
                        return this._dataSource;
                    },
                    /**数据*/
                    set: function (v) {
                        this._dataSource = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Page.prototype, "view", {
                    get: function () {
                        return this._view;
                    },
                    enumerable: true,
                    configurable: true
                });
                Page.prototype.onLoaded = function () {
                    if (!this.isOpened)
                        return;
                    this.init();
                    this.layout();
                    this.onOpen();
                    if (this._view instanceof View) {
                        this._view.mouseThrough = this._mouseThrough;
                        this._view.cacheAs = "normal";
                        this._view.centerX = 0.5;
                        this._view.centerY = 0.5;
                    }
                    this.initCachas();
                    this.clearLoadEffect();
                };
                // 页面初始化函数
                Page.prototype.init = function () {
                };
                //设置cachas
                Page.prototype.initCachas = function () {
                };
                /**
                 * 绘制黑底
                 */
                Page.prototype.drawBlack = function (ap, color) {
                    if (ap === void 0) { ap = 0.75; }
                    if (color === void 0) { color = "#0"; }
                    if (!color || !color.length)
                        return;
                    console.log("ap,color", ap, color);
                    if (!this._blackSprite) {
                        this._blackColor = color;
                        this._blackAlpha = ap;
                        this._blackSprite = new Sprite();
                        this._blackSprite.alpha = ap;
                        this._blackSprite.mouseEnabled = true;
                        this.addChildAt(this._blackSprite, 0);
                    }
                    console.log("drawBlack", ap, color);
                    this._blackSprite.size(Laya.stage.width, Laya.stage.height);
                    this._blackSprite.graphics.clear();
                    this._blackSprite.graphics.drawRect(0, 0, this._blackSprite.width, this._blackSprite.height, color);
                    this._blackSprite.pos(this._app.uiRoot.x, -this._app.uiRoot.y);
                    if (this._isModal && this._isClickModalClose)
                        this._blackSprite.on(LEvent.CLICK, this, this.onBlackClick);
                };
                // 页面打开函数
                Page.prototype.open = function (key, bronSprite, prevView) {
                    this._key = key;
                    this._bronSprite = bronSprite;
                    this._prev_View = prevView;
                    this.clear();
                    if (this._isModal)
                        this.drawBlack();
                    this.isOpened = true;
                    this.createdLoadEffect();
                    Laya.loader.load(this._asset, Handler.create(this, this.onLoaded));
                };
                Page.prototype.createdLoadEffect = function () {
                    if (!this._isOpenLoad)
                        return;
                };
                Page.prototype.clearLoadEffect = function () {
                };
                Page.prototype.setMouseThrough = function (v) {
                    this._mouseThrough = v;
                    if (this._view instanceof View) {
                        this._view.mouseThrough = this._mouseThrough;
                    }
                };
                Page.prototype.inFrontAll = function () {
                    this.parent && this.parent.addChild(this);
                };
                // 页面打开时执行函数
                Page.prototype.onOpen = function () {
                    this._onOpenFunc && this._onOpenFunc(this);
                    if (this._prev_View && this._prev_View.parent)
                        this._prev_View.parent.visible = false;
                    if (this._isTweenOpen && this._view && this._view.parent && this._view.hasOwnProperty('y')) {
                        Laya.Tween.from(this._view, { scaleX: 0.1, scaleY: 0.1 }, 200, Laya.Ease.cubicIn);
                    }
                    //添加页面相关监听
                    this.addListener = true;
                };
                // 打开其他页面
                Page.prototype.openOtherPage = function (key, container, onOpenFunc, onCloseFunc, bronSprite) {
                    if (!container) {
                        container = this.parent;
                    }
                    if (!container) {
                        return null;
                    }
                    return container.open(key, onOpenFunc, onCloseFunc, bronSprite);
                };
                // 清理下页面
                Page.prototype.clear = function () {
                    this.clearLoadEffect();
                    Laya.timer.clearAll(this);
                    if (this._tween)
                        this._tween.clear();
                    this._tween = null;
                    if (this._view) {
                        this._view.destroy(true);
                        this._view = null;
                    }
                };
                // 重新布局
                Page.prototype.layout = function () {
                    if (this._view) {
                        var scaleX = this._clientWidth / this._view.width;
                        var scaleY = this._clientHeight / this._view.height;
                        var scale = Math.min(scaleX, scaleY);
                        this._view.scale(scale, scale);
                        this._view.x = (this._clientWidth - this._view.width * scale) / 2;
                        this._view.y = (this._clientHeight - this._view.height * scale) / 2;
                    }
                };
                // 页面关闭
                Page.prototype.close = function () {
                    var _this = this;
                    if (this._isCloseing) {
                        return;
                    }
                    // let page = this._app.uiRoot.general.getPage(PageDef.START_PAGE) as dou.gui.page.PageStart;
                    // if(page && page.isOpened){
                    // 	page.updateBan();
                    // }
                    if (this.view) {
                    }
                    //添加页面相关监听
                    this.addListener = false;
                    // MessageManager.off(WXTool.JINBI, this, this.updateGoldView);
                    Laya.Tween.clearAll(this._view);
                    this.clearBlack();
                    if (this._prev_View && this._prev_View.parent)
                        this._prev_View.parent.visible = true;
                    this._prev_View = null;
                    if (this._isTweenOpen && this._view) {
                        this._isCloseing = true;
                        Laya.Tween.to(this._view, { scaleX: .1, scaleY: 0.1 }, 200, Laya.Ease.cubicIn, Handler.create(this, function () {
                            _this._isCloseing = false;
                            _this.reallyClose();
                        }));
                        this._isTweenOpen = false;
                        return;
                    }
                    else
                        this.reallyClose();
                };
                Page.prototype.reallyClose = function () {
                    if (this._view && this._view.hasOwnProperty("btn_close"))
                        this._view.btn_close.off(LEvent.CLICK, this, this.close); //更多
                    this._isCloseing = false;
                    this.isOpened = false;
                    // this.clearGuideEffect();
                    this._onCloseFunc && this._onCloseFunc(this);
                    this.dispose();
                };
                Page.prototype.resize = function (w, h, isLayout) {
                    if (isLayout === void 0) { isLayout = true; }
                    _super.prototype.resize.call(this, w, h);
                    // this.drawBlack();
                    isLayout && this.layout();
                };
                // 释放函数
                Page.prototype.dispose = function () {
                    this.clear();
                    _super.prototype.dispose.call(this);
                    this.removeSelf();
                };
                // 取消函数调用关闭函数
                Page.prototype.cancel = function () {
                    this.close();
                    return true;
                };
                Object.defineProperty(Page.prototype, "addListener", {
                    /**
                     * 添加事件侦听(子类重写方法添加各类监听)
                     * Page页面打开，关闭函数会处理监听的开启和关闭
                     */
                    set: function (isAdd) {
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 黑底点击事件
                 */
                Page.prototype.onBlackClick = function () {
                    this.close();
                };
                /**
                 * 清理黑底
                 */
                Page.prototype.clearBlack = function () {
                    if (!this._isModal)
                        return;
                    if (this._blackSprite) {
                        this._blackSprite.off(LEvent.CLICK, this, this.onBlackClick);
                        this._blackSprite.graphics.clear();
                        this._blackSprite.destroy();
                        this._blackSprite = null;
                    }
                };
                return Page;
            }(base.Container));
            base.Page = Page;
        })(base = gui.base || (gui.base = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=Page.js.map