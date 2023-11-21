document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const tableBody = document.querySelector('tbody');
    const alertDiv = document.querySelector('.alert');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const buttonClicked = event.submitter; // Captura o botão clicado
        let errorMessage = '';

        // Obter os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const tipoCliente = document.getElementById('tipoCliente').value;
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

        // Lógica para o botão "Cadastrar"
        if (buttonClicked.id === 'cadastrarBtn') {
            // Gerar um ID único para o novo cliente
            const id = Date.now().toString();

            // Obter a lista de clientes do localStorage se existir
            let listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

            // Obter o ID do cliente para edição do localStorage
            const clienteParaEditarID = localStorage.getItem('clienteParaEditarID');

            const clienteParaEditar = listaClientes.find(cliente => cliente.id === clienteParaEditarID);

            // Validar se clienteParaEditar está definido antes de acessar a propriedade 'id'
            const idParaAtualizar = clienteParaEditar ? clienteParaEditar.id : null;

            // Verificar se o cliente já existe na lista pelo ID
            const clienteExistente = listaClientes.find(cliente => cliente.id === idParaAtualizar);

            if (clienteExistente) {
                // Atualizar os dados do cliente existente
                clienteExistente.nome = nome;
                clienteExistente.sobrenome = sobrenome;
                clienteExistente.dataNascimento = dataNascimento;
                clienteExistente.tipoCliente = tipoCliente;
                clienteExistente.endereco = endereco;
                clienteExistente.numero = numero;
                clienteExistente.cep = cep;
                clienteExistente.cidade = cidade;
            } else {
                // Criar um objeto com os dados do cliente
                const cliente = {
                    id,
                    nome,
                    sobrenome,
                    dataNascimento,
                    tipoCliente,
                    endereco,
                    numero,
                    cep,
                    cidade
                };

                // Adicionar o novo cliente à lista
                listaClientes.push(cliente);
            }

            // Salvar a lista atualizada no localStorage
            localStorage.setItem('clientes', JSON.stringify(listaClientes));

            // Limpar os campos do formulário após adicionar o cliente
            form.reset();

            // Remover os dados do cliente para edição no localStorage após a atualização
            localStorage.removeItem('clienteParaEditar');
            localStorage.removeItem('clienteParaEditarID');

            // Lista os clientes no console
            console.log(listaClientes);
            // Atualiza a tabela ao carregar a página
            atualizarTabela();
        }
        // Lógica para o botão "Limpar"
        else if (buttonClicked.id === 'limparBtn') {
            limparInputs();
        }
        // Lógica para o botão "Listar"
        else if (buttonClicked.id === 'listarBtn') {
            window.location.href = "table.html";
        }
    });

    // Chama a função para preencher os campos ao carregar a página
    preencherCamposEdicao();

    const clienteParaEditarID = localStorage.getItem('clienteParaEditarID');
    if (clienteParaEditarID) {
        // Preenche os campos com os dados do cliente para edição
        preencherCamposEdicao();
    }

    // Função para preencher os campos ao carregar a página
    function preencherCamposEdicao() {
        // Recupera os dados do cliente do localStorage
        const clienteParaEditar = JSON.parse(localStorage.getItem('clienteParaEditar'));

        // Se existirem dados, preenche os campos do formulário
        if (clienteParaEditar) {
            document.getElementById('nome').value = clienteParaEditar.nome;
            document.getElementById('sobrenome').value = clienteParaEditar.sobrenome;
            document.getElementById('dataNascimento').value = clienteParaEditar.dataNascimento;
            document.getElementById('tipoCliente').value = clienteParaEditar.tipoCliente;
            document.getElementById('endereco').value = clienteParaEditar.endereco;
            document.getElementById('numero').value = clienteParaEditar.numero;
            document.getElementById('cep').value = clienteParaEditar.cep;
            document.getElementById('cidade').value = clienteParaEditar.cidade;

            // Armazena o ID do cliente para edição no localStorage
            const clienteParaEditarID = clienteParaEditar.id;
            localStorage.setItem('clienteParaEditarID', clienteParaEditarID);
        }
        // Atualiza a tabela ao carregar a página
        atualizarTabela();
    }

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

        localStorage.removeItem('clienteParaEditar');
        localStorage.removeItem('clienteParaEditarID');
    };
    limparBtn.addEventListener('click', () => {
        limparInputs();
    });

    // TABELA

    function atualizarTabela() {
        // Limpa a tabela
        tableBody.innerHTML = '';

        // Recupera a lista de clientes do localStorage (se existir)
        const listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

        // Itera sobre a lista de clientes e adiciona cada um à tabela
        listaClientes.forEach((cliente, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.dataNascimento}</td>
                <td>${cliente.endereco}, ${cliente.numero}</td>
                <td>${cliente.cidade}</td>
                <td>
                    <button class="btn btn-outline-primary" onclick="editarCliente(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-outline-danger" onclick="excluirCliente(${index})"><i class="bi bi-trash"></i></button>
                </td>`;

            newRow.setAttribute('data-index', index); // Adiciona o índice como atributo
            tableBody.appendChild(newRow);
        });
    }
    // Função para excluir o cliente
    excluirCliente = function(id) {
        // Recupera a lista de clientes do localStorage (se existir)
        const listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

        // Remove o cliente da lista pelo índice
        listaClientes.splice(id, 1);

        // Salva a lista atualizada no localStorage
        localStorage.setItem('clientes', JSON.stringify(listaClientes));

        // Atualiza a tabela após a exclusão
        atualizarTabela();
    }

    editarCliente = function (id) {
        // Recupera a lista de clientes do localStorage
        const listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    
        // Obtém o cliente pelo índice
        const clienteParaEditar = listaClientes[id];
    
        // Armazena os dados do cliente e o ID para edição no localStorage
        localStorage.setItem('clienteParaEditar', JSON.stringify(clienteParaEditar));
        localStorage.setItem('clienteParaEditarID', clienteParaEditar.id);

        // Preenche os campos com os dados do cliente para edição
        preencherCamposEdicao();
    }
});