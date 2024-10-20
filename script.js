// Dados simulados para listas
let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Função para exibir a aba correspondente do menu, junto com os botões Confirmar, Lista e Voltar
function showSection(section) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Exibe a seção correta com os botões
    const currentSection = document.getElementById(section);
    currentSection.style.display = 'block';
    
    // Exibe os botões de "Confirmar", "Listar" e "Voltar" para cada aba de cadastro
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

// Função para alternar seções
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

// Função para retornar ao menu principal
function goBack(section) {
    document.getElementById(section).style.display = 'none';
}

// Função para exibir a lista com base no tipo
function showList(type) {
    if (type === 'maquinas') {
        const maquinasList = document.querySelector('#maquinasList tbody');
        maquinasList.innerHTML = ''; // Limpar tabela

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
            maquinasList.appendChild(row);
        });

        document.getElementById('maquinasList').style.display = 'block';
    } else if (type === 'contas') {
        const contasList = document.querySelector('#contasList tbody');
        contasList.innerHTML = ''; // Limpar tabela

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
            contasList.appendChild(row);
        });

        document.getElementById('contasList').style.display = 'block';
    } else if (type === 'recebimentos') {
        const recebimentosList = document.querySelector('#recebimentosList tbody');
        recebimentosList.innerHTML = ''; // Limpar tabela

        recebimentos.forEach((recebimento, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${recebimento.empresa}</td>
                <td>${recebimento.valor}</td>
                <td>${recebimento.dataPagamento}</td>
                <td>${recebimento.dataTermino}</td>
                <td>${recebimento.status}</td>
                <td>
                    <button onclick="editRecebimento(${index})">Editar</button>
                    <button onclick="deleteRecebimento(${index})">Excluir</button>
                </td>
            `;
            recebimentosList.appendChild(row);
        });

        document.getElementById('recebimentosList').style.display = 'block';
    } else if (type === 'contratos') {
        const contratosList = document.querySelector('#contratosList tbody');
        contratosList.innerHTML = ''; // Limpar tabela

        contratos.forEach((contrato, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contrato.empresa}</td>
                <td>${contrato.locatario}</td>
                <td>${contrato.cnpj}</td>
                <td>${contrato.equipamento}</td>
                <td>
                    <button onclick="editContrato(${index})">Editar</button>
                    <button onclick="deleteContrato(${index})">Excluir</button>
                </td>
            `;
            contratosList.appendChild(row);
        });

        document.getElementById('contratosList').style.display = 'block';
    } else if (type === 'empresas') {
        const empresasList = document.querySelector('#empresasList tbody');
        empresasList.innerHTML = ''; // Limpar tabela

        empresas.forEach((empresa, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empresa.nome}</td>
                <td>${empresa.areaCnpj}</td>
                <td>${empresa.areaAtuacao}</td>
                <td>${empresa.representante}</td>
                <td>${empresa.telefone}</td>
                <td>
                    <button onclick="editEmpresa(${index})">Editar</button>
                    <button onclick="deleteEmpresa(${index})">Excluir</button>
                </td>
            `;
            empresasList.appendChild(row);
        });

        document.getElementById('empresasList').style.display = 'block';
    }
}

// Funções de adicionar novos registros para cada categoria

// Máquinas
document.getElementById('formMaquina').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;

    maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formMaquina').reset();
    showList('maquinas');
});

// Contas
document.getElementById('formConta').addEventListener('submit', function(e) {
    e.preventDefault();

    const tipo = document.getElementById('tipoConta').value;
    const dataVencimento = document.getElementById('dataVencimentoConta').value;
    const valor = document.getElementById('valorConta').value;

    contas.push({ tipo, dataVencimento, valor });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formConta').reset();
    showList('contas');
});

// Recebimentos
document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();

    const empresa = document.getElementById('empresaRecebimento').value;
    const valor = document.getElementById('valorRecebimento').value;
    const dataPagamento = document.getElementById('dataPagamento').value;
    const dataTermino = document.getElementById('dataTermino').value;
    const status = document.getElementById('statusRecebimento').value;

    recebimentos.push({ empresa, valor, dataPagamento, dataTermino, status });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formRecebimento').reset();
    showList('recebimentos');
});

// Contratos
document.getElementById('formContrato').addEventListener('submit', function(e) {
    e.preventDefault();

    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatarioContrato').value;
    const cnpj = document.getElementById('cnpjContrato').value;
    const representante = document.getElementById('representanteContrato').value;
    const periodo = document.getElementById('periodoContrato').value;
    const equipamento = document.getElementById('equipamentoContrato').value;

    contratos.push({ empresa, locatario, cnpj, representante, periodo, equipamento });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formContrato').reset();
    showList('contratos');
});

// Empresas
document.getElementById('formEmpresa').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpjEmpresa').value;
    const areaAtuacao = document.getElementById('areaAtuacaoEmpresa').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

// Funções de editar e excluir para cada categoria

// Máquinas
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;

    deleteMaquina(index);
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
}

// Contas
function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;

    deleteConta(index);
}

function deleteConta(index) {
    contas.splice(index, 1);
    saveToLocalStorage();
    showList('contas');
}

// Recebimentos
function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('dataTermino').value = recebimento.dataTermino;
    document.getElementById('statusRecebimento').value = recebimento.status;

    deleteRecebimento(index);
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    saveToLocalStorage();
    showList('recebimentos');
}

// Contratos
function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatarioContrato').value = contrato.locatario;
    document.getElementById('cnpjContrato').value = contrato.cnpj;
    document.getElementById('representanteContrato').value = contrato.representante;
    document.getElementById('periodoContrato').value = contrato.periodo;
    document.getElementById('equipamentoContrato').value = contrato.equipamento;

    deleteContrato(index);
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    saveToLocalStorage();
    showList('contratos');
}

// Empresas
function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpjEmpresa').value = empresa.areaCnpj;
    document.getElementById('areaAtuacaoEmpresa').value = empresa.areaAtuacao;
    document.getElementById('representanteEmpresa').value = empresa.representante;
    document.getElementById('telefoneEmpresa').value = empresa.telefone;

    deleteEmpresa(index);
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    saveToLocalStorage();
    showList('empresas');
}
// --- Service Worker para Cache ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registrado com sucesso:', registration.scope);
        }).catch(error => {
            console.log('Falha ao registrar o Service Worker:', error);
        });
    });
}