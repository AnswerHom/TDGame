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
* 顶层ui
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var TopUI = /** @class */ (function (_super) {
            __extends(TopUI, _super);
            //飘字队列
            function TopUI(app) {
                return _super.call(this, app) || this;
            }
            return TopUI;
        }(td.gui.base.PageContainer));
        gui.TopUI = TopUI;
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=TopUI.js.map