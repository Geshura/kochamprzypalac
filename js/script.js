document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const ref = parseFloat(input.dataset.referencja);
      const val = parseFloat(input.value);
      const multiplier = val / ref;

      const lista = document.querySelector(`ul[data-id="${input.id.replace('waga', '')}"]`);
      const items = lista.querySelectorAll('li');

      items.forEach(item => {
        const ilosc = parseFloat(item.dataset.ilosc);
        const nowaIlosc = (ilosc * multiplier).toFixed(1);
        const jednostka = item.textContent.replace(/[0-9.,]+/g, '').trim();
        const skladnik = item.textContent.replace(/^.*?[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+\s/, '');
        item.textContent = `${nowaIlosc} ${jednostka} ${skladnik}`;
      });
    });
  });

  document.getElementById('gora').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
