function trumpHairShow() {
	$(document).ready(function(){
		$(".trumpHair").css("display", "block");
	});
}
function trumpHairHide() {
	$(document).ready(function(){
		$(".trumpHair").css("display", "none");
	});
}

function hackDrawImageToCanvas(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Copy the image to canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas;
}

function addTrumpHair(img, face) {
    console.log(face, img.src)
    var scaleX = img.width / img.naturalWidth
    var scaleY = img.height / img.naturalHeight
    var square = $('<div>', {
        'class':'square',
        'css': {
            'position': 'absolute',
            'left':     face.x * scaleX + 'px',
            'top':      face.y * scaleY + 'px',
            'width':    face.width  * scaleX + 'px',
            'height':   face.height * scaleX + 'px',
            'z-index':  1,
            'border': 'solid 5px',
            'border-color': 'white'
        }
    })
    var hair = $('<img>', {
        'class': 'hair',
        'css': {
            'position': 'absolute',
            'min-height': 'initial',
            'left':     face.x * scaleX + 'px',
            'top':      face.y * scaleY - img.height*0.05 + 'px',
            'width':    face.width  * scaleX + 'px',
            'height':   face.height * scaleX + 'px',
            'z-index':  3,
            'transform':'scale(1.25, 1.25)'
        },
        'src': chrome.extension.getURL('img/hair/hair_5.png')
    })
    // $(img).before(square)

    if ($(img).parent().is("a")) {
        console.log("Wrap Hair")
        $(img).parent().before(hair)
        $(hair).wrap('<div>')
        $(hair).parent().css({
            "position": "relative"
        })
        $(hair).css({
            "position": "absolute",
            "top": face.y * scaleY - img.height*0.10 + 'px',
        })
    } else {
        $(img).before(hair)
    }


}

function trumpHairify(img) {
    try {
    	$(img).attr("isTrumpHair", "true");
     	var crossImg = new Image();
        crossImg.crossOrigin = "anonymous";
        crossImg.width = img.width;
        crossImg.style.width = img.width + "px";
        crossImg.height = img.height;
        crossImg.style.height = img.height + "px";
        crossImg.src = img.src;
        crossImg.onload = function(){
          $(hackDrawImageToCanvas(crossImg)).faceDetection({
             complete: function (faces) {
                (typeof faces === "object") &&
                Array.isArray(faces) &&
                faces.forEach(function(face) {
                    img.src.substring(0, 16) != 'chrome-extension' &&
                    addTrumpHair(img, face)
                })
            },
            error:function (code, message) {
                console.log('Error: ' + message);
            }
        });
      }
    } catch(e) {
      console.log(e);
    }
}

function hairifyAll() {
    console.log("start trumpHairify")
    window.__hairfying = true
    setTimeout(function() {
        window.__hairfying = false
    }, 5000);
    $.each($("img"), function(index, img) {
        $(img).attr("isTrumpHair") != "true" && trumpHairify(img)
    })
}

chrome.storage.local.get({ isEnabled: true, isHairEnabled: true }, function ({ isEnabled, isHairEnabled }) {
    if (!isEnabled || !isHairEnabled) {
        return;
    }

    $(document).ready(function() {
        hairifyAll();
        window.__hairfying = false
        $(document).bind("scroll", function(e){
            if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
                console.log('scrolled btm-100')
                setTimeout(function() {
                    !window.__hairfying && !window.disabled && hairifyAll();
                    window.__hairfying = true
                }, 3000)
            }

        });
    })
});
