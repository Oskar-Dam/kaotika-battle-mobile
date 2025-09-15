import { Battle } from './../Battle.ts';

export type MobileBattlesResponse =
  | { status: 'OK'; battles: Battle[] }
  | { status: 'FAILED'; error: string };