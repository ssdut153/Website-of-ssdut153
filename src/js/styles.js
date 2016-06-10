$(document).ready(function () {
    //电脑板按钮放置位置父元素
    var text = $('.header>.text>div');
    //手机版放置位置父标签
    var li = $('nav#menu-left>ul>li#last>a');
    var btn = $('#header').find('a.navicon');
    var id = 'MicrosoftTranslatorWidget';
    $(window).load(function () {
        li.css('background-color', 'transparent');
        if (!text.is(':hidden')) {
            text.addClass('Dark');
            text.prop('id', id);
            li.attr('translate', 'no');
        } else if(!btn.is(':hidden')) {
            li.addClass('Dark');
            li.prop('id', id);
            text.attr('translate', 'no');
        }
    }).resize(function () {
        if (!text.is(':hidden')) {
            if (text.prop('class') == '') {
                var content = li.html();
                li.removeClass('Dark');
                li.removeAttr('id');
                text.addClass('Dark');
                text.prop('id', id);
                text.html(content);
            }
        } else if(!btn.is(':hidden')) {
            if (li.prop('class') == '') {
                var content = text.html();
                text.removeClass('Dark');
                text.removeAttr('id');
                li.addClass('Dark');
                li.prop('id', id);
                li.html(content);
            }
        }
    });
});