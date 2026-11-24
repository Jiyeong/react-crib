
## 2025-06-05, thu, 16~18 p.m



## 2025-05-29, thu, 12~14 p.m 

'use client' 
서버 사이드 랜더링 SSR / 클라이언트 사이드 랜더링 CSR 
```
import { useState } from 'react'
import createClient from 'openapi-fetch'

// generic
const fetchClient = createClient<paths>({

})
```

hook -> use~ 로 명칭 사용
ex. useState, useEffect

함수형 프로그래밍 (swift)
arr.map.reduce.filter
뮤터블/이뮤터블 (변하는/변하지 않는)
원칙 이뮤터블하다. 퓨어하다.(=>ex.피보나치 / memoized fibbonachi)
순수함수 : 바꾸는 것 없이 정해진 기능만 동작하는 것.
부작용 side effect ===> useEffect ; 사이드 이팩트를 발생 시킨다.
=> 순수 함수 내에서 부작용을 일으키려는게 목적임.
랜더링의 부작용 으로서 로딩을 띄운다.
```
useEffect(() => {

const load = async () => {
const data = await fetchClient.GET("/api/v2/pokemon")
console.log({data})
}

})
```

예를 들어서 보면 타입이 틀리게 사용하는 순간 자동으로 오류를 도출한다.

 openapi fetch axios


 postman 에서 yaml로 타입 뽑아보기 ;; doc -> 이중관리 제거!
 openapi로 소통

 
 데플리케이션 - major minor fetch 오픈 소스에서 기능 제거/추가 자주 발생.
 git 레포지토리 라이브러리 선택의 중요성. 위와 같은 이슈들로 인해서 최소화 하기 위함.
 

숙제 : react, typescript 사전 공부
- react vite 프로젝트 (경험이 있다면 next 진행)
- openApi YAML 파일 뽑아내서 typescript로 전환
- openapi-typescript 설치하고 사용해보기 데이터 뽑아보기
- API 호출 적용
- next인 경우 project 생성은 App Router로 권장
  - 프로젝트 세팅은 app router로 권장하는 대로 세팅할 것.
- 불편함을 통해서 작업을 경험해보도록. 기반으로 좋은 기술을 습득