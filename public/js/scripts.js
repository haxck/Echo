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
                                        swal({
                                            title: "Copy the following address",   
                                            text:  location.host + '/article/' + data,   
                                            type: "success",  
                                            closeOnConfirm: false
                                            })
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
