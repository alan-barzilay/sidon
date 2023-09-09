import {TabulatorFull as Tabulator} from 'tabulator-tables';
import tabledata from "../assets/teste.json" assert { type: 'json' };;
// import {FilterModule} from 'tabulator-tables';

//Trigger setFilter function with correct parameters
function updateFilter(){
    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
    if(filterVal){
        table.setFilter(filterVal,"like", valueEl.value);
    }
}

// 		//create row popup contents
// 		let rowPopupFormatter = function(e, row, onRendered){
// 			let data = row.getData(),
// 			container = document.createElement("div"),
// 			contents = "<strong style='font-size:1.2em;'>Row Details</strong><br/><ul style='padding:0;  margin-top:10px; margin-bottom:0;'>";
// 			contents += "<li><strong>Name:</strong> " + data.name + "</li>";
// 			contents += "</ul>";

// 			container.innerHTML = contents;
// 			// {<Carousel page="teste">}
// 			return container;
// };


//create Tabulator on DOM element with id "example-table"
let table = new Tabulator("#example-table", {
    height:505, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:tabledata, //assign data to table
    // responsiveLayout:true, // enable responsive layouts
    responsiveLayout:"collapse", // collapse columns that no longer fit on the table into a list under the row
    layout:"fitDataStretch",
    columns:[ //Define Table Columns
        {title:"index", field:"index"},//, frozen:true},
        {title:"isActive", field:"isActive", hozAlign:"left", formatter:"tickCross", formatterParams:{

    }},
        {title:"age", field:"age"},
        {title:"Name", field:"name", hozAlign:"center"},
        {title:"gender", field:"gender", hozAlign:"center"},
        {title:"registered", field:"registered", hozAlign:"center",headerHozAlign:"center"},
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