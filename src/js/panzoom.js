import Panzoom from "@panzoom/panzoom";

export function set_panzoom() {
    const elem = document.getElementById("svg");
    const panzoom = Panzoom(elem);

    elem.addEventListener("wheel", function (event) {
        if (!event.shiftKey) return;
        panzoom.zoomWithWheel(event);
    });
    let resetButton = document.getElementById("reset_svg");
    resetButton.addEventListener("click", panzoom.reset);
};