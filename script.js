document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('maquinaForm').addEventListener('submit', addMachine);
    document.getElementById('recebimentoForm').addEventListener('submit', addRecebimento);
    document.getElementById('contratoForm').addEventListener('submit', addContrato);
    document.getElementById('contaForm').addEventListener('submit', addConta);
    document.getElementById('empresaForm').addEventListener('submit', addEmpresa);
});

let maquinas = [];
let recebimentos = [];
let contratos = [];
let contas = [];
let empresas = [];

function showSection(section) {
    const sections = ['maquinas', 'recebimentos', 'contratos', 'contas', 'empresas'];
    sections.forEach(sec => {
        document.getElementById(sec).classList.add('hidden');
    });
    document.getElementById(section).classList.remove('hidden');
}

function addMachine(event) {
    event.preventDefault();
    const nome = document.getElementById('maquinaNome').value;
    const serie = document.getElementById('maquinaSerie').value;
    const anosUso = document.getElementById('maquinaAnosUso').value;
    const horasTrabalhadas = document.getElementById('maquinaHorasTrabalhadas').value;

    const maquina = { nome, serie, anosUso, horasTrabalhadas };
    maquinas.push(maquina);
    document.getElementById('maquinaForm').reset();
    updateMachineTable();
}

function updateMachineTable() {
    const tbody = document.getElementById('maquinaTableBody');
    tbody.innerHTML = '';
    maquinas.forEach((maquina, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = maquina.nome;
        row.insertCell(1).innerText = maquina.serie;
        row.insertCell(2).innerText = maquina.anosUso;
        row.insertCell(3).innerText = maquina.horasTrabalhadas;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editMachine(${index})">Alterar</button> <button onclick="deleteMachine(${index})">Excluir</button>`;
    });
}

function editMachine(index) {
    const maquina = maquinas[index];
    document.getElementById('maquinaNome').value = maquina.nome;
    document.getElementById('maquinaSerie').value = maquina.serie;
    document.getElementById('maquinaAnosUso').value = maquina.anosUso;
    document.getElementById('maquinaHorasTrabalhadas').value = maquina.horasTrabalhadas;

    deleteMachine(index);
}

function deleteMachine(index) {
    maquinas.splice(index, 1);
    updateMachineTable();
}

function addRecebimento(event) {
    event.preventDefault();
    const empresa = document.getElementById('recebimentoEmpresa').value;
    const valor = document.getElementById('recebimentoValor').value;
    const pagamento = document.getElementById('recebimentoPagamento').value;
    const termino = document.getElementById('recebimentoTermino').value;
    const status = document.getElementById('recebimentoStatus').value;

    const recebimento = { empresa, valor, pagamento, termino, status };
    recebimentos.push(recebimento);
    document.getElementById('recebimentoForm').reset();
    updateRecebimentoTable();
}

function updateRecebimentoTable() {
    const tbody = document.getElementById('recebimentoTableBody');
    tbody.innerHTML = '';
    recebimentos.forEach((recebimento, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = recebimento.empresa;
        row.insertCell(1).innerText = recebimento.valor;
        row.insertCell(2).innerText = recebimento.pagamento;
        row.insertCell(3).innerText = recebimento.termino;
        row.insertCell(4).innerText = recebimento.status;
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `<button onclick="editRecebimento(${index})">Alterar</button> <button onclick="deleteRecebimento(${index})">Excluir</button>`;
    });
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('recebimentoEmpresa').value = recebimento.empresa;
    document.getElementById('recebimentoValor').value = recebimento.valor;
    document.getElementById('recebimentoPagamento').value = recebimento.pagamento;
    document.getElementById('recebimentoTermino').value = recebimento.termino;
    document.getElementById('recebimentoStatus').value = recebimento.status;

    deleteRecebimento(index);
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    updateRecebimentoTable();
}

function addContrato(event) {
    event.preventDefault();
    const empresa = document.getElementById('contratoEmpresa').value;
    const locatario = document.getElementById('contratoLocatario').value;
    const CNPJ = document.getElementById('contratoCNPJ').value;
    const representante = document.getElementById('contratoRepresentante').value;
    const equipamento = document.getElementById('contratoEquipamento').value;
    const dataTermino = document.getElementById('contratoDataTermino').value;
    const operador = document.getElementById('contratoOperador').value;

    const contrato = { empresa, locatario, CNPJ, representante, equipamento, dataTermino, operador };
    contratos.push(contrato);
    document.getElementById('contratoForm').reset();
    updateContratoTable();
}

