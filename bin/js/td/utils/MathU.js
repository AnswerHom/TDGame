/**
* name
*/
var td;
(function (td) {
    var utils;
    (function (utils) {
        var MathU = (function () {
            function MathU() {
            }
            /**
             * 随机指定范围的值
             * @param	min 最小值
             * @param	max 最大值
             */
            MathU.randomRange = function (min, max) {
                var range = Math.floor((max - min + 1) * Math.random());
                return range + min;
            };
            /**
             * 在一个圆的范围内随机坐标点
             * @param  centerPoint 圆心点
             * @param  radiusMin   随机半径最小值
             * @param  radiusMax   随机半径最大值
             */
            MathU.randomPointInCicle = function (centerPoint, radiusMin, radiusMax) {
                //获得随机半径
                var randomRad = MathU.randomRange(radiusMin, radiusMax);
                //获得随机角度
                var randomAngle = Math.random() * 360;
                var resultPoint = new Point();
                resultPoint.x = centerPoint.x + Math.sin(randomAngle * Math.PI / 180) * randomRad;
                resultPoint.y = centerPoint.y + Math.cos(randomAngle * Math.PI / 180) * randomRad;
                return resultPoint;
            };
            //整型转换
            MathU.parseInt = function (v) {
                if (v >= 0) {
                    return Math.floor(v);
                }
                else {
                    return Math.ceil(v);
                }
            };
            // Number转int
            // static toInt(v: number): number {
            // 	if (!this._byteArray) {
            // 		this._byteArray = new ByteArray();
            // 	}
            // 	this._byteArray.position = 0;
            // 	this._byteArray.writeInt(v);
            // 	this._byteArray.position = 0;
            // 	return this._byteArray.readInt();
            // }
            /**
             * 获得两点之间的距离
             * @param srcX 来源x
             * @param srcY 来源y
             * @param dstX 目标x
             * @param dstY 目标y
             * @return
             *
             */
            MathU.getDistance = function (srcX, srcY, dstX, dstY) {
                var x = srcX - dstX;
                var y = srcY - dstY;
                return Math.sqrt(x * x + y * y);
            };
            /**
             * 通过制定的时长毫秒长度，获得旋转的圈角度
             * @param duration 时长 多少毫秒转一圈
             * @return
             *
             */
            MathU.getAngleTimeT = function (duration) {
                return Number((Laya.timer.currTimer % duration) / duration) * Math.PI;
            };
            /**
             * 通过旋转角度获得2PI的弧度
             * @param rotation
             * @return
             *
             */
            MathU.getAngleByRotaion = function (rotation) {
                rotation %= rotation;
                return Math.PI * Number(rotation / 180);
            };
            /**
             * 获得两点之间的弧度
             * @param srcX
             * @param srcY
             * @param dstX
             * @param dstY
             * @return
             *
             */
            MathU.getAngle = function (srcX, srcY, dstX, dstY) {
                dstX -= srcX;
                dstY -= srcY;
                var ang = Math.atan2(dstY, dstX);
                ang = (ang >= 0) ? ang : 2 * Math.PI + ang;
                return ang;
            };
            /**
             * 通过弧度方向获得旋转角度0-360
             * @param angle 弧度
             * @return
             *
             */
            MathU.getRotation = function (angle) {
                return Math.round(Number(angle / Math.PI) * 180);
            };
            /**
             * 返回一个随机布尔值
             * @return
             */
            MathU.randomBoolen = function () {
                return Math.round(Math.random()) == 0;
            };
            MathU.randomFromArr = function (data) {
                return data[Math.floor(Math.random() * data.length)];
            };
            /**
             * 颜色滤镜之对比度调整
             */
            MathU.colorMatrix_adjust = function (contrast, brightness) {
                var s = contrast + 1;
                var o = 128 * (1 - s);
                var aMatrix = [s, 0, 0, 0, o,
                    0, s, 0, 0, o,
                    0, 0, s, 0, o,
                    0, 0, 0, 1, 0];
                brightness *= 255;
                var bMatrix = [1, 0, 0, 0, brightness,
                    0, 1, 0, 0, brightness,
                    0, 0, 1, 0, brightness,
                    0, 0, 0, 1, 0];
                return MathU.colorMatrix_concat(aMatrix, bMatrix);
            };
            MathU.colorMatrix_concat = function (matrixa, matrixb) {
                var sMatrix = new Array(20);
                var i = 0;
                for (var y = 0; y < 4; ++y) {
                    for (var x = 0; x < 5; ++x) {
                        sMatrix[i + x] = matrixa[i] * matrixb[x] +
                            matrixa[i + 1] * matrixb[x + 5] +
                            matrixa[i + 2] * matrixb[x + 10] +
                            matrixa[i + 3] * matrixb[x + 15] +
                            (x == 4 ? matrixa[i + 4] : 0);
                    }
                    i += 5;
                }
                return sMatrix;
            };
            //颜色转换
            MathU.convertColor = function (e, t, n) {
                return "#" + this.convertHex(e) + this.convertHex(t) + this.convertHex(n);
            };
            MathU.convertHex = function (e) {
                var t = Math.round(e).toString(16);
                return 1 == t.length ? "0" + t : t;
            };
            return MathU;
        }());
        //最大朝向
        MathU.kTowardCount = 8;
        utils.MathU = MathU;
    })(utils = td.utils || (td.utils = {}));
})(td || (td = {}));
//# sourceMappingURL=MathU.js.map