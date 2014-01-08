$(function() {
	var layerPopup = {
		init: function() {
			this.layerCon();
		},
		layerCon: function() {
			var tgCon = $("div.layer");
  			tgCon.hide();
  			$(".project_board li img").on("click", function() {
  				var top = $(window).scrollTop() + ($(window).height() - $(".layer").height()) / 2,
  					left = $(window).scrollLeft() + ($(window).width() - $(".layer").width()) / 2;
  				$(".layer").show().css({
  					"top": top,
  					"left": left
  				});
  			});
		}
	}
	layerPopup.init();


	//more button
	var $sec = $('.section');
	if ( $sec.length <= 1 ) $sec.find('> div:last-child').removeClass('more');
	else {
		$sec.filter(':not(:first)').hide().filter(':not(:last)').find('div:last-child').addClass('more');
		$sec.each(function(i,o){
			var $o = $(o);
			$o.find('.more').bind('click',function(e){
				e.preventDefault();
				if ( $o.next().length ) {
					$o.next().show();
					var $ts = tileMode <= 480 ? $(this) : $o.next();
					var targetScroll = $ts.offset().top;
					$(this).unbind('click').removeClass('more').addClass('empty').find('>button').remove();
					secImgEnable($o.next());
					assemble();
					windowScroll(targetScroll-$('.headerWrap').outerHeight(true)+9, {duration:1000,easing:'easeInOutCubic',delay:100,chkOver:winHeight>$o.height(),complete:function(){$o.next().find('a:first').focus()}});
				}
			});
		});
	}
	secImgEnable($sec.filter(':first'));
	function secImgEnable( sec ) {
		sec.filter(':first').find('.article img').each(function(){
			if ( !$(this).attr('src') ) $(this).attr('src' , $(this).data('src') ).attr('data-src','');
		});
	}
	/* hover - ie6 */
	$(".section .figure").hover(function () {
		$(this).addClass("hover");
	}, function () {
		$(this).removeClass("hover");
	});
});