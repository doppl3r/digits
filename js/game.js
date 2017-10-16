//requires jquery

$( document ).ready(function() {
    loadIntro();
    
});

function loadIntro(){
    $('.grid').html(
        '<div class="area title-1">'+
            '<h1></h1>'+
            '<h3 style="text-align: right; opacity: 0;">by NTL Group</h3>'+
        '</div>'+
        '<div class="area option-1"><a href="" class="button" style="opacity: 0;"><span class="border">scores</span></a></div>'+
        '<div class="area option-3"><a onclick="loadOptions()" style="opacity: 0;" class="button"><span class="border">training</span></a></div>'
    );

    var text = "";
    var numList = ['295129', '521522', '126574', '736432', '632523', '623721', '647327', '251612', '735234', 'd52506', 'd24625', 'di9025', 'di2543', 'dig025', 'dig069', 'digi25', 'digi32', 'digit4', 'digit3', 'digits' ];
    var index = 0;
    var interval = setInterval(function(){
        $('.title-1 h1').html(numList[index]);
        if (index < numList.length) index++;
        else { 
            clearInterval(interval); 
            $('.title-1 h3').css('opacity','1');
            $('.option-1 a').css('opacity','1');
            $('.option-3 a').css('opacity','1');
        }
    }, 50);
}

function loadOptions(){
    $('.grid').html(
        '<div class="area logo"><h4><a href="">digits</a></h4></div>'+
        '<div class="area menu"><a onclick="exit()" class="menu-button"><span class="menu-icon"></span></a></div>'+
        '<div class="area title-2"><h2>options</h2></div>'+
        '<div class="area option-1">'+
            '<div id="type" class="button">'+
                '<p>Type</p>'+
                '<span class="data">numbers</span>'+
            '</div>'+
        '</div>'+
        '<div class="area option-2">'+
            '<div id="direction" class="button">'+
                '<p>Direction</p>'+
                '<span class="data">forward</span>'+
            '</div>'+
        '</div>'+
        '<div class="area option-3">'+
            '<div id="output" class="button">'+
                '<p>Output</p>'+
                '<span class="data">visual</span>'+
            '</div>'+
        '</div>'+
        '<div class="area option-4">'+
            '<div id="rounds" class="button">'+
                '<p>Rounds</p>'+
                '<span class="data">7</span>'+
            '</div>'+
        '</div>'+
        '<div class="area option-6"><a id="continue" onclick="loadInstructions()" class="button"><span class="border">continue</span></a></div>'
    );
    updateLocalStorage();
    //button listeners
    $('#type').on('click', function(){
        if ($('#type .data').html() == 'numbers') $('#type .data').html('numbers'); //set to 'letters' eventually
        else $('#type .data').html('numbers');
        updateLocalStorage();
    });
    $('#direction').on('click', function(){
        if ($('#direction .data').html() == 'forward') $('#direction .data').html('backwards');
        else $('#direction .data').html('forward');
        updateLocalStorage();
    });
    $('#output').on('click', function(){
        if ($('#output .data').html() == 'visual') $('#output .data').html('audio');
        else $('#output .data').html('visual');
        updateLocalStorage();
    });
}

function updateLocalStorage(){
    localStorage.setItem('type', $('#type .data').html());
    localStorage.setItem('direction', $('#direction .data').html());
    localStorage.setItem('output', $('#output .data').html());
    localStorage.setItem('rounds', $('#rounds .data').html());
    localStorage.setItem('currentRound', 0);
    localStorage.setItem('roundList', ''); //empty round list
    localStorage.setItem('paused', ''); //empty round list
    for (var i=0; i < parseInt(localStorage.getItem('rounds')); i++){
        localStorage.setItem('roundList', localStorage.getItem('roundList')+"0");
    }
}

function loadInstructions(){
    $('.grid').html(
        '<div class="area logo"><h4><a href="">digits</a></h4></div>'+
        '<div class="area menu"><a onclick="exit()" class="menu-button"><span class="menu-icon"></span></a></div>'+
        '<div class="area title-2"><h2>instructions</h2></div>'+
        '<div class="area instructions">'+
            '<p></p>'+
        '</div>'+
        '<div class="area option-5"><a onclick="loadPlay()" class="button"><span class="border">start</span></a></div>'
    );

    //get local data
    var type = localStorage.getItem('type');
    var direction = localStorage.getItem('direction');
    var output = localStorage.getItem('output');

    //update instructions
    if (type == 'letters' && direction == 'forward' && output == 'visual'){} //for future options
    else if (type == 'letters' && direction == 'backwards' && output == 'visual'){} //for future options
    else if (type == 'letters' && direction == 'forward' && output == 'audio'){} //for future options
    else if (type == 'letters' && direction == 'backwards' && output == 'audio'){} //for future options
    else if (type == 'numbers' && direction == 'forward' && output == 'visual'){ 
        $('.instructions').html(
            '<p><strong><em>Visual + Forward</em></strong></p>'+
            '<p>On the following screen, you will see a set of numbers displayed for a short period of time. As soon as the numbers disappear, please type the numbers back in.</p>'
        ); 
    }
    else if (type == 'numbers' && direction == 'backwards' && output == 'visual'){ 
        $('.instructions').html(
            '<p><strong><em>Visual + Backwards</em></strong></p>'+
            '<p>On the following screen, you will see a set of numbers displayed in a sequence. As soon as the last number disappears, please type the numbers into the box in the <strong><em>reverse order</em></strong> of how they came up.</p>'
        );
    }
    else if (type == 'numbers' && direction == 'forward' && output == 'audio'){ 
        $('.instructions').html(
            '<p><strong><em>Audio + Forwards</em></strong></p>'+
            '<p>In this activity, you will hear a sequence of numbers being read to you. When the last number is said and the answer box appears, type the numbers back into the box in the same order that you heard them.</p>'
        );
    }
    else if (type == 'numbers' && direction == 'backwards' && output == 'audio'){ 
        $('.instructions').html(
            '<p><strong><em>Audio + Backwards</em></strong></p>'+
            '<p>In this activity, you will hear a sequence of numbers being read to you. When the last number is said and the answer box comes up, type the numbers back into the box in the same <strong><em>reverse order</em></strong> that you heard them.</p>'
        ); 
    }
}

