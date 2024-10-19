document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    // Carrega a página ao clicar nas categorias
    function loadPage(page) {
        switch (page) {
            case 'maquinas':
                contentDiv.innerHTML = `
                    <h2>Cadastro de Máquina</h2>
                    <form id="form-maquinas">
                        <label for="nome">Nome da Máquina</label>
                        <input type="text" name="nome" id="nome" required>
                        
                        <label for="serie">Série</label>
                        <input type="text" name="serie" id="serie" required>
                        
                        <label for="anosUso">Anos de Uso</label>
                        <input type="number" name="anosUso" id="anosUso" required>
                        
                        <label for="horasTrabalhadas">Horas Trabalhadas</label>
                        <input type="number" name="horasTrabalhadas" id="horasTrabalhadas" required>
                        
                        <button type="submit">Cadastrar Máquina</button>
                    </form>

                    <h2>Lista de Máquinas</h2>
                    <div id="lista-maquinas"></div>
                    <button class="back-button" onclick="goBack()">Voltar</button>
                `;
                document.getElementById('form-maquinas').addEventListener('submit', (e) => {
                    e.preventDefault();
                    addItem(e.target, 'maquinas');
                });
                showList('maquinas');
                break;

            case 'recebimentos':
                contentDiv.innerHTML = `
                    <h2>Cadastro de Recebimento</h2>
                    <form id="form-recebimentos">
                        <label for="empresa">Empresa</label>
                        <input type="text" name="empresa" id="empresa" required>
                        
                        <label for="valor">Valor</label>
                        <input type="number" name="valor" id="valor" required>
                        
                        <label for="data">Data</label>
                        <input type="date" name="data" id="data" required>
                        
                        <button type="submit">Cadastrar Recebimento</button>
                    </form>

                    <h2>Lista de Recebimentos</h2>
                    <div id="lista-recebimentos"></div>
                    <button class="back-button" onclick="goBack()">Voltar</button>
                `;
                document.getElementById('form-recebimentos').addEventListener('submit', (e) => {
                    e.preventDefault();
                    addItem(e.target, 'recebimentos');
                });
                showList('recebimentos');
                break;

            case 'contratos':
                contentDiv.innerHTML = `
                    <h2>Cadastro de Contrato</h2>
                    <form id="form-contratos">
                        <label for="cliente">Nome do Cliente</label>
                        <input type="text" name="cliente" id="cliente" required>
                        
                        <label for="maquina">Máquina</label>
                        <input type="text" name="maquina" id="maquina" required>
                        
                        <label for="dataInicio">Data de Início</label>
                        <input type="date" name="dataInicio" id="dataInicio" required>
                        
                        <label for="dataFim">Data de Fim</label>
                        <input type="date" name="dataFim" id="dataFim" required>
                        
                        <button type="submit">Cadastrar Contrato</button>
                    </form>

                    <h2>Lista de Contratos</h2>
                    <div id="lista-contratos"></div>
                    <button class="back-button" onclick="goBack()">Voltar</button>
                `;
                document.getElementById('form-contratos').addEventListener('submit', (e) => {
                    e.preventDefault();
                    addItem(e.target, 'contratos');
                });
                showList('contratos');
                break;

            case 'contas':
                contentDiv.innerHTML = `
                    <h2>Cadastro de Conta</h2>
                    <form id="form-contas">
                        <label for="descricao">Descrição</label>
                        <input type="text" name="descricao" id="descricao" required>
                        
                        <label for="valor">Valor</label>
                        <input type="number" name="valor" id="valor" required>
                        
                        <label for="vencimento">Data de Vencimento</label>
                        <input type="date" name="vencimento" id="vencimento" required>
                        
                        <button type="submit">Cadastrar Conta</button>
                    </form>

                    <h2>Lista de Contas</h2>
                    <div id="lista-contas"></div>
                    <button class="back-button" onclick="goBack()">Voltar</button>
                `;
                document.getElementById('form-contas').addEventListener('submit', (e) => {
                    e.preventDefault();
                    addItem(e.target, 'contas');
                });
                showList('contas');
                break;

            case 'empresas':
                contentDiv.innerHTML = `
                    <h2>Cadastro de Empresa</h2>
                    <form id="form-empresas">
                        <label for="nomeEmpresa">Nome da Empresa</label>
                        <input type="text" name="nomeEmpresa" id="nomeEmpresa" required>
                        
                        <label for="cnpj">CNPJ</label>
                        <input type="text" name="cnpj" id="cnpj" required>
                        
                        <button type="submit">Cadastrar Empresa</button>
                    </form>

                    <h2>Lista de Empresas</h2>
                    <div id="lista-empresas"></div>
                    <button class="back-button" onclick="goBack()">Voltar</button>
                `;
                document.getElementById('form-empresas').addEventListener('submit', (e) => {
                    e.preventDefault();
                    addItem(e.target, 'empresas');
                });
                showList('empresas');
                break;

            default:
                goBack();
        }
    }

    // Função para voltar à tela principal
    function goBack() {
        contentDiv.innerHTML = `
            <h2>Bem-vindo ao Sistema N Pontes Locações</h2>
            <p>Utilize o menu lateral para navegar pelas categorias e gerenciar os dados.</p>
        `;
    }

    // Adiciona um item à lista correspondente (usando LocalStorage)
    function addItem(form, category) {
        let data = {};
        new FormData(form).forEach((value, key) => {
            data[key] = value;
        });
        
        let items = JSON.parse(localStorage.getItem(category)) || [];
        items.push(data);
        localStorage.setItem(category, JSON.stringify(items));

        showList(category);
    }

    // Mostra a lista de itens cadastrados
    function showList(category) {
        const listaDiv = document.getElementById('lista-' + category);
        let items = JSON.parse(localStorage.getItem(category)) || [];

        if (items.length === 0) {
            listaDiv.innerHTML = 'Nenhum item cadastrado.';
        } else {
            listaDiv.innerHTML = '';
            items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `<strong>${index + 1}.</strong> ${JSON.stringify(item)} <button onclick="deleteItem('${category}', ${index})">Excluir</button>`;
                listaDiv.appendChild(itemDiv);
            });
        }
    }

    // Exclui um item da lista
    function deleteItem(category, index) {
        let items = JSON.parse(localStorage.getItem(category)) || [];
        items.splice(index, 1);
        localStorage.setItem(category, JSON.stringify(items));

        showList(category);
    }

    // Inicializa a página principal
    goBack();
});
