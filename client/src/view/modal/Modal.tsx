
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  return (

    <div className={styles.modal}>
      <div className={styles.modalBox}>
        {children}
      </div>
    </div>
  )
}

export default Modal
