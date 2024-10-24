let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Remover "MAQUINA 1" (caso exista)
if (maquinas.length > 0 && maquinas[0].nome === "MAQUINA 1") {
    maquinas.splice(0, 1);
    saveToLocalStorage();
}

// Função para carregar dados do Local Storage com verificação de validade
function loadFromLocalStorage() {
    try {
        maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
        contas = JSON.parse(localStorage.getItem('contas')) || [];
        recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
        contratos = JSON.parse(localStorage.getItem('contratos')) || [];
        empresas = JSON.parse(localStorage.getItem('empresas')) || [];
        
        // Verificando se os dados carregados são arrays válidos
        if (!Array.isArray(maquinas)) maquinas = [];
        if (!Array.isArray(contas)) contas = [];
        if (!Array.isArray(recebimentos)) recebimentos = [];
        if (!Array.isArray(contratos)) contratos = [];
        if (!Array.isArray(empresas)) empresas = [];

        console.log("Dados carregados:", { maquinas, contas, recebimentos, contratos, empresas });
    } catch (error) {
        console.error("Erro ao carregar dados do Local Storage:", error);
        // Se ocorrer erro ao carregar os dados, inicializa como arrays vazios
        maquinas = [];
        contas = [];
        recebimentos = [];
        contratos = [];
        empresas = [];
    }
}

// Função para salvar dados no Local Storage
function saveToLocalStorage() {
    try {
        localStorage.setItem('maquinas', JSON.stringify(maquinas));
        localStorage.setItem('contas', JSON.stringify(contas));
        localStorage.setItem('recebimentos', JSON.stringify(recebimentos));
        localStorage.setItem('contratos', JSON.stringify(contratos));
        localStorage.setItem('empresas', JSON.stringify(empresas));
        console.log("Dados salvos com sucesso no Local Storage.");
    } catch (error) {
        console.error("Erro ao salvar dados no Local Storage:", error);
    }
}

// Carregar os dados ao iniciar a página
window.onload = function() {
    loadFromLocalStorage();
    showList('maquinas');  // Ou qualquer outra aba padrão
};

// Função para limpar e resetar o Local Storage manualmente (pode ser chamada para depuração)
function resetLocalStorage() {
    if (confirm("Tem certeza que deseja resetar o Local Storage? Todos os dados serão perdidos.")) {
        localStorage.removeItem('maquinas');
        localStorage.removeItem('contas');
        localStorage.removeItem('recebimentos');
        localStorage.removeItem('contratos');
        localStorage.removeItem('empresas');
        
        // Inicializa novamente como arrays vazios
        maquinas = [];
        contas = [];
        recebimentos = [];
        contratos = [];
        empresas = [];
        
        saveToLocalStorage(); // Salva os arrays vazios
        console.log("Local Storage resetado.");
    }
}

// Função para exibir a aba correspondente do menu
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    const currentSection = document.getElementById(section);
    currentSection.style.display = 'block';

    const buttonsSection = document.querySelector(`#${section} .buttons`);
    if (buttonsSection) {
        buttonsSection.style.display = 'block';
    }
}

// Função para exibir a lista com base no tipo
function showList(type) {
    let data, listId;

    switch (type) {
        case 'maquinas':
            data = maquinas;
            listId = '#maquinasList';
            break;
        case 'contas':
            data = contas;
            listId = '#contasList';
            break;
        case 'recebimentos':
            data = recebimentos;
            listId = '#recebimentosList';
            break;
        case 'contratos':
            data = contratos;
            listId = '#contratosList';
            break;
        case 'empresas':
            data = empresas;
            listId = '#empresasList';
            break;
    }

    const listElement = document.querySelector(listId);
    listElement.innerHTML = ''; // Limpar lista

    data.forEach((item, index) => {
        const itemHTML = `
            <div class="item">
                <div class="header" onclick="toggleAccordion(this)">
                    <span>${item.nome || item.tipo || item.empresa}</span>
                    <div class="arrow">▼</div>
                </div>
                <div class="details" style="display:none;">
                    ${Object.keys(item).map(key => `<p><strong>${key}:</strong> ${item[key]}</p>`).join('')}
                    <div class="buttons">
                        <button onclick="editItem('${type}', ${index})">Alterar</button>
                        <button onclick="deleteItem('${type}', ${index})" class="delete">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        listElement.innerHTML += itemHTML;
    });

    ativarAccordion(); // Reativar funcionalidade do accordion
}

// Função para exibir/ocultar detalhes do item
function toggleAccordion(header) {
    const details = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrow.textContent = '▼';
    } else {
        details.style.display = 'block';
        arrow.textContent = '▲';
    }
}

// Função de edição de um item
function editItem(type, index) {
    let item;
    switch (type) {
        case 'maquinas':
            item = maquinas[index];
            break;
        case 'contas':
            item = contas[index];
            break;
        case 'recebimentos':
            item = recebimentos[index];
            break;
        case 'contratos':
            item = contratos[index];
            break;
        case 'empresas':
            item = empresas[index];
            break;
    }

    const fields = Object.keys(item);
    fields.forEach(field => {
        const inputField = document.getElementById(`edit${capitalizeFirstLetter(field)}`);
        if (inputField) {
            inputField.value = item[field];
        }
    });

    document.getElementById('currentEditType').value = type;
    document.getElementById('currentEditIndex').value = index;

    // Mudar a visibilidade do formulário de edição
    document.getElementById('editForm').style.display = 'block';
}

// Função para confirmar a edição de um item
document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const type = document.getElementById('currentEditType').value;
    const index = document.getElementById('currentEditIndex').value;

    const fields = Array.from(document.querySelectorAll('#editForm input'));
    const editedItem = { ...maquinas[index], ...contas[index], ...recebimentos[index], ...contratos[index], ...empresas[index] };  // Clonar o item original

    fields.forEach(input => {
        if (input.value) {
            editedItem[input.name] = input.value;
        }
    });

    switch (type) {
        case 'maquinas':
            maquinas[index] = editedItem;
            break;
        case 'contas':
            contas[index] = editedItem;
            break;
        case 'recebimentos':
            recebimentos[index] = editedItem;
            break;
        case 'contratos':
            contratos[index] = editedItem;
            break;
        case 'empresas':
            empresas[index] = editedItem;
            break;
    }

    saveToLocalStorage();
    document.getElementById('editForm').style.display = 'none';
    showList(type);
});

// Função de exclusão de um item
function deleteItem(type, index) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        switch (type) {
            case 'maquinas':
                maquinas.splice(index, 1);
                break;
            case 'contas':
                contas.splice(index, 1);
                break;
            case 'recebimentos':
                recebimentos.splice(index, 1);
                break;
            case 'contratos':
                contratos.splice(index, 1);
                break;
            case 'empresas':
                empresas.splice(index, 1);
                break;
        }

        saveToLocalStorage();
        showList(type);
    }
}

// Função para capitalizar a primeira letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage(); // Carregar dados do LocalStorage
    showSection('maquinasSection'); // Mostrar a seção inicial
    showList('maquinas'); // Mostrar a lista inicial
});