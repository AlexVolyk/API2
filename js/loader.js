window.addEventListener('load', () => {
    let mask = document.querySelector('.mask');
    mask.classList.add('hide');
    setTimeout(() => {
        mask.remove();
    },600)
});