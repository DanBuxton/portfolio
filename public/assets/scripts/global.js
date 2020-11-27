'use strict';

//check whether browser support service workers
/**/
if (location.origin.match(new RegExp("portfolio-djb", "i")) != null)
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

window.addEventListener('resize', resize);
window.addEventListener('load', resize);

function resize() {
    footerHeight = footer.clientHeight;

    if (document.body.clientHeight + footerHeight >= window.innerHeight)
        footer.style.top = document.body.clientHeight + 'px';
}

// resize();