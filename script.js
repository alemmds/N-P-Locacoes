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

// Função para cadastrar uma máquina
function cadastrarMaquina() {
    const nome = document.getElementById('nome-maquina').value;
    const serie = document.getElementById('serie-maquina').value;
    const anosUso = document.getElementById('anos-uso').value;
    const horasTrabalhadas = document.getElementById('horas-trabalhadas').value;

    // Aqui você pode armazenar os dados em um array ou localStorage
    const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
    maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
    localStorage.setItem('maquinas', JSON.stringify(maquinas));

    // Limpar o formulário
    document.getElementById('form-maquina').reset();

    // Atualizar a lista de máquinas
    mostrarListaMaquinas();
}

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

// Função para alterar uma máquina (exemplo)
function alterarMaquina(index) {
    const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
    const maquina = maquinas[index];

    document.getElementById('nome-maquina').value = maquina.nome;
    document.getElementById('serie-maquina').value = maquina.serie;
    document.getElementById('anos-uso').value = maquina.anosUso;
    document.getElementById('horas-trabalhadas').value = maquina.horasTrabalhadas;

    // Remover a máquina do localStorage antes de alterar
    maquinas.splice(index, 1);
    localStorage.setItem('maquinas', JSON.stringify(maquinas));

    // Mostrar a lista novamente após a alteração
    mostrarListaMaquinas();
}

// Função para excluir uma máquina
function excluirMaquina(index) {
    const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
    maquinas.splice(index, 1);
    localStorage.setItem('maquinas', JSON.stringify(maquinas));
    mostrarListaMaquinas();
}

// Função para mostrar o cadastro de recebimentos (similar a mostrarCadastroMaquinas)
function mostrarCadastroRecebimentos() {
    // Implemente aqui as funcionalidades para a aba de recebimentos
}

// Função para mostrar o cadastro de contratos (similar a mostrarCadastroMaquinas)
function mostrarCadastroContratos() {
    // Implemente aqui as funcionalidades para a aba de contratos
}

// Função para mostrar o cadastro de contas (similar a mostrarCadastroMaquinas)
function mostrarCadastroContas() {
    // Implemente aqui as funcionalidades para a aba de contas
}

// Função para mostrar o cadastro de empresas (similar a mostrarCadastroMaquinas)
function mostrarCadastroEmpresas() {
    // Implemente aqui as funcionalidades para a aba de empresas
}