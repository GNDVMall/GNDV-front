# 빌드 스테이지
FROM node:20 as build-stage

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 모든 dependencies 설치 (devDependencies 포함)
RUN npm install

# npm bin 디렉토리 내용 확인 (vue-cli-service가 설치되어 있는지 확인)
RUN ls -l node_modules/.bin

# 애플리케이션 소스 코드 복사
COPY . .

# Vue CLI를 통해 빌드 실행 (절대 경로 사용)
RUN ./node_modules/.bin/vue-cli-service build

# 프로덕션 스테이지: nginx를 사용하여 정적 파일 서빙
FROM nginx:stable-alpine as production-stage

# 빌드된 파일들을 nginx의 기본 html 디렉토리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 포트 80 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
