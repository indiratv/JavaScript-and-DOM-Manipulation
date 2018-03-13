// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Set filteredufodata to dataset initially
    var filteredufodata = dataSet;

    var currentPage = 1;
    var numberPerPage = 10;
    var numberOfPages = 0;
    var list = filteredufodata;
    var filteredufodata = [];
    var pageList = [];

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// renderTable renders the filteredAddresses to the tbody
function renderTable(filteredufodata1) {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredufodata1.length; i++) {
    // Get get the current ufodata object and its fields
    var ufodata = filteredufodata1[i];
    var fields = Object.keys(ufodata);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the ufodata object, create a new cell at set its inner text to be the current value at the current ufodata's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufodata[field];
    }
  }
}

function handleSearchButtonClick() {
// Format the user's search by removing leading and trailing whitespace, lowercase the string
   filteredufodata = dataSet;
   var list = filteredufodata;
   var filterdatetime = $datetimeInput.value.trim();
   var filtercity = $cityInput.value.trim().toLowerCase();
   var filterstate = $stateInput.value.trim().toLowerCase();
   var filtercountry = $countryInput.value.trim().toLowerCase();
   var filtershape = $shapeInput.value.trim().toLowerCase();
// Set filteredufodata to an array of all ufodata whose "date/time" matches the filter
    filteredufodata = dataSet.filter(function(ufodata) {
    var sightingdatetime = ufodata.datetime;
    var sightingcity = ufodata.city;
    var sightingstate = ufodata.state;
    var sightingcountry = ufodata.country;
    var sightingshape = ufodata.shape;
   if((sightingdatetime === filterdatetime || filterdatetime === "") 
      && (sightingcity === filtercity || filtercity === "")
    	&& (sightingstate === filterstate || filterstate === "")
      && (sightingcountry === filtercountry || filtercountry === "")
    	&& (sightingshape === filtershape || filtershape === "")){
      return true;
   }
   return false;
  });
loadList();
}

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}
function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;
    console.log(begin);
    console.log(end);
    console.log(filteredufodata);
    pageList = filteredufodata.slice(begin, end);
    console.log(pageList);
    renderTable(pageList);
    check();
}
var count = 0;    
function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
    count = count + 1;
    console.log(count);
}

// function load() {
//     // makeList();
//     var filteredufodata = dataSet;
//     loadList(filteredufodata);
// }
    
// window.onload = load();
// Render the table for the first time on page load
loadList();