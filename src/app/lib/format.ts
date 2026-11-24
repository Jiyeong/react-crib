// app/lib/utils/validation.ts

/**
 * 이메일 주소 유효성 검사
 * - 이메일 형식: local-part@domain
 * - local-part: 영문, 숫자, 특수문자( . _ - ) 허용
 * - domain: 영문, 숫자, 하이픈(-) 허용, 최상위 도메인 필수
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * 핸드폰 번호 유효성 검사
 * 허용 형식:
 * - 010-1234-5678
 * - 010.1234.5678
 * - 01012345678
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

/**
 * 핸드폰 번호 포맷팅 (하이픈 추가)
 * 입력: 01012345678
 * 출력: 010-1234-5678
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';

  // 기존 하이픈 제거
  const number = phone.replace(/-/g, '');

  if (number.length === 11) {
    return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (number.length === 10) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

/**
 * 입력 중인 핸드폰 번호 실시간 포맷팅
 * 사용자가 입력하는 동안 자동으로 하이픈 추가
 */
export const formatPhoneNumberWhileTyping = (phone: string): string => {
  if (!phone) return '';

  // 숫자와 하이픈만 남기고 모두 제거
  const number = phone.replace(/[^\d-]/g, '');

  // 하이픈 제거
  const numberOnly = number.replace(/-/g, '');

  if (numberOnly.length <= 3) {
    return numberOnly;
  }
  if (numberOnly.length <= 7) {
    return numberOnly.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  }
  return numberOnly.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
};