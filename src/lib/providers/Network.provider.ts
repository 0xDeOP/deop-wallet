export class NetworkProvider {
  /**
   * Network instance to handle request calls. Use `fetch`.
   * @private
   */
  private readonly networkInstance: typeof fetch;

  /**
   * Constructor
   */
  public constructor(instance: typeof fetch) {
    this.networkInstance = instance;
  }

  /**
   * To make request
   * @param url
   * @param options
   * @private
   */
  public async request<T>(url: string, options?: RequestInit): Promise<T> {
    /**
     * @dev await for dynamic import finish.
     */
    const explicitUrl = `${url}`;

    const resp = await this.networkInstance(explicitUrl, options);
    let jsonData = await resp.clone().text();

    try {
      jsonData = JSON.parse(jsonData);
    } catch {
      console.log('failed to parse json');
    }

    if (!resp.ok) throw new Error(resp.statusText);
    return jsonData as T;
  }
}
