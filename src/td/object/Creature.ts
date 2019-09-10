
module td.object {
    // 移动状态
    const MOVE_STATUS_MOVE = 1;
    // 停止状态
    const MOVE_STATUS_IDLE = 2;

    // 移动速度
    const BASE_MOVE_SPEED = 50;

	/**
	* 生物
	*/
    export class Creature extends Unit {
        /**获取类型 */
        getType() {
            return 'Creature';
        }
        // 当前移动状态
        private _moveStatus: number;
        // 当前移动路径
        private _movePath: Array<number>;

        // 当前移动到哪个点
        private _movePathIdx: number;

        // 移动目标点
        private _target: Vector2;
        // 移动到目标点的时长
        private _targetTimer: number = 0;

        // 移动速度,单位为每s移动格子数
        protected _speed: number = 0;
        get speed(): number {
            return this._speed;
        }
        set speed(v: number) {
            if (v == this._speed) {
                return;
            }
            this._speed = v;
            if (this._hasTarget) {
                this.updateTargetTowardAndTimer();
            }
        }
        //随机移动时间间隔
        protected _rondom_move_timer;
		/**
		 * 行为栈管理器
		 */
        _actionMgr: ActionManager;

		/**
		 * 压入一个行为栈
		 * @param action 行为栈
		 */
        public pushAction(action: ActionBase): void {
            this._actionMgr.push(action);
        }

		/**
		 * 重置行为栈
		 */
        public resetAction(): void {
            throw 'not implementation'
        }

        constructor(v: GameApp, player: Player) {
            super(v, player);
            this.player = player;
            this.pos = new Vector2();
            this._target = new Vector2();
            this._speed = BASE_MOVE_SPEED;
            this._rondom_move_timer = this.randomMoveInterval();
            this._actionMgr = new ActionManager();
            this._create_tm = this.game.sync.serverWebTimeBys;
            this.talkRand = new Array<number>();
        }

        private _hasTarget: boolean = false;
        // 设置目标点位置
        private setTarget(x: number, y: number): void {
            this._target.x = x;
            this._target.y = y;
            // 目标点不等于00点,说明是有目标的
            this._hasTarget = x != 0 || y != 0;
        }

        // 删除目标点
        private deleteTarget(): void {
            this.setTarget(0, 0);
            this._targetTimer = 0;
        }

        // 设置移动状态
        private setMoveStatus(v: number): void {
            this._moveStatus = v;
        }

        // 是否移动状态
        get isMoving(): boolean {
            return this._moveStatus == MOVE_STATUS_MOVE;
        }

        /**
         * 被功能点接管了
         */
        lockByUFP: boolean = false;


        // 最终目的地
        private _lastTargetX: number;
        private _lastTargetY: number;

		/**
		 * 去哪里
		 * @param x 
		 * @param y 
		 */
        public goto(x: number, y: number): void {
            if (!this._map) {
                return;
            }
            if (x == this._lastTargetX && y == this._lastTargetY) {
                return;
            }
            let path = this._map.conf.trunkPath.find(this.pos.x, this.pos.y, x, y);
            let len = path.length;
            if (len < 2) {
                throw "goto find path fail, " + this.pos.x + "," + this.pos.y + "," + x + "," + y;
            }
            //路径做一个随机，以免人都叠在一起
            for (let i = 2; i < len - 4; i++) {
                let p = path[i];
                path[i] = MathU.randomRange(p - 10, p + 10);
            }

            this._lastTargetX = x;
            this._lastTargetY = y;
            this.moveToPath(path);
        }


        protected randomMoveInterval(): number {
            let val = MathU.randomRange(500, 1000);
            return val / 1000;
        }

        /**下次立即进行随机移动 */
        public clearRadmonMoveTimer() {
            this._rondom_move_timer = 0;
        }

        /**移动到某处，不在乎有没有到达目标的那种 */
        public randomMove(deltaTime: number, type: number) {
            if (this.isMoving) {
                return
            }
            this._rondom_move_timer -= deltaTime;
            if (this._rondom_move_timer <= 0) {
                this._rondom_move_timer = this.randomMoveInterval();
                let point: Vector2;
                switch (type) {
                    case RONDOM_MOVE_TYPE_PATIENT:
                    case RONDOM_MOVE_TYPE_WORKER_NODE:
                        point = this.map.randomHungKeyPoints();
                        break;
                    case RONDOM_MOVE_TYP_SECURITY:
                        point = this.map.randomGuardKeyPoints();
                }
                if (point)
                    this.goto(point.x, point.y);
            }
        }

