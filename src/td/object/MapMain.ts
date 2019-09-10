/**
* name 主地图
*/
module td.object {
    export class MapMain extends Map {

        private _movePath = [672, 1533, 181, 1276, 559, 1078, 468, 1023, 498, 988, 181, 813, 678, 550, 517, 467, 714, 362];
        private _movePathRevert = [714, 362, 517, 467, 678, 550, 181, 813, 498, 988, 468, 1023, 559, 1078, 181, 1276, 672, 1533];
        private _maxCars: number = 3;
        constructor(v: GameApp, id: number) {
            super(v, id)
        }

        private _ramdonTime: number = 0;
        private _countTime: number = 0;
        protected afterUpdate(diff: number): void {
            if (!this.conf)
                return;
        }
    }
}