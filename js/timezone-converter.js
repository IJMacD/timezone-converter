$(function(){
	var dateInput = $('#date-input'),
		dateTextTimeZone = $('#date-text-tz'),
		dateTextLocal = $('#date-text-local'),
		dateTextUTC = $('#date-text-utc'),
		dateTextRelative = $('#date-text-relative'),
		dateTextNow = $('#date-text-now'),
		
		currentDate,
		currentDateClone;
	
	dateInput.on("keyup change", function(){
		currentDate = moment(dateInput.val());
		updateDateText();
	});
		
	setInterval(updateNowText, 500);
	
	function updateNowText(){
		dateTextNow.text(moment().format());
	}
	
	function updateDateText(){
		if(!currentDate){
			return;
		}
		
		currentDateClone = currentDate.clone();
		
		dateTextLocal.text(currentDate.format());
		
		currentDateClone.tz("UTC");
		dateTextUTC.text(currentDateClone.format());
		
		dateTextRelative.text(currentDate.fromNow());
	}
});
