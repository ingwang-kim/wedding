document.addEventListener('DOMContentLoaded', () => {
  renderCover();
  renderGreeting();
  renderSchedule();
  renderGallery();
  renderLocation();
  renderAccounts();
  initShare();
  initScrollReveal();
  initMusic();
});

// ---------- 1. 커버 ----------
function renderCover() {
  document.getElementById('cover-groom').textContent = CONFIG.groom.name;
  document.getElementById('cover-bride').textContent = CONFIG.bride.name;
  const d = new Date(CONFIG.wedding.dateTime);
  document.getElementById('cover-date').textContent =
    `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}. ${['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()]}`;
}

// ---------- 2. 인사말 ----------
function renderGreeting() {
  document.getElementById('greeting-title').textContent = CONFIG.greeting.title;
  document.getElementById('greeting-message').textContent = CONFIG.greeting.message;
  document.getElementById('groom-parents').textContent = `${CONFIG.groom.father}·${CONFIG.groom.mother}`;
  document.getElementById('groom-label').textContent = CONFIG.groom.label;
  document.getElementById('groom-name').textContent = CONFIG.groom.name;
  document.getElementById('bride-parents').textContent = `${CONFIG.bride.father}·${CONFIG.bride.mother}`;
  document.getElementById('bride-label').textContent = CONFIG.bride.label;
  document.getElementById('bride-name').textContent = CONFIG.bride.name;
}

// ---------- 3. 일정 / 달력 ----------
function renderSchedule() {
  document.getElementById('wedding-date-label').textContent = CONFIG.wedding.dateLabel;
  document.getElementById('wedding-venue-label').textContent = CONFIG.wedding.venueName;

  const weddingDate = new Date(CONFIG.wedding.dateTime);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const wDay = new Date(weddingDate);
  wDay.setHours(0, 0, 0, 0);
  const diffDays = Math.round((wDay - today) / 86400000);

  const ddayEl = document.getElementById('dday');
  if (diffDays > 0) {
    ddayEl.innerHTML = `<span class="dday-caption">인광 <em>♥</em> 소진의 결혼식까지</span><span class="dday-num">D-${diffDays}</span>`;
  } else if (diffDays === 0) {
    ddayEl.innerHTML = `<span class="dday-caption">오늘 결혼식이 열립니다</span><span class="dday-num">D-DAY</span>`;
  } else {
    ddayEl.innerHTML = `<span class="dday-caption">저희의 결혼식이 있었습니다</span>`;
  }

  document.getElementById('calendar').innerHTML = buildCalendarHTML(weddingDate);
}

function buildCalendarHTML(weddingDate) {
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let html = `<div class="calendar-month">${year}년 ${month + 1}월</div>`;
  html += '<div class="calendar-grid">';
  ['일', '월', '화', '수', '목', '금', '토'].forEach(d => (html += `<div class="dow">${d}</div>`));

  for (let i = 0; i < firstDow; i++) html += '<div class="day empty"></div>';

  for (let date = 1; date <= lastDate; date++) {
    const dow = new Date(year, month, date).getDay();
    const classes = ['day'];
    if (dow === 0) classes.push('sun');
    if (dow === 6) classes.push('sat');
    if (date === weddingDate.getDate()) {
      classes.push('wedding-day');
      html += `<div class="${classes.join(' ')}"><span>${date}</span></div>`;
    } else {
      html += `<div class="${classes.join(' ')}">${date}</div>`;
    }
  }
  html += '</div>';
  return html;
}

// ---------- 4. 갤러리 ----------
const GALLERY_PAGE_SIZE = 9; // 3x3

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  const moreBtn = document.getElementById('gallery-more');

  const renderUpTo = count => {
    grid.innerHTML = CONFIG.gallery
      .slice(0, count)
      .map((src, i) => `<img src="${src}" alt="갤러리 사진 ${i + 1}" data-index="${i}" loading="lazy" />`)
      .join('');

    grid.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', () => openLightbox(Number(img.dataset.index)));
    });

    moreBtn.hidden = count >= CONFIG.gallery.length;
  };

  renderUpTo(Math.min(GALLERY_PAGE_SIZE, CONFIG.gallery.length));
  moreBtn.addEventListener('click', () => renderUpTo(CONFIG.gallery.length));

  initLightbox();
}

let lightboxIndex = 0;
function initLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => moveLightbox(1));

  const lb = document.getElementById('lightbox');
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => (touchStartX = e.changedTouches[0].clientX));
  lb.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) moveLightbox(-1);
    else if (delta < -50) moveLightbox(1);
  });
}
function openLightbox(index) {
  lightboxIndex = index;
  document.getElementById('lightbox-img').src = CONFIG.gallery[index];
  document.getElementById('lightbox').hidden = false;
}
function closeLightbox() {
  document.getElementById('lightbox').hidden = true;
}
function moveLightbox(delta) {
  lightboxIndex = (lightboxIndex + delta + CONFIG.gallery.length) % CONFIG.gallery.length;
  document.getElementById('lightbox-img').src = CONFIG.gallery[lightboxIndex];
}

