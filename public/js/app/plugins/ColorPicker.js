define([
    'jquery',
    'underscore',
    'views/BaseView'
], function($, _, BaseView){

    var ColorPicker = BaseView.extend({
        templateName: 'colorPickerTemplate',
        container: ".colorpicker",
        initialize: function () {

        },

        events: {
            'mousemove #picker' : 'onMouseMove',
            'mouseout #picker': 'onMouseOut',
            'click #picker' : 'addColor'
        },

        canvas: {
            el: null,
            currentColor: null,
            onMouseMoveColor: null,
            context: null,
            image: null
        },

        openPicker: function(e) {
            var _this = this;

            this.$el.parent('.colorpicker').addClass('open');
            e.stopPropagation();

            $(document).on('click', document, function() {
                _this.closePicker();
            });
        },

        closePicker: function() {
            this.$el.parent('.colorpicker').removeClass('open');
            $(document).off();
        },

        addColor: function(e) {
            e.stopPropagation();

            this.canvas.currentColor = this.canvas.onMouseMoveColor;
            this.trigger('addColor', this.canvas.currentColor);
        },

        onMouseMove: function(e) {

            var canvasOffset = this.$el.find('#picker').offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            var pixel = this.canvas.context.getImageData(canvasX, canvasY, 1, 1).data,
                dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0],
                hexValue = '#' + ('0000' + dColor.toString(16)).substr(-6);


            this.canvas.onMouseMoveColor = hexValue;
            this.trigger('mouseMoved', pixel, hexValue);
        },

        onMouseOut: function() {
            this.trigger('mouseOut', this.canvas.currentColor);
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

        render: function () {
            this.$el.html(_.template(this.getTemplate()));
            $(this.container).html(this.$el);
            this.canvasInit();

            return this;
        }
    });

    return ColorPicker;

});

