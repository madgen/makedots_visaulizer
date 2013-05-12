$(document).ready(function() {
  gh = $("#graph").height();
  var i = 0;

  $("#graph").click(function(e) {
    i += 1;
    var x = Math.round(e.pageX - $("#graph").offset().left);
    var y = Math.round(e.pageY - $("#graph").offset().top);

    $("#graph").append("<div id='dot" + i + "' class='red-dot'></div>");
    $("#dot" + i).css({"left": x - 5 + "px","top": y - 5 + "px"});
    
    if (i != 1) {
      $("#dot-coordinates textarea").append("\n");
    }
    $("#dot-coordinates textarea").append(x + " " + (gh - y));
  });

  $("#draw-lines").click(function() {
    $("#draw-lines").attr("disabled","disabled");
    // Parse lines
    raw = $("#line-params textarea").val();
    lines = raw.split("\n");
    for(var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].split(" ");
      for(var j = 0; j < 4; j++) {
        lines[i][j] = parseInt(lines[i][j]);
      }
    }

    for(var i = 0; i < lines.length; i++) {
      x1 = lines[i][0];
      y1 = gh - lines[i][1];
      x2 = lines[i][2];
      y2 = gh - lines[i][3];
      if (x2 < x1) {
        temp = y1;
        y1 = y2;
        y2 = temp;
        temp = x1;
        x1 = x2;
        x2 = temp;
      }

      // height and width differences
      hdiff = y2 - y1;
      wdiff = x2 - x1;

      div = hdiff/wdiff
      rotation = Math.atan(div) * (180/Math.PI);
      r = Math.sqrt(Math.pow(hdiff,2) + Math.pow(wdiff,2));
      ytop = y1 > y2 ? y1 : y2
      ytop = y1;
      xleft = x1 > x2 ? x2 : x1;
      $("<div class='line'>").css({
        "height": "2px",
        "width": r + "px",
        "background": "red",
        "position": "absolute",
        "top": ytop,
        "left": xleft,
        "-webkit-transform-origin": "0% 0%",
        "-moz-transform-origin": "0% 0%",
        "-ms-transform-origin": "0% 0%",
        "-o-transform-origin": "0% 0%",
        "transform-origin": "0% 0%",
        "-webkit-transform": "rotate("+rotation+"deg)",
        "-moz-transform": "rotate("+rotation+"deg)",
        "-ms-transform": "rotate("+rotation+"deg)",
        "-o-transform": "rotate("+rotation+"deg)",
        "transform": "rotate("+rotation+"deg)"
      }).appendTo("#graph");
    }
  });

  $("#remove-lines").click(function() {
    $(".line").remove(); 
    $("#draw-lines").removeAttr("disabled");
  });

  $("#reset").click(function() {
    $("#draw-lines").removeAttr("disabled");
    i = 0;
    $(".red-dot, .line").remove();
    $("#dot-coordinates textarea").text("");
    $("#line-params textarea").val("");
  });
});
