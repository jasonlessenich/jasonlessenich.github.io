window.onkeyup = keyup;
window.onload = loaded;

let isMobile =  //has to be a let, as window size might differ, while the js has already declared the const
// check window with
window.innerWidth < 480 || 
// check user agent
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
// check with MediaQueryList
window.matchMedia("only screen and (max-width: 480px)").matches;


const history = [];
const formatOptions = {
    weekday: 'short', 
    month: 'short', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    year: 'numeric'
}
var historyPointer = 1;
var lastLogin = document.cookie;
if (!lastLogin) {
    lastLogin = new Date();
}

const motd = [
"<span id='highlight'>██████╗ ██╗   ██╗███╗   ██╗██╗  ██╗███████╗████████╗██╗   ██╗</span>",
"<span id='highlight'>██╔══██╗╚██╗ ██╔╝████╗  ██║╚██╗██╔╝██╔════╝╚══██╔══╝╚██╗ ██╔╝</span>",
"<span id='highlight'>██║  ██║ ╚████╔╝ ██╔██╗ ██║ ╚███╔╝ ███████╗   ██║    ╚████╔╝ </span>",
"<span id='highlight'>██║  ██║  ╚██╔╝  ██║╚██╗██║ ██╔██╗ ╚════██║   ██║     ╚██╔╝  </span>",
"<span id='highlight'>██████╔╝   ██║   ██║ ╚████║██╔╝ ██╗███████║   ██║      ██║   </span>",
"<span id='highlight'>╚═════╝    ╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   </span>",
"<br>",
"<span class='typewriter'>Last login: " + new Intl.DateTimeFormat('en', formatOptions).format(Date.parse(lastLogin)) + "</span><br>"
];
var isPrinting = false;

function loaded() {
    if (isMobile) {
        $('#output').html("<span id='highlight'>This Terminal is (currently) not supported on mobile devices.</span>");
        $('#user').remove();
    } else {
        printOut(motd, 0, 80);
        document.cookie = new Date();
        document.getElementById("input").focus()
    }
}

function keyup(e) {
    document.getElementById("input").focus()
    var input = e.target.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").split(/(\s+)/);
    if (input.length == 0 || isPrinting || isMobile) return;
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
            $('#output').append("<span id='user'>user@dynxsty.xyz:~$</span> " + e.target.value + "<br>");
            $('#input').val('');
            checkInput(input);
            $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
        }
    }
}

function checkInput(input) {
    switch (input[0].toLowerCase()) {
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

        case "ls":
            printOut(ls, 0, 80);
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
