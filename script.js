// Funções para manipulação de dados
document.getElementById('maquinaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('maquinaList', this);
    saveData('maquinas', getTableData('maquinaList'));
});

document.getElementById('recebimentoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('recebimentoList', this);
    saveData('recebimentos', getTableData('recebimentoList'));
});

document.getElementById('contratoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('contratoList', this);
    saveData('contratos', getTableData('contratoList'));
});

document.getElementById('contaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('contaList', this);
    saveData('contas', getTableData('contaList'));
});

document.getElementById('empresaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addRow('empresaList', this);
    saveData('empresas', getTableData('empresaList'));
});

// Adiciona uma nova linha à tabela
function addRow(listId, form) {
    const table = document.getElementById(listId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    for (let i = 0; i < form.elements.length - 1; i++) {
        const newCell = newRow.insertCell(i);
        newCell.textContent = form.elements[i].value;
    }
    const actionCell = newRow.insertCell(form.elements.length - 1);
    actionCell.innerHTML = `<button onclick="editRow(this)">Alterar</button>
                            <button onclick="deleteRow(this)">Excluir</button>`;
    form.reset();
}

// Salva os dados no localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Recupera os dados do localStorage e preenche a tabela
function loadData() {
    const keys = ['maquinas', 'recebimentos', 'contratos', 'contas', 'empresas'];
    keys.forEach(key => {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        data.forEach(item => {
            const tableId = key === 'maquinas' ? 'maquinaList' :
                            key === 'recebimentos' ? 'recebimentoList' :
                            key === 'contratos' ? 'contratoList' :
                            key === 'contas' ? 'contaList' : 'empresaList';
            addRow(tableId, { elements: item });
        });
    });
}

// Obter os dados da tabela
function getTableData(listId) {
    const rows = document.getElementById(listId).getElementsByTagName('tbody')[0].rows;
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const rowData = [];
        for (let j = 0; j < cells.length - 1; j++) {
            rowData.push(cells[j].textContent);
        }
        data.push(rowData);
    }
    return data;
}

// Edita uma linha da tabela
function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        const input = document.createElement('input');
        input.value = cells[i].textContent;
        cells[i].innerHTML = ''; // Limpa o conteúdo da célula
        cells[i].appendChild(input); // Adiciona o input à célula
    }
    button.textContent = 'Salvar';
    button.setAttribute('onclick', 'saveRow(this)');
}

// Salva a linha editada
function saveRow(button) {
    const row = button.parentNode.parentNode;
    const inputs = row.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        const cell = row.cells[i];
        cell.textContent = inputs[i].value; // Atualiza o texto da célula
    }
    button.textContent = 'Alterar';
    button.setAttribute('onclick', 'editRow(this)');
    
    // Salvar os dados atualizados
    const listId = row.parentNode.parentNode.parentNode.id; // Pega o ID da tabela
    saveData(listId.toLowerCase(), getTableData(listId));
}

// Exclui uma linha da tabela
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    // Salvar os dados atualizados
    const listId = row.parentNode.parentNode.parentNode.id; // Pega o ID da tabela
    saveData(listId.toLowerCase(), getTableData(listId));
}

// Função para mostrar a seção selecionada e ocultar outras
function showSection(sectionId) {
    const sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementById(sectionId).style.display = 'block';
}

// Inicializa ao mostrar a primeira seção e carregar os dados
loadData();
showSection('maquinasSection');