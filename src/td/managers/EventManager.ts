module td.managers {
	/**
	 * 游戏对象更新事件管理器
	 */
    export class EventManager {
        private readonly kEventCount: number = 5;
        private _events: Array<Laya.EventDispatcher>;

        constructor() {
            this._events = [];
            for (var i = 0; i < this.kEventCount; i++) {
                this._events[i] = new Laya.EventDispatcher();
            }
        }

        event(guid: string, type: number, data?: any): void {
            this._events[type - 1].event(guid, data);
        }

		/**
		 * 监听某对象的事件
		 * @param obj 监听某对象
		 * @param type 监听该对象的类型
		 * @param listener 回调函数
		 * @param args 回调函数额*-外参数
		 */
        on(guid: string, type: number, caller: any, listener: Function, args: Array<any> = null): void {
            this._events[type - 1].on(guid, caller, listener, args);
        }

		/**
		 * 
		 * @param guid 监听某对象的事件,只触发一次
		 * @param type 
		 * @param listener 
		 * @param args 
		 */
        once(guid: string, type: number, caller: any, listener: Function, args: Array<any> = null) {
            this._events[type - 1].once(guid, caller, listener, args);
        }

		/**
		 * 关闭所有的相关的事件监听
		 */
        off(guid: string, type?: number, caller?: any, listener?: Function): void {
            let ev: Laya.EventDispatcher = this._events[type - 1];
            // 如果有指定类型则删除该类型
            if (type) {
                // 如果有指定回调则指删除掉定回调,否则留着
                if (listener) {
                    ev.off(guid, caller, listener);
                } else {
                    ev.offAll(guid);
                }
                return;
            }
            for (var i = 0; i < this.kEventCount; i++) {
                ev = this._events[i];
                if (listener) {
                    ev.off(guid, caller, listener);
                } else {
                    ev.offAll(guid);
                }
            }
        }

        // runTests(){
        // 	let evMgr:game.managers.EventManager = new game.managers.EventManager();
        // 	evMgr.on("hello", evMgr.kEventAfterUpdate,function(sender, eventdata) {
        // 		console.log("kEventAfterUpdate", sender.guid, eventdata);
        // 	});
        // 	evMgr.event("hello", evMgr.kEventAfterUpdate, [{guid:"linbc"}, 1234]);
        // 	evMgr.off("hello");
        // }
    }
}
