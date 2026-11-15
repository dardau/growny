const filterBar = document.querySelector('.portfolio-filters');
const filters = filterBar.querySelectorAll('button');
const cards = document.querySelectorAll('.portfolio-card');
filterBar.hidden = false;

for (const filter of filters) {
  filter.addEventListener('click', () => {
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(button === filter));
    }
    for (const card of cards) {
      card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
    }
  });
}

const player = document.querySelector('#player');
const frame = document.querySelector('#video-frame');
const title = document.querySelector('#player-title');
const sourceLink = document.querySelector('#source-link');

if (typeof player.showModal === 'function') {
  for (const link of document.querySelectorAll('[data-preview]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.closest('article').querySelector('h2').textContent;
      sourceLink.href = link.href;
      const embed = document.createElement('iframe');
      embed.title = title.textContent;
      embed.src = link.dataset.preview;
      embed.allowFullscreen = true;
      frame.replaceChildren(embed);
      player.showModal();
    });
  }
  player.addEventListener('close', () => frame.replaceChildren());
}
