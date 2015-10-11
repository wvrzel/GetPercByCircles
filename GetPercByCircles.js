var activeCircle;
var setDeg;
var centerX = 0, centerY = 0;
var choose = false;
var big = false;

var GetPercByCircles = {    
    init: function() {

        $(".activeBorder").mousedown(function(e) {
            activeCircle = $(e.target);

            if(activeCircle.is(".innerCircle")) { return 0; }

            centerX = activeCircle.offset().left + activeCircle.width() / 2;
            centerY = activeCircle.offset().top + activeCircle.height() / 2;

            setDeg = function(deg) {
                if(deg < 0) return;

                var perc = (100*deg)/360;

                // Check wether the sum of percentages would be > 100
                var sum = perc;
                $(".perc").each(function() {
                    if(!activeCircle.find(".perc").is($(this))) {
                        sum += parseInt($(this).text().substring(0,$(this).text().length-1));
                    }
                });
                if(sum > 100) {
                    perc = 100 - sum + perc;
                    deg = (perc*360)/100;
                }

                if(deg >= 180) { big = true; }
                else { big = false; }

                activeCircle.find(".perc").html(Math.round(perc)+"%");

                var color, bgcolor;
                if(activeCircle.is($(".blue"))) { color = '#A2ECFB'; bgcolor = '#39B4CC'; }
                else if(activeCircle.is($(".green"))) { color = '#ECFBA2'; bgcolor = '#B4CC39'; }
                else if(activeCircle.is($(".red"))) { color = '#FECCB2'; bgcolor = '#DD7429'; }

                if (deg<=180){
                    activeCircle.css('background-image','linear-gradient(' + (90+deg) + 'deg, transparent 50%, '+color+' 50%),linear-gradient(90deg, '+color+' 50%, transparent 50%)');
                }
                else{
                    activeCircle.css('background-image','linear-gradient(' + (deg-90) + 'deg, transparent 50%, '+bgcolor+' 50%),linear-gradient(90deg, '+color+' 50%, transparent 50%)');
                }
            }

            choose = true;

            var xDiff = e.pageX - centerX;
            var yDiff = centerY - e.pageY;

            if(xDiff == 0 && yDiff >= 0) {
                var deg = 0;
            }
            else if (xDiff == 0 && yDiff < 0) {
                var deg = 180;
            }
            else {
                var deg = Math.atan(yDiff/xDiff)*360 / (2*Math.PI);
            }

            if (xDiff >= 0) {
                setDeg(90-deg);
            } else {
                setDeg(270-deg);
            }
        }).mouseup(function() {
            choose = false;
        });

        $(document).mousemove(function(e) {
            if(!choose) { return 0; }

            var xDiff = e.pageX - centerX;
            var yDiff = centerY - e.pageY;

            if(xDiff == 0 && yDiff >= 0) {
                var deg = 0;
            }
            else if (xDiff == 0 && yDiff < 0) {
                var deg = 180;
            }
            else {
                var deg = Math.atan(yDiff/xDiff)*360 / (2*Math.PI);
            }

            if (xDiff >= 0) {
                if(big && 90-deg < 20) { setDeg(360); }
                else { setDeg(90-deg); }
            } else {
                if(!big && 270-deg > 340) { setDeg(0); }
                else { setDeg(270-deg); }
            }
        });

    }
}
