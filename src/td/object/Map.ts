module td.object {
	/**
	 * 地图
	 */
    export class Map extends BaseObject {
        // 加载配置
        static LOAD_CONF: string = "LOAD_CONF";
        // 配置加载完成
        static LOAD_CONF_COMPLETE: string = "LOAD_CONF_COMPLETE";
        //地图加载完成
        static MAP_LOAD_COMPLETE: string = "MAP_LOAD_COMPLETE";
        // 配置加载错误
        static LOAD_CONF_ERROR: string = "LOAD_CONF_ERROR";
        // 地图构建完毕
        static MAP_BUILD_COMPLETE: string = "MAP_BUILD_COMPLETE";
        // 添加生物
        static ADD_UNIT: string = "ADD_UNIT";
        // 删除生物
        static DEL_UNIT: string = "DEL_UNIT";
        // 点击科室
        static CLICK_OFFICE: string = "CLICK_OFFICE";
        //点击入口
        static MAIN_ENTER_CLICK: string = "CLICK_ENTER";
        // 点击生物
        static CLICK_UNIT: string = "CLICK_UNIT";
        // 点击生物头顶
        static CLICK_UNIT_TITLE: string = "CLICK_UNIT_TITLE";
        // 点击非主场景入口
        static NOT_MAIN_ENTER: string = "CLICK_NOT_MAIN_ENTER";

        // 休眠的更新频率
        private static BLUR_UPDATE_TIME = 1000;

        private _id: number = 0;
        get id(): number {
            return this._id;
        }

        private _levelChange: boolean = false;
        private _level: number = 1;
        get level(): number {
            return this._level;
        }
        set level(v: number) {
            console.log("当前地图等级" + v);

            if (this._level == v) {
                return;
            }
            //不是初始情况下
            if (this._level >= 1) {
                this._levelChange = true;
            }
            this._level = v;
            this._confInvalid = true;
        }

        private _conf: IMapConf;
		/**
		 * 配置
		 */
        get conf(): IMapConf {
            return this._conf;
        }

		/**
		 * 获取人出生点列表
		 * @param type 
		 */
        getBornKeyPoints(): IKeyPointData[] {
            if (!this._conf) return null;
            return this._conf.bornKeyPoints;
        }

		/**
		 * 获取离开点列表
		 * @param type 
		 */
        getLeavelKeyPoints(): IKeyPointData[] {
            return this._conf.leaveKeyPoints;
        }


        //随机闲逛点
        public randomHungKeyPoints(): Vector2 {
            if (!this.conf)
                return null;
            let points = this._conf.hungKeyPoints;
            if (points.length == 0) {
                return null;
            }
            let result = points[MathU.randomRange(0, points.length - 1)];
            return result.v2;
        }

        //随机保安闲逛点
        public randomGuardKeyPoints(): Vector2 {
            if (!this.conf) return null;
            let points = this._conf.guardKeyPoints;
            if (points.length == 0) {
                return null;
            }
            return points[MathU.randomRange(0, points.length - 1)].v2;
        }

        // 配置失效
        protected _confInvalid: boolean = false;
        set confInvalid(v: boolean) {
            this._confInvalid = v;
        }

        // 等待配置加载的生物列表
        private _waitLoadConfUnits: Array<Unit> = [];
        // 所有生物
        protected _units: Array<Unit> = []; // :{[key:string]:Unit} = {};

        // 是否休眠
        protected _isBlur: boolean = true;

        private _isOpen: boolean = false;
		/**
		 * 是否开放
		 */
        get isOpen(): boolean {
            return this._isOpen;
        }
        set isOpen(v: boolean) {
            this._isOpen = v;
        }

        set isBlur(v: boolean) {
            if (this._isBlur == v) {
                return;
            }
            this._isBlur = v;
            this._confInvalid = true;
        }

        private _mapMgr: MapManager;
        public testUnit: Unit;
        constructor(v: GameApp, id: number) {
            super(v);
            this._mapMgr = v.mapManager;
            this._id = id;

            // this.test();
        }

        // 获取配置id
        getConfid(): string {
            return this._id + "_" + this._level;
        }

        // 加载配置
        protected loadConf(): void {
            !this._isBlur && this.event(Map.LOAD_CONF);
            this._confInvalid = false;
            this._conf = this._mapMgr.getMapConf(this.getConfid());
            // 生物更新
            for (let unit of this._waitLoadConfUnits) {
                if (this._units.indexOf(unit) >= 0)
                    this.delUnit(unit);
                this.addUnit(unit);
            }
            this._waitLoadConfUnits.length = 0;

            //等级变更时切换了地图，所以需要对象各种数据重置一下
            if (this._levelChange) {
                for (let unit of this._units) {
                    unit.leaveMap(this);
                    unit.intoMap(this);
                }

                this._levelChange = false;
            }

            !this._isBlur && this.event(Map.LOAD_CONF_COMPLETE);
        }

        init(): void {

        }

        // 等待配置加载
        private waitLoadConf(unit: Unit): void {
            this._waitLoadConfUnits.indexOf(unit) == -1 && this._waitLoadConfUnits.push(unit);
        }

		/**
		 * 添加生物
		 * @param unit 
		 */
        addUnit(unit: Unit): void {
            if (!this._conf) {
                this.waitLoadConf(unit);
                return;
            }

            if (this._units.indexOf(unit) != -1) {
                return;
            }

            this._units.push(unit);
            unit.intoMap(this);
            this.event(Map.ADD_UNIT, unit);
        }


		/**
		 * 移除生物
		 * @param unit 
		 */
        delUnit(unit: Unit): void {
            let idx = this._waitLoadConfUnits.indexOf(unit);
            if (idx != -1) {
                this._waitLoadConfUnits.splice(idx, 1);
                return;
            }

            idx = this._units.indexOf(unit);
            if (idx == -1) {
                return;
            }
            this._units.splice(idx, 1);
            unit.leaveMap(this);
            this.event(Map.DEL_UNIT, unit);
        }

		/**
		 * 遍历所有生物
		 * @param func 
		 */
        forEachUnit(func: Function): void {
            // 生物更新
            for (let unit of this._units) {
                func.call(null, unit);
            }
        }

        // 下一次的更新时间
        private _nextUpdateTimer: number = 0;
        // 最后一次更新的时间
        private _lastUpdateTimer: number = Laya.timer.currTimer;
        //最大说话人数
        private _maxSpeakNum: number = 2;
        //当前说话人数
        private _countSpeakNum: number = 0;

        private _nextCountTime: number = 0;
		/**
		 * 心跳 重载请重载  beforeUpdate || afterUpdate
		 * @param diff 
		 */
        update(diff: number): void {
            let currTimer = Laya.timer.currTimer;
            if (this._isBlur) {
                // 如果是休眠的地图
                if (this._nextUpdateTimer > currTimer) {
                    // 还没到更新时间
                    return;
                }
                else {
                    // 下一次更新的时间
                    this._nextUpdateTimer = currTimer + Map.BLUR_UPDATE_TIME;
                }
            }
            // 距上次更新的秒数
            let deltaTime = (currTimer - this._lastUpdateTimer) / 1000;

            this._lastUpdateTimer = currTimer;

            if (this._confInvalid) {
                this._confInvalid = false;
                this.loadConf();
            }


            this.beforeUpdate(diff);

            this._countSpeakNum = 0;
            // 生物更新
            for (let unit of this._units) {
                unit.update(deltaTime);
                this._countSpeakNum += unit.speakRemainTime > 0 ? 1 : 0;
            }
            this.afterUpdate(diff);
        }

        // 用于子类重载
        protected beforeUpdate(diff: number): void {

        }

        // 用于子类重载
        protected afterUpdate(diff: number): void {

        }
		/**
		 * 清理
		 */
        clear(): void {
            this._units.length = 0;
            this.testUnit = null;
            this._conf = null;
        }
    }
}
