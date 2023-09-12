import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { create_carousel, parse_index } from './carousel.js';


export async function create_tooltip(id, url){
    return tippy(`#${id}`, {
    content: 'Loading...',
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

