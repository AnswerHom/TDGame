/**
* name 
*/
module tb.gui.page {
	interface ClassMap {
		[index: string]: Object;
	}

	export class PageDef {
		/**加载界面 */
		static LOAD: number = 0;
		/**HUD界面 */
		static HUD: number = 1;

		//页面集合
		private static _pageClassMap: ClassMap = {};

		public static init(): void {
			PageDef._pageClassMap[PageDef.LOAD] = Load;
			PageDef._pageClassMap[PageDef.HUD] = HudPage;
		}

		public static getPageClass(key: number): Object {
			return PageDef._pageClassMap[key];
		}
	}
}