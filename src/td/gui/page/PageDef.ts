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

		//页面集合
		private static _pageClassMap: ClassMap = {};

		public static init(): void {
			PageDef._pageClassMap[PageDef.LOAD] = Load;
		}

		public static getPageClass(key: number): Object {
			return PageDef._pageClassMap[key];
		}
	}
}