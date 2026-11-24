# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 다룰 때 참고하는 가이드입니다.

> **이 파일(CLAUDE.md)은 항상 한글로 작성·수정한다.** 영어 원본은 `CLAUDE_EN.md`에 보관되어 있다.

## 프로젝트 개요

Next.js 15.4 + React 19 + TypeScript 기반 프로젝트이며 App Router를 사용합니다. standalone 출력(Docker 배포용)으로 설정되어 있고, 에이전트 기반 기능을 위해 Mastra AI 프레임워크와 연동되어 있습니다.

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
- `src/app/lib/`에 중복된 mastra.ts 파일이 있어 통합이 필요할 수 있음

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
