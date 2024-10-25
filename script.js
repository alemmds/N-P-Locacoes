// Função para salvar dados no Local Storage e carregar os dados salvos
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para adicionar ou salvar edição e atualizar Local Storage
function addButton(containerId, form, storageKey, editIndex = null) {
    const formData = {};
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name) {
            formData[form.elements[i].name] = form.elements[i].value;
        }
    }

    const dataList = loadFromLocalStorage(storageKey);
    if (editIndex === null) {
        dataList.push(formData); // Adiciona um novo item
    } else {
        dataList[editIndex] = formData; // Atualiza item no índice de edição
    }
    saveToLocalStorage(storageKey, dataList);

    updateButtons(containerId, storageKey);
    form.reset();
    form.removeAttribute('data-edit-index'); // Remove índice de edição após salvar
    document.getElementById(`alterar${containerId.replace('Container', '')}`).style.display = 'none';
}

// Função para atualizar os botões no contêiner
function updateButtons(containerId, storageKey) {
    const container = document.getElementById(containerId);
    const dataList = loadFromLocalStorage(storageKey);

    container.innerHTML = ''; // Limpa contêiner

    dataList.forEach((data, index) => {
        const button = document.createElement('button');
        button.classList.add('data-button');
        button.textContent = data[Object.keys(data)[0]]; // Usa o primeiro campo como rótulo
        button.onclick = () => showDetails(data);

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions');
        actionsContainer.innerHTML = `
            <button class="button-edit" onclick="editItem('${containerId}', '${storageKey}', ${index})">Editar</button>
            <button class="button-delete" onclick="deleteItem('${containerId}', '${storageKey}', ${index})">Excluir</button>`;

        const itemActions = document.createElement('div');
        itemActions.classList.add('item-actions');
        itemActions.appendChild(button);
        itemActions.appendChild(actionsContainer);

        container.appendChild(itemActions);
    });
}

// Função para exibir detalhes de um item
function showDetails(data) {
    let details = '';
    Object.entries(data).forEach(([key, value]) => {
        details += `${key}: ${value}\n`;
    });
    alert(details);
}

// Função para editar um item
function editItem(containerId, storageKey, index) {
    const dataList = loadFromLocalStorage(storageKey);
    const form = document.querySelector(`#${containerId.replace('Container', 'Form')}`);
    const data = dataList[index];

    // Preenche o formulário com os dados do item selecionado
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = data[key];
    });

    // Define índice de edição
    form.setAttribute('data-edit-index', index);
    document.getElementById(`alterar${containerId.replace('Container', '')}`).style.display = 'inline';
}

// Função para excluir um item
function deleteItem(containerId, storageKey, index) {
    const dataList = loadFromLocalStorage(storageKey);
    dataList.splice(index, 1);
    saveToLocalStorage(storageKey, dataList);
    updateButtons(containerId, storageKey);
}

// Função para mostrar seção específica
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Carregar botões salvos ao carregar a página
window.onload = function() {
    updateButtons('maquinasContainer', 'maquinas');
    updateButtons('recebimentosContainer', 'recebimentos');
    updateButtons('contratosContainer', 'contratos');
    updateButtons('contasContainer', 'contas');
    updateButtons('empresasContainer', 'empresas');
};

// Configuração dos eventos de envio de formulário para cada seção
document.getElementById('maquinaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const editIndex = this.getAttribute('data-edit-index');
    addButton('maquinasContainer', this, 'maquinas', editIndex !== null ? Number(editIndex) : null);
});

document.getElementById('recebimentoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const editIndex = this.getAttribute('data-edit-index');
    addButton('recebimentosContainer', this, 'recebimentos', editIndex !== null ? Number(editIndex) : null);
});

document.getElementById('contratoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const editIndex = this.getAttribute('data-edit-index');
    addButton('contratosContainer', this, 'contratos', editIndex !== null ? Number(editIndex) : null);
});

document.getElementById('contaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const editIndex = this.getAttribute('data-edit-index');
    addButton('contasContainer', this, 'contas', editIndex !== null ? Number(editIndex) : null);
});

document.getElementById('empresaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const editIndex = this.getAttribute('data-edit-index');
    addButton('empresasContainer', this, 'empresas', editIndex !== null ? Number(editIndex) : null);
});

// Função para busca nos botões
function searchInButtons(containerId, searchInputId) {
    const input = document.getElementById(searchInputId);
    const filter = input.value.toLowerCase();
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('.data-button');

    buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        button.style.display = text.includes(filter) ? '' : 'none';
    });
}

// Função para confirmar busca
function confirmSearch(containerId, searchInputId) {
    searchInButtons(containerId, searchInputId);
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch((error) => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}