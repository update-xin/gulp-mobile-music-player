;(function(root){
    function renderImg(src){
        root.blurImg(src);
        var img = document.querySelector('.songImg img');
        img.src = src;
    }
    function renderInfo(data){
        var songInfoChilren = document.querySelector('.songInfo').children;
        songInfoChilren[0].innerHTML = data.name;
        songInfoChilren[1].innerHTML = data.singer;
        songInfoChilren[2].innerHTML = data.album;
    }
    function renderIsLike(isLike){
        var lis = document.querySelectorAll('.control li');
        lis[0].className = isLike ? 'liking' : '';
    }

    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike)
    }
})(window.player || (window.player = {}))