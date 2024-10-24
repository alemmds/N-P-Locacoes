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

function addRow(listId, form) {
    const table = document.getElementById(listId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    for (let i = 0; i < form.elements.length; i++) {
        const newCell = newRow.insertCell(i);
        newCell.textContent = form.elements[i].value;
    }
    const actionCell = newRow.insertCell(form.elements.length);
    actionCell.innerHTML = `<button onclick="editRow(this)">Alterar</button> <button onclick="deleteRow(this)">Excluir</button>`;
    form.reset();
}

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

function saveRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        const input = cells[i].getElementsByTagName('input')[0];
        cells[i].textContent = input.value;
    }
    button.textContent = 'Alterar';
    button.setAttribute('onclick', 'editRow(this)');
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function showSection(sectionId) {
    const sections = document.getElementsByClassName('section');
    for (const section of sections) {
        section.style.display = 'none';
    }
    document.getElementById(sectionId).style.display = 'block';
}