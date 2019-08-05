var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* 加载界面
*/
var tb;
(function (tb) {
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            var Load = (function (_super) {
                __extends(Load, _super);
                function Load(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    _this._isModal = false;
                    _this._isTweenOpen = false;
                    _this._asset = [
                        Path.uiAtlas + "load.atlas"
                    ];
                    return _this;
                }
                // 页面初始化函数
                Load.prototype.init = function () {
                    this._view = this._viewUI = new ui.LoadUI();
                    this.addChild(this._viewUI);
                };
                Load.prototype.onOpen = function () {
                    _super.prototype.onOpen.call(this);
                    this._viewUI.progress_JD.value = 0;
                    Laya.Tween.to(this._viewUI.progress_JD, { value: 1, update: Handler.create(this, this.updateJD, null, false) }, 1000);
                };
                Load.prototype.updateJD = function () {
                    this._viewUI.label_JD.text = Math.floor(this._viewUI.progress_JD.value * 100) + "%";
                };
                Load.prototype.close = function () {
                };
                return Load;
            }(td.gui.base.Page));
            page.Load = Load;
        })(page = gui.page || (gui.page = {}));
    })(gui = tb.gui || (tb.gui = {}));
})(tb || (tb = {}));
//# sourceMappingURL=Load.js.map