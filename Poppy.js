function Poppy(stage, mainContainer, continent, start, end, death, warName)
{
	var stage = stage;
	var mainContainer = mainContainer;
	var continent = continent;
	var start = start;
	var end = end;
	var death = death;
	var warName = warName;
	var poppySize;

	//console.log("++++" + death);

	var xstart = 10;
	var xend = 1500;
	var ystart = 700;
	var yend = 10;
	var smallestDeath = 10000;
	var biggestDeath = 50800000;
	var minScale = 10;
	var maxScale = 400;
	

	var isImageLoaded = false;

	var poppy;
	var curve;
	var lasted;

	var startxVal;
	var endxVal;

	var midx;
	var littlemidx;

	var startyVal;
	var endyVal;

	var midy;
	var littlemidy;

	var poppyPosition;



	function init()
	{
		lasted = end - start;
// LOOK HERE
		poppySize = Math.round(map(death, smallestDeath, biggestDeath, minScale, maxScale));

		startxVal = Math.round(map(start, 1890, 2015, xstart, xend));
		endxVal = Math.round(map(end, 1890, 2015, xstart, xend));

		midx = endxVal - startxVal;
		littlemidx = Math.round(midx /20);

		startyVal = Math.round(map(0, 0, 100, ystart, yend));

		var lastedlog = lasted> 0 ? (lasted == 1 ? Math.log( 1.3 ) : Math.log( lasted )) : 0;
		endyVal = Math.round(map(lastedlog, 0, 4.5, ystart, yend));
		//console.log(lasted + " , " + endyVal + " , " + lastedlog)

		midy = endyVal - startyVal;
		littlemidy = Math.round(midy /2);
// LOOK HERE
		poppyPosition = new Point(endxVal - poppySize/2, endyVal - poppySize/2);

		poppyImage = ImageUrls.getUrlByContinent(continent);

		curve = new Curve(mainContainer, 
			new Point(startxVal,ystart), 
			new Point(endxVal,endyVal),
			new Point(startxVal+littlemidx,ystart+littlemidy), 
			new Point(endxVal-littlemidx,endyVal-littlemidy), 
			Colours.getContinent(continent));

		poppy = getImage(poppyImage);

		mainContainer.addChild(curve.getShape());
		mainContainer.addChild(poppy);
		

		poppy.addEventListener("mouseover", poppyMouseOver);

	}

	function poppyMouseOver(evt) 
	{
    	//alert("type: "+evt.type+" target: "+evt.target+" stageX: "+evt.stageX);
    	alert("War Name =" + warName + ", country = "+continent + ", death = " +death);
	}

	function getImage(url)
	{
		var img = new createjs.Bitmap(url).set({x:poppyPosition.x,y:poppyPosition.y});
		img.scaleX = img.scaleY = poppySize/15;
		img.regY = img.image.height/2;
		img.regX = img.image.width/2;
		img.image.onload = function() 
		{  
			isImageLoaded = true;
		}
		return img;
	}


	this.update = function()
	{
		curve.update();
		// if(isImageLoaded)
		// {
		// }
	}



	init();
}