// JavaScript Document
var question_array = ["Question 1", "Question 2", "Question 3"];
var cur_ques = 1;
var mobile_thresh = 640;
var cur_interactive_img = 1;

function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

function make_few_visible()
{
    for (var i = 0; i < 8; i++)
    {
        $(".grid li:nth-child(" + i + ")").addClass("shown");
    }
}

function init() {
	
	 $('.your-class').slick({
            dots: true,
            autoplay: true,
			fade:true,
			pauseOnHover:false,
            autoplaySpeed: 5000,
        });
    make_few_visible();
   
       

       //$(".main_slider").height($(window).height() )
	   if(window.innerWidth>768 && $(window).width()/$(window).height()>1179/737 )
	   {
	   $(".subscribe_box").css({"min-height":$(window).height() });
	   }
	   else
	   {
		 
		$(".subscribe_box").css({"min-height":"inherit" });   
	   }
    

}

function set_tab_slider_image()
{
	if(window.innerWidth<879)
	{
		//$(".desktop_slider img").attr("src","images/150914_MSK_text-slider.jpg");
	}
	else
	{
		$(".desktop_slider img").attr("src","images/150717_MSK_Slider_1366.jpg");
	}
}

$(document).ready(function() {


    new AnimOnScroll(document.getElementById('grid'), {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.2
    });

    init();
    random_interactive_img();
	set_tab_slider_image();
    $('body').on("click", ".heart_broke", function() {

        reset_questions();

        $(".grid li").removeClass("open_feedback");

        if (window.innerWidth > mobile_thresh) {
            $(".grid li img").css({
                "opacity": 0.7
            });
            $(".prod_info").css({
                "opacity": 0.7
            });
        }
        $(this).closest("li").addClass("open_feedback");
        $(this).closest("li").children("img").css({
            "opacity": 1
        });
        $(this).closest("li").children(".prod_info").css({
            "opacity": 1
        });
        $('html,body').animate({
            scrollTop: $(this).closest("li").offset().top
        },
        'slow');
    });

    $('body').on("click", ".heart_full", function() {

        reset_questions();

        $(".grid li").removeClass("open_feedback");

        if (window.innerWidth > mobile_thresh) {
            $(".grid li img").css({
                "opacity": 0.7
            });
            $(".prod_info").css({
                "opacity": 0.7
            });
        }
        $(this).closest("li").addClass("open_feedback");
        $(this).closest("li").children("img").css({
            "opacity": 1
        });
        $(this).closest("li").children(".prod_info").css({
            "opacity": 1
        });
        $('html,body').animate({
            scrollTop: $(this).closest("li").offset().top
        },
        'slow');
    });


    $('input[type="text"]').on('focus', function() {
        // On first focus, check to see if we have the default text saved
        // If not, save current value to data()
        if (!$(this).data('defaultText'))
            $(this).data('defaultText', $(this).val());

        // check to see if the input currently equals the default before clearing it
        if ($(this).val() == $(this).data('defaultText'))
            $(this).val('');
    });
    $('input[type="text"]').on('blur', function() {
        // on blur, if there is no value, set the defaultText
        if ($(this).val() == '')
            $(this).val($(this).data('defaultText'));
    });


    $('body').on("click", ".feedback_fish", function() {

        $(this).closest("li").removeClass("open_feedback");
        reset_questions();
        $(".grid li img").css({
            "opacity": 1
        });
        $(".prod_info").css({
            "opacity": 1
        });
    });
    
    
    $('body').on("click", ".feedback_heart_broke", function() {  

        $(this).addClass("clicked");
        //console.log();
        $(this).closest(".feedback_upper").css({
            "-ms-transform": "translate(" + cur_ques * -$(".feedback_box").width() + "px,0px)",
            "-webkit-transform": "translate(" + cur_ques * -$(".feedback_box").width() + "px,0px)",
            "transform": "translate(" + cur_ques * -$(".feedback_box").width() + "px,0px)"
        });
        //console.log($(this).closest(".feedback_upper").children().length);
        if (cur_ques < $(this).closest(".feedback_upper").children().length - 1) {
            cur_ques = cur_ques + 1;
        }
    });
    
      $('body').on("click", ".feedback_heart_fill", function() {  

        $(this).addClass("clicked");
        //console.log();
        $(this).closest(".feedback_upper").css({
            "-ms-transform": "translate(" + cur_ques * -$(".feedback_box").width() + "px,0px)",
            "-webkit-transform": "translate(" + cur_ques * -$(".feedback_box").width() + "px,0px)",
            "transform": "translate(" + cur_ques * -$(".feedback_box").width() + "px,0px)"
        });
        //console.log($(this).closest(".feedback_upper").children().length);
        if (cur_ques < $(this).closest(".feedback_upper").children().length - 1) {
            cur_ques = cur_ques + 1;
        }
    });


    //$(".feedback_ques").text(question_array[cur_ques]);
   
    $(".mobile_menu").click(function() {
        $("nav").toggle();

    });

    $(".mobile_navs").click(function() {
        $(".contact_info").toggle();

    });
  

    /* Newsletter Subscription */
    $("div.newsletter input[type='submit']").on("click", function() {
        $.ajax({
            'url': 'site/subscribenewsletter',
            'cache': false,
            data: {"email": $("div.newsletter input[type='text']").val()},
            // shows the loader element before sending.
            beforeSend: function() {
                $("#loading").show();
            },
            // hides the loader after completion of request, whether successfull or failor.             
            complete: function() {
                $("#loading").hide();
            },
            success: function(data) {
                //alert(data); 
                //$('div.newsletter input').hide();
                $("div.error_msg").remove();
                $("div.newsletter").append(data);
		$("div.newsletter input[type='text']").val("Subscribe to our Newsletter");
               // $("div.newsletter p.thankyou_news").hide(4000);
               // $('div.newsletter input').show(4000);
                
            }
        });
    });
});

function random_interactive_img()
{
    $(".get_interactive img").attr("src", "images/surprise_" + cur_interactive_img + ".png");
    if (cur_interactive_img < 3)
        cur_interactive_img = cur_interactive_img + 1
    else
        cur_interactive_img = 1;
}

function feedback_panel_width() {
    
    $(".feedback_list").css({
        "width": $(".grid li").css("width")
    });

    $(".grid li").each(function() {
        $(this).find(".feedback_upper").css({
            "width": $(this).find(".feedback_upper").children().length * 100 + "%"
        });
    });
}

function reset_questions() {
    cur_ques = 1;
    $(".feedback_upper").css({
        "-ms-transform": "translate(0px,0px)",
        "-webkit-transform": "translate(0px,0px)",
        "transform": "translate(0px,0px)"
    });
}

$(window).load(function() {
  init();
    feedback_panel_width();
    $(window).scrollTop(0);

});

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(window).resize(function() {
    init();
	

});
