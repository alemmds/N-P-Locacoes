let maquinas = [];
let recebimentos = [];
let contratos = [];
let contas = [];
let empresas = [];

function showList(section) {
    const sections = ['maquinas', 'recebimentos', 'contratos', 'contas', 'empresas'];
    sections.forEach(s => {
        document.getElementById(s).style.display = (s === section) ? 'block' : 'none';
    });
    if (section === 'maquinas') loadMaquinas();
    else if (section === 'recebimentos') loadRecebimentos();
    else if (section === 'contratos') loadContratos();
    else if (section === 'contas') loadContas();
    else if (section === 'empresas') loadEmpresas();
}

function handleFormMaquina(event) {
    event.preventDefault();
    const form = event.target;
    const newMaquina = {
        nome: form.nome.value,
        serie: form.serie.value,
        anosUso: form.anosUso.value,
        horasTrabalhadas: form.horasTrabalhadas.value,
    };
    maquinas.push(newMaquina);
    form.reset();
    loadMaquinas();
}

function loadMaquinas() {
    const tableBody = document.querySelector('#tableMaquinas tbody');
    tableBody.innerHTML = '';
    maquinas.forEach((maquina, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${maquina.nome}</td>
            <td>${maquina.serie}</td>
            <td>${maquina.anosUso}</td>
            <td>${maquina.horasTrabalhadas}</td>
            <td>
                <button onclick="editMaquina(${index})">Editar</button>
                <button onclick="deleteMaquina(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editMaquina(index) {
    const maquina = maquinas[index];
    const form = document.getElementById('formMaquina');
    form.nome.value = maquina.nome;
    form.serie.value = maquina.serie;
    form.anosUso.value = maquina.anosUso;
    form.horasTrabalhadas.value = maquina.horasTrabalhadas;
    deleteMaquina(index); // Remove do array antes de adicionar novamente
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    loadMaquinas();
}

function handleFormRecebimento(event) {
    event.preventDefault();
    const form = event.target;
    const newRecebimento = {
        empresa: form.empresa.value,
        valor: form.valor.value,
        pagamento: form.pagamento.value,
        termino: form.termino.value,
        status: form.status.value,
    };
    recebimentos.push(newRecebimento);
    form.reset();
    loadRecebimentos();
}

function loadRecebimentos() {
    const tableBody = document.querySelector('#tableRecebimentos tbody');
    tableBody.innerHTML = '';
    recebimentos.forEach((recebimento, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recebimento.empresa}</td>
            <td>${recebimento.valor}</td>
            <td>${recebimento.pagamento}</td>
            <td>${recebimento.termino}</td>
            <td>${recebimento.status}</td>
            <td>
                <button onclick="editRecebimento(${index})">Editar</button>
                <button onclick="deleteRecebimento(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    const form = document.getElementById('formRecebimento');
    form.empresa.value = recebimento.empresa;
    form.valor.value = recebimento.valor;
    form.pagamento.value = recebimento.pagamento;
    form.termino.value = recebimento.termino;
    form.status.value = recebimento.status;
    deleteRecebimento(index);
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    loadRecebimentos();
}

function handleFormContrato(event) {
    event.preventDefault();
    const form = event.target;
    const newContrato = {
        empresa: form.empresa.value,
        locatario: form.locatario.value,
        cnpj: form.cnpj.value,
        representante: form.representante.value,
        periodo: form.periodo.value,
        equipamento: form.equipamento.value,
        dataTermino: form.dataTermino.value,
        operador: form.operador.value,
    };
    contratos.push(newContrato);
    form.reset();
    loadContratos();
}

function loadContratos() {
    const tableBody = document.querySelector('#tableContratos tbody');
    tableBody.innerHTML = '';
    contratos.forEach((contrato, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contrato.empresa}</td>
            <td>${contrato.locatario}</td>
            <td>${contrato.cnpj}</td>
            <td>${contrato.representante}</td>
            <td>${contrato.periodo}</td>
            <td>${contrato.equipamento}</td>
            <td>${contrato.dataTermino}</td>
            <td>${contrato.operador}</td>
            <td>
                <button onclick="editContrato(${index})">Editar</button>
                <button onclick="deleteContrato(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editContrato(index) {
    const contrato = contratos[index];
    const form = document.getElementById('formContrato');
    form.empresa.value = contrato.empresa;
    form.locatario.value = contrato.locatario;
    form.cnpj.value = contrato.cnpj;
    form.representante.value = contrato.representante;
    form.periodo.value = contrato.periodo;
    form.equipamento.value = contrato.equipamento;
    form.dataTermino.value = contrato.dataTermino;
    form.operador.value = contrato.operador;
    deleteContrato(index);
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    loadContratos();
}

function handleFormConta(event) {
    event.preventDefault();
    const form = event.target;
    const newConta = {
        tipo: form.tipo.value,
        dataVencimento: form.dataVencimento.value,
        valor: form.valor.value,
    };
    contas.push(newConta);
    form.reset();
    loadContas();
}

function loadContas() {
    const tableBody = document.querySelector('#tableContas tbody');
    tableBody.innerHTML = '';
    contas.forEach((conta, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${conta.tipo}</td>
            <td>${conta.dataVencimento}</td>
            <td>${conta.valor}</td>
            <td>
                <button onclick="editConta(${index})">Editar</button>
                <button onclick="deleteConta(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editConta(index) {
    const conta = contas[index];
    const form = document.getElementById('formConta');
    form.tipo.value = conta.tipo;
    form.dataVencimento.value = conta.dataVencimento;
    form.valor.value = conta.valor;
    deleteConta(index);
}

function deleteConta(index) {
    contas.splice(index, 1);
    loadContas();
}

function handleFormEmpresa(event) {
    event.preventDefault();
    const form = event.target;
    const newEmpresa = {
        nome: form.nome.value,
        cnpj: form.cnpj.value,
        areaAtuacao: form.areaAtuacao.value,
        representante: form.representante.value,
        telefone: form.telefone.value,
        email: form.email.value,
    };
    empresas.push(newEmpresa);
    form.reset();
    loadEmpresas();
}

function loadEmpresas() {
    const tableBody = document.querySelector('#tableEmpresas tbody');
    tableBody.innerHTML = '';
    empresas.forEach((empresa, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empresa.nome}</td>
            <td>${empresa.cnpj}</td>
            <td>${empresa.areaAtuacao}</td>
            <td>${empresa.representante}</td>
            <td>${empresa.telefone}</td>
            <td>${empresa.email}</td>
            <td>
                <button onclick="editEmpresa(${index})">Editar</button>
                <button onclick="deleteEmpresa(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editEmpresa(index) {
    const empresa = empresas[index];
    const form = document.getElementById('formEmpresa');
    form.nome.value = empresa.nome;
    form.cnpj.value = empresa.cnpj;
    form.areaAtuacao.value = empresa.areaAtuacao;
    form.representante.value = empresa.representante;
    form.telefone.value = empresa.telefone;
    form.email.value = empresa.email;
    deleteEmpresa(index);
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    loadEmpresas();
}

// Inicializa com a seção de máquinas visível
showList('maquinas');