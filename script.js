// Função para salvar dados no Local Storage e carregar os dados salvos
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para adicionar um novo botão à lista e salvar no Local Storage
function addButton(containerId, form, storageKey) {
    const formData = {};
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name) {
            formData[form.elements[i].name] = form.elements[i].value;
        }
    }

    const dataList = loadFromLocalStorage(storageKey);
    dataList.push(formData);
    saveToLocalStorage(storageKey, dataList);
    
    updateButtons(containerId, storageKey);
    form.reset();
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
        
        container.appendChild(button);
        container.appendChild(actionsContainer);
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

    // Atualiza o botão "Confirmar" para salvar as edições
    form.onsubmit = function(event) {
        event.preventDefault();
        saveEditedItem(containerId, form, storageKey, index);
    };
}

// Função para salvar a edição de um item
function saveEditedItem(containerId, form, storageKey, index) {
    const dataList = loadFromLocalStorage(storageKey);
    const updatedData = {};
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name) {
            updatedData[form.elements[i].name] = form.elements[i].value;
        }
    }
    dataList[index] = updatedData;
    saveToLocalStorage(storageKey, dataList);
    updateButtons(containerId, storageKey);
    form.reset();

    // Reseta o comportamento do botão "Confirmar"
    form.onsubmit = function(event) {
        event.preventDefault();
        addButton(containerId, form, storageKey);
    };
}

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

// Configuração dos eventos de envio de formulário para cada seção
document.getElementById('maquinaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addButton('maquinasContainer', this, 'maquinas');
});

document.getElementById('recebimentoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addButton('recebimentosContainer', this, 'recebimentos');
});

document.getElementById('contratoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addButton('contratosContainer', this, 'contratos');
});

document.getElementById('contaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addButton('contasContainer', this, 'contas');
});

document.getElementById('empresaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addButton('empresasContainer', this, 'empresas');
});

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
