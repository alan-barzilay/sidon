export function create_carousel(imgs, url, height="") {
	const N = imgs.length
	const items =  imgs.map((img_src, index)=>create_carousel_item(img_src, index, N, url, height)).join("")
	return `<div class="carousel" style="scrollbar-width: auto;"> ${items} </div>`
}

function create_carousel_item(img_src, slide_id, N, url, height=""){
	return `
		<div class="carousel-item relative w-full">
            <img src="${img_src}" loading="lazy" class="mx-auto z-20 object-contain rounded-box w-72 sm:w-96 ${height}" />
            <div class="absolute z-10 h-full w-full">
                <div class="flex inset-0 w-full h-full justify-center items-center"> 
                    <p>Loading...</p>
                </div>
            </div>

            <div class="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"></div>
		</div>
`
}

export async function parse_index(id){
        let response = await fetch(`${import.meta.env.SITE}by_tomb_id/${id}/index.html`);
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
                img_srcs.push(import.meta.env.SITE + "by_tomb_id/" + id + x.href.slice(index) )
            }
        }
        return img_srcs;
}