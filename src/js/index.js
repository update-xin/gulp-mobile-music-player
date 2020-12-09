(function ($, player) {
    function MusicPlayer(dom) {
        this.wrap = dom;
        this.dataList = [];
        this.indexObj = null;
        this.rotateTimer = null;
        this.list = null;
        this.progress = player.progress.pro;
    }
    MusicPlayer.prototype = {
        init: function () {
            this.getDom();
            this.getDate('../mock/data.json');
        },
        getDom: function () {
            this.record = document.querySelector('.songImg img');
            this.controlBtns = document.querySelectorAll('.control li')
        },
        getDate: function (url) {
            var This = this;
            $.ajax({
                url: url,
                method: 'get',
                success: function (data) {
                    This.dataList = data;
                    This.listPlay();
                    This.indexObj = new player.controlIndex(data.length);
                    This.loadMusic(This.indexObj.index);
                    This.musicControl();
                    This.dragProgress();
                },
                error: function () {
                    console.log('数据请求失败')
                }
            })
        },
        loadMusic: function (index) {
            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audioSrc);
            this.progress.renderAlltime(this.dataList[index].duration)
            if (player.music.status == 'play') {
                player.music.play();
                this.controlBtns[2].className = 'playing';
                this.imgRotate(0);
                this.progress.move(0)
            }
            this.list.changeSelect(index)
        },
        musicControl: function () {
            var This = this;
            this.controlBtns[1].addEventListener('touchend', function () {
                player.music.status = 'play';
                This.loadMusic(This.indexObj.prev());
            })
            this.controlBtns[2].addEventListener('touchend', function () {
                if (player.music.status == 'play') {
                    player.music.pause();
                    this.className = ''
                    This.imgStop();
                    This.progress.stop();
                } else {
                    player.music.play();
                    this.className = 'playing';
                    var deg = This.record.dataset.rotate || 0;
                    This.imgRotate(deg);
                    This.progress.move()

                }
            }),
                this.controlBtns[3].addEventListener('touchend', function () {
                    player.music.status = 'play';
                    This.loadMusic(This.indexObj.next())
                })
        },
        imgRotate: function (deg) {
            var This = this;
            clearInterval(this.rotateTimer);
            this.rotateTimer = setInterval(function () {
                deg = +deg + 0.2;
                This.record.style.transform = 'rotate(' + deg + 'deg)';
                This.record.dataset.rotate = deg;
            }, 1000 / 60)
        },
        imgStop: function () {
            clearInterval(this.rotateTimer)
        },
        listPlay: function () {
            var This = this;
            this.list = player.listControl(this.dataList, this.wrap);
            this.controlBtns[4].addEventListener('touchend', function () {
                This.list.slideUp()
            })
            this.list.musicList.forEach(function (item, index) {
                item.addEventListener('touchend', function () {
                    if (This.indexObj.index == index) {
                        return;
                    }
                    player.music.status = 'play';
                    This.indexObj.index = index;
                    This.loadMusic(index);
                    This.list.slideDown()
                })
            })
        },
        dragProgress:function(){
            var This = this;
            var cirlce = player.progress.drag(document.querySelector('.circle'));
            cirlce.start=function(){
                This.progress.stop();
            }
            cirlce.move=function(per){
                This.progress.update(per)
            }
            cirlce.end = function(per){
                var cutTime = per*This.dataList[This.indexObj.index].duration;
                player.music.playTo(cutTime);
                player.music.play();
                This.progress.move(per);
                var deg = This.record.dataset.rotate || 0;
                This.imgRotate(deg);
                This.controlBtns[2].className = 'playing'
            }
        }

    }

    var musicPlayer = new MusicPlayer(document.getElementById('wrap'));
    musicPlayer.init();
})(window.Zepto, window.player)

