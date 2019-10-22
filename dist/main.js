document.onreadystatechange = () => {
    const album = document.querySelector('.album');
    const home = document.querySelector('.album .home');
    let albumImages = Array.from(document.querySelectorAll('.album img'));
    let ideg = 360 / albumImages.length; // 旋转角度
    home.onclick = open;
    var nowX, nowY, lastX, lastY, minX, minY, roX = 0,
        roY = 0;
    document.onmousedown = function (ev) {
        var e = ev || event;
        lastX = e.clientX;
        lastY = e.clientY;
        this.onmousemove = function (ev) {
            var e = ev || event;

            nowX = e.clientX;
            nowY = e.clientY;

            minX = nowX - lastX;
            minY = nowY - lastY;

            roY += minX * 0.5;
            roX -= minY * 0.5;

            album.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
            lastX = nowX;
            lastY = nowY;
            //console.log(minX,minY);
        };

        this.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
            var timer = setInterval(function () //添加惯性
                {
                    minX *= 0.95;
                    minY *= 0.95;
                    roY += minX * 0.5;
                    roX -= minY * 0.5;
                    album.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
                    if (Math.abs(minX) < 0.1 || Math.abs(minY) < 0.1) {
                        clearInterval(timer);
                    }
                }, 13);
        };
        return false; //避免出现bug,在此类事件中很好用
    }

    function open() {
        albumImages.map((val, key) => {
            val.style.transform = "rotateY(" + key * ideg + "deg) translateZ(350px)";
            val.style.transition = "1s " + (albumImages.length - 1 - key) * 0.1 + "s";
        });

        setTimeout(() => {
            album.style.transform = 'rotateX(-37.2499deg) rotateY(47.1026deg)';
            album.style.transition = ".4s";
        }, albumImages.length * 100)
    }
}