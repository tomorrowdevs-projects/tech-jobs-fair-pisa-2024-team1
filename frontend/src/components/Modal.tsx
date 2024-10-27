import { ChangeEvent, useEffect, useRef, useState } from 'react';
import SearchInput from './Search';
import { TbLocationFilled } from 'react-icons/tb';
import { useUserLocation } from '../hooks/useUserLocation';
import { Report } from '../types';
import { useReports } from '../hooks/useReports';
import { z, ZodError } from 'zod';
import { AxiosError } from 'axios';
import { upload } from '@vercel/blob/client';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTree: Report | null;
}

const ReportSchema = z.object({
  tipo: z.string().min(1, { message: 'Il Tipo è richiesto' }),
  nome: z.string().min(1, { message: 'Il Nome è richiesto' }),
  latitudine: z.string().min(1, { message: 'La Posizione è richiesta' }),
  longitudine: z.string().min(1, { message: 'La Posizione è richiesta' }),
  stato: z.string().min(1, { message: 'Lo Stato è richiesto' }),
});

const initialState = {
  tipo: '',
  nome: '',
  latitudine: '',
  longitudine: '',
  stato: '',
  ultima_segnalazione: '',
  immagine: '',
};

const Modal = ({ isOpen, setIsOpen, selectedTree }: ModalProps) => {
  const [report, setReport] = useState<Report | null>(initialState);
  const { position } = useUserLocation();
  const { addReport, loading, editReport } = useReports();
  const [error, setError] = useState<string>();
  const [isSick, setIsSick] = useState<boolean | null>(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedTree) {
      setReport(selectedTree);
      setIsEdit(true);
      setIsSick(selectedTree?.stato !== 'Buono');
    }
    if (!isOpen && !selectedTree) {
      setReport(initialState);
      setIsEdit(false);
      setIsSick(null);
    }
  }, [selectedTree, isOpen]);

  const handleChange = (key: string, value: string) => {
    const newReport = report ? { ...report } : {};
    setReport({ ...newReport, [key]: value } as Report);
  };

  const handleChangeLocation = (newLocation: [number, number]) => {
    const newReport = report ? { ...report } : {};
    setReport({
      ...newReport,
      latitudine: newLocation[0].toString(),
      longitudine: newLocation[1].toString(),
    } as Report);
  };

  const setReportImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];

    const newBlob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
    });

    const newReport = report ? { ...report } : {};
    setReport({ ...newReport, immagine: newBlob?.url ?? '' } as Report);
  };

  const removeReportImage = () => {
    const newReport = report ? { ...report } : {};
    setReport({ ...newReport, immagine: '' } as Report);
  };

  const handleSubmit = async () => {
    try {
      ReportSchema.parse(report);
      const ultima_segnalazione = new Date().toISOString().split('T')[0];
      const newData = { ...report, ultima_segnalazione } as Report;
      if (selectedTree) {
        await editReport(newData);
      } else {
        await addReport(newData);
      }
      setIsOpen(false);
      setReport(initialState);
      setError('');
      setIsSick(null);
      setIsEdit(false);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof AxiosError || err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ops, something went wrong!');
      }
    }
  };

  return (
    <div
      id="slideover-container"
      className={`w-full h-full fixed inset-0 flex justify-center items-center ${isOpen ? '' : 'invisible'} z-[500]`}
    >
      <div
        onClick={() => {
          setReport(null);
          setIsOpen(false);
        }}
        id="slideover-bg"
        className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
      />
      <div
        id="slideover"
        className={`w-full max-w-md rounded-t-[50px] bg-white h-full absolute duration-300 ease-out transition-all p-4 ${isOpen ? 'top-20' : 'top-full'}`}
      >
        <div className="w-full h-[90%] flex flex-col justify-start items-center overflow-scroll">
          <div className="w-1/2 bg-gray-200 rounded-full h-[7px]" />
          <p className="font-semibold text-xl mt-2">Segnalazione</p>
          <div className="flex flex-col w-full h-full p-2 gap-4">
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Tipo</span>
              <select
                className="border border-black outline-none rounded-none bg-white h-[42px]"
                onChange={(e) => handleChange('tipo', e.currentTarget.value)}
                value={report?.tipo ?? ''}
              >
                <option value="" disabled>
                  Seleziona un tipo...
                </option>
                <option value="Albero">Albero</option>
                <option value="Parco">Parco</option>
                <option value="Giardino">Giardino</option>
              </select>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Nome</span>
              <input
                type="text"
                placeholder="Aggiungi un nome..."
                className="border border-black outline-none p-2 rounded-none"
                onChange={(e) => handleChange('nome', e.currentTarget.value)}
                value={report?.nome}
              />
            </div>
            {!isEdit && (
              <div className="flex flex-col justify-center gap-1">
                <span className="font-semibold">Posizione</span>
                <div className="relative">
                  <SearchInput
                    setLocation={(place) => {
                      handleChangeLocation([place?.lat, place?.lon] as [
                        number,
                        number,
                      ]);
                      setIsCurrentLocation(false);
                    }}
                    isCurrentLocation={isCurrentLocation}
                    className="border border-black outline-none p-2 w-full rounded-none"
                  />
                  <button
                    className="absolute top-[3px] right-1 p-2"
                    onClick={() => {
                      if (position) {
                        handleChangeLocation(position);
                        setIsCurrentLocation(true);
                      }
                    }}
                  >
                    <TbLocationFilled size={20} />
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Stato</span>
              <div className="flex flex-row justify-center gap-4">
                {/* Modificato qui per allineare i pulsanti */}
                <button
                  onClick={() => {
                    handleChange('stato', 'Buono');
                    setIsSick(false);
                  }}
                  className={`px-4 py-2 border ${isSick === false
                    ? 'bg-[#334D42] text-[#EFE9CE]'
                    : 'bg-white text-black border-black'
                    } w-full font-semibold`}
                >
                  Buono
                </button>
                <button
                  onClick={() => {
                    setIsSick(true);
                  }}
                  className={`px-4 py-2 border ${isSick
                    ? 'bg-[#CE6146] text-[#EFE9CE]'
                    : 'bg-white text-black border-black'
                    } w-full font-semibold `}
                >
                  Malato
                </button>
              </div>
              {/* Campo input per la descrizione dei problemi */}
              {isSick && (
                <div className="mt-2">
                  {/* Aggiunto margin-top per separare dall'input */}
                  <input
                    type="text"
                    placeholder="Descrivere i problemi (rami rotti, malato, ...)"
                    className="w-full border border-black outline-none p-2"
                    onChange={(e) =>
                      handleChange('stato', e.currentTarget.value)
                    }
                    value={report?.stato}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center gap-1 h-full">
              <span className="font-semibold">Immagine</span>
              <div
                className={`relative border-2 ${report?.immagine ? 'border-black hover:opacity-20' : ' border-dashed border-gray-400 bg-gray-100'} w-full h-full flex justify-center items-center cursor-pointer`}
                onClick={() => inputFileRef.current?.click()}
              >
                {report?.immagine ? (
                  <img src={report.immagine} className='object-cover' />
                ) : (
                  <p className="text-center text-gray-400">
                    Aggiungi un immagine <br />
                    (Facoltativo)
                  </p>
                )}
                {report?.immagine && (
                  <button
                    className="text-white absolute top-0 right-0 bg-[#CE6146] rounded-md p-2 m-2 box-shadow"
                    onClick={removeReportImage}
                  >
                    <FiX size={20} />
                  </button>
                )}
                <input
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => setReportImage(e)}
                />
              </div>
            </div>
            {error && <p className="font-semibold text-red-500">{error}</p>}
            <button
              disabled={loading}
              className={`w-full p-4 ${loading ? 'bg-[#334D42]/75 text-[#EFE9CE]/75' : 'bg-[#334D42] text-[#EFE9CE]'} bg-[#334D42] text-[#EFE9CE] font-semibold text-lg rounded-[4px]`}
              onClick={handleSubmit}
            >
              Invio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
