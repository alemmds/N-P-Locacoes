let maquinas = [];
let recebimentos = [];
let contratos = [];
let contas = [];
let empresas = [];

function showList(section) {
    const sections = ['maquinas', 'recebimentos', 'contratos', 'contas', 'empresas'];
    sections.forEach(s => {
        document.getElementById(s).style.display = (s === section) ? 'block' : 'none';
    });
    if (section === 'maquinas') loadMaquinas();
    else if (section === 'recebimentos') loadRecebimentos();
    else if (section === 'contratos') loadContratos();
    else if (section === 'contas') loadContas();
    else if (section === 'empresas') loadEmpresas();
}

function handleFormMaquina(event) {
    event.preventDefault();
    const form = event.target;
    const newMaquina = {
        nome: form.nome.value,
        serie: form.serie.value,
        anosUso: form.anosUso.value,
        horasTrabalhadas: form.horasTrabalhadas.value,
    };
    maquinas.push(newMaquina);
    form.reset();
    loadMaquinas();
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
                <button onclick="editMaquina(${index})">Editar</button>
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
    deleteMaquina(index);
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    loadMaquinas();
}

// Outras funções (recebimentos, contratos, contas, empresas) seguem o mesmo padrão acima, com ajustes nos campos