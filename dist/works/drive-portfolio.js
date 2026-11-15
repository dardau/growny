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
  for (const link of document.querySelectorAll('[data-video]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.closest('article').querySelector('h2').textContent;
      sourceLink.href = link.href;
      const { video } = link.dataset;
      sourceLink.hidden = new URL(video, location.href).href === link.href;
      const movie = document.createElement('video');
      movie.controls = true;
      movie.playsInline = true;
      movie.preload = 'metadata';
      movie.poster = link.querySelector('img').src;
      movie.setAttribute('aria-label', title.textContent);
      movie.src = video;
      frame.replaceChildren(movie);
      player.showModal();
    });
  }
  player.addEventListener('close', () => {
    frame.querySelector('video')?.pause();
    frame.replaceChildren();
  });
}
