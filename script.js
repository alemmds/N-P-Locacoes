// Arrays iniciais, carregados do LocalStorage se disponíveis
let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Remover "MAQUINA 1" (caso exista)
if (maquinas.length > 0 && maquinas[0].nome === "MAQUINA 1") {
    maquinas.splice(0, 1);
    saveToLocalStorage();
}

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
    listElement.innerHTML = ''; // Limpar lista

    // Iterar sobre os itens e criar os elementos de cada item
    data.forEach((item, index) => {
        const itemHTML = `
            <div class="item">
                <div class="header" onclick="toggleAccordion(this)">
                    <span>${item.nome || item.tipo || item.empresa}</span>
                    <div class="arrow">▼</div>
                </div>
                <div class="details" style="display:none;">
                    ${Object.keys(item).map(key => `<p><strong>${key}:</strong> ${item[key]}</p>`).join('')}
                    <div class="buttons">
                        <button onclick="editItem('${type}', ${index})">Alterar</button>
                        <button onclick="deleteItem('${type}', ${index})" class="delete">Excluir</button>
                    </div>
                </div>
            </div>
        `;

        listElement.innerHTML += itemHTML;
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

// Funções para editar registros em cada categoria
function editItem(type, index) {
    let item;
    if (type === 'maquinas') {
        item = maquinas[index];
        document.getElementById('nomeMaquina').value = item.nome;
        document.getElementById('serieMaquina').value = item.serie;
        document.getElementById('anosUso').value = item.anosUso;
        document.getElementById('horasTrabalhadas').value = item.horasTrabalhadas;
        document.getElementById('ultimaManutencao').value = item.ultimaManutencao;
        document.getElementById('dataEntrada').value = item.dataEntrada;
    } else if (type === 'contas') {
        item = contas[index];
        document.getElementById('tipoConta').value = item.tipo;
        document.getElementById('dataVencimentoConta').value = item.dataVencimento;
        document.getElementById('valorConta').value = item.valor;
    } else if (type === 'recebimentos') {
        item = recebimentos[index];
        document.getElementById('empresaRecebimento').value = item.empresa;
        document.getElementById('valorRecebimento').value = item.valor;
        document.getElementById('dataPagamento').value = item.dataPagamento;
        document.getElementById('dataTermino').value = item.dataTermino;
        document.getElementById('statusRecebimento').value = item.status;
    } else if (type === 'contratos') {
        item = contratos[index];
        document.getElementById('empresaContrato').value = item.empresa;
        document.getElementById('locatarioContrato').value = item.locatario;
        document.getElementById('cnpjContrato').value = item.cnpj;
        document.getElementById('representanteContrato').value = item.representante;
        document.getElementById('periodoContrato').value = item.periodo;
        document.getElementById('valorContrato').value = item.valor;
        document.getElementById('dataTerminoContrato').value = item.dataTermino;
        document.getElementById('equipamentoContrato').value = item.equipamento;
    } else if (type === 'empresas') {
        item = empresas[index];
        document.getElementById('nomeEmpresa').value = item.nome;
        document.getElementById('areaCnpj').value = item.areaCnpj;
        document.getElementById('areaAtuacao').value = item.areaAtuacao;
        document.getElementById('representanteEmpresa').value = item.representante;
        document.getElementById('telefoneEmpresa').value = item.telefone;
        document.getElementById('emailEmpresa').value = item.email;
    }

    // Remover o item editado da lista
    if (type === 'maquinas') maquinas.splice(index, 1);
    if (type === 'contas') contas.splice(index, 1);
    if (type === 'recebimentos') recebimentos.splice(index, 1);
    if (type === 'contratos') contratos.splice(index, 1);
    if (type === 'empresas') empresas.splice(index, 1);

    saveToLocalStorage();
    showList(type);
}

// Funções para excluir registros
function deleteItem(type, index) {
    if (type === 'maquinas') maquinas.splice(index, 1);
    if (type === 'contas') contas.splice(index, 1);
    if (type === 'recebimentos') recebimentos.splice(index, 1);
    if (type === 'contratos') contratos.splice(index, 1);
    if (type === 'empresas') empresas.splice(index, 1);

    saveToLocalStorage();
    showList(type);
}

// Função para reativar o comportamento do accordion quando os itens forem atualizados
function ativarAccordion() {
    document.querySelectorAll('.header').forEach(header => {
        header.addEventListener('click', () => {
            toggleAccordion(header);
        });
    });
}

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