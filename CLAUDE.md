# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 다룰 때 참고하는 가이드입니다.

> **이 파일(CLAUDE.md)은 항상 한글로 작성·수정한다.** 영어 원본은 `CLAUDE_EN.md`에 보관되어 있다.

## 프로젝트 개요

**MineMine** — 개인적으로 필요한 정보를 한눈에 모아보는 개인용 대시보드 서비스입니다. 외부 공공 API나 MCP로 데이터를 조회해 아이폰 위젯 같은 그리드로 보여주며, 사용자가 설정 화면에서 위젯을 골라 메인 화면을 커스텀합니다. (연습용 프로젝트 react-crib에서 전환됨)

Next.js 15.4 + React 19 + TypeScript 기반 프로젝트이며 App Router를 사용합니다. standalone 출력(Docker 배포용)으로 설정되어 있고, 에이전트 기반 기능을 위해 Mastra AI 프레임워크와 연동되어 있습니다.

## MineMine 구조

- **화면** (`src/app/(main)/` 라우트 그룹, 공통 레이아웃: `AppHeader` + `Footer`)
  - `/` 메인: `data/settings.json`의 위젯을 순서대로 그리드에 표시 (모바일 2열 / 데스크톱 4열, 행 높이 170px)
  - `/settings` 설정: 위젯 추가/제거, 크기(소/중/대) 선택, `@dnd-kit`으로 드래그 정렬, 하단에 버전 표시
- **위젯** (`src/widgets/`)
  - `types.ts` — `WidgetId`, `WidgetSize`, 최소/최대 개수(`MIN_WIDGETS=2`, `MAX_WIDGETS=5`)
  - `meta.ts` — 위젯 이름·설명·카테고리·지원 크기 (클라이언트에서도 사용)
  - `components.tsx` — 위젯 id → 서버 컴포넌트 매핑, 위젯별 `Suspense` 스켈레톤
  - `WidgetCard.tsx` — 공통 카드/스켈레톤/에러 UI, 크기별 그리드 칸(`small`=1×1, `medium`=2×1, `large`=2×2)
  - 위젯은 서버 컴포넌트이며, 데이터 조회 실패 시 해당 위젯만 `WidgetError`를 표시한다
- **데이터 조회** (`src/lib/data/`, 서버 전용, 모두 API 키 불필요)
  - `weather.ts` — Open-Meteo (서울 고정, 10분 캐시)
  - `exchange.ts` — Frankfurter(유럽중앙은행 기준환율), USD·JPY(100엔) 원화 환율과 전 영업일 대비 변동 (1시간 캐시)
  - `news.ts` — Google 뉴스 RSS(한국어) TECHNOLOGY/BUSINESS 토픽 (15분 캐시)
- **설정 저장** — `data/settings.json` 파일 (`src/lib/settings.ts`의 `readSettings`/`writeSettings`, zod 검증)
  - API: `GET/PUT /api/settings` (`src/app/api/settings/route.ts`), 검증 실패 시 400
  - 형식: `{ "widgets": [{ "id": "weather", "size": "medium" }, ...] }` (배열 순서 = 표시 순서)
  - Docker 컨테이너 재생성 시 파일이 초기화되므로, 로그인 도입 시 DB로 전환 예정

### 새 위젯 추가 방법
1. `src/widgets/types.ts`의 `WIDGET_IDS`에 id 추가
2. `src/widgets/meta.ts`에 메타 정보 등록
3. `src/lib/data/`에 조회 함수 작성 (`fetch`에 `next: { revalidate }` 지정)
4. `src/widgets/<이름>/<이름>Widget.tsx` 작성 후 `src/widgets/components.tsx`의 `RENDERERS`에 등록

### 버전 규칙
- 서비스 버전의 단일 소스는 `package.json`의 `version`이며, 설정 화면 하단에 `MineMine v{version}`으로 자동 표시된다 (`src/constants/version.ts`)
- v0.0.1 이후 기능 추가·변경 시 `package.json`의 `version`을 올린다 (기능 추가: 마이너/패치, 버그 수정: 패치)

### 연습용 코드
- `src/app/example/**`, `WeatherChat`, `QRCode` 등은 학습용으로 유지하며 MineMine 메뉴에는 노출하지 않는다
- `eslint.config.mjs`에서 연습용 파일은 일부 규칙을 경고로 낮춰 빌드를 막지 않도록 했다

## 개발 명령어

```bash
# 개발
npm run dev                  # localhost:3000 에서 개발 서버 실행

# 빌드
npm run build               # 프로덕션 빌드
npm run build:dev           # 개발용 빌드 (NODE_ENV=development)
npm run build:prod          # 프로덕션 빌드 (NODE_ENV=production)

# 프로덕션
npm start                   # 프로덕션 서버 실행

# 린트
npm run lint               # ESLint 실행
```

## 아키텍처

