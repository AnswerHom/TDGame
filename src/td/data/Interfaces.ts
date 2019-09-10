module td.data {

    /**
	 * 地图配置
	 */
    export interface IMapConf {
        id: string;
        name: string;
        music: string;
        skin: string;
        width: number;
        height: number;
        assets: Array<string>;
        scene_pivotX: number;//摄像机中心点x
        scene_pivotY: number;//摄像机中心点y
        maxScale: number;
        minScale: number;
        initScale: number;
        builds: Array<IBuildingConf>;
        // 半透明区域
        amaskareas: Array<Array<number>>;
        /**
         * 干道数据
         */
        trunk_path: Array<ITrunkPointData>;

        /**
         * 闲逛点数据
         */
        xianguang: Array<IHangUpPointData>;

        /**
         * 干道寻路
         */
        trunkPath: TrunkPath;
        // 地砖
        tiled: Tiled;
        //非科室闲逛点
        hungKeyPoints: IHangUpPointData[];
        //科室闲逛点
        departhangKeyPoints: IKeyPointData[];
        //保安闲逛点
        guardKeyPoints: IKeyPointData[];
        //出生点
        bornKeyPoints: IKeyPointData[];
        //离开点
        leaveKeyPoints: IKeyPointData[];
        //车出生点
        carbornKeyPoint: IKeyPointData;
        //车离开点
        carleaveKeyPoint: IKeyPointData;
        //车道点
        carKeyPoints: IKeyPointData[];
        //车停驻点
        carstopKeyPoint: IKeyPointData;
        //非科室干道点
        normalTrunkPoints: ITrunkPointData[];
        //地图关键点
        keyPoints: IKeyPointData[];
        //科室出口点
        outdepartKeyPoints: IKeyPointData[];

    }

    // 建筑类型
    export const BUILDING_TYPE_REGION_ENTRANCE = 1;	// 区域入口
    export const BUILDING_TYPE_OFFICE = 2;      	// 科室
    export const BUILDING_TYPE_GENERAL = 3;			// 普通的

    /**
     * 建筑配置
     */
    export interface IBuildingConf {
        id: number;
        index: number;
        x: number;
        y: number;
        center_x: number;
        center_y: number;
        name: string;
        type: number;
        parts: Array<IBuildingPartConf>;
        // 响应区
        hitarea: Array<number>;
        // 内部区域
        innerarea: Array<number>;
    }

    // 地图形象层级
    export const AVATAR_LAYER_MIDDLE = 1;   // 普通
    export const AVATAR_LAYER_BOTTOM = 2;   // 地板
    export const AVATAR_LAYER_TOP = 3;      // 空中
    export const AVATAR_LAYER_NAME = 4;     // 名称
    export const AVATAR_LAYER_STAR = 5;     // 等级

    // 部件类型
    export const BUILDING_PART_TYPE_IMG = 1;        // 图片
    export const BUILDING_PART_TYPE_ANI = 2;        // 动画
    export const BUILDING_PART_TYPE_DOOR = 3;       // 门
    export const BUILDING_PART_TYPE_CT = 4;       // ct机
    export const BUILDING_PART_TYPE_START = 5;       // 星星

    // 显示状态
    export const BUILDING_PART_STATE_SHOW = 1;          // 显示
    export const BUILDING_PART_STATE_UULOCKSHOW = 2;    // 解锁显示

    // 科室动画配置
    export const OFFICE_ANI_NOUSE_NOSEE = 1;    // 使用前看不见
    export const OFFICE_ANI_NOUSE_FRIST = 2;    // 使用前第一帧
    export const OFFICE_ANI_NOUSE_LOOP = 3;     // 使用前循环播放

    export const OFFICE_ANI_USE_LOOP = 4;       // 使用中循环播放

    export const OFFICE_ANI_USE_NEXT_KEEP = 5;  // 使用中下一步骤保留

    export const OFFICE_ANI_TYPE_WORK = 1 << 31; // 工作点特效



    /**
     * 建筑部件配置
     */
    export interface IBuildingPartConf {
        buildid: number;
        type: number;
        delta: number;//间隔
        x: number;
        y: number;
        width: number;
        height: number;
        pivotx: number;
        pivoty: number;
        // 素材
        asset: string;
        // 皮肤
        skin: string;
        // 所在层级
        layer: number;
        // 越小越上层
        sort: number;
        // 状态，是否解锁
        state: number;
        // 水平翻转
        flip_h: boolean;
        //index
        index: number;
        //动画顺序
        order: number;
        // 科室动画标识
        eff_type0: number;
        //tip
        eff_type1: number;//1红点2扳手3浇水4种植5收货6被抓7需职员8可升级9嗜睡10纵火11恶魔
    }

    export const EFFECT_HONGDIAN = 1;//红点
    export const EFFECT_BANSHOU = 2;//扳手
    export const EFFECT_JIAOSHUI = 3;//浇水
    export const EFFECT_ZHONGZHI = 4;//种植
    export const EFFECT_SHOUHUO = 5;//收获
    export const EFFECT_BEIZHUA = 6;//被抓
    export const EFFECT_XUZHIYUAN = 7;//需职员
    export const EFFECT_CANLVUP = 8;//可升级
    export const EFFECT_SHISHUI = 9;//嗜睡
    export const EFFECT_ZONGHUO = 10;//纵火
    export const EFFECT_XIAOEMO = 11;//小恶魔


    export const KEY_POINT_TYPE_HANG = 1 << 0;        // 闲逛点  红 #FF0000
    export const KEY_POINT_TYPE_WORK = 1 << 1;   // 工作点  黄 #FFFF00
    export const KEY_POINT_TYPE_QUEUE = 1 << 2;   // 排队点 蓝 #0000FF
    export const KEY_POINT_TYPE_TREAT = 1 << 3;   // 治疗点 绿 #00FF00	
    export const KEY_POINT_TYPE_GUARD = 1 << 4;   // 保安闲逛点 紫  #8A2BE2
    export const KEY_POINT_TYPE_BORN = 1 << 5;   // 出生点 橙 #EE7600
    export const KEY_POINT_TYPE_LEAVE = 1 << 6;   // 离开点 黑 	#000000
    export const KEY_POINT_TYPE_CAR = 1 << 7;   // 车道点 深蓝 #0000CD
    export const KEY_POINT_TYPE_STOP = 1 << 8;   // 停驻点 灰 #8B8B83
    export const KEY_POINT_TYPE_TREAT_NEXT = 1 << 9;   // 治疗点后续点
    export const KEY_POINT_TYPE_CT_MECHINE = 1 << 10;   // CT机
    export const KEY_POINT_TYPE_WORK_NEXT = 1 << 11;   // 工作点后续点


    /**
     * 干道关键点属性
     */
    export interface IKeyPointData {
        index: number; //序列
        value_type: number;//类型
        action: number; //动作 
        direction: number;//方向 
        id: number;//科室id
        value_x: number;//坐标
        value_y: number;//坐标
        v2: Vector2;
    }

    /**
     * 功能点
     */
    export interface IUFPointData extends IKeyPointData {
        // 后续点(如病床，x光机，等躺点, 巫师治疗工作点)
        nextPoint: IKeyPointData;
    }

    /**
     * 干道点数据
     */
    export interface ITrunkPointData {
        x: number;
        y: number;
        next: Array<number>;
        key_point: IKeyPointData;
        v2: Vector2;
    }

    /**
    * 闲逛点数据
    */
    export interface IHangUpPointData {
        x: number;
        y: number;
        v2: Vector2;
    }
}
