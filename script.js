// Efeito de rolagem suave para os links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mudar fundo da navbar ao rolar a página
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#0f172ab0';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Menu Mobile (Simples)
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        alert('Menu mobile ativado. Aqui você pode expandir uma lista lateral!');
    });
}

// Log de boas vindas para desenvolvedores que visitarem o site
console.log("Olá! Bem-vindo ao portfólio de Gustavo Oliveira.");
console.log("Sinta-se à vontade para olhar o código.");