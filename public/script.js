document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Criar um objeto com os dados do formulário
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Desativar o botão ao enviar
    document.getElementById('resultado').textContent = 'Enviando...'; // Mensagem de carregamento

    fetch('https://recebedor-dados.onrender.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Definindo o tipo de conteúdo para JSON
        },
        body: JSON.stringify(data) // Convertendo os dados para JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        return response.text();
    })
    .then(result => {
        document.getElementById('resultado').textContent = result;

        // Redirecionar para a página de confirmação
        window.location.href = '/confirmation.html'; // Mude para o seu URL correto
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').textContent = 'Erro ao enviar os dados.';
        submitButton.disabled = false; // Reativar o botão em caso de erro
    });
});
