var usuarios = [
    {
        nome: "Ecthor Silva",
        email: "ecthor@email.com",
        senha: "123",
        imagemSrc: "/assets/images/users/ecthor.jpg",
        saldo: "R$ 176,00",
        celular: "(11) 9 1234-5678"
    },
    {
        nome: "Otavio Augusto",
        email: "otavio@email.com",
        senha: "456",
        imagemSrc: "/assets/images/users/otavio.jpg",
        saldo: "R$ 284,00",
        celular: "(11) 9 8765-4321"
    },
]

// Função para verificar o login
document.getElementById("loginButton").addEventListener("click", function () {
    var email = document.getElementById("e-mail").value;
    var password = document.getElementById("password").value;

    // Verifica se as credenciais correspondem aos usuários no array
    var usuarioEncontrado = usuarios.find(function(usuario) {
        return usuario.email === email && usuario.senha === password;
    });

    // Se encontrar o usuário, armazena as informações no localStorage e redireciona para a página de perfil
    if (usuarioEncontrado) {
        localStorage.setItem('loggedInUser', JSON.stringify(usuarioEncontrado));
        window.location.href = "/pages/profile.html";
    } else {
        // Exibe a mensagem de erro se as credenciais estiverem incorretas
        document.querySelector('.alert-danger').classList.remove('visually-hidden');
    }
});

// Adiciona event listener para ocultar a mensagem de erro quando os campos de email ou senha recebem foco
document.getElementById("e-mail").addEventListener("focus", function () {
    document.querySelector('.alert-danger').classList.add('visually-hidden');
});

document.getElementById("password").addEventListener("focus", function () {
    document.querySelector('.alert-danger').classList.add('visually-hidden');
});