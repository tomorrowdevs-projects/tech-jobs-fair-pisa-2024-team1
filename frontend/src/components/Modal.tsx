interface ModalProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
    return (
        <div id="slideover-container" className={`w-full h-full fixed inset-0 flex justify-center items-center ${isOpen ? '' : 'invisible'} z-[500]`}>
            <div onClick={() => setIsOpen(false)} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isOpen ? 'opacity-50' : 'opacity-0'}`}></div>
            <div id="slideover" className={`w-full rounded-t-[50px] bg-white h-full absolute duration-300 ease-out transition-all ${isOpen ? 'top-20' : 'top-full'}`}>
            </div>
        </div>
    )
}

export default Modal