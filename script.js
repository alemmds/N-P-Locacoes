const maquinas = [];
const recebimentos = [];
const contratos = [];
const contas = [];
const empresas = [];

document.getElementById('menu-maquinas').addEventListener('click', () => carregarPagina('maquinas'));
document.getElementById('menu-recebimentos').addEventListener('click', () => carregarPagina('recebimentos'));
document.getElementById('menu-contratos').addEventListener('click', () => carregarPagina('contratos'));
document.getElementById('menu-contas').addEventListener('click', () => carregarPagina('contas'));
document.getElementById('menu-empresas').addEventListener('click', () => carregarPagina('empresas'));

function carregarPagina(categoria) {
    let conteudo = '';

    switch (categoria) {
        case 'maquinas':
            conteudo = `
                <h2>Cadastro de Máquinas</h2>
                <form id="form-maquinas" onsubmit="cadastrarMaquina(event)">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" required>
                    <label for="serie">Série:</label>
                    <input type="text" id="serie" required>
                    <label for="anos">Anos de uso:</label>
                    <input type="number" id="anos" required>
                    <label for="horas">Horas trabalhadas:</label>
                    <input type="number" id="horas" required>
                    <button type="submit">Cadastrar</button>
                </form>
                <button onclick="mostrarLista('maquinas')">Listas de Máquinas</button>
                <div id="lista-maquinas"></div>`;
            break;

        case 'recebimentos':
            conteudo = `
                <h2>Cadastro de Recebimentos</h2>
                <form id="form-recebimentos" onsubmit="cadastrarRecebimento(event)">
                    <label for="empresa">Empresa:</label>
                    <input type="text" id="empresa" required>
                    <label for="valor">Valor:</label>
                    <input type="number" id="valor" required>
                    <label for="pagamento">Data de Pagamento:</label>
                    <input type="date" id="pagamento" required>
                    <label for="termino">Data de Término:</label>
                    <input type="date" id="termino" required>
                    <label for="status">Status:</label>
                    <select id="status">
                        <option value="PAGO">Pago</option>
                        <option value="A RECEBER">A Receber</option>
                    </select>
                    <button type="submit">Cadastrar</button>
                </form>
                <button onclick="mostrarLista('recebimentos')">Listas de Recebimentos</button>
                <div id="lista-recebimentos"></div>`;
            break;

        // Adicione estruturas semelhantes para 'contratos', 'contas' e 'empresas'

        case 'contratos':
            conteudo = `
                <h2>Cadastro de Contratos</h2>
                <form id="form-contratos" onsubmit="cadastrarContrato(event)">
                    <label for="empresa-contrato">Empresa:</label>
                    <input type="text" id="empresa-contrato" required>
                    <label for="locatario">Locatário:</label>
                    <input type="text" id="locatario" required>
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" required>
                    <label for="representante">Representante:</label>
                    <input type="text" id="representante" required>
                    <label for="periodo">Período da locação:</label>
                    <input type="text" id="periodo" required>
                    <label for="equipamento">Equipamento:</label>
                    <input type="text" id="equipamento" required>
                    <label for="data-termino">Data de término:</label>
                    <input type="date" id="data-termino" required>
                    <label for="operador">Operador:</label>
                    <select id="operador">
                        <option value="Pela empresa">Pela empresa</option>
                        <option value="Pela N Pontes">Pela N Pontes</option>
                    </select>
                    <button type="submit">Confirmar</button>
                </form>
                <button onclick="mostrarLista('contratos')">Listas de Contratos</button>
                <div id="lista-contratos"></div>`;
            break;

        case 'contas':
            conteudo = `
                <h2>Cadastro de Contas</h2>
                <form id="form-contas" onsubmit="cadastrarConta(event)">
                    <label for="tipo">Tipo:</label>
                    <select id="tipo">
                        <option value="Água">Água</option>
                        <option value="Luz">Luz</option>
                        <option value="Telefone">Telefone</option>
                        <option value="Internet">Internet</option>
                        <option value="Outros">Outros</option>
                    </select>
                    <label for="data-vencimento">Data de Vencimento:</label>
                    <input type="date" id="data-vencimento" required>
                    <label for="valor-conta">Valor:</label>
                    <input type="number" id="valor-conta" required>
                    <button type="submit">Cadastrar</button>
                </form>
                <button onclick="mostrarLista('contas')">Listas de Contas</button>
                <div id="lista-contas"></div>`;
            break;

        case 'empresas':
            conteudo = `
                <h2>Cadastro de Empresas</h2>
                <form id="form-empresas" onsubmit="cadastrarEmpresa(event)">
                    <label for="nome-empresa">Nome:</label>
                    <input type="text" id="nome-empresa" required>
                    <label for="area-cnpj">Área de CNPJ:</label>
                    <input type="text" id="area-cnpj" required>
                    <label for="area-atuacao">Área de Atuação:</label>
                    <input type="text" id="area-atuacao" required>
                    <label for="representante-empresa">Representante:</label>
                    <input type="text" id="representante-empresa" required>
                    <label for="telefone-empresa">Telefone:</label>
                    <input type="text" id="telefone-empresa" required>
                    <label for="email-empresa">E-mail:</label>
                    <input type="email" id="email-empresa" required>
                    <button type="submit">Confirmar</button>
                </form>
                <button onclick="mostrarLista('empresas')">Listas de Empresas</button>
                <div id="lista-empresas"></div>`;
            break;

        default:
            conteudo = '<p>Selecione uma categoria do menu.</p>';
            break;
    }
    document.getElementById('pagina').innerHTML = conteudo;
}

