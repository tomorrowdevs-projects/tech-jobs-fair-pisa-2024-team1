import { RiToolsFill } from 'react-icons/ri';
import { IoCloseSharp, IoNavigateCircleOutline } from 'react-icons/io5';
import placeholder from '/placeholder.png';
import { Report } from '../types';
import { useMemo } from 'react';

interface TreeCardProps {
  selectedTree: Report;
  onClose: () => void;
  onNavigate: () => void;
  onOpenModal: () => void;
}

const TreeCard = ({
  selectedTree,
  onClose,
  onNavigate,
  onOpenModal,
}: TreeCardProps) => {
  const isTreeHealthy = useMemo(() => {
    return selectedTree?.stato?.toLowerCase() === 'Buono';
  }, [selectedTree?.stato]);

  const lastReportDate = useMemo(() => {
    if (!selectedTree?.ultima_segnalazione) {
      return 'N/A';
    }

    const date = new Date(selectedTree?.ultima_segnalazione);

    return isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString('it-IT', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
  }, [selectedTree?.ultima_segnalazione]);

  return (
    <div className="absolute bottom-0 left-0 w-full p-4 z-[500] flex flex-col justify-center items-end">
      <button
        onClick={onClose}
        className="bg-white rounded-full p-2 shadow-md mb-2"
      >
        <IoCloseSharp size={25} color="black" />
      </button>
      <div className="flex flex-col justify-center items-center  bg-white w-full p-4 rounded-[20px] box-shadow">
        <h2 className="text-2xl font-bold text-black mb-4">
          {selectedTree?.nome}
        </h2>
        <div className="flex items-center gap-8 w-full">
          <img
            src={selectedTree?.immagine ?? placeholder}
            alt={selectedTree?.nome}
            className="object-cover rounded-lg opacity-75 box-shadow w-full h-[250px]"
          />

          <div className="w-full">
            <p className="text-[#878585] text-md font-medium">Tipo</p>
            <p className="font-semibold text-lg mb-2">{selectedTree?.tipo}</p>
            <p className="text-[#878585] font-medium text-md">Condizione</p>
            <p className="font-semibold text-lg mb-2">{selectedTree?.stato}</p>
            <p className="text-[#878585] font-medium text-md">
              Ultima Segnalazione
            </p>
            <p className="font-semibold text-lg mb-2">{lastReportDate}</p>

            <div className="flex justify-center gap-3 items-center mt-4 w-full">
              {isTreeHealthy ? (
                <button
                  onClick={onNavigate}
                  className="bg-[#334D42] text-[#EFE9CE] py-2 px-4 rounded-lg shadow-lg font-medium"
                >
                  Percorso
                </button>
              ) : (
                <>
                  <button
                    onClick={onNavigate}
                    className="bg-[#334D42] text-[#EFE9CE] p-2 rounded-full shadow-lg"
                  >
                    <IoNavigateCircleOutline size={30} />
                  </button>
                  <button
                    className="bg-[#CE6146] text-[#EFE9CE] p-2 rounded-full shadow-lg"
                    onClick={onOpenModal}
                  >
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
