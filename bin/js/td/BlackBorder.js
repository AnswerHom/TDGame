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
* name
*/
var td;
(function (td) {
    var BlackBorder = /** @class */ (function (_super) {
        __extends(BlackBorder, _super);
        // private 
        function BlackBorder(app) {
            return _super.call(this, app) || this;
        }
        BlackBorder.prototype.update = function (diff) {
        };
        BlackBorder.prototype.resize = function (w, h) {
            _super.prototype.resize.call(this, w, h);
            var borderWidth = (w - Launch.widthDesginPixelw) / 2;
            var borderHeight = (h - Launch.heightDesginPixelw) / 2;
            this.graphics.clear();
            this.graphics.drawRect(0, 0, borderWidth, Launch.heightDesginPixelw, "#000000");
            this.graphics.drawRect(w - borderWidth, 0, w, h, "#000000");
            this.graphics.drawRect(0, 0, w, borderHeight, "#000000");
            this.graphics.drawRect(0, h - borderHeight, w, h, "#000000");
        };
        return BlackBorder;
    }(td.gui.base.Container));
    td.BlackBorder = BlackBorder;
})(td || (td = {}));
//# sourceMappingURL=BlackBorder.js.map