let darkTheme = false;

const themeToggle = document.getElementById("toggleTheme");

themeToggle.addEventListener("click", function(){
    darkTheme = !darkTheme;
    darkTheme ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
    themeToggle.checked = darkTheme;
});

