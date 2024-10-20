document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            sections.forEach(section => section.classList.remove('active'));
            sections[index].classList.add('active');
            menuItems.forEach(menu => menu.classList.remove('active'));
            item.classList.add('active');
        });
    });

    function addItemToList(formId, listId, fields) {
        const form = document.querySelector(formId);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const values = fields.map(field => document.querySelector(field).value);
            const lista = document.querySelector(listId);

            const div = document.createElement('div');
            div.innerHTML = `
                ${values.join(' - ')}
                <button class="alterar">Alterar</button>
                <button class="excluir">Excluir</button>
            `;
            lista.appendChild(div);

            div.querySelector('.alterar').addEventListener('click', () => alterarItem(div, fields));
            div.querySelector('.excluir').addEventListener('click', () => excluirItem(div));

            form.reset();
        });
    }

    function alterarItem(div, fields) {
        const valoresAtuais = div.innerText.split(' - ');
        fields.forEach((field, index) => {
            document.querySelector(field).value = valoresAtuais[index];
        });
        div.remove();
    }

    function excluirItem(div) {
        div.remove();
    }

    // Cadastro de Máquinas
    addItemToList('#maquinas-form', '#lista-maquinas', [
        '#nome-maquina', 
        '#serie-maquina', 
        '#anos-uso-maquina', 
        '#horas-trabalhadas-maquina'
    ]);

    // Cadastro de Recebimentos
    addItemToList('#recebimentos-form', '#lista-recebimentos', [
        '#empresa-recebimento', 
        '#valor-recebimento', 
        '#pagamento-recebimento', 
        '#termino-recebimento', 
        '#status-recebimento'
    ]);

    // Cadastro de Contratos
    addItemToList('#contratos-form', '#lista-contratos', [
        '#empresa-contrato', 
        '#locatario-contrato', 
        '#cnpj-contrato', 
        '#representante-contrato', 
        '#periodo-contrato', 
        '#equipamento-contrato', 
        '#termino-contrato', 
        '#operador-contrato'
    ]);

    // Cadastro de Contas
    addItemToList('#contas-form', '#lista-contas', [
        '#tipo-conta', 
        '#vencimento-conta', 
        '#valor-conta'
    ]);

    // Cadastro de Empresas
    addItemToList('#empresas-form', '#lista-empresas', [
        '#nome-empresa', 
        '#cnpj-empresa', 
        '#area-empresa', 
        '#representante-empresa', 
        '#telefone-empresa', 
        '#email-empresa'
    ]);
});
