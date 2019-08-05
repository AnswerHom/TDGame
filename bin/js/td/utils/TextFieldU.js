/** 文本工具
* name 王谦
*/
var td;
(function (td) {
    var utils;
    (function (utils) {
        var HTMLDivElement = laya.html.dom.HTMLDivElement;
        var TextFieldU = (function () {
            function TextFieldU() {
            }
            /**
             * 设置html文本
             * @param txt 文本对象
             * @param htmlText html文本内容
             */
            TextFieldU.setHtmlText = function (txt, htmlText, isContent) {
                if (isContent === void 0) { isContent = true; }
                if (!txt)
                    return null;
                if (!(txt instanceof Laya.Text) && !(txt instanceof Laya.Label))
                    return null;
                var html = TextFieldU.findHtmlDiv(txt);
                var reg = new RegExp("<(S*?)[^>]*>.*?|<.*? />");
                if (!htmlText || !reg.test(htmlText)) {
                    if (html) {
                        html.removeChildren();
                        if (!htmlText)
                            txt.removeChild(html);
                    }
                    txt["text"] = htmlText || "";
                    if (txt instanceof Laya.Label)
                        txt = txt.textField;
                    if (isContent)
                        return [txt["textWidth"] + 8, txt["textHeight"] + 5];
                    else
                        return [txt.width, txt.height];
                }
                if (!html) {
                    html = new laya.html.dom.HTMLDivElement();
                    html.style.color = txt["color"];
                    html.style.stroke = txt["stroke"];
                    html.style.strokeColor = txt["strokeColor"];
                    html.style.fontSize = txt["fontSize"];
                    html.style.font = txt["font"];
                    html.style.leading = txt["leading"];
                    html.style.height = txt["height"];
                    html.style.bold = txt["bold"];
                    html.width = txt["width"];
                    html.style.align = txt["align"];
                    txt.addChild(html);
                }
                else {
                    html.removeChildren();
                }
                var strArr = htmlText.split("&");
                var align;
                if (strArr.length == 2) {
                    align = strArr[1];
                    if (align && (align == "left" || align == "center" || align == "right"))
                        html.style.align = align;
                    html.innerHTML = strArr[0];
                }
                else
                    html.innerHTML = htmlText;
                html.layout();
                txt["text"] = "";
                if (isContent)
                    return [html.contextWidth, html.contextHeight];
                else
                    return [html.width, html.height];
            };
            /**
             * 设置html文本
             * @param txt 文本对象
             * @param htmlText html文本内容
             */
            TextFieldU.setHtmlEmName = function (txt, htmlText, isContent) {
                if (isContent === void 0) { isContent = true; }
                if (!txt)
                    return null;
                if (!(txt instanceof Laya.Text) && !(txt instanceof Laya.Label))
                    return null;
                var html = TextFieldU.findHtmlDiv(txt);
                // let reg:RegExp = new RegExp("<(S*?)[^>]*>.*?|<.*? />");
                if (!htmlText /* || !reg.test(htmlText)*/) {
                    if (html) {
                        html.removeChildren();
                        if (!htmlText)
                            txt.removeChild(html);
                    }
                    txt["text"] = htmlText || "";
                    if (txt instanceof Laya.Label)
                        txt = txt.textField;
                    if (isContent)
                        return [txt["textWidth"] + 8, txt["textHeight"] + 5];
                    else
                        return [txt.width, txt.height];
                }
                if (!html) {
                    html = new laya.html.dom.HTMLDivElement();
                    html.style.color = txt["color"];
                    html.style.stroke = txt["stroke"];
                    html.style.strokeColor = txt["strokeColor"];
                    html.style.fontSize = txt["fontSize"];
                    html.style.font = txt["font"];
                    html.style.leading = txt["leading"];
                    html.style.height = txt["height"];
                    html.style.bold = txt["bold"];
                    html.width = txt["width"];
                    html.style.align = txt["align"];
                    txt.addChild(html);
                }
                else {
                    html.removeChildren();
                }
                var strArr = htmlText.split("&");
                var align;
                if (strArr.length == 2) {
                    align = strArr[1];
                    if (align && (align == "left" || align == "center" || align == "right"))
                        html.style.align = align;
                    html.innerHTML = strArr[0];
                }
                else
                    html.innerHTML = htmlText;
                html.layout();
                txt["text"] = "";
                if (isContent)
                    return [html.contextWidth, html.contextHeight];
                else
                    return [html.width, html.height];
            };
            //搜索html对象
            TextFieldU.findHtmlDiv = function (txt) {
                var node;
                for (var i = 0; i < txt.numChildren; i++) {
                    node = txt.getChildAt(i);
                    if (node instanceof HTMLDivElement)
                        return node;
                }
                return null;
            };
            /**
             * 创建文本
             * @param text 文本内容
             * @param props 文本属性{color:null,fontSize:12,stroke:0,strokeColor:null,postion:Vector2,x:0,y:0,width:0,height:0,alpha:1,scale:1,scaleX:1,scaleY:1,anchor:0,anchorX:0,anchorY:0,center:NaN,centerX:NaN,centerY:NaN,parent:null}
             */
            TextFieldU.createLabel = function (text, props) {
                if (text === void 0) { text = null; }
                if (props === void 0) { props = null; }
                var txt = new Label(text);
                if (props) {
                    utils.DisplayU.setCompAttr(txt, props);
                    if (props.hasOwnProperty("color"))
                        txt.color = props.color; //颜色
                    if (props.hasOwnProperty("fontSize"))
                        txt.fontSize = props.fontSize; //字号
                    if (props.hasOwnProperty("stroke"))
                        txt.stroke = props.stroke; //描边宽度
                    if (props.hasOwnProperty("strokeColor"))
                        txt.strokeColor = props.strokeColor; //描边颜色
                }
                return txt;
            };
            /**清理文本(不能再使用):清理父节点。引用、事件监听、timer监听、子对象*/
            TextFieldU.clearLabel = function (txt) {
                if (txt)
                    txt.destroy(true);
                return null;
            };
            return TextFieldU;
        }());
        utils.TextFieldU = TextFieldU;
    })(utils = td.utils || (td.utils = {}));
})(td || (td = {}));
//# sourceMappingURL=TextFieldU.js.map