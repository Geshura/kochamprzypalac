document.addEventListener('DOMContentLoaded', () => {
  // --- Slider obrazów ---
  const sliders = document.querySelectorAll('.image-slider');

  sliders.forEach(slider => {
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }, 3500);
  });

  // --- Regulacja wag składników ---
  const weightInputs = document.querySelectorAll('.weight-input');

  weightInputs.forEach(input => {
    input.addEventListener('input', () => {
      let newWeight = parseFloat(input.value);
      if (isNaN(newWeight) || newWeight <= 0) return;

      const wrapper = input.closest('.ingredients-wrapper');
      const list = wrapper.querySelector('.ingredients-list');
      const baseWeight = parseFloat(list.dataset.baseWeight);

      // Współczynnik skalowania
      const scale = newWeight / baseWeight;

      list.querySelectorAll('li').forEach(li => {
        const originalAmount = li.dataset.amount;

        // Jeśli ilość jest liczbą, przelicz ją
        if (!isNaN(originalAmount)) {
          const amountNum = parseFloat(originalAmount);
          const unit = li.dataset.unit;
          const scaledAmount = Math.round(amountNum * scale * 10) / 10; // 1 miejsce po przecinku
          li.textContent = `${li.textContent.split('–')[0].trim()} – ${scaledAmount} ${unit}`.trim();
        }
      });
    });
  });

  // --- Scroll to top ---
  const scrollBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
