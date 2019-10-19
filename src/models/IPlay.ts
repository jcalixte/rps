import Hand from '@/enums/Hand'
import Player from '@/enums/Player'
import IDocument from './IDocument'

export default interface IPlay extends IDocument {
  player1: string
  player2: string | null
  turns: ITurn[]
}

interface ITurn {
  [Player.Player1]: Hand
  [Player.Player2]: Hand
  winner: Player
}
