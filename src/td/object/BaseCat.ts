module td.object {
    export class BaseCat {
        public hp: number = 0;//血量
        public power: number = 0;//能量进度
        public attack: number = 0;//伤害
        public defense: number = 0;//防御
        public attackRange: Point[] = [];//攻击范围(相对位置)

        constructor() {
            
        }
    }
}