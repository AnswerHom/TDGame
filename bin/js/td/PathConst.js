/**
* 路径配置
*/
var td;
(function (td) {
    var Path = (function () {
        function Path() {
        }
        /**
         * 获得一直序列帧地址
         * @param path 图片路径
         * @param count 帧数
         * @param start 起始位置
         * @param reverse 是否倒序播放
         */
        Path.getSeqFrames = function (path, count, start, reverse) {
            if (start === void 0) { start = 0; }
            if (reverse === void 0) { reverse = false; }
            var paths = [];
            if (reverse)
                for (var i = count - 1; i >= start; i--) {
                    paths.push(StringU.substitute(path, i));
                }
            else
                for (var i = start; i < start + count; i++) {
                    paths.push(StringU.substitute(path, i));
                }
            return paths;
        };
        return Path;
    }());
    Path.template = 'scene/template/';
    Path.uiAtlas = "res/atlas/";
    Path.sfAtlas = "res/atlas/sf/";
    Path.ui = "ui/";
    Path.resource3D = "scene/3d/";
    Path.sound = 'scene/sound/';
    Path.scene_path = Path.resource3D + "LayaScene_baiwanyinyangshi/";
    Path.skin_path = Path.resource3D + "LayaScene_M{0}/M{0}.lh";
    Path.scene = Path.scene_path + "baiwanyinyangshi.ls";
    Path.scene_model = Path.scene_path + "Assets/yeyouji/model/";
    Path.scene_texture = Path.scene_path + "Assets/yeyouji/model/Materials/";
    Path.name_texture = Path.scene_path + "Assets/AINames/";
    Path.icon = "scene/icon/";
    Path.custom_atlas = "effect_xl/custom_atlas/";
    Path.mathSprite3D = Path.resource3D + "LayaScene_math/math.lh";
    td.Path = Path;
})(td || (td = {}));
//# sourceMappingURL=PathConst.js.map