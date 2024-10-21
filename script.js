// Arrays iniciais, carregados do LocalStorage se disponíveis
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

        // Exibir contratos na ordem correta
        contratos.forEach((contrato, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contrato.empresa}</td>
                <td>${contrato.locatario}</td>
                <td>${contrato.cnpj}</td>
                <td>${contrato.representante}</td>
                <td>${contrato.periodo}</td> <!-- Período do contrato -->
                <td>${contrato.valor}</td> <!-- Valor do contrato -->
                <td>${contrato.dataTermino}</td> <!-- Data de término do contrato -->
                <td>${contrato.equipamento}</td> <!-- Equipamento relacionado ao contrato -->
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
                <td>${empresa.email}</td> <!-- E-mail da empresa -->
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
document.getElementById('formContrato').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Captura os valores inseridos pelo usuário
    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatarioContrato').value;
    const cnpj = document.getElementById('cnpjContrato').value;
    const representante = document.getElementById('representanteContrato').value;
    const periodo = document.getElementById('periodoContrato').value;
    const valor = document.getElementById('valorContrato').value;
    const dataTermino = document.getElementById('dataTerminoContrato').value;
    const equipamento = document.getElementById('equipamentoContrato').value;

    // Adiciona o novo contrato ao array de contratos
    contratos.push({ empresa, locatario, cnpj, representante, periodo, valor, dataTermino, equipamento });

    // Salva os contratos no localStorage
    saveToLocalStorage();

    // Limpa o formulário
    document.getElementById('formContrato').reset();

    // Chama a função para exibir a lista atualizada
    showList('contratos');
});

// Empresas
document.getElementById('formEmpresa').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone, email });

    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

// Funções para editar registros

// Funções para deletar registros
function deleteMaquina(index) {
    maquinas.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('maquinas');
}

function deleteConta(index) {
    contas.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('contas');
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('recebimentos');
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('contratos');
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
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