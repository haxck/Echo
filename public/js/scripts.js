$("#make").bind("click", function(){
    if($("#content").val() !== ''){
                var content = $('#content').val();
                $.ajax({
                    url:'nl',
                    type:'post',
                    data:{
                        'content': content
                    },
                    success: function(data){
                                    swal({
                                        title: "好啦~复制下面的地址",
                                        text:  "<a class=\"cpt\" href=\"#\" data-clipboard-text=http://" + location.host + '/l/' + data + ">" + location.host + '/l/' + data + "</a>",
                                        type: "success",
                                        closeOnConfirm: false,
                                        showConfirmButton: false,
                                        html: true
                                        })
                    }
                });
    }else{swal({
            title: "",
            text: "不写点儿吗？",
            type: "error"
            })
        }
    })
