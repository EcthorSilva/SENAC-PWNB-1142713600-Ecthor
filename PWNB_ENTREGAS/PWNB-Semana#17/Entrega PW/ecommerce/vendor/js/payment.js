// Função para recuperar os valores do localStorage
function recuperarValoresLocalStorage() {
    var valorPrazo = parseFloat(localStorage.getItem("valorPrazo")) || 0;
    var valorVista = parseFloat(localStorage.getItem("valorVista")) || 0;
    var valorParcela = parseFloat(localStorage.getItem("valorParcela")) || 0;

    console.log("Valor à prazo:", valorPrazo);
    console.log("Valor à vista:", valorVista);
    console.log("Valor da parcela:", valorParcela);

    // Atualizar os elementos no HTML com o novo valor
    document.querySelector("ul.list-group li:nth-child(1) span").textContent = "R$ " + formatarNumero(valorPrazo);
    document.querySelector("ul.list-group li:nth-child(4) span").textContent = "R$ " + formatarNumero(valorPrazo);
    document.querySelector("ul.list-group li:nth-child(4) span").textContent = "R$ " + formatarNumero(valorVista);
    document.querySelector(".list-cust span").textContent = "(em até 10x de R$ " + formatarNumero(valorParcela) + " sem juros)";
}

// Formata os valores do carrinho para o padrão brasileiro
function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Chame a função ao carregar a página
window.addEventListener('load', recuperarValoresLocalStorage);