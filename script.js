name=script.js
// Alterna modo de alto contraste e mantém estado via localStorage
(function(){
  const btn = document.getElementById('contrasteBtn');
  if(!btn) return;

  const CONTRAST_KEY = 'acessibilidade:altoContraste';

  function applyContrast(on){
    document.body.classList.toggle('high-contrast', !!on);
    btn.setAttribute('aria-pressed', !!on);
    btn.textContent = on ? 'Desativar alto contraste' : 'Alternar alto contraste';
  }

  // inicializa a partir do armazenamento
  const saved = localStorage.getItem(CONTRAST_KEY) === '1';
  applyContrast(saved);

  btn.addEventListener('click', () => {
    const next = !(localStorage.getItem(CONTRAST_KEY) === '1');
    localStorage.setItem(CONTRAST_KEY, next ? '1' : '0');
    applyContrast(next);
    btn.focus(); // mantém foco no botão
  });

  // Melhora de foco para o link pular para conteúdo
  const skip = document.querySelector('.skip-link');
  if(skip){
    skip.addEventListener('click', function(e){
      // após pular, garante que o elemento principal receba foco programático
      const target = document.getElementById(this.getAttribute('href').slice(1));
      if(target){
        target.setAttribute('tabindex','-1');
        target.focus();
      }
    });
  }

  // Exemplo: impedir recarregamento no submit (apenas demonstração)
  const form = document.getElementById('contato');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // feedback simples e acessível
      alert('Obrigado! (este formulário é apenas um exemplo)');
    });
  }
})();
