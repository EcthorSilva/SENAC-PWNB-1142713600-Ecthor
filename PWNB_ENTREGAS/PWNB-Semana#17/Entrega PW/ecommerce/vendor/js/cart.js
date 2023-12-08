// localStorage.clear();

// TODO: Fazer com que a função de excluir o item do carrinho também o exclua do localstorage

/* CARRINHO DE COMPRAS */

// Função para exibir os produtos do carrinho na página cart.html
function exibirCarrinho() {
    var carrinho = document.querySelector(".card-body");

    
    // Obtém o carrinho do localStorage
    var carrinhoItens = JSON.parse(localStorage.getItem("carrinho")) || [];

    console.log("Itens no Carrinho:", carrinhoItens);

    // Itera sobre os itens do carrinho e os exibe na página
    carrinhoItens.forEach(function (produto) {
        // Crie elementos HTML para o produto no carrinho
        var divRow = document.createElement("div");
        divRow.className = "row mb-4";

        // Coluna 1: Imagem do produto
        var divCol1 = document.createElement("div");
        divCol1.className = "col-lg-3 col-md-12 mb-4 mb-lg-0";
        var img = document.createElement("img");
        img.src = produto.imagemSrc; // Adicione a imagemSrc
        img.className = "w-100";
        divCol1.appendChild(img);

        // Coluna 2: Nome, categoria e botão de remoção
        var divCol2 = document.createElement("div");
        divCol2.className = "col-lg-5 col-md-6 mb-4 mb-lg-0";
        var strongNome = document.createElement("strong");
        strongNome.textContent = produto.nome;
        var pCategoria = document.createElement("p");
        pCategoria.textContent = produto.categoria;
        divCol2.appendChild(strongNome);
        divCol2.appendChild(pCategoria);

        var divCol3 = document.createElement("div");
        divCol3.className = "col-lg-4 col-md-6 mb-4 mb-lg-0";
        var divQuantidade = document.createElement("div");
        divQuantidade.className = "d-flex-custom mb-4";

        var btnDiminuir = document.createElement("button");
        btnDiminuir.className = "btn-custum2 btn btn-primary px-3 me-2";
        btnDiminuir.innerHTML = '<i class="fas fa-minus"></i>';
        btnDiminuir.onclick = function () {
            var quantidadeInput = divQuantidade.querySelector('input[type=number]');
            var novaQuantidade = parseInt(quantidadeInput.value) - 1;

            if (novaQuantidade <= 0) {
                // Se a nova quantidade for menor ou igual a 0, remova o produto do carrinho e atualize o valor total
                var divRow = divQuantidade.closest(".row");
                carrinho.removeChild(divRow);
                carrinho.removeChild(hr);
                console.log("Produto removido:", produto.nome);

                // Atualiza o carrinho removendo o produto
                carrinhoItens = carrinhoItens.filter(function (item) {
                    return item.nome !== produto.nome;
                });

                // Atualiza o localStorage
                localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));

                atualizaOsValores(); // Atualiza os valores do resumo
            } else {
                quantidadeInput.value = novaQuantidade;

                // Atualiza a quantidade no objeto produto
                produto.quantidade = novaQuantidade;

                // Atualiza o carrinho no localStorage
                localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));
            }
        };

        var inputQuantidade = document.createElement("input");
        inputQuantidade.className = "form-control";
        inputQuantidade.type = "number";
        inputQuantidade.value = "1";
        inputQuantidade.min = "0";
        
        var btnAumentar = document.createElement("button");
        btnAumentar.className = "btn-custum2 btn btn-primary px-3 ms-2";
        btnAumentar.innerHTML = '<i class="fas fa-plus"></i>';
        btnAumentar.onclick = function () {
            var quantidadeInput = divQuantidade.querySelector('input[type=number]');
            var novaQuantidade = parseInt(quantidadeInput.value) + 1;
            quantidadeInput.value = novaQuantidade;

        };

        // Coluna 3: Quantidade e preço do produto
        divQuantidade.appendChild(btnDiminuir);
        divQuantidade.appendChild(inputQuantidade);
        divQuantidade.appendChild(btnAumentar);

        var pPreco = document.createElement("p");
        pPreco.className = "text-start text-md-center";
        var strongPreco = document.createElement("strong");
        strongPreco.textContent = produto.preco;
        pPreco.appendChild(strongPreco);

        // Botão de remoção de item
        var btnRemover = document.createElement("button");
        btnRemover.type = "button";
        btnRemover.className = "btn-custum2 btn btn-primary btn-sm me-1 mb-2";
        btnRemover.setAttribute("data-mdb-toggle", "tooltip");
        btnRemover.setAttribute("title", "Remove item");
        btnRemover.innerHTML = '<i class="fas fa-trash"></i>';

        // Adiciona um evento de clique ao botão de remoção
        btnRemover.addEventListener("click", function () {
            // Remove o item do carrinho
            carrinho.removeChild(divRow);
            carrinho.removeChild(hr);
            // Atualiza o carrinho removendo o produto
            carrinhoItens = carrinhoItens.filter(function (item) {
                return item.nome !== produto.nome;
            });

            // Atualiza o localStorage
            localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));

            atualizaOsValores(); // Atualiza os valores do resumo
        });

        // Adiciona os elementos à divCol2
        divCol2.appendChild(strongNome); // Nome do produto
        divCol2.appendChild(pCategoria); // Categoria do produto
        divCol2.appendChild(btnRemover); // Botão de remoção

        // Adiciona os elementos ao divCol3
        divCol3.appendChild(divQuantidade); // Quantidade do produto
        divCol3.appendChild(pPreco); // Preço do produto

        // Adiciona os divCol à divRow
        divRow.appendChild(divCol1); // Coluna para a imagem do produto
        divRow.appendChild(divCol2); // Coluna para o nome, categoria e botão de remoção
        divRow.appendChild(divCol3); // Coluna para a quantidade e preço do produto

        // Adiciona a linha horizontal entre os produtos
        var hr = document.createElement("hr");
        hr.className = "my-4";

        // Adiciona divRow e hr ao carrinho
        carrinho.appendChild(divRow); // Adiciona a linha com informações do produto ao carrinho
        carrinho.appendChild(hr); // Adiciona a linha horizontal separadora ao carrinho
    });

    // Atualiza os valores do resumo
    atualizaOsValores();
}

