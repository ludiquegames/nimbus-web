import Service from './Service'

abstract class IdentityService extends Service {

  /**
   * Send a SignUp request to the API.
   * 
   * @param {string} email A valid email address must be entered.
   * @param {string} password A valid password has at least 6 characters.
   */
  public static SignUp = async (email: string, password: string) => {
    const response = await this.post('identity/sign/up', { email, password });
    return response;
  };

}

export default IdentityService;