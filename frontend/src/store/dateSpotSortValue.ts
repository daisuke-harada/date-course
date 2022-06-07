import { atom } from 'recoil';

export const prefectureIdState = atom<string>(
  {
    key: 'prefectureIdState',
    default: ''
  }
);

export const genreIdState = atom<string>(
  {
    key: 'genreIdState',
    default: ''
  }
)

export const comeTimeState = atom<string>(
  {
    key: 'comeTimeState',
    default: ''
  }
)