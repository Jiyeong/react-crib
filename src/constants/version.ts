import pkg from '../../package.json';

/** 서비스 버전. package.json의 version이 단일 소스이며, 업데이트 시 그 값만 올린다. */
export const APP_VERSION = pkg.version;
