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
var td;
(function (td) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var BaseAdaptivePage = /** @class */ (function (_super) {
                __extends(BaseAdaptivePage, _super);
                function BaseAdaptivePage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BaseAdaptivePage.prototype.onLoaded = function () {
                    _super.prototype.onLoaded.call(this);
                    this.layout();
                };
                // 重新布局
                BaseAdaptivePage.prototype.layout = function () {
                    _super.prototype.layout.call(this);
                    if (!this._view)
                        return;
                    if (this._view.box_bottom) {
                        if (onIPhoneX) {
                            this._view.box_bottom.y = this._clientHeight - this._view.box_bottom.height + 5;
                        }
                        else {
                            this._view.box_bottom.y = this._clientHeight - this._view.box_bottom.height;
                        }
                    }
                    if (this._view.box_top) {
                        if (onIPhoneX) {
                            this._view.box_top.y = -75;
                        }
                        else {
                            this._view.box_top.y = 0;
                        }
                    }
                    // if(this._view.box_title){
                    //     if(onIPhoneX){
                    //         this._view.box_title.y = 26 * (Laya.Browser.clientHeight / this._view.parent.height);
                    //     }
                    // }
                };
                return BaseAdaptivePage;
            }(base.Page));
            base.BaseAdaptivePage = BaseAdaptivePage;
        })(base = gui.base || (gui.base = {}));
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=BaseAdaptivePage.js.map