"use strict";

var tabs = document.querySelectorAll(".tab");
var tabNavWrap = document.querySelector(".tabs-nav");
var lastActiveTab = null
var newTab = document.querySelector("button#new-tab");
var tabsWrap = document.querySelector(".tabs");
var backForward = document.querySelector('.back-forward')
var partitionI = 0
var urlBox = document.querySelector('.navigation-url-bar')

var tabsStore = []
var loadedTabs = JSON.parse(localStorage.getItem('currentTabs'))
var numTabs

if (loadedTabs) {
  var largestId = 0

  loadedTabs.map(t => {
    tabsStore.push(t)
    createTab(t.id, t.url)

    if (t.id > largestId) {
      largestId = t.id
    }
  })

  numTabs = largestId
} else {
  numTabs = 0
}

function clearTabs() {
  localStorage.removeItem('currentTabs')
  tabsStore = []
}

function runJsInActiveWebview(js) {
  var webviews = document.querySelectorAll('.tab webview')
  var webviewIndex = lastActiveTab.getAttribute('data-id') - 1
  var webview = webviews[webviewIndex]

  webview.executeJavaScript(js)
}

urlBox.addEventListener('keyup', e => {
  if (e.which === 13) {
    var url = urlBox.value
    var code = `window.location.assign("${url}")`

    runJsInActiveWebview(code)
  }
})

backForward.addEventListener('click', (e) => {
  var el = e.target

  if (el.className === 'navigation-backward') {
    runJsInActiveWebview('window.history.back()')
  } else if (el.className === 'navigation-forward') {
    runJsInActiveWebview('window.history.forward()')
  }
})

function createTab(index, url) {
  var navTab = document.createElement("button");

  navTab.innerText = "Soundcloud "+ index
  navTab.classList += "nav-tab-item"
  navTab.setAttribute('data-id', index)

  var newTab = document.createElement('div')
  newTab.classList.add('tab')

  var webview = document.createElement('webview')
  webview.src = url
  webview.setAttribute('partition', partitionI)
  partitionI++

  newTab.appendChild(webview)
  tabsWrap.appendChild(newTab)
  tabNavWrap.appendChild(navTab)
  numTabs++;
}

function addTab(index, url) {
  createTab(index, url)
  addTabToLocalStorage(index, url)
}

function addTabToLocalStorage(index, url) {
  tabsStore.push({
    url: url,
    id: index
  })

  localStorage.setItem('currentTabs', JSON.stringify(tabsStore))
}

function generateNav() {
  for (var i = 0; i < tabs.length; i++) {
    var index = i + 1 + largestId;

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
})

generateNav();
update(0);
