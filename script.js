document.addEventListener('DOMContentLoaded', function () {
    showSection('maquinas'); // Mostra a seção de Máquinas por padrão

    // Adiciona event listeners para os formulários
    document.getElementById('formMaquina').onsubmit = handleFormMaquina;
    document.getElementById('formRecebimento').onsubmit = handleFormRecebimento;
    document.getElementById('formContrato').onsubmit = handleFormContrato;
    document.getElementById('formConta').onsubmit = handleFormConta;
    document.getElementById('formEmpresa').onsubmit = handleFormEmpresa;
});

// Função para mostrar uma seção específica
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Função para mostrar um formulário específico
function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    document.getElementById(formId).style.display = 'block';
}

// Função para mostrar uma lista específica
function showList(listId) {
    const lists = document.querySelectorAll('.list-container');
    lists.forEach(list => {
        list.style.display = 'none';
    });
    document.getElementById(listId).style.display = 'block';
}

// Função para voltar
function back() {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    const lists = document.querySelectorAll('.list-container');
    lists.forEach(list => {
        list.style.display = 'none';
    });
}

// Funções para manipulação de máquinas
let maquinas = [];

function handleFormMaquina(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const maquina = {
        id: Date.now(),
        nome: formData.get('nome'),
        serie: formData.get('serie'),
        anosUso: formData.get('anosUso'),
        horasTrabalhadas: formData.get('horasTrabalhadas')
    };
    maquinas.push(maquina);
    event.target.reset(); // Limpa o formulário
    updateMaquinaList();
    back();
}

