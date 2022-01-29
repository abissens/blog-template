export function hasClass(el: HTMLElement, className: string) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

export function addClass(el: HTMLElement, className: string) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

export function removeClass(el: HTMLElement, className: string) {
    if (el.classList) {
        el.classList.remove(className);
    } else if (hasClass(el, className)) {
        const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ');
    }
}

export function domReady(): Promise<void> {
    return new Promise<void>(resolve => {
        if (/complete|interactive|loaded/.test(document.readyState)) {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', () => resolve(), false);
        }
    });
}