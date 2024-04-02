// Declaração de variáveis
let ultimoNumeroPedido = 0;
const pedidosExistentes = []; // Array para armazenar os pedidos

// Função para adicionar um novo pedido
function adicionarPedido(nome, cpf) {
  const novoPedido = document.createElement('li');
  const numeroPedido = gerarNumeroPedido(); // Gerar o número do pedido
  const precoPedido = parseFloat(localStorage.getItem('preco_por_unidade')) || 10; // Obter o preço por unidade do localStorage
  novoPedido.textContent = `Nome: ${nome} - CPF: ${cpf} - Número do Pedido: ${numeroPedido} - Preço: R$${precoPedido.toFixed(2)}`;

  const novoId = ++ultimoNumeroPedido;
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

// Função para validar CPF
function validarCPF(cpf) {
  // Implemente aqui a validação do CPF
  return true; // Por enquanto, sempre retorna true
}

// Função para gerar número do pedido
function gerarNumeroPedido() {
  return ultimoNumeroPedido + 1; // Incrementar o número do pedido
}

// Função para excluir um pedido
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

// Função para exibir o total dos preços dos pedidos
function exibirTotal() {
  const total = pedidosExistentes.reduce((acc, pedido) => acc + pedido.preco, 0);
  const elementoTotal = document.getElementById('total');
  if (elementoTotal) {
    elementoTotal.textContent = `Total: R$${total.toFixed(2)}`;
  }
}

// Evento de submissão do formulário para adicionar pedido
const formPedido = document.getElementById('form-pedido');
const listaPedidos = document.getElementById('lista-pedidos');
formPedido.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;

  // Validar nome e CPF
  if (!nome || !cpf) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Verificar se o CPF é válido
  if (!validarCPF(cpf)) {
    alert("CPF inválido. Por favor, insira um CPF válido.");
    return;
  }

  // Verificar se o pedido já existe
  const pedidoExistente = pedidosExistentes.find(pedido => pedido.nome === nome && pedido.cpf === cpf);
  if (pedidoExistente) {
    alert("Este pedido já foi adicionado.");
    return;
  }

  adicionarPedido(nome, cpf);

  // Limpar campos após adicionar
  document.getElementById('nome').value = "";
  document.getElementById('cpf').value = "";
});
