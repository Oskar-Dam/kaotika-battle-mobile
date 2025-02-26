import { Player } from './../Player';

export type MobileSignInResponse =
  | { status: 'OK'; player: Player }
  | { status: 'FAILED'; error: string };