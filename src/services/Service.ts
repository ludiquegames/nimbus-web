abstract class Service {
  protected static baseUrl = process.env.REACT_APP_API_BASE_URL;
  protected static contentType = 'Content-Type';

  protected static post = async (url: string, data: any = null) => {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}

export default Service;
