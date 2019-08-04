/**
* ui页面
*/
module td.gui.base {

	export class Page extends Container {
		// 视图
		protected _view: any;
		// 素材配置
		protected _asset: Array<string>;
		// 页面打开时执行函数
		private _onOpenFunc: Function;
		// 页面关闭时执行函数
		private _onCloseFunc: Function;
		// 是否打开
		public isOpened: boolean = false;
		// 是否关闭中
		private _isCloseing: boolean = false;

		//打开页面的index
		protected _key: number;
		private _bronSprite: Sprite;
		/**是否播放开启、关闭界面音效 */
		protected _isPlayOCSound: boolean = true;
		/**是否启用模态窗 */
		protected _isModal: boolean = true;
		/**是否可以点击模态窗关闭界面 */
		protected _isClickModalClose: boolean = false;
		/**是否启用缓动大开效果*/
		protected _isTweenOpen: boolean = true;
		/**是否启用load*/
		protected _isOpenLoad: boolean = true;

		protected _dataSource: any;
		protected _prev_View: any;
		/**数据*/
		get dataSource(): any {
			return this._dataSource;
		}
		/**数据*/
		set dataSource(v: any) {
			this._dataSource = v;
		}
		get view(): any {
			return this._view;
		}

		constructor(app: GameApp, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app);
			this._onOpenFunc = onOpenFunc;
			this._onCloseFunc = onCloseFunc;
			this.mouseThrough = true;
		}

		protected onLoaded(): void {
			if (!this.isOpened) return;
			this.init();
			this.layout();
			this.onOpen();
			if (this._view instanceof View) {
				this._view.mouseThrough = this._mouseThrough;
				this._view.cacheAs = "normal";
				this._view.centerX = 0.5;
				this._view.centerY = 0.5;
			}
			this.initCachas();
			this.clearLoadEffect();
		}

		// 页面初始化函数
		protected init(): void {

		}
		//设置cachas
		protected initCachas(): void {

		}

		private _blackSprite: Sprite;
		private _blackColor: string = null;
		private _blackAlpha: number = 0.75;
		/**
		 * 绘制黑底
		 */
		protected drawBlack(ap: number = 0.75, color: string = "#0"): void {
			if (!color || !color.length) return;
			console.log("ap,color", ap, color)
			if (!this._blackSprite) {
				this._blackColor = color;
				this._blackAlpha = ap;
				this._blackSprite = new Sprite();
				this._blackSprite.alpha = ap;
				this._blackSprite.mouseEnabled = true;
				this.addChildAt(this._blackSprite, 0);
			}
			console.log("drawBlack", ap, color)
			this._blackSprite.size(Laya.stage.width, Laya.stage.height);
			this._blackSprite.graphics.clear();
			this._blackSprite.graphics.drawRect(0, 0, this._blackSprite.width, this._blackSprite.height, color);
			this._blackSprite.pos(this._app.uiRoot.x, -this._app.uiRoot.y);
			if (this._isModal && this._isClickModalClose)
				this._blackSprite.on(LEvent.CLICK, this, this.onBlackClick);
		}


		// 页面打开函数
		open(key: number, bronSprite?: Sprite, prevView?: any): void {
			this._key = key;
			this._bronSprite = bronSprite;
			this._prev_View = prevView;
			this.clear();
			if (this._isModal)
				this.drawBlack();
			this.isOpened = true;
			this.createdLoadEffect();
			Laya.loader.load(this._asset, Handler.create(this, this.onLoaded));
		}

		createdLoadEffect(): void {
			if (!this._isOpenLoad) return;

		}

		clearLoadEffect(): void {

		}

		private _mouseThrough = true;
		setMouseThrough(v: boolean): void {
			this._mouseThrough = v;
			if (this._view instanceof View) {
				this._view.mouseThrough = this._mouseThrough;
			}
		}

		inFrontAll(): void {
			this.parent && this.parent.addChild(this);
		}

