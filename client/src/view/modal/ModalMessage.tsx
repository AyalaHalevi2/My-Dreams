import Modal from "./Modal";

interface ModalMessageProps {
    massage: string;
}
const ModalMessage = ({ massage }: ModalMessageProps) => {
    return (
        <Modal>
            <div>{massage}</div>
        </Modal>
    )
}

export default ModalMessage
