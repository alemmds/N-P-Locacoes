const maquinas = [];
const recebimentos = [];
const contratos = [];
const contas = [];
const empresas = [];

// Função para exibir a seção correta
function showSection(section) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach((sec) => {
        sec.classList.add("hidden");
    });
    document.getElementById(section).classList.remove("hidden");
}

// Funções para cadastrar máquinas
document.getElementById("maquinaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const maquinaNome = document.getElementById("maquinaNome").value;
    const maquinaSerie = document.getElementById("maquinaSerie").value;
    const maquinaAnosUso = document.getElementById("maquinaAnosUso").value;
    const maquinaHorasTrabalhadas = document.getElementById("maquinaHorasTrabalhadas").value;
    maquinas.push({ nome: maquinaNome, serie: maquinaSerie, anosUso: maquinaAnosUso, horasTrabalhadas: maquinaHorasTrabalhadas });
    this.reset();
    showList('maquinas'); // Atualiza a lista após o cadastro
});

// Função para mostrar lista de máquinas
function showList(section) {
    let list = [];
    switch (section) {
        case 'maquinas':
            list = maquinas;
            break;
        case 'recebimentos':
            list = recebimentos;
            break;
        case 'contratos':
            list = contratos;
            break;
        case 'contas':
            list = contas;
            break;
        case 'empresas':
            list = empresas;
            break;
    }

    const tableBody = document.getElementById(`${section}TableBody`);
    tableBody.innerHTML = ""; // Limpa a tabela

    list.forEach((item, index) => {
        const row = document.createElement("tr");
        for (const key in item) {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `<button onclick="edit${section.charAt(0).toUpperCase() + section.slice(1)}(${index})">Alterar</button>
                                 <button onclick="delete${section.charAt(0).toUpperCase() + section.slice(1)}(${index})">Excluir</button>`;
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });

    document.getElementById(`${section}List`).classList.remove("hidden");
}

// Funções para editar e excluir máquinas
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById("maquinaNome").value = maquina.nome;
    document.getElementById("maquinaSerie").value = maquina.serie;
    document.getElementById("maquinaAnosUso").value = maquina.anosUso;
    document.getElementById("maquinaHorasTrabalhadas").value = maquina.horasTrabalhadas;

    // Remove a máquina original
    maquinas.splice(index, 1);
    showList('maquinas'); // Atualiza a lista após a edição
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    showList('maquinas');
}

// Funções para cadastro de recebimentos
document.getElementById("recebimentoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const recebimentoValor = document.getElementById("recebimentoValor").value;
    const recebimentoData = document.getElementById("recebimentoData").value;
    recebimentos.push({ valor: recebimentoValor, data: recebimentoData });
    this.reset();
    showList('recebimentos'); // Atualiza a lista após o cadastro
});

// Funções para editar e excluir recebimentos
function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById("recebimentoValor").value = recebimento.valor;
    document.getElementById("recebimentoData").value = recebimento.data;

    // Remove o recebimento original
    recebimentos.splice(index, 1);
    showList('recebimentos'); // Atualiza a lista após a edição
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    showList('recebimentos');
}

// Funções para cadastro de contratos
document.getElementById("contratoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const contratoDescricao = document.getElementById("contratoDescricao").value;
    const contratoValor = document.getElementById("contratoValor").value;
    const contratoData = document.getElementById("contratoData").value;
    contratos.push({ descricao: contratoDescricao, valor: contratoValor, data: contratoData });
    this.reset();
    showList('contratos'); // Atualiza a lista após o cadastro
});

// Funções para editar e excluir contratos
function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById("contratoDescricao").value = contrato.descricao;
    document.getElementById("contratoValor").value = contrato.valor;
    document.getElementById("contratoData").value = contrato.data;

    // Remove o contrato original
    contratos.splice(index, 1);
    showList('contratos'); // Atualiza a lista após a edição
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    showList('contratos');
}

// Funções para cadastro de contas
document.getElementById("contaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const contaNome = document.getElementById("contaNome").value;
    const contaValor = document.getElementById("contaValor").value;
    contas.push({ nome: contaNome, valor: contaValor });
    this.reset();
    showList('contas'); // Atualiza a lista após o cadastro
});

// Funções para editar e excluir contas
function editConta(index) {
    const conta = contas[index];
    document.getElementById("contaNome").value = conta.nome;
    document.getElementById("contaValor").value = conta.valor;

    // Remove a conta original
    contas.splice(index, 1);
    showList('contas'); // Atualiza a lista após a edição
}

function deleteConta(index) {
    contas.splice(index, 1);
    showList('contas');
}

// Funções para cadastro de empresas
document.getElementById("empresaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const empresaNome = document.getElementById("empresaNome").value;
    const empresaCnpj = document.getElementById("empresaCnpj").value;
    empresas.push({ nome: empresaNome, cnpj: empresaCnpj });
    this.reset();
    showList('empresas'); // Atualiza a lista após o cadastro
});

// Funções para editar e excluir empresas
function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById("empresaNome").value = empresa.nome;
    document.getElementById("empresaCnpj").value = empresa.cnpj;

    // Remove a empresa original
    empresas.splice(index, 1);
    showList('empresas'); // Atualiza a lista após a edição
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    showList('empresas');
}
