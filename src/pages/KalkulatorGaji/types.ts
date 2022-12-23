export enum Nationality {
    Indonesian = "Indonesian",
    Vietnamese = "Vietnamese"
}

export type Employee = {
    name: string,
    status_pernikahan: boolean,
    anak: number,
    nationality: Nationality,
    penghasilan: {
        bruto: number,
        nett?: number,
        asuransi?: number,
        pajak?: number,
    },
}