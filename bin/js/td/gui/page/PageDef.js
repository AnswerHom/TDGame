/**
* name
*/
var tb;
(function (tb) {
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            var PageDef = /** @class */ (function () {
                function PageDef() {
                }
                PageDef.init = function () {
                    PageDef._pageClassMap[PageDef.LOAD] = page.Load;
                };
                PageDef.getPageClass = function (key) {
                    return PageDef._pageClassMap[key];
                };
                /**加载界面 */
                PageDef.LOAD = 0;
                //页面集合
                PageDef._pageClassMap = {};
                return PageDef;
            }());
            page.PageDef = PageDef;
        })(page = gui.page || (gui.page = {}));
    })(gui = tb.gui || (tb.gui = {}));
})(tb || (tb = {}));
//# sourceMappingURL=PageDef.js.map