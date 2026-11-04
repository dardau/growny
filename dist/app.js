const format = document.getElementById('format');
for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', () => { format.value = link.dataset.service; });
}
document.getElementById('brief').addEventListener('submit', async (event) => {
  event.preventDefault();
  const idea = document.getElementById('idea').value.trim();
  const date = document.getElementById('deadline').value;
  const text = ['Здравствуйте, Growny! Хочу обсудить проект.', 'Формат: ' + format.value, idea && 'Идея: ' + idea, date && 'Дата: ' + date.split('-').reverse().join('.')].filter(Boolean).join('\n');
  const status = document.getElementById('brief-status');
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Бриф скопирован. Откройте Direct ниже и вставьте его в сообщение.';
  } catch {
    status.textContent = 'Не удалось скопировать автоматически. Выделите текст ниже и скопируйте вручную.';
    let fallback = document.getElementById('brief-copy');
    if (!fallback) {
      fallback = document.createElement('textarea');
      fallback.id = 'brief-copy';
      fallback.setAttribute('aria-label', 'Текст брифа для копирования');
      status.after(fallback);
    }
    fallback.value = text;
    fallback.focus();
    fallback.select();
  }
});
