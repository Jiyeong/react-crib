export type Sample = {
  no: number;
  id: string;
  name: string;
  age: number;
  is_active: boolean;
  user_type: 'P' | 'S';
}
/*
  * 자바스크립트의 비동기
  * - 자바스크립트가 비동기 처리를 필요로 하는 이유 : 자바스크립트는 싱글스레드 언어이기 때문에, 동기적으로 실행되는 코드가 시간이 오래걸리면 전체 코드의 흐름이 멈추는 단점이 있다.
  * setTimeout, Promise 객체, callback 지옥, async/await, API 호출
  * 동기/비동기 sync / aysnc
  * Promise
*/

// 프로미스는 비동기 작업의 완료 또는 실패를 처리하기 위한 객체이다.
export const testPromise = new Promise((resolve, reject) => {
  let value = true
  // 비동기 작업 수행
  if(value) {
    // resolve 함수는 작업이 성공했을 때 호출하는 함수
    // 프로미스의 상태를 이행(fulfilled)으로 변경하는 함수
    resolve('success')
  } else {
    // reject 함수는 작업이 실패했을 때 호출하는 함수
    // 프로미스의 상태를 거부, 실패(rejected)로 변경하는 함수
    reject('fail')
  }
})
/*
 * async & await : 자바스크립트에서 비동기 코드를 보다 직관적으로 작성할 수 있도록 도와주는 키워드
 * 어떠한 함수에 async 키워드를 작성하면, 해당 함수는 항상 자동으로 프로미스 객체를 반환하게 된다.
 * await 은 aysnc 키워드가 작성된 함수의 내부에서 사용하는 키워드이다.
 * await 키워드가 포함된 코드가 실행되면 해당 작업(비동기 작업)이 종료될 때까지 프로그램의 실행이 중단된다는 특징이 있다
 * async/await 을 사용한 비동기 처리에서는 try/catch문을 사용해 에러 핸들링을 할 수 있다
 * */
export const testFunc = async () => {
  try {
    console.log('start')
  } catch (err) {
    console.log(err)
  }
}

export const getDatas = async () => {
  try {
    let response = await fetch('/api/test')
    let data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}