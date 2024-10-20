document.addEventListener('DOMContentLoaded', function() {
    showSection('maquinas'); // Mostrar a primeira seção de máquinas ao carregar
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function showForm(formId) {
    document.getElementById(formId).style.display = 'block';
    document.querySelector('.table-container').style.display = 'none';
}

function showList(listId) {
    document.getElementById(listId).style.display = 'block';
    document.querySelector('.form-container').style.display = 'none';
}

// Função para cadastrar máquinas
function cadastrarMaquina() {
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUsoMaquina').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadasMaquina').value;

    if (!nome || !serie || !anosUso || !horasTrabalhadas) {
        alert('Preencha todos os campos!');
        return;
    }

    const tableBody = document.getElementById('maquinasTableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${nome}</td>
        <td>${serie}</td>
        <td>${anosUso}</td>
        <td>${horasTrabalhadas}</td>
        <td class="table-actions">
            <button class="edit" onclick="editarMaquina(this)">Editar</button>
            <button class="delete" onclick="excluirMaquina(this)">Excluir</button>
        </td>
    `;

    tableBody.appendChild(row);
    alert('Máquina cadastrada com sucesso!');

    // Limpar os campos
    document.getElementById('maquinaForm').reset();
}

function editarMaquina(button) {
    // Implementar função de editar aqui
}

function excluirMaquina(button) {
    const row = button.parentNode.parentNode;
    row.remove();
    alert('Máquina excluída com sucesso!');
}
