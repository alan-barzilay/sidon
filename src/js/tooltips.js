import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { create_carousel, parse_index } from './carousel.js';

const no_photo = ["A22", "B19", "B20", "B52", "C1", "C2", "C3", "C5", "C7", "C8", "C9", "C10", "C11", "C13", "C14",
    "C15", "C16", "C17", "C18", "C20", "C23", "C24", "C25", "C26", "C27", "C28", "C29", "C30", "C32", "C34", "C35",
    "C37", "C39", "C40", "C41", "C42", "C43", "C44", "C45", "C47", "C48", "C49", "C50", "C51", "C53", "C54", "C55",
    "C56", "C57", "C58", "C59", "C62", "C66", "C67", "C68", "C69", "C70", "C71", "C72", "C73", "C74", "C75", "C78",
    "C80", "C81", "C82", "C83", "C84", "C85", "C86", "C88", "D29", "D38", "E30", "E31", "E46"];

// tippy box padding= 5px on y axis and 9 in x axis
const loader = `<div class="flex justify-center items-center w-[278px] sm:w-[366px] h-[293px]"><p class="pb-[6px]">Loading...</p></div>`

async function create_tooltip(id, url) {
    if (no_photo.includes(id)) { 
        return tippy(`#${id}`, {
            content: `<img width="128" src="${import.meta.env.SITE}no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">`,
            allowHTML: true,
            interactive: true,
            maxWidth: 384,
            appendTo: document.body,
            delay: [100, 250], // show 100ms delay and hide 250ms delay
        });
    }
    
    else {
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
                if (imgs) {
                    content = create_carousel(imgs, url, "h-72");
                }
                else {
                    content = `<img width="128" src="${import.meta.env.SITE}no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">`;
                }
                instance.setContent(content);
            }
        });
    }
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