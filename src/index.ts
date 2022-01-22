import {PagesBundle} from './app/indexes';
// @ts-ignore
new PagesBundle().allPages(window.BASE_URI).then(p => console.dir(p));