define([
    'jquery',
    'underscore',
    'views/BaseView',
    'jcrop',
    'jquery-select2'
], function($, _, BaseView){

    var ObjectSliderView = BaseView.extend({
        templateName: "objectSliderTemplate",
        container: "#slider-block",
        canvas: {
            el: null,
            currentColor: null,
            context: null,
            image: null
        },

        initialize: function () {
            this.popup = $('#popup');
        },

        events: {
            'click .slider-close' : 'closeSlider',
            'click #picker' : 'addColor',
            'mousemove #picker' : 'onMouseMove',
            'click .preview' : 'openPicker',
            'change #photo-upload' : 'onPhotoChange'
        },

        openImageCropPopup: function(){
            this.popup.addClass('open');
        },

        closeImageCropPopup: function(){
            this.popup.removeClass('open');
        },

        onPhotoChange: function(e) {
            var fileInput = this.$el.find(e.currentTarget),
                oFReader = new FileReader(),
                cropImage = this.popup.find('#crop-image'),
                _this = this;

            this.$el.find('#fileName').val(fileInput.val());
            oFReader.readAsDataURL(fileInput.get(0).files[0]);

            oFReader.onload = function (oFREvent) {
                cropImage.attr('src', oFREvent.target.result);

                cropImage.Jcrop({
                    onChange : updatePreview,
                    onSelect : updatePreview,
                    aspectRatio : 1,
                    boxWidth: 540,
                    setSelect: [ 150, 150, 150, 150 ]
                });

                _this.openImageCropPopup();
            };

            function updatePreview(c) {
                if(parseInt(c.w) > 0) {
                    var imageObj = _this.popup.find('#crop-image').get(0),
                        canvas = _this.popup.find('#crop-preview').get(0),
                        context = canvas.getContext("2d");

                    context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
                }
            };
        },

        addColor: function(e) {
            e.stopPropagation();

            this.canvas.currentColor = this.$el.find('#hexVal').val();
            this.$el.find('.preview').css('background', this.canvas.currentColor);
            this.closePicker();
        },

        openPicker: function(e) {
            var _this = this;

            this.$el.find('.colorpicker').addClass('open');
            e.stopPropagation();

            $(document).on('click', document, function() {
                _this.closePicker();
            });
        },

        closePicker: function() {
            this.$el.find('.colorpicker').removeClass('open');
            $(document).off();
        },

        onMouseMove: function(e) {

            var pixel = this.canvas.context.getImageData(e.offsetX, e.offsetY, 1, 1).data,
                dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0],
                hexValue = '#' + ('0000' + dColor.toString(16)).substr(-6);

            this.$el.find('.preview').css('background', "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")");
            this.$el.find('#hexVal').val(hexValue);
        },

        canvasInit: function(){
            var _this = this;

            this.canvas.el = this.$el.find('#picker').get(0);
            this.canvas.context = this.canvas.el.getContext('2d');
            this.canvas.image = new Image();
            this.canvas.image.src = '../../img/colorwheel1.png';

            this.canvas.image.onload = function() {
                _this.canvas.context.drawImage(_this.canvas.image, 0, 0, _this.canvas.image.width, _this.canvas.image.height);
            };
        },

        closeSlider: function() {
            this.$el.find('.slider-body').toggleClass('open');
        },

        select2Init: function() {
            this.$el.find('.select').select2();
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.canvasInit();
            this.select2Init();
            return this;
        }
    });

    return ObjectSliderView;

});