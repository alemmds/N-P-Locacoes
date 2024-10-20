const maquinas = [];
const recebimentos = [];
const contratos = [];
const contas = [];
const empresas = [];

function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

function showList(type) {
    let list = [];
    let listElementId = '';

    switch (type) {
        case 'maquinas':
            list = maquinas;
            listElementId = 'maquinasList';
            break;
        case 'recebimentos':
            list = recebimentos;
            listElementId = 'recebimentosList';
            break;
        case 'contratos':
            list = contratos;
            listElementId = 'contratosList';
            break;
        case 'contas':
            list = contas;
            listElementId = 'contasList';
            break;
        case 'empresas':
            list = empresas;
            listElementId = 'empresasList';
            break;
    }

    const listElement = document.getElementById(listElementId);
    listElement.innerHTML = '';

    if (list.length === 0) {
        listElement.innerHTML = 'Nenhum item cadastrado.';
        return;
    }

    list.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = JSON.stringify(item);
        itemElement.appendChild(createButton('Alterar', () => editItem(type, index)));
        itemElement.appendChild(createButton('Excluir', () => deleteItem(type, index)));
        listElement.appendChild(itemElement);
    });
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.onclick = onClick;
    return button;
}

function editItem(type, index) {
    // Logic to edit item
}

function deleteItem(type, index) {
    switch (type) {
        case 'maquinas':
            maquinas.splice(index, 1);
            break;
        case 'recebimentos':
            recebimentos.splice(index, 1);
            break;
        case 'contratos':
            contratos.splice(index, 1);
            break;
        case 'contas':
            contas.splice(index, 1);
            break;
        case 'empresas':
            empresas.splice(index, 1);
            break;
    }
    showList(type);
}

document.getElementById('formMaquina').onsubmit = (e) => {
    e.preventDefault();
    const novaMaquina = {
        nome: e.target.nomeMaquina.value,
        serie: e.target.serieMaquina.value,
        anosUso: e.target.anosUso.value,
        horasTrabalhadas: e.target.horasTrabalhadas.value
    };
    maquinas.push(novaMaquina);
    e.target.reset();
    showList('maquinas');
};

document.getElementById('formRecebimento').onsubmit = (e) => {
    e.preventDefault();
    const novoRecebimento = {
        empresa: e.target.empresaRecebimento.value,
        valor: e.target.valorRecebimento.value,
        pagamento: e.target.dataPagamento.value,
        termino: e.target.dataTermino.value,
        status: e.target.statusRecebimento.value
    };
    recebimentos.push(novoRecebimento);
    e.target.reset();
    showList('recebimentos');
};

document.getElementById('formContrato').onsubmit = (e) => {
    e.preventDefault();
    const novoContrato = {
        empresa: e.target.empresaContrato.value,
        locatario: e.target.locatarioContrato.value,
        cnpj: e.target.cnpjContrato.value,
        representante: e.target.representanteContrato.value,
        periodo: e.target.periodoContrato.value,
        equipamento: e.target.equipamentoContrato.value,
        dataTermino: e.target.dataTerminoContrato.value,
        operador: e.target.operadorContrato.value
    };
    contratos.push(novoContrato);
    e.target.reset();
    showList('contratos');
};

document.getElementById('formConta').onsubmit = (e) => {
    e.preventDefault();
    const novaConta = {
        tipo: e.target.tipoConta.value,
        vencimento: e.target.dataVencimentoConta.value,
        valor: e.target.valorConta.value
    };
    contas.push(novaConta);
    e.target.reset();
    showList('contas');
};

document.getElementById('formEmpresa').onsubmit = (e) => {
    e.preventDefault();
    const novaEmpresa = {
        nome: e.target.nomeEmpresa.value,
        areaCnpj: e.target.areaCnpj.value,
        areaAtuacao: e.target.areaAtuacao.value,
        representante: e.target.representanteEmpresa.value,
        telefone: e.target.telefoneEmpresa.value,
        email: e.target.emailEmpresa.value
    };
    empresas.push(novaEmpresa);
    e.target.reset();
    showList('empresas');
};

function goBack(section) {
    showSection(section);
}