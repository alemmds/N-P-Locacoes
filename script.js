// Script para manipular exibição das seções
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

function showList(listId) {
    const lists = document.querySelectorAll('.table-container');
    lists.forEach(list => list.style.display = 'none');
    document.getElementById(listId).style.display = 'block';
}

// Funções de cadastro de dados
function cadastrarMaquina() {
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUsoMaquina').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadasMaquina').value;

    const table = document.getElementById('maquinasTableBody');
    const row = table.insertRow();
    row.innerHTML = `<td>${nome}</td><td>${serie}</td><td>${anosUso}</td><td>${horasTrabalhadas}</td><td><button onclick="excluirLinha(this)">Excluir</button></td>`;
}

function cadastrarRecebimento() {
    const nome = document.getElementById('nomeCliente').value;
    const valor = document.getElementById('valorRecebido').value;
    const data = document.getElementById('dataRecebimento').value;

    const table = document.getElementById('recebimentosTableBody');
    const row = table.insertRow();
    row.innerHTML = `<td>${nome}</td><td>${valor}</td><td>${data}</td><td><button onclick="excluirLinha(this)">Excluir</button></td>`;
}

function cadastrarContrato() {
    const nome = document.getElementById('nomeContrato').value;
    const equipamento = document.getElementById('tipoEquipamento').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    const table = document.getElementById('contratosTableBody');
    const row = table.insertRow();
    row.innerHTML = `<td>${nome}</td><td>${equipamento}</td><td>${dataInicio}</td><td>${dataFim}</td><td><button onclick="excluirLinha(this)">Excluir</button></td>`;
}

function cadastrarConta() {
    const descricao = document.getElementById('descricaoConta').value;
    const valor = document.getElementById('valorConta').value;
    const vencimento = document.getElementById('vencimentoConta').value;

    const table = document.getElementById('contasTableBody');
    const row = table.insertRow();
    row.innerHTML = `<td>${descricao}</td><td>${valor}</td><td>${vencimento}</td><td><button onclick="excluirLinha(this)">Excluir</button></td>`;
}

function cadastrarEmpresa() {
    const nome = document.getElementById('nomeEmpresa').value;
    const cnpj = document.getElementById('cnpjEmpresa').value;
    const endereco = document.getElementById('enderecoEmpresa').value;

    const table = document.getElementById('empresasTableBody');
    const row = table.insertRow();
    row.innerHTML = `<td>${nome}</td><td>${cnpj}</td><td>${endereco}</td><td><button onclick="excluirLinha(this)">Excluir</button></td>`;
}

// Função para excluir linhas das tabelas
function excluirLinha(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}