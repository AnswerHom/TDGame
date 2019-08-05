var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* 标签页
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var TabPage = (function (_super) {
                __extends(TabPage, _super);
                function TabPage(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    _this._selectIdx = -1;
                    _this._oldSelectIdx = 0;
                    _this.tabIndex = 0;
                    return _this;
                }
                Object.defineProperty(TabPage.prototype, "selectIdx", {
                    get: function () {
                        return this._selectIdx;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TabPage.prototype, "tabPages", {
                    get: function () {
                        return this._tabPages;
                    },
                    enumerable: true,
                    configurable: true
                });
                //添加标签页
                TabPage.prototype.addTabPage = function (index, value) {
                    if (!this._tabPages)
                        return;
                    this._tabPages[index] = value;
                };
                //选择
                TabPage.prototype.selectTab = function (index, isReuse) {
                    if (isReuse === void 0) { isReuse = false; }
                    if (!this._tabPages)
                        return;
                    //防止重复打开页面
                    if (!isReuse && this._selectIdx == index)
                        return;
                    this._selectIdx = index;
                    var len = this._tabPages.length;
                    for (var i = 0; i < len; i++) {
                        var pageChild = this._tabPages[i];
                        if (!pageChild)
                            continue;
                        if (i == index) {
                            this._tabPages[i].open();
                        }
                        else {
                            this._tabPages[i].close();
                        }
                    }
                };
                // 页面关闭
                TabPage.prototype.close = function () {
                    if (this._tabPages) {
                        var len = this._tabPages.length;
                        for (var i = 0; i < len; i++) {
                            if (!this._tabPages[i])
                                continue;
                            this._tabPages[i].destory();
                            this._tabPages[i] = null;
                        }
                        this._tabPages = null;
                        this._oldSelectIdx = 0;
                        this._selectIdx = -1;
                        this.tabIndex = 0;
                    }
                    _super.prototype.close.call(this);
                };
                return TabPage;
            }(base.Page));
            base.TabPage = TabPage;
        })(base = gui.base || (gui.base = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=TabPage.js.map