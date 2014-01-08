$(function() {
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