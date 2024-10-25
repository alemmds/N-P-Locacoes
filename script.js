// Função para salvar dados no Local Storage e carregar os dados salvos
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para adicionar ou editar um botão à lista e salvar no Local Storage
function addButton(containerId, form, storageKey, editIndex = null) {
    const formData = {};
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name) {
            formData[form.elements[i].name] = form.elements[i].value;
        }
    }

    const dataList = loadFromLocalStorage(storageKey);
    if (editIndex === null) {
        dataList.push(formData); // Adiciona um novo item se editIndex não estiver definido
    } else {
        dataList[editIndex] = formData; // Atualiza o item em editIndex
    }
    saveToLocalStorage(storageKey, dataList);
    
    updateButtons(containerId, storageKey);
    form.reset();
    form.removeAttribute('data-edit-index'); // Remove o índice de edição após confirmar
}

// Função para atualizar os botões no contêiner com os dados salvos
function updateButtons(containerId, storageKey) {
    const container = document.getElementById(containerId);
    const dataList = loadFromLocalStorage(storageKey);
    
    container.innerHTML = ''; // Limpa o contêiner

    dataList.forEach((data, index) => {
        const button = document.createElement('button');
        button.classList.add('data-button');
        button.textContent = data[Object.keys(data)[0]]; // Usa o primeiro campo como rótulo do botão
        button.onclick = () => showDetails(data);
        
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions');
        actionsContainer.innerHTML = `<button class="button-edit" onclick="editItem('${containerId}', '${storageKey}', ${index})">Alterar</button>
                                      <button class="button-delete" onclick="deleteItem('${containerId}', '${storageKey}', ${index})">Excluir</button>`;
        
        // Agrupa o botão e as ações
        const itemActions = document.createElement('div');
        itemActions.classList.add('item-actions');
        itemActions.appendChild(button);
        itemActions.appendChild(actionsContainer);
        
        container.appendChild(itemActions);
    });
}

// Função para exibir detalhes do item
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

    // Preenche o formulário com os dados do item
    Object.keys(data).forEach(key => {
        form.querySelector(`[name="${key}"]`).value = data[key];
    });

    // Armazena o índice do item em edição no atributo do formulário
    form.setAttribute('data-edit-index', index);
}

// Evento de envio para adicionar ou editar item com base no atributo data-edit-index
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const containerId = form.id.replace('Form', 'Container');
        const storageKey = containerId.replace('Container', '').toLowerCase();
        const editIndex = form.getAttribute('data-edit-index');

        addButton(containerId, form, storageKey, editIndex !== null ? parseInt(editIndex) : null);
    });
});

// Função para excluir um item
function deleteItem(containerId, storageKey, index) {
    const dataList = loadFromLocalStorage(storageKey);
    dataList.splice(index, 1);
    saveToLocalStorage(storageKey, dataList);
    updateButtons(containerId, storageKey);
}

// Função para mostrar uma seção específica
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Função para carregar os botões com os dados salvos ao carregar a página
window.onload = function() {
    updateButtons('maquinasContainer', 'maquinas');
    updateButtons('recebimentosContainer', 'recebimentos');
    updateButtons('contratosContainer', 'contratos');
    updateButtons('contasContainer', 'contas');
    updateButtons('empresasContainer', 'empresas');
};

// Função para buscar entre os botões
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

// Função para confirmar busca ao clicar no botão "Confirmar"
function confirmSearch(containerId, searchInputId) {
    searchInButtons(containerId, searchInputId);
}

// Registrar o Service Worker
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