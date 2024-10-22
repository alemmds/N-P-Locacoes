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

// Função para exibir a lista de itens
function showList(type) {
    let data, listId;

    if (type === 'maquinas') {
        data = maquinas;
        listId = '#maquinasList';
    } else if (type === 'contas') {
        data = contas;
        listId = '#contasList';
    } else if (type === 'recebimentos') {
        data = recebimentos;
        listId = '#recebimentosList';
    } else if (type === 'contratos') {
        data = contratos;
        listId = '#contratosList';
    } else if (type === 'empresas') {
        data = empresas;
        listId = '#empresasList';
    }

    const listElement = document.querySelector(listId);
    listElement.innerHTML = '';

    // Iterar sobre os dados e criar os elementos
    data.forEach((item, index) => {
        let itemHTML = '';
        if (type === 'maquinas') {
            itemHTML = `
                <div class="machine-item">
                    <div class="header" onclick="toggleAccordion(this)">
                        <span>${item.nome}</span>
                        <div class="arrow">▼</div>
                    </div>
                    <div class="details" style="display:none;">
                        <p><strong>Nome:</strong> ${item.nome}</p>
                        <p><strong>Série:</strong> ${item.serie}</p>
                        <p><strong>Anos de Uso:</strong> ${item.anosUso}</p>
                        <p><strong>Horas Trabalhadas:</strong> ${item.horasTrabalhadas}</p>
                        <div class="buttons">
                            <button onclick="editMaquina(${index})">Alterar</button>
                            <button onclick="deleteMaquina(${index})" class="delete">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'contas') {
            itemHTML = `
                <div class="item">
                    <p><strong>Tipo:</strong> ${item.tipo}</p>
                    <p><strong>Data de Vencimento:</strong> ${item.dataVencimento}</p>
                    <p><strong>Valor:</strong> ${item.valor}</p>
                    <div class="buttons">
                        <button onclick="editConta(${index})">Alterar</button>
                        <button onclick="deleteConta(${index})" class="delete">Excluir</button>
                    </div>
                </div>
            `;
        } else if (type === 'recebimentos') {
            itemHTML = `
                <div class="item">
                    <p><strong>Empresa:</strong> ${item.empresa}</p>
                    <p><strong>Valor:</strong> ${item.valor}</p>
                    <p><strong>Data de Pagamento:</strong> ${item.dataPagamento}</p>
                    <p><strong>Status:</strong> ${item.status}</p>
                    <div class="buttons">
                        <button onclick="editRecebimento(${index})">Alterar</button>
                        <button onclick="deleteRecebimento(${index})" class="delete">Excluir</button>
                    </div>
                </div>
            `;
        } else if (type === 'contratos') {
            itemHTML = `
                <div class="item">
                    <p><strong>Empresa:</strong> ${item.empresa}</p>
                    <p><strong>Locatário:</strong> ${item.locatario}</p>
                    <p><strong>CNPJ:</strong> ${item.cnpj}</p>
                    <p><strong>Representante:</strong> ${item.representante}</p>
                    <p><strong>Período:</strong> ${item.periodo}</p>
                    <p><strong>Valor:</strong> ${item.valor}</p>
                    <div class="buttons">
                        <button onclick="editContrato(${index})">Alterar</button>
                        <button onclick="deleteContrato(${index})" class="delete">Excluir</button>
                    </div>
                </div>
            `;
        } else if (type === 'empresas') {
            itemHTML = `
                <div class="item">
                    <p><strong>Nome:</strong> ${item.nome}</p>
                    <p><strong>Área CNPJ:</strong> ${item.areaCnpj}</p>
                    <p><strong>Área de Atuação:</strong> ${item.areaAtuacao}</p>
                    <div class="buttons">
                        <button onclick="editEmpresa(${index})">Alterar</button>
                        <button onclick="deleteEmpresa(${index})" class="delete">Excluir</button>
                    </div>
                </div>
            `;
        }

        listElement.innerHTML += itemHTML;
    });
}

// Função de accordion para expandir detalhes
function toggleAccordion(header) {
    const details = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');

    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrow.textContent = '▼';
    } else {
        details.style.display = 'block';
        arrow.textContent = '▲';
    }
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
    const valor = document.getElementById('valor').value;

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

// Funções para editar e excluir registros (exemplo para máquinas)

function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;

    maquinas.splice(index, 1);
    saveToLocalStorage();
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
}
// As funções de edição e exclusão para contas, recebimentos, contratos e empresas seguem o mesmo padrão.
// É só replicar o comportamento de editMaquina() e deleteMaquina() para as outras categorias.
// Funções para editar e excluir registros para Contas

function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;

    // Remove o item da lista temporariamente para que seja atualizado após a edição
    contas.splice(index, 1);
    saveToLocalStorage();
}

function deleteConta(index) {
    contas.splice(index, 1);
    saveToLocalStorage();
    showList('contas');
}

// Funções para editar e excluir registros para Recebimentos

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('status').value = recebimento.status;

    // Remove o item da lista temporariamente para que seja atualizado após a edição
    recebimentos.splice(index, 1);
    saveToLocalStorage();
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    saveToLocalStorage();
    showList('recebimentos');
}

// Funções para editar e excluir registros para Contratos

function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatario').value = contrato.locatario;
    document.getElementById('cnpj').value = contrato.cnpj;
    document.getElementById('representante').value = contrato.representante;
    document.getElementById('periodo').value = contrato.periodo;
    document.getElementById('valor').value = contrato.valor;

    // Remove o item da lista temporariamente para que seja atualizado após a edição
    contratos.splice(index, 1);
    saveToLocalStorage();
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    saveToLocalStorage();
    showList('contratos');
}

// Funções para editar e excluir registros para Empresas

function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpj').value = empresa.areaCnpj;
    document.getElementById('areaAtuacao').value = empresa.areaAtuacao;

    // Remove o item da lista temporariamente para que seja atualizado após a edição
    empresas.splice(index, 1);
    saveToLocalStorage();
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
