import {keyPress} from "@/app/lib/keyPress";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <>
      <div 
          className="modal-overlay"
          tabIndex={0}
          onKeyPress={keyPress({
            onEnter: onConfirm,
            onEscape: onCancel,
          })}
      >
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={onConfirm}>확인 (Enter)</button>
          <button onClick={onCancel}>취소 (Esc)</button>
        </div>
      </div>
    </>
  )
};
