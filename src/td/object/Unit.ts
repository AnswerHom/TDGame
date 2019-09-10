const RONDOM_MOVE_TYPE_PATIENT = 1;				//病人闲逛
const RONDOM_MOVE_TYPE_WORKER_NODE = 2;			//医生非工作状态闲逛
const RONDOM_MOVE_TYPE_WORKER_BULIDING = 3;		//医生科室闲逛
const RONDOM_MOVE_TYP_SECURITY = 4;				//保安闲逛

module td.object {

	/**
	* 生物
	*/
	export class Unit extends BaseObject implements ISceneObject {
		static TITLE_NONE: number = -1;	// 不需要图标显示
		static TITLE_EMERGENCY: number = 1;//紧急救援 status_icon_140_
		static TITLE_FEAR: number = 2;//恐惧 //status_icon_150_
		static TITLE_LEVEAL: number = 3;//愤怒 status_icon_7_
		static TITLE_TOILET: number = 4;//厕纸 status_icon_50_
		static TITLE_REST: number = 5;//休息 status_icon_90_
		static TITLE_CURE: number = 6;//治愈 status_icon_80_
		static TITLE_NEWILL: number = 7;//新病症 status_icon_160_
		static TITLE_FIRE: number = 8;//坏蛋症 build_fh_dx_
		static TITLE_AWAKE: number = 9;//嗜睡症 build_ssz31002_tishi_
		static TITLE_GHOST: number = 10;//恶魔罩子 build_xem_dx_
		static TITLE_TIRED: number = 11;//疲惫 pibei_

		/**
		 * 图书馆用
		 */
		static TITLE_HAPPY: number = 501;//高兴
		static TITLE_ANGLE: number = 502;//生气
		static TITLE_AFRAID: number = 503;//失望

		/**获取类型 */
		gettype() {
			return 'Unit';
		}
		/**
		 * 等待从地图上移除对象
		 */
		waitToRemove: boolean = false;
		/**
		 * 位置
		 */
		pos: Vector2;

		/**
		 * 是否出生在摄像机点
		 */
		isFocus: boolean = false;
		/**
		 * 是否影片对象
		 */
		isFilmUnit: boolean = false;
		/**
		 * 当前朝向
		 */
		protected _ori: Vector2;
		protected _toward: number;
		/**
		 * 朝向4方向
		 */
		get toward(): number {
			return this._toward;
		}
		set toward(v: number) {
			this._toward = v % 4;
			utils.setV2ByFaceToward(this._ori, this._toward);
		}
		/**
		 * 视图对象
		 */
		avatar: AvatarBase;
		/**
		 * 是否在摄像机可视范围内
		 */
		lookInCamera: boolean;



		// 精灵头上的图标信息
		protected _titleState: number = -1;

		//对象创建时间
		protected _create_tm: number;
		//治疗完成时间
		protected _cure_over_tm: number = 0;

		/**治疗完成时间 */
		get cureOverTm(): number {
			return this._cure_over_tm;
		}
		set cureOverTm(v: number) {
			this._cure_over_tm = v;
		}

		/** 随机说的话 */
		talkRand: Array<number>;

		//冒泡时间常量
		get talkBubbleTime() {
			return GameConfigValues.securityTalkBubbleTimeUnit;
		}

		//随机说话出现时间常量
		get talkRandomTime() {
			return GameConfigValues.securityTalkRandomTimeUnit;
		}
		//说话显示结束时间剩余时间
		get speakRemainTime() {
			let diff = this._speakEndTime - this._game.sync.serverWebTimeBys;
			return diff > 0 ? diff : 0;
		}

		private _speakEndTime: number;
		set speakEndTime(value: number) {
			this._speakEndTime = this._game.sync.serverWebTimeBys + value;
		}

		/**
		 * 配置ID
		 */
		configId: number;
		/**
		 * 地图ID
		 */
		mapId: number;

		protected _map: Map;
		get map() {
			return this._map;
		}

		/** 是否隐藏 */
		private _isHidden = false;
		get isHidden(): boolean {
			return this._isHidden;
		}
		set isHidden(v: boolean) {
			this._isHidden = v;
		}
		public player: Player;

		constructor(v: Game, player: Player) {
			super(v);
			this.player = player;
			this.pos = new Vector2();
			this._ori = new Vector2();
			this._create_tm = this.game.sync.serverWebTimeBys;
			this.talkRand = new Array<number>();
			this._map = null;
		}

		/**
		 * 设置位置
		 * @param x 
		 * @param y 
		 */
		setPos(x: number, y: number): void {
			this.pos.x = x;
			this.pos.y = y;
		}

		// 是否移动状态
		get isMoving(): boolean {
			return false;
		}

		/**
		 * 去哪里
		 * @param x 
		 * @param y 
		 */
		goto(x: number, y: number): void {

		}

		/**
		 * 停止移动
		 */
		moveStop() { }

		update(deltaTime: number) {
		}

		// 进入地图
		intoMap(map: Map): void {
			if (this._map != null) {
				throw "unit into map , but this._map != null";
			}
			this._map = map;
		}

		//离开地图
		leaveMap(map: Map): void {
			if (this._map != map) {
				throw "unit leave map , but this._map != map";
			}
			this._map = null;
		}
		/** 精灵进入科室, 
		 * @param building 科室
		 * @return 返回离开科室时间 
		 * */
		enterBuilding(building: Building): number {
			return -1;
		}

		/** 生物结束科室逻辑离开,处理结算业务逻辑, 
		 * @param building 科室
		 * */
		leaveBuilding(building: Building, completeHander: Handler) {

		}

		/** 精灵头上的图标显示 */
		public get titleState(): number {
			return this._titleState;
		}

		/** 精灵头上的图标显示 */
		public set titleState(value: number) {
			this._titleState = value;
		}

		/**
		 * 从地图上干掉自己
		 */
		public removeSelfFromMap(): void {
			this.waitToRemove = true;
		}

		/** 
		 * 精灵对象移除,走出医院删除自己 
		 * 场景移除,数据移除
		 * 如病人治愈走到医院离开点时,医生被辞退时
		 */
		deleteSelf() {
			this.removeSelfFromMap();
			return;
		}

	}
}
