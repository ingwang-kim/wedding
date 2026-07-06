// ============================================
// 청첩장 콘텐츠 설정 — 여기 값만 바꾸면 화면에 전부 반영됩니다.
// ============================================
const CONFIG = {
  // 브라우저 탭 제목 & 카카오톡/문자 공유 시 노출되는 정보
  share: {
    title: '인광 ♥ 소진 결혼합니다',
    description: '2026년 11월 7일 토요일 오전 11시, 강변웨딩스퀘어에서 소중한 분들을 모십니다.',
    // 공유 미리보기에 뜨는 이미지 (정사각형에 가까운 비율 권장, 최소 400x400)
    imageUrl: 'https://ik-sj.netlify.app/images/og-image.jpg',
    // 배포 후 실제 접속 주소로 변경
    url: 'https://ik-sj.netlify.app/',
    // 카카오 디벨로퍼스(developers.kakao.com)에서 발급받은 JavaScript 키
    // 비워두면 '카카오톡 공유' 버튼 대신 '링크 복사'만 동작합니다.
    kakaoJsKey: '16ce0c7885a3b2d2c7cca62ce7b5741b',
  },

  // 신랑 정보
  groom: {
    name: '김인광',
    label: '차남',
    phone: '010-4597-9851',
    father: '김철승',
    mother: '강경희',
    accounts: [
      { who: '신랑', bank: '신한은행', number: '110-549-067679', holder: '김인광' },
      { who: '신랑 아버지', bank: '하나은행', number: '350-890508-53307', holder: '김철승' },
      { who: '신랑 어머니', bank: '하나은행', number: '37819022268', holder: '강경희' },
    ],
  },

  // 신부 정보
  bride: {
    name: '경소진',
    label: '차녀',
    phone: '010-9111-2822',
    father: '경태준',
    mother: '주은혜',
    accounts: [
      { who: '신부', bank: '카카오뱅크', number: '3333-022861-782', holder: '경소진' },
      { who: '신부 아버지', bank: '농협은행', number: '527031-52-074198', holder: '경태준' },
      { who: '신부 어머니', bank: '국민은행', number: '631201-04-103601', holder: '주은혜' },
    ],
  },

  // 인사말
  greeting: {
    title: '초대합니다',
    message:
      '서로에게 가장 든든한 편이자\n인생의 가장 좋은 친구가 되려 합니다.\n\n혼자보다 둘이기에 더 단단해지는 마음으로\n다정하고 밝은 내일을 그려가겠습니다.\n그 약속의 자리에 함께해주시면 감사하겠습니다.',
  },

  // 예식 일정
  wedding: {
    // ISO 형식, 24시간제
    dateTime: '2026-11-07T11:00:00',
    dateLabel: '2026년 11월 7일 토요일 오전 11시',
    venueName: '강변웨딩스퀘어 (강변테크노마트 4층)',
    venueAddress: '서울특별시 광진구 광나루로56길 85 강변테크노마트 3, 4층',
    venueTel: '02-3424-7000',
    // 대중교통/주차 등 안내 문구
    transitInfo: [
      { label: '지하철', detail: '2호선 강변역 1번 또는 2번 출구 지하통로 연결 (테크노마트 판매동 지하1층 직결)' },
      { label: '버스(시외/고속)', detail: '동서울종합버스터미널 하차 후 강변역 통로 이용' },
      { label: '버스(시내)', detail: '강변역 A·B·C·D 정류장 하차 — 1, 9, 11, 13, 93, 100, 1112, 1650, 5600번 등' },
      { label: '자가용', detail: '내비게이션에 "강변역" 또는 "강변테크노마트" 검색' },
      { label: '주차', detail: '테크노마트 주차장(B2~B5) 이용 — 4층 이동 시 엘리베이터가 혼잡하니 에스컬레이터 이용 권장' },
    ],
  },

  // 지도 — kakaoJsKey를 넣으면 인터랙티브 지도가, 비워두면 image 경로의 약도 이미지가 표시됩니다.
  map: {
    lat: 37.5358,
    lng: 127.0946,
    kakaoJsKey: '7516dc6a1c1ee796663535bec2ddfd50',
    image: 'images/map.jpg',
  },

  // 갤러리 — images/gallery 폴더에 사진을 넣고 파일명만 맞춰주세요
  gallery: [
    'images/gallery/1-1.jpg',
    'images/gallery/2-1.jpg',
    'images/gallery/3-3.jpg',
    'images/gallery/4-2.jpg',
    'images/gallery/1-2.jpg',
    'images/gallery/2-3.jpg',
    'images/gallery/1-4.jpg',
    'images/gallery/3-1.jpg',
    'images/gallery/4-1.jpg',
    'images/gallery/1-5.jpg',
    'images/gallery/2-2.jpg',
    'images/gallery/1-3.jpg',
    'images/gallery/3-2.jpg',
    'images/gallery/4-3.jpg',
    'images/gallery/2-4.jpg',
  ],

  // 커버(첫 화면) 이미지
  coverImage: 'images/cover.jpg',

  // 배경음악 — audio 폴더에 파일을 넣고 경로만 맞춰주세요. src를 비워두면 버튼이 숨겨집니다.
  music: {
    src: 'audio/bgm.mp3',
    autoplay: true,
    volume: 0.5,
  },
};
