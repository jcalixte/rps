import PouchDB from 'pouchdb-browser'
import bus, { SYNC_UP } from '@/utils/bus'
import IDocument from '@/models/IDocument'

class Repository {
  private local = new PouchDB('rps')
  private remote = new PouchDB('https://juliencalixte.ddns.net/database/rps')
  private sync: PouchDB.Replication.Sync<{}> | null = null

  public async add(doc: IDocument): Promise<boolean> {
    try {
      const response = await this.remote.put(doc)
      return response.ok
    } catch (error) {
      console.error({ error })
    }
    return false
  }

  public async get<T>(id: string): Promise<T | null> {
    const result = await this.local.get(id)
    return ((result as any) as T) || null
  }

  public async getRemote<T>(id: string): Promise<T | null> {
    try {
      const result = await this.remote.get(id)
      return ((result as any) as T) || null
    } catch (error) {
      return null
    }
  }

  public liveGame(id: string): void {
    this.cancelLive()
    this.sync = this.local
      .sync(this.remote, {
        live: true,
        retry: true,
        doc_ids: [id]
      })
      .on('change', (result) => {
        bus.$emit(SYNC_UP, {
          id,
          result
        })
      })
      .on('error', (error) => {
        console.warn({ error })
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
