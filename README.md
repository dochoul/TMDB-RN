# TMDB Movies - React Native 앱 (Expo)

TMDB API를 활용한 React Native 영화 앱입니다. Expo를 사용하여 더 쉽게 개발할 수 있습니다.

## 기능

- 인기 영화 목록 조회
- 영화 상세 정보 보기
- 무한 스크롤을 통한 영화 목록 로드

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. Expo CLI 설치 (전역, 처음 한 번만)

```bash
npm install -g expo-cli
```

또는 npx를 사용하여 실행할 수도 있습니다 (설치 불필요).

### 3. 앱 실행

#### 방법 1: Expo Go 앱 사용 (가장 쉬운 방법)

1. 스마트폰에 **Expo Go** 앱 설치
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. 개발 서버 시작:
```bash
npm start
```

3. 터미널에 표시되는 QR 코드를 Expo Go 앱으로 스캔하거나, 같은 Wi-Fi 네트워크에 연결된 상태에서 앱에서 프로젝트를 선택

#### 방법 2: iOS 시뮬레이터 (macOS만)

```bash
npm run ios
```

#### 방법 3: Android 에뮬레이터

```bash
npm run android
```

#### 방법 4: 웹 브라우저

```bash
npm run web
```

## Expo의 장점

- ✅ **Xcode 설치 불필요**: Expo Go 앱으로 실제 기기에서 즉시 테스트 가능
- ✅ **간편한 개발 환경**: 네이티브 빌드 설정 없이 바로 개발 시작
- ✅ **빠른 반복 개발**: 코드 변경 시 즉시 반영 (Hot Reload)
- ✅ **크로스 플랫폼**: iOS, Android, Web 모두 지원

## 프로젝트 구조

```
tmdb/
├── src/
│   ├── screens/
│   │   ├── MovieListScreen.tsx    # 영화 목록 화면
│   │   └── MovieDetailScreen.tsx  # 영화 상세 화면
│   └── services/
│       └── tmdbApi.ts             # TMDB API 서비스
├── App.tsx                         # 메인 앱 컴포넌트
├── index.js                        # 앱 진입점 (Expo)
├── app.json                        # Expo 설정 파일
├── babel.config.js                 # Babel 설정
└── package.json
```

## 사용된 기술

- Expo SDK 51
- React Native 0.74.5
- React Navigation 6.x
- TypeScript
- TMDB API

## API 키

현재 프로젝트에는 TMDB API 키가 포함되어 있습니다. 프로덕션 환경에서는 환경 변수로 관리하는 것을 권장합니다.

## 참고사항

- 이 프로젝트는 **Expo Go 전용**으로 설정되어 있습니다. 네이티브 폴더(ios/android)는 포함되어 있지 않습니다.
- Expo Go 앱을 사용하면 네이티브 모듈이 제한될 수 있습니다. 모든 기능이 필요하면 `expo prebuild`로 네이티브 프로젝트를 생성할 수 있습니다.
- 프로덕션 빌드를 위해서는 [EAS Build](https://docs.expo.dev/build/introduction/)를 사용할 수 있습니다.
- 나중에 네이티브 빌드가 필요하면 `npx expo prebuild` 명령어로 ios와 android 폴더를 생성할 수 있습니다.

## 유용한 명령어

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹 브라우저에서 실행
npm run web

# 프로젝트 정리 및 재시작
npm start -- --clear
```
