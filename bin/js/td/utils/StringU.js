/**
* name
*/
var td;
(function (td) {
    var utils;
    (function (utils) {
        var StringU = /** @class */ (function () {
            function StringU() {
            }
            StringU.substitute = function (str) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (str == null)
                    return '';
                // Replace all of the parameters in the msg string.
                var len = rest.length;
                var args;
                if (len == 1 && typeof rest[0] == "array") {
                    args = rest[0];
                    len = args.length;
                }
                else {
                    args = rest;
                }
                for (var i = 0; i < len; i++) {
                    str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
                }
                return str;
            };
            /**
             * 字符串是否为空
             * @param str 字符串
             * @return
             *
             */
            StringU.isEmpty = function (str) {
                return str == null || str.length == 0;
            };
            //去左右空格;  
            StringU.trim = function (char) {
                if (char == null) {
                    return null;
                }
                return this.rtrim(this.ltrim(char));
            };
            //去左空格;   
            StringU.ltrim = function (char) {
                if (char == null) {
                    return null;
                }
                var pattern = /^\s*/;
                return char.replace(pattern, "");
            };
            //去右空格;  
            StringU.rtrim = function (char) {
                if (char == null) {
                    return null;
                }
                var pattern = /\s*$/;
                return char.replace(pattern, "");
            };
            //是否为前缀字符串;  
            StringU.beginsWith = function (char, prefix) {
                return (prefix == char.substring(0, prefix.length));
            };
            //是否为后缀字符串;  
            StringU.endsWith = function (char, suffix) {
                return (suffix == char.substring(char.length - suffix.length));
            };
            //获得查询参数
            StringU.getParameter = function (url, paras) {
                if (!url || url.length == 0)
                    return "";
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {};
                for (var i = 0; i < paraString.length; i++) {
                    var j = paraString[i];
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                var returnValue = paraObj[paras.toLowerCase()];
                if (!returnValue || typeof (returnValue) == "undefined") {
                    return "";
                }
                else {
                    return returnValue;
                }
            };
            /**
             * 字符串补位，补充左边
             * @param	str 需要补充的字符串
             * @param   char 需要补充的字符串
             * @param	len 最终长度
             * @return
             */
            StringU.paddingLeft = function (str, char, len) {
                var l = len - str.length;
                if (l <= 0) {
                    return str;
                }
                str = String(str);
                //循环填充
                for (var i = 0; i < l; i++) {
                    str = char + str;
                }
                return str;
            };
            //通过时间戳和格式获得日期文本
            StringU.formatDate = function (date, format) {
                if (!date)
                    return null;
                var o = {
                    "y+": date.getFullYear(),
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S+": date.getMilliseconds()
                };
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return format;
            };
            //数字简写 
            StringU.sampleNum = function (num) {
                if (num <= 99999)
                    return num.toString();
                num = Math.floor(num / 10000);
                if (num <= 99999)
                    return num + "万";
                num = Math.floor(num / 10000);
                return num + "亿";
            };
            /**
             * 替换指定的
             */
            StringU.substituteByIndex = function (str, index, value) {
                if (str == null)
                    return '';
                str = str.replace(new RegExp("\\{" + index + "\\}", "g"), value);
                return str;
            };
            /**加载敏感词汇(禁用)*/
            StringU.loadDisableWords = function () {
                if (StringU.DISABLE_WORDS)
                    return;
                Laya.loader.load(td.Path.ui + "pingbi.txt", Handler.create(this, this.onLoadDisableWords), null, Loader.TEXT);
            };
            /*加载敏感词汇(禁用)完成*/
            StringU.onLoadDisableWords = function () {
                var list = Loader.getRes(td.Path.ui + 'pingbi.txt').split('\r\n');
                if (list[list.length - 1] == "")
                    list.pop();
                StringU.DISABLE_WORDS = list;
            };
            /**检测敏感词汇(禁用)*/
            StringU.checkDisableWords = function (content) {
                var len = content.length;
                var words = StringU.DISABLE_WORDS;
                for (var i = 0; i < words.length; i++) {
                    if (words[i].length > len)
                        continue;
                    if (content.indexOf(words[i]) != -1)
                        return true;
                }
                return false;
            };
            StringU.ToShortString = function (value) {
                if (value < 1.0) {
                    return "0";
                }
                value = Math.floor(value);
                var text = value.toString();
                var length = text.length;
                if (text.length > 3) {
                    var empty = text.substring(0, 3);
                    var num = length % 3;
                    if (num > 0) {
                        var start = empty.substring(0, num);
                        var end = empty.substring(num);
                        empty = start + '.' + end;
                    }
                    var num2 = Math.floor((length - 1) / 3);
                    var empty2 = "";
                    empty2 = StringU.StringUnits[num2];
                    return empty + empty2;
                }
                return text;
            };
            StringU.StringUnits = [
                "",
                "k",
                "m",
                "b",
                "t",
                "q",
                "Q",
                "u",
                "U",
                "s",
                "S",
                "p",
                "P",
                "o",
                "O",
                "n",
                "N",
                "d",
                "D",
                "g",
                "G",
                "h",
                "H",
                "l",
                "L",
                "i",
                "I",
                "j",
                "J",
                "n",
                "N",
                "c",
                "C",
                "x",
                "X",
                "w",
                "W",
                "y",
                "Y",
                "z",
                "Z"
            ];
            return StringU;
        }());
        utils.StringU = StringU;
    })(utils = td.utils || (td.utils = {}));
})(td || (td = {}));
//# sourceMappingURL=StringU.js.map