function updateMaquinaList() {
    const tableBody = document.querySelector('#tableMaquinas tbody');
    tableBody.innerHTML = '';
    maquinas.forEach(maquina => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${maquina.nome}</td>
            <td>${maquina.serie}</td>
            <td>${maquina.anosUso}</td>
            <td>${maquina.horasTrabalhadas}</td>
            <td>
                <button onclick="editMaquina(${maquina.id})">Alterar</button>
                <button onclick="deleteMaquina(${maquina.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editMaquina(id) {
    const maquina = maquinas.find(m => m.id === id);
    if (maquina) {
        document.querySelector('#formMaquina input[name="nome"]').value = maquina.nome;
        document.querySelector('#formMaquina input[name="serie"]').value = maquina.serie;
        document.querySelector('#formMaquina input[name="anosUso"]').value = maquina.anosUso;
        document.querySelector('#formMaquina input[name="horasTrabalhadas"]').value = maquina.horasTrabalhadas;
        showForm('cadastrarMaquina');
        deleteMaquina(id); // Remove a máquina para permitir alteração
    }
}

function deleteMaquina(id) {
    maquinas = maquinas.filter(maquina => maquina.id !== id);
    updateMaquinaList();
}

// Funções para manipulação de recebimentos
let recebimentos = [];

function handleFormRecebimento(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const recebimento = {
        id: Date.now(),
        empresa: formData.get('empresa'),
        valor: parseFloat(formData.get('valor')),
        pagamento: formData.get('pagamento'),
        termino: formData.get('termino'),
        status: formData.get('status')
    };
    recebimentos.push(recebimento);
    event.target.reset(); // Limpa o formulário
    updateRecebimentoList();
    back();
}

function updateRecebimentoList() {
    const tableBody = document.querySelector('#tableRecebimentos tbody');
    tableBody.innerHTML = '';
    recebimentos.forEach(recebimento => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recebimento.empresa}</td>
            <td>${recebimento.valor}</td>
            <td>${recebimento.pagamento}</td>
            <td>${recebimento.termino}</td>
            <td>${recebimento.status}</td>
            <td>
                <button onclick="editRecebimento(${recebimento.id})">Alterar</button>
                <button onclick="deleteRecebimento(${recebimento.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editRecebimento(id) {
    const recebimento = recebimentos.find(r => r.id === id);
    if (recebimento) {
        document.querySelector('#formRecebimento input[name="empresa"]').value = recebimento.empresa;
        document.querySelector('#formRecebimento input[name="valor"]').value = recebimento.valor;
        document.querySelector('#formRecebimento input[name="pagamento"]').value = recebimento.pagamento;
        document.querySelector('#formRecebimento input[name="termino"]').value = recebimento.termino;
        document.querySelector('#formRecebimento select[name="status"]').value = recebimento.status;
        showForm('cadastrarRecebimento');
        deleteRecebimento(id); // Remove o recebimento para permitir alteração
    }
}

function deleteRecebimento(id) {
    recebimentos = recebimentos.filter(recebimento => recebimento.id !== id);
    updateRecebimentoList();
}

// Funções para manipulação de contratos
let contratos = [];

function handleFormContrato(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const contrato = {
        id: Date.now(),
        empresa: formData.get('empresa'),
        locatario: formData.get('locatario'),
        cnpj: formData.get('cnpj'),
        representante: formData.get('representante'),
        periodo: formData.get('periodo'),
        equipamento: formData.get('equipamento'),
        dataTermino: formData.get('dataTermino'),
        tipo: formData.get('tipo')
    };
    contratos.push(contrato);
    event.target.reset(); // Limpa o formulário
    updateContratoList();
    back();
}

function updateContratoList() {
    const tableBody = document.querySelector('#tableContratos tbody');
    tableBody.innerHTML = '';
    contratos.forEach(contrato => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contrato.empresa}</td>
            <td>${contrato.locatario}</td>
            <td>${contrato.cnpj}</td>
            <td>${contrato.representante}</td>
            <td>${contrato.equipamento}</td>
            <td>
                <button onclick="editContrato(${contrato.id})">Alterar</button>
                <button onclick="deleteContrato(${contrato.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editContrato(id) {
    const contrato = contratos.find(c => c.id === id);
    if (contrato) {
        document.querySelector('#formContrato input[name="empresa"]').value = contrato.empresa;
        document.querySelector('#formContrato input[name="locatario"]').value = contrato.locatario;
        document.querySelector('#formContrato input[name="cnpj"]').value = contrato.cnpj;
        document.querySelector('#formContrato input[name="representante"]').value = contrato.representante;
        document.querySelector('#formContrato input[name="periodo"]').value = contrato.periodo;
        document.querySelector('#formContrato input[name="equipamento"]').value = contrato.equipamento;
        document.querySelector('#formContrato input[name="dataTermino"]').value = contrato.dataTermino;
        document.querySelector('#formContrato select[name="tipo"]').value = contrato.tipo;
        showForm('cadastrarContrato');
        deleteContrato(id); // Remove o contrato para permitir alteração
    }
}

function deleteContrato(id) {
    contratos = contratos.filter(contrato => contrato.id !== id);
    updateContratoList();
}

// Funções para manipulação de contas
let contas = [];

function handleFormConta(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const conta = {
        id: Date.now(),
        tipo: formData.get('tipo'),
        dataVencimento: formData.get('dataVencimento'),
        valor: parseFloat(formData.get('valor')) || 0
    };
    contas.push(conta);
    event.target.reset(); // Limpa o formulário
    updateContaList();
    back();
}

function updateContaList() {
    const tableBody = document.querySelector('#tableContas tbody');
    tableBody.innerHTML = '';
    contas.forEach(conta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${conta.tipo}</td>
            <td>${conta.dataVencimento}</td>
            <td>${conta.valor}</td>
            <td>
                <button onclick="editConta(${conta.id})">Alterar</button>
                <button onclick="deleteConta(${conta.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editConta(id) {
    const conta = contas.find(c => c.id === id);
    if (conta) {
        document.querySelector('#formConta input[name="tipo"]').value = conta.tipo;
        document.querySelector('#formConta input[name="dataVencimento"]').value = conta.dataVencimento;
        document.querySelector('#formConta input[name="valor"]').value = conta.valor;
        showForm('cadastrarConta');
        deleteConta(id); // Remove a conta para permitir alteração
    }
}

function deleteConta(id) {
    contas = contas.filter(conta => conta.id !== id);
    updateContaList();
}

// Funções para manipulação de empresas
let empresas = [];

function handleFormEmpresa(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const empresa = {
        id: Date.now(),
        nome: formData.get('nome'),
        cnpj: formData.get('cnpj'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco')
    };
    empresas.push(empresa);
    event.target.reset(); // Limpa o formulário
    updateEmpresaList();
    back();
}

function updateEmpresaList() {
    const tableBody = document.querySelector('#tableEmpresas tbody');
    tableBody.innerHTML = '';
    empresas.forEach(empresa => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empresa.nome}</td>
            <td>${empresa.cnpj}</td>
            <td>${empresa.telefone}</td>
            <td>${empresa.endereco}</td>
            <td>
                <button onclick="editEmpresa(${empresa.id})">Alterar</button>
                <button onclick="deleteEmpresa(${empresa.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editEmpresa(id) {
    const empresa = empresas.find(e => e.id === id);
    if (empresa) {
        document.querySelector('#formEmpresa input[name="nome"]').value = empresa.nome;
        document.querySelector('#formEmpresa input[name="cnpj"]').value = empresa.cnpj;
        document.querySelector('#formEmpresa input[name="telefone"]').value = empresa.telefone;
        document.querySelector('#formEmpresa input[name="endereco"]').value = empresa.endereco;
        showForm('cadastrarEmpresa');
        deleteEmpresa(id); // Remove a empresa para permitir alteração
    }
}

function deleteEmpresa(id) {
    empresas = empresas.filter(empresa => empresa.id !== id);
    updateEmpresaList();
}