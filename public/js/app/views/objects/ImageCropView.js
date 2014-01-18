define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var ImageCropView = BaseView.extend({
        templateName: "imageCropTemplate",
        container: "#popup",
        initialize: function () {
            this.popup = $('#popup')
        },

        events: {
            "click .close" : "closePopup"
        },

        closePopup: function(){
            this.popup.toggleClass('open')

        },

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);

            return this;
        }
    });

    return ImageCropView;

});

