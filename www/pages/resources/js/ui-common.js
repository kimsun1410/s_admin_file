function init() {
	$(function() {
		var side_menu = (function(){
			$(".all_menu").click(function() {
				var $this= $(this);
			    var $wrap = $('#wrap');
			    $this.toggleClass('on');
			    $wrap.toggleClass('open');
		        if($wrap.hasClass('open')){
		            $this.text('전체보기 열기');
		        }else{
		            $this.text('전체보기 닫기');
		        };
			});
		}());

		var fixed_layout = (function(){
			var $top = $('#header').height();
			var scHeight = $('#nav_inner').prop('scrollHeight') - $top;
			$("#sidenav").css({'top':'48px'});
			$("#nav_inner").css({'padding-top':'48px'}).outerHeight(scHeight);
			(function() {
			  'use strict';
			  	var conts = document.querySelector("#container"),
			    nav = document.querySelector("#header"),
			    hHeight;

			  function setTopPadding() {
			    hHeight = nav.offsetHeight;
			    conts.style.paddingTop = hHeight + "px";
			  }

			  function onScroll() {
			    window.addEventListener("scroll", callbackFunc);
			    function callbackFunc() {
			      var offset = window.pageYOffset;
			      if (offset > 48) {
			        nav.classList.add("fixed");
			      } else {
			        nav.classList.remove("fixed");
			      }
			    }
			  }
			  window.onload = function() {
			    setTopPadding();
			    onScroll();
			  };
			  window.onresize = function() {
			    setTopPadding();
			    $('#nav_inner').height($(window).height() - $top);
			  };
			})();
 		}());

		var uiRadio = (function(){ 
    		$('input[type=radio]').each(function(){
				var ti=this, $target=$('label[for='+this.id+']'), gr=ti.name;
				if(this.checked) $target.addClass('checked');
				if(this.disabled){
					$target.hasClass('rdo_s') ? $target.addClass('rdo_disabled_s'):$target.addClass('rdo_disabled');
				}
				$(ti).off('change').on('change',function(){
					$('input[type=radio][name='+gr+']').next().removeClass('checked');
					$target.addClass('checked');
				});
			});
 		}());

		var textCount = (function(){ 
			$('#testarea').keyup(function () {
			  max = this.getAttribute("maxlength");
			  var len = $(this).val().length;
			  if (len >= max) {
			    alert('1000자');
			  } else {
			    var char = max - len;
			    $('.count').text(char);
			  }
			});
		}());

		var fileupload = (function(){ 
			var fileTarget = $('.btn_file .blind');
			fileTarget.on('change', function(){
				if(window.FileReader){  
					var filename = $(this)[0].files[0].name; 
				} else {
					var filename = $(this).val().split('/').pop().split('\\').pop();
				} 
				$(this).siblings('.uploadname').val(filename);
			});
		}());

		var uiCheck = (function(){ 
    		$('input[type=checkbox]').each(function(){
				var ti=this, $target=$('label[for='+this.id+']');

				if(this.checked) $target.addClass('checked');

				$(ti).off('change').on('change',function(){
					if(this.checked) $target.addClass('checked');
					else $target.removeClass('checked');
				});
			});
 		}());

		var uiSelect = (function(){
    		var $select = $(".iselect");
    		var value_name = $(".iselect option:eq(0)").prop("selected", true);
    		$(this).val(value_name);
		    $select.on('change', function() {
		    	var select_name = $(this).children("option:selected").text();	
				$(this).siblings("label").text(select_name);
				console.log($(this).val());
			});
 		}());

 		var uiDatapicker = (function(){ 
			$( "#datepicker_str, #datepicker_end" ).datepicker({
				dateFormat: 'yy.mm.dd',
				changeMonth: true,
				changeYear: true,
				inline: true,
			    showOtherMonths: false,
			    showMonthAfterYear: true,
			    monthNames: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
			    monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
			    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
			});
			$( "#datepicker_s, #datepicker_e" ).datepicker({
				dateFormat: 'yy.mm.dd',
				changeMonth: true,
				changeYear: true,
				inline: true,
			    showOtherMonths: false,
			    showMonthAfterYear: true,
			    monthNames: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
			    monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
			    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
			});
 		}());

 		var uiCustomscroll = (function(){ 
			$(window).on("load",function(){
				$("#inner_box").mCustomScrollbar({
            	theme:"minimal-dark",
            	scrollInertia: 0,
            	mouseWheel:{ scrollAmount: "500" },
            	mouseWheel:{ normalizeDelta: false }
            	});
			});
 		}());

 		var dataPopup = (function(){ 
			// 접근성 관련 포커스 강제 이동
			function accessibilityFocus() {
			  
			  $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
			    var next = $(e.target).attr('data-focus-next'),
			        prev = $(e.target).attr('data-focus-prev'),
			        target = next || prev || false;
			    
			    if(!target || e.keyCode != 9) {
			      return;
			    }
			    
			    if( (!e.shiftKey && !!next) || (e.shiftKey && !!prev) ) {
			      setTimeout(function(){
			        $('[data-focus="' + target + '"]').focus();
			      }, 1);
			    }
			    
			  });
			  
			}

			function popup() {
			  var openBtn = '[data-popup]',
			      closeBtn = '.popup-close';
			  var $dimmed = $('#xpopup');
			  function getTarget(t) {
			    return $(t).attr('data-popup');
			  }
			  function open(t) {
			    var showTarget = $('[data-popup-con="' + t + '"]');
			    var $elWidth = ~~(showTarget.outerWidth()),
					$elHeight = ~~(showTarget.outerHeight()),
					docWidth = $(document).width(),
					docHeight = $(document).height();
					showTarget.show().focus();
				    showTarget.find('.popup-close').data('active', t);
					$dimmed.show();
					if ($elHeight < docHeight || $elWidth < docWidth) {
						showTarget.css({
						    marginTop: -$elHeight /2,
						    marginLeft: -$elWidth/2
						})
					} else {
						showTarget.css({top: 0, left: 0});
					}
			  }
			  function close(t) {
			    var activeTarget = $('[data-popup-con="' + t + '"]');
			    $('[data-popup="' + t + '"]').focus();
			    activeTarget.attr('style','').hide();
			    $dimmed.hide();
			  }
			  $(document)
			    .on('click', openBtn, function(e){
			      e.preventDefault();
			      open(getTarget(e.target));
			      $('html').addClass('popopen');
			    })
			    .on('click', closeBtn, function(e) {
			      e.preventDefault();
			      close($(this).data('active'));
			      $('html').removeClass('popopen');
			    })
			}
			popup();
			accessibilityFocus();
 		}());
		
	});
}



