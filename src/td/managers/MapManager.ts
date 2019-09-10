/**
* 地图管理器
*/
module td.managers {
    export class MapManager extends td.object.BaseObject {
        static GOTO: string = "GOTO";
        static EVENT_ALL_MAP_COMPLETE: string = "MapManager.EVENT_ALL_MAP_COMPLETE";
        // 获取其他玩家的地图id
        static GetOtherMapID(mapid: number): number {
            return (250 << 16) + mapid;
        }
        // 获取原始的地图id
        static GetOriginalMapID(mapid: number): number {
            return mapid << 16 >> 16;
        }

        /** 主场景 */
        static main = 0;

        // 地图列表
        private _maps: Array<Map> = [];

        private _curMap: Map;
		/**
		 * 当前地图
		 */
        get curMap(): Map {
            return this._curMap;
        }

        get isMainMap(): boolean {
            if (this.curMap) {
                return true;
            }
            return false;
        }

        // 地图的配置信息
        private _confs: Array<IMapConf>;

        //配置是否加载完成
        get isConfLoaded() {
            return this._confs != null;
        }

        private _mapClass: { [key: number]: any };
        private _otherMapClass: { [key: number]: any };

        constructor(v: GameApp) {
            super(v);
            this._mapClass = {};
            this._mapClass[MapManager.main] = MapMain;

            this._otherMapClass = {};
        }

        // 创建地图
        private createdMap(id: number, other?: boolean): Map {
            let __id = other ? MapManager.GetOtherMapID(id) : id;

            let map = this.getMap(__id);
            if (!map) {
                let mapObj;
                if (other) {
                    mapObj = this._otherMapClass[id];

                }
                if (!mapObj) {
                    mapObj = this._mapClass[id];
                }
                map = new mapObj(this._game, __id);
            }
            return map;
        }

		/**
		 * 初始化地图
		 */
        init(): void {
            this._maps.push(this.createdMap(MapManager.main));

            this.unLock(MapManager.main);
        }

		/**
		 * 添加地图数据一般是访问时使用
		 * @param map 
		 */
        addMap(map: Map): boolean {
            let can = this._maps.indexOf(map) == -1
            can && this._maps.push(map);
            return can;
        }

		/**
		 * 通过id获取地图
		 * @param id 
		 */
        getMap(id: number): Map {
            for (let map of this._maps) {
                if (map.id == id) {
                    return map;
                }
            }
            return null;
        }

		/**
		 * 通过id获取地图配置
		 * @param id 
		 */
        getMapConf(id: string): IMapConf {
            for (let conf of this._confs) {
                if (conf.id == id) {
                    return conf;
                }
            }
            return null;
        }
		/**
		 * 解锁地图
		 * @param id 
		 */
        unLock(id: number): void {
            let map = this.getMap(id);
            map.isOpen = true;
        }

        readBuildFormData(v: Array<Object>): void {
            if (!v)
                return;
            for (let i: number = 0; i < v.length; i++) {
                let obj = v[i];
                if (v["regionId"] > 0 && v["regionId"] > 4) {
                    let regionId = v["regionId"];
                    this._maps[regionId].level = regionId;
                }
            }
        }

		/**
		 * 添加UNIT
		 * @param v 
		 */
        addUnit(v: Unit): void {
            if (!v)
                return;
            let map: Map = this.getMap(v.mapId);
            if (!map) {
                console.log('MapManager.addUnit map no find id:', v.mapId);
                return;
            }
            map.addUnit(v);
        }


		/**
		 * 删除Unit
		 * @param v 
		 */
        delUnit(v: Unit): void {
            if (!v)
                return;
            let map: Map = this.getMap(v.mapId);
            if (map) {
                map.delUnit(v);
            }
        }

