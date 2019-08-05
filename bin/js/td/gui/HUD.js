var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* HUD
*/
var td;
(function (td) {
    var gui;
    (function (gui) {
        var HUD = (function (_super) {
            __extends(HUD, _super);
            function HUD(app) {
                return _super.call(this, app) || this;
            }
            HUD.prototype.closeAll = function () {
                for (var key in this._pages) {
                    var pageid = Number(key);
                    this.close(pageid);
                }
            };
            return HUD;
        }(td.gui.base.PageContainer));
        gui.HUD = HUD;
    })(gui = td.gui || (td.gui = {}));
})(td || (td = {}));
//# sourceMappingURL=HUD.js.map