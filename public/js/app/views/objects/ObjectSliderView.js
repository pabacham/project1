define([
    'jquery',
    'underscore',
    'views/BaseView',
    'views/objects/ImageCropView',
    'plugins/ColorPicker',
    'models/objects/ObjectModel',
    'jquery-select2'
], function($, _, BaseView, ImageCropView, ColorPicker, ObjectModel){

    var ObjectSliderView = BaseView.extend({
        templateName: "objectSliderTemplate",
        container: "#slider-block",
        colorPicker: null,
        imageCropView: null,

        initialize: function () {
            this.model = new ObjectModel();
        },

        events: {
            'click .slider-close' : 'closeSlider',
            'click .btn02' : 'closeSlider',
            'click .btn01' : 'saveObject',
            'click .preview' : 'openColorPicker',
            'change #photo-upload' : 'onPhotoChange',
            'click #remove-photo-btn' : 'removePhoto'
        },

        bindEvents: function() {

            this.listenTo(this.imageCropView, 'popupIsClosed', function() {
                this.$el.find('#photo-upload').val('');
            });

            this.listenTo(this.imageCropView, 'croppingFinished', function(canvas) {
                if(canvas) {
                    var ctx = this.$el.find('#object-photo').get(0).getContext("2d");
                    ctx.drawImage(canvas, 0, 0);
                    this.$el.find('#remove-photo-btn').show();
                }
            });

            this.listenTo(this.colorPicker, 'mouseMoved', function(pixel, hexValue) {
                this.$el.find('.preview').css('background', "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")");
                this.$el.find('#hexVal').val(hexValue);
            });

            this.listenTo(this.colorPicker, 'mouseOut', function(color) {
                if(color) {
                    this.$el.find('.preview').css('background', color);
                    this.$el.find('#hexVal').val(color);
                } else {
                    this.$el.find('.preview').removeAttr('style');
                    this.$el.find('#hexVal').val('');
                }
            });

            this.listenTo(this.colorPicker, 'addColor', function(color) {
                this.$el.find('.preview').css('background', color);
                this.$el.find('.preview').css('background', color);
                this.colorPicker.closePicker();
            });
        },

        onPhotoChange: function(e) {
            var fileInput = this.$el.find(e.currentTarget);
            this.imageCropView.init(fileInput);
        },

        removePhoto: function(e) {
            var canvas = this.$el.find('#object-photo').get(0);
                ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.$el.find('#remove-photo-btn').hide();
        },

        openColorPicker: function(e) {
            if(this.colorPicker) {
                this.colorPicker.openPicker(e);
            }
        },

        closeSlider: function(e) {
            e.preventDefault();
            this.$el.find('#add-object').removeClass('open');
        },

        select2Init: function() {
            this.$el.find('.select').select2();
        },

        saveObject: function(e) {
            e.preventDefault();

            this.model.set({
                'objectName': '123'
            }).save();
        },

        render: function (router) {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.imageCropView = router.showView(new ImageCropView());
            this.colorPicker = router.showView(new ColorPicker());

            this.bindEvents();

            this.select2Init();
            return this;
        }
    });

    return ObjectSliderView;

});