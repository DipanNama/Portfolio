const font = 'RubiFont';
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
});

const url = 'https://v2.jokeapi.dev/joke/Programming';

// Terminal data with markdown and code snippets
const data = {
    about: `I'm Dipan Nama, a passionate frontend developer, programmer, CTF player & student from India.
Currently pursuing my MCA from The ICFAI University, Tripura.

[[b;#14ae96;]Interests:]
- Web Development
- Cybersecurity
- Competitive Programming
- Open Source Contributions`,

    skills: `[[b;#14ae96;]Frontend:]
- HTML, CSS, JavaScript, TypeScript
- React.js, Next.js, Redux
- Tailwind CSS, SASS

[[b;#14ae96;]Backend:]
- Node.js, Express.js
- MongoDB, Firebase
- RESTful APIs

[[b;#14ae96;]Tools & Others:]
- Git, GitHub
- Docker, Linux
- Burp Suite
- Problem Solving`,

    projects: `[[b;#14ae96;]Recent Projects:]

1. [[b;white;]Portfolio Website]
   Tech: Next.js, Tailwind CSS
   \`\`\`javascript
   // Theme toggle from my portfolio
   function setTheme(theme) {
     document.body.classList.add(theme);
     document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
     localStorage.setItem('theme', theme);
   }
   \`\`\`

2. [[b;white;]Chat Application]
   Tech: React.js, Socket.io, Node.js
   \`\`\`javascript
   // Real-time messaging with Socket.io
   socket.on('message', (data) => {
     setMessages(prev => [...prev, data]);
     scrollToBottom();
   });
   \`\`\`

3. [[b;white;]E-commerce Platform]
   Tech: React, Firebase, Stripe
   \`\`\`javascript
   // Product search functionality
   const filteredProducts = products.filter(product => 
     product.name.toLowerCase().includes(searchTerm.toLowerCase())
   );
   \`\`\``,

    education: `[[b;#14ae96;]Education:]

- Master of Computer Applications (MCA)
  [[i;white;]The ICFAI University, Tripura] | Present

- Bachelor of Computer Applications (BCA)
  [[i;white;]The ICFAI University, Tripura] | Completed`,

    contact: `[[b;#14ae96;]Contact Information:]

- [[b;white;]Email:] dipannama91@gmail.com
- [[b;white;]LinkedIn:] https://www.linkedin.com/in/dipannama
- [[b;white;]GitHub:] https://www.github.com/DipanNama
- [[b;white;]Twitter:] https://www.twitter.com/dipannama91

Feel free to reach out for freelance projects, collaborations, or just to say hi!`,

    resume: `You can download my resume from here: [Resume](https://drive.google.com/file/...)`,
};

const socials = {
    Email: 'dipannama91@gmail.com',
    LinkedIn: 'https://www.linkedin.com/in/dipannama',
    GitHub: 'https://www.github.com/DipanNama',
    Twitter: 'https://www.twitter.com/dipannama91'
};

const files = [
    'about.txt',
    'skills.txt',
    'education.txt',
    'contact.txt',
];

const dirs = ['experiences', 'projects', 'services'];

// Enhanced help menu with syntax highlighting
const help_details = [
    '[[b;#14ae96;]Available Commands:]',
    '  [[b;white;]about] - About me and my interests',
    '  [[b;white;]skills] - My technical skills',
    '  [[b;white;]projects] - View my projects with code samples',
    '  [[b;white;]education] - My educational background',
    '  [[b;white;]contact] - Contact information',
    '  [[b;white;]joke] - Hear a programming joke',
    '  [[b;white;]clear] - Clear the terminal',
    '  [[b;white;]help] - Show this help message',
    '',
    'Type [[b;white;]<command>] to execute'
];



