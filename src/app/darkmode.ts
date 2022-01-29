export class DarkMode {

    constructor() {
    }

    public init() {
        const isDarkMode = localStorage.getItem('isDarkMode');
        let presaved = false;
        if(isDarkMode) {
            this.enable();
            presaved = true;
        }
        if (window.matchMedia) {
            if(!presaved) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.enable();
                } else {
                    this.disable();
                }
            }
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if(e.matches) {
                    this.enable();
                } else {
                    this.disable();
                }
            });
        }
    }

    public enable() {
        if (!document.documentElement.hasAttribute('data-theme')) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        localStorage.setItem('isDarkMode', '1');
    }

    public disable() {
        if (document.documentElement.hasAttribute('data-theme')) {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.removeItem('isDarkMode');
    }

    public toggle() {
        if(document.documentElement.hasAttribute('data-theme')) {
            this.disable();
        } else {
            this.enable();
        }
    }
}