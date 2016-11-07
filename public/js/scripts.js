    var eleBack = null, eleFront = null,
    // 纸牌元素们 
    eleList = $(".box");

// 确定前面与后面元素
    var funBackOrFront = function() {
        eleList.each(function() {
            if ($(this).hasClass("out")) {
                eleBack = $(this);
            } else {
                eleFront = $(this);
            }
        });
    };
    funBackOrFront();


    $("#next").bind("click", function() {
        eleFront.addClass("out").removeClass("in");
        setTimeout(function() {
            eleFront.addClass("hide").removeClass("show");
            eleBack.addClass("in").removeClass("out");
            eleBack.addClass("show").removeClass("hide");
            // 重新确定正反元素
            funBackOrFront();
        }, 225);
        return false;
    });
    $("#pre").bind("click", function() {
        eleFront.addClass("out").removeClass("in");
        setTimeout(function() {
            eleFront.addClass("hide").removeClass("show");
            eleBack.addClass("in").removeClass("out");
            eleBack.addClass("show").removeClass("hide");
            // 重新确定正反元素
            funBackOrFront();
        }, 225);
        return false;
    });
    $("#make").bind("click", function(){
        if($("#title").val() !== ''){
            		var content = $('#content').val();
                    var title = $('#title').val();
                    $.ajax({
                        url:'new_article',
                        type:'post',
                        data:{
                            'content': content,
                            'title': title 
                        },
                        success: function(data){
                                        // swal({
                                        //     title: "Copy the following address",   
                                        //     text:  "<span id='add'>" + location.host + '/article/' + data + "</span> <a href = '#' id='d_clip_button' data-clipboard-target='add'>copy</a>",   
                                        //     type: "success",  
                                        //     closeOnConfirm: false,
                                        //     html: true
                                        //     },(function(){
                                                
                                        //         new ZeroClipboard( document.getElementById("d_clip_button"), {
                                        //                     moviePath: "ZeroClipboard.swf"
                                        //                 } );
                                                
                                        //     })())
                                            swal({   title: "Ajax request example",   text: "Submit to run ajax request",   type: "info",   showCancelButton: true,   closeOnConfirm: false,   showLoaderOnConfirm: true, }, function(){   setTimeout(function(){     swal("Ajax request finished!");   }, 2000); });
                        }
                    });
            


    }else{swal({
            title: "Error!",
            text: "Input something,please.",
            type: "error",   
            confirmButtonText: "Cool" 
            })

        }
    })
