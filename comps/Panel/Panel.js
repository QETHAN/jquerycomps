(function(a){!window.JC&&(window.JC={log:function(){}});window.ZINDEX_COUNT=window.ZINDEX_COUNT||50001;window.Panel=JC.Panel=e;function e(h,f,g,i){typeof h=="string"&&(h=h.trim().replace(/[\r\n]+/g,""));typeof f=="string"&&(f=f.trim().replace(/[\r\n]+/g,""));typeof g=="string"&&(g=g.trim().replace(/[\r\n]+/g,""));if(e.getInstance(h)){return e.getInstance(h)}this._model=new c(h,f,g,i);this._view=new b(this._model);this._init()}e.getInstance=function(f){if(typeof f=="string"&&!/</.test(f)){f=a(f)}if(f&&typeof f=="string"){return}return a(f).data("PanelInstace")};a(document).delegate("div.UPanel","click",function(h){var f=a(this),g=a(h.target||h.srcElement),i;if(g&&g.length&&g.is("[eventtype]")){i=g.attr("eventtype");JC.log(i,f.data("PanelInstace"));i&&f.data("PanelInstace")&&f.data("PanelInstace").trigger(i,g,h)}});e.prototype={_init:function(){var f=this;this._view.getPanel().data("PanelInstace",this);this._model.addEvent("close_default",function(h,g){g._view.close()});this._model.addEvent("show_default",function(h,g){g._view.show()});this._model.addEvent("hide_default",function(h,g){g._view.hide()});this._model.addEvent("confirm_default",function(h,g){g.trigger("close")});this._model.addEvent("cancel_default",function(h,g){g.trigger("close")});return this},on:function(g,f){g&&f&&this._model.addEvent(g,f);return this},show:function(g){var f=this;setTimeout(function(){switch(typeof g){case"number":switch(g){case 0:f.center();break}break;case"object":g=a(g);g.length&&f._view.positionWith(g);if(!f._model.bindedPositionWithEvent){f._model.bindedPositionWithEvent=true;a(window).on("resize",h);f.on("close",function(){f._model.bindedPositionWithEvent=false;a(window).unbind("resize",h)});function h(){f.positionWith(g)}}break}},10);this.trigger("beforeshow",this._view.getPanel());this.trigger("show",this._view.getPanel());return this},positionWith:function(f){f=a(f);f&&f.length&&this._view.positionWith(f);return this},hide:function(){this.trigger("beforehide",this._view.getPanel());this.trigger("hide",this._view.getPanel());return this},close:function(){JC.log("Panel.close");this.trigger("beforeclose",this._view.getPanel());this.trigger("close",this._view.getPanel());return this},dispose:function(){JC.log("Panel.dispose");this._view.close();return this},center:function(){this.trigger("beforecenter",this._view.getPanel());this._view.center();this.trigger("center",this._view.getPanel());return this},selector:function(){return this._view.getPanel()},layout:function(){return this._view.getPanel()},find:function(f){return this.layout().find(f)},trigger:function(j,h){JC.log("Panel.trigger",j);var g=this,f=this._model.getEvent(j),i=true;if(f&&f.length){h&&(h=a(h))&&h.length&&(h=h[0]);a.each(f,function(l,m){if(m.call(h,j,g)===false){return i=false}})}if(i){var k=this._model.getEvent(j+"_default");if(k&&k.length){a.each(k,function(l,m){if(m.call(h,j,g)===false){return false}})}}return this},header:function(g){if(typeof g!="undefined"){this._view.getHeader(g)}var f=this._view.getHeader();if(f&&f.length){g=f.html()}return g||""},body:function(g){if(typeof g!="undefined"){this._view.getBody(g)}var f=this._view.getBody();if(f&&f.length){g=f.html()}return g||""},footer:function(g){if(typeof g!="undefined"){this._view.getFooter(g)}var f=this._view.getFooter();if(f&&f.length){g=f.html()}return g||""},panel:function(g){if(typeof g!="undefined"){this._view.getPanel(g)}var f=this._view.getPanel();if(f&&f.length){g=f.html()}return g||""}};function c(h,f,g,i){this.selector=h;this.headers=f;this.bodys=g;this.footers=i;this.panel;this._events={};this._init()}c.prototype={_init:function(){var f=typeof this.selector!="undefined"?a(this.selector):undefined;if(f&&f.length){this.selector=f;JC.log("user tpl",this.selector.parent().length);if(!this.selector.parent().length){this.selector.appendTo(a(document.body))}}else{if(!f||f.length===0){this.footers=this.bodys;this.bodys=this.headers;this.headers=this.selector;this.selector=undefined}}return this},addEvent:function(g,f){if(!(g&&f)){return}g&&(g=g.toLowerCase());if(!(g in this._events)){this._events[g]=[]}if(/\_default/i.test(g)){this._events[g].unshift(f)}else{this._events[g].push(f)}},getEvent:function(f){return this._events[f]}};function b(f){this._model=f;this._tpl=d;this._init()}b.prototype={_init:function(){if(!this._model.panel){if(this._model.selector){this._model.panel=this._model.selector}else{this._model.panel=a(this._tpl);this._model.panel.appendTo(document.body)}}this.getHeader();this.getBody();this.getFooter();return this},positionWith:function(i){if(!(i&&i.length)){return}this.getPanel().css({left:"-9999px",top:"-9999px",display:"block",position:"absolute"});var t=i.offset(),u=i.prop("offsetWidth"),m=i.prop("offsetHeight");var l=this.getPanel().prop("offsetWidth"),s=this.getPanel().prop("offsetHeight");var h=a(window).width(),o=a(window).height();var r=a(document).scrollTop(),q=a(document).scrollLeft();var k=t.left+q,j=t.top+m+1;var n=r+o-s,f=r;if(j>n){j=t.top-s-1}if(j<f){j=r}var p=q+h-l,g=q;if(k>p){k=q+h-l-1}if(k<g){k=q}this.getPanel().css({left:k+"px",top:j+"px"})},show:function(){this.getPanel().css({"z-index":ZINDEX_COUNT++}).show()},hide:function(){this.getPanel().hide()},close:function(){JC.log("Panel._view.close()");this.getPanel().remove()},getPanel:function(f){if(typeof f!="undefined"){this.getPanel().html(f)}return this._model.panel},getHeader:function(f){var g=this.getPanel().find("div.UPContent > div.hd");if(typeof f!="undefined"){this._model.headers=f}if(typeof this._model.headers!="undefined"){if(!g.length){this.getPanel().find("div.UPContent > div.bd").before(g=a('<div class="hd">弹出框</div>'))}g.html(this._model.headers);this._model.headers=undefined}return g},getBody:function(f){var g=this.getPanel().find("div.UPContent > div.bd");if(typeof f!="undefined"){this._model.bodys=f}if(typeof this._model.bodys!="undefined"){g.html(this._model.bodys);this._model.bodys=undefined}return g},getFooter:function(f){var g=this.getPanel().find("div.UPContent > div.ft");if(typeof f!="undefined"){this._model.footers=f}if(typeof this._model.footers!="undefined"){if(!g.length){this.getPanel().find("div.UPContent > div.bd").after(g=a('<div class="ft" ></div>'))}g.html(this._model.footers);this._model.footers=undefined}return g},center:function(){var n=this.getPanel(),m=n.width(),h=n.height(),k,i,f=a(window).width(),j=a(window).height(),l=a(document).scrollLeft(),g=a(document).scrollTop();n.css({left:"-9999px",top:"-9999px"}).show();k=(f-m)/2+l;i=(j-h)/2+g;if((j-h-100)>300){i-=100}JC.log((j-h/2-100));if((i+h-g)>j){JC.log("y overflow");i=g+j-h}if(i<g||i<0){i=g}n.css({left:k+"px",top:i+"px"});JC.log(m,h,f,j)}};var d=['<div class="UPanel" style="width: 600px;">','    <div class="UPContent">','        <div class="bd"></div>','        <span class="close" eventtype="close"></span>',"    </div><!--end UPContent-->","</div>"].join("");JC.hideAllPanel=function(f){if(f){a("div.UPanel").remove()}else{a("div.UPanel").hide()}}}(jQuery));(function(a){JC.msgbox=function(e,c,h,g,f){if(typeof c=="number"){h=c;c=null}if(typeof g=="number"){f=g;g=null}var d=b.popup(JC.msgbox.tpl||b.tpls.msgbox,e,c,h);g&&d.on("close",g);JC.msgbox.timeout&&clearTimeout(JC.msgbox.timeout);JC.msgbox.timeout=setTimeout(function(){d.close()},f||JC.msgbox.closeMs);return d};JC.msgbox.closeMs=2000;JC.msgbox.tpl;JC.msgbox.timeout;JC.alert=function(d,c,f,e){if(typeof c=="number"){f=c;c=null}return b.popup(JC.alert.tpl||b.tpls.alert,d,c,f,e)};JC.alert.tpl;JC.confirm=function(d,c,f,e){if(typeof c=="number"){f=c;c=null}return b.popup(JC.confirm.tpl||b.tpls.confirm,d,c,f,e)};JC.confirm.tpl;JC.hideAllPopup=function(c){if(c){a("body > div.UPanelPopup_identifer").remove()}else{a("body > div.UPanelPopup_identifer").hide()}};var b={minWidth:180,maxWidth:500,xoffset:9,yoffset:3,popupIdentifier:function(c){if(!c){a("body > div.UPanelPopup_identifer").remove();a("body > div.UPanel_TMP").remove()}else{c.selector().addClass("UPanelPopup_identifer");c.selector().data("PopupInstance",c)}},popup:function(f,e,c,h,g){if(!e){return}b.popupIdentifier();c&&(c=a(c));var f=f.replace(/\{msg\}/g,e).replace(/\{status\}/g,b.getStatusClass(h||""));var d=new JC.Panel(f);b.popupIdentifier(d);d.selector().data("popupSrc",c);b.fixWidth(e,d);g&&d.on("confirm",g);if(!c){d.center()}d.on("show_default",function(){JC.log("user show_default");if(c&&c.length){b.showEffect(d,c,function(){});return false}});d.on("close_default",function(){JC.log("user close_default");if(c&&c.length){b.hideEffect(d,c,function(){d.selector().remove();d=null})}else{d.selector().remove()}return false});d.on("hide_default",function(){JC.log("user hide_default");if(c&&c.length){b.hideEffect(d,c,function(){d.selector().hide()});return false}else{d.selector().hide()}});if(c&&c.length){d.selector().css({left:"-9999px",top:"-9999px"})}d.selector().css("z-index",window.ZINDEX_COUNT++);d.show();return d},hideEffect:function(l,d,c){d&&(d=a(d));if(!(d&&d.length)){return}var j=d.offset(),e=l.selector();var g=e[0];g.interval&&clearInterval(g.interval);g.defaultWidth&&e.width(g.defaultWidth);g.defaultHeight&&e.height(g.defaultHeight);var f=d.width(),k=e.height();g.defaultWidth=e.width();g.defaultHeight=e.height();var i=b.getLeft(j.left,f,e.width());var h=b.getTop(j.top,d.height(),k);h=h-k-b.yoffset;e.height(0);e.css({left:i+"px"});g.interval=easyEffect(function(m){e.css({top:h+m+"px",height:k-m+"px"});if(k===m){e.hide()}},k)},showEffect:function(d,e){e&&(e=a(e));if(!(e&&e.length)){return}var k=e.offset(),f=d.selector();var h=f[0];h.interval&&clearInterval(h.interval);h.defaultWidth&&f.width(h.defaultWidth);h.defaultHeight&&f.height(h.defaultHeight);var g=e.width(),c=f.height();h.defaultWidth=f.width();h.defaultHeight=f.height();var j=b.getLeft(k.left,g,f.width());var i=b.getTop(k.top,e.height(),c,b.xoffset);f.height(0);f.css({left:j+"px"});JC.log(i,k.top);if(i>k.top){h.interval=easyEffect(function(l){f.css({top:i-c-b.yoffset+"px",height:l+"px"})},c)}else{h.interval=easyEffect(function(l){f.css({top:i-l-b.yoffset+"px",height:l+"px"})},c)}},onresize:function(e){if(!e.selector().is(":visible")){return}var h=e.selector(),f=h.data("popupSrc");if(!(f&&f.length)){e.center()}else{var k=f.offset();var p=k.top,i=f.height(),n=h.height(),d=0,g=k.left,l=f.width(),o=h.width(),m=0;var j=b.getLeft(g,l,o,m)+b.xoffset;var c=b.getTop(p,i,n,d)-n-b.yoffset;h.css({left:j+"px",top:c+"px"})}},getTop:function(d,g,i,f){var e=d,h=a(document).scrollTop(),c=a(window).height()-i;e-i<h&&(e=d+g+i+f);return e},getLeft:function(h,g,f,e){e==undefined&&(e=5);var d=h+g/2+e-f/2,c=a(document).scrollLeft(),i=a(window).width()+c-f;d>i&&(d=i-2);d<c&&(d=c+1);return d},fixWidth:function(d,c){var f=a('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+d+"</div>").appendTo("body"),e=f.width()+80;f.remove();e>b.maxWidth&&(e=b.maxWidth);e<b.minWidth&&(e=b.minWidth);c.selector().css("width",e)},getStatusClass:function(c){var d="UPanelSuccess";switch(c){case 0:d="UPanelSuccess";break;case 1:d="UPanelError";break;case 2:d="UPanelAlert";break}return d},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};a(document).on("click",function(d){var i=a(d.target||d.srcElement),f=i.attr("paneltype"),c=i.attr("panelmsg"),g;if(!(f&&c)){return}f=f.toLowerCase();i.prop("nodeName")&&i.prop("nodeName").toLowerCase()=="a"&&d.preventDefault();var j=(parseInt(i.attr("panelstatus"),10)||0),h=i.attr("panelcallback"),e=i.attr("panelcancelcallback");h&&(h=window[h]);e&&(e=window[e]);if(!(f in JC)){return}g=JC[f](c,i,j);if(f=="msgbox"){h&&g.on("close",h)}else{h&&g.on("confirm",h)}if(e){g.on("cancel",e)}});a(window).on("resize",function(c){a("body > div.UPanelPopup_identifer").each(function(){var d=a(this);d.data("PopupInstance")&&b.onresize(d.data("PopupInstance"))})})}(jQuery));(function(d){window.ZINDEX_COUNT=window.ZINDEX_COUNT||50001;var b=!!window.ActiveXObject&&!window.XMLHttpRequest;var c=window.Dialog=JC.Dialog=function(g,e,f,i){if(a.timeout){clearTimeout(a.timeout)}if(JC.Panel.getInstance(g)){JC.Panel.getInstance(g).center().show();return JC.Panel.getInstance(g)}a.dialogIdentifier();var h=new JC.Panel(g,e,f,i);a.dialogIdentifier(h);a.showMask();h.selector().css("z-index",window.ZINDEX_COUNT++);h.on("close_default",function(j,k){a.hideMask()});h.on("hide_default",function(j,k){a.hideMask()});h.on("show_default",function(j,k){a.showMask()});a.timeout=setTimeout(function(){h.show(0)},a.showMs);return h};JC.Dialog.msgbox=function(g,e,j,i){if(!g){return}var h=(JC.Dialog.msgbox.tpl||a.tpls.msgbox).replace(/\{msg\}/g,g).replace(/\{status\}/g,a.getStatusClass(e||""));var f=JC.Dialog(h);a.fixWidth(g,f);j&&f.on("close",j);JC.Dialog.msgbox.timeout&&clearTimeout(JC.Dialog.msgbox.timeout);JC.Dialog.msgbox.timeout=setTimeout(function(){f.close()},i||JC.Dialog.msgbox.closeMs);return f};JC.Dialog.msgbox.closeMs=2000;JC.Dialog.msgbox.tpl;JC.Dialog.msgbox.timeout;JC.Dialog.alert=function(f,e,i){if(!f){return}var h=(JC.Dialog.alert.tpl||a.tpls.alert).replace(/\{msg\}/g,f).replace(/\{status\}/g,a.getStatusClass(e||""));var g=JC.Dialog(h);a.fixWidth(f,g);i&&g.on("confirm",i);return g};JC.Dialog.alert.tpl;JC.Dialog.confirm=function(f,e,i){if(!f){return}var h=(JC.Dialog.confirm.tpl||a.tpls.confirm).replace(/\{msg\}/g,f).replace(/\{status\}/g,a.getStatusClass(e||""));var g=JC.Dialog(h);a.fixWidth(f,g);i&&g.on("confirm",i);return g};JC.Dialog.confirm.tpl;JC.Dialog.mask=function(e){!e&&a.showMask();e&&a.hideMask()};var a={timeout:null,showMs:10,minWidth:180,maxWidth:500,dialogIdentifier:function(e){if(!e){a.hideMask();d("body > div.UPanelDialog_identifer").hide();d("body > div.UPanel_TMP").remove()}else{e.selector().addClass("UPanelDialog_identifer");e.selector().data("DialogInstance",e)}},showMask:function(){var f=d("#UPanelMask"),e=d("#UPanelMaskIfrmae");if(!f.length){d(a.tpls.mask).appendTo("body");f=d("#UPanelMask"),e=d("#UPanelMaskIfrmae")}e.show();f.show();a.setMaskSizeForIe6();e.css("z-index",window.ZINDEX_COUNT++);f.css("z-index",window.ZINDEX_COUNT++)},hideMask:function(){var f=d("#UPanelMask"),e=d("#UPanelMaskIfrmae");if(f.length){f.hide()}if(e.length){e.hide()}},setMaskSizeForIe6:function(){var f=d("#UPanelMask"),e=d("#UPanelMaskIfrmae");if(!(f.length&&e.length)){return}var g={position:"absolute",top:"0px",left:d(document).scrollLeft()+"px",height:d(document).height()+"px",width:d(window).width()+"px"};f.css(g);e.css(g)},getStatusClass:function(e){var f="UPanelSuccess";switch(e){case 0:f="UPanelSuccess";break;case 1:f="UPanelError";break;case 2:f="UPanelAlert";break}return f},fixWidth:function(f,e){var h=d('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+f+"</div>").appendTo("body"),g=h.width()+80;g>a.maxWidth&&(g=a.maxWidth);g<a.minWidth&&(g=a.minWidth);e.selector().css("width",g)},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),mask:['<div id="UPanelMask" class="UPanelMask"></div>','<iframe src="about:blank" id="UPanelMaskIfrmae"',' frameborder="0" class="UPanelMaskIframe"></iframe>'].join("")}};d(document).on("click",function(f){var j=d(f.target||f.srcElement),i=j.attr("paneltype"),e=j.attr("panelmsg"),l;if(!(i&&e)){return}i=i.toLowerCase();if(!/dialog\./.test(i)){return}i=i.replace(/.*?\./,"");j.prop("nodeName")&&j.prop("nodeName").toLowerCase()=="a"&&f.preventDefault();var k=(parseInt(j.attr("panelstatus"),10)||0),h=j.attr("panelcallback"),g=j.attr("panelcancelcallback");h&&(h=window[h]);g&&(g=window[g]);if(!(i in JC.Dialog)){return}l=JC.Dialog[i](e,k);if(i=="msgbox"){h&&l.on("close",h)}else{h&&l.on("confirm",h)}if(g){l.on("cancel",g)}});d(window).on("resize scroll",function(e){d("body > div.UPanelDialog_identifer").each(function(){var f=d(this);if(f.data("DialogInstance")){if(!f.data("DialogInstance").selector().is(":visible")){return}if(e.type.toLowerCase()=="resize"){f.data("DialogInstance").center()}a.setMaskSizeForIe6()}})})}(jQuery));