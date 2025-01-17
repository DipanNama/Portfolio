const font = 'RubiFont';
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);


const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
});

const url = 'https://v2.jokeapi.dev/joke/Programming';

const data = [
    about = 'My name is Dipan Nama. I am a passionate frontend developer, programmer, CTF player & student from India. I am currently pursuing my MCA from The ICFAI University, Tripura.',
    skills = 'I am skilled in HTML, CSS, JavaScript, React.js, Redux, Node.js, Express.js, MongoDB, Python, Django, C, C++, Java, SQL, Git, Docker, Linux, etc.',
    projects = 'I have worked on various projects like E-commerce website, Blog website, Portfolio website, Chat application, etc.',
    education = 'I have completed my BCA from The ICFAI University, Tripura. Currently, I am pursuing my MCA from the same university.',
    contact = 'You can contact me on my email id: dipannama91@gmail.com',
    resume = 'You can download my resume from here: [Resume](https://drive.google.com/file/...)',
];

const socials = [
    Email = 'Email: dipannama91@gmail.com',
    LinkedIn = 'LinkedIn: [Dipan Nama](https://www.linkedin.com/in/dipannama)',
    GitHub = 'GitHub: [Dipan Nama](https://www.github.com/DipanNama)',
    Twitter = 'Twitter: [Dipan Nama](https://www.twitter.com/dipannama)',
];

const files = [
    'about.txt',
    'skills.txt',
    'education.txt',
    'contact.txt',
];

const dirs = ['experiences', 'projects', 'services'];


const help_details = [
    '[[b;white;]About]\n\t- Stop Stalking me',
    '[[b;white;]Skills]\n\t- List of my skills',
    '[[b;white;]Projects]\n\t- List of my projects',
    '[[b;white;]Education]\n\t- My educational background',
    '[[b;white;]Contact]\n\t- Contact me',
    '[[b;white;]Resume]\n\t- Download my resume',
    // '[[b;white;]Joke]\n\t- Tell a joke',
    '[[b;white;]Clear]\n\t- Clear the terminal',
    // '[[b;white;]Help]\n\t- Show this help message'
];



const commands = {
    about() {
        term.clear();
        term.echo(data[0], { typing: true, delay: 40 });
    },
    skills() {
        term.clear();
        term.echo(data[1], { typing: true, delay: 40 });
    },
    projects() {
        term.clear();
        term.echo(data[2], { typing: true, delay: 40 });
    },
    education() {
        term.clear();
        term.echo(data[3], { typing: true, delay: 40 });
    },
    contact() {
        term.clear();
        term.echo(data[4], { typing: true, delay: 40 });
    },
    resume() {
        term.clear();
        term.echo(data[5], { typing: true, delay: 40 });
    },
    clear() {
        term.clear();
    },
    help() {
        term.clear();
        term.echo(`[[b;white;]Type 'all' to see the full help menu.\n${help_details.join('\n')}`, { typing: true, delay: 40 });
    },
    all() {
        term.clear();
        term.echo(`Availale commands : ${help}`, { typing: true, delay: 40 });
    },
    cat(file) {
        if (file in files) {
            term.echo(files[file]);
        } else {
            this.error('File not found');
        }
    },
    echo(...args) {
        // term.clear();
        term.echo(args.join(' '), { typing: true, delay: 40 });
    },
    rainbow(...args) {
        term.echo(rainbow(args.join(' '), { typing: true, delay: 40 }));
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
            this.error('Wrong directory');
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
        const res = await fetch(url);
        const data = await res.json();
        if (data.type == 'twopart') {
            this.animation(async () => {
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
            });
        } else if (data.type === 'single') {
            this.echo(data.joke, {
                delay: 50,
                typing: true
            });
        }
    },
    reset() {
        term.clear();
        ready();
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
    term.echo(`<big>Type 'help' to see the help menu</big>\n`);
    // term.echo('[jQuery Terminal](https://terminal.jcubic.pl/)');
    // term.echo('[[;red;]hello world]');
    term.exec('echo Welcome!', { typing: true, delay: 50 });
    // term.set_prompt("data: ", { typing: true, delay: 200 });
    // term.enter("enterkey", { typing: true, delay: 200 });
    // term.on('mouseover', function() {
    //     term.exec('echo Welcome!', { typing: true, delay: 50 });
    // });
}
