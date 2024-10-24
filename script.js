// Função para adicionar uma nova linha na tabela e armazenar no localStorage
function addRow(listId, form) {
    const table = document.getElementById(listId).getElementsByTagName('tbody')[0]; // Adicionando na tag <tbody>
    const newRow = table.insertRow();
    
    let rowData = [];

    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type !== 'submit') {
            const newCell = newRow.insertCell(i);
            const inputValue = form.elements[i].value;
            newCell.textContent = inputValue;
            rowData.push(inputValue);
        }
    }

    const actionCell = newRow.insertCell(form.elements.length - 1);
    actionCell.innerHTML = `<button onclick="editRow(this)" class="button-edit">Alterar</button> <button onclick="deleteRow(this)" class="button-delete">Excluir</button>`;
    
    // Armazenar no localStorage
    let storedData = JSON.parse(localStorage.getItem(listId)) || [];
    storedData.push(rowData);
    localStorage.setItem(listId, JSON.stringify(storedData));

    form.reset();
}

// Função para carregar os dados do localStorage ao carregar a página
function loadTableData() {
    const lists = ['maquinaList', 'recebimentoList', 'contratoList', 'contaList', 'empresaList'];

    lists.forEach(listId => {
        const table = document.getElementById(listId).getElementsByTagName('tbody')[0]; // Adicionando na tag <tbody>
        const storedData = JSON.parse(localStorage.getItem(listId)) || [];

        storedData.forEach(rowData => {
            const newRow = table.insertRow();
            rowData.forEach((cellData, index) => {
                const newCell = newRow.insertCell(index);
                newCell.textContent = cellData;
            });
            const actionCell = newRow.insertCell(rowData.length);
            actionCell.innerHTML = `<button onclick="editRow(this)" class="button-edit">Alterar</button> <button onclick="deleteRow(this)" class="button-delete">Excluir</button>`;
        });
    });
}

// Função para carregar os dados ao iniciar
window.onload = loadTableData;

// Adicionar evento de submit para os formulários
document.getElementById('maquinaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('maquinaList', this);
});

document.getElementById('recebimentoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('recebimentoList', this);
});

document.getElementById('contratoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('contratoList', this);
});

document.getElementById('contaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('contaList', this);
});

document.getElementById('empresaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('empresaList', this);
});