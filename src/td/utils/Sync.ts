/**
* 同步时间 
*/
module td.utils {
    export class Sync {

		/**
		 * 星期日 
		 */
        public static SUNDAY: number = 0;
		/**
		 * 星期一 
		 */
        public static MONDAY: number = 1;
		/**
		 * 星期二 
		 */
        public static TUESDAY: number = 2;
		/**
		 * 星期三 
		 */
        public static WEDNESDAY: number = 3;
		/**
		 * 星期四 
		 */
        public static THURSDAY: number = 4;
		/**
		 * 星期五 
		 */
        public static FRIDAY: number = 5;
		/**
		 * 星期六 
		 */
        public static SATURDAY: number = 6;

		/**
		 * 一天多少秒
		 */
        public static DAY_SECONDS: number = 86400;
        public static UTC_SECONDS: number = 28800;


        //事件
        private static _date: Date = new Date();


        /*web服务器时间 单位秒*/
        private _serverWebTime: number = 0;
        /*web服务器时间同步的时间单位毫秒*/
        private _ostWeb: number = 0;

        // 应用程序引用
        private _game: GameApp;
        constructor(v: GameApp) {
            this._game = v;
        }

        //初始化
        init(): void {
            // this._game.protocols.syncWebTime();
            this._nextCheckTime = 30000;
        }

		/**
		 * web服务器同步时间
		 */
        syncServerWebTime(value: number): void {
            this._serverWebTime = value;
            this._ostWeb = Laya.timer.currTimer;
            //logd("同步服务器时间", Sync.getTimeStr(this._serverWebTime * 1000), Sync.getTimeStr(this._ostWeb))
        }

		/**
		 * 当前web服务器时间(秒)
		 */
        serverWebTimeBys: number = 0;

        private _nextCheckTime: number = 0;

        update(diff: number): void {
            if (this._serverWebTime) {
                this.serverWebTimeBys = Math.floor(this._serverWebTime + (Laya.timer.currTimer - this._ostWeb) / 1000);
            }
            else {
                this.serverWebTimeBys = Math.floor(Date.now() / 1000);
            }
            if (this._nextCheckTime > diff) {
                this._nextCheckTime -= diff;
            }
            else {
                // this._game.protocols.syncWebTime();
                this._nextCheckTime = 30000;
            }
        }
		/**
		 * 获取小时
		 * @param value  时间戳毫秒
		 */
        public static getHours(value: number): number {
            this._date.setTime(value);
            return this._date.getHours();
        }

		/**
		 * 获取当月天
		 * @param value  时间戳毫秒
		 */
        public static getDays(value: number): number {
            this._date.setTime(value);
            return this._date.getDate();
        }

		/**
		 * 获取时间字符串 2017-3-20 09:09:10
		 * @param value  时间戳毫秒
		 */

        public static getTimeStr(value: number): string {
            this._date.setTime(value);
            return this._date.getFullYear() + "-" + (this._date.getMonth() + 1) + "-" + this._date.getDate() + " " +
                StringU.paddingLeft(this._date.getHours().toString(), "0", 2) + ":" + StringU.paddingLeft(this._date.getMinutes().toString(), "0", 2) + ":" + StringU.paddingLeft(this._date.getSeconds().toString(), "0", 2);
        }

		/**
		 * 获取当前时间戳是否在对应区间内
		 * @param value 当前时间戳秒
		 * @param min 当前时间小值 9：00:00
		 * @param max 当前时间大值 10：00:00
		 */
        public static getTimeByStrMinAndMax(value: number, min: string, max: string) {
            let curTime = value * 1000;

            let minArr = min.split(":");
            let minHH = parseInt(minArr[0]);
            let minMM = parseInt(minArr[1]);
            let minSS = parseInt(minArr[2]);

            this._date.setTime(curTime);
            this._date.setHours(minHH);
            this._date.setMinutes(minMM);
            this._date.setSeconds(minSS);
            let minTime = this._date.getTime();

            let maxArr = max.split(":");
            let maxHH = parseInt(maxArr[0]);
            let maxMM = parseInt(maxArr[1]);
            let maxSS = parseInt(maxArr[2]);

            this._date.setTime(curTime);
            this._date.setHours(maxHH);
            this._date.setMinutes(maxMM);
            this._date.setSeconds(maxSS);
            let maxTime = this._date.getTime();

            if (minTime <= curTime && maxTime >= curTime) {
                return true;
            }

            return false;
        }

		/**
		 * 获取时间字符串 2018.3.20
		 * @param value  时间戳毫秒
		 */

        public static getTimeStr1(value: number): string {
            this._date.setTime(value);
            return this._date.getFullYear() + "." + (this._date.getMonth() + 1) + "." + this._date.getDate();
        }

		/**
		 * 获取时间字符串 3.20
		 * @param value  时间戳毫秒
		 */

        public static getTimeStr2(value: number): string {
            this._date.setTime(value);
            return (this._date.getMonth() + 1) + "." + this._date.getDate();
        }

		/**
		 * 获取星期几
		 * @param value  时间戳毫秒
		 */
        public static getTimeWeekDay(value: number): number {
            this._date.setTime(value);
            return this._date.getDay();
        }

		/**
		 * 获取一个时间戳所在的周一到周日日期
		 */
        public static getTimeWeek(value: number): string {
            let startWeek = 1;//周一开始
            let startDate, endDate;
            let dayWeek = this.getTimeWeekDay(value * 1000);
            dayWeek = dayWeek == 0 ? 7 : dayWeek;

            this._date.setTime(value * 1000);
            let diff = startWeek - dayWeek;
            this._date.setDate(this._date.getDate() + diff);
            startDate = this.getTimeStr2(this._date.getTime());

            this._date.setDate(this._date.getDate() + 6);
            endDate = this.getTimeStr2(this._date.getTime());
            return startDate + "-" + endDate;
        }

