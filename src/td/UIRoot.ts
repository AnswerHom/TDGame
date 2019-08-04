/**
* UI
*/
module td {
	export class UIRoot extends td.gui.base.Container {
		//UI模式
		public static MODE_PC: number = 0;//PC模式
		public static MODE_HORIZONTAL: number = 1;//横屏模式
		public static MODE_VERTICAL: number = 2;//竖屏模式

		//热键枚举
		public static KEYCODE_A: number = 65;//A键
		public static KEYCODE_Q: number = 81;//Q键
		public static KEYCODE_Z: number = 90;//Z键
		public static KEYCODE_V: number = 86;//V键
		public static KEYCODE_ESC: number = 27;//eac键
		public static KEYCODE_M: number = 77;//M键
		public static KEYCODE_SPAPCE: number = 32;//Space键
		public static KEYCODE_TAB: number = 9;//Tab键
		public static KEYCODE_ENTER: number = 13;//enter键
		public static KEYCODE_UP: number = 38;//↑
		public static KEYCODE_DOWN: number = 40;//↓
		public static KEYCODE_LEFT: number = 37;//←
		public static KEYCODE_RIGHT: number = 39;//→


		// 初始化事件
		public static INIT: string = 'init';
		// 顶层ui
		private _topUI: gui.TopUI;
		// 一般UI层
		private _generalUI: gui.GeneralUI;
		// HUD层
		private _HUD: gui.HUD;

		get top(): gui.TopUI {
			return this._topUI;
		}

		get general(): gui.GeneralUI {
			return this._generalUI;
		}

		get HUD(): gui.HUD {
			return this._HUD;
		}

		private _mouseLock: boolean = false;
		set mouseLock(v: boolean) {
			this._mouseLock = v;
		}

		private _needAssetReady: boolean = false;
		private _needSceneReady: boolean = false;

		constructor(app: GameApp) {
			super(app);
			PageDef.init();
			// 顶层ui
			this._topUI = new gui.TopUI(app);
			// 一般UI层
			this._generalUI = new gui.GeneralUI(app);
			// HUD层
			this._HUD = new gui.HUD(app);

			this.addChild(this._HUD);
			this.addChild(this._generalUI);
			this.addChild(this._topUI);
		}


		public loadingWithoutLogin(): void {
			Laya.loader.load([
				
			], Handler.create(this, this.onNeedAssetLoaded));
		}

		onNeedAssetLoaded(): void {
			this._needAssetReady = true;
			this.checkReady();
		}


		private checkReady(): void {
			if (this._needAssetReady && this._needSceneReady) {
				//可以进游戏了
				console.log("进入游戏了，打开hud界面", );
				this.event(UIRoot.INIT);
			}
		}

		private onAssetLoadedComplete(): void {
			// DisplayU.initMask();
		}
		/**
		 * 打开某界面
		 * @param pageid 界面id
		 * @param page_type 界面类型 0二级 1顶层 2HUD
		 */
		private onOpenPanel(pageid: number, container: gui.base.PageContainer): void {
			container.open(pageid);
		}

		/**
		 * 关闭某界面
		 * @param pageid 界面id
		 * @param page_type 界面类型 0二级 1顶层 2HUD
		 */
		private onClosePanel(pageid: number, container: gui.base.PageContainer): void {
			if (pageid == 0) {
				container.closeAll();
			}
			else {
				container.close(pageid);
			}
		}

		/**
		 * 是否开启状态 
		 * @param page_id
		 * @return 
		 * 
		 */
		public isOpened(page_id: number): boolean {
			return this._generalUI.isOpened(page_id);
		}


		

		//进入游戏了
		private enterGame(): void {
			
		}

		public resize(w: number, h: number): void {
			this._clientWidth = w;
			this._clientHeight = h;
			this._topUI.resize(w, h);
			this._generalUI.resize(w, h);
			this._HUD.resize(w, h);
		}

		private onKeyDown(e: LEvent): void {

		}

		update(diff: number): void {

		}

		/*按下Enter键后*/
		private onKeyEnter(): void {
			!this._topUI.enter() && this._generalUI.enter();
		}

		/*按下Esc键后*/
		private onKeyESC(): void {
			!this._topUI.cancel() && this._generalUI.cancel();
		}
	}
}