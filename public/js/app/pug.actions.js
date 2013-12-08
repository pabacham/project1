$(document).ready(function() {
	// slider
	$.fn.openSlider = function($slider) {
        $slider.animate({ right: '0px' }, { duration: 500, specialEasing: { width: 'linear', height: 'easeOutBounce' } });
    } 
	$.fn.closeSlider = function($slider) {
        $slider.animate({ right: '-500px' }, { duration: 500, specialEasing: { width: 'linear', height: 'easeOutBounce' } });
    } 
	
	
	$(document).on('click', '.open-slider', function(event) {
		$.fn.openSlider($('#add-tracker'));
	});
	$(document).on('click', '.slider-close', function(event) {
		$.fn.closeSlider($('#add-tracker'));
	});
	
	// tabs
	$(document).on('click', 'ul#object-detail li a', function(event) {
		var idContent = $(this).data("linked"),
			tabContent = $('.tab-on-map');
		
		if(tabContent.hasClass('hide-tab-content')) {
			tabContent.removeClass('hide-tab-content');
			tabContent.animate({ bottom: '0' }, { duration: 500, specialEasing: { width: 'linear', height: 'easeOutBounce' } });
		}
		
		$("ul#object-detail li").removeClass("selected");
		$(this).parent().addClass("selected");
		$('.tab-for-detail').hide();
		$(idContent).show();
		return false;
	});
	// hide tabs
	$(document).on('click', 'a.hide-tab', function(event) {
		var tabContent = $('.tab-on-map'),
			hTab = tabContent.height() - 45;
		
		tabContent.addClass('hide-tab-content');
		tabContent.animate({ bottom: '-' + hTab + 'px' }, { duration: 500, specialEasing: { width: 'linear', height: 'easeOutBounce' } });
	});
}); 