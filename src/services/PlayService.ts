import IPlay from '@/models/IPlay'
import repository from '@/repository'
import uuid from 'uuid/v4'
import Player from '@/enums/Player'
import Hand from '@/enums/Hand'

class PlayService {
  public async add(userId: string, id?: string): Promise<string | null> {
    if (id) {
      const remotePlay = await repository.getRemote<IPlay>(id)
      if (remotePlay) {
        return null
      }
    }

    const play: IPlay = {
      _id: id || uuid(),
      doctype: 'play',
      player1: userId,
      player2: null,
      turns: []
    }

    const result = await repository.add(play)
    return result ? play._id : null
  }

  public async joinPlay(id: string, userId: string): Promise<IPlay | null> {
    const play = await repository.getRemote<IPlay>(id)
    if (!play) {
      return null
    }

    if ([play.player1, play.player2].includes(userId) || play.player2) {
      return play
    }
    play.player2 = userId

    const result = await repository.add(play)
    return result ? play : null
  }

  public async get(id: string): Promise<IPlay | null> {
    return repository.get<IPlay>(id)
  }

  public async setPlay(play: IPlay, player: Player | null, hand: Hand | null) {
    if (!player) {
      return
    }
    switch (player) {
      case Player.Player1: {
        const lastTurn = [...play.turns].pop()
        if (lastTurn && lastTurn.player1 === hand) {
          return
        }
        play.turns.pop()
        const turn = {
          ...(lastTurn || {}),
          [Player.Player1]: hand,
          [Player.Player2]: null,
          winner: null
        }
        play.turns.push(turn)
        break
      }
      case Player.Player2: {
        const lastTurn = [...play.turns].pop()
        if (lastTurn && lastTurn.player2 === hand) {
          return
        }
        if (!lastTurn || lastTurn.player1 === null) {
          return
        }
        play.turns.pop()
        const turn = {
          ...lastTurn,
          [Player.Player2]: hand,
          winner: this.getWinner(lastTurn.player1, hand)
        }
        play.turns.push(turn)
        break
      }
    }
    await repository.save(play)
  }

  public async newTurn(play: IPlay): Promise<boolean> {
    const lastTurn = [...play.turns].pop()

    if (lastTurn && (lastTurn.player1 === null || lastTurn.player2 === null)) {
      return false
    }

    play.turns.push({
      [Player.Player1]: null,
      [Player.Player2]: null,
      winner: null
    })
    await repository.save(play)
    return true
  }

  private getWinner(play1: Hand, play2: Hand | null) {
    if (play2 === null) {
      return null
    }
    switch (play1) {
      case Hand.Paper:
        if (play2 === Hand.Rock) {
          return Player.Player1
        } else if (play2 === Hand.Scissors) {
          return Player.Player2
        }
        break
      case Hand.Rock:
        if (play2 === Hand.Scissors) {
          return Player.Player1
        } else if (play2 === Hand.Paper) {
          return Player.Player2
        }
        break
      case Hand.Scissors:
        if (play2 === Hand.Paper) {
          return Player.Player1
        } else if (play2 === Hand.Rock) {
          return Player.Player2
        }
        break
    }
    return null
  }
}

export default new PlayService()
