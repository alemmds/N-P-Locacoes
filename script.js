// Show and Hide Sections
function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');
}

// Cadastrar Máquina
function cadastrarMaquina() {
    const nome = document.getElementById('maquina-nome').value;
    const serie = document.getElementById('maquina-serie').value;
    const anos = document.getElementById('maquina-anos').value;
    const horas = document.getElementById('maquina-horas').value;

    const tbody = document.getElementById('maquina-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${nome}</td>
        <td>${serie}</td>
        <td>${anos}</td>
        <td>${horas}</td>
        <td>
            <button onclick="alterarMaquina(this)">Alterar</button>
            <button onclick="excluirMaquina(this)">Excluir</button>
        </td>
    `;

    tbody.appendChild(row);
}

// Alterar e Excluir Máquina
function alterarMaquina(button) {
    const row = button.parentNode.parentNode;
    const nome = prompt('Novo nome:', row.cells[0].innerText);
    if (nome) row.cells[0].innerText = nome;
}

function excluirMaquina(button) {
    const row = button.parentNode.parentNode;
    row.remove();
}

// Funções semelhantes para Recebimentos, Contratos, Contas, Empresas...
