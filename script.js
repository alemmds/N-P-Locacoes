// Função para mostrar o cadastro de máquinas
function mostrarCadastroMaquinas() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h2>Cadastrar Máquina</h2>
        <form id="form-maquina">
            <label for="nome-maquina">Nome da Máquina:</label>
            <input type="text" id="nome-maquina" required>
            <label for="serie-maquina">Série:</label>
            <input type="text" id="serie-maquina" required>
            <label for="anos-uso">Anos de Uso:</label>
            <input type="number" id="anos-uso" required>
            <label for="horas-trabalhadas">Horas Trabalhadas:</label>
            <input type="number" id="horas-trabalhadas" required>
            <button type="button" onclick="cadastrarMaquina()">Confirmar</button>
            <button type="button" onclick="mostrarListaMaquinas()">Voltar</button>
        </form>
        <div id="lista-maquinas"></div>
    `;
    mostrarListaMaquinas(); // Mostrar a lista de máquinas
}

// Resto do código permanece o mesmo...

// Função para mostrar a lista de máquinas
function mostrarListaMaquinas() {
    const listaMaquinas = document.getElementById('lista-maquinas');
    const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];

    listaMaquinas.innerHTML = '<h2>Lista de Máquinas</h2>';
    if (maquinas.length === 0) {
        listaMaquinas.innerHTML += '<p>Nenhuma máquina cadastrada.</p>';
    } else {
        const tabela = `
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Série</th>
                    <th>Anos de Uso</th>
                    <th>Horas Trabalhadas</th>
                    <th>Ações</th>
                </tr>
                ${maquinas.map((maquina, index) => `
                    <tr>
                        <td>${maquina.nome}</td>
                        <td>${maquina.serie}</td>
                        <td>${maquina.anosUso}</td>
                        <td>${maquina.horasTrabalhadas}</td>
                        <td>
                            <button onclick="alterarMaquina(${index})">Alterar</button>
                            <button onclick="excluirMaquina(${index})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
        `;
        listaMaquinas.innerHTML += tabela;
    }
}