import Hand from '@/enums/Hand'

export default interface IPlay {
  _id: string
  _rev: string
  turns: ITurn[]
}

interface ITurn {
  player1: Hand
  player2: Hand
  winner: 'player1' | 'player2'
}
