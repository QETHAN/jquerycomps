(function($){
    /**
     * 多先日期弹框的模板HTML
     * @for         JC.Calendar
     * @property    monthdayTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.monthdayTpl = '';

    function MonthDayModel( _selector ){
        this._selector = _selector;
        
    }
    JC.Calendar.MonthDayModel = MonthDayModel;
    
    function MonthDayView( _model ){
        this._model = _model;
		
    }
    JC.Calendar.MonthDayView = MonthDayView;

    JC.Calendar.clone( MonthDayModel, MonthDayView );

    MonthDayView.prototype.init =
        function(){
            var _p = this;

            $(_p).on('MonthDayToggle', function( _evt, _item ){
                var _data = _p._model.findItemByTimestamp( _item.attr('dstart')  );
                if( _data.atd.hasClass('unable') ) return;
                //JC.log( 'MonthDayView: MonthDayToggle', _item.attr('dstart'), _data.atd.hasClass( 'cur' ) );
                _data.input.prop( 'checked', _data.atd.hasClass( 'cur' )  );
            });

            $(_p).on('MonthDayInputToggle', function( _evt, _item ){
                var _data = _p._model.findItemByTimestamp( _item.attr('dstart')  );

                /**
                 * 如果 atd 为空, 那么是 全选按钮触发的事件
                 */
                if( !_data.atd ){
                    //alert( _item.attr('action') );
                    $(_p).trigger( 'MonthDayToggleAll', [ _item ] );
                    return;
                }

                if( _data.atd.hasClass('unable') ) return;
                //JC.log( 'MonthDayView: MonthDayInputToggle', _item.attr('dstart'), _data.input.prop('checked') );
                _data.atd[ _data.input.prop('checked') ? 'addClass' : 'removeClass' ]( 'cur' );
            });

            $(_p).on('MonthDayToggleAll', function( _evt, _input ){
                var _all = _p._model.layout().find( 'a[dstart]' ), _checked = _input.prop('checked');
                //JC.log( 'MonthDayView: MonthDayToggleAll', _input.attr('action'), _input.prop('checked'), _all.length );
                if( !_all.length ) return;
                _all.each( function(){
                    var _sp = $(this), _td = getJqParent( _sp, 'td' );
                    if( _td.hasClass('unable') ) return;
                    _td[ _checked ? 'addClass' : 'removeClass' ]( 'cur' );
                    $( _p ).trigger( 'MonthDayToggle', [ _sp ] );
                });
            });

            return this;
        };

    MonthDayModel.prototype.findItemByTimestamp =
        function( _tm ){
            var _p = this, _r = { 
                                    'a': null
                                    , 'atd': null
                                    , 'atr': null
                                    , 'input': null
                                    , 'inputtr': null
                                    , 'tm': _tm 
                                };

            if( _tm ){
                _r.a = _p.layout().find( printf( 'a[dstart={0}]', _tm ) );
                _r.atd = getJqParent( _r.a, 'td' );
                _r.atr = getJqParent( _r.a, 'tr' );

                _r.input = _p.layout().find( printf( 'input[dstart={0}]', _tm ) );
                _r.inputtr = getJqParent( _r.input, 'tr' );
            }

            return _r;
        };
	
    MonthDayModel.prototype.layout = 
        function(){
            var _r = $('#UXCCalendar_monthday');

            if( !_r.length ){
                _r = $( JC.Calendar.monthdayTpl || this.tpl ).hide();
                _r.attr('id', 'UXCCalendar_monthday').hide().appendTo( document.body );
             }
            return _r;
        };
		
	MonthDayModel.prototype.tpl =
        [
        '<div id="UXCCalendar_multi_day" class="UXCCalendar UXCCalendar_monthday" >'
        ,'    <div class="UHeader">'
        ,'       <span class="UYear">'
        ,'       </span>年'
        ,'       <span class="UMonth">'
        ,'       </span>月'
        //,'       的日历'
        ,'    </div>'
        ,'    <table class="UTable UTableBorder">'
        ,'        <tbody></tbody>'
        ,'    </table>'
        ,'    <div class="UFooter">'
        ,'        <button type="button" class="UConfirm">确定</button>'
        ,'        <button type="button" class="UClear">清空</button>'
        ,'        <button type="button" class="UCancel">取消</button>'
        ,'    </div>'
        ,'</div>'
        ].join('');

    MonthDayModel.prototype.multiselect = function(){ return true; };

    MonthDayModel.prototype.multiLayoutDate = 
    	function (){
    	};

    MonthDayModel.prototype.multiselectDate =
        function(){
            var _p = this
            	, _r = []
            	, _sp
            	, _item
            	, _date
            	;

            _p.layout().find('td.cur').each( function () {
                _sp = $(this);
                _item = _sp.find( '> a[date]' );

                if( _sp.hasClass( 'unable' ) ) return;
                _date = new Date();
                _date.setTime( _item.attr("date") );
                _r.push( _date );
                
            });
           
            return _r;
        };

    MonthDayView.prototype.updateSelected = 
        function( _userSelectedItem ){
            var _p = this
            	, _dstart
            	, _dend
            	, _tmp
            	, _text
            	, _ar
            	;

            if( !_userSelectedItem ) {
               if( _p._model.multiselect() ){
                    _tmp = this._model.multiselectDate();

                    if( !_tmp.length ) return;
                    
                    _ar = [];
                    
                    for (var i = 0; i < _tmp.length; i++) {
                    	_ar.push(formatISODate(_tmp[i]));
                    }
                    _text = _ar.join(',');
                    
                }else{
                    _tmp = this._model.selectedDate();
                    
                }
            } else {
                _userSelectedItem = $( _userSelectedItem );
                _tmp = getJqParent( _userSelectedItem, 'td' );
                if( _tmp && _tmp.hasClass('unable') ) return;

                if( _p._model.multiselect() ){
                    _tmp.toggleClass('cur');
                    //$(_p).trigger( 'MonthDayToggle', [ _tmp ] );
                    return;
                }
                _date = new Date(); 
                _date.setTime( _userSelectedItem.attr('date') );
                _text = _userSelectedItem.attr("date");
                _text = printf( '{0}', formatISODate( _date ) );
               
            }

            if( !_text ) return;

            _p._model.selector().val( _text );
            $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'monthday', _tmp ] );

            JC.Calendar.hide();
        };
	
	MonthDayView.prototype._buildHeader = 
		function( _dateo ){
			var _p = this, 
				_layout = _p._model.layout();
			
			var year = _dateo.date.getFullYear(),
				month = _dateo.date.getMonth() + 1;
			
			_layout.find('div.UHeader span.UYear').html(year);
			_layout.find('div.UHeader span.UMonth').html(month);
				
		};
	
	MonthDayView.prototype._buildBody =
        function( _dateo ){
				var _p = this, _layout = _p._model.layout();
                var _maxday = maxDayOfMonth( _dateo.date ), 
                    _ls = [],
                    i, 
					_class, 
					_tempDate, 
					_tempDay,
					_today = new Date();
				
				_tempDate = new Date(_dateo.date.getFullYear(), _dateo.date.getMonth(), 1);
				_tempDay = _tempDate.getDay();
				
				_ls.push('<tr><td>星期</td>');
				for ( i = 0; i < _maxday; i++ ) {
					_class = [];
					
					if (_tempDay == 0 || _tempDay == 6) {
						_class.push("red");
					}
                    _ls.push( printf( 
                                '<td class="{0}">{1}</td>'
                                , _class.join(" ") 
                                , Calendar.cnWeek[_tempDay]
                            ));
					_tempDate.setDate(_tempDate.getDate() + 1);
					_tempDay = _tempDate.getDay();
					
				}
				_ls.push('</tr>');
				
                _ls.push('<tr><td>日期</td>'); 
				_tempDate = new Date(_dateo.date.getFullYear(), _dateo.date.getMonth(), 1);
				for ( i = 1; i <= _maxday; i++) {
					_class = getClass(_dateo, _tempDate, _today);
                    _ls.push( printf(
                                '<td class="{0}"><a href="javascript:;" dstart="{1}" dend="{1}" >{2}</a></td>'
                                , _class.join(" ")
                                , _tempDate.getTime()
                                , i
                             ));
						
					_tempDate.setDate(_tempDate.getDate() + 1);
					_tempDay = _tempDate.getDay();
					
				}
                _ls.push('</tr>');
                

				_ls.push('<tr class="Uchkdate"><td><label><input type="checkbox" value="" class="js_JCCalendarCheckbox" action="all"  />全选</lable></td>');
				_tempDate = new Date(_dateo.date.getFullYear(), _dateo.date.getMonth(), 1);
				for ( i = 0; i < _maxday; i++) {
					_class = getClass(_dateo, _tempDate, _today).join(" ");
                    
                    _ls.push( printf(
                                '<td class=""><input type="checkbox" date="{1}" dstart="{1}" dend="{1}" class="js_JCCalendarCheckbox" aciton="item" {3} {4} /></td>'
                                , _class
                                , _tempDate.getTime()
                                , formatISODate(_tempDate)
                                , /\bcur\b/.test( _class ) ? 'checked' : ''
                                , /\bunable\b/.test( _class ) ? 'disabled' : ''
                             ));
					
					_tempDate.setDate(_tempDate.getDate() + 1);
					_tempDay = _tempDate.getDay();
					
				}
				_ls.push('</tr>');
				
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
        };
	
	function getClass(_dateo, _tempDate, _today) {
		var _class = [];

		if( _dateo.minvalue) {
			if( _tempDate.getTime() < _dateo.minvalue.getTime() ) {
				_class.push( 'unable' );
			}
		} 
            
        if( _dateo.maxvalue ) {
			if ( _tempDate.getTime() > _dateo.maxvalue.getTime() ) {
				_class.push( 'unable' );
			}
		} 
           
		if( isSameDay( _tempDate, _today ) ) {
			_class.push( 'today' );
		}
		
        if( isSameDay( _dateo.date, _tempDate ) ) {
			_class.push( 'cur' );
		}

		return _class;
	}

    $(document).delegate( '#UXCCalendar_monthday a[dstart]', 'click', function( _evt ){
        var _lastIpt = JC.Calendar.lastIpt, _type, _ins, _p = $(this);
        if( !_lastIpt ) return;
        _type = JC.Calendar.type( _lastIpt );
        _ins = JC.Calendar.getInstance( _lastIpt );
        if( !_ins )  return;

        $( _ins._view ).trigger( 'MonthDayToggle', [ _p ] );
    });

    $(document).delegate( '#UXCCalendar_monthday input.js_JCCalendarCheckbox', 'click', function( _evt ){
        var _lastIpt = JC.Calendar.lastIpt, _type, _ins, _p = $(this);
        if( !_lastIpt ) return;
        _type = JC.Calendar.type( _lastIpt );
        _ins = JC.Calendar.getInstance( _lastIpt );
        if( !_ins )  return;
        $( _ins._view ).trigger( 'MonthDayInputToggle', [ _p ] );
    });


}(jQuery));
