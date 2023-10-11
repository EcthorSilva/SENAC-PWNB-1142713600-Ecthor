var produtos = [
    {
        categoria: "Games",
        nome: "Console Sony Playstation 5",
        preco: "R$ 3.719,90",
        imagemSrc: "/assets/images/products/p1.jpg"
    },
    {
        categoria: "Hardware",
        nome: "Processador AMD Ryzen 5 5600G",
        preco: "R$ 779,31",
        imagemSrc: "/assets/images/products/p2.jpg"
    },
    {
        categoria: "Periféricos",
        nome: "Headset Gamer HyperX Cloud II",
        preco: "R$ 699,99",
        imagemSrc: "/assets/images/products/p3.jpg"
    },
    {
        categoria: "Hardware",
        nome: "Processador AMD Ryzen 9 5900X",
        preco: "R$ 3.599,99",
        imagemSrc: "/assets/images/products/p4.jpg"
    },
    {
        categoria: "Hardware",
        nome: "Placa Mãe MSI, Intel LGA 1700",
        preco: "R$ 769,99",
        imagemSrc: "/assets/images/products/p5.jpg"
    },
    {
        categoria: "Computadores",
        nome: "Notebook Asus VivoBook 15 Intel Core i5-1135G7",
        preco: "R$ 3.443,99",
        imagemSrc: "/assets/images/products/p6.jpg"
    },
    {
        categoria: "Hardware",
        nome: "Fonte Corsair CV750 750W",
        preco: "R$ 599,99",
        imagemSrc: "/assets/images/products/p7.jpg"
    },
    {
        categoria: "Computadores",
        nome: "SSD 1 TB Kingston NV2, M.2 2280 PCIe",
        preco: "R$ 259,99",
        imagemSrc: "/assets/images/products/p8.jpg"
    },
    {
        categoria: "Hardware",
        nome: "Teclado Mecânico Gamer HyperX Alloy MKW100",
        preco: "R$ 239,99",
        imagemSrc: "/assets/images/products/p9.jpg"
    },
    {
        categoria: "Periféricos",
        nome: "Teclado Mecânico Gamer HyperX Alloy MKW100",
        preco: "R$ 239,99",
        imagemSrc: "/assets/images/products/p10.jpg"
    },
];

/* HOMEPAGE */

// Selecione todas as divs com a classe containerProducts
var containers = document.querySelectorAll(".containerProducts");

// interage sobre o array de containers e adicione os produtos a cada um deles
containers.forEach(function (container) {
    // interage sobre o array de produtos e crie dinamicamente os elementos HTML para cada produto
    produtos.forEach(function (produto) {
        // Crie elementos HTML para o produto
        var divProduto = document.createElement("div");
        divProduto.className = "product";

        var img = document.createElement("img");
        img.src = produto.imagemSrc;
        img.alt = produto.nome;

        var divDetalhes = document.createElement("div");
        divDetalhes.className = "product-details";

        var pCategoria = document.createElement("p");
        pCategoria.textContent = produto.categoria;

        var h4Nome = document.createElement("h4");
        h4Nome.textContent = produto.nome;

        var divFoot = document.createElement("div");
        divFoot.className = "product-foot";

        var divLeft = document.createElement("div");
        divLeft.className = "left";
        divLeft.innerHTML = produto.preco;

        var btnAddToCart = document.createElement("button");
        btnAddToCart.className = "add-to-cart";
        btnAddToCart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';

        // Adicione os elementos HTML ao DOM
        divFoot.appendChild(divLeft); // Preço do produto
        divFoot.appendChild(btnAddToCart);
        divDetalhes.appendChild(pCategoria); // Categoria do produto
        divDetalhes.appendChild(h4Nome); // Nome do produto
        divDetalhes.appendChild(divFoot);
        divProduto.appendChild(img);
        divProduto.appendChild(divDetalhes);

        // Adicione o produto ao container
        container.appendChild(divProduto);
    });
});

/* CARRINHO DE COMPRAS */

function atualizarCarrinho(produto, acao, quantidade) {
    var carrinho = document.querySelector(".card-body");

    if (acao === "adicionar") {
        // Crie elementos HTML para o produto no carrinho
        var divRow = document.createElement("div");
        divRow.className = "row mb-4";

        // Coluna 1: Imagem do produto
        var divCol1 = document.createElement("div");
        divCol1.className = "col-lg-3 col-md-12 mb-4 mb-lg-0";
        var img = document.createElement("img");
        img.src = produto.imagemSrc;
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

                atualizaOsValores(); // Atualiza os valores do resumo
            } else {
                quantidadeInput.value = novaQuantidade;
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
            console.log("Produto removido:", produto.nome);

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


        // Definir a quantidade do produto
        inputQuantidade.value = quantidade;
    } else if (acao === "remover") {
        // Remova o item do carrinho
        carrinho.removeChild(divRow);
        carrinho.removeChild(hr);

        atualizaOsValores(); // Atualiza os valores do resumo
    }

    atualizaOsValores(); // Atualiza os valores do resumo
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

    // Atualizar os elementos no HTML com o novo valor
    document.querySelector("ul.list-group li:nth-child(1) span").textContent = "R$ " + formatarNumero(totalProdutos);
    document.querySelector("ul.list-group li:nth-child(3) span").textContent = "R$ " + formatarNumero(valorPrazo);
    document.querySelector("ul.list-group li:nth-child(5) span").textContent = "R$ " + formatarNumero(valorVista);
    document.querySelector(".list-cust span").textContent = "(em até 10x de R$ " + formatarNumero(valorParcela) + " sem juros)";
}
// Formata os valores do carrinho para o padrão brasileiro
function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}