function updateContratoTable() {
    const tbody = document.getElementById('contratoTableBody');
    tbody.innerHTML = '';
    contratos.forEach((contrato, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = contrato.empresa;
        row.insertCell(1).innerText = contrato.locatario;
        row.insertCell(2).innerText = contrato.CNPJ;
        row.insertCell(3).innerText = contrato.representante;
        row.insertCell(4).innerText = contrato.equipamento;
        row.insertCell(5).innerText = contrato.dataTermino;
        row.insertCell(6).innerText = contrato.operador;
        const actionsCell = row.insertCell(7);
        actionsCell.innerHTML = `<button onclick="editContrato(${index})">Alterar</button> <button onclick="deleteContrato(${index})">Excluir</button>`;
    });
}

function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('contratoEmpresa').value = contrato.empresa;
    document.getElementById('contratoLocatario').value = contrato.locatario;
    document.getElementById('contratoCNPJ').value = contrato.CNPJ;
    document.getElementById('contratoRepresentante').value = contrato.representante;
    document.getElementById('contratoEquipamento').value = contrato.equipamento;
    document.getElementById('contratoDataTermino').value = contrato.dataTermino;
    document.getElementById('contratoOperador').value = contrato.operador;

    deleteContrato(index);
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    updateContratoTable();
}

function addConta(event) {
    event.preventDefault();
    const tipo = document.getElementById('contaTipo').value;
    const dataVencimento = document.getElementById('contaDataVencimento').value;
    const valor = document.getElementById('contaValor').value;

    const conta = { tipo, dataVencimento, valor };
    contas.push(conta);
    document.getElementById('contaForm').reset();
    updateContaTable();
}

function updateContaTable() {
    const tbody = document.getElementById('contaTableBody');
    tbody.innerHTML = '';
    contas.forEach((conta, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = conta.tipo;
        row.insertCell(1).innerText = conta.dataVencimento;
        row.insertCell(2).innerText = conta.valor;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editConta(${index})">Alterar</button> <button onclick="deleteConta(${index})">Excluir</button>`;
    });
}

function editConta(index) {
    const conta = contas[index];
    document.getElementById('contaTipo').value = conta.tipo;
    document.getElementById('contaDataVencimento').value = conta.dataVencimento;
    document.getElementById('contaValor').value = conta.valor;

    deleteConta(index);
}

function deleteConta(index) {
    contas.splice(index, 1);
    updateContaTable();
}

function addEmpresa(event) {
    event.preventDefault();
    const nome = document.getElementById('empresaNome').value;
    const areaCNPJ = document.getElementById('empresaAreaCNPJ').value;
    const areaAtuacao = document.getElementById('empresaAreaAtuacao').value;
    const representante = document.getElementById('empresaRepresentante').value;
    const telefone = document.getElementById('empresaTelefone').value;
    const email = document.getElementById('empresaEmail').value;

    const empresa = { nome, areaCNPJ, areaAtuacao, representante, telefone, email };
    empresas.push(empresa);
    document.getElementById('empresaForm').reset();
    updateEmpresaTable();
}

function updateEmpresaTable() {
    const tbody = document.getElementById('empresaTableBody');
    tbody.innerHTML = '';
    empresas.forEach((empresa, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = empresa.nome;
        row.insertCell(1).innerText = empresa.areaCNPJ;
        row.insertCell(2).innerText = empresa.areaAtuacao;
        row.insertCell(3).innerText = empresa.representante;
        row.insertCell(4).innerText = empresa.telefone;
        row.insertCell(5).innerText = empresa.email;
        const actionsCell = row.insertCell(6);
        actionsCell.innerHTML = `<button onclick="editEmpresa(${index})">Alterar</button> <button onclick="deleteEmpresa(${index})">Excluir</button>`;
    });
}

function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('empresaNome').value = empresa.nome;
    document.getElementById('empresaAreaCNPJ').value = empresa.areaCNPJ;
    document.getElementById('empresaAreaAtuacao').value = empresa.areaAtuacao;
    document.getElementById('empresaRepresentante').value = empresa.representante;
    document.getElementById('empresaTelefone').value = empresa.telefone;
    document.getElementById('empresaEmail').value = empresa.email;

    deleteEmpresa(index);
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    updateEmpresaTable();
}
