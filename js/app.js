//jQuery carousel
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});

const arrow = document.querySelector('#verMais [href^="#"]');
arrow.addEventListener('click', scrolltoIdOnClick);
function scrolltoIdOnClick(event){
 event.preventDefault();
 const element = event.target;
 const to = getScrollTopByHref(event.target) - 10;
  scrollToPosition(to);
}
function scrollToPosition(to){
 /*window.scroll({
   top: to - 10,
   behavior: "smooth",
 })*/
  smoothScrollTo(0, to);
}
function getScrollTopByHref(element){
 const id = element.getAttribute('href');
 return document.querySelector(id).offsetTop;
}
function smoothScrollTo(endX, endY, duration) {
 const startX = window.scrollX || window.pageXOffset;
 const startY = window.scrollY || window.pageYOffset;
 const distanceX = endX - startX;
 const distanceY = endY - startY;
 const startTime = new Date().getTime();
  duration = typeof duration !== 'undefined' ? duration : 400;
  // Easing function
 const easeInOutQuart = (time, from, distance, duration) => {
   if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
   return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
 };
  const timer = setInterval(() => {
   const time = new Date().getTime() - startTime;
   const newX = easeInOutQuart(time, startX, distanceX, duration);
   const newY = easeInOutQuart(time, startY, distanceY, duration);
   if (time >= duration) {
     clearInterval(timer);
   }
   window.scroll(newX, newY);
 }, 1000 / 60); // 60 fps
}; 

//service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }