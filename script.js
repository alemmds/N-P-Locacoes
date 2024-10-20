document.addEventListener('DOMContentLoaded', function () {
    const maquinasSection = document.getElementById('maquinasSection');
    const recebimentosSection = document.getElementById('recebimentosSection');
    
    document.getElementById('maquinasMenu').addEventListener('click', function () {
        showSection(maquinasSection);
    });

    document.getElementById('recebimentosMenu').addEventListener('click', function () {
        showSection(recebimentosSection);
    });

    function showSection(section) {
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(sec => sec.style.display = 'none');
        section.style.display = 'block';
    }

    // Inicializar máquinas
    const maquinasForm = document.getElementById('maquinasForm');
    const maquinasTable = document.querySelector('#maquinasTable tbody');
    let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];

    maquinasForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const maquina = {
            nome: document.getElementById('nomeMaquina').value,
            serie: document.getElementById('serieMaquina').value,
            anosUso: document.getElementById('anosUso').value,
            horasTrabalhadas: document.getElementById('horasTrabalhadas').value,
        };
        maquinas.push(maquina);
        localStorage.setItem('maquinas', JSON.stringify(maquinas));
        renderMaquinas();
        maquinasForm.reset();
    });

    function renderMaquinas() {
        maquinasTable.innerHTML = '';
        maquinas.forEach((maquina, index) => {
            const row = `<tr>
                <td>${maquina.nome}</td>
                <td>${maquina.serie}</td>
                <td>${maquina.anosUso}</td>
                <td>${maquina.horasTrabalhadas}</td>
                <td>
                    <button onclick="editarMaquina(${index})">Alterar</button>
                    <button onclick="excluirMaquina(${index})">Excluir</button>
                </td>
            </tr>`;
            maquinasTable.insertAdjacentHTML('beforeend', row);
        });
    }

    window.editarMaquina = function (index) {
        const maquina = maquinas[index];
        document.getElementById('nomeMaquina').value = maquina.nome;
        document.getElementById('serieMaquina').value = maquina.serie;
        document.getElementById('anosUso').value = maquina.anosUso;
        document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;
        maquinas.splice(index, 1);  // Remover temporariamente para edição
    };

    window.excluirMaquina = function (index) {
        maquinas.splice(index, 1);
        localStorage.setItem('maquinas', JSON.stringify(maquinas));
        renderMaquinas();
    };

    renderMaquinas();
});
