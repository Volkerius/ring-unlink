// Shows English or Turkish: ?lang=tr / ?lang=en first, then a saved choice, then the device language.
(function () {
  var q = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var lang = q || saved || ((navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en");
  if (lang !== "tr") lang = "en";
  document.documentElement.lang = lang;
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.querySelector(".lang");
    if (!b) return;
    b.addEventListener("click", function () {
      var next = document.documentElement.lang === "tr" ? "en" : "tr";
      document.documentElement.lang = next;
      try { localStorage.setItem("lang", next); } catch (e) {}
      var u = new URL(location.href); u.searchParams.set("lang", next); history.replaceState(null, "", u);
    });
  });
})();
