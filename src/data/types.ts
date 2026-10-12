export interface OperadoraInfo {
  id: string;
  codigo: string; // A01, A02, etc.
  nombre: string;
  nombreCorto: string;
  casaMatriz: string;
  cuotaMercado: number; // Porcentaje (ej. 40.2)
  colorHex: string;
  colorTailwind: string;
  descripcion: string;
  naturaleza: 'Pública Comercial' | 'Ente Público no Estatal' | 'Privada' | 'Pública Autónoma' | 'Gremial / Privada';
}

export interface KpiResumen {
  activosTotalesCRC: number;
  activosTotalesUSD: number;
  activosRopCRC: number;
  pesoPibRop: number; // Porcentaje
  totalAfiliados: number;
  totalCotizantes: number;
  tasaDensidadCotizacion: number; // Porcentaje
  rentabilidadReal5aPonderada: number; // Porcentaje
  comisionPromedio: number; // Porcentaje
  tipoCambioBccr: number; // CRC por USD
  fechaCorte: string;
}

export interface RentabilidadOpd {
  operadoraId: string;
  nombre: string;
  rentabilidadReal12m: number;
  rentabilidadReal36m: number;
  rentabilidadReal60m: number;
  rentabilidadReal10a: number;
  rentabilidadNominal12m: number;
  rentabilidadNominal36m: number;
  rentabilidadNominal60m: number;
  comision: number;
  calificacionSemaforo: 'alta' | 'media' | 'baja';
}

export interface ComisionHistorica {
  año: number;
  topeNormativo: number;
  comisionPromedio: number;
  evento: string;
}

export interface PortafolioMacro {
  categoria: string;
  montoCRC: number;
  montoUSD: number;
  porcentaje: number;
  color: string;
  descripcion: string;
}

export interface IsinTitulo {
  isin: string;
  descripcion: string;
  emisor: string;
  tipoInstrumento: string;
  moneda: 'CRC' | 'USD';
  sector: 'PÚBLICO' | 'EXTERIOR' | 'PRIVADO';
  vencimiento: string;
  tasaInteres: string;
  montoTotalCRC: number;
  montoTotalUSD: number;
  tenenciasOpcs: Record<string, number>; // operadoraId -> monto CRC
}

export interface TransferenciaBilateral {
  entidadOrigen: string;
  entidadDestino: string;
  cantidadPersonas: number;
  montoCRC: number;
}

export interface MovilidadResumen {
  operadoraId: string;
  nombre: string;
  entradasPersonas: number;
  salidasPersonas: number;
  saldoNetoPersonas: number;
  entradasMontoCRC: number;
  salidasMontoCRC: number;
  saldoNetoMontoCRC: number;
}

export interface AfiliadoDemografia {
  rangoEdad: string;
  afiliadosTotal: number;
  cotizantesEfectivos: number;
  porcentajeCotizantes: number;
  hombresAfiliados: number;
  mujeresAfiliadas: number;
  hombresCotizantes: number;
  mujeresCotizantes: number;
  salarioPromedioHombresCRC: number;
  salarioPromedioMujeresCRC: number;
}

export interface BeneficioModalidad {
  codigo: string;
  modalidad: string;
  descripcion: string;
  cantidadBeneficiarios: number;
  montoTotalCRC: number;
  pensionPromedioMensualCRC: number;
  porcentaje: number;
}

export interface ApiEndpointSpec {
  endpoint: string;
  metodo: 'GET';
  nombre: string;
  descripcion: string;
  parametros: {
    nombre: string;
    tipo: string;
    requerido: boolean;
    descripcion: string;
    ejemplo: string;
  }[];
  camposClave: {
    campo: string;
    tipo: string;
    descripcion: string;
  }[];
  ejemploRespuesta: any;
  consejosOptimizacion?: string;
}

export interface GlosarioItem {
  sigla: string;
  nombre: string;
  definicion: string;
  baseLegal: string;
  categoria: 'Regímenes' | 'Finanzas y Rentabilidad' | 'Operación' | 'Retiros';
}
