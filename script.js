// 1. EFEITO SANFONA DO HEADER
const painelHeader = document.getElementById('painel-ao');

window.addEventListener('scroll', function() {
    // Se rolar a tela mais de 50 pixels para baixo...
    if (window.scrollY > 50) {
        painelHeader.style.height = '180px'; // Diminui o header, fazendo o corte na imagem
    } else {
        painelHeader.style.height = '100vh'; // Retorna ao tamanho total no topo
    }
});


// 2. CONTROLE DA GAVETA LATERAL DO CARRINHO
const gavetaCarrinho = document.getElementById('gaveta-carrinho');

function abrirCarrinho() {
    gavetaCarrinho.classList.add('ativa'); // Traz a gaveta para dentro da tela
}

function fecharCarrinho() {
    gavetaCarrinho.classList.remove('ativa'); // Esconde a gaveta para fora da tela
}


// 3. LÓGICA DE COMPRA E ATUALIZAÇÃO DE ITENS
let listaDeProdutos = [];
const contadorVisual = document.getElementById('contador-carrinho');
const containerItens = document.getElementById('lista-itens-carrinho');
const spanTotal = document.getElementById('valor-total');

function adicionarAoCarrinho(nomeProduto, precoProduto) {
    // Adiciona o produto na lista
    listaDeProdutos.push({ nome: nomeProduto, preco: precoProduto });
    
    // Atualiza a visualização do carrinho
    atualizarCarrinhoVisual();
    
    // Abre a gaveta automaticamente para o usuário conferir
    abrirCarrinho();
}

function atualizarCarrinhoVisual() {
    // Altera o número vermelho no topo
    contadorVisual.innerText = listaDeProdutos.length;
    
    if (listaDeProdutos.length === 0) {
        containerItens.innerHTML = '<p>Seu carrinho está vazio.</p>';
        spanTotal.innerText = 'R$ 0,00';
        return;
    }
    
    containerItens.innerHTML = '';
    let precoTotal = 0;
    
    // Varre os itens para exibi-los na gaveta
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
    
    spanTotal.innerText = 'R$ ' + precoTotal.toFixed(2);
}
