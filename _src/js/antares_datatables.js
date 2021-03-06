/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Files
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

 */

const AntaresTableView = {
    init() {
        var self = this;

        self.dataTablesPaginationButtons();
        this.dataTables();
        this.dataTables0Data();
        this.dataTablesMobileEmailPosition();
        enquire.register('screen and (min-width:767px)', {
            match: function () {
                self.dataTablesFilterSearch();
                self.dataTablesSelectRows();
                self.dataTablesSelectFilter();
                self.dataTablesColumnToggle();
                self.dataTablesReWind();
                self.dataTablesMultiSelect();
                self.dataTablesDisableButton();
                self.dataTablesHelpers();
                self.dataTablesScrollTopAfterLength();
            }
        });
    },

    // methods
    delay() {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    },

    dataTablesHelpers() {
        $('.tbl-c').each(function (index, el) {
            if ($(this).closest('.mdl-tabs').length) {
                return false;
            } else {
                $(this).closest('.grid-stack-item-content').addClass('box-shadow');
            }
        });
    },

    dataTablesDisableButton() {
        // $('.btn--dropdown:disabled').on('click', function(e) {
        //     e.preventDefault();
        // });
    },
    dataTablesScrollTopAfterLength() {
        $('.dataTables_length, .pagination-current ul').click(function() {
            $('.dataTables_wrapper.ps-container, .dataTablesLogs.ps-container')
                .scrollTop(0)
                .perfectScrollbar('update');
        });
    },
    dataTablesMultiSelect() {
        //function
        function multiSelect(o) {
            var target = o.e.target;
            var element = o.element;
            var list = o.list;

            if ($(element).hasClass('ui-sortable-helper')) {
                return false;
            }

            if (o.start != false) {
                var start = o.start(o.e, $(element));
                if (start == false) {
                    return false;
                }
            }

            if (o.e.shiftKey && o.multiselect) {
                // get one already selected row
                $(element).addClass(o.selected);
                first = $(o.list).find('.' + o.selected).first().index();
                last = $(o.list).find('.' + o.selected).last().index();

                // if we hold shift and try to select last element that is upper in the list
                if (last < first) {
                    firstHolder = first;
                    first = last;
                    last = firstHolder;
                }

                if (first == -1 || last == -1) {
                    return false;
                }

                $(o.list).find('.' + o.selected).removeClass(o.selected);

                var num = last - first;
                var x = first;

                for (i = 0; i <= num; i++) {
                    $(list).find(o.filter).eq(x).addClass(o.selected);
                    x++;
                }
            } else if ((o.e.ctrlKey || o.e.metaKey) && o.multiselect) {
                // reset selection
                if ($(element).hasClass(o.selected)) {
                    $(element).removeClass('ui-selected');
                    setTimeout(function () {
                        $(element).removeClass(o.selected);
                    }, 100);
                } else {
                    $(element).addClass(o.selected);
                }
            } else {
                // reset selection
                if (o.keepSelection && !$(element).hasClass(o.selected)) {
                    $(list).find('.' + o.selected).removeClass(o.selected);
                    $(element).addClass(o.selected);
                } else {
                    $(list).find('.' + o.selected).removeClass(o.selected);
                    $(element).addClass(o.selected);
                }
            }

            if (o.stop != false) {
                o.stop($(list).find('.' + o.selected), $(element));
            }
        }
    },

    dataTablesSelectRows() {
        /*
         * jQuery outside events - v1.1 - 3/16/2010
         * http://benalman.com/projects/jquery-outside-events-plugin/
         * 
         * Copyright (c) 2010 "Cowboy" Ben Alman
         * Dual licensed under the MIT and GPL licenses.
         * http://benalman.com/about/license/
         */
        (function ($, c, b) {
            $.map(
                'click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(
                    ' '
                ),
                function (d) {
                    a(d);
                }
            );
            a('focusin', 'focus' + b);
            a('focusout', 'blur' + b);
            $.addOutsideEvent = a;

            function a(g, e) {
                e = e || g + b;
                var d = $(),
                    h = g + '.' + e + '-special-event';
                $.event.special[e] = {
                    setup: function () {
                        d = d.add(this);
                        if (d.length === 1) {
                            $(c).bind(h, f);
                        }
                    },
                    teardown: function () {
                        d = d.not(this);
                        if (d.length === 0) {
                            $(c).unbind(h);
                        }
                    },
                    add: function (i) {
                        var j = i.handler;
                        i.handler = function (l, k) {
                            l.target = k;
                            j.apply(this, arguments);
                        };
                    }
                };

                function f(i) {
                    $(d).each(function () {
                        var j = $(this);
                        if (this !== i.target && !j.has(i.target).length) {
                            j.triggerHandler(e, [i.target]);
                        }
                    });
                }
            }
        })(jQuery, document, 'outside');

        function multiselectWithMouse() {
            if (!$('#table-ma').length) {
                $('.tbl-c').on('click', 'tr', function () {
                    $(this).closest('table').find('tr').removeClass('is-selected');
                    $(this).addClass('is-selected');
                });

                $('.tbl-c').bind('clickoutside', function (event) {
                    $(this).find('tr').removeClass('is-selected');
                });
            } else {
                enquire.register('screen and (min-width:1025px)', {
                    //  for tablet selectable because we need contextMenu priorytet
                    match: function () {
                        $('.tbl-c table').selectable({
                            delay: 100,
                            distance: 100,
                            stop: function (event, ui) {
                                $(this)
                                    .find('.ui-selected')
                                    .removeClass('ui-selected')
                                    .addClass('is-selected');
                            }
                        });
                    },
                    unmatch: function () {
                        //  for tablet selectable because we need contextMenu priorytet
                        $('.tbl-c').selectable('destroy');
                    }
                });

                $('.tbl-c tbody').multiSelect({
                    unselectOn: false,
                    keepSelection: true,
                    selected: 'is-selected'
                });

                //mass actions
                $('.tbl-c').on('click', function () {
                    var self = $(this);

                    setTimeout(function () {
                        if (self.find('tr.is-selected').length >= 2) {
                            self.closest('.tbl-c').find('#table-ma').attr('disabled', false);
                        } else {
                            self.closest('.tbl-c').find('#table-ma').prop('disabled', true);
                        }
                    }, 50);
                });

                $('.tbl-c').bind('clickoutside', function (event) {
                    $(this).find('tr').removeClass('is-selected');
                    // $('.tbl-c #table-ma').addClass('is-disabled');
                    $('.tbl-c #table-ma').attr('disabled', true);
                    // console.log('clickoutside prop disabled');
                });

                $('#table-ma .is-disabled').on('click', function (e) {
                    e.preventDefault();
                });
            }
        }

        multiselectWithMouse();
    },

    dataTablesPaginationButtons() {
        $.fn.dataTable.ext.classes.sPageButton =
            'mdl-js-button mdl-js-ripple-effect';
    },

    dataTablesFilterSearch() {
        var self = this;

        $('.dataTables_wrapper')
            .closest('.tbl-c')
            .find('.card-ctrls .mdl-textfield__input')
            .keyup(function (e) {
                var val = $(this).val();
                if (e.which === 13) {
                    oTable.search(val).draw();
                } else {
                    self.delay(function () {
                        oTable.search(val).draw();
                    }, 500);
                }
            });
    },

    dataTablesReWind() {
        function tableReWind() {
            var parentContainer = $('.app-content'),
                tableContainer = $('.tbl-c');

            if (tableContainer.length > 0) {
                tableContainer.perfectScrollbar('destroy');
                tableContainer.scrollTop(0);
                tableContainer.perfectScrollbar({
                    wheelPropagation: true
                });
            }

            parentContainer.scrollTop(0);
            parentContainer.perfectScrollbar('update');
        }

        $('.dataTable').on('page.dt', function () {
            tableReWind();
        });

        $('.dataTable').on('length.dt', function () {
            tableReWind();
        });
    },

    dataTablesColumnToggle() {
        var columnLi =
            '<li class="col-is-visible"><a class="mdl-js-button mdl-js-ripple-effect" href="#"><span></span></a></li>';

        function detect() {
            $('.ddown--columns .ddown__menu').find('li').remove();

            $('.billevo-table').find('thead th').each(function (index, el) {
                if ($(this).text() !== '') {
                    $('.ddown--columns .ddown__menu').append(columnLi);
                    $('.ddown--columns .ddown__menu li:last-child a span').text(
                        $(this).text()
                    );
                }
            });

            $('.ddown--columns .ddown__menu li').on('click', function () {
                //toggle class
                $(this).toggleClass('col-is-visible');
                $(this).toggleClass('col-is-hidden');

                // order / index
                var order = $(this).index();
                if (oTable.column(order).visible() === true) {
                    oTable.column(order).visible(false);
                } else {
                    oTable.column(order).visible(true);
                }
            });
        }

        detect();
    },

    dataTablesSelectFilter() {
        $('.dataTables_wrapper')
            .closest('.tbl-c')
            .find('.card-filter__sgl')
            .on('click', 'i', function (e) {
                $(this).closest('.card-filter__sgl').hide();
            });
    },

    dataTables0Data() {
        var bTable = $('.billevo-table');
        var cell = $('.billevo-table td');
        var zeroElement = $('.billevo-table .dataTables_empty');

        if (cell.length === 1 && zeroElement.length) {
            bTable.closest('.tbl-c').addClass('tbl-c--zd');
        }
    },

    dataTables() {
        let self = this;

        let dataTablesOptions = {
            iDisplayLength: 10,
            bFilter: true,
            bLengthChange: true,
            bInfo: false,
            // buttons: [ 'colvis' ],
            // buttons: [ 'colvis' ],
            // "ajax": '../ajax/data/arrays.txt',

            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //disable autonumering if table has class
                if ($(this).hasClass('no-index')) {
                    return false;
                }

                var index = iDisplayIndexFull + 1;
                $('td:eq(0)', nRow).html(index);
                return nRow;
            },
            order: [
                // [1, "desc"]
            ],
            autoWidth: true,
            dom: '<"dt-area-top"i>rt<"dt-area-bottom pagination pagination--type2" fpL><"clear">',
            // lengthMenu: [
            //     [10, 25, 50, -1],
            //     [10, 25, 50, "All"]
            // ],
            responsive: true,
            //default sorting
            asSorting: ['asc'],
            aTargets: [2],
            //select search
            initComplete: function () {
                let column = $('[data-table-init="true"]').DataTable().column(3),
                    select = $('.tbl-c .card-ctrls select');

                select.on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).children('option:selected').val()
                    );

                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>');
                });

                $('.tbl-c').append($('.tbl-c .pagination'));
                // window.AntaresForms.elements.select();
            },
            oLanguage: {
                // sProcessing: "<img src='http://i.imgur.com/zGCAUHJ.gif'>",
                // type 2
                oPaginate: {
                    sPrevious: "<i class='zmdi zmdi-long-arrow-left dt-pag-left'></i>",
                    sNext: "<i class='zmdi zmdi-long-arrow-right dt-pag-right'></i>"
                },

                // type 1
                // "oPaginate": {
                //     "sPrevious": "<i class='zmdi zmdi-chevron-left dt-pag-left'></i>",
                //     "sNext": "<i class='zmdi zmdi-chevron-right dt-pag-right'></i>",
                // },
                lengthMenu: '_MENU_ records per page',
                sLengthMenu: '_MENU_'
            },
            drawCallback: function () {
                let oSettings = this.fnSettings ? this.fnSettings() : this;
                if (oSettings.aoData == null) {
                    return false;
                }
                let rows = oSettings.aoData.length - 1;

                let wrapper = $('.tbl-c'),
                    paginate = wrapper.find('.pagination'),
                    length = wrapper.find('.dataTables_length');

                if (rows <= 10) {
                    length.hide();
                    paginate.hide();
                    $('.card-datatables .card').removeClass('card--pagination');
                } else {
                    length.show();
                    paginate.show();
                    $('.card-datatables .card').addClass('card--pagination');
                }
            }
            // "columns": [
            //   { "width": "100px" },
            //   null,
            //   null,
            //   null,
            //   null,
            //   null,
            //   null,
            //   null,
            //   null,
            //   null
            // ]
        };

        // init datatables
        let oTable = $('[data-table-init="true"]').DataTable(dataTablesOptions);
        window.oTable = oTable;
        dataTablesOptions.drawCallback();
    },

    dataTablesMobileEmailPosition() {
        $(window).off('resize')
        function emailPosition() {
            var lefttab = $('.dataTables_wrapper table .name').offset().left - 8
            $('.dataTables_wrapper td>a[title="email address"]').css('left', lefttab)
        }
        emailPosition()
        $(window).on('resize', function () {
            emailPosition()
        });
        $('.dataTables_wrapper+.pagination .dataTables_paginate').click(function () {
            emailPosition()
        })
    }

};

