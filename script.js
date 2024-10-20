// Armazenar dados em memória (simulando um banco de dados)
const maquinas = [];
const recebimentos = [];
const contratos = [];
const contas = [];
const empresas = [];

// Funções para manipular as listas

// Máquinas
document.getElementById('maquina-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('maquina-nome').value;
    const serie = document.getElementById('maquina-serie').value;
    const anos = document.getElementById('maquina-anos').value;
    const horas = document.getElementById('maquina-horas').value;

    const maquina = {
        id: maquinas.length + 1,
        nome,
        serie,
        anos,
        horas
    };

    maquinas.push(maquina);
    atualizarListaMaquinas();
    this.reset();
});

function atualizarListaMaquinas() {
    const lista = document.getElementById('maquinas-lista').getElementsByTagName('tbody')[0];
    lista.innerHTML = '';

    maquinas.forEach(maquina => {
        const row = lista.insertRow();
        row.insertCell(0).textContent = maquina.id;
        row.insertCell(1).textContent = maquina.nome;

        const acoesCell = row.insertCell(2);
        const alterarBtn = document.createElement('button');
        alterarBtn.textContent = 'ALTERAR';
        alterarBtn.onclick = () => alterarMaquina(maquina.id);
        acoesCell.appendChild(alterarBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'EXCLUIR';
        excluirBtn.onclick = () => excluirMaquina(maquina.id);
        acoesCell.appendChild(excluirBtn);
    });
}

function alterarMaquina(id) {
    const maquina = maquinas.find(m => m.id === id);
    if (maquina) {
        document.getElementById('maquina-nome').value = maquina.nome;
        document.getElementById('maquina-serie').value = maquina.serie;
        document.getElementById('maquina-anos').value = maquina.anos;
        document.getElementById('maquina-horas').value = maquina.horas;
        excluirMaquina(id);
    }
}

function excluirMaquina(id) {
    const index = maquinas.findIndex(m => m.id === id);
    if (index !== -1) {
        maquinas.splice(index, 1);
        atualizarListaMaquinas();
    }
}

// Recebimentos
document.getElementById('recebimento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const empresa = document.getElementById('recebimento-empresa').value;
    const valor = document.getElementById('recebimento-valor').value;
    const data = document.getElementById('recebimento-data').value;
    const termino = document.getElementById('recebimento-termino').value;
    const status = document.getElementById('recebimento-status').value;

    const recebimento = {
        id: recebimentos.length + 1,
        empresa,
        valor,
        data,
        termino,
        status
    };

    recebimentos.push(recebimento);
    atualizarListaRecebimentos();
    this.reset();
});

function atualizarListaRecebimentos() {
    const lista = document.getElementById('recebimentos-lista').getElementsByTagName('tbody')[0];
    lista.innerHTML = '';

    recebimentos.forEach(recebimento => {
        const row = lista.insertRow();
        row.insertCell(0).textContent = recebimento.id;
        row.insertCell(1).textContent = recebimento.empresa;

        const acoesCell = row.insertCell(2);
        const alterarBtn = document.createElement('button');
        alterarBtn.textContent = 'ALTERAR';
        alterarBtn.onclick = () => alterarRecebimento(recebimento.id);
        acoesCell.appendChild(alterarBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'EXCLUIR';
        excluirBtn.onclick = () => excluirRecebimento(recebimento.id);
        acoesCell.appendChild(excluirBtn);
    });
}

function alterarRecebimento(id) {
    const recebimento = recebimentos.find(r => r.id === id);
    if (recebimento) {
        document.getElementById('recebimento-empresa').value = recebimento.empresa;
        document.getElementById('recebimento-valor').value = recebimento.valor;
        document.getElementById('recebimento-data').value = recebimento.data;
        document.getElementById('recebimento-termino').value = recebimento.termino;
        document.getElementById('recebimento-status').value = recebimento.status;
        excluirRecebimento(id);
    }
}

function excluirRecebimento(id) {
    const index = recebimentos.findIndex(r => r.id === id);
    if (index !== -1) {
        recebimentos.splice(index, 1);
        atualizarListaRecebimentos();
    }
}

// Contratos
document.getElementById('contrato-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const empresa = document.getElementById('contrato-empresa').value;
    const locatario = document.getElementById('contrato-locatario').value;
    const cnpj = document.getElementById('contrato-cnpj').value;
    const representante = document.getElementById('contrato-representante').value;
    const periodo = document.getElementById('contrato-periodo').value;
    const equipamento = document.getElementById('contrato-equipamento').value;
    const data = document.getElementById('contrato-data').value;
    const operador = document.getElementById('contrato-operador').value;

    const contrato = {
        id: contratos.length + 1,
        empresa,
        locatario,
        cnpj,
        representante,
        periodo,
        equipamento,
        data,
        operador
    };

    contratos.push(contrato);
    atualizarListaContratos();
    this.reset();
});

