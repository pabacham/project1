define([
    'jquery',
    'underscore',
    'views/BaseView',
    'jcrop'
], function($, _, BaseView){

    var ImageCropView = BaseView.extend({
        templateName: "imageCropTemplate",
        container: "#popup",
        initialize: function () {

        },

        events: {
            'click .close' : 'closePopup',
            'click .btn02': 'closePopup'
        },

        openPopup: function(){
            this.$el.parent('#popup').addClass('open');
        },

        closePopup: function(e){
            e.preventDefault();

            this.$el.parent('#popup').removeClass('open');
        },

        init: function(fileInput) {
            var oFReader = new FileReader(),
                cropImage = this.$el.find('#crop-image'),
                imageObj = cropImage.get(0),
                canvas = this.$el.find('#crop-preview').get(0),
                context = canvas.getContext("2d"),
                _this = this;

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

                _this.openPopup();
            };

            function updatePreview(c) {
                if(parseInt(c.w) > 0) {
                    context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
                }
            };
        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return ImageCropView;

});