// ---------- 5. 오시는 길 ----------
function renderLocation() {
  const { venueName, venueAddress, transitInfo } = CONFIG.wedding;
  document.getElementById('venue-name').textContent = venueName;
  document.getElementById('venue-address').textContent = venueAddress;

  const encodedAddr = encodeURIComponent(venueAddress);
  const encodedName = encodeURIComponent(venueName);
  document.getElementById('map-links').innerHTML = `
    <a href="https://map.kakao.com/link/search/${encodedAddr}" target="_blank" rel="noopener">카카오맵</a>
    <a href="https://map.naver.com/v5/search/${encodedAddr}" target="_blank" rel="noopener">네이버지도</a>
    <a href="tmap://search?name=${encodedName}" target="_blank" rel="noopener">티맵</a>
  `;

  document.getElementById('transit-info').innerHTML = transitInfo
    .map(t => `<span class="transit-label">${t.label}</span><span class="transit-detail">${t.detail}</span>`)
    .join('');

  loadKakaoMap();
}

function loadKakaoMap() {
  const { lat, lng, kakaoJsKey, image } = CONFIG.map;
  const mapBox = document.getElementById('map');

  if (!kakaoJsKey) {
    // 키 미설정 시 약도 이미지로 대체 (없으면 회색 박스만 표시)
    if (image) mapBox.innerHTML = `<img src="${image}" alt="오시는 길 약도" />`;
    return;
  }

  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoJsKey}&autoload=false`;
  script.onload = () => {
    try {
      kakao.maps.load(() => {
        try {
          const map = new kakao.maps.Map(mapBox, {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
          });
          new kakao.maps.Marker({ position: map.getCenter(), map });
        } catch (err) {
          showMapError(mapBox, err);
        }
      });
    } catch (err) {
      showMapError(mapBox, err);
    }
  };
  script.onerror = () => showMapError(mapBox, new Error('sdk.js 스크립트 로드 자체가 실패했습니다 (네트워크/키 형식 확인)'));
  document.head.appendChild(script);
}

function showMapError(mapBox, err) {
  console.error('카카오맵 로드 실패:', err);
  mapBox.innerHTML = `<div style="padding:16px;font-size:12px;line-height:1.6;color:#a33;text-align:left;">
    지도를 불러오지 못했습니다.<br/>
    → 카카오 디벨로퍼스에서 이 키가 <b>JavaScript 키</b>인지, <b>Web 플랫폼에 현재 주소(${location.origin})</b>가 등록돼 있는지 확인해주세요.<br/>
    <span style="opacity:.7">${err.message || err}</span>
  </div>`;
}

// ---------- 6. 계좌번호 ----------
function renderAccounts() {
  document.getElementById('groom-account').innerHTML = accountRowsHTML(CONFIG.groom);
  document.getElementById('bride-account').innerHTML = accountRowsHTML(CONFIG.bride);

  document.querySelectorAll('.account-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const isOpen = !target.hidden;
      target.hidden = isOpen;
      btn.classList.toggle('active', !isOpen);
    });
  });

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyToClipboard(btn.dataset.copy, '계좌번호가 복사되었습니다'));
  });
}
function accountRowsHTML(person) {
  return person.accounts
    .filter(a => a.number) // 번호 없는 항목(아직 안 채운 부모 계좌 등)은 표시하지 않음
    .map(
      a => `
    <div class="account-row">
      <div>
        <div class="who">${a.who} · ${a.holder}</div>
        <div class="num">${a.bank} ${a.number}</div>
      </div>
      <button data-copy="${a.number}">복사</button>
    </div>`
    )
    .join('');
}

// ---------- 7. 공유하기 ----------
function initShare() {
  const { kakaoJsKey, title, description, imageUrl, url } = CONFIG.share;

  if (kakaoJsKey && window.Kakao) {
    Kakao.init(kakaoJsKey);
  }

  document.getElementById('kakao-share-btn').addEventListener('click', () => {
    if (!(kakaoJsKey && window.Kakao && Kakao.isInitialized())) {
      copyToClipboard(url, 'js/config.js에 카카오 키를 설정하면 카카오톡 공유가 가능합니다. 링크가 복사되었습니다');
      return;
    }
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [{ title: '청첩장 보기', link: { mobileWebUrl: url, webUrl: url } }],
    });
  });

  document.getElementById('copy-link-btn').addEventListener('click', () => {
    copyToClipboard(url, '링크가 복사되었습니다');
  });
}

function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => showToast(message));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ---------- 배경음악 ----------
function initMusic() {
  const { src, autoplay = true, volume = 0.5 } = CONFIG.music || {};
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bgm');
  if (!src) return; // src 없으면 버튼 숨김 상태 유지

  audio.src = src;
  audio.volume = volume;
  btn.hidden = false;

  let isPlaying = false;
  const updateIcon = () => btn.classList.toggle('spinning', isPlaying);
  const attemptPlay = () => {
    audio
      .play()
      .then(() => { isPlaying = true; updateIcon(); })
      .catch(() => { isPlaying = false; updateIcon(); });
  };

  if (autoplay) attemptPlay();

  // iOS 등에서 자동재생이 막히면, 화면 첫 터치/클릭 시 대신 재생
  const resumeOnFirstInteract = () => {
    if (!isPlaying) attemptPlay();
  };
  document.addEventListener('touchstart', resumeOnFirstInteract, { once: true });
  document.addEventListener('click', resumeOnFirstInteract, { once: true });

  btn.addEventListener('click', e => {
    e.stopPropagation(); // 버튼 클릭이 위 first-interact 핸들러로 번져 재생/정지가 겹치지 않도록 차단
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      updateIcon();
    } else {
      attemptPlay(); // 재생 성공 여부에 따라 attemptPlay 내부에서 isPlaying과 아이콘을 갱신함
    }
  });
}

// ---------- 스크롤 등장 애니메이션 ----------
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach(t => observer.observe(t));
}