function loadPlay(){
    $('.grid').html(
        '<div class="area logo"><h4><a href="">digits</a></h4></div>'+
        '<div class="area mode"></div>'+
        '<div class="area menu"><a onclick="exit()" class="menu-button"><span class="menu-icon"></span></a></div>'+
        '<div class="area title-2"><p>Begin memorizing</p></div>'+
        '<div class="area input-1"><input></div>'+
        '<div class="area rounds"></div>'+
        '<div class="area listen"><img src="img/listen.svg"></div>'
    );
    play();
}

//initialize gamemode based on user options
function play(){
    //declare local data
    var type = localStorage.getItem('type');
    var direction = localStorage.getItem('direction');
    var output = localStorage.getItem('output');
    var rounds = parseInt(localStorage.getItem('rounds'));
    var currentRound = parseInt(localStorage.getItem('currentRound'));
    var correctString = ""; //this will be set by options
    var input = $('.input-1 input');
    var interval; //timer
    var paused = localStorage.getItem('paused') == 'true'; //make string a boolean

    //reset timer if the game was paused
    if (paused == true) clearInterval(interval);

    //disable input
    input.prop( "disabled", true );
    localStorage.setItem('paused','false');

    //update clock and submit button for new round
    $('.submit-button').remove();
    $('.grid').append('<div class="area clock"><img src="img/clock.svg"></div>');
    
    //prepare play rules
    renderRounds(rounds);
    if (output == 'visual' && direction == 'forward'){
        correctString = createString(6); //number based on user progress
        input.val(correctString); //add new string
        $('.mode').html('<p><strong><em>Visual + Forward</em></strong></p>');
        setTimeout(function(){ updateInput(); }, 5000);
    }
    else if (output == 'visual' && direction == 'backwards'){
        correctString = createString(4); //number based on user progress
        input.fadeTo(0, 0); //set alpha to 0 immediately
        $('.clock').fadeTo(0,0); //hide clock
        $('.mode').html('<p><strong><em>Visual + Backwards</em></strong></p>');
        var i = 0; //current char index
        interval = setInterval(function(){
            if (i < correctString.length){ 
                input.fadeTo(100, 1, function(){ input.fadeTo(900, 0); }); //blink alpha
                input.val(correctString.charAt(i));
                i++;
            }
            else { 
                input.fadeTo(0, 1); //set alpha to 1 immediately
                correctString = correctString.split("").reverse().join("");
                clearInterval(interval); //stop interval
                updateInput(); 
            }
        }, 1000);
    }
    else if (output == 'audio' && direction == 'forward'){
        correctString = createString(4); //number based on user progress
        $('.listen img').fadeTo(0, 0); //set alpha to 0 immediately
        $('.clock').fadeTo(0,0); //hide clock
        $('.mode').html('<p><strong><em>Audio + Forward</em></strong></p>');
        var i = 0; //current char index
        interval = setInterval(function(){
            if (i < correctString.length){ 
                $('.listen img').fadeTo(100, 1, function(){ $('.listen img').fadeTo(900, 0); }); //blink alpha
                $('#audio-'+correctString.charAt(i)).trigger('play');
                i++;
            }
            else { 
                input.fadeTo(0, 1); //set alpha to 1 immediately
                clearInterval(interval); //stop interval
                updateInput(); 
            }
        }, 1000);
    }
    else if (output == 'audio' && direction == 'backwards'){
        correctString = createString(4); //number based on user progress
        $('.listen img').fadeTo(0, 0); //set alpha to 0 immediately
        $('.clock').fadeTo(0,0); //hide clock
        $('.mode').html('<p><strong><em>Audio + Backwards</em></strong></p>');
        var i = 0; //current char index
        interval = setInterval(function(){
            if (i < correctString.length){ 
                $('.listen img').fadeTo(100, 1, function(){ $('.listen img').fadeTo(900, 0); }); //blink alpha
                $('#audio-'+correctString.charAt(i)).trigger('play');
                i++;
            }
            else { 
                input.fadeTo(0, 1); //set alpha to 1 immediately
                correctString = correctString.split("").reverse().join("");
                clearInterval(interval); //stop interval
                updateInput();
            }
        }, 1000);
    }
    localStorage.setItem('correctString', correctString);
}

