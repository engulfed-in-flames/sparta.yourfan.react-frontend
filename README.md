# YouRFan-DRF-Project (프론트엔드 / <a href="https://github.com/engulfedInFlames/yourfan-backend">백엔드 →</a>)

## 💡 YouRFan이란? - <a href="https://www.notion.so/YouRFan-2bb68cf96de6415eb4686b7508e5cfa2?pvs=4">S.A.</a> / <a href="https://studio.youtube.com/video/7daqgqPzxQM/edit">시연 영상</a>

YouRFan은 유튜브 채널에 대한 팬덤 커뮤니티입니다. 특정 채널에 대한 수치화 및 시각화된 데이터를 제공하며, 제공된 데이터를 바탕으로 커뮤니티 이용자들은 논의를 발전시킬 수 있습니다.

##### 멤버 소개

- 김경수 - 팀장, 프론트엔드, 배포
- 윤준열 - 부팀장, 데이터 크롤링 및 분석, 데이터 시각화
- 김성광 - 웹소켓 구현, 커뮤니티 관련 기능 구현

<br>

## 🔩 개발 환경

### Build 💕

- 프론트 -React, Typescript, Recoil, ChakraUI, Tanstack Query, Axios, Websocket, JS-Cookie

- 백 - Django, DRF, Django Channels, Redis, Pandas, Seaborn, Gunicorn, Uvicorn

- DB - Postgresql

### Deploy 💕

- CloudFront, S3

<br>

## ⚙️ 프로젝트 설치 및 실행 방법

#### 깃허브 클론하기

```bash
$ git clone https://github.com/engulfedInFlames/yourfan-react-frontend.git
```

#### 패키지 밎 라이브러리 설치

```bash
$ npm install
```

#### 실행

```bash
$ npm start
```

<br>

## 🎛️ 서비스 아키텍쳐

![Service Architecture](https://imagedelivery.net/0LpbCRndcZjwIKnq2dWrKQ/a88559c5-eb98-48de-f1d1-e79434f7b100/public)

## 🤔 기술적 의사결정

- <b>CI/CD를 구축하여 배포를 자동화</b>
  - 문제 상황
    - 변경 사항을 웹사이트에 반영하기까지 세 단계(빌드 -> S3 버킷 업데이트 -> 클라우드 프론트 캐싱 무효화 )를 반복해야 함
  - 해결 방법
    - 깃허브 액션을 사용하여 세 단계를 자동화
    - `node-modules`를 캐싱하여 빌드 시간을 절약
    - [워크플로우 확안하기 →](https://github.com/engulfedInFlames/yourfan-react-frontend/blob/deploy/.github/workflows/deploy.yaml)

<br/>

## 🥸 트러블슈팅

- <b>차단된 사용자가 채팅방 페이지에 접근할 수 없도록 하기 위해 API를 통해 차단된 사용자인지를 확인하기로 결정</b>

  - 문제 상황
    - 서버 자체에서 차단된 사용자의 연결을 끊을 수는 있으나, 프론트에서 페이지 접근을 막기 위한 수단이 모호하다는 문제 발생
  - 해결 방법 모색
    - 백엔드에서 커뮤니티 내 페이지가 되는 각 모델들에 대해서 상위 모델을 정의하고 시리얼라이저에서 역참조로 차단된 사용자 리스트를 반환하면 쉽게 조회 가능 => 가장 직관적이고 바람직한 방법이기는 하나 시간적 여유가 없었기 때문에 리팩토링이 불가능하다고 판단 ❌
    - 처음 웹소켓 연결시에 레디스에서 차단된 사용자인지를 확인하는 로직을 구현 => 로직 구현의 어려움으로 불가능하다고 판단 ❌
  - 최종 해결 방법

    - 현재 로그인한 사용자가 차단된 사용자인지를 확인하는 API를 호출

    ```tsx
    export const useNotBannedUserOnly = async (custom_url: string) => {
      const toast = useToast();
      const navigate = useNavigate();
      // custom_url은 유튜브 채널 식별자
      const { isLoading, data: statusCode } = useQuery(
        ["BannedOrNot", custom_url],
        () => apiGetBannedOrNot(custom_url)
      );

      useEffect(() => {
        if (custom_url) {
          if (!isLoading && Number(statusCode) !== 200) {
            navigate("/");
            toast({
              title: "차단된 사용자이므로 접근이 제한됩니다",
              status: "warning",
              position: "top",
              duration: 3000,
            });
          }
        }
      }, [custom_url, statusCode, isLoading]);
    };
    ```

- <b>로그아웃시 홈 화면으로 리다이렉트하고, 새로고침하지 않아도 로그아웃 상태가 반영되도록 조치</b>

  - 문제 상황
    - 여태껏 `<Header />`에서 쿠키에 저장된 액세스 토큰으로 사용자 정보를 퀘리하는 식으로 로그인 상태를 유지해왔으나, 이 방법은 로그아웃시에는 새로고침을 해야지만 상태가 변경된다는 문제가 존재
  - 해결 방법 모색
    - 로그아웃시에 브라우저에 저장된 액세스 토큰을 삭제하고, `useQueryClient`로 사용자 정보를 리패치 => `ReactQueryDevtools`로 확인 결과, 사용자 정보가 리패치되나 UI에는 반영되지 않음 ❌
  - 최종 해결 방법

    - 상태 관리 라이브러리를 사용하여 사용자 정보를 관리하기로 결정
    - 라이브러리로는 러닝 커브가 낮고, 직관적인 `Recoil`을 선택
    - 퀘리된 사용자 정보를 리코일의 상태값에 저장하고, 로그아웃시에 상태값을 제거하는 것으로 결정
    - 사용자 정보를 퀘리하는 리액트 훅 →

    ```tsx
    export const useUserAtom = () => {
      const [user, setUser] = useRecoilState<IMe | undefined>(userAtom);
      const [isUserLoading, setIsUserLoading] =
        useRecoilState(isUserLoadingAtom);
      const { isLoading, data } = useQuery<IMe>(["me"], apiGetMe, {
        retry: false,
      });
      useEffect(() => {
        setIsUserLoading(isLoading);
        setUser(data);
        return () => {
          setUser(undefined);
        };
      }, [setUser, setIsUserLoading, isLoading, data]);
      return { isUserLoading, user };
    };
    ```

    - 로그아웃 클릭 이벤트 핸들러 →

    ```tsx
    const onClickLogout = () => {
      Cookies.remove("access");
      Cookies.remove("refresh");
      queryClient.refetchQueries(["me"]);
      setUser(undefined);
      toast({
        title: "로그아웃",
        status: "success",
        position: "bottom-right",
      });
      navigate("/");
    };
    ```
