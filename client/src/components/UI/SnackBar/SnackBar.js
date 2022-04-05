import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = {
  options: {
    theme: 'light',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
  success(msg) {
    return toast.success(msg, {
      ...Alert.options,
    });
  },
  error(msg) {
    return toast.error(msg, {
      ...Alert.options,
    });
  },
  warn(msg) {
    return toast.warn(msg, {
      ...Alert.options,
    });
  },
};

export default Alert;
