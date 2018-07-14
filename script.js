$(document).ready(function() {

	inputValidation();

	// Global variables
	var hexGlob = '333333';
	var rgbGlob = {
		r: 51,
		g: 51,
		b: 51
	};


	// illustrate angle
	$('#3').bind("change paste keyup", function() {
		$('.angle-circel-radius').css('transform', 'rotate(' + -($(this).val()) + 'deg)');
	});

	// Range Slider
	(function(){
		var rangesliders = $('.js-amount-range');

		rangesliders.each(function() {
			var rangeSlider = $(this);
			var rangeInput = rangeSlider.closest('.shadow-input-block').find('.shadow-input');

			rangeSlider.rangeslider({
				polyfill: false
			}).on('input', function() {
				rangeInput.val($(this).val());
			});

			rangeInput.on('input', function () {
				rangeSlider.val($(this).val()).change();
			})
		});
	})();

	// Color Picker
	(function(){
		$('.color-picker').ColorPicker({
			color: '#333333',
			onSubmit: function(hsb, hex, rgb, el, parent) {
	            $('.color-selector').css('backgroundColor', '#' + hex);
	            $(el).ColorPickerHide();
	            hexGlob = hex;
	            rgbGlob = rgb;
	        },
	        onChange: function (hsb, hex, rgb) {
				$('.color-selector').css('backgroundColor', '#' + hex);
				hexGlob = hex;
	            rgbGlob = rgb;
			}
		});
	})();

	

	$('.js-shadow-generate').click(function() {
		if ($("#validation-form").validationEngine('validate')) {
			generate();
		};

	});

	$('body').keyup(function(e) {
		if (e.which == 13 ) {
			generate();
		};
	});

	function generate() {
		var c;
		var o = $('#2').val();
		var a = parseInt($('#3').val());
		var d = parseInt($('#4').val());
		var sp = $('#5').val();
		var sz = $('#6').val();

		var cssSp = Math.round(sz * sp / 100);
		var blur = sz - cssSp;

		var verticalLength;
		var horizontalLength;


		// detect the color type
		if(o > 0){
			c = ("rgba(" + rgbGlob.r + "," + rgbGlob.g + "," + rgbGlob.b + "," + o / 100 + ")");
		}else{
			c = "#" + hexGlob;
		}

		// triangle-angle
		var triangleAngle;
		function calcTriangelAngel () {
			if( 0 <= a && a <= 90){
				triangleAngle = a;
			}else if(90 < a && a <= 180){
				triangleAngle = 180 - a;
			}else if(180 < a && a < 270){
				triangleAngle = a - 180;
			}else if(270 <= a && a <= 360){
				triangleAngle = 360 - a;
			}else{
				
			}
		};

		if( a < 0 && a >= -360){
			a = parseInt(a) + 360;
			calcTriangelAngel();
		}else{
			calcTriangelAngel();
		};

		verticalLength = Math.sin(Math.PI * (triangleAngle/180)).toFixed(2) * d;
		if( 180 < a && a < 360){
			verticalLength = -verticalLength;
		};

		horizontalLength = Math.cos(Math.PI * (triangleAngle/180)).toFixed(2) * d
		if(0 <= a && a < 90 || 270 < a && a <= 360){
			horizontalLength = -horizontalLength;
		};

		horizontalLength = Math.round(horizontalLength);
		verticalLength = Math.round(verticalLength);
		blur = Math.round(blur);

		// var result ='<span class="property">box-shadow: </span>' + 
		// '<span class="property-elems">' + horizontalLength + '</span><span class="px-unit">px</span> ' + 
		// '<span class="property-elems">' + verticalLength + '</span><span class="px-unit">px</span> ' + 
		// '<span class="property-elems">' + blur + '</span><span class="px-unit">px</span> ' + 
		// '<span class="property-elems">' + cssSp + '</span><span class="px-unit">px</span> ' + 
		// '<span class="property-elems">' + c + '</span>;<br/>';

		
		var nameArray = ['-webkit-', ''];
		var result = '';

		for (var i = 0; i < nameArray.length; i++) {
			result = result + '<span class="property">' + nameArray[i] + 'box-shadow:</span> ' + 
			'<span class="property-elems">' + horizontalLength + '</span><span class="px-unit">px</span> ' + 
			'<span class="property-elems">' + verticalLength + '</span><span class="px-unit">px</span> ' + 
			'<span class="property-elems">' + blur + '</span><span class="px-unit">px</span> ' + 
			'<span class="property-elems">' + cssSp + '</span><span class="px-unit">px</span> ' + 
			'<span class="property-elems">' + c + '</span>;<br/>';

		};

		var rezultExemple = horizontalLength + 'px ' + verticalLength + 'px ' + blur + 'px ' + cssSp + 'px ' + c;

		$('.generated-code').html(result).slideDown('400');

		$('.rezult').css('box-shadow', rezultExemple);
	};
});

function inputValidation(){
	$("#validation-form").validationEngine().submit(function(e){e.preventDefault();});
};

