import { Battle } from './../Battle.ts';

export type MobileBattelsResponse =
  | { status: 'OK'; battles: Battle[] }
  | { status: 'FAILED'; error: string };