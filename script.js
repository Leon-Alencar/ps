// 1. EFEITO SANFONA DO HEADER (Mantém visível e reduz ao rolar)
const painelHeader = document.getElementById('painel-ao');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        painelHeader.style.height = '90px';
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

// 3. LÓGICA DE COMPRA E ATUALIZAÇÃO DE ITENS NO CARRINHO
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

// 4. SAUDAÇÃO PERSONALIZADA (Index)
function personalizarSaudacao() {
    let nome = document.getElementById('input-nome').value;
    let mensagem = document.getElementById('mensagem-saudacao');

    if (nome.trim() === '') {
        mensagem.style.color = '#e74c3c';
        mensagem.textContent = 'Por favor, digite seu nome!';
    } else {
        mensagem.style.color = '#27ae60';
        mensagem.textContent = 'Bem-vindo à Pixel Store, ' + nome + '!';
    }
}

// 5. MODO PROMOÇÃO (Index)
function ativarModoPromoção() {
    document.body.style.backgroundColor = '#f39c12';
    let tituloPrincipal = document.getElementById('titulo-principal');
    if (tituloPrincipal) tituloPrincipal.style.color = '#8e44ad';
}

// 6. SIMULADOR DE COMPRA, DESCONTO E FRETE (Catálogo)
function calcularCompra() {
    let precoProduto = Number(document.getElementById('select-produto').value);
    let quantidade = Number(document.getElementById('input-quantidade').value);
    let resultadoSimulacao = document.getElementById('resultado-simulacao');
    let resultadoFrete = document.getElementById('resultado-frete');

    let totalBruto = precoProduto * quantidade;
    let totalFinal = totalBruto;
    let descontoAplicado = false;

    // Condição if/else para desconto (3 unidades ou mais ganham 10%)
    if (quantidade >= 3) {
        totalFinal = totalBruto * 0.90;
        descontoAplicado = true;
    } else {
        totalFinal = totalBruto;
    }

    if (descontoAplicado) {
        resultadoSimulacao.textContent = 'Total: R$ ' + totalFinal.toFixed(2) + ' (Desconto de 10% aplicado!)';
        resultadoSimulacao.style.color = '#27ae60';
    } else {
        resultadoSimulacao.textContent = 'Total: R$ ' + totalFinal.toFixed(2) + ' (Preço normal sem desconto)';
        resultadoSimulacao.style.color = '#333';
    }

    // Condição if/else para Frete (R$ 500 ou mais = Frete Grátis)
    if (totalFinal >= 500) {
        resultadoFrete.textContent = 'Frete grátis disponível!';
        resultadoFrete.style.color = '#27ae60';
        resultadoFrete.style.fontWeight = 'bold';
    } else {
        resultadoFrete.textContent = 'Frete calculado separadamente.';
        resultadoFrete.style.color = '#e74c3c';
        resultadoFrete.style.fontWeight = 'normal';
    }
}

// 7. VALIDAÇÃO DE ATENDIMENTO E IDADE (Atendimento)
function enviarAtendimento() {
    let nome = document.getElementById('atendimento-nome').value;
    let idade = Number(document.getElementById('atendimento-idade').value);
    let resposta = document.getElementById('resposta-atendimento');
    let respostaIdade = document.getElementById('resposta-idade');

    if (nome.trim() === '') {
        resposta.style.color = '#e74c3c';
        resposta.textContent = 'Digite seu nome antes de continuar.';
    } else {
        resposta.style.color = '#27ae60';
        resposta.textContent = 'Obrigado, ' + nome + '! Sua mensagem foi registrada.';
    }

    if (idade >= 18) {
        respostaIdade.textContent = 'Você pode participar das promoções para maiores de 18 anos.';
    } else {
        respostaIdade.textContent = 'As promoções gerais continuam disponíveis para você.';
    }
}

function destacarAtendimento() {
    let area = document.getElementById('area-atendimento');
    area.style.backgroundColor = '#dcdde1';
    area.style.padding = '25px';
}

// 8. FORMULÁRIO DE SUGESTÃO COM POPUP (Sugestão)
function enviarSugestao() {
    let email = document.getElementById('sugestao-email').value;
    
    if (email.trim() === '') {
        alert('Por favor, preencha o campo de e-mail.');
    } else {
        alert('Sugestão enviada com sucesso!');
    }
}