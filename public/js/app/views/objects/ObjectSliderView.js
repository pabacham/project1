define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/objects/ImageCropView',
    'jquery-select2'
], function($, _, BaseView, ImageCropView){

    var ObjectSliderView = BaseView.extend({
        templateName: "objectSliderTemplate",
        container: "#slider-block",
        canvas: {
            el: null,
            currentColor: null,
            context: null,
            image: null
        },
        imageCropView: null,

        initialize: function () {

        },

        events: {
            'click .slider-close' : 'closeSlider',
            'click #picker' : 'addColor',
            'mousemove #picker' : 'onMouseMove',
            'click .preview' : 'openPicker',
            'change #photo-upload' : 'onPhotoChange'
        },

        bindEvents: function() {
            var _this = this;

            this.listenTo(this.imageCropView, 'popupIsClosed', function() {
                _this.$el.find('#photo-upload').val('');
            });
        },

        onPhotoChange: function(e) {
            var fileInput = this.$el.find(e.currentTarget);

            this.imageCropView.init(fileInput);
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
            this.$el.find('#add-object').removeClass('open');
        },

        select2Init: function() {
            this.$el.find('.select').select2();
        },

        render: function (router) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.imageCropView = router.showView(new ImageCropView());

            this.bindEvents();

            this.canvasInit();
            this.select2Init();
            return this;
        }
    });

    return ObjectSliderView;

});