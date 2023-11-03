window.onkeyup = keyup;
window.onload = loaded;

let historyPointer = 0;
const history = [];

let isPrinting = false;

let lastLogin = document.cookie;
if (!lastLogin) {
  lastLogin = new Date();
}

/**
 * Called when the page is loaded.
 */
function loaded() {
  if (isMobile) {
    $("#output").html(
      "<span id='highlight'>This Terminal is (currently) not supported on mobile devices.</span>"
    );
    $("#user").remove();
  } else {
    motd.callback();
    document.cookie = new Date();
    requestFocus();
  }
}

function keyup(e) {
  requestFocus();
  let sanitizedInput = e.target.value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  let split = sanitizedInput.split(/\s+/g);
  if (split.length == 0 || isPrinting || isMobile) return;
  let first = split[0];
  if (e.keyCode == 38 || e.keyCode == 40) {
    handleHistory(e);
  } else if (e.keyCode == 13 && first && first !== "") {
    handleCommand(split, sanitizedInput);
  }
}

function handleHistory(e) {
  let keyVal = e.keyCode == 38 ? -1 : 1;
  let element = history.length - historyPointer + keyVal;
  if (history[element]) {
    $("#input").val(history[element]);
    historyPointer += keyVal * -1;
  }
}

/**
 * Handles the given command.
 *
 * @param {string[]} split
 * @param {string} sanitizedInput
 */
function handleCommand(split, sanitizedInput) {
  history.push(sanitizedInput);
  historyPointer = 0;
  $("#output").append(
    `<span id='user'>user@dynxsty.xyz</span>:<span id='command'>~ $</span> ${sanitizedInput}<br>`
  );
  $("#input").val("");
  const first = split.shift().toLowerCase();
  const cmd = getCommand(first);
  if (cmd === null) {
    $("#output").append(
      `Command \'<span id='command'>${first}</span>\' not found. For a list of commands, type '<span id='command'>help</span>'.<br>`
    );
  } else {
    cmd.callback(split);
    // TODO: update cookies
    // cookies.insert();
  }
}

/**
 * Requests the focus for the input element.
 */
function requestFocus() {
  document.getElementById("input").focus();
}

/**
 * Prints out the given array with a typewriter effect.
 *
 * @param {string[]} arr The array to print out.
 * @param {number} index The current index.
 * @param {number} interval The interval between each item.
 */
function printOut(arr, index, interval) {
  if (index < arr.length) {
    isPrinting = true;
    $("#output").append(arr[index++] + "<br>");
    $("html,body").animate({ scrollTop: document.body.scrollHeight }, "fast");
    setTimeout(function () {
      printOut(arr, index, interval);
    }, interval);
  } else {
    isPrinting = false;
  }
}
