const t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e;function o(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.stop.disabled=!0,t.start.addEventListener("click",(function(){e=setInterval(o,1e3),t.start.disabled=!0,t.stop.disabled=!1})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.disabled=!1,t.stop.disabled=!0}));
//# sourceMappingURL=01-color-switcher.eae295e1.js.map