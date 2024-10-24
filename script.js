// Funções de salvar e listar para Máquinas, Contas, Recebimentos, Contratos e Empresas
document.addEventListener('DOMContentLoaded', () => {
    const categorias = ['maquinas', 'contas', 'recebimentos', 'contratos', 'empresas'];
    
    categorias.forEach(key => {
        const form = document.getElementById(`form${capitalizeFirstLetter(key)}`);
        const confirmarBtn = document.getElementById(`confirmar${capitalizeFirstLetter(key)}`);
        const listaBtn = document.getElementById(`lista${capitalizeFirstLetter(key)}`);
        const listContainer = document.getElementById(`${key}List`);

        confirmarBtn.addEventListener('click', () => {
            const item = getFormData(form);
            saveToLocalStorage(key, item);
            renderItems(listContainer, [item], form);
            form.reset();
        });

        listaBtn.addEventListener('click', () => {
            const storedItems = getFromLocalStorage(key);
            renderItems(listContainer, storedItems, form);
        });

        // Carrega os itens já salvos
        const storedItems = getFromLocalStorage(key);
        renderItems(listContainer, storedItems, form);
    });

    function getFormData(form) {
        const data = {};
        Array.from(form.elements).forEach(input => {
            if (input.tagName === 'INPUT') {
                data[input.id] = input.value;
            }
        });
        return data;
    }

    function saveToLocalStorage(key, item) {
        const storedItems = JSON.parse(localStorage.getItem(key)) || [];
        storedItems.push(item);
        localStorage.setItem(key, JSON.stringify(storedItems));
    }

    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function renderItems(container, items, form) {
        container.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            for (let field in item) {
                const p = document.createElement('p');
                p.textContent = `${getFriendlyFieldName(field)}: ${item[field]}`;
                div.appendChild(p);
            }
            container.appendChild(div);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getFriendlyFieldName(field) {
        const fieldsMap = {
            nomeMaquina: 'Nome',
            serieMaquina: 'Série',
            anosUsoMaquina: 'Anos de Uso',
            horimetroMaquina: 'Horímetro',
            ultimaManutencaoMaquina: 'Última Manutenção',
            dataEntradaMaquina: 'Data de Entrada',
            nomeConta: 'Nome',
            tipoConta: 'Tipo',
            saldoConta: 'Saldo',
            descricaoRecebimento: 'Descrição',
            valorRecebimento: 'Valor',
            dataRecebimento: 'Data',
            nomeContrato: 'Nome',
            locatarioContrato: 'Locatário',
            cnpjContrato: 'CNPJ',
            representanteContrato: 'Representante',
            periodoContrato: 'Período',
            valorContrato: 'Valor',
            dataTerminoContrato: 'Data de Término',
            equipamentoContrato: 'Equipamento',
            nomeEmpresa: 'Nome',
            cnpjEmpresa: 'CNPJ',
            enderecoEmpresa: 'Endereço'
        };
        return fieldsMap[field] || field;
    }
});