		/**
		 * 获取当日时间 秒
		 * @param value  时间毫秒
		 */
        public static getDayTime(value: number): number {
            this._date.setTime(value);
            return this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
        }

		/**
		 * 获取时间字符串 09:09:10
		 * @param value  时间戳毫秒
		 */
        public static getTimeShortStr(value: number): string {
            this._date.setTime(value);
            return Sync.getNumTimeStr(this._date.getUTCHours()) + ":" + Sync.getNumTimeStr((this._date.getUTCMinutes() + 1)) + ":" + Sync.getNumTimeStr(this._date.getUTCSeconds());
        }

		/**
		 * 获取时间字符串 09:09:10:00
		 * @param value  时间戳毫秒
		 */
        public static getTimeShortStr1(value: number): string {
            this._date.setTime(value);
            return this._date.getHours() + ":" + (this._date.getMinutes() + 1) + ":" + this._date.getSeconds() + ":" + this._date.getMilliseconds();
        }

		/**
		 * 获取当日零点时间
		 * @param value  时间戳秒
		 * @return 返回时间秒
		 */
        public static getDayZeroTime(value: number): number {
            this._date.setTime(value * 1000);
            this._date.setHours(0);
            this._date.setMinutes(0);
            this._date.setSeconds(0);
            this._date.setMilliseconds(0);
            return this._date.getTime() / 1000;
        }

		/**
		 * 获取时间字符串 09:09:10
		 * @param value  剩余时间秒
		 */
        public static getTimeShortStr2(value: number): string {
            let h: number = MathU.parseInt(value / 3600);
            value = MathU.parseInt(value % 3600);
            let m: number = MathU.parseInt(value / 60);
            let s: number = MathU.parseInt(value % 60);
            return StringU.paddingLeft(h.toString(), "0", 2) + ":" + StringU.paddingLeft(m.toString(), "0", 2) + ":" + StringU.paddingLeft(s.toString(), "0", 2);
        }

		/**
		 * 获取时间字符串 09:10(分秒)
		 * @param value  剩余时间秒
		 */
        public static getTimeShortStr3(value: number): string {
            let m: number = MathU.parseInt(value / 60);
            let s: number = MathU.parseInt(value % 60);
            return StringU.paddingLeft(m.toString(), "0", 2) + ":" + StringU.paddingLeft(s.toString(), "0", 2);
        }

		/**
		 * 获取时间字符串 09:10(时分)
		 * @param value  剩余时间秒
		 */
        public static getTimeShortStr4(value: number): string {
            let h: number = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            let m: number = MathU.parseInt(value / 60);
            return StringU.paddingLeft(h.toString(), "0", 2) + ":" + StringU.paddingLeft(m.toString(), "0", 2);
        }

		/**
		 * 获取时间字符串 9天9小时9分钟9秒
		 * @param value  剩余时间秒
		 */
        public static getTimeShortStr5(value: number): string {
            let h: number = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            let d: number = MathU.parseInt(h / 24);
            h = h - d * 24;
            let m: number = MathU.parseInt(value / 60);
            let s: number = MathU.parseInt(value % 60);
            let str: string = "";
            if (d > 0) str += d + "天";
            if (h > 0) str += h + "时";
            if (m > 0) str += m + "分";
            str += s + "秒";
            return str;
        }

		/**
		 * 获取时间字符串 几天或几小时或几分钟或几秒
		 * @param value  剩余时间秒
		 */
        public static getTimeShortStr6(value: number): string {
            let h: number = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            let d: number = MathU.parseInt(h / 24);
            if (d > 0) return d + "天";
            h = h - d * 24;
            if (h > 0) return h + "时";
            let m: number = MathU.parseInt(value / 60);
            if (m > 0) return m + "分";
            let s: number = MathU.parseInt(value % 60);
            return s + "秒";
        }

		/**
		 * 获取时间字符串 (分)
		 * @param value  剩余时间秒
		 */
        public static getTimeShortStr10(value: number): string {
            let m: number = MathU.parseInt(value / 60);
            return StringU.paddingLeft(m.toString(), "0", 2);
        }

		/**
		 *获取时间，1200(时，分) 
		 */
        public static getNumTime(value: number): number {
            this._date.setTime(value);
            let hours = this._date.getHours() * 100;
            let minutes = this._date.getMinutes();
            let time = hours + minutes;
            return time;
        }

		/**
		 * 是否当天时间
		 * @param value  时间秒
		 */
        public static getIsToday(value: number, value1: number): boolean {
            this._date.setTime(1000 * value);
            let dayStr = "" + this._date.getFullYear() + this._date.getMonth() + this._date.getDate();
            this._date.setTime(1000 * value1);
            let dayStr1 = "" + this._date.getFullYear() + this._date.getMonth() + this._date.getDate();
            return Boolean(dayStr == dayStr1);
        }

		/**
		 * 获取时间格式字符串 09
		 * @param value  数字
		 */
        public static getNumTimeStr(value: number): string {

            return value < 10 ? "0" + value : value.toString();
        }


		/**
		 * 释放
		 */
        public dispose(): void {
            // this._game.network.removeHanlder(Protocols.MSG_SYNC_MSTIME, this, this._syncFunc);
        }
    }
}