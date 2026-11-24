'use client'
import {useToggle} from "@/hooks/useToggle";
import {useOutsideClick} from "@/hooks/useOutsideClick";

export const CommonModal = () => {
  const [isOpen, toggleModal, openModal, closeModal] = useToggle(false);
  const onOutsideClick = useOutsideClick();
  return (
    <>
      <div className="modal-overlay">
        <div ref={onOutsideClick(() => closeModal())}>
          <h2>모달 제목</h2>
          <p>모달 내용</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    </>
  )
};
