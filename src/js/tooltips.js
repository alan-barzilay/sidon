import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { create_carousel } from './carousel.js';

// export async function create_tooltip(id){
//     let imgs = await parse_index(id);
//     let content;
//     if(imgs){
//         content = create_carousel(imgs);
//     }
//     else{
//         content = '<img width="128" src="no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">';
//     }
//     return tippy(`#${id}`, {
//     content: content,
//     allowHTML: true,
//     interactive: true,
//     maxWidth: 350,
//     appendTo: document.body,
//     delay: [null, 250], // show default delay and hide 250ms delay
//     });
//     }

export async function create_tooltip(id){
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
            content = create_carousel(imgs);
        }
        else{
            content = '<img width="128" src="no-picture.svg" alt="Picture not available. Illustration of a crossed off camera">';
        }
        instance.setContent(content);
    }
    });
}

async function parse_index(id){

        let response = await fetch(`${id}/index.html`);
        if (!(response.status === 200)) {
            console.log(`id: ${id} returned with http status: ${response.status} `);
            return null }
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(await response.text(), 'text/html');
        let elements = htmlDoc.getElementsByTagName('a');
        const regex1 = RegExp(/\.(jpe?g|png|avif|gif)$/);
        let img_srcs = [];
        let index;
        for (let x of elements) {
            if (regex1.test(x.href)) {
                index = x.href.lastIndexOf("/");
                img_srcs.push(x.href.slice(0, index+1) + id + x.href.slice(index) )
            }
        }
        return img_srcs;
}