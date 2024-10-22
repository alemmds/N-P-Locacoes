// Arrays iniciais, carregados do LocalStorage se disponíveis
let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Excluir "MAQUINA 1" se existir
maquinas = maquinas.filter(maquina => maquina.nome !== "MAQUINA 1");
saveToLocalStorage(); // Salvar mudanças no LocalStorage

// Função para exibir a aba correspondente do menu
function showSection(section) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Exibe a seção correta
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

// Função para retornar ao menu principal
function goBack(section) {
    document.getElementById(section).style.display = 'none';
}

// Função para exibir a lista com base no tipo
function showList(type) {
    let data, listId;

    if (type === 'maquinas') {
        data = maquinas;
        listId = '#maquinasList';
    }

    const listElement = document.querySelector(listId);
    listElement.innerHTML = ''; // Limpar lista

    // Iterar sobre as máquinas e criar os elementos de cada máquina
    data.forEach((item, index) => {
        const machineHTML = `
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
                    <p><strong>Última Manutenção:</strong> ${item.ultimaManutencao}</p>
                    <p><strong>Data de Entrada:</strong> ${item.dataEntrada}</p>
                    <div class="buttons">
                        <button onclick="editMaquina(${index})">Alterar</button>
                        <button onclick="deleteMaquina(${index})" class="delete">Excluir</button>
                    </div>
                </div>
            </div>
        `;

        listElement.innerHTML += machineHTML;
    });

    ativarAccordion(); // Reativar funcionalidade do accordion
}

// Função de accordion corrigida
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

// Funções de adicionar novos registros para cada categoria
document.getElementById('formMaquina').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;
    const ultimaManutencao = document.getElementById('ultimaManutencao').value;
    const dataEntrada = document.getElementById('dataEntrada').value;

    // Verificar se todos os campos estão preenchidos
    if (!nome || !serie || !anosUso || !horasTrabalhadas || !ultimaManutencao || !dataEntrada) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Adicionar a nova máquina ao array de máquinas
    maquinas.push({ nome, serie, anosUso, horasTrabalhadas, ultimaManutencao, dataEntrada });
    
    // Salvar as máquinas no LocalStorage
    saveToLocalStorage();

    // Limpar o formulário
    document.getElementById('formMaquina').reset();

    // Atualizar a lista de máquinas
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
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formConta').reset();
    showList('contas');
});

document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();
    const empresa = document.getElementById('empresaRecebimento').value;
    const valor = document.getElementById('valorRecebimento').value;
    const dataPagamento = document.getElementById('dataPagamento').value;
    const dataTermino = document.getElementById('dataTermino').value;
    const status = document.getElementById('statusRecebimento').value;

    if (!empresa || !valor || !dataPagamento || !dataTermino || !status) {
        alert("Preencha todos os campos.");
        return;
    }

    recebimentos.push({ empresa, valor, dataPagamento, dataTermino, status });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formRecebimento').reset();
    showList('recebimentos');
});

document.getElementById('formContrato').addEventListener('submit', function(event) {
    event.preventDefault();
    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatarioContrato').value;
    const cnpj = document.getElementById('cnpjContrato').value;
    const representante = document.getElementById('representanteContrato').value;
    const periodo = document.getElementById('periodoContrato').value;
    const valor = document.getElementById('valorContrato').value;
    const dataTermino = document.getElementById('dataTerminoContrato').value;
    const equipamento = document.getElementById('equipamentoContrato').value;

    if (!empresa || !locatario || !cnpj || !representante || !periodo || !valor || !dataTermino || !equipamento) {
        alert("Preencha todos os campos.");
        return;
    }

    contratos.push({ empresa, locatario, cnpj, representante, periodo, valor, dataTermino, equipamento });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formContrato').reset();
    showList('contratos');
});

document.getElementById('formEmpresa').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;

    if (!nome || !areaCnpj || !areaAtuacao || !representante || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone, email });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

// Funções para editar registros
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;
    document.getElementById('ultimaManutencao').value = maquina.ultimaManutencao;
    document.getElementById('dataEntrada').value = maquina.dataEntrada;

    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
}

function deleteMaquina(index) {
    if (confirm("Tem certeza que deseja excluir esta máquina?")) {
        maquinas.splice(index, 1);
        saveToLocalStorage();
        showList('maquinas');
    }
}

function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;

    contas.splice(index, 1);
    saveToLocalStorage();
    showList('contas');
}

function deleteConta(index) {
    if (confirm("Tem certeza que deseja excluir esta conta?")) {
        contas.splice(index, 1);
        saveToLocalStorage();
        showList('contas');
    }
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('dataTermino').value = recebimento.dataTermino;
    document.getElementById('statusRecebimento').value = recebimento.status;

    recebimentos.splice(index, 1);
    saveToLocalStorage();
    showList('recebimentos');
}

function deleteRecebimento(index) {
    if (confirm("Tem certeza que deseja excluir este recebimento?")) {
        recebimentos.splice(index, 1);
        saveToLocalStorage();
        showList('recebimentos');
    }
}

function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatarioContrato').value = contrato.locatario;
    document.getElementById('cnpjContrato').value = contrato.cnpj;
    document.getElementById('representanteContrato').value = contrato.representante;
    document.getElementById('periodoContrato').value = contrato.periodo;
    document.getElementById('valorContrato').value = contrato.valor;
    document.getElementById('dataTerminoContrato').value = contrato.dataTermino;
    document.getElementById('equipamentoContrato').value = contrato.equipamento;

    contratos.splice(index, 1);
    saveToLocalStorage();
    showList('contratos');
}

function deleteContrato(index) {
    if (confirm("Tem certeza que deseja excluir este contrato?")) {
        contratos.splice(index, 1);
        saveToLocalStorage();
        showList('contratos');
    }
}

function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpj').value = empresa.areaCnpj;
    document.getElementById('areaAtuacao').value = empresa.areaAtuacao;
    document.getElementById('representanteEmpresa').value = empresa.representante;
    document.getElementById('telefoneEmpresa').value = empresa.telefone;
    document.getElementById('emailEmpresa').value = empresa.email;

    empresas.splice(index, 1);
    saveToLocalStorage();
    showList('empresas');
}

function deleteEmpresa(index) {
    if (confirm("Tem certeza que deseja excluir esta empresa?")) {
        empresas.splice(index, 1);
        saveToLocalStorage();
        showList('empresas');
    }
}

// Função para ativar o accordion ao carregar a lista
function ativarAccordion() {
    const headers = document.querySelectorAll('.header');
    headers.forEach(header => {
        header.addEventListener('click', toggleAccordion);
    });
}

// Inicializar a lista ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showList('maquinas');
});

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
