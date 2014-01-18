$(document).ready(function() {

     $(".select").select2();

    $(document)
        .on('click', 'ul#object-detail li a', function(event) {
            var idContent = $(this).data("linked"),
                tabContent = $('.tab-on-map');
            $("ul#object-detail li").removeClass("selected");
            $(this).parent().addClass("selected");
            $('.tab-for-detail').hide();
            $(idContent).show();
            return false;
        });
});