function atualizarListaContratos() {
    const lista = document.getElementById('contratos-lista').getElementsByTagName('tbody')[0];
    lista.innerHTML = '';

    contratos.forEach(contrato => {
        const row = lista.insertRow();
        row.insertCell(0).textContent = contrato.id;
        row.insertCell(1).textContent = contrato.empresa;

        const acoesCell = row.insertCell(2);
        const alterarBtn = document.createElement('button');
        alterarBtn.textContent = 'ALTERAR';
        alterarBtn.onclick = () => alterarContrato(contrato.id);
        acoesCell.appendChild(alterarBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'EXCLUIR';
        excluirBtn.onclick = () => excluirContrato(contrato.id);
        acoesCell.appendChild(excluirBtn);
    });
}

function alterarContrato(id) {
    const contrato = contratos.find(c => c.id === id);
    if (contrato) {
        document.getElementById('contrato-empresa').value = contrato.empresa;
        document.getElementById('contrato-locatario').value = contrato.locatario;
        document.getElementById('contrato-cnpj').value = contrato.cnpj;
        document.getElementById('contrato-representante').value = contrato.representante;
        document.getElementById('contrato-periodo').value = contrato.periodo;
        document.getElementById('contrato-equipamento').value = contrato.equipamento;
        document.getElementById('contrato-data').value = contrato.data;
        document.getElementById('contrato-operador').value = contrato.operador;
        excluirContrato(id);
    }
}

function excluirContrato(id) {
    const index = contratos.findIndex(c => c.id === id);
    if (index !== -1) {
        contratos.splice(index, 1);
        atualizarListaContratos();
    }
}

// Contas
document.getElementById('conta-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipo = document.getElementById('conta-tipo').value;
    const data = document.getElementById('conta-data').value;
    const valor = document.getElementById('conta-valor').value;

    const conta = {
        id: contas.length + 1,
        tipo,
        data,
        valor
    };

    contas.push(conta);
    atualizarListaContas();
    this.reset();
});

function atualizarListaContas() {
    const lista = document.getElementById('contas-lista').getElementsByTagName('tbody')[0];
    lista.innerHTML = '';

    contas.forEach(conta => {
        const row = lista.insertRow();
        row.insertCell(0).textContent = conta.id;
        row.insertCell(1).textContent = conta.tipo;

        const acoesCell = row.insertCell(2);
        const alterarBtn = document.createElement('button');
        alterarBtn.textContent = 'ALTERAR';
        alterarBtn.onclick = () => alterarConta(conta.id);
        acoesCell.appendChild(alterarBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'EXCLUIR';
        excluirBtn.onclick = () => excluirConta(conta.id);
        acoesCell.appendChild(excluirBtn);
    });
}

function alterarConta(id) {
    const conta = contas.find(c => c.id === id);
    if (conta) {
        document.getElementById('conta-tipo').value = conta.tipo;
        document.getElementById('conta-data').value = conta.data;
        document.getElementById('conta-valor').value = conta.valor;
        excluirConta(id);
    }
}

function excluirConta(id) {
    const index = contas.findIndex(c => c.id === id);
    if (index !== -1) {
        contas.splice(index, 1);
        atualizarListaContas();
    }
}

// Empresas
document.getElementById('empresa-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('empresa-nome').value;
    const cnpj = document.getElementById('empresa-cnpj').value;
    const areaAtuacao = document.getElementById('empresa-area').value;
    const representante = document.getElementById('empresa-representante').value;
    const telefone = document.getElementById('empresa-telefone').value;
    const email = document.getElementById('empresa-email').value;

    const empresa = {
        id: empresas.length + 1,
        nome,
        cnpj,
        areaAtuacao,
        representante,
        telefone,
        email
    };

    empresas.push(empresa);
    atualizarListaEmpresas();
    this.reset();
});

function atualizarListaEmpresas() {
    const lista = document.getElementById('empresas-lista').getElementsByTagName('tbody')[0];
    lista.innerHTML = '';

    empresas.forEach(empresa => {
        const row = lista.insertRow();
        row.insertCell(0).textContent = empresa.id;
        row.insertCell(1).textContent = empresa.nome;

        const acoesCell = row.insertCell(2);
        const alterarBtn = document.createElement('button');
        alterarBtn.textContent = 'ALTERAR';
        alterarBtn.onclick = () => alterarEmpresa(empresa.id);
        acoesCell.appendChild(alterarBtn);

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'EXCLUIR';
        excluirBtn.onclick = () => excluirEmpresa(empresa.id);
        acoesCell.appendChild(excluirBtn);
    });
}

function alterarEmpresa(id) {
    const empresa = empresas.find(e => e.id === id);
    if (empresa) {
        document.getElementById('empresa-nome').value = empresa.nome;
        document.getElementById('empresa-cnpj').value = empresa.cnpj;
        document.getElementById('empresa-area').value = empresa.areaAtuacao;
        document.getElementById('empresa-representante').value = empresa.representante;
        document.getElementById('empresa-telefone').value = empresa.telefone;
        document.getElementById('empresa-email').value = empresa.email;
        excluirEmpresa(id);
    }
}

function excluirEmpresa(id) {
    const index = empresas.findIndex(e => e.id === id);
    if (index !== -1) {
        empresas.splice(index, 1);
        atualizarListaEmpresas();
    }
}