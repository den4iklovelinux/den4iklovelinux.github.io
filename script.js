const links = document.querySelectorAll('a');

links.forEach(link => {
    link.onclick = function(event)
    {
        document.getElementById("transition-screen").classList.add("startTransition");
        event.preventDefault(); 
        
        const transitionScreen = document.getElementById("transition-screen");
        const targetUrl = this.getAttribute('href');
        if (transitionScreen) {
            transitionScreen.classList.add("startTransition");
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        }
    }
});