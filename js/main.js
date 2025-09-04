// Função que será chamada quando houver rolagem na tela
function handleScroll() {
  let y = window.scrollY;
  let menu = document.getElementById('menu');
  if (y > 80) {
    menu.classList.replace('lg:h-40', 'lg:h-20');
  } else {
    menu.classList.replace('lg:h-20', 'lg:h-40');
  }
}

// Adiciona um ouvinte de evento de rolagem ao objeto global (geralmente a janela)
window.addEventListener("scroll", handleScroll);

// GALERIA DE FOTOS
let imagens = [];
let imagemAtualIndex = 0;

function ampliarImagem(imagem) {
  const imagemAmpliada = document.getElementById('imagemAmpliada');
  const imgAmpliada = document.getElementById('imgAmpliada');

  if (!imagemAmpliada || !imgAmpliada) {
    console.error('Elementos imagemAmpliada ou imgAmpliada não encontrados no DOM.');
    return;
  }

  imagens = Array.from(document.querySelectorAll('img[alt="Imagem"]'));
  imagemAtualIndex = imagens.indexOf(imagem);
  imgAmpliada.src = imagem.src;
  imagemAmpliada.classList.add('ativa');
}

function fecharImagem() {
  const imagemAmpliada = document.getElementById('imagemAmpliada');
  if (imagemAmpliada) {
    imagemAmpliada.classList.remove('ativa');
  }
}

function imagemAnterior() {
  if (imagens.length === 0) return;
  imagemAtualIndex = (imagemAtualIndex - 1 + imagens.length) % imagens.length;
  document.getElementById('imgAmpliada').src = imagens[imagemAtualIndex].src;
}

function imagemProxima() {
  if (imagens.length === 0) return;
  imagemAtualIndex = (imagemAtualIndex + 1) % imagens.length;
  document.getElementById('imgAmpliada').src = imagens[imagemAtualIndex].src;
}


// DATA REGRESSIVA
document.addEventListener('DOMContentLoaded', () => {
  // Data alvo: 06/09/2025 00:00:00
  const targetDate = new Date('2025-09-06T00:00:00').getTime();

  // Função para atualizar a contagem regressiva
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // Cálculo de dias, horas, minutos e segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Atualiza o DOM
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      countdownElement.innerHTML = `
        ${days}d ${hours}h ${minutes}m ${seconds}s
      `;
    }

    // Para a contagem se chegar a zero
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = 'Evento iniciado!';
    }
  }

  // Atualiza a cada segundo
  const countdownInterval = setInterval(updateCountdown, 1000);

  // IntersectionObserver para animação
  const countdownContainer = document.querySelector('[data-anime]');
  if (countdownContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animação única
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Dispara quando 10% do elemento está visível
      }
    );
    observer.observe(countdownContainer);
  }
});

// CLIMA TEMPO
document.addEventListener('DOMContentLoaded', async () => {
    // Simulação de resposta (pode ser substituída por fetch real de uma API)
    const data = {
      current: "Ensolarado — 22 °C",
      hourly: [
        { time: "12h", temp: "22 °C", desc: "Ensolarado" },
        { time: "13h", temp: "23 °C", desc: "Ensolarado" },
        { time: "14h", temp: "22 °C", desc: "Ensolarado" },
        // ... continue preenchendo conforme necessidade
      ]
    };

    document.getElementById("current").textContent = `Agora: ${data.current}`;

    const hourlyDiv = document.getElementById("hourly");
    data.hourly.forEach(item => {
      const el = document.createElement("div");
      el.className = "p-2 bg-white rounded";
      el.innerHTML = `<span class="font-semibold">${item.time}</span><br>${item.desc} – ${item.temp}`;
      hourlyDiv.appendChild(el);
    });
  });

  // FUNÇÃO PARA ANIMAR COMPONENTES DA TELA
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-anime]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Opcional: parar de observar o elemento após a animação
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Usa a viewport como referência
    rootMargin: '0px', // Margem adicional (ajustável)
    threshold: 0.2 // Dispara quando 20% do elemento está visível
  });

  elements.forEach(element => {
    observer.observe(element);
  });
});
animeScroll();

if(target.length) {
  window.addEventListener('scroll', debounce(function() {
    animeScroll();
  }, 200));
}

// FUNÇÃO PARA FECHAR MENU MOBILE

function slideOut() {
  document.getElementById('check').checked = false;
}