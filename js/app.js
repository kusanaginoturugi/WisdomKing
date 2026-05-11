const services = [
  {
    icon: '🪷',
    name: '超抜式挙行登録',
    englishName: 'Liberation Ceremony Registration',
    href: 'https://liberation.showway.biz/',
    description: {
      classic: ['故人の御霊の安らかな成仏を祈る超抜式のご登録を承っております。', '法要の日程・導師・参列者情報をご入力ください。'],
      modern: ['超抜式の挙行情報を登録・管理するシステムです。', '日程・担当者・参列者情報を入力してください。']
    },
    updated: '更新: 2026-04-16',
    action: { classic: '登録する', modern: '登録' }
  },
  {
    icon: '🛕',
    name: '道具販売登録システム',
    englishName: 'Item Sales Entry System',
    href: 'https://itementry.showway.biz/receipts',
    description: {
      classic: ['仏具・お守り・御札などの販売情報を登録・管理するシステムです。', '領収書の発行・売上の記録にご利用ください。'],
      modern: ['商品の販売情報を登録・管理するシステムです。', '領収書の発行・売上の記録にお使いください。']
    },
    updated: '更新: 2026-04-16',
    action: { classic: '登録する', modern: '登録' }
  },
  {
    icon: '🗄️',
    name: ['道具販売登録システム', '（2025年度版）'],
    englishName: 'Item Sales Entry — FY2025 Archive',
    href: 'https://itementry2025.showway.biz/',
    archived: true,
    description: {
      classic: ['2025年度のデータのみが格納されている旧システムです。', '閲覧・参照専用としてご利用ください。新規登録は現行システムへ。'],
      modern: ['2025年度データ専用の旧バージョンです。', '参照用としてお使いください。新規登録は現行版へ。']
    },
    updated: '2025年度データ',
    action: { classic: '閲覧する', modern: '閲覧' }
  },
  {
    icon: '🖩',
    name: 'テンキーレジシステム',
    englishName: 'Numpad Register System',
    href: 'https://register-xju.pages.dev/',
    description: {
      classic: ['テンキー操作に最適化されたシンプルなレジシステムです。', '窓口での会計・集金業務にお役立てください。'],
      modern: ['テンキー操作に最適化した軽量レジシステムです。', '窓口会計・集金業務にご利用ください。']
    },
    updated: '更新: 2026-04-16',
    action: '開く'
  },
  {
    icon: '📦',
    name: {
      classic: '聖明王院道具一括注文',
      modern: '道具一括注文'
    },
    englishName: 'Bulk Item Order System',
    href: 'https://bulkpurchase.showway.biz',
    description: {
      classic: ['仏具・法具などの道具を一括でご注文いただけるシステムです。', 'まとめて発注・在庫管理にご利用ください。'],
      modern: ['備品・道具をまとめて発注できるシステムです。', '一括注文・在庫管理に対応しています。']
    },
    updated: '更新: 2026-04-16',
    action: { classic: '注文する', modern: '注文' }
  },
  {
    icon: '🔥',
    name: {
      classic: ['八大明王護摩供', '代理奉納'],
      modern: '護摩供 代理奉納'
    },
    englishName: 'Hachidai Myōō Goma — Proxy Dedication',
    href: 'https://dedications.showway.biz/',
    description: {
      classic: ['八大明王護摩供のFAX申込書をもとに、祈願内容・施主情報を入力・登録するシステムです。'],
      modern: ['FAX申込書をもとに、申込内容と申込者情報を入力・登録するシステムです。']
    },
    updated: '更新: 2026-04-16',
    action: { classic: '入力する', modern: '入力' }
  },
  {
    icon: '🔑',
    name: 'pwnana',
    englishName: 'Password Generator',
    href: 'https://pwnana.kusanaginoturugi.workers.dev/',
    description: {
      classic: ['入力しやすいパスワードを生成する御道具です。', '覚えやすく、かつ安全な御符号をお作りいたします。'],
      modern: ['入力しやすいパスワードを生成するツールです。', 'タイプしやすい文字列で安全なパスワードを作成します。']
    },
    updated: '更新: 2026-04-18',
    action: { classic: '開く', modern: '開く' }
  }
];

