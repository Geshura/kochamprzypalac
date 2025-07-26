document.querySelectorAll('.input-grams').forEach(input => {
  input.addEventListener('input', () => {
    const base = parseFloat(input.dataset.base);
    const newVal = parseFloat(input.value);
    const target = input.dataset.target;
    const list = document.querySelector(`.ingredients[data-id="${target}"]`);
    
    list.querySelectorAll('li').forEach(item => {
      const baseQty = parseFloat(item.dataset.qty);
      const newQty = (baseQty * newVal / base).toFixed(1);
      const text = item.textContent.replace(/^[0-9.,]+[a-z]* /, '');
      item.textContent = `${newQty}${item.textContent.match(/[a-z]+/)?.[0] || ''} ${text}`;
    });
  });
});

document.getElementById('to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
