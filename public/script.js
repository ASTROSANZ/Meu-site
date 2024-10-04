document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Cria um objeto a partir dos dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Envia os dados para o servidor de recepção
    fetch('https://recebedor-dados.onrender.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Converte os dados em JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }
        return response.text();  // Pega a resposta do servidor
    })
    .then(result => {
        document.getElementById('resultado').textContent = 'Dados enviados com sucesso!';
        // Redireciona para a página de confirmação
        window.location.href = '/confirmation.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').textContent = 'Erro ao enviar os dados. Tente novamente.';
    });
});
