import IPlay from '@/models/IPlay'
import repository from '@/repository'
import uuid from 'uuid/v4'

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
}

export default new PlayService()
