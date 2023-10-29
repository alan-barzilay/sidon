import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { create_carousel, parse_index } from './carousel.js';

// tippy box padding= 5px on y axis and 9 in x axis
const loader = `<div class="flex justify-center items-center w-[278px] sm:w-[366px] h-[293px]"><p class="pb-[6px]">Loading...</p></div>`
async function create_tooltip(id, url){
    return tippy(`#${id}`, {
    content: loader,
    allowHTML: true,
    interactive: true,
    maxWidth: 384,
    appendTo: document.body,
    delay: [100, 250], // show 100ms delay and hide 250ms delay
    async onShow(instance) {
        let content = loader;
        instance.setContent(content);

        let imgs = await parse_index(id);
        if(imgs){
            content = create_carousel(imgs, url, "h-72");
        }
        else{
            content = `<img width="128" src="${import.meta.env.SITE}no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">`;
        }
        instance.setContent(content);
    }
    });
}
export async function create_tooltips() {
    let ids = ["CN1"];
    for (let i = 1; i <= 42; i++) {
        ids.push(`A${i}`);
    }
    for (let i = 1; i <= 65; i++) {
        ids.push(`B${i}`);
    }
    for (let i = 1; i <= 90; i++) {
        ids.push(`C${i}`);
    }
    for (let i = 1; i <= 48; i++) {
        ids.push(`D${i}`);
    }
    for (let i = 1; i <= 68; i++) {
        ids.push(`E${i}`);
    }
    // for (let i=1; i<=26 ; i++){
    //     ids.push(`EN${i}`)
    // }
    const url = window.location.href;
    for await (const id of ids) {
        await create_tooltip(id, url);
    }
};