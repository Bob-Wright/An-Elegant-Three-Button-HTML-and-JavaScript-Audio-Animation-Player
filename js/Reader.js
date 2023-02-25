// Reader.js
// scale the images to fill the viewport and keep aspect
// this is for demo and has extra tagging/labeling features
// comment out the console.info messages once you figure it out
 var showDetails = 0;
 var showVPDetails = 0;
 var clicked = 2;
 var currentImgID = 0;
 var viewportWidth = $(window).width();
 var viewportHeight = $(window).height();
 var elWidth = 0;
 var elHeight = 0;
 var scale = 1;
 var mp3Count = 0;
 var AltDataMsg = "";
 //var audio;
 var currentImgFolder = "";
 var currentBase = "";
 var currentMP3 = "";
	
 // browser needs to decide which source image to load for each image element
 // before it can tell us which it is, use window onload instead of jquery ready

window.onload = function() {
let searchParams = new URLSearchParams(window.location.search);
if(searchParams.has('info')) { // show some details about the images on query
 var showDetails = 1;
	console.info("show details true");
} // true
$(window).resize(function() {
	if(showVPDetails == 1) {
		$("body").append('<div id="viewport-size" style="display:block;color:#fff;background:#08F;position:fixed;top:0;left:0;font-size:2vw;z-index:5;"></div>');}
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	var VPaspectRatio = viewportWidth / viewportHeight;
	var VPaspectRounded = (Math.round(VPaspectRatio * 100)) / 100;
	  // console.info("rounded VP aspect " + VPaspectRounded);
 	if(showVPDetails == 1) {
	$("#viewport-size").html('<div class="dimensions">' + viewportWidth + ' &times; ' + viewportHeight + ' px &amp; w/h = ' + VPaspectRounded + ' </div>');}

	// delete old info cards on resize
	$(".info").each(function() {
	  this.remove();
	});
	// get total src image count not including alt images
	var pnlmatched = $(".imgblock img.src");
	var pnlimgCount = pnlmatched.length;
	console.info("Number of src panels = " + pnlimgCount);
	// get total alt image count
	var altmatched = $(".imgblock img.alt");
	var altimgCount = altmatched.length;
	console.info("Number of alt panels = " + altimgCount);
	// get total alt audio count
	var mp3matched = $(".imgblock .playMP3");
	var mp3Count = mp3matched.length / 2;
	console.info("Number of alt panels with audio = " + mp3Count);

	var matched = $(".imgblock img");
	var imgCount = matched.length;
	console.info("Total Number of images/panels = " + imgCount);

	// loop through each image and tag it with an "id"
	matched.each(function() {
		console.info("================");
		console.info("currentSource "+ this.currentSrc);
		currentImgID = (this.getAttribute("id"));
			console.info("current img ID = "+ currentImgID);
		//});
		//console.info("next index "+ imgcounter);

	if (this.currentSrc.endsWith(".gif")) {
	  // get the image dimensions, faster to have sizes already specified
		if (this.currentSrc.includes("-w") && this.currentSrc.includes("-h")) {
	    var fnameLen = this.currentSrc.indexOf(".gif");
	    var elWidth = this.currentSrc.substr((this.currentSrc.indexOf("-w") + 2), 3 );
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-h") + 2), 3 );
		}
	}
	if (this.currentSrc.endsWith(".avif")) {
	  // get the image dimensions, faster to have sizes already specified
		if (this.currentSrc.includes("-w") && this.currentSrc.includes("-h")) {
	    var fnameLen = this.currentSrc.indexOf(".avif");
	    var elWidth = this.currentSrc.substr((this.currentSrc.indexOf("-w") + 2), 3 );
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-h") + 2), 3 );
		}
	}
	if (this.currentSrc.endsWith(".webp")) {
	  // get the image dimensions, faster to have sizes already specified
		if (this.currentSrc.includes("-w") && this.currentSrc.includes("-h")) {
	    var fnameLen = this.currentSrc.indexOf(".webp");
	    var elWidth = this.currentSrc.substr((this.currentSrc.indexOf("-w") + 2), 3 );
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-h") + 2), 3 );
		}
	}
/*if (document.body.classList.includes("no-avif")) {	avifSpt = 'no-avif';
	console.info('avifSpt ' + avifSpt);}
	if (this.currentSrc.endsWith(".avif") && avifSpt == 'no-avif') {
	nameLength = (this.currentSrc.length ) - 4;
	nameString = this.currentSrc.substr(0, nameLength) + 'webp';
	console.info('nameString ' + nameString);
	this.currentSrc = nameString;
	}
*/

	if ((this.currentSrc.endsWith(".webp")) || (this.currentSrc.endsWith(".jpg")) || this.currentSrc.endsWith(".avif")) {

		if (this.currentSrc.includes("-s-")) {
	  // get the image dimensions, faster to have sizes already specified
	    var elWidth = 576;
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-s-") + 3 ), 4 );
		}
		if (this.currentSrc.includes("-m-")) {
	  // get the image dimensions, faster to have sizes already specified
	    var elWidth = 768;
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-m-") + 3 ), 4 );
		}
		if (this.currentSrc.includes("-l-")) {
	  // get the image dimensions, faster to have sizes already specified
	    var elWidth = 992;
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-l-") + 3 ), 4 );
		}
		if (this.currentSrc.includes("-x-")) {
	  // get the image dimensions, faster to have sizes already specified
	    var elWidth = 1200;
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-x-") + 3 ), 4 );
		}
		if (this.currentSrc.includes("-X-")) {
	  // get the image dimensions, faster to have sizes already specified
	    var elWidth = 1400;
	    var elHeight = this.currentSrc.substr((this.currentSrc.indexOf("-X-") + 3 ), 4 );
		}
	}
		console.info("nW "+elWidth);
		console.info("nH "+ elHeight);
		 elWidth = parseInt(elWidth);
		 elHeight = parseInt(elHeight);
		 viewportWidth = parseInt(viewportWidth);
		 viewportHeight = parseInt(viewportHeight);
		  //console.info("eW "+elWidth);
		  //console.info("eH "+elHeight);
		 // console.info("vW "+viewportWidth);
		 // console.info("vH "+viewportHeight);
		var aspect = elWidth/elHeight;
		var aspectRounded = (Math.round(aspect * 100)) / 100;
		 // console.info("rounded img aspect " + aspectRounded);
		var widthRatio = viewportWidth / elWidth;
		var heightRatio = viewportHeight / elHeight;
		 // console.info("wR "+widthRatio);
		 // console.info("hR "+heightRatio);
		 // default to the width ratio until proven wrong
		var scale = widthRatio;
		if (widthRatio * elHeight > viewportHeight) {
			scale = heightRatio;};
		var scaleRounded = (Math.round(scale * 100)) / 100;
		//  console.info("rounded scale " + scaleRounded);
		//  fit the content into the window
	// checkpoint for 1x1 image
	if ((elHeight == 1) && (elHeight == 1)) {
		hsize = elWidth;
		vsize = elHeight;
	} else {
		var hsize  = Math.round(elWidth * scale);
		var vsize = Math.round(elHeight * scale);
	}
		 console.info ("hsize "+hsize);
		 console.info ("vsize "+vsize);
	  // finally set the scaled image width and height attributes
		this.setAttribute("width", hsize);
		this.setAttribute("height", vsize);
		this.setAttribute("src", this.currentSrc);
	
	  // for the demo show a bunch of info about the image as displayed
		// parse out the source name and folder for messages and to see if we have audio
		var currentImg = this.currentSrc;
		var currentImgSource = [];
		currentImgSource = this.currentSrc.split('/');
		var currentImgFilename = currentImgSource[currentImgSource.length - 1];
		console.info("currentImgFilename "+ currentImgFilename);
		var currentImgFolder = currentImgSource[currentImgSource.length - 2];
		console.info("currentImgFolder "+ currentImgFolder);
		//currentImgPath = currentImgSource.pop();
		//console.info("currentImgPath array "+ currentImgSource);
		var currentImgName = [];
		currentImgName = currentImgFilename.split('.');
		var currentImgNoExt = currentImgName[0];
		//console.info("current Img name no extension"+ currentImgNoExt);
		var currentBasePlus = [];
		currentBasePlus = currentImgNoExt.split('-');
		var currentBase = currentBasePlus[0];
		console.info("current Img basename "+ currentBase);
		var currentMP3 = "";
		currentImg = document.getElementById(currentImgID);
		if((currentImg.classList.contains("playMP3")) && (currentImg.classList.contains("playGIF"))) {
			currentMP3 = currentBase + '.mp3';
			console.info('audio file exists = ' + currentMP3);
			AltDataMsg = "<br>There is an audio file named <span  style=\"color: darkBlue;\"><b><i>"+currentMP3+"</i></b></span> that will play if you click the panel or the play button with audio unmuted. By default the audio is muted. Click the audio icon to toggle audio muting.";
            //alert('file exists');
        } else {
			console.info('there is no audio file');
			AltDataMsg = "";
		}

		if((showDetails == 1) && (this.classList.contains("src")) && !(this.classList.contains("playGIF"))) {
			console.info("imageInfo");
			//this.setAttribute("id", imgcounter);
		// create info msg about the image
			srcid = "srcinfo"+currentImgID;
			console.info("srcinfo "+srcid);
			imageInfo = "<div id="+srcid+" class=\"info card imginfo col-12 shadow-md px-sm-0\" style=\"background-color: #b0d0ec;\"><p style=\"margin: 1vw;\">This image above is named <span style=\"color: darkBlue;\"><b><i>"+currentImgFilename+"</i></b></span> and it is panel number "+currentImgID+" of "+pnlimgCount+" total panels.<br>The source image size is "+elWidth+" X "+elHeight+" pixels for an aspect ratio of "+aspectRounded+". A scale multiplier of "+scaleRounded+" was then applied to fit the image to the viewport, resulting in the Image Display Size of "+hsize+" X "+vsize+" pixels seen here. There is no alternate image or audio for this panel.</p></div>";
		// display the info for this image
				$(this).after(imageInfo); 
				document.getElementById(srcid).style.display = "block";
		}
		if((showDetails == 1) && (currentImg.classList.contains("src")) && (currentImg.classList.contains("playGIF"))) {
		console.info("srcimginfo")
			//this.setAttribute("id", imgcounter);
		// create info msg about the image
			srcid = "srcinfo"+currentImgID;
			console.info("srcinfo "+srcid);
			srcimageInfo = "<div id="+srcid+" class=\"info card srcinfo col-12 shadow-md px-sm-0\" style=\"background-color: #b0d0ec;\"><p style=\"margin: 1vw;\">This image above is named <span style=\"color: darkBlue;\"><b><i>"+currentImgFilename+"</i></b></span> and it is panel number "+currentImgID+" of "+pnlimgCount+" total panels.<br>The source image size is "+elWidth+" X "+elHeight+" pixels for an aspect ratio of "+aspectRounded+". A scale multiplier of "+scaleRounded+" was then applied to fit the image to the viewport, resulting in the Image Display Size of "+hsize+" X "+vsize+" pixels seen here. This panel has an alternate image that will display if you click the panel or the play button."+AltDataMsg+"</p></div>";
		// display the info for this image
			$(this).after(srcimageInfo); 
			document.getElementById(srcid).style.display = "block";
		}
	
 		if ((showDetails == 1) && (currentImg.classList.contains("alt")) && (currentImg.classList.contains("playGIF"))) {
		console.info("altimginfo")
			//this.setAttribute("id", imgcounter);
			altid = "altinfo"+currentImgID;
			console.info("altinfo "+altid);
			altimageInfo = "<div id="+altid+" class=\"info card altinfo col-12 shadow-md px-sm-0\" style=\"background-color: #b0d0ec;\"><p style=\"margin: 1vw;\">This image above is named <span style=\"color: darkBlue;\"><b><i>"+currentImgFolder+'/'+currentImgFilename+"</i></b></span> and it is panel number "+currentImgID+" of "+pnlimgCount+" total panels.<br>The source image size is "+elWidth+" X "+elHeight+" pixels for an aspect ratio of "+aspectRounded+". A scale multiplier of "+scaleRounded+" was then applied to fit the image to the viewport, resulting in the Image Display Size of "+hsize+" X "+vsize+" pixels seen here. This panel is an alternate image that displays from a click on the panel or the play button."+AltDataMsg+"</p></div>";
		// display the info for this image
			$(this).after(altimageInfo); 
			document.getElementById(altid).style.display = "none";
		}
	}) // processed each matched image
}).trigger('resize'); //rescale images on viewport resize

/* ----------------------- */
// audio mute unmute toggle
$("audio").prop('muted', true); // muted by default
$(".bi-volume-up").hide(0);
$(".bi-volume-mute").show(0);
// toggle on click
  $(".mute-audio").click( function (){
	console.info("------ mute audio clicked -------");
    if( $("audio").prop('muted') ) {
          $("audio").prop('muted', false);
		  $(".bi-volume-mute").hide(0);
		  $(".bi-volume-up").show(0);
    } else {
      $("audio").prop('muted', true);
	  $(".bi-volume-up").hide(0);
	  $(".bi-volume-mute").show(0);                                 
    }
  });
// toggle on enter key
$(".mute-audio").keyup(function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   $(".mute-audio").click();
  }
});

