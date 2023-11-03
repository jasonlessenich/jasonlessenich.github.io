class Command {
  /**
   *
   * @param {string} name
   * @param {() => {}} callback
   */
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
  }
}

const sudo = new Command("sudo", () => {
  printOut(["<span id='highlight'>💀💀💀</span>"], 0, 80);
  window.open("https://youtu.be/OTo73Zf-Bvo", "_blank");
});

const ls = new Command("ls", () =>
  printOut(
    [
      "<span id='highlight'>How_to_run_-_Slashy_Docs.zip      alphas-nudes_HIGH-RES.jpg       javadiscord.net.txt</span>",
    ],
    0,
    80
  )
);

const clear = new Command("clear", () => $("#output").html(""));

const motd = new Command("motd", () =>
  printOut(
    [
      "<br>",
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
      ).format(Date.parse(lastLogin))}</span><br>`,
    ],
    0,
    80
  )
);

const help = new Command("help", () =>
  printOut(
    [
      "<br>",
      "<span id='command'>help                  </span>Shows a list with all commands",
      "<span id='command'>whois                 </span>Who am I?",
      "<span id='command'>social                </span>Lists all my social networks",
      "<span id='command'>theme <theme>         </span>Allows to change the theme",
      "<span id='command'>motd                  </span>Displays the message of the day (banner)",
      "<span id='command'>clear                 </span>Clears the terminal",
      "<br>",
      "Use <span id='highlight'>sudo</span> for root privileges.",
      "<br>",
    ],
    0,
    80
  )
);

const social = new Command("social", () =>
  printOut(
    [
      "<br>",
      "<span id='highlight'>My Socials 🌐</span>",
      "<br>",
      "<span id='highlight'>discord           </span>dynxsty.json",
      "<span id='highlight'>twitter           </span><a id='link' href='https://twitter.com/Dynxstyyyy' target='_blank'>https://twitter.com/dynxsty_json</a>",
      "<span id='highlight'>reddit            </span><a id='link' href='https://www.reddit.com/user/Dynxsty-' target='_blank'>https://www.reddit.com/user/Dynxsty-</a>",
      "<span id='highlight'>github            </span><a id='link' href='https://github.com/DynxstyGIT' target='_blank'>https://github.com/DynxstyGIT</a>",
      "<span id='highlight'>steam             </span><a id='link' href='https://steamcommunity.com/id/dynxstyyy/' target='_blank'>https://steamcommunity.com/id/dynxstyyy/</a>",
      "<br>",
    ],
    0,
    80
  )
);

const whois = new Command("whois", () =>
  printOut(
    [
      "<br>",
      "<span id='highlight'>Hey, I'm Jason 👋</span>",
      "Coming soon!",
      "<br>",
    ],
    0,
    80
  )
);

const theme = new Command("theme", (args) => {
  const palette = getPalette(args[0]);
  if (palette === null) {
    printOut(
      [
        `Available themes: <span id='highlight'>[${palettes
          .map((p) => p.shortName)
          .join("|")}]</span>`,
        "<br>",
      ],
      0,
      80
    );
    return;
  }
  applyColorPalette(palette);
  printOut(
    [
      `Changed theme to: <span id='highlight'>${palette.displayName}</span>`,
      "<br>",
    ],
    0,
    80
  );
});

const commands = [sudo, ls, clear, motd, help, social, whois, theme];

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