// Função para atualizar o calor do resumo
function atualizaOsValores() {
    // Recalcular o valor total dos produtos após remover o item
    var totalProdutos = 0;
    var carrinhoProdutos = document.querySelectorAll(".card-body .row");
    carrinhoProdutos.forEach(function (produto) {
        var precoElement = produto.querySelector("div.col-lg-4.col-md-6.mb-4.mb-lg-0 p");
        if (precoElement) {
            var precoTexto = precoElement.textContent;
            var precoNumerico = parseFloat(precoTexto.replace("R$ ", "").replace(".", "").replace(",", "."));
            totalProdutos += precoNumerico;
        }
    });

    // Calcular novamente o valor à prazo, à vista e o valor das parcelas
    var valorPrazo = totalProdutos;
    var valorVista = totalProdutos * 0.7;
    var valorParcela = totalProdutos / 10;

    console.log("Valor à prazo:", valorPrazo);
    console.log("Valor à vista:", valorVista);
    console.log("Valor da parcela:", valorParcela);

    // Atualizar os elementos no HTML com o novo valor
    document.querySelector("ul.list-group li:nth-child(1) span").textContent = "R$ " + formatarNumero(totalProdutos);
    document.querySelector("ul.list-group li:nth-child(4) span").textContent = "R$ " + formatarNumero(valorPrazo);
    document.querySelector("ul.list-group li:nth-child(7) span").textContent = "R$ " + formatarNumero(valorVista);
    document.querySelector(".list-cust span").textContent = "(em até 10x de R$ " + formatarNumero(valorParcela) + " sem juros)";

    // Salvar os valores no localStorage
    salvarValoresLocalStorage(valorPrazo, valorVista, valorParcela);
}

// Função para salvar valores no localStorage
function salvarValoresLocalStorage(prazo, vista, parcela) {
    localStorage.setItem('valorPrazo', prazo);
    localStorage.setItem('valorVista', vista);
    localStorage.setItem('valorParcela', parcela);
}

// Formata os valores do carrinho para o padrão brasileiro
function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.addEventListener('load', exibirCarrinho);