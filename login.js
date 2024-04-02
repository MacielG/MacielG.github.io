document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Verificar o login apenas para admin
    if (username === 'admin' && password === 'admin123') { // Supondo que a senha do administrador seja 'admin123'
      // Marcar o usuário como autenticado
      localStorage.setItem('user_authenticated', true);
      localStorage.setItem('username', username); // Salvar o nome de usuário
      // Redirecionar para a página inicial após o login bem-sucedido
      window.location.href = 'index.html';
    } else {
      alert('Usuário ou senha incorretos.');
    }
  });
  