        initMapConf(v: any): void {
            this._confs = v.tb_map;
            for (let conf of this._confs) {
                let keyPoints: IKeyPointData[] = []
                let outdepartKeyPoints: IKeyPointData[] = []
                // 解析干道数据
                let trunkInfo = conf.trunk_path;
                let len = trunkInfo.length;
                let trunkPoints = new Array<TrunkPoint>();
                let hangKeyPoints = conf.xianguang;
                let departhangKeyPoints = [];//科室闲逛点
                let guardKeyPoints = [];//门卫闲逛点
                let bornKeyPoints = [];//人出生点
                let leaveKeyPoints = [];//人离开点
                let carKeyPoints = [];//车道点
                let carbornKeyPoint;//车出生点
                let carleaveKeyPoint;//车离开点
                let carstopKeyPoint;//车停驻点
                let normalTrunkPoints = [];//非科室干道点

                for (let i = 0; i < len; i++) {
                    let tOjb = trunkInfo[i];
                    Vector2.temp.x = tOjb.x;
                    Vector2.temp.y = tOjb.y;
                    tOjb.v2 = new Vector2();
                    tOjb.v2.set(Vector2.temp);
                    if (tOjb.key_point) {
                        Vector2.temp.x = tOjb.key_point.value_x;
                        Vector2.temp.y = tOjb.key_point.value_y;
                        tOjb.key_point.v2 = new Vector2();
                        tOjb.key_point.v2.set(Vector2.temp);
                        if (tOjb.key_point.id) keyPoints.push(tOjb.key_point);
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_HANG && tOjb.key_point.id && (tOjb.key_point.value_type ^ td.data.KEY_POINT_TYPE_QUEUE))
                            departhangKeyPoints.push(tOjb.key_point);
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_STOP && tOjb.key_point.id)
                            outdepartKeyPoints.push(tOjb.key_point);
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_GUARD)
                            guardKeyPoints.push(tOjb.key_point);
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_BORN)
                            bornKeyPoints.push(tOjb.key_point);
                        if ((tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_BORN) && (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_CAR))
                            carbornKeyPoint = tOjb.key_point;
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_LEAVE)
                            leaveKeyPoints.push(tOjb.key_point);
                        if ((tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_LEAVE) && (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_CAR))
                            carleaveKeyPoint = tOjb.key_point;
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_CAR)
                            carKeyPoints.push(tOjb.key_point);
                        if (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_STOP && !tOjb.key_point.id)
                            carstopKeyPoint = tOjb.key_point;

                    }


                    if (!tOjb.key_point || !tOjb.key_point.id || (tOjb.key_point.value_type & td.data.KEY_POINT_TYPE_QUEUE))
                        normalTrunkPoints.push(tOjb);
                    let tkpt: TrunkPoint = new TrunkPoint();
                    tkpt.id = trunkPoints.length;
                    tkpt.x = tOjb.x;
                    tkpt.y = tOjb.y;
                    let nextArr = tOjb.next;
                    let nextLen: number = nextArr.length;
                    for (var j: number = 0; j < nextLen; j = j + 2) {
                        tkpt.nextPoints.push(new Point(Number(nextArr[j]), Number(nextArr[j + 1])));
                    }

                    tkpt.key_point = tOjb.key_point
                    trunkPoints.push(tkpt);
                }


                conf.trunkPath = new TrunkPath();
                conf.trunkPath.trunkPoints = trunkPoints;
                let arrss = ["0_1", "5_1", "6_1", "7_1"];
                if (arrss.indexOf(conf.id) == -1)
                    console.log("闲逛点数量:", hangKeyPoints.length)
                if (!hangKeyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("非科室闲逛点: " + conf.id);
                if (!departhangKeyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("科室闲逛点: " + conf.id);
                if (!outdepartKeyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("科室出口点: " + conf.id);
                if (!guardKeyPoints.length && (arrss.indexOf(conf.id) == -1 || conf.id == "7_1"))
                    console.log("门卫闲逛点: " + conf.id);
                if (!bornKeyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("人出生点: " + conf.id);
                if (!leaveKeyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("人离开点: " + conf.id);
                if (!carKeyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("车道点: " + conf.id);
                if (!carbornKeyPoint && arrss.indexOf(conf.id) == -1)
                    console.log("车出生点: " + conf.id);
                if (!carleaveKeyPoint && arrss.indexOf(conf.id) == -1)
                    console.log("车离开点: " + conf.id);
                if (!carstopKeyPoint && arrss.indexOf(conf.id) == -1)
                    console.log("车停驻点: " + conf.id);
                if (!normalTrunkPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("非科室干道点: " + conf.id);
                if (!keyPoints.length && arrss.indexOf(conf.id) == -1)
                    console.log("关键点: " + conf.id);
                len = hangKeyPoints.length;
                for (let i = 0; i < len; i++) {
                    let tOjb = hangKeyPoints[i];
                    Vector2.temp.x = tOjb.x;
                    Vector2.temp.y = tOjb.y;
                    tOjb.v2 = new Vector2();
                    tOjb.v2.set(Vector2.temp);
                }
                conf.hungKeyPoints = hangKeyPoints;
                conf.departhangKeyPoints = departhangKeyPoints;
                conf.outdepartKeyPoints = outdepartKeyPoints;
                conf.guardKeyPoints = guardKeyPoints;
                conf.bornKeyPoints = bornKeyPoints;
                conf.leaveKeyPoints = leaveKeyPoints;
                conf.carKeyPoints = carKeyPoints;
                conf.carstopKeyPoint = carstopKeyPoint;
                conf.carbornKeyPoint = carbornKeyPoint;
                conf.carleaveKeyPoint = carleaveKeyPoint;
                conf.normalTrunkPoints = normalTrunkPoints;
                conf.keyPoints = keyPoints;
                conf.trunk_path = null;
                // 解析地砖
                let tiled = new Tiled();
                tiled.x = conf.width / 2;
                Point.TEMP.x = tiled.x;
                Point.TEMP.y = conf.height;
                let out = tiled.pxToBlock(Point.TEMP);
                tiled.width = out.x;
                tiled.height = out.y;
                conf.tiled = tiled;
            }
            for (let map of this._maps) {
                map.confInvalid = true;
            }
            // this._game.player.hospitalMgr.initAllBuildingKeyPointData(keyPoints);
            this.event(MapManager.EVENT_ALL_MAP_COMPLETE);
        }

		/**
		 * 进入地图
		 * @param id 
		 */
        goto(id: number): void {
            if (!this._game.mainPlayer) {
                let map = this.createdMap(id, true);
                // 开放地图
                map.isOpen = true;
                this.addMap(map);
                id = map.id;
            }
            this.activate(id);
            // this._game.stopSound(Path.music + WXTool.JIJIUZHONGXIN);
        }

        private activate(id: number): void {
            for (let map of this._maps) {
                let isCur = map.id == id;
                if (isCur) {
                    if (this._curMap != map) {
                        this._curMap = map;
                    }
                    this.event(MapManager.GOTO, map);
                    map.isBlur = false;
                    map.on(Map.LOAD_CONF, this, this.onCurMapLoadConf);
                    map.on(Map.LOAD_CONF_COMPLETE, this, this.onCurMapLoadConfComplete);
                    map.on(Map.LOAD_CONF_ERROR, this, this.onCurMapLoadConfError);
                }
                else {
                    map.isBlur = true;
                    map.off(Map.LOAD_CONF, this, this.onCurMapLoadConf);
                    map.off(Map.LOAD_CONF_COMPLETE, this, this.onCurMapLoadConfComplete);
                    map.off(Map.LOAD_CONF_ERROR, this, this.onCurMapLoadConfError);
                }
            }
        }

        private onCurMapLoadConf(): void {
            this.event(Map.LOAD_CONF, this._curMap);
        }

        private onCurMapLoadConfComplete(): void {
            this.event(Map.LOAD_CONF_COMPLETE, this._curMap);
        }

        private onCurMapLoadConfError(): void {
            this.event(Map.LOAD_CONF_ERROR, this._curMap);
        }

		/**
		 * 心跳更新
		 * @param diff 
		 */
        update(diff: number): void {
            for (let map of this._maps) {
                map.update(diff);
            }
        }

        // 清理他人地图
        clearOtherMap(): void {
            // for (let map of this._maps) {
            for (let i = 0; i < this._maps.length;) {
                let map = this._maps[i];
                if ((map.id >> 16) > 0) {
                    map.clear();
                    map.off(Map.LOAD_CONF, this, this.onCurMapLoadConf);
                    map.off(Map.LOAD_CONF_COMPLETE, this, this.onCurMapLoadConfComplete);
                    map.off(Map.LOAD_CONF_ERROR, this, this.onCurMapLoadConfError);
                    this._maps.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }

    }
}