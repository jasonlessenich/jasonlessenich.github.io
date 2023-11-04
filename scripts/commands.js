class Command {
  /**
   * @param {string} name
   * @param {() => {}} callback
   */
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
  }
}

/**
 * The "sudo" command.
 */
const sudo = new Command("sudo", () => {
  TerminalUtils.printOut([SpanUtils.highlight("💀💀💀")], 0, 80);
  window.open("https://youtu.be/OTo73Zf-Bvo", "_blank");
});

/**
 * The "ls" command.
 */
const ls = new Command("ls", () =>
  TerminalUtils.printOut(
    [
      SpanUtils.command(
        "How_to_run_-_Slashy_Docs.zip      alphas-nudes_HIGH-RES.jpg       javadiscord.net.txt</span>"
      ),
    ],
    0,
    80
  )
);

/**
 * The "clear" command. This simply clears the terminal.
 */
const clear = new Command("clear", () => $("#output").html(""));

/**
 * The "motd" command. This is printed once the terminal is loaded.
 */
const motd = new Command("motd", () =>
  TerminalUtils.printOut(
    [
      "<span id='highlight'>██████╗ ██╗   ██╗███╗   ██╗██╗  ██╗███████╗████████╗██╗   ██╗</span>",
      "<span id='highlight'>██╔══██╗╚██╗ ██╔╝████╗  ██║╚██╗██╔╝██╔════╝╚══██╔══╝╚██╗ ██╔╝</span>",
      "<span id='highlight'>██║  ██║ ╚████╔╝ ██╔██╗ ██║ ╚███╔╝ ███████╗   ██║    ╚████╔╝ </span>",
      "<span id='highlight'>██║  ██║  ╚██╔╝  ██║╚██╗██║ ██╔██╗ ╚════██║   ██║     ╚██╔╝  </span>",
      "<span id='highlight'>██████╔╝   ██║   ██║ ╚████║██╔╝ ██╗███████║   ██║      ██║   </span>",
      "<span id='highlight'>╚═════╝    ╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   </span>",
      "<br>",
      `<span class='typewriter'>Last login: ${new Intl.DateTimeFormat(
        "en",
        defaultDateFormat
      ).format(CookieData.getLastLogin())}</span><br>`,
    ],
    0,
    80
  )
);

/**
 * The "help" command. This lists all available commands.
 */
const help = new Command("help", () =>
  TerminalUtils.printOut(
    [
      `${SpanUtils.command(
        "help                "
      )} Shows a list with all commands`,
      `${SpanUtils.command("whois               ")} Who am I?`,
      `${SpanUtils.command(
        "social              "
      )} Lists all my social networks`,
      `${SpanUtils.command("theme [theme]       ")} Allows to change the theme`,
      `${SpanUtils.command("history (clear)     ")} Shows the command history`,
      `${SpanUtils.command(
        "motd                "
      )} Displays the message of the day (banner)`,
      `${SpanUtils.command("clear               ")} Clears the terminal`,
      "<br>",
      "Use <span id='highlight'>sudo</span> for root privileges.",
      "<br>",
    ],
    0,
    80
  )
);

/**
 * The "social" command. This lists all my social networks.
 */
const social = new Command("social", () =>
  TerminalUtils.printOut(
    [
      SpanUtils.highlight("My Socials 🌐"),
      "<br>",
      `${SpanUtils.command("discord           ")} dynxsty.json`,
      `${SpanUtils.command(
        "twitter           "
      )} <a id='link' href='https://twitter.com/Dynxstyyyy' target='_blank'>https://twitter.com/dynxsty_json</a>`,
      `${SpanUtils.command(
        "reddit            "
      )} <a id='link' href='https://www.reddit.com/user/Dynxsty-' target='_blank'>https://www.reddit.com/user/Dynxsty-</a>`,
      `${SpanUtils.command(
        "github            "
      )} <a id='link' href='https://github.com/DynxstyGIT' target='_blank'>https://github.com/DynxstyGIT</a>`,
      `${SpanUtils.command(
        "steam             "
      )} <a id='link' href='https://steamcommunity.com/id/dynxstyyy/' target='_blank'>https://steamcommunity.com/id/dynxstyyy/</a>`,
    ],
    0,
    80
  )
);

/**
 * The "whois" command. This displays information about me.
 */
const whois = new Command("whois", () =>
  TerminalUtils.printOut(
    [SpanUtils.highlight("Hey, I'm Jason 👋"), "Coming soon!", "<br>"],
    0,
    80
  )
);

/**
 * The "theme" command. This allows to change the theme.
 */
const theme = new Command("theme", (args) => {
  const palette = getPalette(args[0]);
  if (palette === null) {
    let current = CookieData.getTheme();
    TerminalUtils.printOut(
      [
        `Current theme: ${SpanUtils.highlight(current.displayName)}`,
        `${SpanUtils.user("▉")} (${current.primaryColor}, Primary)`,
        `${SpanUtils.command("▉")} (${current.secondaryColor}, Secondary)`,
        `▉ (${current.textColor}, Text)`,
        `${SpanUtils.highlight("▉")} (${current.highlightColor}, Highlight)`,
        "<br>",
        `Available themes: [${palettes
          .map((p) =>
            p.shortName === current.shortName
              ? SpanUtils.command(p.shortName)
              : SpanUtils.highlight(p.shortName)
          )
          .join("|")}]</span>`,
      ],
      0,
      80
    );
    return;
  }
  ColorPalette.applyTerminalTheme(palette);
  TerminalUtils.printOut(
    [
      `Changed theme to: ${SpanUtils.highlight(palette.displayName)}`,
      `${SpanUtils.user("▉")} (Primary)`,
      `${SpanUtils.command("▉")} (Secondary)`,
      "▉ (Text)",
      `${SpanUtils.highlight("▉")} (Highlight)`,
      "<br>",
    ],
    0,
    80
  );
});

/**
 * The "history" command. This displays the current command history.
 * If the "clear" argument is given, the entire command history will be cleared.
 */
const history = new Command("history", (args) => {
  if (args && args[0] === "clear") {
    let amount = CookieData.getHistory().length;
    CookieData.updateHistory([]);
    commandHistory = [];
    TerminalUtils.printOut(
      [`Successfully cleared ${SpanUtils.highlight(amount)} commands`],
      0,
      80
    );
    return;
  }
  TerminalUtils.printOut(
    [
      ...commandHistory.map((h) => `# ${SpanUtils.highlight(h)}`),
      "<br>",
      `Use ${SpanUtils.command(
        "history clear"
      )} to clear your command history.`,
    ],
    0,
    80
  );
});

const commands = [sudo, ls, clear, motd, help, social, whois, theme, history];

/**
 * @param {string} str The command's name.
 * @returns {Command?} The command.
 */
function getCommand(str) {
  for (const cmd of commands) {
    if (cmd.name === str) {
      return cmd;
    }
  }
  return null;
}