// THESE 2 HAVE TO BE OUTSIDE:

// external keyboard select plugin
$.fn.multiSelect = function (o) {
    var defaults = {
        multiselect: true,
        selected: 'is-selected',
        filter: ' > *',
        unselectOn: false,
        keepSelection: true,
        list: $(this).selector,
        e: null,
        element: null,
        start: false,
        stop: false,
        unselecting: false
    };
    return this.each(function (k, v) {
        var options = $.extend({}, defaults, o || {});
        // selector - parent, assign listener to children only
        $(document).on('mousedown', options.list + options.filter, function (e) {
            if (e.which == 1) {
                if (options.handle != undefined && !$(e.target).is(options.handle)) {
                    // TODO:
                    // keep propagation?
                    // return true;
                }
                options.e = e;
                options.element = $(this);
                multiSelect(options);
            }
            return true;
        });

        if (options.unselectOn) {
            // event to unselect

            $(document).on('mousedown', options.unselectOn, function (e) {
                if (!$(e.target).parents().is(options.list) && e.which != 3) {
                    $(options.list + ' .' + options.selected).removeClass(
                        options.selected
                    );
                    if (options.unselecting != false) {
                        options.unselecting();
                    }
                }
            });
        }
    });
};

// external pagination plugin
// pagelength control plugin
/*!
 Page length control via links for DataTables
 2014 SpryMedia Ltd - datatables.net/license
 */
