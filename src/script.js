import * as text from "./loadMore.js";
import hospitalImage from "url:./img/Hospital-icon.png";
import phoneImage from "url:./img/Phone-icon-blue.png";
import linkImage from "url:./img/Link-icon.png";
import {
  BASE_URL
} from "./utils.js";
import {
  getJSON
} from './helpers.js';

//Global Vaiables 
let constants = {
  'page': 1, //initial page no
  'item_per_page': 5 //no of items to display
}


let showConsultantDetails = []

//Fetch Data Call
async function consultantDetails() {
  try {
    showConsultantDetails = await getJSON(BASE_URL);
  } catch (err) {
    console.log(err);
  }
};
consultantDetails().then(() => {
  buildHtml()
});

//This function trims the api data and calculates number of pages required
function pagination(querySet, page, item_per_page) {
  let trimStart = (page - 1) * item_per_page;
  let trimEnd = trimStart + item_per_page;
  let trimmedData = querySet.slice(trimStart, trimEnd)
  let pages = Math.round(querySet.length / item_per_page);
  return {
    'querySet': trimmedData,
    'pages': pages,
  }
}

//Function to loop through page buttons and render data 
function pageButtons(pages) {
  let wrapper = document.getElementById('pagination-wrapper')
  wrapper.innerHTML = ``
  for (let page = 1; page <= pages; page++) {
    wrapper.innerHTML += `<button value=${page} class="page page-link">${page}</button>`
  }
  let wrapper2 = document.getElementById('consultant');

  let buttons = document.querySelectorAll(".page");
  buttons.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      constants.page = Number(index + 1);
      buildHtml();
    });
  })
}
//function to show the results query string
function resultsQuery() {
  start_index = ((constants.page - 1) * constants.item_per_page) + 1;
  end_index = (start_index + constants.item_per_page) - 1;
  if (end_index > showConsultantDetails.length) {
    end_index = showConsultantDetails.length;
  }
  let results = document.getElementById('results')
  results.innerHTML = ``
  results.innerHTML += `Showing <span class="text-blue">${start_index}</span> to <span class="text-blue">${end_index}</span> of <span class="text-blue">${showConsultantDetails.length}</span> results`
}

//Renders the data fetch from the API
function buildHtml() {
  let state = {
    'querySet': showConsultantDetails,
  }

  let data = pagination(state.querySet, constants.page, constants.item_per_page);
  // create html
  let myList = data.querySet;
  let consultantData = "";
  myList.map(info => {
    consultantData += `<div class="consultant__info">
    <div class="consultant__info--summary">
        <div class="consultant__info--details">
          <div>
            <img class="consultant__info--img" src=${info.ProfileImage} alt= "${info.Title}" />
          </div>
          <div class="consultant__info--addressWrapper">
            <h2 class="consultant__info--title">${info.Title} - ${info.Specialty}</h2>
            <p class="consultant__info--location">
            <span><img class="consultant__info--icon" src=${hospitalImage} alt="Hospital"></span>Based at: ${info.Hospital} • 9 Miles</p>
            <div class="consultant__info--contact">
              <a class="consultant__info--contactPhone" href="tel:${info.PhoneNo}"><span><img src=${phoneImage} alt="Phone Number" class="consultant__info--icon" ></span>${info.PhoneNo}</a>
              <a class="consultant__info--contactWebsite" href="#"><span><img src=${linkImage} alt="Website address" class="consultant__info--icon" ></span>Go to hospital website</a>
              <a class="consultant__info--contactDirections" href=#><span><img src=${linkImage} alt="Get Directions" class="consultant__info--icon" ></span>Get directions</a>
            </div>
          </div>
        </div>
        <div class="consultant__info--background">
        <p>${info.ProfessionalBackground}</p>
        </div>
            <span class="read-more-btn">View More</span>
  </div>
  <div class="consultant__info--buttonGroup">
  <button class="btn btn--outline">View Full Profile</button>
  <button class="btn ">Book an appointment</button>
  </div>
      </div>`;
  });
  document.getElementById("consultant").innerHTML = consultantData;
  pageButtons(data.pages);
  resultsQuery();
}

//Load more text function
text.loadMore();