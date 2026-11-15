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
const featured = document.querySelector('.feature-player');
const picker = document.querySelector('.feature-picker');
const choices = picker.querySelectorAll('[data-feature]');

picker.hidden = false;
for (const choice of choices) {
  choice.addEventListener('click', () => {
    const card = document.getElementById(choice.dataset.feature);
    const poster = card.querySelector('[data-video]');
    featured.href = poster.href;
    featured.dataset.video = poster.dataset.video;
    featured.setAttribute('aria-label', poster.getAttribute('aria-label'));
    featured.querySelector('img').src = poster.querySelector('img').src;
    featured.querySelector('.feature-caption strong').textContent = card.querySelector('h3').textContent;
    featured.querySelector('.feature-caption span').textContent = `${card.querySelector('.portfolio-type').textContent} · ${choice.dataset.length}`;
    for (const button of choices) {
      button.setAttribute('aria-pressed', String(button === choice));
    }
  });
}

if (typeof player.showModal === 'function') {
  for (const link of document.querySelectorAll('[data-video]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.querySelector('strong')?.textContent || link.closest('article').querySelector('h3').textContent;
      const { video } = link.dataset;
      player.classList.toggle('player-portrait', link.hasAttribute('data-portrait'));
      const movie = document.createElement('video');
      movie.controls = true;
      movie.playsInline = true;
      movie.preload = 'metadata';
      movie.poster = link.querySelector('img').src;
      movie.setAttribute('aria-label', title.textContent);
      movie.addEventListener('error', () => {
        const notice = document.createElement('p');
        notice.className = 'player-notice';
        notice.setAttribute('role', 'status');
        notice.textContent = 'Не удалось загрузить видео. ';
        const retry = document.createElement('a');
        retry.className = 'text-link';
        retry.href = video;
        retry.textContent = 'Открыть файл';
        notice.append(retry);
        frame.replaceChildren(notice);
      }, { once: true });
      movie.src = video;
      frame.replaceChildren(movie);
      player.showModal();
      movie.play().catch(() => {});
    });
  }
  player.addEventListener('close', () => {
    frame.querySelector('video')?.pause();
    frame.replaceChildren();
  });
}