(function (i, j, a) {
    a.fn.dataTable.LengthLinks = function (d) {
        var c = new a.fn.dataTable.Api(d),
            f = c.settings()[0],
            e = a('<div></div>').addClass(f.oClasses.sLength),
            h = null;
        this.container = function () {
            return e[0];
        };
        e.on('click.dtll', 'a', function (b) {
            b.preventDefault();
            c.page.len(1 * a(this).data('length')).draw(!1);
        });
        c.on('draw', function () {
            if (c.page.len() !== h) {
                var b = f.aLengthMenu,
                    d = 2 === b.length && a.isArray(b[0]) ? b[1] : b,
                    g = 2 === b.length && a.isArray(b[0]) ? b[0] : b,
                    b = a.map(g, function (b, a) {
                        return b == c.page.len()
                            ? '<a class="active mdl-js-button mdl-js-ripple-effect" data-length="' +
                            g[a] +
                            '">' +
                            d[a] +
                            '</a>'
                            : '<a class="mdl-js-button mdl-js-ripple-effect" data-length="' +
                            g[a] +
                            '">' +
                            d[a] +
                            '</a>';
                    });
                e.html(f.oLanguage.sLengthMenu.replace('_MENU_', b.join(' ')));
                h = c.page.len();
            }
            componentHandler.upgradeAllRegistered();
        });
        c.on('destroy', function () {
            e.off('click.dtll', 'a');
        });
    };
    a.fn.dataTable.ext.feature.push({
        fnInit: function (d) {
            return new a.fn.dataTable.LengthLinks(d).container();
        },
        cFeature: 'L',
        sFeature: 'LengthLinks'
    });

    //scroll it!
    // $('.tbl-c table').on('page.dt length.dt', function() {
    //     setTimeout(function() {
    //         $('.tbl-c').perfectScrollbar('update');
    //     }, 150);
    // });
})(window, document, jQuery);

$(function () {
    window.AntaresTableView = AntaresTableView;
    AntaresTableView.init();
});
