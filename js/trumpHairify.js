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

function trumpHairify(img) {
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
				for (var i = 0; i < faces.length; i++) {
					var scaleX = img.width / img.naturalWidth
					var scaleY = img.height / img.naturalHeight
					console.log(scaleX, scaleY, faces[i])
					console.log(img.height, img.naturalHeight)
					var square = $('<div>', {
						'class':'trump-hair',
						'css': {
							'position': 'absolute',
							'left':     faces[i].x * scaleX + 'px',
							'top':      faces[i].y * scaleY + 'px',
							'width':    faces[i].width  * scaleX + 'px',
							'height':   faces[i].height * scaleX + 'px',
							'z-index': 	1,
							'border': 'solid 5px',
							'border-color': 'white'
						}
					})
					var wrap = $(img).wrap()
					$(img).before(square)
				}
			},
			error:function (code, message) {
				alert('Error: ' + message);
			}
		});
	}
}

$(document).ready(function() {
	setTimeout(function() {

		console.log("start trumpHairify")
		$.each($("img"), function(index, img) {
			$(img).attr("isTrumpHair") != "true" && trumpHairify(img)
		})

	}, 5000)
})

