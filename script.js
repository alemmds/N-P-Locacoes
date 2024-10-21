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
                <td>${contrato.valor}</td> <!-- Nova coluna de valor -->
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
                <td>${empresa.email}</td> <!-- Nova coluna de e-mail -->
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
    const representante = document.getElementById('representanteContrato').value; // Novo campo de representante
    const periodo = document.getElementById('periodoContrato').value; // Novo campo de período
    const equipamento = document.getElementById('equipamentoContrato').value;
    const valor = document.getElementById('valorContrato').value; // Novo campo de valor
    const dataTermino = document.getElementById('dataTerminoContrato').value; // Novo campo de data de término

    // Adiciona o novo contrato ao array de contratos
    contratos.push({ empresa, locatario, cnpj, representante, periodo, equipamento, valor, dataTermino }); // Incluindo os novos campos
    saveToLocalStorage(); // Salva no LocalStorage
    document.getElementById('formContrato').reset(); // Reseta o formulário
    showList('contratos'); // Exibe a lista de contratos
});

// Empresas
document.getElementById('formEmpresa').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value; // Campo para área do CNPJ
    const areaAtuacao = document.getElementById('areaAtuacao').value; // Campo para área de atuação
    const representante = document.getElementById('representante').value; // Novo campo de representante
    const telefone = document.getElementById('telefone').value; // Novo campo de telefone
    const email = document.getElementById('email').value; // Novo campo de e-mail

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone, email }); // Incluindo os novos campos
    saveToLocalStorage(); // Salva no LocalStorage
    document.getElementById('formEmpresa').reset(); // Reseta o formulário
    showList('empresas'); // Exibe a lista de empresas
});

// Funções para editar e excluir registros
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;

    // Remove a máquina da lista e atualiza o LocalStorage
    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
}

function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;

    // Remove a conta da lista e atualiza o LocalStorage
    contas.splice(index, 1);
    saveToLocalStorage();
    showList('contas');
}

function deleteConta(index) {
    contas.splice(index, 1);
    saveToLocalStorage();
    showList('contas');
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('dataTermino').value = recebimento.dataTermino;
    document.getElementById('statusRecebimento').value = recebimento.status;

    // Remove o recebimento da lista e atualiza o LocalStorage
    recebimentos.splice(index, 1);
    saveToLocalStorage();
    showList('recebimentos');
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    saveToLocalStorage();
    showList('recebimentos');
}

function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatarioContrato').value = contrato.locatario;
    document.getElementById('cnpjContrato').value = contrato.cnpj;
    document.getElementById('representanteContrato').value = contrato.representante; // Novo campo de representante
    document.getElementById('periodoContrato').value = contrato.periodo; // Novo campo de período
    document.getElementById('equipamentoContrato').value = contrato.equipamento;
    document.getElementById('valorContrato').value = contrato.valor; // Novo campo de valor
    document.getElementById('dataTerminoContrato').value = contrato.dataTermino; // Novo campo de data de término

    // Remove o contrato da lista e atualiza o LocalStorage
    contratos.splice(index, 1);
    saveToLocalStorage();
    showList('contratos');
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    saveToLocalStorage();
    showList('contratos');
}

function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpj').value = empresa.areaCnpj; // Campo para área do CNPJ
    document.getElementById('areaAtuacao').value = empresa.areaAtuacao; // Campo para área de atuação
    document.getElementById('representante').value = empresa.representante; // Novo campo de representante
    document.getElementById('telefone').value = empresa.telefone; // Novo campo de telefone
    document.getElementById('email').value = empresa.email; // Novo campo de e-mail

    // Remove a empresa da lista e atualiza o LocalStorage
    empresas.splice(index, 1);
    saveToLocalStorage();
    showList('empresas');
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    saveToLocalStorage();
    showList('empresas');
}

// Inicialização
showSection('home'); // Exibe a tela inicial ao carregar

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