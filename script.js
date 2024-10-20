function showSection(sectionId) {
    // Esconde todas as seções de cadastro e listas
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    
    // Exibe a seção correspondente ao menu clicado
    document.getElementById(sectionId).style.display = 'block';
}

// Adiciona evento de clique para cada item do menu lateral
document.getElementById('menuMaquinas').addEventListener('click', function() {
    showSection('maquinasSection');
});

document.getElementById('menuRecebimentos').addEventListener('click', function() {
    showSection('recebimentosSection');
});

document.getElementById('menuContratos').addEventListener('click', function() {
    showSection('contratosSection');
});

document.getElementById('menuContas').addEventListener('click', function() {
    showSection('contasSection');
});

document.getElementById('menuEmpresas').addEventListener('click', function() {
    showSection('empresasSection');
});

// Função para adicionar dados à tabela de máquinas
function addMaquina() {
    const nome = document.getElementById('machineName').value;
    const serie = document.getElementById('machineSerie').value;
    const anosUso = document.getElementById('machineAnosUso').value;
    const horasTrabalhadas = document.getElementById('machineHorasTrabalhadas').value;

    if (nome && serie && anosUso && horasTrabalhadas) {
        const table = document.getElementById('maquinasTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = nome;
        row.insertCell(1).