/**
* name 
*/
module td.object {
    export class BaseObject extends Laya.EventDispatcher {
        guid: string;

        eventMgr: EventManager;

        protected _game: GameApp;
        public get game(): GameApp {
            return this._game;
        }
        constructor(v: GameApp) {
            super();
            this._game = v;
            this.eventMgr = this._game.eventManager;
        }

        update(deltaTime: number): void {

        }
    }
}