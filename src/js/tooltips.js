import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { create_carousel, parse_index } from './carousel.js';

export async function create(id, url){
    return tippy(`#${id}`, {
    content: loader,
    allowHTML: true,
    interactive: true,
    maxWidth: 350,
    appendTo: document.body,
    delay: [100, 250], // show 100ms delay and hide 250ms delay
    async onShow(instance) {
        let content = loader;
        instance.setContent(content);

        let imgs = await parse_index(id);
        if(imgs){
            content = create_carousel(imgs, url);
        }
        else{
            content = `<img width="128" src="${import.meta.env.SITE}no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">`;
        }
        instance.setContent(content);
    }
    });
}

const loader = `<p>Loading...</p>`