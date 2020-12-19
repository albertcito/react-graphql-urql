export enum StorageItems {
  accessToken = 'accessToken',
  userID = 'userID',
  langID = 'langID',
}
class Storage {
  private readonly accessToken = StorageItems.accessToken;

  private readonly userID = StorageItems.userID;

  private readonly langID = StorageItems.langID;

  public getUserID(): number | undefined {
    const userID = localStorage.getItem(this.userID);
    return userID ? Number.parseInt(userID, 10) : undefined;
  }

  public setUserID(userID: number) {
    return localStorage.setItem(this.userID, `${userID}`);
  }

  public setToken(token: string) {
    return localStorage.setItem(this.accessToken, token);
  }

  public getToken(): string {
    const accessToken = localStorage.getItem(this.accessToken);
    return accessToken ?? '';
  }

  public getLangID(): string {
    const langID = localStorage.getItem(this.langID);
    return langID ?? '';
  }

  public setLangID(langID: string) {
    return localStorage.setItem(this.langID, langID);
  }

  public logout() {
    localStorage.removeItem(this.userID);
    localStorage.removeItem(this.langID);
    localStorage.removeItem(this.accessToken);
  }
}

export default new Storage();
