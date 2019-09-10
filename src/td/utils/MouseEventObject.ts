module td.utils {
	// 鼠标单击超时时间
	export const MOUSECLICK_TIMEOUT = 200;
	// 鼠标单击容错距离 
	export const MOUSECLICK_FAILOVER = 5;

	/**
	 * 响应鼠标对象 
	 */
	export interface IMouseEventObject {
		onMouseDown(x: number, y: number): boolean;
		onMouseUp(x: number, y: number, ...args): boolean;
		onMouseClick(x: number, y: number): void;
	}
	/**
	* 响应鼠标对象 
	*/
	export class MouseEventObject extends Laya.EventDispatcher implements IMouseEventObject {
		/**
		* 碰撞区域
		*/
		protected _hitArea: Array<number>;
		/**碰撞区域*/
		public get hitArea():number[]{
			return this._hitArea;
		}
		/**
         * 碰撞区域
         * @param v 
         */
		setHitArea(v: Array<number>): void {
			this._hitArea = v;
		}
		private _mouseEnabled: boolean = false;
		/**
		 * 鼠标响应
		 */
		set mouseEnabled(v: boolean) {
			this._mouseEnabled = v;
		}

		// 最后按住的点
		private _lastPressPoint: Point = new Point();
		// 最后按住的时间
		private _lastPressTimer: number = 0;
		// constructor() {
		// 	super();
		// }

		/**
		  * 鼠标碰撞检测
		  */
		hitTest(x: number, y: number): boolean {
			return utils.areaContains(this._hitArea, x, y);
		}

		// 鼠标按下
		onMouseDown(x: number, y: number): boolean {
			if (!this._mouseEnabled) {
				return false;
			}
			this._lastPressPoint.x = x;
			this._lastPressPoint.y = y;
			this._lastPressTimer = Laya.timer.currTimer;
			return utils.areaContains(this._hitArea, x, y);
		}
		// 鼠标弹起
		onMouseUp(x: number, y: number, ...args): boolean {
			if (!this._mouseEnabled) {
				return false;
			}
			return utils.areaContains(this._hitArea, x, y);
		}

		// 鼠标单击
		onMouseClick(x: number, y: number): void {
			if (Laya.timer.currTimer - this._lastPressTimer > MOUSECLICK_TIMEOUT) {
				// 超时
				return;
			}
			if (this._lastPressPoint.distance(x, y) > MOUSECLICK_FAILOVER) {
				// 超距离
				return;
			}
			this.__onMouseClick(x,y);
		}

        /**
         * 鼠标单击 业务实现代码重写这个方法
         */
		__onMouseClick(x: number, y: number): void {

		}

		private _hitAreaColor: string;
		protected drawHitArea(area: Array<number>, g: Graphics, x: number, y: number, dx: number, dy: number): void {
			if (!area) {
				return;
			}
			let hitArea = [];
			for (let i = 0; i < area.length;) {
				hitArea.push(area[i] - x, area[i + 1] - y);
				i += 2;
			}
			const cls = ['#000', , '#00FF00', '#FF0000', '#0000FF']
			if (!this._hitAreaColor) {
				this._hitAreaColor = cls[Math.floor(Math.random() * cls.length)];
			}
			g.drawPoly(dx, dy, hitArea, null, this._hitAreaColor, 2);
		}
	}
}