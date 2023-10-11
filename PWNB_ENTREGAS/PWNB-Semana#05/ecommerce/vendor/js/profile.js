// Recupera as informações do usuário do localStorage
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Verifica se o usuário está logado
if (loggedInUser) {
    // Atualiza o nome e a imagem na página de perfil
    document.querySelector('.card-body img').src = loggedInUser.imagemSrc;
    document.querySelector('.card-body h5').textContent = loggedInUser.nome;
    document.querySelector('.card-body .saldo').textContent = loggedInUser.saldo;


    // perfil
    document.querySelector('.card-body .userNome').textContent = loggedInUser.nome;
    document.querySelector('.card-body .userEmail').textContent = loggedInUser.email;
    document.querySelector('.card-body .userCell').textContent = loggedInUser.celular;

} else {
    // Se o usuário não estiver logado, redireciona de volta para a página de login apenas se não estiver na página de login
    if (!window.location.href.includes("/pages/login.html")) {
        window.location.href = "/pages/login.html";
    }
}

if (usuarioEncontrado) {
    localStorage.setItem('loggedInUser', JSON.stringify(usuarioEncontrado));
    console.log('Usuário logado:', usuarioEncontrado);
    window.location.href = "/pages/profile.html";
} else {
    // Exibe a mensagem de erro se as credenciais estiverem incorretas
    document.querySelector('.alert-danger').classList.remove('visually-hidden');
}