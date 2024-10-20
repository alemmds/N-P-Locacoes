// Variáveis globais para armazenar dados
let maquinas = [];
let recebimentos = [];
let contratos = [];
let contas = [];
let empresas = [];

// Função para mostrar uma seção específica
function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// --------- Funções de Cadastro ---------

// Cadastrar Máquina
function cadastrarMaquina() {
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;

    if (nome && serie && anosUso && horasTrabalhadas) {
        maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
        alert('Máquina cadastrada com sucesso!');
        document.getElementById('formMaquinas').reset();
        mostrarLista('maquinas');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Cadastrar Recebimento
function cadastrarRecebimento() {
    const empresa = document.getElementById('empresaRecebimento').value;
    const valor = document.getElementById('valorRecebimento').value;
    const pagamento = document.getElementById('dataPagamento').value;
    const termino = document.getElementById('dataTermino').value;
    const status = document.getElementById('statusRecebimento').value;

    if (empresa && valor && pagamento && termino && status) {
        recebimentos.push({ empresa, valor, pagamento, termino, status });
        alert('Recebimento cadastrado com sucesso!');
        document.getElementById('formRecebimentos').reset();
        mostrarLista('recebimentos');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Cadastrar Contrato
function cadastrarContrato() {
    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatario').value;
    const cnpj = document.getElementById('cnpj').value;
    const representante = document.getElementById('representante').value;
    const periodoLocacao = document.getElementById('periodoLocacao').value;
    const dataTermino = document.getElementById('dataTerminoContrato').value;
    const operador = document.getElementById('operador').value;

    if (empresa && locatario && cnpj && representante && periodoLocacao && dataTermino && operador) {
        contratos.push({ empresa, locatario, cnpj, representante, periodoLocacao, dataTermino, operador });
        alert('Contrato cadastrado com sucesso!');
        document.getElementById('formContratos').reset();
        mostrarLista('contratos');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Cadastrar Conta
function cadastrarConta() {
    const tipo = document.getElementById('tipoConta').value;
    const vencimento = document.getElementById('vencimentoConta').value;
    const valor = document.getElementById('valorConta').value;

    if (tipo && vencimento && valor) {
        contas.push({ tipo, vencimento, valor });
        alert('Conta cadastrada com sucesso!');
        document.getElementById('formContas').reset();
        mostrarLista('contas');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Cadastrar Empresa
function cadastrarEmpresa() {
    const nome = document.getElementById('nomeEmpresa').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;
    const cnpj = document.getElementById('cnpjEmpresa').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;

    if (nome && areaAtuacao && cnpj && representante && telefone && email) {
        empresas.push({ nome, areaAtuacao, cnpj, representante, telefone, email });
        alert('Empresa cadastrada com sucesso!');
        document.getElementById('formEmpresas').reset();
        mostrarLista('empresas');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// --------- Funções para Mostrar Listas ---------
function mostrarLista(tipo) {
    let lista = '';
    if (tipo === 'maquinas') {
        lista = maquinas.map((maquina, index) => `
            <div>
                ${maquina.nome} - Série: ${maquina.serie}, Anos de Uso: ${maquina.anosUso}, Horas: ${maquina.horasTrabalhadas}
                <button onclick="alterarItem('maquinas', ${index})">Alterar</button>
                <button onclick="excluirItem('maquinas', ${index})">Excluir</button>
            </div>
        `).join('');
        document.getElementById('listaMaquinas').innerHTML = lista;
    } else if (tipo === 'recebimentos') {
        lista = recebimentos.map((recebimento, index) => `
            <div>
                ${recebimento.empresa} - Valor: ${recebimento.valor}, Status: ${recebimento.status}, Pagamento: ${recebimento.pagamento}, Término: ${recebimento.termino}
                <button onclick="alterarItem('recebimentos', ${index})">Alterar</button>
                <button onclick="excluirItem('recebimentos', ${index})">Excluir</button>
            </div>
        `).join('');
        document.getElementById('listaRecebimentos').innerHTML = lista;
    } else if (tipo === 'contratos') {
        lista = contratos.map((contrato, index) => `
            <div>
                ${contrato.empresa} - Locatário: ${contrato.locatario}, CNPJ: ${contrato.cnpj}, Período: ${contrato.periodoLocacao}, Operador: ${contrato.operador}
                <button onclick="alterarItem('contratos', ${index})">Alterar</button>
                <button onclick="excluirItem('contratos', ${index})">Excluir</button>
            </div>
        `).join('');
        document.getElementById('listaContratos').innerHTML = lista;
    } else if (tipo === 'contas') {
        lista = contas.map((conta, index) => `
            <div>
                Tipo: ${conta.tipo}, Vencimento: ${conta.vencimento}, Valor: ${conta.valor}
                <button onclick="alterarItem('contas', ${index})">Alterar</button>
                <button onclick="excluirItem('contas', ${index})">Excluir</button>
            </div>
        `).join('');
        document.getElementById('listaContas').innerHTML = lista;
    } else if (tipo === 'empresas') {
        lista = empresas.map((empresa, index) => `
            <div>
                ${empresa.nome} - CNPJ: ${empresa.cnpj}, Área: ${empresa.areaAtuacao}, Representante: ${empresa.representante}, Telefone: ${empresa.telefone}
                <button onclick="alterarItem('empresas', ${index})">Alterar</button>
                <button onclick="excluirItem('empresas', ${index})">Excluir</button>
            </div>
        `).join('');
        document.getElementById('listaEmpresas').innerHTML = lista;
    }
}

// --------- Funções para Alterar e Excluir ---------

function alterarItem(tipo, index) {
    let item;
    if (tipo === 'maquinas') {
        item = maquinas[index];
        document.getElementById('nomeMaquina').value = item.nome;
        document.getElementById('serieMaquina').value = item.serie;
        document.getElementById('anosUso').value = item.anosUso;
        document.getElementById('horasTrabalhadas').value = item.horasTrabalhadas;
        maquinas.splice(index, 1);  // Remove o item antigo
    } else if (tipo === 'recebimentos') {
        item = recebimentos[index];
        document.getElementById('empresaRecebimento').value = item.empresa;
        document.getElementById('valorRecebimento').value = item.valor;
        document.getElementById('dataPagamento').value = item.pagamento;
        document.getElementById('dataTermino').value = item.termino;
        document.getElementById('statusRecebimento').value = item.status;
        recebimentos.splice(index, 1);
    } else if (tipo === 'contratos') {
        item = contratos[index];
        document.getElementById('empresaContrato').value = item.empresa;
        document.getElementById('locatario').value = item.locatario;
        document.getElementById('cnpj').value = item.cnpj;
        document.getElementById('representante').value = item.representante;
        document.getElementById('periodoLocacao').value = item.periodoLocacao;
        document.getElementById('dataTerminoContrato').value = item.dataTermino;
        document.getElementById('operador').value = item.operador;
        contratos.splice(index, 1);
    } else if (tipo === 'contas') {
        item = contas[index];
        document.getElementById('tipoConta').value = item.tipo;
        document.getElementById('vencimentoConta').value = item.vencimento;
        document.getElementById('valorConta').value = item.valor;
        contas.splice(index, 1);
    } else if (tipo === 'empresas') {
        item = empresas[index];
        document.getElementById('nomeEmpresa').value = item.nome;
        document.getElementById('areaAtuacao').value = item.areaAtuacao;
        document.getElementById('cnpjEmpresa').value = item.cnpj;
        document.getElementById('representanteEmpresa').value = item.representante;
        document.getElementById('telefoneEmpresa').value = item.telefone;
        document.getElementById('emailEmpresa').value = item.email;
        empresas.splice(index, 1);
    }
}

function excluirItem(tipo, index) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        if (tipo === 'maquinas') {
            maquinas.splice(index, 1);
            mostrarLista('maquinas');
        } else if (tipo === 'recebimentos') {
            recebimentos.splice(index, 1);
            mostrarLista('recebimentos');
        } else if (tipo === 'contratos') {
            contratos.splice(index, 1);
            mostrarLista('contratos');
        } else if (tipo === 'contas') {
            contas.splice(index, 1);
            mostrarLista('contas');
        } else if (tipo === 'empresas') {
            empresas.splice(index, 1);
            mostrarLista('empresas');
        }
    }
}

// Inicializa a seção de Máquinas ao carregar o app
window.onload = function() {
    showSection('maquinasSection');
};