### 디렉터리 구조

- **src/app/** - Next.js App Router 페이지 및 API 라우트
  - `app/components/` - 공용 React 컴포넌트 (Header, Footer, Modal 등)
  - `app/lib/` - 유틸리티 함수 및 공용 로직
  - `app/api/` - API 레이어 (axios 설정, API 클라이언트)
  - `app/example/` - 예제 페이지 및 데모

- **src/mastra/** - Mastra AI 에이전트 프레임워크 연동
  - `agents/` - AI 에이전트 정의 (예: weather-agent.ts)
  - `tools/` - 에이전트 도구 (예: weather-tool.ts)
  - `workflows/` - 에이전트 워크플로
  - `index.ts` - LibSQLStore와 PinoLogger를 사용하는 메인 Mastra 인스턴스 설정

- **src/hooks/** - 커스텀 React 훅
  - `useToggle.ts` - 토글 상태 관리
  - `useOutsideClick.ts` - 요소 외부 클릭 감지
  - `index.ts` 배럴(barrel) 파일을 통해 export

- **src/constants/** - 애플리케이션 상수 및 설정

### 주요 아키텍처 패턴

**Mastra AI 연동:**
- 메인 Mastra 인스턴스는 `src/mastra/index.ts`에서 스토리지(LibSQLStore)와 로깅(PinoLogger)으로 설정됨
- 에이전트는 `src/mastra/agents/`에 별도로 정의된 뒤 Mastra에 등록됨
- 에이전트는 OpenAI 모델(gpt-4o-mini)을 사용하며 도구, 메모리, 워크플로를 가질 수 있음
- Weather 에이전트 예제는 도구 사용, 메모리 영속화, 구조화된 지시문(instructions)을 보여줌
- `src/app/lib/mastra.ts`는 `src/mastra`의 인스턴스를 re-export만 한다
- `GET /api/weather?question=...` (`src/app/api/weather/route.ts`)가 날씨 에이전트를 호출한다 (`OPENAI_API_KEY` 필요)

**API 레이어:**
- `src/app/api/axios.ts`의 axios 인스턴스 설정:
  - `NEXT_PUBLIC_API_URL` 환경 변수에서 Base URL 사용
  - localStorage에서 Bearer 토큰을 자동으로 주입
  - 인증 및 에러 처리를 위한 요청/응답 인터셉터
  - 타임아웃 5000ms

**모달 시스템:**
- React Context 패턴 사용 (`src/app/components/ModalProvider.tsx`의 `ModalContext`)
- 비동기 확인(confirm)을 위한 Promise 기반 모달 API 제공
- 컴포넌트: CommonModal, ConfirmModal

**스타일링:**
- PostCSS 기반 Tailwind CSS v4
- SCSS/Sass 지원 활성화
- Geist 폰트 패밀리(Sans, Mono) 전역 설정

### TypeScript 설정

- 경로 별칭: `@/*` → `./src/*`
- Target: ES2017
- Strict 모드 활성화
- 모듈 해석(Module resolution): bundler

### 이미지 설정

Next.js에서 다음 외부 도메인의 이미지를 허용하도록 설정되어 있음:
- `26.media.tumblr.com`
- `cdn2.thecatapi.com`
- `cdn2.thedogapi.com`
- `media.tumblr.com`

## 프로젝트 목표 (projectGuideline.md 기준)

개인 크립(crib)/플레이그라운드 프로젝트로 다음에 중점을 둠:
- **UI:** 헤더/푸터 레이아웃의 미니멀하고 깔끔한 디자인, 드래그 앤 드롭 위젯
- **AI 연동:** 메인 랜딩의 MCP AI 에이전트, OpenAPI 연동
- **기능:** 날씨, 주식/환율, 뉴스, GitHub 정보, API 모음, 지도, 주차장 찾기, 페이지네이션이 있는 CRUD 메모, Notion/Slack MCP 연동, 마크다운 에디터/뷰어
- **인증:** OAuth, 토큰 기반 인증, localStorage/sessionStorage/쿠키의 올바른 사용
- **고급 UI:** 무한 스크롤, 페이지 이동 시 스크롤 위치 기억

## Docker 지원

- 컨테이너화를 위한 Dockerfile 존재
- 최적화된 Docker 빌드를 위해 Next.js가 `output: "standalone"`으로 설정됨
- 관련 문서: `docs/Docker.md`, `docs/Dockerfile_multiStageBuild`, `docs/Dockerfile_standalone`

## 중요 사항

- React 19와 Next.js 15.4를 사용하므로 이전 버전 대비 breaking change가 있을 수 있음
- 메인 브랜치는 `main`, 개발은 `develop` 브랜치에서 진행
- 코드베이스 전반에 한글 주석/문서가 존재함
- axios 인터셉터는 localStorage 사용이 가능하다고 가정함 (클라이언트 사이드 전용)
