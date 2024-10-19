document.getElementById('formMaquina').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.target;
    const nome = form[0].value;
    const serie = form[1].value;
    const anosUso = form[2].value;
    const horasTrabalhadas = form[3].value;

    addMaquina({ nome, serie, anosUso, horasTrabalhadas });
    form.reset();
});

function addMaquina(maquina) {
    const tableBody = document.querySelector('#tableMaquinas tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${maquina.nome}</td>
        <td>${maquina.serie}</td>
        <td>${maquina.anosUso}</td>
        <td>${maquina.horasTrabalhadas}</td>
        <td>
            <button onclick="editMaquina(this)">Alterar</button>
            <button onclick="deleteMaquina(this)">Excluir</button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function back() {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });
}

function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    document.getElementById(formId).style.display = 'block';
}

function showList(listId) {
    const lists = document.querySelectorAll('.list-container');
    lists.forEach(list => {
        list.style.display = 'none';
    });
    document.getElementById(listId).style.display = 'block';
}

// Funções para editar e excluir devem ser implementadas
function editMaquina(button) {
    // Implementar lógica de edição
}

function deleteMaquina(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Continuar para Recebimentos, Contratos, Contas e Empresas