function mostrarLista(categoria) {
    let listaHTML = '';

    switch (categoria) {
        case 'maquinas':
            listaHTML = '<h3>Lista de Máquinas</h3><table><tr><th>Nome</th><th>Série</th><th>Anos de Uso</th><th>Horas Trabalhadas</th></tr>';
            maquinas.forEach(maquina => {
                listaHTML += `<tr><td>${maquina.nome}</td><td>${maquina.serie}</td><td>${maquina.anos}</td><td>${maquina.horas}</td></tr>`;
            });
            listaHTML += '</table>';
            break;

        case 'recebimentos':
            listaHTML = '<h3>Lista de Recebimentos</h3><table><tr><th>Empresa</th><th>Valor</th><th>Data de Pagamento</th><th>Data de Término</th><th>Status</th></tr>';
            recebimentos.forEach(recebimento => {
                listaHTML += `<tr><td>${recebimento.empresa}</td><td>${recebimento.valor}</td><td>${recebimento.pagamento}</td><td>${recebimento.termino}</td><td>${recebimento.status}</td></tr>`;
            });
            listaHTML += '</table>';
            break;

        // Adicione estrutura similar para 'contratos', 'contas' e 'empresas'

        case 'contratos':
            listaHTML = '<h3>Lista de Contratos</h3><table><tr><th>Empresa</th><th>Locatário</th><th>CNPJ</th><th>Representante</th><th>Período</th><th>Equipamento</th><th>Data de Término</th><th>Operador</th></tr>';
            contratos.forEach(contrato => {
                listaHTML += `<tr><td>${contrato.empresa}</td><td>${contrato.locatario}</td><td>${contrato.cnpj}</td><td>${contrato.representante}</td><td>${contrato.periodo}</td><td>${contrato.equipamento}</td><td>${contrato.dataTermino}</td><td>${contrato.operador}</td></tr>`;
            });
            listaHTML += '</table>';
            break;

        case 'contas':
            listaHTML = '<h3>Lista de Contas</h3><table><tr><th>Tipo</th><th>Data de Vencimento</th><th>Valor</th></tr>';
            contas.forEach(conta => {
                listaHTML += `<tr><td>${conta.tipo}</td><td>${conta.dataVencimento}</td><td>${conta.valor}</td></tr>`;
            });
            listaHTML += '</table>';
            break;

        case 'empresas':
            listaHTML = '<h3>Lista de Empresas</h3><table><tr><th>Nome</th><th>Área de CNPJ</th><th>Área de Atuação</th><th>Representante</th><th>Telefone</th><th>Email</th></tr>';
            empresas.forEach(empresa => {
                listaHTML += `<tr><td>${empresa.nome}</td><td>${empresa.areaCnpj}</td><td>${empresa.areaAtuacao}</td><td>${empresa.representante}</td><td>${empresa.telefone}</td><td>${empresa.email}</td></tr>`;
            });
            listaHTML += '</table>';
            break;

        default:
            listaHTML = '<p>Nenhum dado disponível.</p>';
            break;
    }

    document.getElementById(`lista-${categoria}`).innerHTML = listaHTML;
}

// Funções de cadastro para cada categoria
function cadastrarMaquina(event) {
    event.preventDefault();
    const maquina = {
        nome: document.getElementById('nome').value,
        serie: document.getElementById('serie').value,
        anos: document.getElementById('anos').value,
        horas: document.getElementById('horas').value,
    };
    maquinas.push(maquina);
    document.getElementById('form-maquinas').reset();
    alert('Máquina cadastrada com sucesso!');
}

function cadastrarRecebimento(event) {
    event.preventDefault();
    const recebimento = {
        empresa: document.getElementById('empresa').value,
        valor: parseFloat(document.getElementById('valor').value),
        pagamento: document.getElementById('pagamento').value,
        termino: document.getElementById('termino').value,
        status: document.getElementById('status').value,
    };
    recebimentos.push(recebimento);
    document.getElementById('form-recebimentos').reset();
    alert('Recebimento cadastrado com sucesso!');
}

// Adicione funções de cadastro semelhantes para 'contratos', 'contas' e 'empresas'

function cadastrarContrato(event) {
    event.preventDefault();
    const contrato = {
        empresa: document.getElementById('empresa-contrato').value,
        locatario: document.getElementById('locatario').value,
        cnpj: document.getElementById('cnpj').value,
        representante: document.getElementById('representante').value,
        periodo: document.getElementById('periodo').value,
        equipamento: document.getElementById('equipamento').value,
        dataTermino: document.getElementById('data-termino').value,
        operador: document.getElementById('operador').value,
    };
    contratos.push(contrato);
    document.getElementById('form-contratos').reset();
    alert('Contrato cadastrado com sucesso!');
}

function cadastrarConta(event) {
    event.preventDefault();
    const conta = {
        tipo: document.getElementById('tipo').value,
        dataVencimento: document.getElementById('data-vencimento').value,
        valor: parseFloat(document.getElementById('valor-conta').value),
    };
    contas.push(conta);
    document.getElementById('form-contas').reset();
    alert('Conta cadastrada com sucesso!');
}

function cadastrarEmpresa(event) {
    event.preventDefault();
    const empresa = {
        nome: document.getElementById('nome-empresa').value,
        areaCnpj: document.getElementById('area-cnpj').value,
        areaAtuacao: document.getElementById('area-atuacao').value,
        representante: document.getElementById('representante-empresa').value,
        telefone: document.getElementById('telefone-empresa').value,
        email: document.getElementById('email-empresa').value,
    };
    empresas.push(empresa);
    document.getElementById('form-empresas').reset();
    alert('Empresa cadastrada com sucesso!');
}
