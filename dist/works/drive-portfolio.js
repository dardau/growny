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
  for (const link of document.querySelectorAll('[data-preview], [data-video]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.closest('article').querySelector('h2').textContent;
      sourceLink.href = link.href;
      const { video, preview } = link.dataset;
      sourceLink.hidden = Boolean(video && new URL(video, location.href).href === link.href);
      const embed = document.createElement(video ? 'video' : 'iframe');
      if (video) {
        embed.controls = true;
        embed.playsInline = true;
        embed.preload = 'metadata';
        embed.poster = link.querySelector('img').src;
        embed.setAttribute('aria-label', title.textContent);
        embed.src = video;
      } else {
        embed.title = title.textContent;
        embed.src = preview;
        embed.allowFullscreen = true;
      }
      frame.replaceChildren(embed);
      player.showModal();
    });
  }
  player.addEventListener('close', () => {
    frame.querySelector('video')?.pause();
    frame.replaceChildren();
  });
}
