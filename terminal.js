/* 

Javascript Shell by Bouke Regnerus
No dependencies bash-like shell in the browser

Based on Javascript Shell by Jesse Ruderman (http://www.squarefree.com/shell/)
Styling based on CodePen by Rafael Rinaldi (http://codepen.io/rafaelrinaldi/pen/uGifm)

*/

var shellCommands =
{
	help: function(cmd, args) {
		var response = "Commands: \n\r"

		for(command in shellCommands) {
			response += "  " + command + "\n\r"
		}

		return response.substring(0, response.length - 2);;
	},

	clear: function(cmd, args) {
		while (_out.childNodes[0])
			_out.removeChild(_out.childNodes[0]);

		return 'Terminal cleared!';
	},

	random: function(cmd, args) {
		return Math.random();
	}
};

var
_win,
_in,
_out;

function refocus()
{
  _in.blur();
  _in.focus();
}

function init()
{
  _in = document.getElementById("terminal-input");
  _out = document.getElementById("terminal-output");

  _win = window;

  initTarget();

  refocus();
}

function initTarget()
{
  _win.Shell = window;
  _win.print = shellCommands.print;
}


function keepFocusInTextbox(e)
{
  var g = e.srcElement ? e.srcElement : e.target;

  while (!g.tagName)
    g = g.parentNode;
  var t = g.tagName.toUpperCase();
  if (t=="A" || t=="INPUT")
    return;

  if (window.getSelection) {
    if (String(window.getSelection()))
      return;
  }

  refocus();
}

function terminalInputKeydown(e) {
  if (e.keyCode == 13) {
    try { 
    	execute(); 
    } 
    catch(er) { 
    	alert(er); 
   	};
    setTimeout(function() { 
    	_in.value = ""; 
   	}, 0);
  }
};


function println(s, type)
{
	var type = type || 'terminal--output';
	if((s=String(s)))
	{
	var paragraph = document.createElement("p");
	paragraph.appendChild(document.createTextNode(s));
	paragraph.className = type;
	_out.appendChild(paragraph);
	return paragraph;
	}
}

function printError(er)
{
	println(er, "terminal--output is-not-defined");
}

function execute(s)
{
	var key = _in.value.substr(0,_in.value.indexOf(' ')) || _in.value;

	var args = _in.value.substr(_in.value.indexOf(' ')+1).split(" ");

	println(key, 'terminal--input');

	if(shellCommands[key.toLowerCase()]) {
		println(shellCommands[key.toLowerCase()](key.toLowerCase(), args), 'terminal--output');
	}
	else {
		printError('Command not found: ' + key);
	}
}