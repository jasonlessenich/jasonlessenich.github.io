window.onkeyup = keyup;
window.onload = loaded;

const history = [];
var historyPointer = 1;

const motd = [
"<span id='highlight'>██████╗ ██╗   ██╗███╗   ██╗██╗  ██╗███████╗████████╗██╗   ██╗</span>",
"<span id='highlight'>██╔══██╗╚██╗ ██╔╝████╗  ██║╚██╗██╔╝██╔════╝╚══██╔══╝╚██╗ ██╔╝</span>",
"<span id='highlight'>██║  ██║ ╚████╔╝ ██╔██╗ ██║ ╚███╔╝ ███████╗   ██║    ╚████╔╝ </span>",
"<span id='highlight'>██║  ██║  ╚██╔╝  ██║╚██╗██║ ██╔██╗ ╚════██║   ██║     ╚██╔╝  </span>",
"<span id='highlight'>██████╔╝   ██║   ██║ ╚████║██╔╝ ██╗███████║   ██║      ██║   </span>",
"<span id='highlight'>╚═════╝    ╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   </span>",
"<br>",
"<span class='typewriter'>Last login: Wed May 25 20:55:47 2022 from 145.254.125.48</span><br>"
];
var isPrinting = false;

function loaded() {
 printOut(motd, 0, 80);
}

function keyup(e) {
    var input = e.target.value.split(/(\s+)/);
    if (input.length == 0 || isPrinting) return;
    var first = input[0];
    // command history (arrow-up)
    if (e.keyCode == 38) {
        var element = history.length - historyPointer - 1;
        if (history[element]) {
            $('#input').val(history[element]);
            historyPointer++;
        }
    // check command (enter)
    } else if (first && first !== "") {
        if (e.keyCode == 13) {
            history.push(e.target.value);
            historyPointer = 0;
            $('#output').append("<span id='user'>user@dynxstygit.github.io:~$</span> " + e.target.value + "<br>");
            $('#input').val('');
            checkInput(input);
            $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
        }
    }
}

function checkInput(input) {
    switch (input[0]) {
        case "help": 
            printOut(help, 0, 80);
        break;

        case "whois":
            printOut(whois, 0, 80);
        break;

        case "social":
            printOut(social, 0, 80);
        break;

        case "projects":
            printOut(projects, 0, 80);
        break;

        case "motd":
            $('#output').append("<br>");
            printOut(motd, 0, 80);
        break;

        case "clear": 
            $('#output').html("");
        break;
    
        // top secret
        case "sudo":
            window.open("https://youtu.be/OTo73Zf-Bvo", '_blank');
        break;

        default: 
            $('#output').append("Command \'<span id='command'>" + input[0] + "</span>\' not found. For a list of commands, type '<span id='command'>help</span>'.<br><br>");
    }
}

function printOut(arr, index, interval) {
    if (index < arr.length) {
        isPrinting = true;
        $('#output').append(arr[index++] + "<br>");
        setTimeout(function() { printOut(arr, index, interval); }, interval)
    } else {
        isPrinting = false;
    }
}