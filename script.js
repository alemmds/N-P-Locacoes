let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Função para exibir a aba correspondente do menu, junto com os botões Confirmar, Lista e Voltar
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    const currentSection = document.getElementById(section);
    currentSection.style.display = 'block';

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

// Função para exibir as listas
function showList(type) {
    if (type === 'maquinas') {
        const maquinasList = document.querySelector('#maquinasList tbody');
        maquinasList.innerHTML = '';

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
    }
    // Funções de exibição das demais listas (contas, recebimentos, contratos, empresas) seguem o mesmo padrão
}

// Funções para cadastrar novas máquinas
document.getElementById('formMaquina').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;

    maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
    saveToLocalStorage();
    document.getElementById('formMaquina').reset();
    showList('maquinas');
});

// Funções para editar e excluir máquinas
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;

    deleteMaquina(index);
}

function deleteMaquina(index) {
    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
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