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

// Funções para editar e excluir
function editMaquina(index) {
    // Implementar a lógica de edição
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    showList('maquinas');
}

// Repita as funções de editar e excluir para os outros tipos de dados...

// Event Listeners para os botões do menu lateral
document.getElementById("btnMaquinas").addEventListener("click", function() {
    showList('maquinas');
});

document.getElementById("btnRecebimentos").addEventListener("click", function() {
    showList('recebimentos');
});

document.getElementById("btnContratos").addEventListener("click", function() {
    showList('contratos');
});

document.getElementById("btnContas").addEventListener("click", function() {
    showList('contas');
});

document.getElementById("btnEmpresas").addEventListener("click", function() {
    showList('empresas');
});
