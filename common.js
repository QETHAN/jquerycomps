!String.prototype.trim&&(String.prototype.trim=function(){return $.trim(this)});window.ZINDEX_COUNT=window.ZINDEX_COUNT||50001;function sliceArgs(b){var d=[],c,a;for(c=0,a=b.length;c<a;c++){d.push(b[c])}return d}function printf(c){for(var b=1,a=arguments.length;b<a;b++){c=c.replace(new RegExp("\\{"+(b-1)+"\\}","g"),arguments[b])}return c}function has_url_param(c,d){var e=false;if(!d){d=c;c=location.href}if(/\?/.test(c)){c=c.split("?");c=c[c.length-1];c=c.split("&");for(var b=0,a=c.length;b<a;b++){if(c[b].split("=")[0].toLowerCase()==d.toLowerCase()){e=true;break}}}return e}function add_url_params(c,a){var d="";!a&&(a=c,c=location.href);c.indexOf("#")>-1&&(d=c.split("#")[1],c=c.split("#")[0]);for(var b in a){c=del_url_param(c,b);c.indexOf("?")>-1?c+="&"+b+"="+a[b]:c+="?"+b+"="+a[b]}d&&(c+="#"+d);c=c.replace(/\?\&/g,"?");return c}function get_url_param(d,f){var a="",e,c,b;!f&&(f=d,d=location.href);d.indexOf("#")>-1&&(d=d.split("#")[0]);if(d.indexOf("?")>-1){e=d.split("?")[1].split("&");for(c=0;c<e.length;c++){b=e[c].split("=");b[0]=b[0].replace(/^\s+|\s+$/g,"");if(b[0].toLowerCase()==f.toLowerCase()){a=b[1];break}}}return a}function del_url_param(b,f){var e="",g,d=[],a,c;!f&&(f=b,b=location.href);b.indexOf("#")>-1&&(e=b.split("#")[1],b=b.split("#")[0]);if(b.indexOf("?")>-1){g=b.split("?")[1].split("&");b=b.split("?")[0];for(a=0;a<g.length;a++){items=g[a].split("=");items[0]=items[0].replace(/^\s+|\s+$/g,"");if(items[0].toLowerCase()==f.toLowerCase()){continue}d.push(items.join("="))}b+="?"+d.join("&")}e&&(b+="#"+e);return b}function httpRequire(a){a=a||"本示例需要HTTP环境";if(/file\:|\\/.test(location.href)){alert(a);return false}return true}function removeUrlSharp(b,c){var a=b.replace(/\#[\s\S]*/,"");!c&&(a=add_url_params(a,{rnd:new Date().getTime()}));return a}function reload_page(b,c,a){a=a||0;setTimeout(function(){b=removeUrlSharp(b||location.href,c);!c&&(b=add_url_params(b,{rnd:new Date().getTime()}));location.href=b},a)}function parse_finance_num(b,a){b=parseFloat(b)||0;if(b&&a){b=Math.floor(b*Math.pow(10,a))/Math.pow(10,a)}return b}function pad_char_f(c,a,b){a=a||2;b=b||"0";c+="";if(c.length>c){return c}c=new Array(a+1).join(b)+c;return c.slice(c.length-a)}function formatISODate(a,b){a=a||new Date();typeof b=="undefined"&&(b="-");return[a.getFullYear(),pad_char_f(a.getMonth()+1),pad_char_f(a.getDate())].join(b)}function parseISODate(a){if(!a){return}a=a.replace(/[^\d]+/g,"");var b;if(a.length===8){b=new Date(a.slice(0,4),parseInt(a.slice(4,6),10)-1,parseInt(a.slice(6),10))}return b}function cloneDate(a){var b=new Date();b.setTime(a.getTime());return b}function isSameDay(b,a){return[b.getFullYear(),b.getMonth(),b.getDate()].join()===[a.getFullYear(),a.getMonth(),a.getDate()].join()}function isSameMonth(b,a){return[b.getFullYear(),b.getMonth()].join()===[a.getFullYear(),a.getMonth()].join()}function maxDayOfMonth(b){var c,a=new Date(b.getFullYear(),b.getMonth()+1);a.setDate(a.getDate()-1);c=a.getDate();return c}function script_path_f(){var a=document.getElementsByTagName("script"),a=a[a.length-1],b=a.getAttribute("src");if(/\//.test(b)){b=b.split("/");b.pop();b=b.join("/")+"/"}else{if(/\\/.test(b)){b=b.split("\\");b.pop();b=b.join("\\")+"/"}}return b}function easyEffect(j,f,b,e,h){var d=new Date(),i,f=f||200,b=b||0,f=f-b,g=0,a,e=e||200,h=h||2;var c=setInterval(function(){i=new Date()-d;g=i/e*f;g;if(g>=f){g=f;a=true;clearInterval(c)}j&&j(g+b,a)},h);return c}function parseBool(a){if(typeof a=="string"){a=a.replace(/[\s]/g,"").toLowerCase();if(a&&(a=="false"||a=="0"||a=="null"||a=="undefined")){a=false}else{if(a){a=true}}}return !!a}window.jQuery&&jQuery.support&&(jQuery.support.isFixed=(function(g){try{var d,f=g(document.documentElement),c=g("<div style='position:fixed;top:100px;visibility:hidden;'>x</div>").appendTo(f),e=f[0].style.height,a=window;f.height(screen.height*2+"px");a.scrollTo(0,100);d=c[0].getBoundingClientRect().top===100;f.height(e);c.remove();a.scrollTo(0,0);return d}catch(b){}})(jQuery));function mousewheelEvent(c,a){var b=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";document.attachEvent&&(b="on"+b);if(a){document.detachEvent&&document.detachEvent(b,c);document.removeEventListener&&document.removeEventListener(b,c)}else{document.attachEvent&&document.attachEvent(b,c);document.addEventListener&&document.addEventListener(b,c)}}function getJqParent(a,c){a=$(a);var b;if(c){while((a=a.parent()).length){if(a.is(c)){b=a;break}}}else{b=a.parent()}return b}function parentSelector(h,d,f){h&&(h=$(h));if(/\,/.test(d)){var b,g;d=d.split(",");$.each(d,function(k,j){j=j.trim();g=parentSelector(h,j,f);g&&g.length&&(b&&b.length?(b=$([b,g])):(b=g));window.JC&&JC.log&&JC.log(b.length+", "+g.length+", "+j)});return b}var e=/^([\/]+)/,c=/^([\|]+)/,a=/^([<]+)/;if(e.test(d)){d=d.replace(e,function(l,k){for(var n=0,m=k.length;n<m;n++){h=h.parent()}f=h;return""});d=d.trim();return d?f.find(d):f}else{if(c.test(d)){d=d.replace(c,function(l,k){for(var n=1,m=k.length;n<m;n++){h=h.parent()}f=h;return""});d=d.trim();return d?f.find(d):f}else{if(a.test(d)){d=d.replace(a,"").trim();if(d){if(/[\s]/.test(d)){var i;d.replace(/^([^\s]+)([\s\S]+)/,function(k,j,l){i=getJqParent(h,j).find(l.trim())});return i||d}else{return getJqParent(h,d)}}else{return h.parent()}}else{return f?f.find(d):jQuery(d)}}}}function scriptContent(a){var b="";a&&(a=$(a)).length&&(b=a.html().trim().replace(/[\r\n]/g,""));return b};