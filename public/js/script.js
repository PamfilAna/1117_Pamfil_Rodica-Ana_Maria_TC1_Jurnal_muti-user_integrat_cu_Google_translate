$(document).ready(function(){
    showUsers()
    showPosts()
})
function showUsers() {
    $.get('/users', function(){
        $.get( "/users", function( data ) {
            var html = ''
            data.forEach(function(user) {
                html = html + '<li><a href="#" onClick="showPosts('+user.id+')">'+user.name+'</a></li>'
            })
            $('#userList').html(html)
        });
    })
}


function showPosts(userId) {
    if(userId) {
        var url = '/users/'+ userId +'/posts';
    } else {
        var url = '/posts'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(post) {
                html = '<div class="post" style="background: lightgray">'
                  +  '<h2>'+post.title+'</h2>'
                  +  '<p>'+post.content+'</p>'
                  +  '<p>Posted on: '+post.createdAt+'</p>'
                  +  '<p>by: '+post.user.name+'</p>' //daca scot asta merge sa afisez pentru un singur utilizator for some reason
                + '</div>'+html;
            }
        )
        $('#content').html(html);
    })
}