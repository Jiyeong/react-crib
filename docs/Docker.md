
# 로컬에서 도커 이미지 생성 후 로컬 서버 실행

## 방법
1. 로컬에 docker 설치 (https://www.docker.com/products/docker-desktop/)
2. 루트 경로에 Dockerfile 생성 및 작성
3. Docker 이미지 빌드
- 로컬에서 cmd로 해당 프로젝트 경로로 이동 후 아래 커멘드 실행
```powershell
docker build -t dyb-cb-audio .
```
4. Docker 컨테이너 실행
```powershell
docker run -p 3000:3000 dyb-cb-audio
```
5. 애플리케이션 접속 및 확인
```
localhost:3000
```

## 참고사항
- `.dockerignore` 파일에 이미 `node_modules`, `dist`, `.output`, `.git`, `*.log` 등이 포함되어 있어 빌드 시 불필요한 파일이 제외됩니다.
- 개발 환경에서 테스트하려면 `-p` 옵션 외에도 `-d` 옵션을 추가하여 백그라운드에서 실행할 수 있습니다:
- 컨테이너 중지하려면 컨테이너 ID 확인 후 중지
```powershell
  docker ps
  docker stop <컨테이너_ID>
```
- [참고] 도커 허브 (https://hub.docker.com/)


# Next.js standalone & Docker 멀티스테이지 빌드
- Next.js의 standalone 모드와 Docker의 멀티스테이지 빌드를 함께 활용하는 것이 가장 효과적인 최적화 전략이다
- 우선 standalone 모드로 애플리케이션 실행에 필요한 최소한의 파일과 의존성만을 포함한 빌드 결과물을 생성한다
- 곧이어 멀티스테이지 빌드로 빌드와 실행 환경을 명확히 분리해 이미지에서 불필요한 파일과 도구를 완벽하게 제거할 수 있다.

https://yozm.wishket.com/magazine/detail/3046/





# 도커 명령어
1. 도커 컴포즈를 사용하는 경우
```bash
# 개발 환경
docker-compose up dev

# 운영 환경
docker-compose up prod
```
2. 도커 명령어를 사용하는 경우
```bash
# 이미지 빌드
docker build -t jamong-app .

# 개발 환경으로 실행
docker run -d -p 8000:8000 -p 3306:3306 -e ENVIRONMENT=dev --name jamong-dev jamong-app

# 운영 환경으로 실행
docker run -d -p 80:80 -p 3306:3306 -e ENVIRONMENT=prod --name jamong-prod jamong-app
```