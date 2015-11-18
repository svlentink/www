//GNU General Public License by #svlentink

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
String.prototype.from = function(chr) { return this.indexOf(chr)==-1?"":this.substr(this.indexOf(chr) +1, this.length -1); };
String.prototype.until = function(chr) { return this.substr(0, this.indexOf(chr) == -1?this.length:this.indexOf(chr)); };
String.prototype.empty = function() {var curr = $.trim(this); return curr.length == 0;};

Array.prototype.pushUnique = function(item){
    if(this.indexOf(item) == -1){
        this.push(item);
        return true;
    }
    return false;
};
Array.prototype.removeDuplicates = function(){
//console.log('remove duplicates called, with:' + this);
	return this.filter(function(item, pos, self){
    	return self.indexOf(item) == pos;
  	});
};
//http://javascript.about.com/od/problemsolving/a/modulobug.htm
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

function getStorage(key, type, isChromeStorage){
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
//console.log('getStorage() called with key:' + key + ', type:' + type);
	if(type == 'object'){
		if(isChromeStorage)
			return chrome.storage.local.get(key);
		else
			return JSON.parse(localStorage.getItem(key));
	}

	var subject;
	if(isChromeStorage)
		subject = chrome.storage.local.get(key);
	else
		subject = localStorage.getItem(key);
	
	if(type == 'boolean' || type == 'bool'){
		if(typeof subject === 'undefined'
			|| subject === null
			|| subject == 'false'
			|| subject == '0'
			|| subject == false
			|| subject == 0){
			return false;
		}
		return true;
	}
	if(type == 'number'){
		if(typeof subject != 'number')
			return 0;

		if(parseInt(subject).toString() == "NaN")
			subject = 0;

		return parseFloat(subject);
	}
	else//probably string
		return subject;
}
function setStorage(key, value, isChromeStorage){
	if(isChromeStorage)
		chrome.storage.local.set(key, value);
	else{
		if(typeof value == "object")
			localStorage.setItem(key, JSON.stringify(value));
		else
			localStorage.setItem(key, value);
	}
}

function pushStorage(key, item, isChromeStorage, unique){
	var arr = getStorage(key, 'object', isChromeStorage);
	if(typeof arr != 'object')//e.g. undefined
		arr = [];
	var rtrn;
	if(unique)
		rtrn = arr.pushUnique(item);
	else
		rtrn = arr.push(item);
	
	setStorage(key, arr, isChromeStorage);
	return rtrn;//boolean
}

function getCheckField(key, label){//only localStorage possible
	var field = document.createElement('input');
	var onchange = 'localStorage.getItem(\"' + key + '\") == \"true\"?' +
		'localStorage.setItem(\"' + key + '\", \"false\"):localStorage.setItem(\"'  + key + '\",\"true\");';

	$(field).attr('type','checkbox')
		.attr('onchange', onchange)
		.attr('value', value)
		.attr('class','localStorageCheckbox')
		.attr('id', key + 'Id');
	if(getStorage(key,'boolean'))
		$(field).attr('checked','checked');

	var span = document.createElement('span');
	$(span).append('|')
		.append(field)
		.append(label + '|');
	
	return span;
}
function getInputField(key, label){// only localstorage possible
	var input = document.createElement('input');
	var value = getStorage(key);
	var onchange = 'localStorage.setItem(\"' + key + '\", this.value);';
	$(input).attr('class', 'localStorageInput')
		.attr('onchange', onchange)
		.attr('value', value)
		.attr('id', key + 'Id');

	var span = document.createElement('span');
	$(span).append('|' + label)
		.append(field)
		.append('|');
	
	return span;
}

function getDropdown(valueObj, onchange, label){
//console.log('getDropdown called with label:'+label+', onchange:' +onchange);
	var select = document.createElement('select');
	$(select).attr('onchange', onchange);
	
	for(key in valueObj){
		var option = document.createElement('option');
		var value = valueObj[key];
		$(option).attr('value', value)
			.text(key);
			
		$(select).append(option);
	}

	var span = document.createElement('span');
	$(span).text(label).append(select);
	
	return span;
}

function getDisableImgBtn(){
	var message = 'When running an extension'
		+ 'that uses \"brute force\",\n'
		+ 'it can be usefull to '
		+ 'disable image loading\n'
		+ 'for that particular website.\n'
		+ 'To do this; Open a new tab and type\n'
		+ '\"chrome://settings/contentExceptions#images\",\n'
		+ 'you can now add the site and select \"block\".';

	var btn = document.createElement('button');
	var onclick = 'alert(&quot;'+message+'&quot;)';
	var label = 'Disable images';

	$(btn).attr('onclick',onclick)
		.text(label);

	return btn;
}


//implement CORS!! 


function initStorage(obj){
//	$( document ).ready(function() {
		//if allready init then do not override vals
		if(getStorage('initCalled','boolean'))
			return;
		setStorage('initCalled', true);//not a second time
	
		for(key in obj){
			var value = obj[key];
			console.log("localStorage." + key + " is set to " + value);
			setStorage(key, value);
		}
//	});
}

