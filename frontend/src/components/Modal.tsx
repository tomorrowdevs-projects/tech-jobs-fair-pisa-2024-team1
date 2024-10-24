import { useEffect, useState } from "react";
import SearchInput from "./Search";
import { TbLocationFilled } from "react-icons/tb";
import { useUserLocation } from "../hooks/useUserLocation";
import { Report } from "../types";
import { useReports } from "../hooks/useReports";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTree: Report | null
}

const ReportSchema = z.object({
  tipo: z.string().min(1, { message: "Type is required" }),
  nome: z.string().min(1, { message: "Name is required" }),
  latitudine: z.string().min(1, { message: "Place is required" }),
  longitudine: z.string().min(1, { message: "Place is required" }),
  stato: z.string().min(1, { message: "Status is required" }),
});

const Modal = ({ isOpen, setIsOpen, selectedTree }: ModalProps) => {
  const [report, setReport] = useState<Report | null>(null);
  const { position } = useUserLocation();
  const { addReport, loading } = useReports();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (selectedTree) {
      setReport(selectedTree)
    }
  }, [selectedTree])

  console.log(report)

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

  const handleSubmit = () => {
    try {
      ReportSchema.parse(report);
      addReport({ ...report, ultima_segnalazione: new Date().toISOString().split("T")[0] } as Report);
      setReport(null);
      setError("");
      setIsOpen(false);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof AxiosError || err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ops, something went wrong!");
      }
    }
  };

  return (
    <div
      id="slideover-container"
      className={`w-full h-full fixed inset-0 flex justify-center items-center ${isOpen ? "" : "invisible"} z-[500]`}
    >
      <div
        onClick={() => {
          setReport(null);
          setIsOpen(false);
        }}
        id="slideover-bg"
        className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isOpen ? "opacity-50" : "opacity-0"
          }`}
      />
      <div
        id="slideover"
        className={`w-full rounded-t-[50px] bg-white h-full absolute duration-300 ease-out transition-all p-4 ${isOpen ? "top-20" : "top-full"
          }`}
      >
        <div className="w-full h-[90%] flex flex-col justify-start items-center">
          <div className="w-1/2 bg-gray-200 rounded-full h-[7px]" />
          <p className="font-semibold text-xl mt-2">Segnalazione</p>
          <div className="flex flex-col w-full h-full p-2 gap-4">
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Tipo</span>
              <input
                type="text"
                placeholder="Aggiungi un tipo di albero..."
                className="border border-black outline-none p-2"
                onChange={e => handleChange("tipo", e.currentTarget.value)}
                value={report?.tipo}
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Nome</span>
              <input
                type="text"
                placeholder="Aggiungi un nome..."
                className="border border-black outline-none p-2"
                onChange={e => handleChange("nome", e.currentTarget.value)}
                value={report?.nome}
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Posizione</span>
              <div className="relative">
                <SearchInput
                  setLocation={place => {
                    handleChangeLocation([place?.lat, place?.lon] as [number, number]);
                  }}
                  className="border border-black outline-none p-2 w-full"
                />
                <button
                  className="absolute top-[3px] right-1 p-2"
                  onClick={() => {
                    if (position) {
                      handleChangeLocation(position);
                    }
                  }}
                >
                  <TbLocationFilled size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="font-semibold">Stato</span>
              <input
                type="text"
                placeholder="Aggiungi uno stato..."
                className="border border-black outline-none p-2"
                onChange={e => handleChange("stato", e.currentTarget.value)}

              />
            </div>
            <div className="flex flex-col justify-center gap-1 h-full">
              <span className="font-semibold">Immagine</span>
              <div className="border-2 border-dashed border-gray-400 bg-gray-100 w-full h-full flex justify-center items-center">
                <p className="text-center text-gray-400">
                  Aggiungi un'immagine <br />
                  (Facoltativo)
                </p>
              </div>
            </div>
            {error && <p className="font-semibold text-red-500">{error}</p>}
            <button
              disabled={loading}
              className={`w-full p-4 ${loading ? "bg-[#334D42]/75 text-[#EFE9CE]/75" : "bg-[#334D42] text-[#EFE9CE]"
                } bg-[#334D42] text-[#EFE9CE] font-semibold text-lg rounded-[4px]`}
              onClick={handleSubmit}
            >
              Invia segnalazione
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
