import axios from 'axios';
import { RecoverPassword } from 'src/interfaces/RecoverPassword.interface';

const RecoverApi = {
  async sendEmail(email: string) {
    const response = await axios.post('/users/recovery/requestRecoveryMail', {
      email,
    });
    return response;
  },
  async alterPassword(request: RecoverPassword) {
    await axios.post('/users/recovery/changePassword', request);
  },
};
export { RecoverApi };
