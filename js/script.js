document.addEventListener('DOMContentLoaded', () => {
  // Funkcja przeliczająca składniki na podstawie nowej wagi
  function updateIngredients(ingredientsList, newWeight) {
    const baseWeight = Number(ingredientsList.dataset.baseWeight);
    if (!baseWeight || baseWeight === 0) return;

    const factor = newWeight / baseWeight;

    ingredientsList.querySelectorAll('li').forEach(li => {
      const baseAmount = Number(li.dataset.amount);
      const unit = li.dataset.unit || '';
      if (isNaN(baseAmount)) return;

      let adjustedAmount = baseAmount * factor;

      // Zaokrąglanie liczb - jeśli to liczba całkowita, nie pokazuj miejsc po przecinku
      if (adjustedAmount % 1 === 0) {
        adjustedAmount = adjustedAmount.toFixed(0);
      } else {
        adjustedAmount = adjustedAmount.toFixed(2);
      }

      // Przykładowy tekst do wyświetlenia:
      // Nazwa składnika jest już w li, więc zamieniamy tylko ilość
      // załóżmy, że w li jest np.: "Makaron – 200 g"
      // Więc rozbijamy tekst po " – " i zmieniamy liczbę + jednostkę

      // Możemy zrobić prostsze podejście: pokazujemy tylko "Ilość jednostka"
      // ale by zachować nazwę, zrobimy regex.

      // Załóżmy tekst: "Makaron – 200 g"
      // Zamienimy część "200 g" na "adjustedAmount unit"

      const originalText = li.textContent;

      // RegEx do znalezienia ilości i jednostki na końcu tekstu
      const replacedText = originalText.replace(/[\d.,]+ ?\w*$/g, `${adjustedAmount} ${unit}`.trim());

      li.textContent = replacedText;
    });
  }

  // Obsługa inputów wagi
  const weightInputs = document.querySelectorAll('.weight-input');
  weightInputs.forEach(input => {
    const ingredientsList = input.closest('.ingredients-wrapper').querySelector('.ingredients-list');

    input.addEventListener('input', () => {
      let val = Number(input.value);
      if (isNaN(val) || val <= 0) {
        val = Number(ingredientsList.dataset.baseWeight);
        input.value = val;
      }
      updateIngredients(ingredientsList, val);
    });

    // Inicjalne wywołanie, by upewnić się że składniki są na start poprawne
    updateIngredients(ingredientsList, Number(input.value));
  });

  // Scroll to top
  const scrollBtn = document.getElementById('scrollToTop');
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Opcjonalnie: pokaż przycisk tylko gdy przewinięto trochę
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  // Ukryj przycisk na start
  scrollBtn.style.display = 'none';
});
