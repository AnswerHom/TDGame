/**
* name
*/
var tb;
(function (tb) {
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            var PageDef = (function () {
                function PageDef() {
                }
                PageDef.init = function () {
                    PageDef._pageClassMap[PageDef.LOAD] = page.Load;
                    PageDef._pageClassMap[PageDef.HUD] = page.HudPage;
                    PageDef._pageClassMap[PageDef.SCENE_HUD] = page.SceneHudPage;
                };
                PageDef.getPageClass = function (key) {
                    return PageDef._pageClassMap[key];
                };
                return PageDef;
            }());
            /**加载界面 */
            PageDef.LOAD = 0;
            /**HUD界面 */
            PageDef.HUD = 1;
            /**SCENE HUD界面 */
            PageDef.SCENE_HUD = 2;
            //页面集合
            PageDef._pageClassMap = {};
            page.PageDef = PageDef;
        })(page = gui.page || (gui.page = {}));
    })(gui = tb.gui || (tb.gui = {}));
})(tb || (tb = {}));
//# sourceMappingURL=PageDef.js.map