// localStorage.clear();

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

// Interage sobre o array de containers e adicione os produtos a cada um deles
containers.forEach(function (container) {
    // Interage sobre o array de produtos e crie dinamicamente os elementos HTML para cada produto
    produtos.forEach(function (produto, index) {
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

        // Adicione um evento de clique ao botão de adicionar ao carrinho
        btnAddToCart.addEventListener("click", function () {
            // Adiciona o produto ao carrinho
            adicionarAoCarrinho(produto, 1);
            mostrarPopup();
        });

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

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produto, quantidade) {
    // Obtém o carrinho do localStorage ou cria um novo array vazio
    var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já está no carrinho
    var produtoNoCarrinho = carrinho.find(item => item.nome === produto.nome);

    if (produtoNoCarrinho) {
        // Atualiza a quantidade se o produto já estiver no carrinho
        produtoNoCarrinho.quantidade += quantidade;
    } else {
        // Adiciona o produto ao carrinho
        carrinho.push({
            nome: produto.nome,
            categoria: produto.categoria,
            preco: produto.preco,
            imagemSrc: produto.imagemSrc, // Adiciona a imagemSrc
            quantidade: quantidade
        });
    }

    // Salva o carrinho no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Log para verificar os itens no console
    console.log("Itens no carrinho:", carrinho);
}


/* categoria */

// Selecione a div com o id categorias
var categoriasContainer = document.getElementById("categorias");

// Agrupa os produtos por categoria
var produtosPorCategoria = {};
produtos.forEach(function (produto) {
    if (!produtosPorCategoria[produto.categoria]) {
        produtosPorCategoria[produto.categoria] = [];
    }
    produtosPorCategoria[produto.categoria].push(produto);
});

for (var categoria in produtosPorCategoria) {
    // Criação dinâmica dos cards
    var categoriaCard = document.createElement("div");
    categoriaCard.className = "card mb-1";

    var cardHeader = document.createElement("div");
    cardHeader.className = "card-header-tabs py-3";

    var headerTitle = document.createElement("h5");
    headerTitle.className = "mb-0 d-flex justify-content-center align-items-center";
    headerTitle.textContent = categoria;

    cardHeader.appendChild(headerTitle);
    categoriaCard.appendChild(cardHeader);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Itera sobre os produtos da categoria
    var produtosCategoria = produtosPorCategoria[categoria];
    var produtosPorLinha = 4;  // Número desejado de produtos por linha
    var numLinhas = Math.ceil(produtosCategoria.length / produtosPorLinha);

    for (var linha = 0; linha < numLinhas; linha++) {
        var linhaContainer = document.createElement("div");
        linhaContainer.className = "row";

        for (var i = linha * produtosPorLinha; i < (linha + 1) * produtosPorLinha && i < produtosCategoria.length; i++) {
            var produto = produtosCategoria[i];
            var col = document.createElement("div");
            col.className = "col-lg-3 col-md-6 mb-4 mb-lg-0";

            var card = document.createElement("div");
            card.className = "card";

            var img = document.createElement("img");
            img.src = produto.imagemSrc;
            img.alt = "Imagem do Produto";
            img.className = "card-img-top";

            var cardCardBody = document.createElement("div");
            cardCardBody.className = "card-body";

            var title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = produto.nome;

            var price = document.createElement("p");
            price.className = "card-text";
            price.textContent = produto.preco;

            var buyButton = document.createElement("a");
            buyButton.href = "#";
            buyButton.className = "btn btn-outline-primary";
            buyButton.textContent = "Comprar";

            cardCardBody.appendChild(title);
            cardCardBody.appendChild(price);
            cardCardBody.appendChild(buyButton);
            card.appendChild(img);
            card.appendChild(cardCardBody);

            col.appendChild(card);
            linhaContainer.appendChild(col);
        }

        cardBody.appendChild(linhaContainer);

        // Adiciona uma linha horizontal entre conjuntos de colunas
        if (linha < numLinhas - 1) {
            var hr = document.createElement("hr");
            hr.className = "my-4 text-muted";
            cardBody.appendChild(hr);
        }
    }

    categoriaCard.appendChild(cardBody);

    // Adiciona o card da categoria ao container de categorias
    categoriasContainer.appendChild(categoriaCard);
}

function mostrarPopup() {
    $('#popupModal').modal('show');

    // Define um timeout de 2 segundos
    setTimeout(function() {
        $('#popupModal').modal('hide');
    }, 2000);
}