/* ----------------------- */
// Control transcript display
	var transtext = "active"; // active by default
	  $(".transcript").hide(0);
	  $(".bi-badge-cc").show(0);
	  $(".bi-x-box").hide(0);
// toggle display on click
$('.transcriptControl').click( function() {
	console.info('----- transcriptControl clicked -----');
	console.info("currentImgID "+ currentImgID);
	if(transtext == "notactive") {
		transtext = "active";
	  $(".bi-x-box").hide(0);
	  $(".bi-badge-cc").show(0);
	} else {
		transtext = "notactive";
	  $(".bi-badge-cc").hide(0);
	  $(".bi-x-box").show(0);
	}
	console.info("transtext "+ transtext);
});
// toggle on enter key
$(".transcriptControl").keyup(function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   $(".transcriptControl").click();
  }
});

/* ----------------------- */
// control alternate img display
	  $(".bi-arrow-counterclockwise").hide(0);
	  $(".bi-play").show(0);
// toggle image to alternate img on click
// if it is a GIF it plays GIF each time clicked
$('.clickMeOverlay').click( function(event) {
	imgid = $(this).attr('id');
	imgindex = imgid.substring(1);
 	//clickaltinfo = $('.clickMeOverlay').children('.altinfo');
 	//clicksrcinfo = $('.clickMeOverlay').children('.srcinfo');
	console.info('----- play has been clicked -----');
	console.info("transtext "+ transtext);
	console.info("imgid " + imgid);
	console.info("imgindex " + imgindex);
	//console.info("mp3ID "+ mp3ID);
	source = ("s"+imgindex);
	altsource = ("a"+imgindex);
	pbutton = ("p"+imgindex);
	rbutton = ("r"+imgindex);
	tbutton = ("t"+imgindex);
	console.info("sourcetag " + source);
	console.info("altsourcetag " + altsource);
	console.info("Pbuttontag " + pbutton);
	console.info("Rbuttontag " + rbutton);
	console.info("transcripttag " + tbutton);
	aimage = document.getElementById(altsource);
	simage = document.getElementById(source);
	play = document.getElementById(pbutton);
	reload = document.getElementById(rbutton);
	tscript = document.getElementById(tbutton);

	//console.info(image);
	if(aimage.style.display == "none") {
		simage.style.display = "none";
		aimage.style.display = "block";
		play.style.display = "none";
		reload.style.display = "block";
		if(transtext == "active") {
		if(typeof(tscript) != 'undefined' && tscript != null) {
		tscript.style.display = "block";}}
		if(showDetails == 1) {
			src = document.getElementById("srcinfo"+source);
			src.style.display = "none";
			alt = document.getElementById("altinfo"+altsource);
			alt.style.display = "block";}
		cap = document.getElementById("caption" + imgindex);
		$(cap).css("display", "none");
		acap = document.getElementById("altcap" + imgindex);
		$(acap).css("display", "block");
		clicked = 1;

		console.info('----- image and caption changed -----');
		console.info("altimgID "+ imgindex);
		if ( $("audio").prop('muted') == false ) {
			console.info("audio not muted. play the audio.");
			var audio_element = document.getElementById("audio" + imgindex);
			if(typeof(audio_element) != 'undefined' && audio_element != null) {
    		audio_element.load();
    		audio_element.playclip = function(){
        		audio_element.pause();
        		audio_element.currentTime=0;
        		audio_element.play();}
			audio_element.playclip();
		}}
		} else {
		console.info('----- back to original image and caption -----');
		aimage.style.display = "none";
		simage.style.display = "block";
		reload.style.display = "none";
		play.style.display = "block";
		if(transtext == "active") {
		if(typeof(tscript) != 'undefined' && tscript != null) {
		tscript.style.display = "none";}}
		if(showDetails == 1) {
			src.style.display = "block";;
			alt.style.display = "none";}
		acap = document.getElementById("altcap" + imgindex);
		$(acap).css("display", "none");
		cap = document.getElementById("caption" + imgindex);
		$(cap).css("display", "block");
		clicked = 0;
		}
console.info("Clicked " + clicked);
});

/*
$('.clickMeOverlay').keyup(function(event) {
  if (event.keyCode === 13) {
	event.preventDefault();
$('.clickMeOverlay').click();
*/
}
