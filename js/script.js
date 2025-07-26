// Slider - automatyczna zmiana obrazów
document.querySelectorAll('.image-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  let current = 0;

  function showNextImage() {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }

  if(images.length > 1){
    setInterval(showNextImage, 4000);
  }
});

// Przelicznik wag składników
function updateIngredientsWeight(input) {
  const section = input.closest('.recipe');
  const ingredientsList = section.querySelector('.ingredients-list');
  const baseWeight = 500; // zakładamy bazową wagę 500g do przeliczeń
  const newWeight = parseFloat(input.value) || baseWeight;

  ingredientsList.querySelectorAll('li').forEach(li => {
    const baseAmount = parseFloat(li.dataset.amount);
    if (!isNaN(baseAmount)) {
      let newAmount = baseAmount * (newWeight / baseWeight);
      
      // Formatowanie liczb do 2 miejsc po przecinku i usuwanie niepotrzebnych zer
      if(newAmount % 1 !== 0) {
        newAmount = newAmount.toFixed(2).replace(/\.?0+$/, '');
      }

      // Przykład: "500 g piersi z kurczaka"
      // Rozbij na liczbę i resztę tekstu
      const textParts = li.textContent.trim().split(' ');
      textParts[0] = newAmount;
      li.textContent = textParts.join(' ');
    }
  });
}

// Nasłuchuj zmiany inputów z wagą
document.querySelectorAll('.weight-input').forEach(input => {
  input.addEventListener('input', () => updateIngredientsWeight(input));
  // Uruchom update od razu, by zaktualizować przy wczytaniu strony
  updateIngredientsWeight(input);
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});
