/**
 * jQuery equalizeTextWidth
 * @version 1.0 
 * @author Cau Guanabara
 * 
 *   pt-BR
 *   equalizeTextWidth() é um plugin direcionado basicamente a designers e sua idéia é muito simples: 
 *   igualar a largura do texto em um elemento mudando o tamanho da fonte linha a linha, até que todas 
 *   as linhas de texto tenham o tamanho mais próximo possível da largura do elemento que contém o texto. 
 *   
 *   en
 *   equalizeTextWidth () is directed basically to designers and their idea is very simple: 
 *   to match the width of the text in an element by changing the font size, line by line, 
 *   until that all text lines have a size as close as possible to the parent element width.
 *   
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

  ;(function($) {
    
    $.fn.extend({
      equalizeTextWidth: function(param, xelem) {
        var act = /^(undo|text)$/.test(param) ? param : '', expandEl = (xelem);
        
        return this.each(function(index) {
          
          var $this = $(this), display = $this.css('display'), isDone = ($this.children('.etw-line').length > 0);
          
          // não existe texto no elemento
          if(/^\s*$/.test($this.text())) return;
          
          // desfazer o efeito
          if(act == 'undo') {
            if(isDone) $this.html($this.text()).css({textAlign: 'left', width: ''});
            return;
          }
          
          // o efeito já foi aplicado
          if(isDone) return;
          
          // apenas elementos com display 'block' ou 'inline-block'
          if(!/block$/.test($this.css('display'))) return; 
          
          var width = $this.width(), // largura referência
              txt = $this.text().split(/\s+/), // array com as palavras (tags são eliminadas)
              inn = $this.clone().css({ // elemento usado para medir as linhas de texto
                      // escondido
                      visibility: 'hidden', 
                      // preparado para se ajustar ao texto, sem quebras de linha
                      display: 'inline', 
                      width: 'auto', 
											padding: 0,
											whiteSpacing: 'nowrap', 
                      // com a mesma formatação do original
                      fontSize: $this.css('fontSize'), 
                      fontFamily: $this.css('fontFamily'), 
                      fontStyle: $this.css('fontStyle'), 
                      fontWeight: $this.css('fontWeight')})
											// e vazio
											.html(''),
              lines = []; // array para guardar o texto separado por linhas
          
          // se não existir de fato no documento, o elemento não terá largura mensurável
          $('body').append(inn); 
          
          // fazemos um loop pelas palavras para definir as linhas
          for(var i = 0, ind = 0; i < txt.length; i++) {
            var t = inn.text(); // pega o texto no nosso elemento (inicialmente '')
            inn.html(t ? t+' '+txt[i] : txt[i]); // adiciona a palavra da vez, sem modificar a variável t
            if(inn.width() >= width) { // se a largura da frase atual ficou maior que a largura referência
              if(inn.text() == txt[i]) { // uma palavra que sozinha é maior que a linha - passa adiante
                // se o parâmtro é 'text' significa que não queremos reduzir palavras que eventualmente extrapolem
                // a largura definida, vamos respeitar a largura do texto - aumentamos então a largura do elemento
                if(param == 'text') {
                  width = inn.width();
                  if(expandEl) $this.width(width);
                }
                continue;
              }
              inn.html(''); // limpamos o elemento escondido
              lines.push('<span class="etw-line line-'+(++ind)+'">'+t+'</span>'); // salvamos a linha dentro de um SPAN - assim poderemos formatar cada uma separadamente.
              --i; // retornamos o contador, porque a última palavra não pertence a esta linha, será a primeira da próxima linha
            }
            // se estamos na última volta e sobrou texto no elemento escondido, esta é a última linha
            if(i == txt.length - 1 && inn.html()) lines.push('<span class="etw-line line-'+(++ind)+'">'+inn.text()+'</span>');
          }
          
          // centralizamos o texto e setamos o novo HTML
          inn.css('textAlign', 'center').html(lines.join(' '));
          
          // se a linha quebra, nunca vai extrapolar o limite do box
          inn.children('.etw-line').css({whiteSpace: 'nowrap', lineHeight: '1em'}); 
          
					var sizes = [];
          // loop pelas linhas para definir o tamanho do texto em cada uma
          for(i = 0; i < lines.length; i++) {
            var lin = inn.children('.etw-line:eq('+i+')'), // pega o SPAN correspondente a linha da vez
                lw = lin.width(); // mede o texto
            if(lw < width) { // se o texto ainda é menor que a linha
              while(lw < width) { // enquanto lw for menor que a largura referência...
                lin.css({fontSize: '+=1px'}); // aumenta a fonte em 1 pixel
                lw = lin.width(); // atualiza a variável lw
              }
            } else { // se o texto é maior ou igual a linha
              while(lw > width) { // enquanto lw for maior que a largura referência...
                lin.css({fontSize: '-=1px'}); // diminui a fonte em 1 pixel
                lw = lin.width(); // atualiza a variável lw
              }
            }
						sizes.push(lin.css('fontSize'));
          }

          // remover o elemento escondido
          inn.remove();
          
          // centralizamos o texto e setamos o novo HTML
          $this.css('textAlign', 'center').html(lines.join(' '));
          
          // se a linha quebra, nunca vai extrapolar o limite do box
          $this.children('.etw-line').css({whiteSpace: 'nowrap', lineHeight: '1em'}); 
          
          // loop pelas linhas para definir o tamanho do texto em cada uma
          for(i = 0; i < lines.length; i++) {
						//console.log(sizes);
						//console.log("$('.etw-line:eq("+i+")').animate({fontSize: '"+sizes[i]+"'}, 'swing', 300);");
//            $this.children('.etw-line:eq('+i+')').animate({fontSize: sizes[i]}, 'swing', 300); // 
            $this.children('.etw-line:eq('+i+')').css({fontSize: sizes[i]}); // 
          }
        });
      }
    });
  })(jQuery);
