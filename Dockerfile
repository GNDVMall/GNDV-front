# 빌드 스테이지: Node.js를 사용하여 빌드
FROM node:latest AS build  # 최신 Node.js 이미지를 사용하여 빌드 스테이지를 정의합니다.

WORKDIR /app  # 컨테이너 내에서 /app 디렉토리를 작업 디렉토리로 설정합니다.

# package.json 및 package-lock.json(있는 경우) 파일 복사 및 의존성 설치
COPY package*.json ./  # package.json 및 package-lock.json 파일을 컨테이너의 작업 디렉토리로 복사합니다.
RUN npm install  # 의존성 패키지를 설치합니다.

# 소스 코드 복사 및 빌드 실행
COPY . .  # 모든 소스 코드를 컨테이너의 작업 디렉토리로 복사합니다.
RUN npm run build  # 애플리케이션을 빌드합니다.

# 프로덕션 스테이지: nginx를 사용하여 정적 파일 서빙
FROM nginx:latest  # 최신 nginx 이미지를 사용하여 프로덕션 스테이지를 정의합니다.

# 빌드된 파일을 nginx의 기본 웹 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html  # 빌드 스테이지에서 생성된 파일을 nginx의 기본 웹 디렉토리로 복사합니다.

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf  # 사용자 정의 nginx 설정 파일을 복사하여 nginx의 기본 설정을 덮어씁니다.

EXPOSE 80  # 컨테이너가 80번 포트를 수신 대기하도록 설정합니다.

CMD ["nginx", "-g", "daemon off;"]  # nginx를 실행합니다. 'daemon off;' 옵션은 nginx가 포어그라운드에서 실행되도록 합니다.