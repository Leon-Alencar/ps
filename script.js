// Efeito de encolher o header ao rolar a página
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("shrink", window.scrollY > 50);
});

// Funcionalidade de clicar na logo/título para voltar ao topo suavemente
const topoSite = document.getElementById("titulo-variavel");
if (topoSite) {
    topoSite.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}s