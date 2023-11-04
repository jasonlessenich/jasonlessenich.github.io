let isMobile = //has to be a let, as window size might differ, while the js has already declared the const
  // check window with
  window.innerWidth < 480 ||
  // check user agent
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  // check with MediaQueryList
  window.matchMedia("only screen and (max-width: 480px)").matches;

/**
 * The default date format.
 */
const defaultDateFormat = {
  weekday: "short",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  year: "numeric",
};

class TerminalUtils {
  /**
   * Requests the focus for the input element.
   */
  static requestFocus() {
    document.getElementById("input").focus();
  }

  /**
   * Prints out the given array with a typewriter effect.
   *
   * @param {string[]} arr The array to print out.
   * @param {number} index The current index.
   * @param {number} interval The interval between each item.
   */
  static printOut(arr, index, interval) {
    if (index < arr.length) {
      isPrinting = true;
      $("#output").append(arr[index++] + "<br>");
      $("html,body").animate({ scrollTop: document.body.scrollHeight }, "fast");
      setTimeout(function () {
        TerminalUtils.printOut(arr, index, interval);
      }, interval);
    } else {
      isPrinting = false;
    }
  }
}

class SpanUtils {
  static user(str) {
    return this._span(str, "user");
  }

  static highlight(str) {
    return this._span(str, "highlight");
  }

  static command(str) {
    return this._span(str, "command");
  }

  static _span(str, id) {
    return `<span id='${id}'>${str}</span>`;
  }
}
