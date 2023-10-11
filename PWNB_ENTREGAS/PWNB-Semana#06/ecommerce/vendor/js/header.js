// Verifica se há um usuário logado no localStorage
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

document.addEventListener("DOMContentLoaded", function() {
    
    // Esconde visualmente o botão 2 antes do login
    document.querySelector('.botao2').classList.add('visually-hidden');
    document.querySelector('.botao4').classList.add('visually-hidden');

    // Se houver um usuário logado, torna o botão 1 visível e oculta o botão 2
    if (loggedInUser) {
        document.querySelector('.botao2').classList.remove('visually-hidden');
        document.querySelector('.botao1').classList.add('visually-hidden');

        document.querySelector('.botao4').classList.remove('visually-hidden');
        document.querySelector('.botao3').classList.add('visually-hidden');
    }
});

function logout() {
    // Remove o usuário do localStorage
    localStorage.removeItem('loggedInUser');
    // Redireciona o usuário para a página de login
    window.location.href = "/pages/login.html";
}