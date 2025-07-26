// Po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  const weightInputs = document.querySelectorAll('.weight-input');
  const scrollTopBtn = document.getElementById('scroll-top');

  // Funkcja przeliczająca składniki
  function recalcIngredients(input) {
    const container = input.closest('.ingredients-container');
    const baseWeight = parseFloat(container.querySelector('.ingredients').dataset.baseWeight);
    const newWeight = parseFloat(input.value);

    if (isNaN(newWeight) || newWeight <= 0) return;

    const ratio = newWeight / baseWeight;

    const qtyElements = container.querySelectorAll('.qty');
    qtyElements.forEach(qtyEl => {
      const baseQty = parseFloat(qtyEl.textContent);
      if (!isNaN(baseQty)) {
        // Zaokrąglamy do 1 miejsca po przecinku, jeśli ułamek
        let newQty = baseQty * ratio;
        if (!Number.isInteger(newQty)) {
          newQty = newQty.toFixed(1);
        }
        qtyEl.textContent = newQty;
      }
    });
  }

  // Podłączamy event listener do każdego inputu wagi
  weightInputs.forEach(input => {
    input.addEventListener('input', () => recalcIngredients(input));
  });

  // Scroll to top: pokazuj/przycinaj przycisk
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  // Obsługa kliknięcia przycisku scroll to top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll dla linków nawigacji
  const navLinks = document.querySelectorAll('#recipe-nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
