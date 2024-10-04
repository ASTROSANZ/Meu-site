document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/submit', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Para depuração
        window.location.href = 'confirmation.html'; // Redireciona para a tela de confirmação
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').textContent = 'Erro ao enviar os dados.';
    });
});
