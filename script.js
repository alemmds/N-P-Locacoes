// Arrays iniciais, carregados do LocalStorage se disponíveis
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

// Função para carregar dados do LocalStorage ao inicializar
function loadFromLocalStorage() {
    maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
    contas = JSON.parse(localStorage.getItem('contas')) || [];
    recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
    contratos = JSON.parse(localStorage.getItem('contratos')) || [];
    empresas = JSON.parse(localStorage.getItem('empresas')) || [];
}
// Adicionar esta função logo após o carregamento da página
window.onload = function() {
    loadFromLocalStorage();
    showList('maquinas'); // ou qualquer aba que deseja mostrar ao carregar a página
};

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

// Função para salvar dados no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('maquinas', JSON.stringify(maquinas));
    localStorage.setItem('contas', JSON.stringify(contas));
    localStorage.setItem('recebimentos', JSON.stringify(recebimentos));
    localStorage.setItem('contratos', JSON.stringify(contratos));
    localStorage.setItem('empresas', JSON.stringify(empresas));
}

// Função para retornar ao menu principal
function goBack(section) {
    document.getElementById(section).style.display = 'none';
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

// Funções de adicionar novos registros para cada categoria
document.getElementById('formMaquina').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;
    const ultimaManutencao = document.getElementById('ultimaManutencao').value;
    const dataEntrada = document.getElementById('dataEntrada').value;

    if (!nome || !serie || !anosUso || !horasTrabalhadas || !ultimaManutencao || !dataEntrada) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    maquinas.push({ nome, serie, anosUso, horasTrabalhadas, ultimaManutencao, dataEntrada });
    saveToLocalStorage();
    document.getElementById('formMaquina').reset();
    showList('maquinas');
});

document.getElementById('formConta').addEventListener('submit', function(e) {
    e.preventDefault();
    const tipo = document.getElementById('tipoConta').value;
    const dataVencimento = document.getElementById('dataVencimentoConta').value;
    const valor = document.getElementById('valorConta').value;

    if (!tipo || !dataVencimento || !valor) {
        alert("Preencha todos os campos.");
        return;
    }

    contas.push({ tipo, dataVencimento, valor });
    saveToLocalStorage();
    document.getElementById('formConta').reset();
    showList('contas');
});

document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();
    const empresa = document.getElementById('empresaRecebimento').value;
    const valor = document.getElementById('valorRecebimento').value;
    const dataPagamento = document.getElementById('dataPagamento').value;
    const dataTermino = document.getElementById('dataTermino').value;
    const status = document.getElementById('statusRecebimento').value;

    if (!empresa || !valor || !dataPagamento || !dataTermino || !status) {
        alert("Preencha todos os campos.");
        return;
    }

    recebimentos.push({ empresa, valor, dataPagamento, dataTermino, status });
    saveToLocalStorage();
    document.getElementById('formRecebimento').reset();
    showList('recebimentos');
});

document.getElementById('formContrato').addEventListener('submit', function(event) {
    event.preventDefault();
    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatarioContrato').value;
    const cnpj = document.getElementById('cnpjContrato').value;
    const representante = document.getElementById('representanteContrato').value;
    const periodo = document.getElementById('periodoContrato').value;
    const valor = document.getElementById('valorContrato').value;
    const dataTermino = document.getElementById('dataTerminoContrato').value;
    const equipamento = document.getElementById('equipamentoContrato').value;

    if (!empresa || !locatario || !cnpj || !representante || !periodo || !valor || !dataTermino || !equipamento) {
        alert("Preencha todos os campos.");
        return;
    }

    contratos.push({ empresa, locatario, cnpj, representante, periodo, valor, dataTermino, equipamento });
    saveToLocalStorage();
    document.getElementById('formContrato').reset();
    showList('contratos');
});

document.getElementById('formEmpresa').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;

    if (!nome || !areaCnpj || !areaAtuacao || !representante || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone, email });
    saveToLocalStorage();
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

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
    const editedItem = {};

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