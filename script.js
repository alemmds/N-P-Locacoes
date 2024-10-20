document.addEventListener('DOMContentLoaded', () => {
    // Seção Máquinas
    const maquinasSection = document.getElementById('maquinas-section');
    const cadastrarMaquinaTab = document.getElementById('tab-cadastrar-maquina');
    const listaMaquinasTab = document.getElementById('tab-lista-maquinas');
    const cadastrarMaquinaContent = document.getElementById('cadastrar-maquina');
    const listaMaquinasContent = document.getElementById('lista-maquinas');

    cadastrarMaquinaTab.addEventListener('click', () => {
        cadastrarMaquinaTab.classList.add('active');
        listaMaquinasTab.classList.remove('active');
        cadastrarMaquinaContent.classList.add('active');
        listaMaquinasContent.classList.remove('active');
    });

    listaMaquinasTab.addEventListener('click', () => {
        listaMaquinasTab.classList.add('active');
        cadastrarMaquinaTab.classList.remove('active');
        listaMaquinasContent.classList.add('active');
        cadastrarMaquinaContent.classList.remove('active');
    });

    document.getElementById('voltar').addEventListener('click', () => {
        maquinasSection.classList.remove('active');
    });

    // Seção Recebimentos
    const recebimentosSection = document.getElementById('recebimentos-section');
    const cadastrarRecebimentoTab = document.getElementById('tab-cadastrar-recebimento');
    const listaRecebimentosTab = document.getElementById('tab-lista-recebimentos');
    const cadastrarRecebimentoContent = document.getElementById('cadastrar-recebimento');
    const listaRecebimentosContent = document.getElementById('lista-recebimentos');

    cadastrarRecebimentoTab.addEventListener('click', () => {
        cadastrarRecebimentoTab.classList.add('active');
        listaRecebimentosTab.classList.remove('active');
        cadastrarRecebimentoContent.classList.add('active');
        listaRecebimentosContent.classList.remove('active');
    });

    listaRecebimentosTab.addEventListener('click', () => {
        listaRecebimentosTab.classList.add('active');
        cadastrarRecebimentoTab.classList.remove('active');
        listaRecebimentosContent.classList.add('active');
        cadastrarRecebimentoContent.classList.remove('active');
    });

    document.getElementById('voltar-recebimentos').addEventListener('click', () => {
        recebimentosSection.classList.remove('active');
    });

    // Seção Contratos
    const contratosSection = document.getElementById('contratos-section');
    const cadastrarContratoTab = document.getElementById('tab-cadastrar-contrato');
    const listaContratosTab = document.getElementById('tab-lista-contratos');
    const cadastrarContratoContent = document.getElementById('cadastrar-contrato');
    const listaContratosContent = document.getElementById('lista-contratos');

    cadastrarContratoTab.addEventListener('click', () => {
        cadastrarContratoTab.classList.add('active');
        listaContratosTab.classList.remove('active');
        cadastrarContratoContent.classList.add('active');
        listaContratosContent.classList.remove('active');
    });

    listaContratosTab.addEventListener('click', () => {
        listaContratosTab.classList.add('active');
        cadastrarContratoTab.classList.remove('active');
        listaContratosContent.classList.add('active');
        cadastrarContratoContent.classList.remove('active');
    });

    document.getElementById('voltar-contratos').addEventListener('click', () => {
        contratosSection.classList.remove('active');
    });

    // Seção Contas
    const contasSection = document.getElementById('contas-section');
    const cadastrarContaTab = document.getElementById('tab-cadastrar-conta');
    const listaContasTab = document.getElementById('tab-lista-contas');
    const cadastrarContaContent = document.getElementById('cadastrar-conta');
    const listaContasContent = document.getElementById('lista-contas');

    cadastrarContaTab.addEventListener('click', () => {
        cadastrarContaTab.classList.add('active');
        listaContasTab.classList.remove('active');
        cadastrarContaContent.classList.add('active');
        listaContasContent.classList.remove('active');
    });

    listaContasTab.addEventListener('click', () => {
        listaContasTab.classList.add('active');
        cadastrarContaTab.classList.remove('active');
        listaContasContent.classList.add('active');
        cadastrarContaContent.classList.remove('active');
    });

    document.getElementById('voltar-contas').addEventListener('click', () => {
        contasSection.classList.remove('active');
    });

    // Seção Empresas
    const empresasSection = document.getElementById('empresas-section');
    const cadastrarEmpresaTab = document.getElementById('tab-cadastrar-empresa');
    const listaEmpresasTab = document.getElementById('tab-lista-empresas');
    const cadastrarEmpresaContent = document.getElementById('cadastrar-empresa');
    const listaEmpresasContent = document.getElementById('lista-empresas');

    cadastrarEmpresaTab.addEventListener('click', () => {
        cadastrarEmpresaTab.classList.add('active');
        listaEmpresasTab.classList.remove('active');
        cadastrarEmpresaContent.classList.add('active');
        listaEmpresasContent.classList.remove('active');
    });

    listaEmpresasTab.addEventListener('click', () => {
        listaEmpresasTab.classList.add('active');
        cadastrarEmpresaTab.classList.remove('active');
        listaEmpresasContent.classList.add('active');
        cadastrarEmpresaContent.classList.remove('active');
    });

    document.getElementById('voltar-empresas').addEventListener('click', () => {
        empresasSection.classList.remove('active');
    });
});