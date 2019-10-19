import Hand from '@/enums/Hand'
import Player from '@/enums/Player'

export default interface IPlay {
  _id: string
  _rev: string
  turns: ITurn[]
}

interface ITurn {
  [Player.Player1]: Hand
  [Player.Player2]: Hand
  winner: Player
}
