//遅延設定
$(function() {
    setTimeout(function() {
        $('.start p').fadeIn(1600);
    }, 500); //0.5秒後にロゴをフェードイン
    setTimeout(function() {
        $('.start').fadeOut(500);
    }, 2500); //2.5秒後に白背景をフェードアウト
    setTimeout(function() {
        $('header').fadeIn("slow"); //スクロールしてくるまで要素を消しておく
    }, 3000)
    setTimeout(function() {
        delayScrollAnime(); //3.0秒後にスクロールさせる動かす
    }, 3000)
//  //    setTimeout(function(){
//  //        writeText(); //5.0秒後に文字入力アニメーションを動かす
//        },6500)
    //    setTimeout(function(){
    //        $('#target2').css('background-image', 'url(../assets/images/background1.png)')
    //    },4500)       
});

//スタートボタンの設定
$(function() {
    $("#start_btn").click(function() {
        writeText();
        $("#start_btn").toggleClass("none");
//        $("#second_btn").removeClass("none")
    })
});
//セカンドボタンの設定
//$(function() {
//    $("#second_btn").click(function() {
//        window.alert('test');
//    })
//});

//スクロールに合わせて背景を動かす
$(window).on('scroll', function() {

    let scrollTop = $(window).scrollTop();
    let bgPosition = scrollTop / 2; //スクロール後のポジションを指定（値を大きくすると移動距離が小さくなる）

    if (bgPosition) {
        $('#app').css('background-position', 'center top +' + bgPosition + 'px');
    }
});


function delayScrollAnime() {
    let time = 0.5;//遅延時間
    let value = time;
    $('.delayScroll').each(function() {
        let parent = this;                  //親要素を取得
        let elemPos = $(this).offset().top;//要素の位置まで来たら
        let scroll = $(window).scrollTop();//スクロール値を取得
        let windowHeight = $(window).height();//画面の高さを取得
        let childs = $(this).children();    //子要素を取得

        if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
            $(childs).each(function() {

                if (!$(this).hasClass("fadeUp")) {//アニメーションのクラス名が指定されているかどうかをチェック

                    $(parent).addClass("play"); //親要素にクラス名playを追加
                    $(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
                    $(this).addClass("fadeUp");//アニメーションのクラス名を追加
                    value = value + time;//delay時間を増加させる

                    //全ての処理を終わったらplayを外す
                    let index = $(childs).index(this);
                    if ((childs.length - 1) == index) {
                        $(parent).removeClass("play");
                    }
                }
            })
        } else {
            $(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
            value = time;//delay初期値の数値に戻す
        }
    })
}

//入力風文字

let TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

function writeText() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

//写真ふわっとスクロール
$(window).scroll(function() {
    var scrollAnimationElm = document.querySelectorAll('.scroll_up , .scroll_left , .scroll_right');
    var scrollAnimationFunc = function() {
        for (var i = 0; i < scrollAnimationElm.length; i++) {
            var triggerMargin = 100;
            if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
                scrollAnimationElm[i].classList.add('on');
            }
        }
    }
    window.addEventListener('load', scrollAnimationFunc);
    window.addEventListener('scroll', scrollAnimationFunc);
});