const commands = {
    about() {
        term.clear();
        term.echo(data.about, { typing: true, delay: 30 });
    },
    skills() {
        term.clear();
        term.echo(data.skills, { typing: true, delay: 30 });
    },
    projects() {
        term.clear();
        term.echo(data.projects, { typing: true, delay: 30, formatters: true });
    },
    education() {
        term.clear();
        term.echo(data.education, { typing: true, delay: 30 });
    },
    contact() {
        term.clear();
        term.echo(data.contact, { typing: true, delay: 30 });
    },
    resume() {
        term.clear();
        term.echo(data.resume, { typing: true, delay: 30 });
    },
    clear() {
        term.clear();
    },
    help() {
        term.clear();
        term.echo(help_details.join('\n'), { typing: true, delay: 20 });
    },
    all() {
        term.clear();
        term.echo(`Available commands: ${help}`, { typing: true, delay: 30 });
    },
    cat(file) {
        if (file in files) {
            term.echo(files[file]);
        } else {
            this.error('File not found');
        }
    },
    echo(...args) {
        term.echo(args.join(' '), { typing: true, delay: 30 });
    },
    rainbow(...args) {
        term.echo(rainbow(args.join(' '), { typing: true, delay: 30 }));
    },
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dir.startsWith('../') && cwd !== root &&
            dirs.includes(dir.substring(3))) {
            cwd = root + '/' + dir.substring(3);
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Directory not found: ' + dir);
        }
    },
    ls(dir = null) {
        term.clear();
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_home();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_home();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_home();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    },
    async joke() {
        try {
            term.echo('Fetching a programming joke...', { typing: true, delay: 30 });
            const res = await fetch(url);
            const data = await res.json();
            if (data.type == 'twopart') {
                this.animation(async () => {
                    await this.echo(`[[b;#14ae96;]Q:] ${data.setup}`, {
                        delay: 40,
                        typing: true
                    });
                    await this.echo(`[[b;#14ae96;]A:] ${data.delivery}`, {
                        delay: 40,
                        typing: true
                    });
                });
            } else if (data.type === 'single') {
                this.echo(data.joke, {
                    delay: 40,
                    typing: true
                });
            }
        } catch (error) {
            this.error('Failed to fetch joke. Try again later.');
        }
    },
    reset() {
        term.clear();
        ready();
    },
    socials() {
        term.clear();
        term.echo('[[b;#14ae96;]Connect with me:]', { typing: true, delay: 30 });
        Object.entries(socials).forEach(([platform, url]) => {
            term.echo(`[[b;white;]${platform}:] ${url}`, { typing: true, delay: 20 });
        });
    },
    whoami() {
        term.echo('[[b;white;]dipan@portfolio:~$] You are a visitor exploring my terminal portfolio!', 
            { typing: true, delay: 30 });
    },
    date() {
        const now = new Date();
        term.echo(`Current date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 
            { typing: true, delay: 30 });
    },
    // Easter egg
    konami() {
        term.echo(rainbow(render('LEVEL UP!')), { typing: false });
        term.echo('You found a secret command! +100 geek points.', { typing: true, delay: 30 });
    }
};


// const command_list = ['clear'].concat(Object.keys(commands));
const command_list = Object.keys(commands);
const help = formatter.format(command_list);

// const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
// const help = formatter.format(formatted_list);


const directories = {
    education: [
        '',
        '[[b;white;]Education',

        '(https://google.com)[Kielce University of Technology] [[b;yellow;]"Computer Science" 2002-2007 / 2011-2014',
        '* <a href="https://pl.wikipedia.org/wiki/Szko%C5%82a_policealna">Post-secondary</a> Electronic School <yellow>"Computer Systems"</yellow> 2000-2002',
        '* Electronic <a href="https://en.wikipedia.org/wiki/Technikum_(Polish_education)">Technikum</a> with major <yellow>"RTV"</yellow> 1995-2000',
        ''
    ],
    projects: [
        '',
        '[[b;white;]Open Source projects',
        [
            ['jQuery Terminal',
                'https://terminal.jcubic.pl',
                'library that adds terminal interface to websites'
            ],
            ['LIPS Scheme',
                'https://lips.js.org',
                'Scheme implementation in JavaScript'
            ],
            ['Sysend.js',
                'https://jcu.bi/sysend',
                'Communication between open tabs'
            ],
            ['Wayne',
                'https://jcu.bi/wayne',
                'Pure in browser HTTP requests'
            ],
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills: [
        '',
        '<white>languages</white>',

        [
            'JavaScript',
            'TypeScript',
            'Python',
            'SQL',
            'PHP',
            'Bash'
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>libraries</white>',
        [
            'React.js',
            'Redux',
            'Jest',
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'Docker',
            'git',
            'GNU/Linux'
        ].map(lib => `* <blue>${lib}</blue>`),
        ''
    ].flat()
};


function print_home() {
    term.echo(dirs.map(dir => {
        return `[[b;blue;]${dir}`;
    }).join('\n'));
    term.echo(files.map(file => {
        return `[[b;green;]${file}`;
    }).join('\n'));
}


const root = '~';
let cwd = root;
const user = 'root';
const server = 'devdipan.tech';

function prompt() {
    return `[[b;red;]${user}[[b;white;]@[[b;green;]${server}:[[b;blue;]${cwd}$ `;
}


const term = $('#terminal').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false,
    completion: true,
    // execHash: true,
    execAnimation: true,
    focus: false,
    enabled: false,
    touchscroll() {
        return true;
    },
    mousewheel() {
        return true;
    },
    prompt
    // prompt: "[[b;red;]>>> ]"
});


term.on('click', '.command', function () {
    const command = $(this).text();
    term.exec(command);
});

// term.pause();

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}

function rainbow(string) {
    return lolcat.rainbow(function (char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

// $.terminal.defaults.allowedAttributes.push('style');

$.terminal.new_formatter([
    /<big>(.*?)<\/big>/g, '[[;;;;;{"style": "--size: 1.5;letter-spacing: 2px"}]$1]',
    //     // /<white>(.*?)<\/white>/g, '[[;red;]$1]'
]);

$.terminal.new_formatter([/\[([^]+)\]\((.*?)\)/g, function (_, label, url) {
    return `[[!;;;;${url}]${label}]`;
}]);

const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
$.terminal.new_formatter([any_command_re, '[[;white;]$1']);

// term.pause();
term.blur();

function ready() {
    term.echo(() => rainbow(render('Dipan Nama')), { ansi: true }).echo()
        .echo('[[;white;]Welcome to my Terminal Portfolio!]').resume();
    
    // Enhanced intro message with code styling
    term.echo(`
[[b;#14ae96;]$ whoami]
[[;white;]> Dipan Nama - Frontend Developer & CTF Player]

[[b;#14ae96;]$ cat welcome.txt]
[[;white;]> Welcome to my interactive terminal. Type 'help' to see available commands.]

[[b;#14ae96;]$ _]
`, { typing: true, delay: 20 });
    
    // Make terminal more visible and interactive
    setTimeout(() => {
        term.focus();
    }, 1000);
}
