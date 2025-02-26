export type JoinBattleResponse =
  | { status: 'OK'; isJoined: true }
  | { status: 'FAILED'; isJoined: false };