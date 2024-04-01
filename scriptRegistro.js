const formPedido = document.getElementById('form-pedido');
const listaPedidos = document.getElementById('lista-pedidos');
const PRECO_POR_CPF = 10; // Preço fixo por adição de CPF

// Declaração de variáveis
let ultimoNumeroPedido = 0;
const pedidosExistentes = []; // Array para armazenar os pedidos

formPedido.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;

  // Validar nome e CPF (opcional)
  if (!nome || !cpf) {
    return;
  }

  // Verificar se o pedido já existe
  const pedidoExistente = pedidosExistentes.find(pedido => pedido.nome === nome && pedido.cpf === cpf);
  if (pedidoExistente) {
    alert("Este pedido já foi adicionado.");
    return;
  }

  adicionarPedido(nome, cpf);

  // Limpar campos após adicionar (opcional)
  document.getElementById('nome').value = "";
  document.getElementById('cpf').value = "";
});

function adicionarPedido(nome, cpf) {
  const novoPedido = document.createElement('li');
  const numeroPedido = gerarNumeroPedido(); // Gerar o número do pedido
  novoPedido.textContent = `Nome: ${nome} - CPF: ${cpf} - Número do Pedido: ${numeroPedido} - Preço: R$${PRECO_POR_CPF.toFixed(2)}`;

  const novoId = ++ultimoNumeroPedido;
  const precoPedido = PRECO_POR_CPF; // Preço fixo por adição de CPF
  const pedido = { id: novoId, nome, cpf, numeroPedido, preco: precoPedido, associacoes: [] }; // Usar o mesmo número de pedido para o pedido
  novoPedido.setAttribute('data-numero-pedido', numeroPedido); // Definir o atributo data-numero-pedido

  pedidosExistentes.push(pedido);
  listaPedidos.appendChild(novoPedido);

  // Adicionar botão de exclusão
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.dataset.numeroPedido = pedido.numeroPedido; // Usar o mesmo número de pedido para o botão
  botaoExcluir.addEventListener('click', () => excluirPedido(botaoExcluir.dataset.numeroPedido));
  novoPedido.appendChild(botaoExcluir);

  // Recalcular e exibir a soma total dos preços dos pedidos
  exibirTotal();
}

function gerarNumeroPedido() {
  return ultimoNumeroPedido + 1; // Incrementar o número do pedido
}

function excluirPedido(numeroPedido) {
  const pedidoEncontrado = pedidosExistentes.find(pedido => pedido.numeroPedido === parseInt(numeroPedido));

  if (pedidoEncontrado) {
    const indicePedido = pedidosExistentes.indexOf(pedidoEncontrado);
    pedidosExistentes.splice(indicePedido, 1);

    const elementoLista = document.querySelector(`[data-numero-pedido='${numeroPedido}']`);
    if (elementoLista) {
      listaPedidos.removeChild(elementoLista);
    } else {
      console.error(`Elemento com número de pedido ${numeroPedido} não encontrado no DOM!`);
    }
  } else {
    console.error(`Pedido com número ${numeroPedido} não encontrado!`);
  }

  // Recalcular e exibir a soma total dos preços dos pedidos após excluir um pedido
  exibirTotal();
}

function exibirTotal() {
  const total = pedidosExistentes.reduce((acc, pedido) => acc + pedido.preco, 0);
  const elementoTotal = document.getElementById('total');
  if (elementoTotal) {
    elementoTotal.textContent = `Total: R$${total.toFixed(2)}`;
  }
}
