// 1. EFEITO SANFONA DO HEADER
const painelHeader = document.getElementById('painel-ao');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        painelHeader.style.height = '100px'; 
    } else {
        painelHeader.style.height = '100vh'; 
    }
});

// 2. CONTROLE DA GAVETA LATERAL DO CARRINHO
const gavetaCarrinho = document.getElementById('gaveta-carrinho');

function abrirCarrinho() {
    gavetaCarrinho.classList.add('ativa'); 
}

function fecharCarrinho() {
    gavetaCarrinho.classList.remove('ativa'); 
}

// 3. LÓGICA DE COMPRA E ATUALIZAÇÃO DE ITENS
let listaDeProdutos = [];
const contadorVisual = document.getElementById('contador-carrinho');
const containerItens = document.getElementById('lista-itens-carrinho');
const spanTotal = document.getElementById('valor-total');

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
        return;
    }
    
    containerItens.innerHTML = '';
    let precoTotal = 0;
    
    for (let i = 0; i < listaDeProdutos.length; i++) {
        let produtoAtual = listaDeProdutos[i];
        precoTotal = precoTotal + produtoAtual.preco;
        
        containerItens.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px;">
                <span>${produtoAtual.nome}</span>
                <span>R$ ${produtoAtual.preco.toFixed(2)}</span>
            </div>
        `;
    }
    
    if (spanTotal) {
        spanTotal.innerText = 'R$ ' + precoTotal.toFixed(2);
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

// 4. ENVIO DO FORMULÁRIO DE SUGESTÃO COM POPUP
function enviarSugestao(event) {
    event.preventDefault(); // Evita recarregar a página antes do alerta
    alert('Sugestão enviada com sucesso!');
    document.querySelector('.formulario-sugestao').reset();
}