let show = true;
const menuContent = document.querySelector('.content'); //conteudo de content inteiro
const menuToggle = menuContent.querySelector(".menu-toggle");//pega o menu-toggle de dentro do contente

menuToggle.addEventListener('click', () => {
    menuContent.classList.toggle('on', show)
    show = !show;
});