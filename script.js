// Função para adicionar uma nova linha na tabela e armazenar no localStorage
function addRow(listId, form) {
    const table = document.getElementById(listId);
    const newRow = table.insertRow();
    
    let rowData = [];

    for (let i = 0; i < form.elements.length; i++) {
        const newCell = newRow.insertCell(i);
        const inputValue = form.elements[i].value;
        newCell.textContent = inputValue;
        rowData.push(inputValue);
    }

    const actionCell = newRow.insertCell(form.elements.length);
    actionCell.innerHTML = `<button onclick="editRow(this)" class="button-edit">Alterar</button> <button onclick="deleteRow(this)" class="button-delete">Excluir</button>`;
    
    // Armazenar no localStorage
    let storedData = JSON.parse(localStorage.getItem(listId)) || [];
    storedData.push(rowData);
    localStorage.setItem(listId, JSON.stringify(storedData));

    form.reset();
}

// Função para editar uma linha
function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    
    for (let i = 0; i < cells.length - 1; i++) {
        const input = document.createElement('input');
        input.value = cells[i].textContent;
        cells[i].innerHTML = '';
        cells[i].appendChild(input);
    }
    
    button.textContent = 'Salvar';
    button.setAttribute('onclick', 'saveRow(this)');
}

// Função para salvar uma linha editada
function saveRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].textContent = cells[i].getElementsByTagName('input')[0].value;
    }
    
    button.textContent = 'Alterar';
    button.setAttribute('onclick', 'editRow(this)');

    // Atualizar o localStorage
    updateLocalStorage(row);
}

// Função para excluir uma linha
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const listId = row.parentNode.parentNode.id;
    row.parentNode.removeChild(row);

    // Atualizar o localStorage após a exclusão
    let storedData = JSON.parse(localStorage.getItem(listId)) || [];
    const rowIndex = row.rowIndex - 1;
    storedData.splice(rowIndex, 1);
    localStorage.setItem(listId, JSON.stringify(storedData));
}

// Função para atualizar localStorage após edição
function updateLocalStorage(row) {
    const listId = row.parentNode.parentNode.id;
    const cells = row.getElementsByTagName('td');
    const updatedRowData = [];

    for (let i = 0; i < cells.length - 1; i++) {
        updatedRowData.push(cells[i].textContent);
    }

    let storedData = JSON.parse(localStorage.getItem(listId)) || [];
    const rowIndex = row.rowIndex - 1;
    storedData[rowIndex] = updatedRowData;
    localStorage.setItem(listId, JSON.stringify(storedData));
}

// Função para carregar os dados do localStorage ao carregar a página
function loadTableData() {
    const lists = ['maquinaList', 'recebimentoList', 'contratoList', 'contaList', 'empresaList'];

    lists.forEach(listId => {
        const table = document.getElementById(listId);
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

// Carregar os dados ao iniciar
window.onload = loadTableData;

// Mostrar ou esconder uma seção
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Expandir ou minimizar lista
function toggleList(listId) {
    const list = document.getElementById(listId);
    list.style.display = (list.style.display === 'none') ? 'table' : 'none';
}

// Mostrar a primeira seção por padrão
showSection('maquinasSection');