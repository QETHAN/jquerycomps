(function(c){window.Panel=JC.Panel=b;function b(g,i,j,h){typeof g=="string"&&(g=g.trim().replace(/[\r\n]+/g,""));typeof i=="string"&&(i=i.trim().replace(/[\r\n]+/g,""));typeof j=="string"&&(j=j.trim().replace(/[\r\n]+/g,""));if(b.getInstance(g)){return b.getInstance(g)}this._model=new f(g,i,j,h);this._view=new e(this._model);this._init()}b.getInstance=function(g){if(typeof g=="string"&&!/</.test(g)){g=c(g)}if(g&&typeof g=="string"){return}return c(g).data("PanelInstace")};b.focusButton=true;b.clickClose=true;b.autoCloseMs=2000;b._fixWidth=function(l,k,i,j){var h=c('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+l+"</div>").appendTo("body"),g=h.width()+80;h.remove();i=i||200;j=j||500;g>j&&(g=j);g<i&&(g=i);k.selector().css("width",g)};b._getButton=function(g){var h=[];if(g){h.push('<div style="text-align:center" class="UButton"> ');if(g>=1){h.push('<button type="button" eventtype="confirm">确定</button>')}if(g>=2){h.push('<button type="button" eventtype="cancel">取消</button>')}h.push("</div>")}return h.join("")};b.prototype={_init:function(){var g=this;g._view.getPanel().data("PanelInstace",g);g._model.addEvent("close_default",function(h,i){i._view.close()});g._model.addEvent("show_default",function(h,i){i._view.show()});g._model.addEvent("hide_default",function(h,i){i._view.hide()});g._model.addEvent("confirm_default",function(h,i){i.trigger("close")});g._model.addEvent("cancel_default",function(h,i){i.trigger("close")});g._model.panelautoclose()&&g.autoClose();return g},on:function(h,g){h&&g&&this._model.addEvent(h,g);return this},show:function(h,i){var g=this;setTimeout(function(){switch(typeof h){case"number":switch(h){case 0:g.center();break}break;case"object":h=c(h);h.length&&g._view.positionWith(h,i);if(!g._model.bindedPositionWithEvent){g._model.bindedPositionWithEvent=true;c(window).on("resize",j);g.on("close",function(){g._model.bindedPositionWithEvent=false;c(window).unbind("resize",j)});function j(){g.positionWith(h,i)}}break}},10);this.trigger("beforeshow",this._view.getPanel());this.trigger("show",this._view.getPanel());return this},positionWith:function(h,g){h=c(h);h&&h.length&&this._view.positionWith(h,g);return this},hide:function(){this.trigger("beforehide",this._view.getPanel());this.trigger("hide",this._view.getPanel());return this},close:function(){JC.log("Panel.close");this.trigger("beforeclose",this._view.getPanel());this.trigger("close",this._view.getPanel());return this},isClickClose:function(){return this._model.panelclickclose()},clickClose:function(g){g&&this.layout()&&this.layout().removeAttr("panelclickclose");!g&&this.layout()&&this.layout().attr("panelclickclose",true);return this},addAutoClose:function(){this.clickClose.apply(this,sliceArgs(arguments));return this},autoClose:function(h,j){if(typeof h=="number"){j=h;h=null}var g=this,i;j=g._model.panelautoclosems(j);b._autoCloseTimeout&&clearTimeout(b._autoCloseTimeout);g.on("close",function(){b._autoCloseTimeout&&clearTimeout(b._autoCloseTimeout)});b._autoCloseTimeout=setTimeout(function(){h&&g.on("close",h);g.close()},j);return this},focusButton:function(){this._view.focusButton();return this},dispose:function(){JC.log("Panel.dispose");this._view.close();return this},center:function(){this.trigger("beforecenter",this._view.getPanel());this._view.center();this.trigger("center",this._view.getPanel());return this},selector:function(){return this._view.getPanel()},layout:function(){return this._view.getPanel()},find:function(g){return this.layout().find(g)},trigger:function(i,l){JC.log("Panel.trigger",i);var g=this,k=this._model.getEvent(i),h=true;if(k&&k.length){l&&(l=c(l))&&l.length&&(l=l[0]);c.each(k,function(n,m){if(m.call(l,i,g)===false){return h=false}})}if(h){var j=this._model.getEvent(i+"_default");if(j&&j.length){c.each(j,function(n,m){if(m.call(l,i,g)===false){return false}})}}return this},header:function(h){if(typeof h!="undefined"){this._view.getHeader(h)}var g=this._view.getHeader();if(g&&g.length){h=g.html()}return h||""},body:function(h){if(typeof h!="undefined"){this._view.getBody(h)}var g=this._view.getBody();if(g&&g.length){h=g.html()}return h||""},footer:function(h){if(typeof h!="undefined"){this._view.getFooter(h)}var g=this._view.getFooter();if(g&&g.length){h=g.html()}return h||""},panel:function(h){if(typeof h!="undefined"){this._view.getPanel(h)}var g=this._view.getPanel();if(g&&g.length){h=g.html()}return h||""}};function f(g,i,j,h){this.selector=g;this.headers=i;this.bodys=j;this.footers=h;this.panel;this._events={};this._init()}f.prototype={_init:function(){var g=this,h=typeof this.selector!="undefined"?c(this.selector):undefined;b.ignoreClick=true;if(h&&h.length){this.selector=h;JC.log("user tpl",this.selector.parent().length);if(!this.selector.parent().length){g.selector.appendTo(c(document.body));window.jcAutoInitComps&&jcAutoInitComps(g.selector)}}else{if(!h||h.length===0){this.footers=this.bodys;this.bodys=this.headers;this.headers=this.selector;this.selector=undefined}}setTimeout(function(){b.ignoreClick=false},1);return this},addEvent:function(h,g){if(!(h&&g)){return}h&&(h=h.toLowerCase());if(!(h in this._events)){this._events[h]=[]}if(/\_default/i.test(h)){this._events[h].unshift(g)}else{this._events[h].push(g)}},getEvent:function(g){return this._events[g]},panelfocusbutton:function(){var g=b.focusButton;if(this.panel.is("[panelfocusbutton]")){g=parseBool(this.panel.attr("panelfocusbutton"))}return g},panelclickclose:function(){var g=b.clickClose;if(this.panel.is("[panelclickclose]")){g=parseBool(this.panel.attr("panelclickclose"))}return g},panelautoclose:function(){var g;if(this.panel.is("[panelautoclose]")){g=parseBool(this.panel.attr("panelautoclose"))}return g},panelautoclosems:function(g){var h=b.autoCloseMs;if(this.panel.is("[panelautoclosems]")){h=parseInt(this.panel.attr("panelautoclosems"),10)}typeof g=="number"&&(h=g);return h}};function e(g){this._model=g;this._tpl=a;this._init()}e.prototype={_init:function(){if(!this._model.panel){if(this._model.selector){this._model.panel=this._model.selector}else{this._model.panel=c(this._tpl);this._model.panel.appendTo(document.body);window.jcAutoInitComps&&jcAutoInitComps(this._model.panel)}}this.getHeader();this.getBody();this.getFooter();return this},positionWith:function(i,m){if(!(i&&i.length)){return}this.getPanel().css({left:"-9999px",top:"-9999px",display:"block",position:"absolute"});var u=i.offset(),v=i.prop("offsetWidth"),k=i.prop("offsetHeight");var r=this.getPanel().prop("offsetWidth"),o=this.getPanel().prop("offsetHeight");var h=c(window).width(),j=c(window).height();var n=c(document).scrollTop(),l=c(document).scrollLeft();var q=u.left+l,p=u.top+k+1;if(typeof m!="undefined"){switch(m){case"top":p=u.top-o-1;q=u.left+v/2-r/2;break}}var s=n+j-o,w=n;if(p>s){p=u.top-o-1}if(p<w){p=n}var t=l+h-r,g=l;if(q>t){q=l+h-r-1}if(q<g){q=l}this.getPanel().css({left:q+"px",top:p+"px"})},show:function(){this.getPanel().css({"z-index":ZINDEX_COUNT++}).show()},focusButton:function(){if(!this._model.panelfocusbutton()){return}var g=this.getPanel().find("input[eventtype=confirm], input[type=submit], button[eventtype=confirm], button[type=submit]");!g.length&&(g=this.getPanel().find("input[eventtype=cancel], input[type=buton], button[eventtype=cancel], button[type=button]"));g.length&&c(g[0]).focus()},hide:function(){this.getPanel().hide()},close:function(){JC.log("Panel._view.close()");this.getPanel().remove()},getPanel:function(g){if(typeof g!="undefined"){this.getPanel().html(g)}return this._model.panel},getHeader:function(g){var h=this.getPanel().find("div.UPContent > div.hd");if(typeof g!="undefined"){this._model.headers=g}if(typeof this._model.headers!="undefined"){if(!h.length){this.getPanel().find("div.UPContent > div.bd").before(h=c('<div class="hd">弹出框</div>'))}h.html(this._model.headers);this._model.headers=undefined}return h},getBody:function(g){var h=this.getPanel().find("div.UPContent > div.bd");if(typeof g!="undefined"){this._model.bodys=g}if(typeof this._model.bodys!="undefined"){h.html(this._model.bodys);this._model.bodys=undefined}return h},getFooter:function(g){var h=this.getPanel().find("div.UPContent > div.ft");if(typeof g!="undefined"){this._model.footers=g}if(typeof this._model.footers!="undefined"){if(!h.length){this.getPanel().find("div.UPContent > div.bd").after(h=c('<div class="ft" ></div>'))}h.html(this._model.footers);this._model.footers=undefined}return h},center:function(){var o=this.getPanel(),n=o.width(),i=o.height(),l,j,g=c(window).width(),k=c(window).height(),m=c(document).scrollLeft(),h=c(document).scrollTop();o.css({left:"-9999px",top:"-9999px"}).show();l=(g-n)/2+m;j=(k-i)/2+h;if((k-i-100)>300){j-=100}JC.log((k-i/2-100));if((j+i-h)>k){JC.log("y overflow");j=h+k-i}if(j<h||j<0){j=h}o.css({left:l+"px",top:j+"px"});JC.log(n,i,g,k)}};var a=['<div class="UPanel" style="width: 600px;">','    <div class="UPContent">','        <div class="bd"></div>','        <span class="close" eventtype="close"></span>',"    </div><!--end UPContent-->","</div>"].join("");JC.hideAllPanel=function(g){c("div.UPanel").each(function(){var h=c(this),i=b.getInstance(h);if(!i){return}i.hide();g&&i.close()})};JC.hideAllPopup=function(g){c("body > div.UPanelPopup_identifer").each(function(){var h=c(this),i=b.getInstance(h);if(!i){return}i.hide();g&&i.close()})};c(document).delegate("div.UPanel","click",function(g){var i=c(this),j=c(g.target||g.srcElement),h;if(j&&j.length&&j.is("[eventtype]")){h=j.attr("eventtype");JC.log(h,i.data("PanelInstace"));h&&i.data("PanelInstace")&&i.data("PanelInstace").trigger(h,j,g)}});c(document).delegate("div.UPanel","click",function(h){var g=c(this),i=b.getInstance(g);if(i&&i.isClickClose()){h.stopPropagation()}});c(document).on("click",function(g){if(b.ignoreClick){return}c("div.UPanel").each(function(){var h=c(this),i=b.getInstance(h);if(i&&i.isClickClose()&&i.layout()&&i.layout().is(":visible")){i.hide();i.close()}})});c(document).on("keyup",function(g){var h=g.keyCode;switch(h){case 27:JC.hideAllPanel(1);break}});var d={alert:null,confirm:null,msgbox:null,"dialog.alert":null,"dialog.confirm":null,"dialog.msgbox":null,panel:null,dialog:null};c(document).on("click",function(h){var i=c(h.target||h.srcElement),v=i.attr("paneltype"),p=i.attr("panelmsg"),r=i.is("[panelmsgbox]")?parentSelector(i,i.attr("panelmsgbox")):null;if(!(v&&(p||(r&&r.length)))){return}v=v.toLowerCase();if(!v in d){return}i.prop("nodeName")&&i.prop("nodeName").toLowerCase()=="a"&&h.preventDefault();var m,g=(parseInt(i.attr("panelstatus"),10)||0),w=i.attr("panelcallback"),t=i.attr("panelcancelcallback"),u=i.attr("panelclosecallback"),k=parseInt(i.attr("panelbutton"),10)||0,j=i.attr("panelheader")||"",l=i.is("[panelheaderbox]")?parentSelector(i,i.attr("panelheaderbox")):null,o=i.attr("panelfooter")||"",s=i.is("[panelfooterbox]")?parentSelector(i,i.attr("panelfooterbox")):null,n=i.is("[panelhideclose]")?parseBool(i.attr("panelhideclose")):false;r&&(p=scriptContent(r)||p);l&&l.length&&(j=scriptContent(l)||o);s&&s.length&&(o=scriptContent(s)||o);i.prop("nodeName")&&i.prop("nodeName").toLowerCase()=="a"&&h.preventDefault();w&&(w=window[w]);u&&(u=window[u]);switch(v){case"alert":JC.alert&&(m=JC.alert(p,i,g));break;case"confirm":JC.confirm&&(m=JC.confirm(p,i,g));break;case"msgbox":JC.msgbox&&(m=JC.msgbox(p,i,g));break;case"dialog.alert":JC.Dialog&&JC.Dialog.alert&&(m=JC.Dialog.alert(p,g));break;case"dialog.confirm":JC.Dialog&&JC.Dialog.confirm&&(m=JC.Dialog.confirm(p,g));break;case"dialog.msgbox":JC.Dialog&&JC.Dialog.msgbox&&(m=JC.Dialog.msgbox(p,g));break;case"panel":case"dialog":var q="";if(v=="panel"){m=new b(j,p+b._getButton(k),o)}else{if(!JC.Dialog){return}m=JC.Dialog(j,p+b._getButton(k),o)}m.on("beforeshow",function(x,y){!j&&y.find("div.hd").hide();!j&&y.find("div.ft").hide();b._fixWidth(p,m);n&&y.find("span.close").hide()});v=="panel"&&m.show(i,"top");break}if(!m){return}if(/msgbox/i.test(v)){w&&m.on("close",w)}else{w&&m.on("confirm",w)}u&&m.on("close",u);t&&m.on("cancel",t)})}(jQuery));(function(a){JC.msgbox=function(h,g,f,e,d){if(typeof g=="number"){f=g;g=null}if(typeof e=="number"){d=e;e=null}var c=b.popup(JC.msgbox.tpl||b.tpls.msgbox,h,g,f);e&&c.on("close",e);setTimeout(function(){c.autoClose(d)},1);return c};JC.msgbox.tpl;JC.alert=function(f,e,d,c){if(typeof e=="number"){d=e;e=null}return b.popup(JC.alert.tpl||b.tpls.alert,f,e,d,c)};JC.alert.tpl;JC.confirm=function(f,e,d,c){if(typeof e=="number"){d=e;e=null}return b.popup(JC.confirm.tpl||b.tpls.confirm,f,e,d,c)};JC.confirm.tpl;var b={minWidth:180,maxWidth:500,xoffset:9,yoffset:3,popupIdentifier:function(d){var c;if(!d){a("body > div.UPanelPopup_identifer").each(function(){var e=a(this),f=Panel.getInstance(e);if(!f){return}f.hide();f.close()});a("body > div.UPanel_TMP").remove()}else{d.selector().addClass("UPanelPopup_identifer");d.selector().data("PopupInstance",d)}},popup:function(d,h,g,f,e){if(!h){return}b.popupIdentifier();g&&(g=a(g));var d=d.replace(/\{msg\}/g,h).replace(/\{status\}/g,b.getStatusClass(f||""));var c=new JC.Panel(d);b.popupIdentifier(c);c.selector().data("popupSrc",g);b.fixWidth(h,c);e&&c.on("confirm",e);if(!g){c.center()}c.on("show_default",function(){JC.log("user show_default");if(g&&g.length){b.showEffect(c,g,function(){c.focusButton()});return false}});c.on("close_default",function(){JC.log("user close_default");if(g&&g.length){b.hideEffect(c,g,function(){c.selector().remove();c=null})}else{c.selector().remove()}return false});c.on("hide_default",function(){JC.log("user hide_default");if(g&&g.length){b.hideEffect(c,g,function(){c.selector().hide()});return false}else{c.selector().hide()}});if(g&&g.length){c.selector().css({left:"-9999px",top:"-9999px"})}c.selector().css("z-index",window.ZINDEX_COUNT++);c.show();return c},hideEffect:function(d,f,e){f&&(f=a(f));if(!(f&&f.length)){e&&e(d);return}if(!(d&&d.selector)){return}var l=f.offset(),g=d.selector();var i=g[0];i.interval&&clearInterval(i.interval);i.defaultWidth&&g.width(i.defaultWidth);i.defaultHeight&&g.height(i.defaultHeight);var h=f.width(),c=g.height();i.defaultWidth=g.width();i.defaultHeight=g.height();var k=b.getLeft(l.left,h,g.width());var j=b.getTop(l.top,f.height(),c);j=j-c-b.yoffset;g.height(0);g.css({left:k+"px"});i.interval=easyEffect(function(m,n){g.css({top:j+m+"px",height:c-m+"px"});if(f&&!f.is(":visible")){clearInterval(i.interval);e&&e(d)}if(c===m){g.hide()}n&&e&&e(d)},c)},showEffect:function(d,f,e){f&&(f=a(f));if(!(f&&f.length)){return}if(!(d&&d.selector)){return}var l=f.offset(),g=d.selector();var i=g[0];i.interval&&clearInterval(i.interval);i.defaultWidth&&g.width(i.defaultWidth);i.defaultHeight&&g.height(i.defaultHeight);var h=f.width(),c=g.height();i.defaultWidth=g.width();i.defaultHeight=g.height();var k=b.getLeft(l.left,h,g.width());var j=b.getTop(l.top,f.height(),c,b.xoffset);g.height(0);g.css({left:k+"px"});JC.log(j,l.top);if(j>l.top){i.interval=easyEffect(function(m,n){g.css({top:j-c-b.yoffset+"px",height:m+"px"});n&&e&&e(d)},c)}else{i.interval=easyEffect(function(m,n){g.css({top:j-m-b.yoffset+"px",height:m+"px"});n&&e&&e(d)},c)}},onresize:function(c){if(!c.selector().is(":visible")){return}var f=c.selector(),d=f.data("popupSrc");if(!(d&&d.length)){c.center()}else{var g=d.offset();var l=g.top,o=d.height(),j=f.height(),n=0,e=g.left,h=d.width(),k=f.width(),i=0;var p=b.getLeft(e,h,k,i)+b.xoffset;var m=b.getTop(l,o,j,n)-j-b.yoffset;f.css({left:p+"px",top:m+"px"})}},getTop:function(h,f,c,e){var i=h,g=a(document).scrollTop(),d=a(window).height()-c;i-c<g&&(i=h+f+c+e);return i},getLeft:function(g,f,i,e){e==undefined&&(e=5);var h=g+f/2+e-i/2,d=a(document).scrollLeft(),c=a(window).width()+d-i;h>c&&(h=c-2);h<d&&(h=d+1);return h},fixWidth:function(f,e){var d=a('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+f+"</div>").appendTo("body"),c=d.width()+80;d.remove();c>b.maxWidth&&(c=b.maxWidth);c<b.minWidth&&(c=b.minWidth);e.selector().css("width",c)},getStatusClass:function(c){var d="UPanelSuccess";switch(c){case 0:d="UPanelSuccess";break;case 1:d="UPanelError";break;case 2:d="UPanelAlert";break}return d},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};a(window).on("resize",function(c){a("body > div.UPanelPopup_identifer").each(function(){var d=a(this);d.data("PopupInstance")&&b.onresize(d.data("PopupInstance"))})})}(jQuery));(function(b){var d=!!window.ActiveXObject&&!window.XMLHttpRequest;var a=window.Dialog=JC.Dialog=function(e,h,i,g){if(c.timeout){clearTimeout(c.timeout)}if(JC.Panel.getInstance(e)){c.timeout=setTimeout(function(){JC.Panel.getInstance(e).show(0)},c.showMs);return JC.Panel.getInstance(e)}c.dialogIdentifier();var f=new JC.Panel(e,h,i,g);c.dialogIdentifier(f);c.showMask();f.selector().css("z-index",window.ZINDEX_COUNT++);f.on("close_default",function(j,k){c.hideMask()});f.on("hide_default",function(j,k){c.hideMask()});f.on("show_default",function(j,k){c.showMask();setTimeout(function(){c.showMask();f.selector().css({"z-index":window.ZINDEX_COUNT++,display:"block"})},1)});c.timeout=setTimeout(function(){f.show(0)},c.showMs);return f};JC.Dialog.msgbox=function(j,i,h,g){if(!j){return}var f=(JC.Dialog.msgbox.tpl||c.tpls.msgbox).replace(/\{msg\}/g,j).replace(/\{status\}/g,c.getStatusClass(i||""));var e=JC.Dialog(f);c.fixWidth(j,e);h&&e.on("close",h);setTimeout(function(){e.autoClose(g)},1);return e};JC.Dialog.msgbox.tpl;JC.Dialog.alert=function(i,h,g){if(!i){return}var f=(JC.Dialog.alert.tpl||c.tpls.alert).replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(h||""));var e=JC.Dialog(f);c.fixWidth(i,e);g&&e.on("confirm",g);return e};JC.Dialog.alert.tpl;JC.Dialog.confirm=function(i,h,g){if(!i){return}var f=(JC.Dialog.confirm.tpl||c.tpls.confirm).replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(h||""));var e=JC.Dialog(f);c.fixWidth(i,e);g&&e.on("confirm",g);return e};JC.Dialog.confirm.tpl;JC.Dialog.mask=function(e){!e&&c.showMask();e&&c.hideMask()};var c={timeout:null,showMs:10,minWidth:180,maxWidth:500,dialogIdentifier:function(e){if(!e){c.hideMask();b("body > div.UPanelDialog_identifer").each(function(){var f=b(this),g=Panel.getInstance(f);if(!g){return}g.hide();g.close()});b("body > div.UPanel_TMP").remove()}else{e.selector().addClass("UPanelDialog_identifer");e.selector().data("DialogInstance",e)}},showMask:function(){var f=b("#UPanelMask"),e=b("#UPanelMaskIfrmae");if(!f.length){b(c.tpls.mask).appendTo("body");f=b("#UPanelMask"),e=b("#UPanelMaskIfrmae")}e.show();f.show();c.setMaskSizeForIe6();e.css("z-index",window.ZINDEX_COUNT++);f.css("z-index",window.ZINDEX_COUNT++)},hideMask:function(){var f=b("#UPanelMask"),e=b("#UPanelMaskIfrmae");if(f.length){f.hide()}if(e.length){e.hide()}},setMaskSizeForIe6:function(){var g=b("#UPanelMask"),f=b("#UPanelMaskIfrmae");if(!(g.length&&f.length)){return}var e={position:"absolute",top:"0px",left:b(document).scrollLeft()+"px",height:b(document).height()+"px",width:b(window).width()+"px"};g.css(e);f.css(e)},getStatusClass:function(e){var f="UPanelSuccess";switch(e){case 0:f="UPanelSuccess";break;case 1:f="UPanelError";break;case 2:f="UPanelAlert";break}return f},fixWidth:function(h,g){var f=b('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+h+"</div>").appendTo("body"),e=f.width()+80;e>c.maxWidth&&(e=c.maxWidth);e<c.minWidth&&(e=c.minWidth);g.selector().css("width",e)},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),mask:['<div id="UPanelMask" class="UPanelMask"></div>','<iframe src="about:blank" id="UPanelMaskIfrmae"',' frameborder="0" class="UPanelMaskIframe"></iframe>'].join("")}};b(window).on("resize scroll",function(e){b("body > div.UPanelDialog_identifer").each(function(){var f=b(this);if(f.data("DialogInstance")){if(!f.data("DialogInstance").selector().is(":visible")){return}if(e.type.toLowerCase()=="resize"){f.data("DialogInstance").center()}c.setMaskSizeForIe6()}})})}(jQuery));