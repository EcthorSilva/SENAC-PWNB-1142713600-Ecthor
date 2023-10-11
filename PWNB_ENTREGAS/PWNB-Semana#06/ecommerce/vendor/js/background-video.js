// Define o vídeo e a fonte
const video = document.querySelector('#video-viewport video');
const source = document.querySelector('#video-viewport source');

source.src = "/assets/video/background.mp4";

/* Script criado para corrigir a resolução do background video de acordo com a resolução da janela */

var min_w = 300;  // largura mínima do vídeo permitida
var vid_w_orig;   // Resolução do vídeo original
var vid_h_orig;   // Resolução do vídeo original

// Instancia o jquery e evita conflitos
$(document).ready(function () { // jQuery( function($){
  vid_w_orig = parseInt($('.video-file').attr('width'));
  vid_h_orig = parseInt($('.video-file').attr('height'));

  $(window).resize(function () { resizeToCover(); });
  $(window).trigger('resize');
});

function resizeToCover() {
  // define a janela de visualização do vídeo para o tamanho da janela
  $('#video-viewport').width($(window).width());
  $('#video-viewport').height($(window).height());

  // usa o maior fator de escala horizontal/vertical
  var scale_h = $(window).width() / vid_w_orig;
  var scale_v = $(window).height() / vid_h_orig;
  var scale = scale_h > scale_v ? scale_h : scale_v;

  // não permite largura em escala < largura mínima do vídeo
  if (scale * vid_w_orig < min_w) { scale = min_w / vid_w_orig; };

  // agora dimensiona o vídeo
  $('.video-file').width(scale * vid_w_orig);
  $('.video-file').height(scale * vid_h_orig);

  // e centralize-o rolando a janela de visualização do vídeo
  $('#video-viewport').scrollLeft(($('.video-file').width() - $(window).width()) / 2);
  $('#video-viewport').scrollTop(($('.video-file').height() - $(window).height()) / 2);
};