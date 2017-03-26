"use strict";

var tabs = document.querySelectorAll(".tab");
var tabNavWrap = document.querySelector(".tabs-nav");
var lastActiveTab = null
var newTab = document.querySelector("button#new-tab");
var tabsWrap = document.querySelector(".tabs");
var backForward = document.querySelector('.back-forward')
var partitionI = 0

var numTabs = 0

backForward.addEventListener('click', (e) => {
  var el = e.target
  var webviews = document.querySelectorAll('.tab webview')
  var webviewIndex = lastActiveTab.getAttribute('data-id') - 1
  var webview = webviews[webviewIndex]

  webview.addEventListener("dom-ready", function(){
    webview.openDevTools();
  });

  if (el.className === 'navigation-backward') {
    // webview.executeJavascript('window.history.back()')
  } else if (el.className === 'navigation-forward') {

  }
})

function addTab(index, url) {
  var navTab = document.createElement("button");

  navTab.innerText = "Soundcloud "+ index
  navTab.classList += "nav-tab-item"
  navTab.setAttribute('data-id', index);

  var newTab = document.createElement('div')
  newTab.classList.add('tab')

  var webview = document.createElement('webview')
  webview.src = url
  webview.setAttribute('partition', partitionI)
  partitionI++

  newTab.appendChild(webview)

  tabsWrap.appendChild(newTab)

  tabNavWrap.appendChild(navTab);
}

function generateNav() {
  for (var i = 0; i < tabs.length; i++) {
    var index = i + 1;

    addTab(index)
  }
}

function update(activeTabIndex) {
  tabs = document.querySelectorAll(".tab")

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
  var clicked = e.target

  if(clicked.id === 'new-tab') {return false;}

  var newTabIndex = clicked.getAttribute('data-id') - 1;
  console.log(clicked);

  try{lastActiveTab.classList.remove('active-nav-tab')} catch(e){}
  lastActiveTab = clicked

  lastActiveTab.classList.add("active-nav-tab")
  update(newTabIndex);
});

newTab.addEventListener('click', function (e) {
  addTab(numTabs+1, 'https://soundcloud.com')
  numTabs++;
})

generateNav();
update(0);
