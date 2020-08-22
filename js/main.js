/******************************************/
// vanilla javascript
// arrow function
/******************************************/

let backgroundOption = true;
let bgInterval;

// change the background image every 5 seconds
// select landing page
/************************ */
// local storage comes first thing before any code depend on it
/************************ */
// local storage for random backgrounds
backgroundLocalElement = localStorage.getItem("background_option");

if (backgroundLocalElement) {
  // loop all spans in random-bg-btns and remove active class from them
  document.querySelectorAll(".random-bg-btns span").forEach((element) => {
    element.classList.remove("active");
  });
  // check the value of localstorge for backgroud_option
  // if true add class active on span [yes]
  // else add class active on span [no]
  if (backgroundLocalElement === "true") {
    backgroundOption = true;
    document.querySelector(".random-bg-btns .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-bg-btns .no").classList.add("active");
  }
}

let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

function randomizeImgs() {
  if (backgroundOption) {
    bgInterval = setInterval(() => {
      // create random number form the imgsArray
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // adding background image for the landing page every 1 second
      landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
    }, 10000);
  }
}

randomizeImgs();

let randomBgElement = document.querySelectorAll(".random-bg-btns span");

randomBgElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    // function to remove active class from all elements and add active class on element which pressed
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

/*******************************************************/
// toggle the setting box [open/close]
let gear = document.querySelector(".setting-box__gear");
let settingBox = document.querySelector(".setting-box");
gear.addEventListener("click", (e) => {
  e.stopPropagation();
  gear.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
});

settingBox.onclick = function (e) {
  e.stopPropagation();
};
// document.body.addEventListener("click", (e) => {
//   settingBox.classList.remove("open");
//   gear.classList.remove("fa-spin");
// });

/********************************************* */
// change the colors of the website
let colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.body.setAttribute("data-default-color", e.target.dataset.color);

    // set color in local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// check if local storage has value of color
let mainColor = localStorage.getItem("color_option");
if (mainColor) {
  // console.log(mainColor);
  document.body.setAttribute("data-default-color", mainColor);

  // remove class active from all li element
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

let skills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = skills.offsetTop; // 736

  // skills outer height
  let skillsOuterHeight = skills.offsetHeight; // 528

  // window inner height
  let windowinnerHeight = this.innerHeight; // 376

  // window scroll Top
  let windowscrollTop = this.pageYOffset;

  if (
    windowscrollTop >
    skillsOffsetTop + skillsOuterHeight - windowinnerHeight - 200
  ) {
    let allSkills = document.querySelectorAll(".skill-box__progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Gallery
let outGallery = document.querySelectorAll(".gallery__box div");

outGallery.forEach((div) => {
  let img = div.querySelector("img");
  img.addEventListener("click", (e) => {
    // create popup overlay
    let popupOverlay = document.createElement("div");
    // add class to popupOverlay
    popupOverlay.className = "popup-overlay";

    // append popupOverlay to the body
    document.body.appendChild(popupOverlay);

    // create popup box
    let popupBox = document.createElement("div");

    // check if there is value in alt of the image
    if (img.alt) {
      // create img heading
      let imgHeading = document.createElement("h3");

      // create text node
      let imgText = document.createTextNode(img.alt);

      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading);
    }

    // create img element
    let imgPopup = document.createElement("img");

    imgPopup.src = img.src;

    // add class
    popupBox.className = "popup-box";

    popupBox.appendChild(imgPopup);

    // append popupBox to popupOverlay
    popupOverlay.appendChild(popupBox);

    // create close button
    let closeBtn = document.createElement("span");

    // add class
    closeBtn.className = "close-btn";

    // create text node to close button
    let closeBtnText = document.createTextNode("X");

    // append closeBtnText to closeBtn
    closeBtn.appendChild(closeBtnText);

    // append closeBtn to popuBox
    popupBox.appendChild(closeBtn);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    // remove popup box
    // e.target.parentNode.remove();
    // remove popup overlay
    document.querySelector(".popup-overlay").remove();
  }
});

document.addEventListener("keyup", (e) => {
  let popupOverlay = document.querySelector(".popup-overlay");
  if (popupOverlay) {
    if (e.key === "Escape") {
      popupOverlay.remove();
    }
  }
});

// navigate to the section when press on the bullet
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".navbar .nav-item a");

// function to handle scroll the section either links in nav or bullets
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// function to handle active class on element
function handleActive(event) {
  // remove class active from all li element
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add class active on li which i press on it
  event.target.classList.add("active");
}

let BulletSpan = document.querySelectorAll(".bullets-option span");
let BulletContainer = document.querySelector(".nav-bullets");

let BulletLocalItem = localStorage.getItem("bullets_option");

// check if there is value stored in local storage
if (BulletLocalItem) {
  // remove class active from all spans
  BulletSpan.forEach((span) => {
    span.classList.remove("active");
  });

  // check if the value of BulletLocalItem
  if (BulletLocalItem === "block") {
    BulletContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    BulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

// loop for spans in bullets-option and add event click
BulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (span.dataset.display === "show") {
      BulletContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      BulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
  });
});

// reset options button
document.querySelector(".reset-options").addEventListener("click", () => {
  // remove the values in local storage for background and color and bullets
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets_option");

  // make reload to the website
  window.location.reload();
});

let toggleMenu = document.querySelector(".toggle-menu");
let theLinks = document.querySelector("nav");
toggleMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  theLinks.classList.toggle("open");
};

document.onclick = function (e) {
  if (
    e.target != toggleMenu &&
    e.target != theLinks &&
    e.target != settingBox
  ) {
    if (theLinks.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      theLinks.classList.toggle("open");
    }

    if (settingBox.classList.contains("open")) {
      settingBox.classList.toggle("open");
      gear.classList.toggle("fa-spin");
    }
  }
};
