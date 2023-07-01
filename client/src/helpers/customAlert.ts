import './customAlert.css';
import colors from '@global/colors';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

interface ICustomAlertProps extends SweetAlertOptions {
  icon?: SweetAlertIcon;
  title: string;
  text: string;
}

const customAlert = ({ title, text, icon, ...rest }: ICustomAlertProps) =>
  Swal.fire({
    title,
    text,
    icon: icon || 'info',
    confirmButtonColor: colors.PRIMARY,
    customClass: {
      container: '.alert-above-all',
    },
    ...rest,
  });

export { customAlert };
