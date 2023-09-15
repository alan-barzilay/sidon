import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { create_carousel, parse_index } from './carousel.js';

export async function create_tooltip(id, url){
    return tippy(`#${id}`, {
    content: loader,
    allowHTML: true,
    interactive: true,
    maxWidth: 350,
    appendTo: document.body,
    delay: [null, 250], // show default delay and hide 250ms delay
    async onShow(instance) {
        let imgs = await parse_index(id);
        let content;

        if(imgs){
            content = create_carousel(imgs, url);
        }
        else{
            content = '<img width="128" src="no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">';
        }
        instance.setContent(content);
    }
    });
}

const loader = `
<div class="inline-flex justify-center gap-3">
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <path
        d="M 32,21 A 11,11 0 1 0 43,32 11,11 0 0 0 32,21 Z m 0,19 a 8,8 0 1 1 8,-8 8,8 0 0 1 -8,8 z"
        opacity="0.25"/>
    <path
        d="m 30.14,21.16 a 11,11 0 0 0 -9,8.92 1.59,1.59 0 0 0 1.32,1.92 1.52,1.52 0 0 0 1.65,-1.3 8,8 0 0 1 6.66,-6.61 1.42,1.42 0 0 0 1.23,-1.4 v 0 a 1.57,1.57 0 0 0 -1.86,-1.53 z"
        class="animate-spin animate-duration-[2000ms]"/>
    </svg>

    <p>Loading...</p>
 </div>`