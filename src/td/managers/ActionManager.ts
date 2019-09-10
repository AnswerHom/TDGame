/**
* 行为管理器 
*/
module td.managers {

	export class ActionManager {
		private _actions: Array<ActionBase> = [];
		private _aftre_update: Array<Function>;
		private _lock: boolean;
		constructor() {
			this._aftre_update = new Array<Function>();
		}

		get isEmpty(): boolean {
			return !this._actions.length;
		}

		//栈顶
		public get top(): ActionBase {
			let top: number = this._actions.length - 1;
			let action: ActionBase = this._actions[top];
			return action;
		}

		public get length(): number {
			return this._actions.length;
		}

		// 行为更新
		public updateActions(deltaTime: number) {
			//--取得栈顶进行心跳
			let top: number = this._actions.length - 1;
			let action: ActionBase = this._actions[top];
			if (action == null) {
				throw "action is null";
			}
			this._lock = true;
			if (action.toBeUpdate() && action.update(deltaTime)) {
				//logd('action pop ', action.toString());
				action.finalize();
				this._actions.splice(top, 1);
			}
			this._lock = false;
			if (this._aftre_update.length != 0) {
				for (let i = 0; i < this._aftre_update.length; i++) {
					this._aftre_update[i]();
				}
				this._aftre_update.length = 0;
			}
			if (this._actions.length == 0) {
				throw "after update , action is null";
			}
		}

		//目前的行为栈是否可以被攻击
		public canBeAttacked(): boolean {
			let top: number = this._actions.length - 1;
			let action: ActionBase = this._actions[top];
			if (!action)
				return false;
			return action.canBeAttacked;
		}

		//一次心跳完以后干嘛
		private onAfterUpdate(fun: Function) {
			this._aftre_update.push(fun);
		}

		private _push(action: ActionBase) {
			//logd('action push ', action.toString());
			this._actions.push(action);
			//-- 如果初始化失败，则移除
			if (!action.initialize()) {
				//logd('action pop ', action.toString());
				action.finalize();
				this._actions.splice(this._actions.length - 1, 1);
			}
		}
		// 插入行为
		public push(action: ActionBase) {
			if (this._lock) {
				this.onAfterUpdate(() => {
					this._push(action);
				})
			}
			else {
				this._push(action);
			}
		}

		public _clear(remain: number = 0): void {
			//logd('action clear ');
			if (this._lock) {
				throw "action is running"
			}
			for (var i = this._actions.length; i > remain; i--) {
				var element = this._actions[i - 1];
				//logd('action pop ', this._actions[i - 1].toString());
				element.finalize();
			}
			this._actions.length = remain;
		}
		/**
		 * 清理栈
		 * @param i 剩余几个？
		 */
		public clear(remain: number = 0): void {
			if (remain < 0) {
				remain = 0;
			}
			if (this._lock) {
				this.onAfterUpdate(() => {
					this._clear(remain);
				})
			}
			else {
				this._clear(remain);
			}
		}
	}
}