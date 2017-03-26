"use strict";

var tabs = document.querySelectorAll(".tab");
var tabNavWrap = document.querySelector(".tabs-nav");

function generateNav() {
  for (var i = 0; i < tabs.length; i++) {
    var navTab = document.createElement("button");
    var index = i + 1;

    navTab.innerText = "Tab " + index;
    navTab.classList += "nav-tab-item"
    navTab.setAttribute('data-id', index);

    tabNavWrap.appendChild(navTab);
  }
}

function update(activeTabIndex) {
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];

    if (i === activeTabIndex) {
      tab.style.display = "flex";
    } else {
      tab.style.display = "none";
    }
  }
}

tabNavWrap.addEventListener('click', function (e) {
  var newTabIndex = e.target.getAttribute('data-id') - 1;

  update(newTabIndex);
});

generateNav();
update(0);
