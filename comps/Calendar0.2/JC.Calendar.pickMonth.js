(function($){
    /**
     * 弹出一年中所有月份的选择框
     * @method  pickMonth
     * @for     JC.Calendar
     * @static
     * @param   {selector}  _selector
     */
    JC.Calendar.pickMonth =
        function( _selector ){
            _logic.lastDateObj = JC.Calendar.getDate( _selector );
            JC.Calendar.lastIpt = _selector;
            JC.Calendar.setPosition( _selector, _logic.update( _logic.lastDateObj ) );
        };
    /**
     * 自定义月份弹框的模板HTML
     * @for         JC.Calendar
     * @property    pickMonth.tpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.pickMonth.tpl = '';

    function MonthModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.MonthModel = MonthModel;
    
    function MonthView( _model ){
        this._model = _model;
    }
    JC.Calendar.MonthView = MonthView;

    Calendar.clone( MonthModel, MonthView );

    MonthModel.prototype.month = 
        function(){
            var _r = 0, _tmp, _date;
            ( _tmp = this.layout().find('td.cur a[dstart]') ).length
                && ( _date = new Date() )
                && (
                        _date.setTime( _tmp.attr('dstart') )
                        , _r = _date.getMonth()
                   )
                ;
            return _r;
        };

    MonthModel.prototype.selectedDate =
        function(){
            var _r, _tmp, _item;
            _tmp = this.layout().find('td.cur');
            _tmp.length 
                && !_tmp.hasClass( 'unable' )
                && ( _item = _tmp.find('a[dstart]') )
                && ( 
                        _r = { 'start': new Date(), 'end': new Date() }
                        , _r.start.setTime( _item.attr('dstart') ) 
                        , _r.end.setTime( _item.attr('dend') ) 
                    )
                ;
            return _r;
        };

    MonthModel.prototype.layout = 
        function(){
            var _r = $('#UXCCalendar_month');

            if( !_r.length ){
                _r = $( Calendar.tpl || this.tpl ).hide();
                _r.attr('id', 'UXCCalendar_month').hide().appendTo( document.body );
             }
            return _r;
        };

    MonthModel.prototype.tpl =
        [
        '<div id="UXCCalendar_month" class="UXCCalendar UXCCalendar_week UXCCalendar_month" >'
        ,'    <div class="UHeader">'
        ,'        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>'
        ,'        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>'
        ,'        <select class="UYear" style=""></select>'
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
        ].join('')

    MonthView.prototype._buildBody =
        function( _dateo ){
            var _p = this
                , _date = _dateo.date
                , _layout = _p._model.layout()
                , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                , nextCount = 0
                , _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                , _rows = 4
                , ipt = JC.Calendar.lastIpt
                , currentcanselect = parseBool( ipt.attr('currentcanselect') )
                ;

                if( _dateo.maxvalue && currentcanselect ){
                    _dateo.maxvalue.setDate( maxDayOfMonth( _dateo.maxvalue ) );
                }

                _ls.push('<tr>');
                for( i = 1, j = 12; i <= j; i++ ){
                    _sdate = new Date( _year, i - 1, 1 ); 
                    _edate = new Date( _year, i - 1, maxDayOfMonth( _sdate ) );

                    _title = printf( "{0}年 {1}月<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( i )
                                , formatISODate( _sdate )
                                , formatISODate( _edate )
                                , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                                , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                                );

                    _class = [];

                    if( _dateo.minvalue && _sdate.getTime() < _dateo.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateo.maxvalue && _edate.getTime() > _dateo.maxvalue.getTime() ){
                        _class.push( 'unable' );
                    }

                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                    if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                    _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                    i > 10 && ( _cnUnit = "十" + _cnUnit );

                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                    ' dstart="{3}" dend="{4}" month="{5}" >{2}月</a></td>'
                                , _class.join(' ')
                                , _title
                                , _cnUnit
                                , _sdate.getTime()
                                , _edate.getTime()
                                , i
                            ));
                    if( i % 3 === 0 && i != j ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>'); 
 
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
        };

    MonthView.prototype.updateSelected = 
        function( _userSelectedItem ){
            var _p = this, _dstart, _dend, _tmp;
            if( !_userSelectedItem ){
                _tmp = this._model.selectedDate();
                _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );
            }else{
                _userSelectedItem = $( _userSelectedItem );
                _tmp = getJqParent( _userSelectedItem, 'td' );
                if( _tmp && _tmp.hasClass('unable') ) return;
                _dstart = new Date(); _dend = new Date();
                _dstart.setTime( _userSelectedItem.attr('dstart') );
                _dend.setTime( _userSelectedItem.attr('dend') );
            }
            if( !( _dstart && _dend ) ) return;

            _p._model.selector().val( printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) ) );
            $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'month', _dstart, _dend ] );

            Calendar.hide();
        };

}(jQuery));
