module td.object {
    export class BaseObject {
        static OID: number = 0;
        public oid: number = 0;
        //坐标
        public x: number = 0;
        public y: number = 0;

        public hp: number = 0;//血量
        public attack: number = 0;//伤害
        public defense: number = 0;//防御
        public moveSpeed: number = 0;//移动速度
        // 是否死亡
        protected _isDied: boolean = false;
        get isDied(): boolean {
            return this._isDied;
        }
        set isDied(v: boolean) {
            if (this._isDied == v) {
                return;
            }
            this._isDied = v;
            this.action = ACTION_DEAD;
        }
        public action: number = 0;
        public toward: number = 0;
        private _runTime: number = 0;
        private _sceneRoot: SceneRoot;
        private _idx: number = -1;

        constructor(sceneRoot: SceneRoot) {
            this._sceneRoot = sceneRoot;
            this.oid = BaseObject.OID++;
            this.hp = 100;
            this.attack = 10;
            this.moveSpeed = 25;
            this.action = ACTION_MOVE;
            this.toward = TOWARD_RIGHT;
        }

        update(diff: number) {
            if (this._isDied) return;
            this._runTime += diff;
            if (this.checkLive()) {
                this.checkEnemy(diff);
            } else {
                this.isDied = true;
            }
            switch (this.action) {
                case ACTION_MOVE:
                    let idx = Math.floor(this._runTime / 3000);
                    if (this._idx != idx) {
                        this._idx = idx;
                        this.toward = MathU.randomRange(TOWARD_TOP, TOWARD_RIGHT);
                    }
                    switch (this.toward) {
                        case TOWARD_BOTTOM:
                            this.y += this.moveSpeed * diff / 1000;
                            break;
                        case TOWARD_LEFT:
                            this.x -= this.moveSpeed * diff / 1000;
                            break;
                        case TOWARD_RIGHT:
                            this.x += this.moveSpeed * diff / 1000;
                            break;
                        case TOWARD_TOP:
                            this.y -= this.moveSpeed * diff / 1000;
                            break;
                    }
                    break;
                case ACTION_ATTACK:
                case ACTION_DEAD:
                    break;
            }
        }

        private _attackTime: number = 0;
        private checkEnemy(diff: number): boolean {
            this._attackTime += diff;
            if (this._attackTime < 2000) return;
            this._attackTime = 0;
            let avatars = this._sceneRoot.avatars;
            let len = avatars.length;
            for (let i = 0; i < len; i++) {
                let avatar = avatars[i];
                if (avatar.object.oid != this.oid) {
                    let dis = MathU.getDistance(avatar.object.x, avatar.object.y, this.x, this.y);
                    if (dis <= 50 && !avatar.object.isDied) {
                        //可攻击
                        this.action = ACTION_ATTACK;
                        avatar.object.hp -= this.attack;
                        return true;
                    } else {
                        if (this.action != ACTION_MOVE)
                            this.toward = MathU.randomRange(TOWARD_TOP, TOWARD_RIGHT);
                        this.action = ACTION_MOVE;
                        return false;
                    }
                }
            }
        }

        private checkLive(): boolean {
            return this.hp > 0;
        }
    }
}