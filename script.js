function bindTransitions() {
    const links = document.querySelectorAll('a');
    const transitionScreen = document.getElementById("transition-screen");

    if (!transitionScreen) return;

    links.forEach(link => {
        link.onclick = function(event) {
            const targetUrl = this.getAttribute('href');
            
            event.preventDefault(); 
            
            transitionScreen.classList.add("startTransition");
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        }
    });
}

document.addEventListener('DOMContentLoaded', bindTransitions);

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const transitionScreen = document.getElementById("transition-screen");
        if (transitionScreen) {
            transitionScreen.classList.remove("startTransition");
        }
    }
});