		private _originViewY: number;
		private _tween: Laya.Tween;
		// 页面打开时执行函数
		protected onOpen(): void {
			this._onOpenFunc && this._onOpenFunc(this);
			if (this._prev_View && this._prev_View.parent)
				this._prev_View.parent.visible = false;
			if (this._isTweenOpen && this._view && this._view.parent && this._view.hasOwnProperty('y')) {
				Laya.Tween.from(this._view, { scaleX: 0.1, scaleY: 0.1 }, 200, Laya.Ease.cubicIn);
			}
			//添加页面相关监听
			this.addListener = true;
		}

		// 打开其他页面
		protected openOtherPage(key: number, container?: PageContainer, onOpenFunc?: Function, onCloseFunc?: Function, bronSprite?: Sprite): Page {
			if (!container) {
				container = this.parent as PageContainer;
			}
			if (!container) {
				return null;
			}
			return container.open(key, onOpenFunc, onCloseFunc, bronSprite);
		}

		// 清理下页面
		protected clear(): void {
			this.clearLoadEffect();
			Laya.timer.clearAll(this);
			if (this._tween) this._tween.clear();
			this._tween = null;
			if (this._view) {
				this._view.destroy(true);
				this._view = null;
			}
		}

		// 重新布局
		protected layout(): void {
			if (this._view) {
				let scaleX = this._clientWidth / this._view.width;
				let scaleY = this._clientHeight / this._view.height;
				let scale = Math.min(scaleX, scaleY);
				this._view.scale(scale, scale);
				this._view.x = (this._clientWidth - this._view.width * scale) / 2;
				this._view.y = (this._clientHeight - this._view.height * scale) / 2;
			}
		}

		//是否已经释放UI计数
		private _isSubBgCount: boolean = false;

		// 页面关闭
		close(): void {
			if (this._isCloseing) {
				return;
			}
			// let page = this._app.uiRoot.general.getPage(PageDef.START_PAGE) as dou.gui.page.PageStart;
			// if(page && page.isOpened){
			// 	page.updateBan();
			// }
			if (this.view) {

			}
			//添加页面相关监听
			this.addListener = false;
			// MessageManager.off(WXTool.JINBI, this, this.updateGoldView);
			Laya.Tween.clearAll(this._view);
			this.clearBlack();
			if (this._prev_View && this._prev_View.parent)
				this._prev_View.parent.visible = true;
			this._prev_View = null;
			if (this._isTweenOpen && this._view) {
				this._isCloseing = true;
				Laya.Tween.to(this._view, { scaleX: .1, scaleY: 0.1 }, 200, Laya.Ease.cubicIn,
					Handler.create(this, () => {
						this._isCloseing = false;
						this.reallyClose();
					}));
				this._isTweenOpen = false;
				return;
			}
			else this.reallyClose();
		}

		private reallyClose(): void {
			if (this._view && this._view.hasOwnProperty("btn_close"))
				this._view.btn_close.off(LEvent.CLICK, this, this.close);//更多
			this._isCloseing = false;
			this.isOpened = false;
			// this.clearGuideEffect();
			this._onCloseFunc && this._onCloseFunc(this);
			this.dispose();

		}

		resize(w: number, h: number, isLayout: boolean = true): void {
			super.resize(w, h);
			// this.drawBlack();
			isLayout && this.layout();
		}

		// 释放函数
		dispose(): void {
			this.clear();
			super.dispose();
			this.removeSelf();
		}

		// 取消函数调用关闭函数
		cancel(): boolean {
			this.close();
			return true;
		}


		/**
		 * 添加事件侦听(子类重写方法添加各类监听)
		 * Page页面打开，关闭函数会处理监听的开启和关闭
		 */
		protected set addListener(isAdd: boolean) {

		}

		/**
		 * 黑底点击事件
		 */
		private onBlackClick(): void {
			this.close();
		}

		/**
		 * 清理黑底
		 */
		private clearBlack(): void {
			if (!this._isModal)
				return;
			if (this._blackSprite) {
				this._blackSprite.off(LEvent.CLICK, this, this.onBlackClick);
				this._blackSprite.graphics.clear();
				this._blackSprite.destroy();
				this._blackSprite = null;
			}
		}

	}
}