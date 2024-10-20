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
                <form id="form-maquinas">
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
                <form id="form-recebimentos">
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

        default:
            conteudo = '<p>Selecione uma categoria do menu.</p>';
            break;
    }
    document.getElementById('pagina').innerHTML = conteudo;
}

function mostrarLista(categoria) {
    // Função para exibir a lista de dados cadastrados, dependendo da categoria
}