// Função para mostrar uma seção específica
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
}

// Função para mostrar a lista de um tipo específico
function showList(type) {
    const listId = type + 'List';
    const lists = document.querySelectorAll('div[id$="List"]');
    lists.forEach(list => {
        list.classList.add('hidden');
    });

    const selectedList = document.getElementById(listId);
    selectedList.classList.remove('hidden');
}

// Função para cadastrar uma máquina
function cadastrarMaquina(event) {
    event.preventDefault();
    
    const nome = document.getElementById('maquinaNome').value;
    const serie = document.getElementById('maquinaSerie').value;
    const anosUso = document.getElementById('maquinaAnosUso').value;
    const horasTrabalhadas = document.getElementById('maquinaHorasTrabalhadas').value;

    const tableBody = document.getElementById('maquinaTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${nome}</td>
        <td>${serie}</td>
        <td>${anosUso}</td>
        <td>${horasTrabalhadas}</td>
        <td><button onclick="deleteRow(this)">Excluir</button></td>
    `;
    
    // Limpa o formulário
    event.target.reset();
}

// Função para cadastrar um recebimento
function cadastrarRecebimento(event) {
    event.preventDefault();

    const empresa = document.getElementById('recebimentoEmpresa').value;
    const valor = document.getElementById('recebimentoValor').value;
    const pagamento = document.getElementById('recebimentoPagamento').value;
    const termino = document.getElementById('recebimentoTermino').value;
    const status = document.getElementById('recebimentoStatus').value;

    const tableBody = document.getElementById('recebimentoTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${empresa}</td>
        <td>${valor}</td>
        <td>${pagamento}</td>
        <td>${termino}</td>
        <td>${status}</td>
        <td><button onclick="deleteRow(this)">Excluir</button></td>
    `;
    
    // Limpa o formulário
    event.target.reset();
}

// Função para cadastrar um contrato
function cadastrarContrato(event) {
    event.preventDefault();

    const empresa = document.getElementById('contratoEmpresa').value;
    const locatario = document.getElementById('contratoLocatario').value;
    const cnpj = document.getElementById('contratoCNPJ').value;
    const representante = document.getElementById('contratoRepresentante').value;
    const equipamento = document.getElementById('contratoEquipamento').value;
    const dataTermino = document.getElementById('contratoDataTermino').value;
    const operador = document.getElementById('contratoOperador').value;

    const tableBody = document.getElementById('contratoTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${empresa}</td>
        <td>${locatario}</td>
        <td>${cnpj}</td>
        <td>${representante}</td>
        <td>${equipamento}</td>
        <td>${dataTermino}</td>
        <td>${operador}</td>
        <td><button onclick="deleteRow(this)">Excluir</button></td>
    `;
    
    // Limpa o formulário
    event.target.reset();
}

// Função para cadastrar uma conta
function cadastrarConta(event) {
    event.preventDefault();

    const tipo = document.getElementById('contaTipo').value;
    const dataVencimento = document.getElementById('contaDataVencimento').value;
    const valor = document.getElementById('contaValor').value;

    const tableBody = document.getElementById('contaTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${tipo}</td>
        <td>${dataVencimento}</td>
        <td>${valor}</td>
        <td><button onclick="deleteRow(this)">Excluir</button></td>
    `;
    
    // Limpa o formulário
    event.target.reset();
}

// Função para cadastrar uma empresa
function cadastrarEmpresa(event) {
    event.preventDefault();

    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCNPJ').value;
    const areaAtuacao = document.getElementById('empresaAreaAtuacao').value;
    const representante = document.getElementById('empresaRepresentante').value;
    const telefone = document.getElementById('empresaTelefone').value;
    const email = document.getElementById('empresaEmail').value;

    const tableBody = document.getElementById('empresaTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${nome}</td>
        <td>${cnpj}</td>
        <td>${areaAtuacao}</td>
        <td>${representante}</td>
        <td>${telefone}</td>
        <td>${email}</td>
        <td><button onclick="deleteRow(this)">Excluir</button></td>
    `;
    
    // Limpa o formulário
    event.target.reset();
}

// Função para excluir uma linha da tabela
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
