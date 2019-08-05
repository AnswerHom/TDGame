/**
* 对象池
*/
var td;
(function (td) {
    var utils;
    (function (utils) {
        var ObjectPools = (function () {
            function ObjectPools() {
            }
            /**
             * 申请
             * @param def				对象类名
             * @param params			新对象构造函数的参数（最多支持10个）
             * @param arg				outPool初始化的参数
             * @return
             */
            ObjectPools.malloc = function (def, params) {
                if (params === void 0) { params = null; }
                var arg = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    arg[_i - 2] = arguments[_i];
                }
                var obj;
                var pool = this._pools[def.poolName];
                if (pool) {
                    obj = pool.pull();
                }
                if (!obj) {
                    // logd(def.name, " _pool.length", 0);
                    if (!params) {
                        obj = new def();
                    }
                    else {
                        switch (params.length) {
                            case 0:
                                obj = new def();
                                break;
                            case 1:
                                obj = new def(params[0]);
                                break;
                            case 2:
                                obj = new def(params[0], params[1]);
                                break;
                            case 3:
                                obj = new def(params[0], params[1], params[2]);
                                break;
                            case 4:
                                obj = new def(params[0], params[1], params[2], params[3]);
                                break;
                            case 5:
                                obj = new def(params[0], params[1], params[2], params[3], params[4]);
                                break;
                            case 6:
                                obj = new def(params[0], params[1], params[2], params[3], params[4], params[5]);
                                break;
                            case 7:
                                obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
                                break;
                            case 8:
                                obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]);
                                break;
                            case 9:
                                obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]);
                                break;
                            case 10:
                                obj = new def(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9]);
                                break;
                        }
                    }
                }
                obj.outPool.apply(obj, arg);
                return obj;
            };
            /**
             * 释放
             * @param obj	对象
             */
            ObjectPools.free = function (obj) {
                var className = obj.poolName;
                var pool = this._pools[className];
                if (!pool) {
                    pool = new Pool(className);
                    this._pools[className] = pool;
                }
                obj.intoPool();
                pool.push(obj);
            };
            /**心跳驱动*/
            ObjectPools.update = function (diff) {
                if (this._nextUpdateTime > 0) {
                    this._nextUpdateTime -= diff;
                    return;
                }
                this._nextUpdateTime = 20000; //20秒检查一下池
                for (var key in this._pools) {
                    this._pools[key].adaptSize();
                }
            };
            return ObjectPools;
        }());
        // 调试时的严格模式
        ObjectPools.MOLD_DEBUG_STRICT = 0;
        // 发布时的防错模式
        ObjectPools.MOLD_RELEASE_FAIL_SAFE = 1;
        // 模式
        ObjectPools.mold = ObjectPools.MOLD_RELEASE_FAIL_SAFE;
        /** 对象池*/
        ObjectPools._pools = {};
        /**距离下次检查的时间*/
        ObjectPools._nextUpdateTime = 0;
        utils.ObjectPools = ObjectPools;
        /**
         * 池
         * @author wy
         */
        var Pool = (function () {
            function Pool(key) {
                /**池*/
                this._list = [];
                /**过去一段时间池内最小对象数 （用来清理池内暂不使用的对象）*/
                this._minSize = 0;
                this._maxSize = 0;
                // 检查标识
                this._mask = 0;
                this._key = key;
            }
            /**进池*/
            Pool.prototype.push = function (obj) {
                var len = this._list.length;
                var idx = this._list.indexOf(obj);
                if (idx != -1) {
                    if (ObjectPools.mold == ObjectPools.MOLD_DEBUG_STRICT) {
                    }
                    else if (ObjectPools.mold == ObjectPools.MOLD_RELEASE_FAIL_SAFE) {
                    }
                    return;
                }
                this._list[len] = obj;
                // logd(this._key, " _pool.length", len + 1);
            };
            /**出池*/
            Pool.prototype.pull = function () {
                var obj;
                var idx = this._list.length - 1;
                if (idx >= 0) {
                    obj = this._list[idx];
                    this._list.length = idx;
                    this._minSize = Math.min(this._minSize, idx);
                    this._maxSize = Math.max(this._maxSize, idx);
                    this._mask = 0;
                }
                return obj;
            };
            /**池大小根据使用情况适应*/
            Pool.prototype.adaptSize = function () {
                this._mask++;
                //评估的使用池大小
                var useSize = this._maxSize - this._minSize;
                if (this._mask < 3) {
                    useSize += 2;
                }
                if (this._list.length > useSize)
                    this._list.length = useSize;
                this._minSize = this._maxSize = 0;
            };
            return Pool;
        }());
    })(utils = td.utils || (td.utils = {}));
})(td || (td = {}));
//# sourceMappingURL=ObjectPools.js.map