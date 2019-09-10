/**
* name 
*/
module td.managers.actions {
	interface ActionTimer {
		delay?: number;				// 延迟多久执行
		repeatCount?: number;		// 重复次数
		arg?: any;					// 回调参数
		func: (arg?: any) => void;	// 回调函数		

		__prevTime?: number;			// 上次执行时间
		__currentCount?: number;		// 执行次数
	}

	export class ActionBase {
		isFinal: boolean;
		protected _can_be_attacked: boolean;				//是否可以被攻击
		public get canBeAttacked(): boolean {
			return this._can_be_attacked;
		}
		// 收尾回调
		public onFinalize: () => boolean;

		constructor() {
			this.isFinal = false;
			this._can_be_attacked = false;
		}


		// 初始化，返回子类是否有继续执行的必要
		public initialize(): boolean {
			return true;
		}

		// 释放
		public finalize(): boolean {
			this.isFinal = true;
			if (this.onFinalize != null) {
				this.onFinalize()
				this.onFinalize = null;
			}
			return true;
		}

		//返回这个行为的字符串信息
		public toString(): string {
			throw 'not implementation';
		}

		//返回true行为执行完毕 
		public update(deltaTime: number): boolean {
			return false;
		}

		//是否进行心跳
		public toBeUpdate(): boolean {
			return true;
		}
	}

	export class ActionBaseT<T> extends ActionBase {
		protected _owner: T;
		protected _accident_fun: Function;	//意外情况监测，会弹出栈
		protected _to_be_update_fun: Function;		//本次是否进行update

		constructor(owner: T) {
			super();
			this._owner = owner;
		}

		//注册函数
		public set toBeUpdateFun(to_be_update_fun: Function) {
			this._to_be_update_fun = to_be_update_fun;
		}

		//注册意外函数
		public set accidentFun(accident_fun: Function) {
			this._accident_fun = accident_fun;
		}

		//是否进行心跳
		public toBeUpdate(): boolean {
			if (this._to_be_update_fun && this._to_be_update_fun(this._owner)) {
				return false;
			}
			return true;
		}

		//返回true行为执行完毕 
		public update(deltaTime: number): boolean {
			if (super.update(deltaTime)) {
				return true;
			}
			if (this._accident_fun && this._accident_fun(this._owner)) {
				return true;
			}
			return false;
		}
	}
}
