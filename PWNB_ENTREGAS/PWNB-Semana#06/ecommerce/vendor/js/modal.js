$(document).ready(function(){
    /*
     * Ouvinte de eventos .nav-modal-open
    */

    // Adiciona um ouvinte de evento de clique ao elemento com classe 'nav-modal-open'
    $('.nav-modal-open').on('click', function (e) {
        // Evita que a ação padrão do evento de clique seja executada (neste caso, abrir uma página)
        e.preventDefault();
        // Obtém o valor do atributo 'rel' do elemento clicado
        let elem = $(this).attr('rel');
        // Define o conteúdo da classe 'modal-body' com o conteúdo do elemento com id correspondente ao valor do atributo 'rel'
        $('.modal-body').html($('#' + elem).html());
        // Altera o titulo do modal
        $('.modal-header h5.modal-title').html($(this).text());
        // Cria um novo objeto Modal com o elemento com id 'modalId'
        let myModal = new bootstrap.Modal($('#modalId'));
        // Exibe o modal
        myModal.show();
    });
});