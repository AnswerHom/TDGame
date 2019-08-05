/**
* name
*/
var td;
(function (td) {
    var utils;
    (function (utils) {
        //32朝向
        var kTowardCount = 8;
        //极小值
        var EPSINON = 0.000001;
        var Vector2 = (function () {
            function Vector2(x, y) {
                this.x = x ? x : 0;
                this.y = y ? y : 0;
            }
            Object.defineProperty(Vector2.prototype, "len", {
                /**
                 * len 取得向量长量
                 */
                get: function () {
                    var x = this.x, y = this.y;
                    return Math.sqrt(x * x + y * y);
                },
                /**
                 * len 设置向量长量
                 */
                set: function (newl) {
                    this.normalize();
                    this.mul(newl);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * normalizeInplace 向量单位化
             */
            Vector2.prototype.normalize = function () {
                var l = this.len;
                if (l > 0) {
                    this.x = this.x / l, this.y = this.y / l;
                }
                return this;
            };
            /**
             * equal 两个向量是否相等
             */
            Vector2.prototype.equal = function (b) {
                var diff_x = (this.x > b.x) ? (this.x - b.x) : (b.x - this.x);
                var diff_y = (this.y > b.y) ? (this.y - b.y) : (b.y - this.y);
                return diff_y < EPSINON && diff_x < EPSINON;
            };
            /**
             * dist 取得两个向量距离
             */
            Vector2.prototype.dist = function (other) {
                var x = this.x - other.x;
                var y = this.y - other.y;
                return Math.sqrt((x * x) + (y * y));
            };
            /**
             * add 向量相加
             */
            Vector2.prototype.add = function (other) {
                var x = this.x + other.x;
                var y = this.y + other.y;
                this.x = x, this.y = y;
                return this;
            };
            /**
             * sub 向量相减
             */
            Vector2.prototype.sub = function (other) {
                var x = this.x - other.x;
                var y = this.y - other.y;
                this.x = x, this.y = y;
                return this;
            };
            Vector2.sub = function (r, a, b) {
                var x = a.x - b.x;
                var y = a.y - b.y;
                if (!r)
                    r = Vector2.vec2;
                r.x = x, r.y = y;
                return r;
            };
            /**
             * mul 向量乘以标量
             */
            Vector2.prototype.mul = function (l) {
                this.x = this.x * l;
                this.y = this.y * l;
                return this;
            };
            Vector2.prototype.set = function (other) {
                this.x = other.x;
                this.y = other.y;
            };
            /**
             * lerp 计算插值
             */
            Vector2.prototype.lerp = function (P1, t) {
                var _t = 1 - t;
                this.x = this.x * _t + P1.x * t;
                this.y = this.y * _t + P1.y * t;
                return this;
            };
            Vector2.prototype.fromToward = function (toward, towardCount) {
                if (!towardCount) {
                    towardCount = kTowardCount;
                }
                var radian = 2 * Math.PI * toward / towardCount;
                var x = Math.cos(radian);
                var y = Math.sin(radian);
                this.x = x, this.y = y;
                this.normalize();
                return this;
            };
            Vector2.prototype.getToward = function (towardCount) {
                if (!towardCount) {
                    towardCount = kTowardCount;
                }
                var x = this.x, y = this.y;
                var o = Math.atan2(y, x);
                if (o < 0) {
                    o = o + (Math.PI * 2);
                }
                var num = o / (2 * Math.PI / towardCount);
                // --4舍5入
                var toward = Math.floor(num + 0.5);
                // --当他等于32的时候应该要转成0
                return toward == towardCount ? 0 : toward;
            };
            /**
             * 复制
             */
            Vector2.prototype.clone = function () {
                return new Vector2(this.x, this.y);
            };
            return Vector2;
        }());
        Vector2.zero = new Vector2(0, 0);
        Vector2.temp = new Vector2(0, 0);
        Vector2.vec2 = new Vector2();
        utils.Vector2 = Vector2;
    })(utils = td.utils || (td.utils = {}));
})(td || (td = {}));
//# sourceMappingURL=Vector2.js.map