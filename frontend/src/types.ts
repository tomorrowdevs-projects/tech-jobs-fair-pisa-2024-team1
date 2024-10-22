export interface Report {
    id: number
    tipo: string
    nome: string
    latitudine: string
    longitudine: string
    stato: string
    ultima_segnalazione: string
    immagine?: string
}

export interface ReportRequest {
    id?: number
    tipo: string
    nome: string
    latitudine: string
    longitudine: string
    stato: string
    ultima_segnalazione: string
    immagine?: string
}