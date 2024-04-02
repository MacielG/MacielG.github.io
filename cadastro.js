document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastro-button').addEventListener('click', function(event) {
        event.preventDefault();
      
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
      
        // Aqui você deve adicionar o novo usuário ao array
        const newUser = { id: users.length + 1, username: username, permissions: 'normal' };
        users.push(newUser);
      
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'index.html'; // Redirecionar para a página principal após o cadastro
        renderUserList(); // Renderizar novamente a lista de usuários após adicionar um novo
    });
});
