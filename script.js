// Arrays iniciais, carregados do LocalStorage se disponíveis
let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Função para salvar dados no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('maquinas', JSON.stringify(maquinas));
    localStorage.setItem('contas', JSON.stringify(contas));
    localStorage.setItem('recebimentos', JSON.stringify(recebimentos));
    localStorage.setItem('contratos', JSON.stringify(contratos));
    localStorage.setItem('empresas', JSON.stringify(empresas));
}

// Função para exibir a aba correspondente do menu
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

// Função para exibir a lista de itens em forma de tabela
function showList(type) {
    let data, tableId, tableHeaders;

    if (type === 'maquinas') {
        data = maquinas;
        tableId = '#maquinasTable';
        tableHeaders = `
            <tr>
                <th>Nome</th>
                <th>Série</th>
                <th>Anos de Uso</th>
                <th>Horas Trabalhadas</th>
                <th>Ações</th>
            </tr>
        `;
    } else if (type === 'contas') {
        data = contas;
        tableId = '#contasTable';
        tableHeaders = `
            <tr>
                <th>Tipo</th>
                <th>Data de Vencimento</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
        `;
    } else if (type === 'recebimentos') {
        data = recebimentos;
        tableId = '#recebimentosTable';
        tableHeaders = `
            <tr>
                <th>Empresa</th>
                <th>Valor</th>
                <th>Data de Pagamento</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        `;
    } else if (type === 'contratos') {
        data = contratos;
        tableId = '#contratosTable';
        tableHeaders = `
            <tr>
                <th>Empresa</th>
                <th>Locatário</th>
                <th>CNPJ</th>
                <th>Representante</th>
                <th>Período</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
        `;
    } else if (type === 'empresas') {
        data = empresas;
        tableId = '#empresasTable';
        tableHeaders = `
            <tr>
                <th>Nome</th>
                <th>Área CNPJ</th>
                <th>Área de Atuação</th>
                <th>Ações</th>
            </tr>
        `;
    }

    const tableElement = document.querySelector(tableId);
    tableElement.innerHTML = tableHeaders;

    // Iterar sobre os dados e criar as linhas da tabela
    data.forEach((item, index) => {
        let rowHTML = '';
        if (type === 'maquinas') {
            rowHTML = `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.serie}</td>
                    <td>${item.anosUso}</td>
                    <td>${item.horasTrabalhadas}</td>
                    <td>
                        <button onclick="editMaquina(${index})">Alterar</button>
                        <button onclick="deleteMaquina(${index})" class="delete">Excluir</button>
                    </td>
                </tr>
            `;
        } else if (type === 'contas') {
            rowHTML = `
                <tr>
                    <td>${item.tipo}</td>
                    <td>${item.dataVencimento}</td>
                    <td>${item.valor}</td>
                    <td>
                        <button onclick="editConta(${index})">Alterar</button>
                        <button onclick="deleteConta(${index})" class="delete">Excluir</button>
                    </td>
                </tr>
            `;
        } else if (type === 'recebimentos') {
            rowHTML = `
                <tr>
                    <td>${item.empresa}</td>
                    <td>${item.valor}</td>
                    <td>${item.dataPagamento}</td>
                    <td>${item.status}</td>
                    <td>
                        <button onclick="editRecebimento(${index})">Alterar</button>
                        <button onclick="deleteRecebimento(${index})" class="delete">Excluir</button>
                    </td>
                </tr>
            `;
        } else if (type === 'contratos') {
            rowHTML = `
                <tr>
                    <td>${item.empresa}</td>
                    <td>${item.locatario}</td>
                    <td>${item.cnpj}</td>
                    <td>${item.representante}</td>
                    <td>${item.periodo}</td>
                    <td>${item.valor}</td>
                    <td>
                        <button onclick="editContrato(${index})">Alterar</button>
                        <button onclick="deleteContrato(${index})" class="delete">Excluir</button>
                    </td>
                </tr>
            `;
        } else if (type === 'empresas') {
            rowHTML = `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.areaCnpj}</td>
                    <td>${item.areaAtuacao}</td>
                    <td>
                        <button onclick="editEmpresa(${index})">Alterar</button>
                        <button onclick="deleteEmpresa(${index})" class="delete">Excluir</button>
                    </td>
                </tr>
            `;
        }

        tableElement.innerHTML += rowHTML;
    });
}

