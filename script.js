// 1. EFEITO SANFONA DO HEADER
const painelHeader = document.getElementById('painel-ao');



// 2. CONTROLE DA GAVETA LATERAL DO CARRINHO
const gavetaCarrinho = document.getElementById('gaveta-carrinho');

function abrirCarrinho() {
    gavetaCarrinho.classList.add('ativa'); 
}

function fecharCarrinho() {
    gavetaCarrinho.classList.remove('ativa'); 
}

// 3. LÓGICA DE COMPRA E ATUALIZAÇÃO DE ITENS (COM AVISO E DESCONTO DE 10%)
let listaDeProdutos = [];
const contadorVisual = document.getElementById('contador-carrinho');
const containerItens = document.getElementById('lista-itens-carrinho');
const spanTotal = document.getElementById('valor-total');
const spanDesconto = document.getElementById('valor-desconto');

function adicionarAoCarrinho(nomeProduto, precoProduto) {
    listaDeProdutos.push({ nome: nomeProduto, preco: precoProduto });
    atualizarCarrinhoVisual();
    abrirCarrinho();
}

function atualizarCarrinhoVisual() {
    if (contadorVisual) {
        contadorVisual.innerText = listaDeProdutos.length;
    }
    
    if (!containerItens) return;

    if (listaDeProdutos.length === 0) {
        containerItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
        if (spanTotal) spanTotal.innerText = 'R$ 0,00';
        if (spanDesconto) spanDesconto.innerText = 'R$ 0,00';
        return;
    }
    
    containerItens.innerHTML = '';
    let subtotal = 0;
    
    for (let i = 0; i < listaDeProdutos.length; i++) {
        let produtoAtual = listaDeProdutos[i];
        subtotal = subtotal + produtoAtual.preco;
        
        containerItens.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px;">
                <span>${produtoAtual.nome}</span>
                <span>R$ ${produtoAtual.preco.toFixed(2)}</span>
            </div>
        `;
    }
    
    let valorDesconto = 0;
    let totalFinal = subtotal;

    // Regra: Mais de 3 itens ganha 10% de desconto e avisa o cliente
    if (listaDeProdutos.length > 3) {
        valorDesconto = subtotal * 0.10;
        totalFinal = subtotal - valorDesconto;
        
        // Adiciona um aviso visível dentro da lista do carrinho
        containerItens.innerHTML += `
            <div style="margin-top: 15px; padding: 8px; background-color: #e8f8f5; border: 1px solid #27ae60; border-radius: 4px; color: #27ae60; font-size: 13px; font-weight: bold; text-align: center;">
                🎉 Desconto de 10% aplicado por ter mais de 3 itens!
            </div>
        `;
    }

    if (spanDesconto) {
        spanDesconto.innerText = 'R$ ' + valorDesconto.toFixed(2);
    }

    if (spanTotal) {
        spanTotal.innerText = 'R$ ' + totalFinal.toFixed(2);
    }
}

function finalizarCompra() {
    if (listaDeProdutos.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada com sucesso! Obrigado.');
    listaDeProdutos = [];
    atualizarCarrinhoVisual();
    fecharCarrinho();
}

// 4. ENVIO DO FORMULÁRIO DE SUGESTÃO
function enviarSugestao(event) {
    event.preventDefault(); 
    alert('Sugestão enviado com sucesso, em breve entraremos em contato');
    document.querySelector('.formulario-sugestao').reset();
}