/**
* 玩家主数据
*/
module td.object {
    export class Player extends td.object.BaseObject {
		/**
		 * 是否主玩家
		 */
        isMainPlayer: boolean = false;
		/**
		 * 是否准备好了
		 */
        isReady: boolean = false;
		/**
		 * 区服ID
		 */
        areaId: string;

		/**
		 * 登陆时的微信openid
		 */
        // todo 测试时的loginid
        loginId: string;
        // = "o-y7T5BgT-6Z5Yr-GWTMTThDDqo";

		/**
		 * 玩家gpid,除注册时意义不同
		 */
        gpId: string;

		/**
		 * 注册使用的gpid
		 */
        create_gpId: string;

		/**
		 * 用户微信昵称
		 */
        nickname: string;

        /** 小程序二维码的 */
        qrcodeUrl: string;

        /** 玩家登陆后的session */
        sessionid: string;

		/**
		 * 性别 0：未知、1：男、2：女
		 */
        sex: number = 0;

		/**
		 * 头像地址
		 */
        head_icon: string;

        /** 城市 */
        city: number;

        /** 星座 */
        const: number;

        /** 微信号 */
        weixin: string;

        /** 是否显示微信号 */
        displayWeixin: number;

        /** 个性签名 */
        signature: string;


		/**
		 * 语言环境
		 */
        lang: string = "zh";

        guideStep: number = 0;

        weakGuideSteps: Array<number>;

		/**
		 * 玩家当前最高区域
		 */
        maxRegionId: number = 1;


        constructor(game: GameApp, isMainPlayer: boolean = false) {
            super(game);
            this.isMainPlayer = isMainPlayer;
        }

        update(diff: number): void {
            if (this.isReady) {
            }
        }

        getGame() {
            return this._game;
        }

        public clearData(): void {
            this.isReady = false;
            this.gpId = "";
            this.loginId = "";
            this.areaId = "";
            this.nickname = "";
            this.head_icon = "";
        }
    }
}