// Seleciona todos os botões "Eu quero"
const botoesComprar = document.querySelectorAll('.bob');
const contadorCarrinho = document.getElementById('contador-carrinho');

// Carrega o carrinho salvo ou inicia um array vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho')) ||ançaCarrinho();
atualizarContador();

botoesComprar.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
        // Pacha o card pai para pegar o nome e o preço corretamente
        const card = evento.target.closest('.box-card');
        const nome = card.querySelector('.nome-produto').textContent;
        const precoTexto = card.querySelector('.preco-produto').textContent;
        
        // Transforma o texto "R$ 150,00" em um número real para cálculos (150.00)
        const precoNumerico = parseFloat(
            precoTexto.replace('R$', '').replace('.', '').replace(',', '.').trim()
        );

        // Adiciona o produto ao array do carrinho
        carrinho.push({ nome: nome, preco: precoNumerico, precoFormatado: precoTexto });

        // Salva no armazenamento local do navegador
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        atualizarContador();
        alert(`"${nome}" foi adicionado ao carrinho!`);
    });
});

function atualizarContador() {
    if (contadorCarrinho) {
        contadorCarrinho.textContent = carrinho.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const spanSubtotal = document.getElementById('subtotal');
    const spanTotalGeral = document.getElementById('total-geral');
    const mensagemDesconto = document.getElementById('mensagem-desconto');

    // Recupera os itens salvos no navegador
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        spanSubtotal.textContent = "R$ 0,00";
        spanTotalGeral.textContent = "R$ 0,00";
        return;
    }

    let subtotal = 0;
    listaCarrinho.innerHTML = "";

    // Exibe cada item na tela do carrinho
    carrinho.forEach((item, indice) => {
        subtotal += item.preco;
        
        const divItem = document.createElement('div');
        divItem.classList.add('item-carrinho');
        divItem.innerHTML = `
            <span>${item.nome} - <strong>${item.precoFormatado}</strong></span>
            <button onclick="removerItem(${indice})" class="btn-remover">Remover</button>
        `;
        listaCarrinho.appendChild(divItem);
    });

    let totalFinal = subtotal;

    // --- APLICAÇÃO DO IF / ELSE PARA O DESCONTO DE 10% ---
    if (subtotal > 250.00) {
        let desconto = subtotal * 0.10; // Calcula 10% de desconto
        totalFinal = subtotal - desconto;
        
        mensagemDesconto.textContent = `Parabéns! Desconto de 10% aplicado (- R$ ${desconto.toFixed(2).replace('.', ',')})`;
        mensagemDesconto.style.color = "#4caf50";
    } else {
        mensagemDesconto.textContent = "Adicione mais itens para ganhar 10% de desconto acima de R$ 250,00!";
        mensagemDesconto.style.color = "#ffc107";
    }

    // Exibe os valores finais formatados na tela
    spanSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    spanTotalGeral.textContent = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
});

// Função para remover um item específico do carrinho
function removerItem(indice) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(indice, 1); // Remove o item pelo índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    location.reload(); // Atualiza a página para recalcular tudo
}

function finalizarCompra() {
    alert("Compra finalizada com sucesso! Obrigado por comprar no Coma Aqui.");
    localStorage.removeItem('carrinho');
    window.location.href = "index.html";
}