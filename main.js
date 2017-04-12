main();

function main()
{
  initStorage();

  initSetting();
}

function searchBar(mode)
{
  var search_bar = document.getElementById("search-bar-input");

  if(mode == "in")
  {
    if(search_bar.value == "What's on your mind ?")
    {
      search_bar.value = "";
    }
  }
  else if(mode == "out")
  {
    if(search_bar.value.trim() == "")
    {
      search_bar.value = "What's on your mind ?";
    }
  }
}

function initStorage()
{
  if(localStorage.getItem("searchEngine") == null)
  {
    localStorage.searchEngine = "qwant";
    localStorage.theme = "dark";
  }
}

function initSetting()
{
  setTheme(localStorage.theme);
  setSearchEngine(localStorage.searchEngine);
  applySettings();
}

function setTheme(data)
{
  var themeClass = document.getElementById("selectTheme").getElementsByClassName("class-theme");

  for(var i=0;i<themeClass.length;i++)
  {
    document.getElementsByClassName("class-theme")[i].removeAttribute("selected");

    if(document.getElementsByClassName("class-theme")[i].getAttribute("value") == data)
    {
      document.getElementsByClassName("class-theme")[i].setAttribute("selected", "");
    }
  }
}

function setSearchEngine(data)
{
  var searchEngineClass = document.getElementById("selectSearchEngine").getElementsByClassName("class-searchEngine");

  for(var i=0;i<searchEngineClass.length;i++)
  {
    document.getElementsByClassName("class-searchEngine")[i].removeAttribute("selected");

    if(document.getElementsByClassName("class-searchEngine")[i].getAttribute("value") == data)
    {
      document.getElementsByClassName("class-searchEngine")[i].setAttribute("selected", "");
    }
  }
}

function settingsUpdate(data)
{
  if(data.id == "selectSearchEngine")
  {
    localStorage.searchEngine = data.value;
    setSearchEngine(data.value);
  }
  else if(data.id == "selectTheme")
  {
    localStorage.theme = data.value;
    setTheme(data.value);
  }

  applySettings();
}

function applySettings()
{
  document.getElementById("css-var").href = localStorage.theme + ".css";

  if(localStorage.searchEngine == "google")
  {
    document.getElementById("search-form").action = "https://www." + localStorage.searchEngine + ".com/search";
  }
  else
  {
    document.getElementById("search-form").action = "https://www." + localStorage.searchEngine + ".com";
  }

  if(localStorage.searchEngine == "qwant")
  {
    for(var i=0;i<4;i++)
    {
      document.getElementsByClassName("qwant-hidden-input")[i].value = "1";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "i";

      document.getElementsByClassName("qwant-hidden-input")[i].value = "0";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "b";

      document.getElementsByClassName("qwant-hidden-input")[i].value = "1";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "a";

      document.getElementsByClassName("qwant-hidden-input")[i].value = "1";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "h";
    }
  }
  else
  {
    for(var i=0;i<4;i++)
    {
      document.getElementsByClassName("qwant-hidden-input")[i].value = "";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "";

      document.getElementsByClassName("qwant-hidden-input")[i].value = "";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "";

      document.getElementsByClassName("qwant-hidden-input")[i].value = "";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "";

      document.getElementsByClassName("qwant-hidden-input")[i].value = "";
      document.getElementsByClassName("qwant-hidden-input")[i].name = "";
    }
  }
}

function openSettings()
{
  var settings = document.getElementById("settings-link");

  document.getElementById("div-settings").style.display = "inherit";

  settings.innerHTML = "Close settings";
  settings.setAttribute("onclick", "closeSettings()");
}

function closeSettings()
{
  var settings = document.getElementById("settings-link");

  document.getElementById("div-settings").style.display = "none";

  settings.innerHTML = "Settings";
  settings.setAttribute("onclick", "openSettings()");
}

function reset()
{
  localStorage.removeItem("theme");
  localStorage.removeItem("searchEngine");

  location.reload();
}
