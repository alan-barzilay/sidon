export function create_carousel(imgs, url) {
	const N = imgs.length
	const items =  imgs.map((img_src, index)=>create_carousel_item(img_src, index, N, url)).join("")
	return `<div class="carousel rounded-box"> ${items} </div>`
}

function create_carousel_item(img_src, slide_id, N, url){
	return `
		<div id=slide${slide_id} class="carousel-item relative w-full">
		<img src="${img_src}" loading="lazy" class="mx-auto object-contain max-w-96 h-auto bg-auto bg-no-repeat bg-center bg-[url('/spinner.svg')]" />
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a href=${url}#slide${ slide_id == 0 ? N-1 : slide_id-1 } class="btn btn-circle">❮</a>
			<a href=${url}#slide${ slide_id == N-1 ? 0 : slide_id+1 } class="btn btn-circle">❯</a>
		</div>
		</div>
`
}

export async function parse_index(id){
        let response = await fetch(`by_tomb_id/${id}/index.html`);
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
                img_srcs.push(x.href.slice(0, index+1) + "by_tomb_id/" + id + x.href.slice(index) )
            }
        }
        return img_srcs;
}