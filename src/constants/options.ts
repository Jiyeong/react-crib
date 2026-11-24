export const ANIMAL_OPTIONS = [
  { value: 'cat', label: '고양이', icon: '🐱', apiEndpoint: 'https://api.thecatapi.com/v1/images/search'},
  { value: 'dog', label: '강아지', icon: '🐶', apiEndpoint: 'https://api.thedogapi.com/v1/images/search'}
  /*{ value: 'rabbit', label: '토끼', icon: '🐰' },
  { value: 'hamster', label: '햄스터', icon: '🐹' }*/
] as const;

// 타입 정의 (옵션)
export type AnimalOption = typeof ANIMAL_OPTIONS[number];
export type AnimalType = AnimalOption['value'];
export const getAnimalApiEndpoint = (value: string) => {
  const option = ANIMAL_OPTIONS.find(opt => opt.value === value);
  return option?.apiEndpoint;
};