//create a new string
function createString(length){ //create number or letter string based on options
    var text = "";
    var numType = localStorage.getItem('type') == 'numbers'; //isNum
    var possible = numType ? '0123456789' : 'abcdefghijklmnopqrstuvwxyz';
    var randChar = "";
    var input = $('.input-1 input');
    input.attr('type', numType ? 'number' : 'text'); //edit input type

    while (text.length < length){
        randChar = possible.charAt(Math.floor(Math.random() * possible.length));
        if (text.charAt(text.length-1) != randChar) text += randChar;
    }
    return text;
}

function renderRounds(rounds){
    //render HTML rounds 'checkboxes' null, correct, or incorrect
    $('.rounds').html(''); //empty out rounds
    for (var i=0; i < rounds; i++){
        var roundList = localStorage.getItem('roundList');
        if (roundList.charAt(i) == "0") $('.rounds').append('<img src="img/checkbox.svg">');
        else if (roundList.charAt(i) == "1") $('.rounds').append('<img src="img/checkbox-correct.svg">');
        else if (roundList.charAt(i) == "2") $('.rounds').append('<img src="img/checkbox-incorrect.svg">');
    }
}

//update the user input view
function updateInput(){
    //remove text and allow user to type if the game is not paused
    if (localStorage.getItem('paused') == 'false'){
        $('.title-2 p').html('Type what you remember.');
        $('.clock').remove();
        $('.grid').append('<div class="area submit-button"><img src="img/submit.svg"></div>');
        var input = $('.input-1 input');
    
        //update input field
        input.prop( "disabled", false ); //enable input
        input.val('');
        input.focus();
    
        //add listeners
        input.on("keypress", function(e){ 
            $('.submit-button').addClass('blink'); //enable blinking
            if (e.which == 13) checkAnswer();
        });
        $('.submit-button').on('click', function(){ checkAnswer(); });
    }
}

//check the correct string value
function checkAnswer(){
    var input = $('.input-1 input');
    var correctString = localStorage.getItem('correctString');
    var currentRound = parseInt(localStorage.getItem('currentRound'));
    var rounds = parseInt(localStorage.getItem('rounds'));

    if (input.val() == correctString){ localStorage.setItem("roundList", setCharAt(localStorage.getItem("roundList"), currentRound, 1)); }
    else { localStorage.setItem("roundList", setCharAt(localStorage.getItem("roundList"), currentRound, 2)); }
    currentRound += 1;
    localStorage.setItem('currentRound', currentRound);

    //go to next round or results page
    if (currentRound < rounds) play();
    else loadResults();
}

//replace session roundList chars
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function loadResults(){
    $('.grid').html(
        '<div class="area logo"><h4><a href="">digits</a></h4></div>'+
        '<div class="area menu"><a onclick="exit()" class="menu-button"><span class="menu-icon"></span></a></div>'+
        '<div class="area title-2"></div>'+
        '<div class="area instructions"></div>'+
        '<div class="area option-4"><a onclick="play()" class="button"><span class="border">retry</span></a></div>'+
        '<div class="area option-6"><a onclick="loadIntro()" class="button"><span class="border">home</span></a></div>'
    );

    var score = 0;
    var rounds = parseInt(localStorage.getItem('rounds'));
    //count score
    for (var i=0; i<rounds; i++){
        if (localStorage.getItem('roundList').charAt(i) == "1"){
            score++;
        }
    }
    //update results based off score
    if ((score / rounds) * 100 > 70) { //70% or greater
        $('.title-2').html('<h2>great job</h2>');
        $('.instructions').html('<p>You moved up a level! You are now on Level 7.</p>');
    }
    else {
        $('.title-2').html('<h2>uh oh</h2>');
        $('.instructions').html('<p>In order to get through this activity, you have to be trying to get every answer correct! Please restart the activity so you can work on moving up a level.</p>');
    }
}

function exit(){
    $('.grid').html(
        '<div class="area logo"><h4><a href="index.html">digits</a></h4></div>'+
        '<div class="area menu"><a href="" class="menu-button"><span class="menu-icon"></span></a></div>'+
        '<div class="area title-2"><h2>exit?</h2></div>'+
        '<div class="area instructions"><p>Exiting to the main menu will erase the progress in your current activity. Are you positive you want to exit?</p></div>'+
        '<div class="area option-4"><a onclick="loadIntro()" class="button"><span class="border">yes</span></a></div>'+
        '<div class="area option-6"><a onclick="loadPlay()" class="button"><span class="border">no</span></a></div>'
    );
    localStorage.setItem('paused','true');
}