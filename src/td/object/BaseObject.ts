module td.object {
    export class BaseObject {
        public hp: number = 0;//血量
        public attack: number = 0;//伤害
        public defense: number = 0;//防御

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
        }

        constructor() {

        }
    }
}