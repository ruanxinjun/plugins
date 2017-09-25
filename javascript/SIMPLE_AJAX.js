var MYAJAX = (function(){

	var http;

	http = window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject('Microsoft.XMLHTTP');

	var send = function(METHODS,URL,SUCCESS){
		
		http.onreadystatechange = function(){
			if(http.readyState==4){
				SUCCESS&&SUCCESS(typeof http.responseText);			
			}
		};

		http.open(METHODS,URL,true);
		http.send();

		
	};

	return {
		SEND:send
	}

})();
