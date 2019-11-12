import PouchDB from 'pouchdb-browser'
import bus, { SYNC_UP } from '@/utils/bus'
import IDocument from '@/models/IDocument'
import Player from '@/enums/Player'

class Repository {
  private local = new PouchDB('rps')
  private remote = new PouchDB('https://juliencalixte.ddns.net/database/rps')
  private sync: PouchDB.Replication.Sync<{}> | null = null

  public async saveRemote(doc: IDocument): Promise<boolean> {
    try {
      const response = await this.remote.put(doc)
      return response.ok
    } catch (error) {
      return false
    }
  }

  public async save(doc: IDocument): Promise<boolean> {
    try {
      const response = await this.local.put(doc)
      return response.ok
    } catch (error) {
      return false
    }
  }

  public async get<T>(id: string): Promise<T | null> {
    try {
      const result = await this.local.get(id)
      return ((result as any) as T) || null
    } catch (error) {
      return null
    }
  }

  public async getRemote<T>(id: string): Promise<T | null> {
    try {
      const result = await this.remote.get(id)
      return ((result as any) as T) || null
    } catch (error) {
      return null
    }
  }

  public async getAll<T>(): Promise<T[]> {
    try {
      const result = await this.local.allDocs({
        include_docs: true
      })
      return (result.rows.map((row) => row.doc) as any[]) as T[]
    } catch (error) {
      return []
    }
  }

  public liveGame(id: string): void {
    this.cancelLive()
    const ids = [`${id}_${Player.Player1}`, `${id}_${Player.Player2}`]
    this.sync = this.local
      .sync(this.remote, {
        live: true,
        retry: true,
        doc_ids: ids
      })
      .on('change', (result) => {
        bus.$emit(SYNC_UP, {
          id,
          result
        })
      })
  }

  public cancelLive(): void {
    if (this.sync) {
      this.sync.cancel()
      this.sync = null
    }
  }
}

export default new Repository()
