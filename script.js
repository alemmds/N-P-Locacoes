let maquinas = [];
let recebimentos = [];
let contratos = [];
let contas = [];
let empresas = [];

function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

// Função para cadastrar e exibir Máquinas
function handleFormMaquina(event) {
    event.preventDefault();
    const form = event.target;
    const newMaquina = {
        nome: form.nome.value,
        serie: form.serie.value,
        anosUso: form.anosUso.value,
        horasTrabalhadas: form.horasTrabalhadas.value,
    };
    if (newMaquina.nome && newMaquina.serie && newMaquina.anosUso && newMaquina.horasTrabalhadas) {
        maquinas.push(newMaquina);
        form.reset();
        loadMaquinas();
    }
}

function loadMaquinas() {
    const tableBody = document.querySelector('#tableMaquinas tbody');
    tableBody.innerHTML = '';
    maquinas.forEach((maquina, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${maquina.nome}</td>
            <td>${maquina.serie}</td>
            <td>${maquina.anosUso}</td>
            <td>${maquina.horasTrabalhadas}</td>
            <td>
                <button onclick="editMaquina(${index})">Alterar</button>
                <button onclick="deleteMaquina(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editMaquina(index) {
    const maquina = maquinas[index];
    const form = document.getElementById('formMaquina');
    form.nome.value = maquina.nome;
    form.serie.value = maquina.serie;
    form.anosUso.value = maquina.anosUso;
    form.horasTrabalhadas.value = maquina.horasTrabalhadas;
    deleteMaquina(index); // Remove a máquina para ser atualizada
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    loadMaquinas();
}

// Recebimentos (Segue o mesmo padrão)
function handleFormRecebimento(event) {
    event.preventDefault();
    const form = event.target;
    const newRecebimento = {
        empresa: form.empresa.value,
        valor: form.valor.value,
        dataPagamento: form.dataPagamento.value,
        dataTermino: form.dataTermino.value,
        status: form.status.value
    };
    if (newRecebimento.empresa && newRecebimento.valor) {
        recebimentos.push(newRecebimento);
        form.reset();
        loadRecebimentos();
    }
}

function loadRecebimentos() {
    const tableBody = document.querySelector('#tableRecebimentos tbody');
    tableBody.innerHTML = '';
    recebimentos.forEach((recebimento, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recebimento.empresa}</td>
            <td>${recebimento.valor}</td>
            <td>${recebimento.dataPagamento}</td>
            <td>${recebimento.dataTermino}</td>
            <td>${recebimento.status}</td>
            <td>
                <button onclick="editRecebimento(${index})">Alterar</button>
                <button onclick="deleteRecebimento(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    const form = document.getElementById('formRecebimento');
    form.empresa.value = recebimento.empresa;
    form.valor.value = recebimento.valor;
    form.dataPagamento.value = recebimento.dataPagamento;
    form.dataTermino.value = recebimento.dataTermino;
    form.status.value = recebimento.status;
    deleteRecebimento(index);
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    loadRecebimentos();
}

// Contratos, Contas e Empresas seguem o mesmo padrão