		/**
		 * 通过路径进行移动
		 * @param path 
		 * @param now_pos 
		 */
        public moveToPath(path: Array<number>, now_pos: number = 0) {
            let move_path_pos: number = -1;
            for (let pos: number = now_pos; pos < path.length; pos += 2) {
                if (this.moveTo(path[pos], path[pos + 1]) == false) {
                    move_path_pos = pos
                    break
                }
            }
            //已经到达目的地了
            if (move_path_pos == -1) {
                this._movePath && (this._movePath.length = 0);
                return true
            }

            this._movePath = path;
            this._movePathIdx = move_path_pos;
            return false
        }

        // 移动到指定点
        private moveTo(x: number, y: number): boolean {
            //如果移动距离太近,瞬间就到了
            this.setTarget(x, y);
            if (Math.floor(this.pos.x) == x && Math.floor(this.pos.y) == y) {
                return true;
            }
            // --设置为移动状态
            this.setMoveStatus(MOVE_STATUS_MOVE);
            this.updateTargetTowardAndTimer();
            return false;
        }

        private updateTargetTowardAndTimer(): void {
            Vector2.sub(this._ori, this._target, this.pos).normalize();
            this._toward = utils.getFaceTowardByV2(this._ori);
            //移动到目标点需要的秒数
            let dist: number = this._target.dist(this.pos);
            this._targetTimer = dist / this._speed;
            //logd("updateTargetTowardAndTimer", this.pos, this._target, this.toward, dist);
        }

		/**
		 * 停止移动
		 */
        moveStop() {
            this.setMoveStatus(MOVE_STATUS_IDLE);
            this.deleteTarget();
            this._lastTargetX = null;
            this._lastTargetY = null;
        }

        // 更新移动位置
        private updateLocal(deltaTime: number): boolean {
            // --如果已经到达目标点则返回true
            let arriveTarget: boolean = true;
            // 有目标点才需要执行以下逻辑
            if (this._hasTarget) {
                if (this._targetTimer < deltaTime)
                    deltaTime = this._targetTimer;
                //定时器心跳
                this._targetTimer -= deltaTime;
                //目标定时器到了,说明到站了
                arriveTarget = this._targetTimer < 0.001

                //如果已经到达目标点，则设置为目标点，否则根据时间角度计算距离
                if (arriveTarget) {
                    this.setPos(this._target.x, this._target.y);
                }
                else {
                    // --速度乘以时间得到距离再乘以单位向量得到位移向量 再加上要追赶的距离
                    let offset: number = this._speed * deltaTime
                    this.pos.add(this._ori.normalize().mul(offset));
                }
                //logd("UpdateLocal", this.pos.x, this.pos.y);
            }
            return arriveTarget;
        }

        //ai心跳计时器
        private _action_update_timer: number = 0;
        //ai心跳时间间隔
        private _action_update_interval: number = 0.2;
        update(deltaTime: number) {
            if (this.lockByUFP) {
                // 被功能点接管了
                return;
            }
            if (this.map && this.map.conf) {
                this._action_update_timer += deltaTime;
                if (this._action_update_timer >= this._action_update_interval) {
                    this._actionMgr.updateActions(this._action_update_timer);
                    this._action_update_timer -= this._action_update_interval;
                }
            }
            if (this._moveStatus == MOVE_STATUS_MOVE) {
                let dtime: number = deltaTime
                while (dtime && this._movePath && this._movePath.length != 0) {
                    if (this.updateLocal(dtime)) {
                        dtime = Math.abs(this._targetTimer)
                        this.moveToPath(this._movePath, this._movePathIdx + 2)
                    }
                    else {
                        break;
                    }
                }
                if (this._movePath && this._movePath.length == 0) {
                    this.moveStop();
                }
            }
        }

        // 进入地图
        intoMap(map: Map): void {
            super.intoMap(map);
            this.resetAction();
            if (this._actionMgr.top == null) {
                throw "action is null, type is " + this.gettype();
            }
        }

        //离开地图
        leaveMap(map: Map): void {
            super.leaveMap(map);
            this._actionMgr.clear();
        }

    }
}
