// Armazenamento local para as máquinas, recebimentos, contratos, contas e empresas
if (!localStorage.getItem('maquinas')) {
    localStorage.setItem('maquinas', JSON.stringify([]));
}
if (!localStorage.getItem('recebimentos')) {
    localStorage.setItem('recebimentos', JSON.stringify([]));
}
if (!localStorage.getItem('contratos')) {
    localStorage.setItem('contratos', JSON.stringify([]));
}
if (!localStorage.getItem('contas')) {
    localStorage.setItem('contas', JSON.stringify([]));
}
if (!localStorage.getItem('empresas')) {
    localStorage.setItem('empresas', JSON.stringify([]));
}

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

// Função para cadastrar uma nova máquina
function cadastrarMaquina() {
    const nome = document.getElementById('nome-maquina').value;
    const serie = document.getElementById('serie-maquina').value;
    const anosUso = document.getElementById('anos-uso').value;
    const horasTrabalhadas = document.getElementById('horas-trabalhadas').value;

    const maquinas = JSON.parse(localStorage.getItem('maquinas'));
    maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
    localStorage.setItem('maquinas', JSON.stringify(maquinas));

    document.getElementById('form-maquina').reset(); // Limpa o formulário
    mostrarListaMaquinas(); // Atualiza a lista de máquinas
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

// Função para alterar uma máquina
function alterarMaquina(index) {
    const maquinas = JSON.parse(localStorage.getItem('maquinas'));
    const maquina = maquinas[index];

    document.getElementById('nome-maquina').value = maquina.nome;
    document.getElementById('serie-maquina').value = maquina.serie;
    document.getElementById('anos-uso').value = maquina.anosUso;
    document.getElementById('horas-trabalhadas').value = maquina.horasTrabalhadas;

    document.getElementById('form-maquina').onsubmit = function(event) {
        event.preventDefault();
        maquina.nome = document.getElementById('nome-maquina').value;
        maquina.serie = document.getElementById('serie-maquina').value;
        maquina.anosUso = document.getElementById('anos-uso').value;
        maquina.horasTrabalhadas = document.getElementById('horas-trabalhadas').value;

        localStorage.setItem('maquinas', JSON.stringify(maquinas));
        mostrarListaMaquinas(); // Atualiza a lista de máquinas
    };
}

// Função para excluir uma máquina
function excluirMaquina(index) {
    const maquinas = JSON.parse(localStorage.getItem('maquinas'));
    maquinas.splice(index, 1);
    localStorage.setItem('maquinas', JSON.stringify(maquinas));
    mostrarListaMaquinas(); // Atualiza a lista de máquinas
}

// Funções semelhantes para Recebimentos, Contratos, Contas e Empresas
function mostrarCadastroRecebimentos() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h2>Cadastrar Recebimento</h2>
        <form id="form-recebimento">
            <label for="empresa-recebimento">Empresa:</label>
            <input type="text" id="empresa-recebimento" required>
            <label for="valor-recebimento">Valor:</label>
            <input type="number" id="valor-recebimento" required>
            <label for="data-pagamento">Pagamento:</label>
            <input type="date" id="data-pagamento" required>
            <label for="data-termino">Término:</label>
            <input type="date" id="data-termino" required>
            <label>Status:</label>
            <select id="status-recebimento">
                <option value="PAGO">PAGO</option>
                <option value="A RECEBER">A RECEBER</option>
            </select>
            <button type="button" onclick="cadastrarRecebimento()">Confirmar</button>
            <button type="button" onclick="mostrarListaRecebimentos()">Voltar</button>
        </form>
        <div id="lista-recebimentos"></div>
    `;
    mostrarListaRecebimentos(); // Mostrar a lista de recebimentos
}

function cadastrarRecebimento() {
    const empresa = document.getElementById('empresa-recebimento').value;
    const valor = document.getElementById('valor-recebimento').value;
    const dataPagamento = document.getElementById('data-pagamento').value;
    const dataTermino = document.getElementById('data-termino').value;
    const status = document.getElementById('status-recebimento').value;

    const recebimentos = JSON.parse(localStorage.getItem('recebimentos'));
    recebimentos.push({ empresa, valor, dataPagamento, dataTermino, status });
    localStorage.setItem('recebimentos', JSON.stringify(recebimentos));

    document.getElementById('form-recebimento').reset(); // Limpa o formulário
    mostrarListaRecebimentos(); // Atualiza a lista de recebimentos
}

function mostrarListaRecebimentos() {
    const listaRecebimentos = document.getElementById('lista-recebimentos');
    const recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];

    listaRecebimentos.innerHTML = '<h2>Lista de Recebimentos</h2>';
    if (recebimentos.length === 0) {
        listaRecebimentos.innerHTML += '<p>Nenhum recebimento cadastrado.</p>';
    } else {
        const tabela = `
            <table>
                <tr>
                    <th>Empresa</th>
                    <th>Valor</th>
                    <th>Data Pagamento</th>
                    <th>Data Término</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                ${recebimentos.map((recebimento, index) => `
                    <tr>
                        <td>${recebimento.empresa}</td>
                        <td>${recebimento.valor}</td>
                        <td>${recebimento.dataPagamento}</td>
                        <td>${recebimento.dataTermino}</td>
                        <td>${recebimento.status}</td>
                        <td>
                            <button onclick="alterarRecebimento(${index})">Alterar</button>
                            <button onclick="excluirRecebimento(${index})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
        `;
        listaRecebimentos.innerHTML += tabela;
    }
}

// Funções para alterar e excluir recebimentos
function alterarRecebimento(index) {
    const recebimentos = JSON.parse(localStorage.getItem('recebimentos'));
    const recebimento = recebimentos[index];

    document.getElementById('empresa-recebimento').value = recebimento.empresa;
    document.getElementById('valor-recebimento').value = recebimento.valor;
    document.getElementById('data-pagamento').value = recebimento.dataPagamento;
    document.getElementById('data-termino').value = recebimento.dataTermino;
    document.getElementById('status-recebimento').value = recebimento.status;

    document.getElementById('form-recebimento').onsubmit = function(event) {
        event.preventDefault();
        recebimento.empresa = document.getElementById('empresa-recebimento').value;
        recebimento.valor = document.getElementById('valor-recebimento').value;
        recebimento.dataPagamento = document.getElementById('data-pagamento').value;
        recebimento.dataTermino = document.getElementById('data-termino').value;
        recebimento.status = document.getElementById('status-recebimento').value;

        localStorage.setItem('recebimentos', JSON.stringify(recebimentos));
        mostrarListaRecebimentos(); // Atualiza a lista de recebimentos
    };
}

function excluirRecebimento(index) {
    const recebimentos = JSON.parse(localStorage.getItem('recebimentos'));
    recebimentos.splice(index, 1);
    localStorage.setItem('recebimentos', JSON.stringify(recebimentos));
    mostrarListaRecebimentos(); // Atualiza a lista de recebimentos
}

// As funções para Contratos, Contas e Empresas devem seguir um padrão semelhante.
// Exemplo para Contratos:
function mostrarCadastroContratos() {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = `
        <h2>Cadastrar Contrato</h2>
        <form id="form-contrato">
            <label for="cliente-contrato">Cliente:</label>
            <input type="text" id="cliente-contrato" required>
            <label for="valor-contrato">Valor:</label>
            <input type="number" id="valor-contrato" required>
            <label for="data-inicio-contrato">Data de Início:</label>
            <input type="date" id="data-inicio-contrato" required>
            <label for="data-fim-contrato">Data de Fim:</label>
            <input type="date" id="data-fim-contrato" required>
            <button type="button" onclick="cadastrarContrato()">Confirmar</button>
            <button type="button" onclick="mostrarListaContratos()">Voltar</button>
        </form>
        <div id="lista-contratos"></div>
    `;
    mostrarListaContratos(); // Mostrar a lista de contratos
}

// Implementar as funções `cadastrarContrato()`, `mostrarListaContratos()`, etc., como nos exemplos anteriores.

function mostrarListaContratos() {
    const listaContratos = document.getElementById('lista-contratos');
    const contratos = JSON.parse(localStorage.getItem('contratos')) || [];

    listaContratos.innerHTML = '<h2>Lista de Contratos</h2>';
    if (contratos.length === 0) {
        listaContratos.innerHTML += '<p>Nenhum contrato cadastrado.</p>';
    } else {
        const tabela = `
            <table>
                <tr>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Data de Início</th>
                    <th>Data de Fim</th>
                    <th>Ações</th>
                </tr>
                ${contratos.map((contrato, index) => `
                    <tr>
                        <td>${contrato.cliente}</td>
                        <td>${contrato.valor}</td>
                        <td>${contrato.dataInicio}</td>
                        <td>${contrato.dataFim}</td>
                        <td>
                            <button onclick="alterarContrato(${index})">Alterar</button>
                            <button onclick="excluirContrato(${index})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
        `;
        listaContratos.innerHTML += tabela;
    }
}

// Continuar implementando as funções para Contas e Empresas
