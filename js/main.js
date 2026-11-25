function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderProjects() {
  const list = document.getElementById('project-list');
  if (!projects.length) {
    list.appendChild(el('p', 'empty', '# nothing here yet — the first project is on its way.'));
    return;
  }

  projects.forEach((p) => {
    const item = p.link ? el('a', 'row project') : el('div', 'row project');
    if (p.link) {
      item.href = p.link;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
    }

    item.appendChild(el('span', 'date', p.date || ''));

    const body = el('div', 'row-body');
    body.appendChild(el('span', 'title', p.title + '/'));
    if (p.description) body.appendChild(el('span', 'muted', p.description));
    item.appendChild(body);

    if (p.tags && p.tags.length) item.appendChild(el('span', 'tags', p.tags.join(' ')));

    list.appendChild(item);
  });
}

function renderCertificates() {
  const grid = document.getElementById('cert-list');

  certificates.forEach((c) => {
    const card = el('div', 'cert');

    if (c.badge) {
      const img = el('img', 'badge');
      img.src = c.badge;
      img.alt = c.code + ' badge';
      img.loading = 'lazy';
      card.appendChild(img);
    } else {
      const ph = el('div', 'badge-placeholder', 'badge');
      ph.setAttribute('aria-hidden', 'true');
      card.appendChild(ph);
    }

    card.appendChild(el('span', 'code', c.code));
    card.appendChild(el('span', 'subject', c.subject));
    if (c.issuer) card.appendChild(el('span', 'issuer', c.issuer));

    const done = c.status === 'certified';
    card.appendChild(el('span', done ? 'status' : 'status pending', done ? '✓ certified' : '… ' + c.status));

    if (c.verify) {
      const link = el('a', 'verify', 'verify →');
      link.href = c.verify;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Verify ' + c.code + ' credential');
      card.appendChild(link);
    }

    grid.appendChild(card);
  });
}

function typeName() {
  const heading = document.querySelector('.typed-name');
  const target = document.getElementById('typed');
  if (!heading || !target) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const text = target.textContent;
  target.textContent = '';
  heading.classList.add('typing');

  let i = 0;
  function next() {
    target.textContent = text.slice(0, ++i);
    if (i < text.length) {
      const delay = 55 + Math.random() * 70 + (text[i - 1] === ' ' ? 90 : 0);
      setTimeout(next, delay);
    } else {
      heading.classList.remove('typing');
    }
  }
  setTimeout(next, 450);
}

renderProjects();
renderCertificates();
typeName();
document.getElementById('year').textContent = new Date().getFullYear();
