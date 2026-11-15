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
const reelLink = document.querySelector('#reel-link');

if (typeof player.showModal === 'function') {
  for (const link of document.querySelectorAll('[data-reel]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.closest('article').querySelector('h2').textContent;
      reelLink.href = link.href;
      const embed = document.createElement('iframe');
      embed.title = title.textContent;
      embed.src = 'https://www.instagram.com/reel/' + link.dataset.reel + '/embed/';
      embed.allowFullscreen = true;
      frame.replaceChildren(embed);
      player.showModal();
    });
  }
  player.addEventListener('close', () => frame.replaceChildren());
}
