import { TabulatorFull as Tabulator, PopupModule } from 'tabulator-tables';
import { create_carousel, parse_index } from "./carousel.js";
import table_cemetery from "../assets/cemetery_table.json" assert { type: 'json' };;

//Trigger setFilter function with correct parameters
function updateFilter(){
    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
    if(filterVal){
        table.setFilter(filterVal,"like", valueEl.value);
    }
}

//create row popup contents
async function rowPopupFormatter (e, row, onRendered) {
    let data = row.getData();
    if (data.has_photo == false) {
        return ""
    }
    let imgs = await parse_index(data.tomb_id);
    let contents = create_carousel(imgs , window.location.href);
    let container = document.createElement("div");
    container.innerHTML = contents;

    return container;
};

//create Tabulator on DOM element with id "example-table"
let table = new Tabulator("#cemetery-table", {
    height:505, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:table_cemetery, //assign data to table
    // responsiveLayout:true, // enable responsive layouts
    responsiveLayout: "collapse", // collapse columns that no longer fit on the table into a list under the row
    layout: "fitDataStretch",
    rowClickPopup: rowPopupFormatter, //add click popup to row
    columns:[ //Define Table Columns
        {title:"Id", field:"id", headerHozAlign: "center"},//, frozen:true},
        {title:"Tomb", field:"tomb_id", hozAlign:"left", headerHozAlign: "center", sorter:"string", sorterParams:{alignEmptyValues:"bottom",}},
        {title:"Family Name", field:"family_name", headerHozAlign: "center", sorter:"string", sorterParams:{alignEmptyValues:"bottom",}},
        {title:"Name", field:"name", hozAlign:"center", headerHozAlign: "center", sorter:"string", sorterParams:{alignEmptyValues:"bottom",}},
        {title:"Father Name", field: "father_name", hozAlign: "center", headerHozAlign: "center", sorter:"string", sorterParams:{alignEmptyValues:"bottom",}},
        {title:"Date of Death", field:"death_date", hozAlign:"center", headerHozAlign: "center",},
        { title: "📷?", field: "has_photo", hozAlign: "center", headerHozAlign: "center", formatter: "tickCross" , formatterParams:{tickElement:"✔", crossElement:"✖",}},
        {title: "Gender", field: "gender", hozAlign: "center", headerHozAlign: "center", sorter:"string", sorterParams:{alignEmptyValues:"bottom",}},
        // {title:"On Map?", field: "on_svg", hozAlign: "center",formatter:"tickCross", formatterParams:{ } },
    ],
});


//Define variables for input elements
var fieldEl = document.getElementById("filter-field");
var valueEl = document.getElementById("filter-value");

//Update filters on value change
document.getElementById("filter-field").addEventListener("change", updateFilter);
document.getElementById("filter-value").addEventListener("keyup", updateFilter);
//Clear filters on "Clear Filters" button click
document.getElementById("filter-clear").addEventListener("click", function(){
    fieldEl.value = "";
    valueEl.value = "";
    table.clearFilter();
});