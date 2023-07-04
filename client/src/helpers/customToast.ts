import './customStyles.css';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

type AlertProps = {
  icon?: SweetAlertIcon;
  text: string;
} & SweetAlertOptions;

const customToast = ({ text, icon, ...rest }: AlertProps) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    showCloseButton: true,
    customClass: {
      timerProgressBar: 'toast-progress-bar',
    },
  });

  Toast.fire({
    icon: icon || 'success',
    title: text,
    ...rest,
  });
};

export { customToast };
