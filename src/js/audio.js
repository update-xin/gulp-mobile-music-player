;(function(root){
    function AudioManage(){
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioManage.prototype = {
        load:function(src){
            this.audio.src = src;
            this.audio.load()
        },
        play:function(){
            this.audio.play();
            this.status = 'play'
        },
        pause:function(){
            this.audio.pause();
            this.status = 'pause'
        },
        end:function(fn){
            this.audio.onended = fn
        },
        playTo:function(time){
            this.audio.currentTime = time;
        }
    }

    root.music = new AudioManage()

})(window.player || (window.player = {}))