// Dados simulados para listas
let maquinas = [];
let contas = [];
let recebimentos = [];
let contratos = [];
let empresas = [];

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
    document.getElementById('formContrato').reset();
    showList('contratos');
});

// Empresas
document.getElementById('formEmpresa').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone });
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

// Funções para editar e excluir registros seguem a mesma lógica de "maquinas"
// Funções para editar e excluir registros para cada categoria

// Editar e excluir Máquinas (já implementado)
// Função para editar uma máquina
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;

    // Remover a máquina original para que seja substituída pela nova versão
    maquinas.splice(index, 1);
}

// Função para excluir uma máquina
function deleteMaquina(index) {
    maquinas.splice(index, 1);
    showList('maquinas');
}

// Função para editar uma conta
function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;

    // Remover a conta original para que seja substituída pela nova versão
    contas.splice(index, 1);
}

// Função para excluir uma conta
function deleteConta(index) {
    contas.splice(index, 1);
    showList('contas');
}

// Função para editar um recebimento
function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('dataTermino').value = recebimento.dataTermino;
    document.getElementById('statusRecebimento').value = recebimento.status;

    // Remover o recebimento original para que seja substituído pela nova versão
    recebimentos.splice(index, 1);
}

// Função para excluir um recebimento
function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    showList('recebimentos');
}

// Função para editar um contrato
function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatarioContrato').value = contrato.locatario;
    document.getElementById('cnpjContrato').value = contrato.cnpj;
    document.getElementById('representanteContrato').value = contrato.representante;
    document.getElementById('periodoContrato').value = contrato.periodo;
    document.getElementById('equipamentoContrato').value = contrato.equipamento;

    // Remover o contrato original para que seja substituído pela nova versão
    contratos.splice(index, 1);
}

// Função para excluir um contrato
function deleteContrato(index) {
    contratos.splice(index, 1);
    showList('contratos');
}

// Função para editar uma empresa
function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpj').value = empresa.areaCnpj;
    document.getElementById('areaAtuacao').value = empresa.areaAtuacao;
    document.getElementById('representanteEmpresa').value = empresa.representante;
    document.getElementById('telefoneEmpresa').value = empresa.telefone;

    // Remover a empresa original para que seja substituída pela nova versão
    empresas.splice(index, 1);
}

// Função para excluir uma empresa
function deleteEmpresa(index) {
    empresas.splice(index, 1);
    showList('empresas');
}