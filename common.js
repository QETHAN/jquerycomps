!String.prototype.trim&&(String.prototype.trim=function(){return $.trim(this)});function printf(a){for(var c=1,b=arguments.length;c<b;c++){a=a.replace(new RegExp("\\{"+(c-1)+"\\}","g"),arguments[c])}return a}function has_url_param(a,b){var c=false;if(!b){b=a;a=location.href}if(/\?/.test(a)){a=a.split("?");a=a[a.length-1];a=a.split("&");for(var e=0,d=a.length;e<d;e++){if(a[e].split("=")[0].toLowerCase()==b.toLowerCase()){c=true;break}}}return c}function add_url_params(a,c){var b="";!c&&(c=a,a=location.href);a.indexOf("#")>-1&&(b=a.split("#")[1],a=a.split("#")[0]);for(var d in c){a=del_url_param(a,d);a.indexOf("?")>-1?a+="&"+d+"="+c[d]:a+="?"+d+"="+c[d]}b&&(a+="#"+b);a=a.replace(/\?\&/g,"?");return a}function get_url_param(b,d){var e="",c,a,f;!d&&(d=b,b=location.href);b.indexOf("#")>-1&&(b=b.split("#")[0]);if(b.indexOf("?")>-1){c=b.split("?")[1].split("&");for(a=0;a<c.length;a++){f=c[a].split("=");f[0]=f[0].replace(/^\s+|\s+$/g,"");if(f[0].toLowerCase()==d.toLowerCase()){e=f[1];break}}}return e}function del_url_param(f,c){var b="",d,a=[],e,g;!c&&(c=f,f=location.href);f.indexOf("#")>-1&&(b=f.split("#")[1],f=f.split("#")[0]);if(f.indexOf("?")>-1){d=f.split("?")[1].split("&");f=f.split("?")[0];for(e=0;e<d.length;e++){items=d[e].split("=");items[0]=items[0].replace(/^\s+|\s+$/g,"");if(items[0].toLowerCase()==c.toLowerCase()){continue}a.push(items.join("="))}f+="?"+a.join("&")}b&&(f+="#"+b);return f}function httpRequire(a){a=a||"本示例需要HTTP环境";if(/file\:|\\/.test(location.href)){alert(a);return false}return true}function removeUrlSharp(c,a){var b=c.replace(/\#[\s\S]*/,"");!a&&(b=add_url_params(b,{rnd:new Date().getTime()}));return b}function reload_page(c,a,b){b=b||0;setTimeout(function(){c=removeUrlSharp(c||location.href,a);!a&&(c=add_url_params(c,{rnd:new Date().getTime()}));location.href=c},b)}function parse_finance_num(b,a){b=parseFloat(b)||0;if(b&&a){b=Math.floor(b*Math.pow(10,a))/Math.pow(10,a)}return b}function pad_char_f(a,b,c){b=b||2;c=c||"0";a+="";if(a.length>a){return a}a=new Array(b+1).join(c)+a;return a.slice(a.length-b)}function formatISODate(a,b){a=a||new Date();typeof b=="undefined"&&(b="-");return[a.getFullYear(),pad_char_f(a.getMonth()+1),pad_char_f(a.getDate())].join(b)}function parseISODate(a){if(!a){return}a=a.replace(/[^\d]+/g,"");var b;if(a.length===8){b=new Date(a.slice(0,4),parseInt(a.slice(4,6),10)-1,parseInt(a.slice(6),10))}return b}function cloneDate(a){var b=new Date();b.setTime(a.getTime());return b}function isSameDay(b,a){return[b.getFullYear(),b.getMonth(),b.getDate()].join()===[a.getFullYear(),a.getMonth(),a.getDate()].join()}function isSameMonth(b,a){return[b.getFullYear(),b.getMonth()].join()===[a.getFullYear(),a.getMonth()].join()}function maxDayOfMonth(c){var a,b=new Date(c.getFullYear(),c.getMonth()+1);b.setDate(b.getDate()-1);a=b.getDate();return a}function script_path_f(){var a=document.getElementsByTagName("script"),a=a[a.length-1],b=a.getAttribute("src");if(/\//.test(b)){b=b.split("/");b.pop();b=b.join("/")+"/"}else{if(/\\/.test(b)){b=b.split("\\");b.pop();b=b.join("\\")+"/"}}return b}function easyEffect(h,d,j,c,f){var b=new Date(),g,d=d||200,j=j||0,e=0,i,c=c||200,f=f||2;var a=setInterval(function(){g=new Date()-b;e=g/c*d;e+=j;if(e>d){e=d;i=true;clearInterval(a)}h&&h(e,i)},f);return a}function parseBool(a){if(typeof a=="string"){a=a.replace(/[\s]/g,"").toLowerCase();if(a&&(a=="false"||a=="0"||a=="null"||a=="undefined")){a=false}else{if(a){a=true}}}return !!a};