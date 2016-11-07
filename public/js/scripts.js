$("#make").bind("click", function(){
    if($("#content").val() !== ''){
                var content = $('#content').val();
                $.ajax({
                    url:'nl',
                    type:'post',
                    async:'false',
                    data:{
                        'content': content
                    },
                    success: function(data){
                                    swal({
                                        title: "好啦~复制下面的地址",   
                                        text:  "<a href=http://" + location.host + '/l/' + data + ">" + location.host + '/l/' + data + "</a>",   
                                        type: "success",  
                                        closeOnConfirm: false,
                                        html: true
                                        })
                    },
                    error: function(){
                        swal({
                        title: "God!服务器好像出了点问题",
                        type: "error"
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
