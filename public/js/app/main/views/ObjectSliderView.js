(function (window, $, _, views) {
    "use strict";

    views.ObjectSliderView = views.BaseView.extend({
        templateName: "objectSliderTemplate",
        container: "#slider-block",
        initialize: function () {
        },

        events: {
            'click .slider-close' : "closeSlider",
            'click #picker' : "addColor",
            'click .preview' : "openPicker"
        },

        addColor: function() {
            var currentColor = this.$el.find('#hexVal').val();
            $('.preview').css('background', currentColor);
            this.$el.find('.colorpicker').toggleClass('open');
        },

        openPicker: function() {
            this.$el.find('.colorpicker').toggleClass('open');
        },


        canvasCreate: function(){

                    var canvas = document.getElementById('picker');
                    var ctx = canvas.getContext('2d');

                    // drawing active image
                    var image = new Image();
                    image.onload = function () {
                        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
                    }

                    // select desired colorwheel
                    var imageSrc = '../../img/colorwheel1.png';
                    image.src = imageSrc;

                    $('#picker').mousemove(function(e) { // mouse move handler
                        if (true){
                            // get coordinates of current position
                            var canvasOffset = $(canvas).offset();
                            var canvasX = Math.floor(e.pageX - canvasOffset.left);
                            var canvasY = Math.floor(e.pageY - canvasOffset.top);

                            // get current pixel
                            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
                            var pixel = imageData.data;

                            // update preview color
                            var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
                            $('.preview').css('background', pixelColor);

                            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
                            $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
                        }
                    });
        },

        closeSlider: function() {
            this.$el.find('.slider-body').toggleClass('open');
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.canvasCreate();
            return this;
        }
    });
})(window, window.$, window._, window.App.views);

