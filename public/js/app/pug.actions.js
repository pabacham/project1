$(document).ready(function() {
    var subMenuList = $('.sub-menu li');

    $(document)
        .on('click', '#object-detail li a', function() {
            $(this).closest('.tab-on-map').addClass('open');
        })
        .on('click', '.hide-tab', function() {
            $(this).closest('.open').removeClass('open');
        })
        .on('click', '.open-slider', function() {
            $('.slider-body').toggleClass('open');
        })
        .on('click', '.slider-close', function() {
            $('.slider-body').toggleClass('open');
        })

        .on('click', 'ul#object-detail li a', function(event) {
            var idContent = $(this).data("linked"),
                tabContent = $('.tab-on-map');
            $("ul#object-detail li").removeClass("selected");
            $(this).parent().addClass("selected");
            $('.tab-for-detail').hide();
            $(idContent).show();
            return false;
        })
    ;
    $(subMenuList).click(function() {
        $(subMenuList).removeClass('active')
        $(this).addClass('active');
    })
}); 