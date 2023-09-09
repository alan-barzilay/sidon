export function create_carousel(imgs){
	const N = imgs.length
	const items =  imgs.map((img_src, index)=>create_carousel_item(img_src, index, N)).join("")
	return `<div class="carousel rounded-box"> ${items} </div>`
}

function create_carousel_item(img_src, slide_id, N){
	return `
		<div id=slide${slide_id} class="carousel-item relative w-full">
		<img src="${img_src}" loading="lazy" class="mx-auto object-contain max-w-96 h-auto" />
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a href=#slide${ slide_id == 0 ? N-1 : slide_id-1 } class="btn btn-circle">❮</a>
			<a href=#slide${ slide_id == N-1 ? 0 : slide_id+1 } class="btn btn-circle">❯</a>
		</div>
		</div>
`
}
