'use client'
import {useToggle} from "@/hooks/useToggle";
import {useOutsideClick} from "@/hooks/useOutsideClick";
import {useState} from "react";
import {keyPress} from "@/app/lib/keyPress";

interface DropDownItem {
  id: string | number;
  name: string;
}
interface DropDownMenuProps {
  items: DropDownItem[];
  onSelect: (item: DropDownItem) => void;
  onClose: () => void;
}

export const DropDownMenu = ({ items, onSelect, onClose }: DropDownMenuProps) => {
  const [isOpen, toggleMenu, openMenu, closeMenu] = useToggle(false);
  const onOutsideClick = useOutsideClick();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <div className="dropdown">
        <button onClick={toggleMenu}>메뉴 열기</button>

        {isOpen && (
          <ul
              ref={onOutsideClick(() => closeMenu())}
              tabIndex={0}
              onKeyPress={keyPress({
                onArrowUp: () => setSelectedIndex(prev =>
                  prev > 0 ? prev - 1 : items.length - 1
                ),
                onArrowDown: () => setSelectedIndex(prev =>
                    prev < items.length - 1 ? prev + 1 : 0
                ),
                onEnter: () => {
                  onSelect(items[selectedIndex]);
                },
                onEscape: () => {
                  onClose();
                },
              })}
          >
            {items.map((item, index) => (
                <li key={item.id} className={index === selectedIndex ? 'active' : ''}>
                  {item.name}
                </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
};
