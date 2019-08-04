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
* 容器
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var Container = /** @class */ (function (_super) {
                __extends(Container, _super);
                function Container(app) {
                    var _this = _super.call(this) || this;
                    // 是否释放
                    _this._dispose = false;
                    _this._app = app;
                    return _this;
                }
                // 确认函数
                Container.prototype.enter = function () {
                    return false;
                };
                // 取消函数
                Container.prototype.cancel = function () {
                    return false;
                };
                Container.prototype.resize = function (w, h) {
                    this._clientWidth = this.width = w;
                    this._clientHeight = this.height = h;
                };
                // 释放函数
                Container.prototype.dispose = function () {
                    this._dispose = true;
                };
                return Container;
            }(Laya.Sprite));
            base.Container = Container;
        })(base = gui.base || (gui.base = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=Container.js.map