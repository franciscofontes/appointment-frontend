import { Apontamento } from "./apontamento.model";
import { Colaborador } from "./colaborador.model";
import { Projeto } from "./projeto.model";

export interface Alocacao {
    id: number;
    colaborador: Colaborador;
    projeto: Projeto;
    apontamentos: Apontamento[];
    totalHoras: string;
}