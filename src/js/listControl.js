; (function (root) {
    function listControl(data, wrap) {
        var list = document.createElement('div'),
            dl = document.createElement('dl'),
            dt = document.createElement('dt'),
            close = document.createElement('div'),
            musicList = [];
        list.className = 'list';
        dt.innerHTML = '播放列表';
        close.className = 'close';
        close.innerHTML = '关闭';
        dl.appendChild(dt);
        data.forEach(function (item, index) {
            var dd = document.createElement('dd');
            dd.innerHTML = item.name;
            dd.addEventListener('touchend', function () {
                changeSelect(index);
            });
            dl.appendChild(dd);
            musicList.push(dd)
        })
        list.appendChild(dl)
        list.appendChild(close);
        wrap.appendChild(list);
        changeSelect(0);
        var disY = list.offsetHeight;
        list.style.transform = 'translateY(' + disY + 'px)';
        close.addEventListener('touchend',slideDown);
        function slideDown(){
            list.style.transition = '.2s';
            list.style.transform = 'translateY(' + disY + 'px)';
        }
        function slideUp(){
            list.style.transition = '.2s';
            list.style.transform = 'translateY(0)'
        }

        function changeSelect(index) {
            for (var i = 0; i < musicList.length; i++) {
                musicList[i].className = ''
            }
            musicList[index].className = 'active'
        }
        return {
            musicList:musicList,
            slideDown:slideDown,
            slideUp:slideUp,
            changeSelect:changeSelect
        }
    }

    root.listControl = listControl;

})(this.player || (this.player = {}))