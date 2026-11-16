(() => {
  'use strict';
  const bag = document.querySelector('#bag-dialog');
  const recipe = document.querySelector('#recipe-dialog');
  const quantity = document.querySelector('#quantity');
  let selected = 1;
  let bagQuantity = 0;
  try { bagQuantity = Math.min(99, Math.max(0, parseInt(localStorage.getItem('pistacia-bag'), 10) || 0)); } catch {}
  const save = () => { try { localStorage.setItem('pistacia-bag', String(bagQuantity)); } catch {} };
  const sync = () => {
    document.querySelectorAll('.bag-count').forEach(el => { el.textContent = bagQuantity; });
    document.querySelectorAll('[data-quantity]').forEach(el => { el.disabled = selected === (Number(el.dataset.quantity) < 0 ? 1 : 99); });
    quantity.textContent = selected;
    save();
  };
  function open(dialog) { dialog.showModal(); document.body.classList.add('dialog-open'); }
  function close(dialog) { dialog.close(); }
  [bag, recipe].forEach(dialog => {
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
    dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(dialog); } });
  });
  function renderBag() {
    const content = document.querySelector('#bag-content');
    if (!bagQuantity) {
      content.innerHTML = '<div class="empty-bag"><p>A little joy belongs in here.</p><a class="button button-dark" href="#shop" data-continue>Explore the spread <span>↗</span></a></div>';
      content.querySelector('[data-continue]').addEventListener('click', () => close(bag));
      return;
    }
    content.innerHTML = `<div class="bag-item"><img src="assets/pistacia-jars.jpg" alt="Pistacia spread jar"><div><h3>The Original</h3><p>Pistachio Spread · 300g</p><p>Pricing on request</p><div class="bag-actions"><button data-bag-change="-1" aria-label="Remove one jar">−</button><output aria-label="Jars in bag" aria-live="polite">${bagQuantity}</output><button data-bag-change="1" aria-label="Add one jar" ${bagQuantity >= 99 ? 'disabled' : ''}>+</button><button data-remove>Remove</button></div></div></div><div class="bag-summary"><p>${bagQuantity} ${bagQuantity === 1 ? 'jar' : 'jars'} of happiness.</p><p>This is a storefront preview. Checkout and payments will be available in the future Shopify store.</p><a class="button button-dark" id="inquiry-link">Ask about this bag <span>↗</span></a><small>The link opens an email draft to Pistacia. You can review it before sending. Pricing, availability, and delivery are confirmed directly by the brand.</small></div>`;
    const body = `Hello Pistacia! I’d like to ask about ${bagQuantity} x 300g jar${bagQuantity > 1 ? 's' : ''} of The Original Pistachio Spread. Could you share pricing, availability, and delivery details?`;
    content.querySelector('#inquiry-link').href = `mailto:pistaciaspread@gmail.com?subject=${encodeURIComponent('Pistacia product enquiry')}&body=${encodeURIComponent(body)}`;
    content.querySelectorAll('[data-bag-change]').forEach(el => el.addEventListener('click', () => { bagQuantity = Math.min(99, Math.max(0, bagQuantity + Number(el.dataset.bagChange))); sync(); renderBag(); const focusTarget = content.querySelector(bagQuantity ? '[data-bag-change]' : '[data-continue]'); focusTarget?.focus(); }));
    content.querySelector('[data-remove]').addEventListener('click', () => { bagQuantity = 0; sync(); renderBag(); content.querySelector('[data-continue]').focus(); });
  }
  document.querySelectorAll('[data-open-bag]').forEach(el => el.addEventListener('click', () => { renderBag(); open(bag); }));
  document.querySelector('[data-close-bag]').addEventListener('click', () => close(bag));
  document.querySelector('[data-close-recipe]').addEventListener('click', () => close(recipe));
  document.querySelectorAll('[data-quantity]').forEach(el => el.addEventListener('click', () => { selected = Math.min(99, Math.max(1, selected + Number(el.dataset.quantity))); sync(); }));
  document.querySelector('#add-to-bag').addEventListener('click', () => { bagQuantity = Math.min(99, bagQuantity + selected); sync(); renderBag(); document.querySelector('#add-status').textContent = `${bagQuantity} jars in your bag.`; open(bag); });
  const ideas = {
    toast: { title: 'A slower kind of morning.', description: 'Serving idea · Pistacia toast', steps: ['Toast a slice of your favourite bread until golden.', 'Spread with Pistacia while the toast is still warm.', 'Finish with chopped pistachios, if you like. Enjoy with your morning coffee.'] },
    dessert: { title: 'The sweetest finishing touch.', description: 'Serving idea · Pistacia crepes', steps: ['Prepare your favourite crepes.', 'Spread a spoonful of Pistacia over each warm crepe, then fold.', 'Top with berries or chopped pistachios and serve straight away.'] },
    smoothie: { title: 'Sip a little happiness.', description: 'Serving idea · Pistachio banana smoothie', steps: ['Add a banana, your preferred milk, and a few ice cubes to a blender.', 'Spoon in Pistacia to taste.', 'Blend until smooth, pour into a glass, and enjoy.'] }
  };
  document.querySelectorAll('[data-recipe]').forEach(el => el.addEventListener('click', () => {
    const idea = ideas[el.dataset.recipe];
    document.querySelector('#recipe-title').textContent = idea.title;
    document.querySelector('#recipe-description').textContent = idea.description;
    document.querySelector('#recipe-steps').replaceChildren(...idea.steps.map(step => { const li = document.createElement('li'); li.textContent = step; return li; }));
    open(recipe);
  }));
  document.querySelector('#recipe-shop').addEventListener('click', () => close(recipe));
  document.querySelector('#year').textContent = new Date().getFullYear();
  sync();
})();
