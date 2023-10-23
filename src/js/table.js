import { TabulatorFull as Tabulator } from "tabulator-tables";
import table_cemetery from "../assets/cemetery_table.json" assert { type: "json" };

class AstroLang extends HTMLElement {
    constructor() {
        super();

        // Read the lang from the data attribute.
        const lang = this.dataset.lang;
    }
}
customElements.define("astro-language", AstroLang);

export function main() {

    //Trigger setFilter function with correct parameters
    function updateFilter() {
        var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
        if (filterVal) {
            table.setFilter(filterVal, "like", valueEl.value);
        }
    }

    //create row popup contents
    function rowPopupFormatter(e, row, onRendered) {
        let data = row.getData();
        let container = document.createElement("div");
        data.has_photo == false
            ? (container.innerHTML = "No photo available")
            : (container.innerHTML = `<img src="${import.meta.env.SITE +
                "tombs_small_single/" +
                data.tomb_id +
                ".avif"
                }"
                                 class="mx-auto object-contain h-96" />`);

        return container;
    }
    let table = new Tabulator("#cemetery-table", {
        locale: document.getElementById("lang").dataset.lang,
        langs: {
            fr: {
                columns: {
                    tomb_id: "Tombe",
                    family_name: "Nom de famille",
                    name: "Prénom",
                    father_name: "Nom du père",
                    death_date: "Date de décès",
                    gender: "Genre",
                },
            },
            // "ar-LB":{
            //     "columns":{
            //         "tomb_id":"",
            //         "family_name":"",
            //         "name":"",
            //         "father_name":"",
            //         "death_date":"",
            //         "gender":"",
            //     },
            // },
            "pt-BR": {
                columns: {
                    tomb_id: "Túmulo",
                    family_name: "Sobrenome",
                    name: "Nome",
                    father_name: "Nome do Pai",
                    death_date: "Data da Morte",
                    gender: "Gênero",
                },
            },
        },
        height: 505, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: table_cemetery, //assign data to table
        responsiveLayout: "collapse", // collapse columns that no longer fit on the table into a list under the row
        layout: "fitDataStretch",
        rowClickPopup: rowPopupFormatter,
        columns: [
            { title: "Id", field: "id", headerHozAlign: "center" }, //, frozen:true},
            {
                title: "Tomb",
                field: "tomb_id",
                hozAlign: "left",
                headerHozAlign: "center",
                sorter: "string",
                sorterParams: { alignEmptyValues: "bottom" },
            },
            {
                title: "Family Name",
                field: "family_name",
                headerHozAlign: "center",
                sorter: "string",
                sorterParams: { alignEmptyValues: "bottom" },
            },
            {
                title: "Name",
                field: "name",
                hozAlign: "center",
                headerHozAlign: "center",
                sorter: "string",
                sorterParams: { alignEmptyValues: "bottom" },
            },
            {
                title: "Father Name",
                field: "father_name",
                hozAlign: "center",
                headerHozAlign: "center",
                sorter: "string",
                sorterParams: { alignEmptyValues: "bottom" },
            },
            {
                title: "Date of Death",
                field: "death_date",
                hozAlign: "center",
                headerHozAlign: "center",
            },
            {
                title: "📷?",
                field: "has_photo",
                hozAlign: "center",
                headerHozAlign: "center",
                formatter: "tickCross",
                formatterParams: { tickElement: "✔", crossElement: "✖" },
            },
            {
                title: "Gender",
                field: "gender",
                hozAlign: "center",
                headerHozAlign: "center",
                sorter: "string",
                sorterParams: { alignEmptyValues: "bottom" },
            },
            // {title:"On Map?", field: "on_svg", hozAlign: "center",formatter:"tickCross", formatterParams:{ } },
        ],
    });

    //Define variables for input elements
    var fieldEl = document.getElementById("filter-field");
    var valueEl = document.getElementById("filter-value");

    //Update filters on value change
    document
        .getElementById("filter-field")
        .addEventListener("change", updateFilter);
    document
        .getElementById("filter-value")
        .addEventListener("keyup", updateFilter);
    //Clear filters on "Clear Filters" button click
    document
        .getElementById("filter-clear")
        .addEventListener("click", function () {
            fieldEl.value = "";
            valueEl.value = "";
            table.clearFilter();
        });
}