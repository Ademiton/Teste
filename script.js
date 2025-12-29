document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('productTrack');
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');

    if (!track || !btnLeft || !btnRight) return;

    const scrollAmount = () => Math.round(track.clientWidth * 0.8);

    function updateButtons() {
        btnLeft.disabled = track.scrollLeft <= 0;
        // small tolerance
        btnRight.disabled = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;
    }

    btnLeft.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    // Atualiza estado dos botões durante a rolagem (touch/drag)
    track.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    // Inicializa estado
    updateButtons();

    // Acessibilidade: permitir setas do teclado quando o container está em foco
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            track.scrollBy({ left: 160, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            track.scrollBy({ left: -160, behavior: 'smooth' });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();

        products.forEach(product => {
            const name = product.querySelector('h4')?.textContent.toLowerCase();

            if (name && name.includes(term)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.querySelector('.search-icon').addEventListener('click', () => {
    const termo = document.getElementById('searchInput').value;
    alert('Buscar por: ' + termo);
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeMenu');

    if (!menuBtn || !overlay || !closeBtn) {
        console.error('Erro: elementos do menu não encontrados');
        return;
    }

    menuBtn.addEventListener('click', () => {
        document.body.classList.add('menu-open');
    });

    closeBtn.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
    });

    overlay.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.cep-toggle');
    const box = document.querySelector('.cep-box');
    const okBtn = document.getElementById('cepOk');
    const input = document.getElementById('cepInput');
    const text = document.getElementById('cepText');

    if (!toggle || !box) {
        console.warn('CEP: elementos não encontrados');
        return;
    }

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        box.style.display =
            box.style.display === 'flex' ? 'none' : 'flex';
    });

    okBtn?.addEventListener('click', () => {
        const cep = input.value.trim();
        if (cep.length >= 8) {
            text.textContent = `Enviar p/ ${cep}`;
            box.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!box.contains(e.target) && !toggle.contains(e.target)) {
            box.style.display = 'none';
        }
    });
});