// MadrigalDesign Javascript code for portfolio
// @author jmadrigal

// rotateText method
(function(){


var rotateText = function(el, rotation, period) {
    this.rotation   = rotation,
    this.el         = el,
    this.period     = parseInt(period,10) || 3000,
    this.txt        = '',
    this.loopNum    = 0,
    this.tick(),
    this.isDeleting = false
}

// Tick method for rotateText
rotateText.prototype.tick = function() {
    var i       = this.loopNum % this.rotation.length,
        fullTxt = this.rotation[i];
    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Now we need to allow the elements to rotate
    this.el.innerHTML = '<span class="wrap">'+ this.txt + '</span>';

    // console.log($(this));
    var that    = this,
        delta   = 200 - Math.random() * 100;

    if(this.isDeleting) { delta /= 2; }
    if(!this.isDeleting && this.txt === fullTxt){
        delta           = this.period,
        this.isDeleting = true,
        this.loopNum++,
        this.txt        = '';
        this.el.style.background = "#0082d5";
    } else {
        this.isDeleting = false,
        delta           = 200;
    }

    setTimeout(function(){
        that.tick();
    }, delta);
}



// Window is now loading
window.onload = function() {
    // Handle Landing page rotation text
    var ele = document.getElementsByClassName('landing-rotext');


    for(var i=0;i<ele.length;i++) {
        var rotate = ele[i].getAttribute('data-rotate'),
            period = ele[i].getAttribute('data-period');


        if(rotate) {
            new rotateText(ele[i], JSON.parse(rotate), period);
        }
    }

    // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".landing-rotext > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);

  // carousel
  console.log($('.carousel'));
  $('.carousel').carousel({
      interval: 500,
      "pause" : "false"
  })
  .on('slide.bs.carousel', function () {
  // do something…
    console.log($(this).find("a, h1"));
    $("a, h1",".carousel-caption").fadeIn();
    //console.log()
  });
}

})(jQuery);
