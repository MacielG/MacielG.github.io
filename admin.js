document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está autenticado como administrador
    if (!localStorage.getItem('user_authenticated')) {
        // Se não estiver autenticado, redirecionar para a página de login
        window.location.href = 'login.html';
    } else {
        // Se estiver autenticado, continuar com a lógica da página do administrador
        renderUserList();
      
        // Exibir o nome do usuário
        const usernameInfo = document.getElementById('username-info');
        const username = localStorage.getItem('username');
        if (username) {
            usernameInfo.textContent = `Usuário: ${username}`;
        }
    }
  
    // Adicionar evento de clique ao botão "Sair"
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
  
    // Adicionar evento de clique ao botão de pesquisa
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = document.getElementById('search-input').value.trim();
            renderUserList(searchTerm);
        });
    }
  
    // Função para salvar o tipo de lista de clientes
    const salvarListaButton = document.getElementById('salvar-lista');
    if (salvarListaButton) {
        salvarListaButton.addEventListener('click', function() {
            const listaClientes = document.getElementById('lista-clientes').value;
            localStorage.setItem('lista_clientes', listaClientes);
            alert('Tipo de lista de clientes salvo com sucesso!');
        });
    }
  
    // Função para salvar o preço por unidade
    const salvarPrecoButton = document.getElementById('salvar-preco');
    if (salvarPrecoButton) {
        salvarPrecoButton.addEventListener('click', function() {
            const novoPreco = parseFloat(document.getElementById('preco-unidade').value);
            if (!isNaN(novoPreco) && novoPreco >= 0) {
                localStorage.setItem('preco_por_unidade', novoPreco);
                alert('Preço por unidade salvo com sucesso!');
            } else {
                alert('Por favor, insira um valor válido para o preço.');
            }
        });
    }
  
    // Renderizar lista de usuários ao carregar a página
    renderUserList();
  
    // Carregar e definir valores padrão para lista de clientes e preço por unidade
    const listaClientes = localStorage.getItem('lista_clientes') || '1'; // Tipo de lista padrão
    document.getElementById('lista-clientes').value = listaClientes;
  
    const precoPorUnidade = parseFloat(localStorage.getItem('preco_por_unidade')) || 10; // Definindo preço padrão
    document.getElementById('preco-unidade').value = precoPorUnidade.toFixed(2); // Exibindo o preço atual
});

// Array simulando usuários cadastrados
let users = [
    { id: 1, username: 'user1', permissions: 'normal' },
    { id: 2, username: 'user2', permissions: 'normal' },
    { id: 3, username: 'user3', permissions: 'normal' }
];

// Função para renderizar a lista de usuários
function renderUserList(searchTerm = '') {
    const userListDiv = document.getElementById('user-list');
    if (userListDiv) {
        userListDiv.innerHTML = ''; // Limpar lista
      
        users.forEach(user => {
            if (searchTerm === '' || user.username.includes(searchTerm)) {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <span>ID: ${user.id}</span>
                    <span>Usuário: ${user.username}</span>
                    <span>Permissões: ${user.permissions}</span>
                    <button onclick="editUserPermissions(${user.id})">Editar Permissões</button>
                    <button onclick="deleteUser(${user.id})">Excluir</button>
                `;
                userListDiv.appendChild(userDiv);
            }
        });
    }
}

// Função para editar as permissões do usuário
function editUserPermissions(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        const newPermissions = prompt(`Editar permissões para ${user.username}:`, user.permissions);
        if (newPermissions !== null) {
            user.permissions = newPermissions;
            renderUserList();
        }
    } else {
        alert('Usuário não encontrado.');
    }
}

// Função para excluir um usuário
function deleteUser(userId) {
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        renderUserList();
    } else {
        alert('Usuário não encontrado.');
    }
}

// Função para fazer logout do usuário
function logout() {
    localStorage.removeItem('user_authenticated');
    window.location.href = 'login.html'; // Redirecionar para a página de login após logout
}