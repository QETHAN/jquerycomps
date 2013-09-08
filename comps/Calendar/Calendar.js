(function(a){window.Calendar=JC.Calendar=d;function d(e){if(d.getInstance(e)){return d.getInstance(e)}d.getInstance(e,this);var f=d.type(e);JC.log("Calendar init:",f,new Date().getTime());switch(f){case"week":this._model=new d.WeekModel(e);this._view=new d.WeekView(this._model);break;case"month":this._model=new d.MonthModel(e);this._view=new d.MonthView(this._model);break;case"season":this._model=new d.SeasonModel(e);this._view=new d.SeasonView(this._model);break;default:this._model=new d.Model(e);this._view=new d.View(this._model);break}this._init()}d.prototype={_init:function(){var e=this;e._initHanlderEvent();a([e._view,e._model]).on("BindEvent",function(f,h,g){e.on(h,g)});a([e._view,e._model]).on("TriggerEvent",function(f,h){var g=sliceArgs(arguments).slice(2);e.trigger(h,g)});e._model.init();e._view.init();return e},_initHanlderEvent:function(){var e=this;e.on(d.Model.INITED,function(f){e._model.calendarinited()&&e._model.calendarinited().call(e._model.selector(),e._model.layout(),e)});e.on(d.Model.SHOW,function(f){e._model.calendarshow()&&e._model.calendarshow().call(e._model.selector(),e._model.selector(),e)});e.on(d.Model.HIDE,function(f){e._model.calendarhide()&&e._model.calendarhide().call(e._model.selector(),e._model.selector(),e)});e.on(d.Model.UPDATE,function(f){if(!e._model.selector()){return}e._model.selector().blur();e._model.selector().trigger("change");var h=[],r=e._model.selector().val().trim(),g,m,o,p,n,q;if(r){o=r.split(",");for(var l=0,k=o.length;l<k;l++){p=o[l].replace(/[^\d]/g,"");if(p.length==16){n=parseISODate(p.slice(0,8));q=parseISODate(p.slice(8))}else{if(p.length==8){n=parseISODate(p.slice(0,8));q=cloneDate(n)}}if(l===0){g=cloneDate(n);m=cloneDate(q)}h.push({start:n,end:q})}}e._model.calendarupdate()&&e._model.calendarupdate().apply(e._model.selector(),[g,m]);e._model.multiselect()&&e._model.calendarupdatemultiselect()&&e._model.calendarupdatemultiselect().call(e._model.selector(),h,e)});e.on(d.Model.CLEAR,function(f){e._model.calendarclear()&&e._model.calendarclear().call(e._model.selector(),e._model.selector(),e)});e.on(d.Model.CANCEL,function(f){e._model.calendarcancel()&&e._model.calendarcancel().call(e._model.selector(),e._model.selector(),e)});e.on(d.Model.LAYOUT_CHANGE,function(f){e._model.calendarlayoutchange()&&e._model.calendarlayoutchange().call(e._model.selector(),e._model.selector(),e)});e.on(d.Model.UPDATE_MULTISELECT,function(f){e._model.multiselect()&&e._model.calendarupdatemultiselect()&&e._model.calendarupdatemultiselect().call(e._model.selector(),e._model.selector(),e)});return e},show:function(){d.hide();d.lastIpt=this._model.selector();this._view.show();this.trigger(d.Model.SHOW);return this},hide:function(){this._view.hide();this.trigger(d.Model.HIDE);this.selector()&&this.selector().blur();return this},selector:function(){return this._model.selector()},layout:function(){return this._model.layout()},on:function(f,e){a(this).on(f,e);return this},trigger:function(f,e){a(this).trigger(f,e);return this},updateLayout:function(){this._view.updateLayout();return this},updateSelector:function(e){d.lastIpt=e;this._model&&this._model.selector(e);return this},updateYear:function(e){this._view&&this._view.updateYear(e);this.trigger(d.Model.LAYOUT_CHANGE);return this},updateMonth:function(e){this._view&&this._view.updateMonth(e);this.trigger(d.Model.LAYOUT_CHANGE);return this},updateSelected:function(e){JC.log("JC.Calendar: updateSelector",new Date().getTime());this._view&&this._view.updateSelected(e);return this},updatePosition:function(){this._view&&this._view.updatePosition();return this},clear:function(){var e=!this._model.selector().val().trim();this._model&&this._model.selector().val("");!e&&this.trigger(d.Model.CLEAR);return this},cancel:function(){this.trigger(d.Model.CANCEL);this._view&&this._view.hide();return this},visible:function(){var f,e;this._model&&(e=this._model.layout())&&(f=e.is(":visible"));return f},defaultDate:function(e){return this._model.defaultDate(e)}};d.getInstance=function(e,g){typeof e=="string"&&!/</.test(e)&&(e=a(e));if(!(e&&e.length)||(typeof e=="string")){return}var f=d.type(e);typeof g!="undefined"&&(d._ins[f]=g);d._ins[f]&&d._ins[f].updateSelector(e);return d._ins[f]};d._ins={};d.type=function(e){e=a(e);var g,f=a.trim(e.attr("multidate")||"").toLowerCase()||a.trim(e.attr("datatype")||"").toLowerCase();switch(f){case"week":case"month":case"season":g=f;break;default:g="date";break}return g};d.isCalendar=function(e){e=a(e);var f=0;if(e.length){if(e.hasClass("UXCCalendar_btn")){f=1}if(e.prop("nodeName")&&e.attr("datatype")&&(e.prop("nodeName").toLowerCase()=="input"||e.prop("nodeName").toLowerCase()=="button")&&(e.attr("datatype").toLowerCase()=="date"||e.attr("datatype").toLowerCase()=="week"||e.attr("datatype").toLowerCase()=="month"||e.attr("datatype").toLowerCase()=="season"||e.attr("datatype").toLowerCase()=="year"||e.attr("datatype").toLowerCase()=="daterange")){f=1}if(e.prop("nodeName")&&e.attr("multidate")&&(e.prop("nodeName").toLowerCase()=="input"||e.prop("nodeName").toLowerCase()=="button")){f=1}}return f};d.isCalendarElement=function(e){return d.isCalendar(e)};d.pickDate=function(e){e=a(e);if(!(e&&e.length)){return}var f,g=e.is("[ignoreprocess]");e.attr("ignoreprocess",true);e.blur();!g&&e.removeAttr("ignoreprocess");f=d.getInstance(e);!f&&(f=new d(e));f.show();return};d.autoInit=true;d.defaultDateSpan=20;d.lastIpt=null;d.tpl="";d.layoutInitedCallback=null;d.layoutShowCallback=null;d.layoutHideCallback=null;d.domClickFilter=null;d.hide=function(){for(var e in d._ins){d._ins[e]&&d._ins[e].visible()&&d._ins[e].hide()}};d.getDate=function(e){return d.getInstance(e).defaultDate()};d.cnWeek="日一二三四五六";d.cnUnit="十一二三四五六七八九";d.getCnNum=function(e){var f=d.cnUnit.charAt(e%10);e>10&&(f=(e%10!==0?d.cnUnit.charAt(0):"")+f);e>19&&(f=d.cnUnit.charAt(Math.floor(e/10))+f);return f};d.position=function(e){d.getInstance(e)&&d.getInstance(e).updatePosition()};d.setPosition=d.position;d.initTrigger=function(e){e.each(function(){var g=a(this),f=(g.prop("nodeName")||"").toLowerCase();if(f!="input"){d.initTrigger(e.find(a("input[type=text]")));return}if(!(a.trim(g.attr("datatype")||"").toLowerCase()=="date"||a.trim(g.attr("multidate")||"")||a.trim(g.attr("datatype")||"").toLowerCase()=="daterange")){return}var h=g.find("+ input.UXCCalendar_btn");if(!h.length){g.after(h=a('<input type="button" class="UXCCalendar_btn"  />'))}h.data(d.Model.INPUT,g)})};d.clone=function(f,g){var e;if(f){for(e in c.prototype){f.prototype[e]=c.prototype[e]}}if(g){for(e in b.prototype){g.prototype[e]=b.prototype[e]}}};function c(e){this._selector=e}d.Model=c;d.Model.INPUT="CalendarInput";d.Model.INITED="CalendarInited";d.Model.SHOW="CalendarShow";d.Model.HIDE="CalendarHide";d.Model.UPDATE="CalendarUpdate";d.Model.CLEAR="CalendarClear";d.Model.CANCEL="CalendarCancel";d.Model.LAYOUT_CHANGE="CalendarLayoutChange";d.Model.UPDATE_MULTISELECT="CalendarUpdateMultiSelect";c.prototype={init:function(){return this},selector:function(e){typeof e!="undefined"&&(this._selector=e);return this._selector},layout:function(){var f=a("#UXCCalendar");if(!f.length){f=a(d.tpl||this.tpl).hide();f.attr("id","UXCCalendar").hide().appendTo(document.body);var e=a(['<option value="0">一月</option>','<option value="1">二月</option>','<option value="2">三月</option>','<option value="3">四月</option>','<option value="4">五月</option>','<option value="5">六月</option>','<option value="6">七月</option>','<option value="7">八月</option>','<option value="8">九月</option>','<option value="9">十月</option>','<option value="10">十一月</option>','<option value="11">十二月</option>'].join("")).appendTo(f.find("select.UMonth"))}return f},startYear:function(f){var e=d.defaultDateSpan,g=f.date.getFullYear();this.selector().is("[calendardatespan]")&&(e=parseInt(this.selector().attr("calendardatespan"),10));return g-e},endYear:function(f){var e=d.defaultDateSpan,g=f.date.getFullYear();this.selector().is("[calendardatespan]")&&(e=parseInt(this.selector().attr("calendardatespan"),10));return g+e},currentcanselect:function(){var e=true;this.selector().is("[currentcanselect]")&&(currentcanselect=parseBool(this.selector().attr("currentcanselect")));return e},year:function(){return parseInt(this.layout().find("select.UYear").val(),10)||1},month:function(){return parseInt(this.layout().find("select.UMonth").val(),10)||0},day:function(){var f,e=new Date();f=this.layout().find("td.cur > a[date], td.cur > a[dstart]");if(f.length){e.setTime(f.attr("date")||f.attr("dstart"))}JC.log("dddddd",e.getDate());return e.getDate()},defaultDate:function(){var e=this,f={date:null,minvalue:null,maxvalue:null,enddate:null,multidate:null};e.selector()&&(f=e.multiselect()?e.defaultMultiselectDate(f):e.defaultSingleSelectDate(f));f.minvalue=parseISODate(e.selector().attr("minvalue"));f.maxvalue=parseISODate(e.selector().attr("maxvalue"));return f},defaultSingleSelectDate:function(h){var e=this,f=e.selector(),g;if(g=parseISODate(f.val())){h.date=g}else{if(f.val()&&(g=f.val().replace(/[^\d]/g,"")).length==16){h.date=parseISODate(g.slice(0,8));h.enddate=parseISODate(g.slice(8))}else{g=new Date();h.date=new Date(g.getFullYear(),g.getMonth(),g.getDate())}}return h},defaultMultiselectDate:function(f){var e=this;return f},layoutDate:function(){return this.multiselect()?this.multiLayoutDate():this.singleLayoutDate()},singleLayoutDate:function(){var e=this,h=e.defaultDate(),g=this.day(),f;h.date.setDate(1);h.date.setFullYear(this.year());h.date.setMonth(this.month());f=maxDayOfMonth(h.date);g>f&&(g=f);h.date.setDate(g);return h},multiLayoutDate:function(){JC.log("Calendar.Model multiLayoutDate",new Date().getTime())},selectedDate:function(){var g,f,e;f=this.layout().find("td.cur");f.length&&!f.hasClass("unable")&&(e=f.find("a[date]"))&&(g=new Date(),g.setTime(e.attr("date")));return g},multiselectDate:function(){var e=[];return e},calendarinited:function(){var g=this.selector(),f=d.layoutInitedCallback,e;g&&g.attr("calendarinited")&&(e=window[g.attr("calendarinited")])&&(f=e);return f},calendarshow:function(){var g=this.selector(),f=d.layoutShowCallback,e;g&&g.attr("calendarshow")&&(e=window[g.attr("calendarshow")])&&(f=e);return f},calendarhide:function(){var g=this.selector(),f=d.layoutHideCallback,e;g&&g.attr("calendarhide")&&(e=window[g.attr("calendarhide")])&&(f=e);return f},calendarupdate:function(g){var h=this.selector(),f,e;h&&h.attr("calendarupdate")&&(e=window[h.attr("calendarupdate")])&&(f=e);return f},calendarclear:function(){var g=this.selector(),f,e;g&&g.attr("calendarclear")&&(e=window[g.attr("calendarclear")])&&(f=e);return f},calendarcancel:function(){var g=this.selector(),f,e;g&&g.attr("calendarcancel")&&(e=window[g.attr("calendarcancel")])&&(f=e);return f},calendarlayoutchange:function(){var g=this.selector(),f,e;g&&g.attr("calendarlayoutchange")&&(e=window[g.attr("calendarlayoutchange")])&&(f=e);return f},multiselect:function(){var e;this.selector().is("[multiselect]")&&(e=parseBool(this.selector().attr("multiselect")));return e},calendarupdatemultiselect:function(g){var h=this.selector(),f,e;h&&h.attr("calendarupdatemultiselect")&&(e=window[h.attr("calendarupdatemultiselect")])&&(f=e);return f},tpl:['<div id="UXCCalendar" class="UXCCalendar">','    <div class="UHeader">','        <select class="UYear"></select>','        <img class="UImg yearctl" align="absMiddle" usemap="#UXCCalendar_Year" />','        <map name="UXCCalendar_Year"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>','        <select class="UMonth"></select>','        <img class="UImg monthctl" align="absMiddle" usemap="#UXCCalendar_Month"  />','        <map name="UXCCalendar_Month"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>',"    </div>",'    <table class="UTable">',"        <thead>","            <tr>","                <th>一</th>","                <th>二</th>","                <th>三</th>","                <th>四</th>","                <th>五</th>","                <th>六</th>","                <th>日</th>","            </tr>","        </thead>","   </table>",'   <table class="UTable UTableBorder">',"        <tbody>","           <!--<tr>",'                <td class="cur"><a href="#">2</a></td>','                <td class="unable"><a href="#">2</a></td>','                <td class="weekend cur"><a href="#">6</a></td>','                <td class="weekend hover"><a href="#">13</a></td>','                <td class="weekend other"><a href="#">41</a></td>','                <td class="weekend other"><a href="#">42</a></td>',"            </tr>-->","        </tbody>","    </table>",'    <div class="UFooter">','        <button type="button" class="UConfirm">确定</button>','        <button type="button" class="UClear">清空</button>','        <button type="button" class="UCancel">取消</button>',"    </div>","</div>"].join("")};function b(e){this._model=e}d.View=b;b.prototype={init:function(){return this},hide:function(){this._model.layout().hide()},show:function(){var e=this._model.defaultDate();JC.log("Calendar.View: show",new Date().getTime(),formatISODate(e.date));this._buildLayout(e);this._buildDone()},updateLayout:function(e){typeof e=="undefined"&&(e=this._model.layoutDate());this._buildLayout(e);this._buildDone()},updateYear:function(e){if(typeof e=="undefined"||e==0){return}this._model.multiselect()?this.updateMultiYear(e):this.updateSingleYear(e)},updateSingleYear:function(f){var h=this._model.layoutDate(),g=h.date.getDate(),e;h.date.setDate(1);h.date.setFullYear(h.date.getFullYear()+f);e=maxDayOfMonth(h.date);g>e&&(g=e);h.date.setDate(g);this._buildLayout(h);this._buildDone()},updateMultiYear:function(e){},updateMonth:function(f){if(typeof f=="undefined"||f==0){return}var h=this._model.layoutDate(),g=h.date.getDate(),e;h.date.setDate(1);h.date.setMonth(h.date.getMonth()+f);e=maxDayOfMonth(h.date);g>e&&(g=e);h.date.setDate(g);this._buildLayout(h);this._buildDone()},updateSelected:function(h){var e=this,f,g;if(!h){f=this._model.selectedDate()}else{h=a(h);g=getJqParent(h,"td");if(g&&g.hasClass("unable")){return}f=new Date();f.setTime(h.attr("date"))}if(!f){return}e._model.selector().val(formatISODate(f));a(e).trigger("TriggerEvent",[JC.Calendar.Model.UPDATE,"date",f,f]);d.hide()},updatePosition:function(){var g=this,e=g._model.selector(),s=g._model.layout();if(!(e&&s&&e.length&&s.length)){return}s.css({left:"-9999px",top:"-9999px","z-index":ZINDEX_COUNT++}).show();var q=s.width(),k=s.height(),r=e.width(),l=e.height(),p=e.offset(),o,m,f=a(window).width(),n=a(window).height(),h=a(document).scrollTop();o=p.left;m=p.top+l+5;if((m+k-h)>n){JC.log("y overflow");m=p.top-k-3;if(m<h){m=h}}s.css({left:o+"px",top:m+"px"});JC.log(q,k,r,l,p.left,p.top,f,n);JC.log(h,o,m)},_buildDone:function(){this.updatePosition();a(this).trigger("TriggerEvent",[d.Model.INITED])},_buildLayout:function(e){this._model.layout();if(!(e&&e.date)){return}this._buildHeader(e);this._buildBody(e);this._buildFooter(e)},_buildHeader:function(h){var f=this,o=f._model.layout(),e=[],m,k=k=h.date.getFullYear(),l=f._model.startYear(h),n=f._model.endYear(h);JC.log(l,n);for(var g=l;g<=n;g++){e.push(printf('<option value="{0}"{1}>{0}</option>',g,g===k?" selected":""))}a(e.join("")).appendTo(o.find("select.UYear").html(""));a(o.find("select.UMonth").val(h.date.getMonth()))},_buildBody:function(n){var g=this,v=g._model.layout();var u=maxDayOfMonth(n.date),p=n.date.getDay()||7,t=p+u,k=6,f=[],h,e,r,m,o;var l=new Date(n.date.getFullYear(),n.date.getMonth(),1);var q=l.getDay()||7;if(q<2){l.setDate(-(q-1+6))}else{l.setDate(-(q-2))}var s=new Date();if(n.maxvalue&&!g._model.currentcanselect()){n.maxvalue.setDate(n.maxvalue.getDate()-1)}f.push("<tr>");for(m=1;m<=42;m++){o=[];if(l.getDay()===0||l.getDay()==6){o.push("weekend")}if(!isSameMonth(n.date,l)){o.push("other")}if(n.minvalue&&l.getTime()<n.minvalue.getTime()){o.push("unable")}if(n.maxvalue&&l.getTime()>n.maxvalue.getTime()){o.push("unable")}if(isSameDay(l,s)){o.push("today")}if(isSameDay(n.date,l)){o.push("cur")}f.push('<td class="',o.join(" "),'">','<a href="javascript:" date="',l.getTime(),'" title="'+formatISODate(l)+'" >',l.getDate(),"</a></td>");l.setDate(l.getDate()+1);if(m%7===0&&m!=42){f.push("</tr><tr>")}}f.push("</tr>");v.find("table.UTableBorder tbody").html(a(f.join("")))},_buildFooter:function(e){}};a(document).delegate("body > div.UXCCalendar select.UYear, #UXCCalendar select.UMonth","change",function(e){d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).updateLayout()});a(document).delegate("body > div.UXCCalendar button.UNextYear","click",function(e){d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).updateYear(1)});a(document).delegate("body > div.UXCCalendar button.UPreYear","click",function(e){d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).updateYear(-1)});a(document).delegate("map[name=UXCCalendar_Year] area","click",function(f){f.preventDefault();var e=a(this),g=d.getInstance(d.lastIpt);e.attr("action")&&g&&(e.attr("action").toLowerCase()=="up"&&g.updateYear(1),e.attr("action").toLowerCase()=="down"&&g.updateYear(-1))});a(document).delegate("map[name=UXCCalendar_Month] area","click",function(f){f.preventDefault();var e=a(this),g=d.getInstance(d.lastIpt);e.attr("action")&&g&&(e.attr("action").toLowerCase()=="up"&&g.updateMonth(1),e.attr("action").toLowerCase()=="down"&&g.updateMonth(-1))});a(document).delegate("div.UXCCalendar table a[date], div.UXCCalendar table a[dstart]","click",function(e){e.preventDefault();d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).updateSelected(a(this))});a(document).delegate("body > div.UXCCalendar button.UConfirm","click",function(e){d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).updateSelected()});a(document).delegate("body > div.UXCCalendar button.UClear","click",function(e){d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).clear()});a(document).delegate("body > div.UXCCalendar button.UCancel","click",function(e){d.getInstance(d.lastIpt)&&d.getInstance(d.lastIpt).cancel()});a(document).delegate("input.UXCCalendar_btn","click",function(e){a(this).data(d.Model.INPUT)&&!a(this).data(d.Model.INPUT).is("[disabled]")&&d.pickDate(a(this).data(d.Model.INPUT))});a(document).delegate("body > div.UXCCalendar","click",function(e){e.stopPropagation()});a(document).ready(function(e){setTimeout(function(g){if(!d.autoInit){return}d.initTrigger(a("input[type=text]"))},200);a(window).on("scroll resize",function(g){var h=d.getInstance(d.lastIpt);h&&h.visible()&&h.updatePosition()});var f=null;a(document).on("click",function(g){var h=g.target||g.srcElement;if(d.domClickFilter){if(d.domClickFilter(a(h))===false){return}}if(d.isCalendar(g.target||g.targetElement)){return}if(h&&(h.nodeName.toLowerCase()!="input"&&h.nodeName.toLowerCase()!="button")){d.hide();return}f&&clearTimeout(f);f=setTimeout(function(){if(d.lastIpt&&d.lastIpt.length&&h==d.lastIpt[0]){return}d.hide()},100)})});a(document).delegate(["input[datatype=season]","input[datatype=month]","input[datatype=week]","input[datatype=date]","input[datatype=daterange]","input[multidate]"].join(),"focus",function(e){d.pickDate(this)});a(document).delegate(["button[datatype=season]","button[datatype=month]","button[datatype=week]","button[datatype=date]","button[datatype=daterange]","button[multidate]"].join(),"click",function(e){d.pickDate(this)})}(jQuery));(function(d){JC.Calendar.weekTpl="";JC.Calendar.weekDayOffset=1;function b(e){this._selector=e}JC.Calendar.WeekModel=b;function a(e){this._model=e}JC.Calendar.WeekView=a;JC.Calendar.clone(b,a);b.prototype.layout=function(){var e=d("#UXCCalendar_week");if(!e.length){e=d(JC.Calendar.weekTpl||this.tpl).hide();e.attr("id","UXCCalendar_week").hide().appendTo(document.body)}return e};b.prototype.tpl=['<div id="UXCCalendar_week" class="UXCCalendar UXCCalendar_week" >','    <div class="UHeader">','        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>','        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>','        <select class="UYear" style=""></select>',"    </div>",'    <table class="UTable UTableBorder">',"        <tbody></tbody>","    </table>",'    <div class="UFooter">','        <button type="button" class="UConfirm">确定</button>','        <button type="button" class="UClear">清空</button>','        <button type="button" class="UCancel">取消</button>',"    </div>","</div>"].join("");b.prototype.month=function(){var g=0,f,e=new Date();(f=this.layout().find("td.cur a[dstart]")).length&&(e=new Date())&&(e.setTime(f.attr("dstart")));g=e.getMonth();return g};b.prototype.selectedDate=function(){var g,f,e;f=this.layout().find("td.cur");f.length&&!f.hasClass("unable")&&(e=f.find("a[dstart]"))&&(g={start:new Date(),end:new Date()},g.start.setTime(e.attr("dstart")),g.end.setTime(e.attr("dend")));return g};b.prototype.singleLayoutDate=function(){var f=this,k=f.defaultDate(),h=this.day(),g,e=f.layout().find("td.cur > a[week]");k.date.setDate(1);k.date.setFullYear(this.year());k.date.setMonth(this.month());g=maxDayOfMonth(k.date);h>g&&(h=g);k.date.setDate(h);e.length&&(k.curweek=parseInt(e.attr("week"),10));JC.log("WeekModel.singleLayoutDate:",e.length,k.curweek);return k};a.prototype._buildBody=function(w){var y=this,o=w.date,k=y._model.layout(),u=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime(),l=c(o.getFullYear(),JC.Calendar.weekDayOffset),t=c(o.getFullYear()+1,JC.Calendar.weekDayOffset),m=0,v=[],g,q,p,n,s,h=o.getFullYear(),f=Math.ceil(l.length/8),r=JC.Calendar.lastIpt,e=parseBool(r.attr("currentcanselect"));if(w.maxvalue&&e){var x=w.maxvalue.getDay();if(x>0){w.maxvalue.setDate(w.maxvalue.getDate()+(7-x))}}v.push("<tr>");for(i=1,j=f*8;i<=j;i++){q=l[i-1];if(!q){q=t[m++];h=o.getFullYear()+1}n=new Date();s=new Date();n.setTime(q.start);s.setTime(q.end);p=printf("{0}年 第{1}周\n开始日期: {2} (周{4})\n结束日期: {3} (周{5})",h,JC.Calendar.getCnNum(q.week),formatISODate(n),formatISODate(s),JC.Calendar.cnWeek.charAt(n.getDay()%7),JC.Calendar.cnWeek.charAt(s.getDay()%7));g=[];if(w.minvalue&&n.getTime()<w.minvalue.getTime()){g.push("unable")}if(w.maxvalue&&s.getTime()>w.maxvalue.getTime()){g.push("unable")}if(w.curweek){if(q.week==w.curweek&&o.getFullYear()==n.getFullYear()){g.push("cur")}}else{if(o.getTime()>=n.getTime()&&o.getTime()<=s.getTime()){g.push("cur")}}if(u>=n.getTime()&&u<=s.getTime()){g.push("today")}v.push(printf('<td class="{0}"><a href="javascript:" title="{2}" dstart="{3}" dend="{4}" week="{1}" date="{5}" >{1}</a></td>',g.join(" "),q.week,p,n.getTime(),s.getTime(),w.date.getTime()));if(i%8===0&&i!=j){v.push("</tr><tr>")}}v.push("</tr>");k.find("table.UTableBorder tbody").html(d(v.join("")))};a.prototype.updateSelected=function(k){var e=this,f,h,g;if(!k){g=this._model.selectedDate();g&&(f=g.start,h=g.end)}else{k=d(k);g=getJqParent(k,"td");if(g&&g.hasClass("unable")){return}f=new Date();h=new Date();f.setTime(k.attr("dstart"));h.setTime(k.attr("dend"))}if(!(f&&h)){return}e._model.selector().val(printf("{0} 至 {1}",formatISODate(f),formatISODate(h)));d(e).trigger("TriggerEvent",[JC.Calendar.Model.UPDATE,"week",f,h]);JC.Calendar.hide()};function c(h,g){var l=[],k,f=1,g=g||0,h=parseInt(h,10),e=new Date(h,0,1);e.getDay()>1&&e.setDate(e.getDate()-e.getDay()+7);g>0&&(g=(new Date(2000,1,2)-new Date(2000,1,1))*g);while(e.getFullYear()<=h){k={week:f++,start:null,end:null};k.start=e.getTime()+g;e.setDate(e.getDate()+6);k.end=e.getTime()+g;e.setDate(e.getDate()+1);if(e.getFullYear()>h){e=new Date(e.getFullYear(),0,1);if(e.getDay()<2){break}}l.push(k)}return l}}(jQuery));(function(c){JC.Calendar.monthTpl="";function a(e){this._selector=e}JC.Calendar.MonthModel=a;function d(e){this._model=e}JC.Calendar.MonthView=d;JC.Calendar.clone(a,d);a.prototype.layout=function(){var e=c("#UXCCalendar_month");if(!e.length){e=c(JC.Calendar.monthTpl||this.tpl).hide();e.attr("id","UXCCalendar_month").hide().appendTo(document.body)}return e};a.prototype.tpl=['<div id="UXCCalendar_month" class="UXCCalendar UXCCalendar_week UXCCalendar_month" >','    <div class="UHeader">','        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>','        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>','        <select class="UYear" style=""></select>',"    </div>",'    <table class="UTable UTableBorder">',"        <tbody></tbody>","    </table>",'    <div class="UFooter">','        <button type="button" class="UConfirm">确定</button>','        <button type="button" class="UClear">清空</button>','        <button type="button" class="UCancel">取消</button>',"    </div>","</div>"].join("");a.prototype.month=function(){var g=0,f,e;(f=this.layout().find("td.cur a[dstart]")).length&&(e=new Date())&&(e.setTime(f.attr("dstart")),g=e.getMonth());return g};a.prototype.selectedDate=function(){var g,f,e;f=this.layout().find("td.cur");f.length&&!f.hasClass("unable")&&(e=f.find("a[dstart]"))&&(g={start:new Date(),end:new Date()},g.start.setTime(e.attr("dstart")),g.end.setTime(e.attr("dend")));return g};a.prototype.defaultMultiselectDate=function(m){var e=this,f=e.selector(),k,g,h,l;if(k=parseISODate(f.val())){m.date=k}else{if(f.val()&&(k=f.val().replace(/[^\d,]/g,"")).length){k=k.split(",");g=[];c.each(k,function(o,n){if(n.length!=16){return}h=parseISODate(n.slice(0,8));l=parseISODate(n.slice(8));if(!o){m.date=cloneDate(h);m.enddate=cloneDate(l)}g.push({start:h,end:l})});m.multidate=g}else{k=new Date();m.date=new Date(k.getFullYear(),k.getMonth(),k.getDate());m.enddate=cloneDate(m.date);m.enddate.setDate(maxDayOfMonth(m.enddate));m.multidate=[];m.multidate.push({start:cloneDate(m.date),end:cloneDate(m.enddate)})}}return m};a.prototype.multiLayoutDate=function(){var e=this,g=e.defaultDate(),f=e.year();JC.log("MonthModel.multiLayoutDate:",new Date().getTime());g.multidate=[];e.layout().find("td.cur").each(function(){var h=c(this);var l=h.find("> a[dstart]"),k=new Date(),m=new Date();k.setTime(l.attr("dstart"));m.setTime(l.attr("dend"));g.multidate.push({start:k,end:m})});g.date.setFullYear(f);g.enddate.setFullYear(f);c.each(g.multidate,function(k,h){h.start.setFullYear(f);h.end.setFullYear(f)});return g};d.prototype.updateMultiYear=function(f){var h=this._model.layoutDate(),g,e;JC.log("MonthView.updateMultiYear:",new Date().getTime());b(h.date,f);b(h.enddate,f);if(h.multidate){c.each(h.multidate,function(l,k){b(k.start,f);b(k.end,f);JC.log("xxxxxxxxxxxxxxxxxxxxxxx",k.start,k.end,f)})}this._buildLayout(h);this._buildDone()};function b(f,g){var h,e;h=f.getDate();f.setDate(1);f.setFullYear(f.getFullYear()+g);e=maxDayOfMonth(f);h>e&&(h=e);f.setDate(h)}d.prototype._buildBody=function(l){var f=this,w=l.date,v=f._model.layout(),p=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime(),m=0,e=[],n,g,t,h,u,k=w.getFullYear(),r=4,s=JC.Calendar.lastIpt,o=parseBool(s.attr("currentcanselect")),q=l.multidate?l.multidate.slice():null;if(l.maxvalue&&o){l.maxvalue.setDate(maxDayOfMonth(l.maxvalue))}e.push("<tr>");for(i=1,j=12;i<=j;i++){h=new Date(k,i-1,1);u=new Date(k,i-1,maxDayOfMonth(h));t=printf("{0}年 {1}月<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})",k,JC.Calendar.getCnNum(i),formatISODate(h),formatISODate(u),JC.Calendar.cnWeek.charAt(h.getDay()%7),JC.Calendar.cnWeek.charAt(u.getDay()%7));n=[];if(l.minvalue&&h.getTime()<l.minvalue.getTime()){n.push("unable")}if(l.maxvalue&&u.getTime()>l.maxvalue.getTime()){n.push("unable")}if(q){c.each(q,function(y,x){if(h.getTime()>=x.start.getTime()&&h.getTime()<=x.end.getTime()){n.push("cur");q.splice(y,1);return false}})}else{if(w.getTime()>=h.getTime()&&w.getTime()<=u.getTime()){n.push("cur")}}if(p>=h.getTime()&&p<=u.getTime()){n.push("today")}_cnUnit=JC.Calendar.cnUnit.charAt(i%10);i>10&&(_cnUnit="十"+_cnUnit);e.push(printf('<td class="{0}"><a href="javascript:" title="{1}" dstart="{3}" dend="{4}" month="{5}" >{2}月</a></td>',n.join(" "),t,_cnUnit,h.getTime(),u.getTime(),i));if(i%3===0&&i!=j){e.push("</tr><tr>")}}e.push("</tr>");v.find("table.UTableBorder tbody").html(c(e.join("")))};a.prototype.multiselectDate=function(){var e=this,l=[],f,h,g,k;e.layout().find("td.cur").each(function(){f=c(this);h=f.find("> a[dstart]");if(f.hasClass("unable")){return}g=new Date();k=new Date();g.setTime(h.attr("dstart"));k.setTime(h.attr("dend"));l.push({start:g,end:k})});return l};d.prototype.updateSelected=function(m){var e=this,f,l,g,k,h;if(!m){if(e._model.multiselect()){g=this._model.multiselectDate();if(!g.length){return}h=[];c.each(g,function(o,n){h.push(printf("{0} 至 {1}",formatISODate(n.start),formatISODate(n.end)))});k=h.join(",")}else{g=this._model.selectedDate();g&&(f=g.start,l=g.end);f&&l&&(k=printf("{0} 至 {1}",formatISODate(f),formatISODate(l)))}}else{m=c(m);g=getJqParent(m,"td");if(g&&g.hasClass("unable")){return}if(e._model.multiselect()){g.toggleClass("cur");return}f=new Date();l=new Date();f.setTime(m.attr("dstart"));l.setTime(m.attr("dend"));k=printf("{0} 至 {1}",formatISODate(f),formatISODate(l))}if(!k){return}e._model.selector().val(k);c(e).trigger("TriggerEvent",[JC.Calendar.Model.UPDATE,"month",f,l]);JC.Calendar.hide()}}(jQuery));(function(c){JC.Calendar.seasonTpl="";function b(d){this._selector=d}JC.Calendar.SeasonModel=b;function a(d){this._model=d}JC.Calendar.SeasonView=a;JC.Calendar.clone(b,a);b.prototype.layout=function(){var d=c("#UXCCalendar_season");if(!d.length){d=c(JC.Calendar.seasonTpl||this.tpl).hide();d.attr("id","UXCCalendar_season").hide().appendTo(document.body)}return d};b.prototype.tpl=['<div id="UXCCalendar_season" class="UXCCalendar UXCCalendar_week UXCCalendar_season" >','    <div class="UHeader">','        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>','        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>','        <select class="UYear" style=""></select>',"    </div>",'    <table class="UTable UTableBorder">',"        <tbody></tbody>","    </table>",'    <div class="UFooter">','        <button type="button" class="UConfirm">确定</button>','        <button type="button" class="UClear">清空</button>','        <button type="button" class="UCancel">取消</button>',"    </div>","</div>"].join("");b.prototype.month=function(){var f=0,e,d;(e=this.layout().find("td.cur a[dstart]")).length&&(d=new Date())&&(d.setTime(e.attr("dstart")),f=d.getMonth());return f};b.prototype.selectedDate=function(){var f,e,d;e=this.layout().find("td.cur");e.length&&!e.hasClass("unable")&&(d=e.find("a[dstart]"))&&(f={start:new Date(),end:new Date()},f.start.setTime(d.attr("dstart")),f.end.setTime(d.attr("dend")));return f};a.prototype._buildBody=function(v){var w=this,n=v.date,k=w._model.layout(),t=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime(),l=0,u=[],g,q,p,m,s,h=n.getFullYear(),f=4,r=JC.Calendar.lastIpt,d=parseBool(r.attr("currentcanselect"));if(v.maxvalue&&d){var e=v.maxvalue.getMonth()+1,o;if(e%3!==0){v.maxvalue.setDate(1);v.maxvalue.setMonth(e+(3-(e%3)-1))}v.maxvalue.setDate(maxDayOfMonth(v.maxvalue))}u.push("<tr>");for(i=1,j=4;i<=j;i++){m=new Date(h,i*3-3,1);s=new Date(h,i*3-1,1);s.setDate(maxDayOfMonth(s));_cnUnit=JC.Calendar.cnUnit.charAt(i%10);i>10&&(_cnUnit="十"+_cnUnit);p=printf("{0}年 第{1}季度<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})",h,JC.Calendar.getCnNum(i),formatISODate(m),formatISODate(s),JC.Calendar.cnWeek.charAt(m.getDay()%7),JC.Calendar.cnWeek.charAt(s.getDay()%7));g=[];if(v.minvalue&&m.getTime()<v.minvalue.getTime()){g.push("unable")}if(v.maxvalue&&s.getTime()>v.maxvalue.getTime()){g.push("unable")}if(n.getTime()>=m.getTime()&&n.getTime()<=s.getTime()){g.push("cur")}if(t>=m.getTime()&&t<=s.getTime()){g.push("today")}u.push(printf('<td class="{0}"><a href="javascript:" title="{1}" dstart="{3}" dend="{4}" month="{5}" >{2}季度</a></td>',g.join(" "),p,_cnUnit,m.getTime(),s.getTime(),i));if(i%2===0&&i!=j){u.push("</tr><tr>")}}u.push("</tr>");k.find("table.UTableBorder tbody").html(c(u.join("")))};a.prototype.updateSelected=function(h){var d=this,e,g,f;if(!h){f=this._model.selectedDate();f&&(e=f.start,g=f.end)}else{h=c(h);f=getJqParent(h,"td");if(f&&f.hasClass("unable")){return}e=new Date();g=new Date();e.setTime(h.attr("dstart"));g.setTime(h.attr("dend"))}if(!(e&&g)){return}d._model.selector().val(printf("{0} 至 {1}",formatISODate(e),formatISODate(g)));c(d).trigger("TriggerEvent",[JC.Calendar.Model.UPDATE,"season",e,g]);JC.Calendar.hide()}}(jQuery));