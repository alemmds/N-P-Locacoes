// Função para armazenar dados no LocalStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Função para carregar dados do LocalStorage
function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para renderizar lista de itens
function renderList(data, container, type) {
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = '<p>Nenhum item cadastrado.</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = '<tr><th>Nome</th><th>Ação</th></tr>';
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nome}</td>
                <td>
                    <button onclick="editItem(${index}, '${type}')">Alterar</button>
                    <button onclick="deleteItem(${index}, '${type}')">Excluir</button>
                </td>
            `;
            table.appendChild(row);
        });
        container.appendChild(table);
    }
}

// Função para adicionar item
function addItem(form, type) {
    const formData = new FormData(form);
    const data = loadFromLocalStorage(type);

    // Cria objeto com os dados do formulário
    const item = {};
    formData.forEach((value, key) => {
        item[key] = value;
    });

    data.push(item);
    saveToLocalStorage(type, data);

    alert('Item cadastrado com sucesso!');
    form.reset();
    showList(type);  // Exibe lista após cadastro
}

// Função para excluir item
function deleteItem(index, type) {
    const data = loadFromLocalStorage(type);
    data.splice(index, 1);
    saveToLocalStorage(type, data);
    showList(type);
}

// Função para editar item (mostra no formulário)
function editItem(index, type) {
    const data = loadFromLocalStorage(type);
    const item = data[index];

    const form = document.querySelector(`#form-${type}`);
    for (const key in item) {
        form[key].value = item[key];
    }

    document.querySelector(`#form-${type} button[type="submit"]`).onclick = function (e) {
        e.preventDefault();
        data[index] = {};
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            data[index][key] = value;
        });
        saveToLocalStorage(type, data);
        alert('Item alterado com sucesso!');
        form.reset();
        showList(type);
    };
}

// Função para exibir a lista de itens
function showList(type) {
    const listContainer = document.getElementById(`lista-${type}`);
    const data = loadFromLocalStorage(type);
    renderList(data, listContainer, type);
}

document.addEventListener('DOMContentLoaded', () => {
    // Menu Máquinas
    document.getElementById('menu-maquinas').addEventListener('click', () => {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = `
            <h2>Cadastro de Máquina</h2>
            <form id="form-maquinas">
                <label for="nome">Nome da Máquina</label>
                <input type="text" name="nome" id="nome" required>
                <label for="serie">Série</label>
                <input type="text" name="serie" id="serie" required>
                <label for="anosUso">Anos de Uso</label>
                <input type="number" name="anosUso" id="anosUso" required>
                <label for="horasTrabalhadas">Horas Trabalhadas</label>
                <input type="number" name="horasTrabalhadas" id="horasTrabalhadas" required>
                <button type="submit">Cadastrar Máquina</button>
            </form>
            <h2>Lista de Máquinas</h2>
            <div id="lista-maquinas"></div>
            <button class="back-button" onclick="goBack()">Voltar</button>
        `;
        document.getElementById('form-maquinas').addEventListener('submit', (e) => {
            e.preventDefault();
            addItem(e.target, 'maquinas');
        });
        showList('maquinas');
    });

    // Outras funções para Recebimentos, Contratos, Contas e Empresas seguem a mesma lógica...
});

// Função de voltar para página inicial
function goBack() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>Bem-vindo ao Sistema N Pontes Locações</h2>
        <p>Utilize o menu lateral para navegar pelas categorias e gerenciar os dados.</p>
    `;
}
