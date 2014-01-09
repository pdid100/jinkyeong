$(function() {
	
	$.fn.layerPopup = function(options) {
		var defaults = {
            curClass : 'current',
            curList : $("project_board li a")
        }
        var options =  $.extend(defaults, options);

	    return this.each(function() {
	      	var o = options,
	      		$this  = $(this),
	          	$layer = $this.find(".layer"),
	          	$layerAnchor = $this.parent("section").find("ul"),
	          	$layerClose = $this.find(".closeBtn");
	        $layer.hide();
	        $layerAnchor.find("a").each(function() {
  				$this.on("click", function(e) {
	  				e.preventDefault();
	  				var top = $(window).scrollTop() + ($(window).height() - $layer.height()) / 2,
	  					left = $(window).scrollLeft() + ($(window).width() - $layer.width()) / 2;
	  				layerWrap.append('<div class="dimmed"></div>');
	  				$(".dimmed").css("height", $(document).height());
	  				$layer.show().css({
	  					"top": top,
	  					"left": left
	  				});
	  				$(window).on("resize", function() {
	  					$layer.position({
	  						of: $(window),
	  						at: "center center",
	  						my: "center center",
	  						offset: "0 -1",
	  						collision: "none"
	  					});
	  				});
	  				$("html").css("overflow-y", "hidden");
	  			});
	  			$layerClose.on("click", function(e) { 
	  				e.preventDefault();
	  				$layer.hide();
	  				$(".dimmed").remove();
					$("html").css("overflow-y", "auto");
	  			});
	  		});
	    });
    }

	var layerPopup = {
		tgWrap: $("#layerWrap"),
		tgLayer: $(".layer"),
		init: function() {
			this.layer();
		},
		layer: function() {
			var layerWrap = layerPopup.tgWrap,
				layerPop = layerPopup.tgLayer,
				closeBtn = $(".closeBtn");
  			layerPop.hide();
  			$(".project_board li a").each(function() {
  				$(this).on("click", function(e) {
	  				e.preventDefault();
	  				var top = $(window).scrollTop() + ($(window).height() - layerPop.height()) / 2,
	  					left = $(window).scrollLeft() + ($(window).width() - layerPop.width()) / 2;
	  				layerWrap.append('<div class="dimmed"></div>');
	  				$(".dimmed").css("height", $(document).height());
	  				layerPop.show().css({
	  					"top": top,
	  					"left": left
	  				});
	  				$(window).on("resize", function() {
	  					layerPop.position({
	  						of: $(window),
	  						at: "center center",
	  						my: "center center",
	  						offset: "0 -1",
	  						collision: "none"
	  					});
	  				});
	  				$("html").css("overflow-y", "hidden");
	  			});
	  			closeBtn.on("click", function(e) { 
	  				e.preventDefault();
	  				layerPop.hide();
	  				$(".dimmed").remove();
					$("html").css("overflow-y", "auto");
	  			});
  			});
		}
	}; layerPopup.init();
});

//layer popup
$(function() {
  $.fn.layerOpen = function(options) {
    return this.each(function() {
      var $this  = $(this),
          $layer = $($this.attr('href') || null);
        $this.click(function() {
          $layer.attr('tabindex',0).show().focus();
          $layer.find('.popClose').one('click',function () {
            $layer.hide();
            $this.focus();
          });
          return false;
        });
      });
    }
  $('[data-rel="layer"]').layerOpen();


  var wrapHeight = $(document).height();
  $(".popOpen").click(function(){
    $("<div class='dim'></div>").appendTo("body");
    $(".dim").css("height", wrapHeight);
  });
  $(".popClose").click(function(){
    $(".dim").remove();
  });

  var autoCom = $(".layerOpen"),
    layer = $(".autoCom"),
    list = $(".carSearch > li");
  autoCom.on("click",function(){
    var $this  = $(this);
    layer.show().focus();
    list.on('click',function () {
      layer.hide();
      $this.focus();
    });
  });

});