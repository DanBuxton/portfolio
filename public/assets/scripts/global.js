//check whether browser support service workers
/**
if ('serviceWorker' in navigator) {
    //wait until page loaded to avoid delaying rendering
    window.addEventListener('load', function () {
        //register service worker

        navigator.serviceWorker.register('/sw.js').then(
            function (registration) {
                console.log('Service worker registration successful',
                    registration);
            },
            function (err) {
                console.log('Service worker registration failed', err);
            }
        );
    });
}
/**/

let footer = document.getElementsByTagName('footer')[0];

let footerHeight;

window.addEventListener('resize', () => {
    footerHeight = footer.clientHeight;

    if (document.body.clientHeight + footerHeight >= window.innerHeight)
        footer.style.top = document.body.clientHeight + 'px';
});
window.dispatchEvent(new Event('resize'));