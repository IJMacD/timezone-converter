$(function(){
	var dateInput = $('#date-input'),
		dateTextOriginal = $('#date-text-original'),
		dateTextLocal = $('#date-text-local'),
		dateTextUTC = $('#date-text-utc'),
		dateTextRelative = $('#date-text-relative'),
		dateTextNow = $('#date-text-now'),

		currentDate,
		currentDateLocal,
		currentDateUTC,

		zoneRegex = /[+-]\d\d:?\d\d/;

	dateInput.on("keyup change", function(){
		var val = dateInput.val(),
			zone = findZone(val);
		if(val.length){
			currentDate = moment(new Date(val));
			currentDateLocal = currentDate.clone();
			currentDateUTC = currentDate.clone().zone(0);
			if(zone){
				currentDate.zone(zone[0]);
			}
			updateDateText();
		}
	});

	dateTextNow.attr("data-label", moment().format("z"));

	setInterval(updateNowText, 500);

	function updateNowText(){
		dateTextNow.text(moment().format());
	}

	function updateDateText(){
		if(!currentDate){
			return;
		}

		dateTextOriginal.text(currentDate.format());
		dateTextOriginal.attr("data-label", formatOffset(currentDate.zone()));

		dateTextLocal.text(currentDateLocal.format());
		dateTextLocal.attr("data-label", currentDateLocal.format("Z"));

		dateTextUTC.text(currentDateUTC.format());
		dateTextUTC.attr("data-label", currentDateUTC.format("Z"));

		dateTextRelative.text(currentDate.fromNow());
	}

	function findZone(str){
		var match = str.match(zoneRegex);
		return match;
	}

	function formatOffset(minutes){
		var neg = -minutes < 0,	// offset is other way round
			abs = Math.abs(minutes),
			hours = Math.floor(abs / 60),
			mins = abs - (hours * 60);
		return (neg?"-":"+") + pad(hours) + ":" + pad(mins);
	}

	function pad(n){
		return (n<10)?"0"+n:n;
	}
});
