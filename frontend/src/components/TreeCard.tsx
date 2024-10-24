import { RiToolsFill } from "react-icons/ri";
import { IoCloseSharp, IoNavigateCircleOutline } from "react-icons/io5";
import placeholder from "/placeholder.png";
import { Report } from "../types";
import { useState } from "react";

interface TreeCardProps {
  selectedTree: Report;
  onClose: () => void;
  onNavigate: () => void;
}

const TreeCard = ({ selectedTree, onClose, onNavigate }: TreeCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const treeState = selectedTree?.stato?.toLowerCase();
  const isTreeHealthy = treeState === "buono";

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "N/A"
      : date.toLocaleDateString("it-IT", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  const lastReportDate = formatDate(selectedTree?.ultima_segnalazione);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex justify-center items-center">
      <button
        onClick={handleClose}
        className="absolute bottom-[24rem] right-6 text-[#878585] bg-white rounded-full p-2 shadow-md z-[1000]"
      >
        <IoCloseSharp size={20} />
      </button>

      <div
        className={`fixed bottom-0 w-full px-3 bg-white pt-5 pb-9 rounded-t-[50px] shadow-2xl flex flex-col items-center transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h2 className="text-xl font-bold text-[#334D42] mb-4">{selectedTree?.nome}</h2>
        <div className="flex items-center gap-2">
          <img
            src={selectedTree?.immagine ?? placeholder}
            alt={selectedTree?.nome}
            className="object-cover rounded-lg opacity-75 box-shadow w-[150px] h-[250px]"
          />

          <div className="text-left w-full px-4">
            <p className="text-[#878585] font-light text-sm mb-1">Tipo</p>
            <p className="font-normal mb-3">{selectedTree?.tipo}</p>
            <p className="text-[#878585] font-light text-sm mb-1">Condizione</p>
            <p className="font-normal mb-3">{selectedTree?.stato}</p>
            <p className="text-[#878585] font-light text-sm mb-1">Ultima Segnalazione</p>
            <p className="font-normal mb-3">{lastReportDate}</p>

            <div className="flex justify-center gap-3 items-center mt-4 w-full">
              {isTreeHealthy ? (
                <button
                  onClick={onNavigate}
                  className="bg-[#334D42] text-[#EFE9CE] py-2 px-4 rounded-xl shadow-lg font-light"
                >
                  Percorso
                </button>
              ) : (
                <>
                  <button onClick={onNavigate} className="bg-[#334D42] text-[#EFE9CE] p-2 rounded-full shadow-lg">
                    <IoNavigateCircleOutline size={30} />
                  </button>
                  <button className="bg-[#CE6146] text-[#EFE9CE] p-2 rounded-full shadow-lg">
                    <RiToolsFill size={30} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCard;