const arrowSvg = `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
`;

function appendLines(parent, lines) {
  const values = Array.isArray(lines) ? lines : [lines];
  values.forEach((line, index) => {
    if (index > 0) parent.append(document.createElement('br'));
    parent.append(document.createTextNode(line));
  });
}

function appendThemeText(parent, value, className) {
  const span = document.createElement('span');
  span.className = className;
  appendLines(span, value);
  parent.append(span);
}

function appendThemePair(parent, value) {
  if (typeof value === 'string' || Array.isArray(value)) {
    appendLines(parent, value);
    return;
  }

  appendThemeText(parent, value.classic, 'v-classic');
  appendThemeText(parent, value.modern, 'v-modern');
}

function createServiceCard(service) {
  const card = document.createElement('a');
  card.className = `service-card${service.archived ? ' archived' : ''}`;
  card.href = service.href;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';

  if (service.archived) {
    const badge = document.createElement('span');
    badge.className = 'archive-badge';
    badge.textContent = 'Archive';
    card.append(badge);
  }

  const icon = document.createElement('div');
  icon.className = 'card-icon';
  icon.textContent = service.icon;
  card.append(icon);

  const name = document.createElement('div');
  name.className = 'card-name';
  appendThemePair(name, service.name);
  card.append(name);

  const englishName = document.createElement('div');
  englishName.className = 'card-name-en';
  englishName.textContent = service.englishName;
  card.append(englishName);

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  appendThemeText(desc, service.description.classic, 'v-classic');
  appendThemeText(desc, service.description.modern, 'v-modern');
  card.append(desc);

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.innerHTML = `
    <div class="card-status" data-state="checking">
      <span class="status-dot"></span>
      <span class="status-text">確認中…</span>
    </div>
  `;

  const updated = document.createElement('span');
  updated.className = 'card-updated';
  updated.textContent = service.updated;
  meta.append(updated);
  card.append(meta);

  const arrow = document.createElement('div');
  arrow.className = 'card-arrow';
  appendThemePair(arrow, service.action);
  arrow.insertAdjacentHTML('beforeend', arrowSvg);
  card.append(arrow);

  return card;
}

function renderServices() {
  const grid = document.getElementById('service-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  services.forEach(service => fragment.append(createServiceCard(service)));
  grid.append(fragment);
}

document.getElementById('year').textContent = new Date().getFullYear();

renderServices();

// ─── テーマ切替 ─────────────────────────────────────────
const STORAGE_KEY = 'wk-theme';
const btns = document.querySelectorAll('.theme-btn');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  btns.forEach(btn => btn.classList.toggle('active', btn.dataset.themeTarget === theme));
}

btns.forEach(btn => btn.addEventListener('click', () => applyTheme(btn.dataset.themeTarget)));
applyTheme(localStorage.getItem(STORAGE_KEY) || 'traditional');

// ─── 死活監視 ────────────────────────────────────────────
async function ping(url) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 7000);
  try {
    await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store', signal: ctrl.signal });
    clearTimeout(tid);
    return 'online';
  } catch {
    clearTimeout(tid);
    return 'offline';
  }
}

const STATE_LABEL = { checking: '確認中…', online: '稼働中', offline: 'オフライン' };

function setStatus(card, state) {
  const el  = card.querySelector('.card-status');
  const txt = card.querySelector('.status-text');
  if (!el || !txt) return;
  el.setAttribute('data-state', state);
  txt.textContent = STATE_LABEL[state];
}

(async () => {
  await Promise.all([...document.querySelectorAll('.service-card')].map(async card => {
    const url = card.getAttribute('href');
    if (url) setStatus(card, await ping(url));
  }));
})();
