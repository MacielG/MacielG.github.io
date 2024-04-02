// Função para fazer logout do usuário
function logout() {
    localStorage.removeItem('user_authenticated');
    localStorage.removeItem('username'); // Remover o nome de usuário também
    window.location.href = 'login.html'; // Redirecionar para a página de login após logout
  }
  
  // Verificar se o usuário está autenticado como administrador
  function checkAuthentication() {
    if (!localStorage.getItem('user_authenticated')) {
      // Se não estiver autenticado, redirecionar para a página de login
      window.location.href = 'login.html';
    }
  }
  
  // Verificar a autenticação ao carregar a página
  window.onload = function() {
    checkAuthentication();
  };
  
  // Adicionar evento de clique ao botão "Sair"
  document.getElementById('logout-button').addEventListener('click', logout);
  
  document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

function logout() {
    localStorage.removeItem('user_authenticated');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

function logout() {
    localStorage.removeItem('user_authenticated');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}