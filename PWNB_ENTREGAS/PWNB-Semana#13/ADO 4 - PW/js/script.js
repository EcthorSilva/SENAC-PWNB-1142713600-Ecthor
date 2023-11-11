document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    // const tableBody = document.querySelector('tbody');
    const alertDiv = document.querySelector('.alert');
    const listarBtn = document.getElementById("listarBtn");

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errorMessage = '';

        // Obter os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const cep = document.getElementById('cep').value;
        const cidade = document.getElementById('cidade').value;

        // Validar os campos com regex (exemplo: validar data de nascimento)
        const dataNascimentoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const cepRegex = /^\d{5}-\d{3}$/;

        // Adicionar mais validações conforme necessário
        if (!dataNascimentoRegex.test(dataNascimento)) {
            errorMessage = 'Data de nascimento inválida. Use o formato dd/mm/aaaa.';
            document.getElementById('dataNascimento').addEventListener('focus', function () {
                alertDiv.classList.add('visually-hidden');
            });
        } else if (!cepRegex.test(cep)) {
            errorMessage = 'CEP inválido. Use o formato 12345-000.';
            document.getElementById('cep').addEventListener('focus', function () {
                alertDiv.classList.add('visually-hidden');
            });
        }

        // Se houver mensagem de erro, exibi-la no alerta
        if (errorMessage) {
            alertDiv.classList.remove('visually-hidden');
            alertDiv.textContent = errorMessage;

            // Ocultar a mensagem de erro após 5 segundos
            setTimeout(function () {
                alertDiv.classList.add('visually-hidden');
            }, 5000);

            return;
        }

        // // Criar uma nova linha na tabela com os dados do cliente
        // const newRow = document.createElement('tr');
        // newRow.innerHTML = `
        // <td>${nome}</td>
        // <td>${dataNascimento}</td>
        // <td>${endereco}, ${numero}</td>
        // <td>${cidade}</td>
        // <td>
        //     <button class="btn btn-primary"><i class="bi bi-pencil"></i></button>
        //     <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
        // </td>`;

        // // Adicionar a nova linha à tabela
        // tableBody.appendChild(newRow);

        // Limpar os campos do formulário após adicionar o cliente
        form.reset();
    });

    // Chamada de API para buscar endereço pelo CEP usando fetch
    document.getElementById('cep').addEventListener('input', function () {
        const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('cidade').value = data.localidade;
                        // Você também pode preencher outros campos, como estado, com os dados da API
                    } else {
                        alertDiv.classList.remove('visually-hidden');
                        alertDiv.textContent = 'CEP não encontrado';

                        // Ocultar a mensagem de erro após 5 segundos
                        setTimeout(function () {
                            alertDiv.classList.add('visually-hidden');
                        }, 5000);
                    }
                })
                .catch(error => console.error(error));
        }
    });

    // Limpar todos os inputs
    const limparBtn = document.getElementById('limparBtn');
    const limparInputs = () => {
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('dataNascimento').value = '';
        document.getElementById('tipoCliente').selectedIndex = 0; // Define a opção padrão
        document.getElementById('endereco').value = '';
        document.getElementById('numero').value = '';
        document.getElementById('cep').value = '';
        document.getElementById('cidade').value = '';
    };
    limparBtn.addEventListener('click', () => {
        limparInputs();
    });

    // Adiciona um ouvinte de evento de clique ao botão
    listarBtn.addEventListener("click", function () {
        // Redireciona o usuário para a nova página
        window.location.href = "table.html";
    });
});