// Funções para adicionar novos registros

document.getElementById('formMaquina').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;

    if (!nome || !serie || !anosUso || !horasTrabalhadas) {
        alert('Preencha todos os campos.');
        return;
    }

    maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
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
    const status = document.getElementById('status').value;

    if (!empresa || !valor || !dataPagamento || !status) {
        alert("Preencha todos os campos.");
        return;
    }

    recebimentos.push({ empresa, valor, dataPagamento, status });
    saveToLocalStorage();
    document.getElementById('formRecebimento').reset();
    showList('recebimentos');
});

document.getElementById('formContrato').addEventListener('submit', function(e) {
    e.preventDefault();

    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatario').value;
    const cnpj = document.getElementById('cnpj').value;
    const representante = document.getElementById('representante').value;
    const periodo = document.getElementById('periodo').value;
    const valor = document.getElementById('valorContrato').value;

    if (!empresa || !locatario || !cnpj || !representante || !periodo || !valor) {
        alert("Preencha todos os campos.");
        return;
    }

    contratos.push({ empresa, locatario, cnpj, representante, periodo, valor });
    saveToLocalStorage();
    document.getElementById('formContrato').reset();
    showList('contratos');
});

document.getElementById('formEmpresa').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;

    if (!nome || !areaCnpj || !areaAtuacao) {
        alert("Preencha todos os campos.");
        return;
    }

    empresas.push({ nome, areaCnpj, areaAtuacao });
    saveToLocalStorage();
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

// Funções para editar itens

function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;
    document.getElementById('maquinaIndex').value = index;
}

function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;
    document.getElementById('contaIndex').value = index;
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('status').value = recebimento.status;
    document.getElementById('recebimentoIndex').value = index;
}

function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatario').value = contrato.locatario;
    document.getElementById('cnpj').value = contrato.cnpj;
    document.getElementById('representante').value = contrato.representante;
    document.getElementById('periodo').value = contrato.periodo;
    document.getElementById('valorContrato').value = contrato.valor;
    document.getElementById('contratoIndex').value = index;
}

function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpj').value = empresa.areaCnpj;
    document.getElementById('areaAtuacao').value = empresa.areaAtuacao;
    document.getElementById('empresaIndex').value = index;
}

// Funções para deletar itens

function deleteMaquina(index) {
    if (confirm("Tem certeza que deseja excluir esta máquina?")) {
        maquinas.splice(index, 1);
        saveToLocalStorage();
        showList('maquinas');
    }
}

function deleteConta(index) {
    if (confirm("Tem certeza que deseja excluir esta conta?")) {
        contas.splice(index, 1);
        saveToLocalStorage();
        showList('contas');
    }
}

function deleteRecebimento(index) {
    if (confirm("Tem certeza que deseja excluir este recebimento?")) {
        recebimentos.splice(index, 1);
        saveToLocalStorage();
        showList('recebimentos');
    }
}

function deleteContrato(index) {
    if (confirm("Tem certeza que deseja excluir este contrato?")) {
        contratos.splice(index, 1);
        saveToLocalStorage();
        showList('contratos');
    }
}

function deleteEmpresa(index) {
    if (confirm("Tem certeza que deseja excluir esta empresa?")) {
        empresas.splice(index, 1);
        saveToLocalStorage();
        showList('empresas');
    }
}

// Inicializa a exibição da primeira lista
showList('maquinas');

// Registra o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}