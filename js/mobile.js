////////////////////////////////////////////////////////////
// MOBILE
////////////////////////////////////////////////////////////

/*!
 * 
 * START MOBILE CHECK - This is the function that runs for mobile event
 * 
 */
function checkMobileEvent(){
	if($.browser.mobile || isTablet){
		if(!viewportMode.enable){
			$('#rotateHolder').hide();
			return;	
		}
		
		$( window ).off('orientationchange').on( "orientationchange", function( event ) {
			$('#rotateHolder').hide();
			setTimeout(function() {
				checkMobileOrientation();
			}, 1000);
		});
		checkMobileOrientation();
	}
}

/*!
 * 
 * MOBILE ORIENTATION CHECK - This is the function that runs to check mobile orientation
 * 
 */
function checkMobileOrientation() {
	var o = window.orientation;
	var isLandscape=false;
	
	if(window.innerWidth>window.innerHeight){
		isLandscape=true;
	}
	
	$('#rotateHolder .rotateImg').removeClass('rotatePortrait');
	$('#rotateHolder .rotateImg').removeClass('rotateLandscape');
	
	var display = false;
	if(!isLandscape){
		//Portrait
		$('#rotateHolder .rotateImg').addClass('rotateLandscape');
		if(viewportMode.viewport == 'portrait'){
			display=true;
		}
	} else {
		//Landscape
		$('#rotateHolder .rotateImg').addClass('rotatePortrait');
		if(!viewportMode.viewport == 'portrait'){
			display=true;
		}
	}
	
	if(!display){
		$('#rotateHolder span').html(viewportMode.text);
		toggleRotate(true);
	}else{
		toggleRotate(false);
	}
}

/*!
 * 
 * TOGGLE ROTATE MESSAGE - This is the function that runs to display/hide rotate instruction
 * 
 */
function toggleRotate(con){
	if(con){
		$('#rotateHolder').fadeIn();
	}else{
		$('#rotateHolder').fadeOut();		
	}
	resizeGameFunc();
}