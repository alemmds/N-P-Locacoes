const maquinas = [];
const recebimentos = [];
const contratos = [];
const contas = [];
const empresas = [];

function showSection(section) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach((sec) => sec.classList.add("hidden"));
    document.getElementById(section).classList.remove("hidden");
}

document.getElementById("maquinaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const maquinaNome = document.getElementById("maquinaNome").value;
    const maquinaSerie = document.getElementById("maquinaSerie").value;
    const maquinaAnosUso = document.getElementById("maquinaAnosUso").value;
    const maquinaHorasTrabalhadas = document.getElementById("maquinaHorasTrabalhadas").value;
    maquinas.push({ nome: maquinaNome, serie: maquinaSerie, anosUso: maquinaAnosUso, horasTrabalhadas: maquinaHorasTrabalhadas });
    this.reset();
});

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
    tableBody.innerHTML = "";

    list.forEach((item, index) => {
        const row = document.createElement("tr");
        for (const key in item) {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `<button onclick="edit${section.charAt(0).toUpperCase() + section.slice(1)}(${index})">Editar</button>
                                 <button onclick="delete${section.charAt(0).toUpperCase() + section.slice(1)}(${index})">Excluir</button>`;
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });

    document.getElementById(`${section}List`).classList.remove("hidden");
}

// Funções para editar e excluir (exemplo para máquinas)
function editMaquina(index) {
    // Lógica para edição de máquina
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    showList('maquinas');
}
