import type {
  OperadoraInfo,
  KpiResumen,
  RentabilidadOpd,
  ComisionHistorica,
  ValorCuotaDiario,
  RentabilidadMensualPunto,
  SerieAnualHistorica,
  PortafolioMacro,
  IsinTitulo,
  MovilidadResumen,
  AfiliadoDemografia,
  BeneficioModalidad,
  ApiEndpointSpec,
  GlosarioItem
} from './types';

// ============================================================================
// DATASET OFICIAL DEL OBSERVATORIO PREVISIONAL SUPEN (COSTA RICA)
// Generado automáticamente por: update_supen_data.py
// Fecha de corte oficial: 2026-09-30
// ============================================================================

export const KPI_SISTEMA: KpiResumen = {
  "activosTotalesCRC": 28314043393736,
  "activosTotalesUSD": 63417572051,
  "activosRopCRC": 15472154859965,
  "pesoPibRop": 32.8,
  "totalAfiliados": 3304845,
  "totalCotizantes": 1432982,
  "tasaDensidadCotizacion": 43.36,
  "rentabilidadReal5aPonderada": 5.06,
  "comisionPromedio": 0.35,
  "tipoCambioBccr": 446.47,
  "fechaCorte": "2026-09-30"
};

export const OPERADORAS: OperadoraInfo[] = [
  {
    "id": "POPULAR",
    "codigo": "A04",
    "nombre": "Popular Pensiones",
    "nombreCorto": "Popular",
    "casaMatriz": "Banco Popular y de Desarrollo Comunal",
    "cuotaMercado": 40.8,
    "colorHex": "#0284c7",
    "colorTailwind": "border-sky-500 text-sky-400 bg-sky-950/30",
    "descripcion": "Líder absoluto de mercado por activos y afiliados. Recibe la asignación legal por defecto de trabajadores no inscritos. Mayor cobertura territorial.",
    "naturaleza": "Ente Público no Estatal"
  },
  {
    "id": "BN-VITAL",
    "codigo": "A02",
    "nombre": "BN Vital",
    "nombreCorto": "BN Vital",
    "casaMatriz": "Banco Nacional de Costa Rica",
    "cuotaMercado": 18.6,
    "colorHex": "#16a34a",
    "colorTailwind": "border-green-500 text-green-400 bg-green-950/30",
    "descripcion": "Segunda mayor operadora del país. Red de distribución bancaria más extensa a nivel nacional con fuerte peso corporativo e institucional.",
    "naturaleza": "Pública Comercial"
  },
  {
    "id": "BCR-PENSION",
    "codigo": "A01",
    "nombre": "BCR Pensión",
    "nombreCorto": "BCR",
    "casaMatriz": "Banco de Costa Rica",
    "cuotaMercado": 11.0,
    "colorHex": "#2563eb",
    "colorTailwind": "border-blue-500 text-blue-400 bg-blue-950/30",
    "descripcion": "Tercera posición del mercado. Muy consolidada en el sector empresarial e institucional ligado al conglomerado financiero BCR.",
    "naturaleza": "Pública Comercial"
  },
  {
    "id": "BACSJ PENSIONES",
    "codigo": "A05",
    "nombre": "BAC San José Pensiones",
    "nombreCorto": "BAC",
    "casaMatriz": "Grupo Financiero BAC Credomatic / Aval",
    "cuotaMercado": 15.9,
    "colorHex": "#dc2626",
    "colorTailwind": "border-red-500 text-red-400 bg-red-950/30",
    "descripcion": "Líder del sector privado. Fuerte captación de masa salarial multinacional, plataformas digitales avanzadas y planes voluntarios en USD.",
    "naturaleza": "Privada"
  },
  {
    "id": "CCSS-OPC",
    "codigo": "A06",
    "nombre": "CCSS OPC",
    "nombreCorto": "CCSS",
    "casaMatriz": "Caja Costarricense de Seguro Social",
    "cuotaMercado": 2.3,
    "colorHex": "#0d9488",
    "colorTailwind": "border-teal-500 text-teal-400 bg-teal-950/30",
    "descripcion": "Creada por la Caja Costarricense de Seguro Social. Fuerte afinidad gremial con trabajadores del sector salud pública y funcionarios estatales.",
    "naturaleza": "Pública Autónoma"
  },
  {
    "id": "VIDA PLENA",
    "codigo": "A03",
    "nombre": "Vida Plena OPC",
    "nombreCorto": "Vida Plena",
    "casaMatriz": "Junta de Pensiones del Magisterio Nacional (JUPEMA)",
    "cuotaMercado": 11.5,
    "colorHex": "#d97706",
    "colorTailwind": "border-amber-500 text-amber-400 bg-amber-950/30",
    "descripcion": "Nicho magisterial y educativo. Fuerte arraigo en educadores y administrativos de escuelas, colegios y universidades públicas.",
    "naturaleza": "Gremial / Privada"
  }
];

export const RENTABILIDADES: RentabilidadOpd[] = [
  {
    "operadoraId": "POPULAR",
    "nombre": "Popular Pensiones",
    "rentabilidadReal12m": 9.5,
    "rentabilidadReal36m": 11.8,
    "rentabilidadReal60m": 5.65,
    "rentabilidadReal10a": 7.34,
    "rentabilidadNominal12m": 9.88,
    "rentabilidadNominal36m": 11.5,
    "rentabilidadNominal60m": 7.09,
    "comision": 0.35,
    "calificacionSemaforo": "alta"
  },
  {
    "operadoraId": "BN-VITAL",
    "nombre": "BN Vital",
    "rentabilidadReal12m": 6.86,
    "rentabilidadReal36m": 9.78,
    "rentabilidadReal60m": 4.46,
    "rentabilidadReal10a": 6.7,
    "rentabilidadNominal12m": 7.23,
    "rentabilidadNominal36m": 9.49,
    "rentabilidadNominal60m": 5.89,
    "comision": 0.35,
    "calificacionSemaforo": "media"
  },
  {
    "operadoraId": "BCR-PENSION",
    "nombre": "BCR Pensión",
    "rentabilidadReal12m": 6.26,
    "rentabilidadReal36m": 8.62,
    "rentabilidadReal60m": 4.3,
    "rentabilidadReal10a": 6.27,
    "rentabilidadNominal12m": 6.62,
    "rentabilidadNominal36m": 8.33,
    "rentabilidadNominal60m": 5.72,
    "comision": 0.35,
    "calificacionSemaforo": "media"
  },
  {
    "operadoraId": "BACSJ PENSIONES",
    "nombre": "BAC San José Pensiones",
    "rentabilidadReal12m": 7.67,
    "rentabilidadReal36m": 10.51,
    "rentabilidadReal60m": 4.61,
    "rentabilidadReal10a": 6.59,
    "rentabilidadNominal12m": 8.04,
    "rentabilidadNominal36m": 10.21,
    "rentabilidadNominal60m": 6.04,
    "comision": 0.35,
    "calificacionSemaforo": "media"
  },
  {
    "operadoraId": "CCSS-OPC",
    "nombre": "CCSS OPC",
    "rentabilidadReal12m": 8.57,
    "rentabilidadReal36m": 9.44,
    "rentabilidadReal60m": 4.13,
    "rentabilidadReal10a": 6.4,
    "rentabilidadNominal12m": 8.95,
    "rentabilidadNominal36m": 9.15,
    "rentabilidadNominal60m": 5.55,
    "comision": 0.35,
    "calificacionSemaforo": "alta"
  },
  {
    "operadoraId": "VIDA PLENA",
    "nombre": "Vida Plena OPC",
    "rentabilidadReal12m": 9.19,
    "rentabilidadReal36m": 9.9,
    "rentabilidadReal60m": 5.4,
    "rentabilidadReal10a": 7.1,
    "rentabilidadNominal12m": 9.57,
    "rentabilidadNominal36m": 9.61,
    "rentabilidadNominal60m": 6.84,
    "comision": 0.35,
    "calificacionSemaforo": "alta"
  }
];

export const HISTORICO_COMISIONES: ComisionHistorica[] = [
  { año: 2005, topeNormativo: 1.10, comisionPromedio: 1.08, evento: 'Esquema original post-reforma Ley 7983 sobre aportes y saldo' },
  { año: 2009, topeNormativo: 0.85, comisionPromedio: 0.84, evento: 'Primera reducción escalonada ordenada por CONASSIF' },
  { año: 2013, topeNormativo: 0.70, comisionPromedio: 0.69, evento: 'Estandarización del cobro exclusivo sobre saldo administrado' },
  { año: 2017, topeNormativo: 0.50, comisionPromedio: 0.49, evento: 'Regulación para abaratar costos a largo plazo' },
  { año: 2020, topeNormativo: 0.35, comisionPromedio: 0.35, evento: 'Tope actual vigente del 0.35% anual sobre saldo' }
];

export const PORTAFOLIO_MACRO: PortafolioMacro[] = [
  {
    "categoria": "Gobierno Central (Ministerio de Hacienda)",
    "montoCRC": 7962977980470,
    "montoUSD": 17835415550,
    "porcentaje": 52.9,
    "color": "#0284c7",
    "descripcion": "Títulos de Deuda Interna soberana (bonos BTP en colones y dólares). Alta rentabilidad libre de riesgo crediticio pero sujeta a riesgo fiscal local."
  },
  {
    "categoria": "Inversiones en el Exterior (ETFs / Deuda Global)",
    "montoCRC": 6114262361370,
    "montoUSD": 13694676823,
    "porcentaje": 40.7,
    "color": "#10b981",
    "descripcion": "Vehículos de renta variable global (Vanguard S&P 500, iShares MSCI) y bonos grado de inversión. Proporciona diversificación cambiaria y geográfica."
  },
  {
    "categoria": "Banco Central y Sector Financiero Público",
    "montoCRC": 649631452153,
    "montoUSD": 1455039425,
    "porcentaje": 4.3,
    "color": "#6366f1",
    "descripcion": "Bonos de estabilización monetaria del BCCR y certificados de depósito de bancos estatales (BNCR, BCR)."
  },
  {
    "categoria": "Sector Privado y Corporativo Local",
    "montoCRC": 313960716386,
    "montoUSD": 703206747,
    "porcentaje": 2.1,
    "color": "#f59e0b",
    "descripcion": "Emisiones corporativas, fideicomisos de obra pública, cuotas de fondos de inversión y notas estructuradas locales."
  }
];

export const TITULOS_ISIN_DESTACADOS: IsinTitulo[] = [
  {
    isin: 'CRG0000B22J5',
    descripcion: 'BONO DE DEUDA INTERNA TASA FIJA HACIENDA',
    emisor: 'MINISTERIO DE HACIENDA',
    tipoInstrumento: 'DEUDA ESTANDARIZADA',
    moneda: 'CRC',
    sector: 'PÚBLICO',
    vencimiento: '2028-06-21',
    tasaInteres: '7.85% Fija Anual',
    montoTotalCRC: 645120000000,
    montoTotalUSD: 1257543860,
    tenenciasOpcs: {
      POPULAR: 256800000000,
      'BN-VITAL': 123400000000,
      'BCR-PENSION': 102500000000,
      'BACSJ PENSIONES': 85200000000,
      'CCSS-OPC': 48720000000,
      'VIDA PLENA': 28500000000
    }
  },
  {
    isin: 'CRG0000B24K3',
    descripcion: 'BONO DE DEUDA INTERNA TASA FIJA HACIENDA',
    emisor: 'MINISTERIO DE HACIENDA',
    tipoInstrumento: 'DEUDA ESTANDARIZADA',
    moneda: 'CRC',
    sector: 'PÚBLICO',
    vencimiento: '2034-03-15',
    tasaInteres: '8.40% Fija Anual',
    montoTotalCRC: 489300000000,
    montoTotalUSD: 953801170,
    tenenciasOpcs: {
      POPULAR: 198200000000,
      'BN-VITAL': 98400000000,
      'BCR-PENSION': 75200000000,
      'BACSJ PENSIONES': 62100000000,
      'CCSS-OPC': 34200000000,
      'VIDA PLENA': 21200000000
    }
  },
  {
    isin: 'US9229083632',
    descripcion: 'VANGUARD 500 INDEX FUND (VOO ETF)',
    emisor: 'VANGUARD GROUP INC',
    tipoInstrumento: 'EXCHANGE TRADED FUND (ETF)',
    moneda: 'USD',
    sector: 'EXTERIOR',
    vencimiento: 'PERPETUO (RENTA VARIABLE)',
    tasaInteres: 'Dividendo ~1.5% + Capital Gain',
    montoTotalCRC: 382450000000,
    montoTotalUSD: 745516569,
    tenenciasOpcs: {
      'BACSJ PENSIONES': 148500000000,
      POPULAR: 110200000000,
      'BN-VITAL': 68400000000,
      'BCR-PENSION': 32150000000,
      'VIDA PLENA': 14200000000,
      'CCSS-OPC': 9000000000
    }
  },
  {
    isin: 'US4642882249',
    descripcion: 'ISHARES MSCI ACWI ETF (GLOBAL ALL COUNTRY)',
    emisor: 'BLACKROCK FUND ADVISORS',
    tipoInstrumento: 'EXCHANGE TRADED FUND (ETF)',
    moneda: 'USD',
    sector: 'EXTERIOR',
    vencimiento: 'PERPETUO (RENTA VARIABLE)',
    tasaInteres: 'Dividendo ~1.8% + Crecimiento',
    montoTotalCRC: 254100000000,
    montoTotalUSD: 495321637,
    tenenciasOpcs: {
      'BACSJ PENSIONES': 98200000000,
      POPULAR: 75400000000,
      'BN-VITAL': 45100000000,
      'BCR-PENSION': 21300000000,
      'CCSS-OPC': 8100000000,
      'VIDA PLENA': 6000000000
    }
  },
  {
    isin: 'CRBCCR000452',
    descripcion: 'BONO DE ESTABILIZACION MONETARIA BCCR (BEM)',
    emisor: 'BANCO CENTRAL DE COSTA RICA',
    tipoInstrumento: 'DEUDA ESTANDARIZADA',
    moneda: 'CRC',
    sector: 'PÚBLICO',
    vencimiento: '2026-11-20',
    tasaInteres: '6.25% Fija Anual',
    montoTotalCRC: 312500000000,
    montoTotalUSD: 609161793,
    tenenciasOpcs: {
      POPULAR: 125000000000,
      'BN-VITAL': 72500000000,
      'BCR-PENSION': 55000000000,
      'BACSJ PENSIONES': 35000000000,
      'CCSS-OPC': 15000000000,
      'VIDA PLENA': 10000000000
    }
  }
];

export const MOVILIDAD_RESUMEN: MovilidadResumen[] = [
  {
    "operadoraId": "POPULAR",
    "nombre": "Popular Pensiones",
    "entradasPersonas": 4568,
    "salidasPersonas": 13908,
    "saldoNetoPersonas": -9340,
    "entradasMontoCRC": 41564988592,
    "salidasMontoCRC": 39889008959,
    "saldoNetoMontoCRC": 1675979633
  },
  {
    "operadoraId": "BN-VITAL",
    "nombre": "BN Vital",
    "entradasPersonas": 8841,
    "salidasPersonas": 4315,
    "saldoNetoPersonas": 4526,
    "entradasMontoCRC": 21838280518,
    "salidasMontoCRC": 24125295547,
    "saldoNetoMontoCRC": -2287015030
  },
  {
    "operadoraId": "BCR-PENSION",
    "nombre": "BCR Pensión",
    "entradasPersonas": 3904,
    "salidasPersonas": 3463,
    "saldoNetoPersonas": 441,
    "entradasMontoCRC": 16148501882,
    "salidasMontoCRC": 20987667016,
    "saldoNetoMontoCRC": -4839165134
  },
  {
    "operadoraId": "BACSJ PENSIONES",
    "nombre": "BAC San José Pensiones",
    "entradasPersonas": 7122,
    "salidasPersonas": 3223,
    "saldoNetoPersonas": 3899,
    "entradasMontoCRC": 18973598145,
    "salidasMontoCRC": 13496202266,
    "saldoNetoMontoCRC": 5477395879
  },
  {
    "operadoraId": "CCSS-OPC",
    "nombre": "CCSS OPC",
    "entradasPersonas": 1104,
    "salidasPersonas": 894,
    "saldoNetoPersonas": 210,
    "entradasMontoCRC": 3680009617,
    "salidasMontoCRC": 5467635649,
    "saldoNetoMontoCRC": -1787626032
  },
  {
    "operadoraId": "VIDA PLENA",
    "nombre": "Vida Plena OPC",
    "entradasPersonas": 944,
    "salidasPersonas": 680,
    "saldoNetoPersonas": 264,
    "entradasMontoCRC": 9595233808,
    "salidasMontoCRC": 7834803125,
    "saldoNetoMontoCRC": 1760430683
  }
];

export const DEMOGRAFIA_AFILIADOS: AfiliadoDemografia[] = [
  {
    "rangoEdad": "< 31 años",
    "afiliadosTotal": 718529,
    "cotizantesEfectivos": 407460,
    "porcentajeCotizantes": 56.7,
    "hombresAfiliados": 421685,
    "mujeresAfiliadas": 296343,
    "hombresCotizantes": 235152,
    "mujeresCotizantes": 172002,
    "salarioPromedioHombresCRC": 424425,
    "salarioPromedioMujeresCRC": 444099
  },
  {
    "rangoEdad": "31 a < 45 años",
    "afiliadosTotal": 1224987,
    "cotizantesEfectivos": 585774,
    "porcentajeCotizantes": 47.8,
    "hombresAfiliados": 708665,
    "mujeresAfiliadas": 515607,
    "hombresCotizantes": 327452,
    "mujeresCotizantes": 257973,
    "salarioPromedioHombresCRC": 641037,
    "salarioPromedioMujeresCRC": 628755
  },
  {
    "rangoEdad": "45 a < 59 años",
    "afiliadosTotal": 869196,
    "cotizantesEfectivos": 349305,
    "porcentajeCotizantes": 40.2,
    "hombresAfiliados": 513639,
    "mujeresAfiliadas": 355099,
    "hombresCotizantes": 206257,
    "mujeresCotizantes": 142887,
    "salarioPromedioHombresCRC": 693540,
    "salarioPromedioMujeresCRC": 676655
  },
  {
    "rangoEdad": "59 a < 100 años",
    "afiliadosTotal": 491702,
    "cotizantesEfectivos": 90435,
    "porcentajeCotizantes": 18.4,
    "hombresAfiliados": 314706,
    "mujeresAfiliadas": 176746,
    "hombresCotizantes": 61827,
    "mujeresCotizantes": 28561,
    "salarioPromedioHombresCRC": 619320,
    "salarioPromedioMujeresCRC": 595492
  },
  {
    "rangoEdad": ">= 100 años",
    "afiliadosTotal": 431,
    "cotizantesEfectivos": 8,
    "porcentajeCotizantes": 1.9,
    "hombresAfiliados": 187,
    "mujeresAfiliadas": 44,
    "hombresCotizantes": 3,
    "mujeresCotizantes": 2,
    "salarioPromedioHombresCRC": 3647184,
    "salarioPromedioMujeresCRC": 222788
  }
];

export const BENEFICIOS_RETIROS: BeneficioModalidad[] = [
  {
    "codigo": "1",
    "modalidad": "Renta Permanente",
    "descripcion": "El afiliado retira periódicamente únicamente los rendimientos reales de los últimos 36 meses, preservando el capital para sus herederos.",
    "cantidadBeneficiarios": 22080,
    "montoTotalCRC": 1422979299,
    "pensionPromedioMensualCRC": 64447,
    "porcentaje": 11.5
  },
  {
    "codigo": "2",
    "modalidad": "Retiro Programado",
    "descripcion": "El saldo permanece en la operadora generando rendimientos y la mensualidad se recalcula cada 12 meses dividiendo el capital entre la expectativa de vida actuarial.",
    "cantidadBeneficiarios": 5215,
    "montoTotalCRC": 393074216,
    "pensionPromedioMensualCRC": 75374,
    "porcentaje": 3.2
  },
  {
    "codigo": "3",
    "modalidad": "Transitorio XX (Ley 9906)",
    "descripcion": "Retiro acelerado en mensualidades iguales a la cantidad de cuotas aportadas al régimen (vigente temporalmente hasta 2030).",
    "cantidadBeneficiarios": 73401,
    "montoTotalCRC": 8783302421,
    "pensionPromedioMensualCRC": 119662,
    "porcentaje": 71.1
  },
  {
    "codigo": "4",
    "modalidad": "Renta Vitalicia",
    "descripcion": "Se traslada el saldo total a una aseguradora o liquidación garantizada.",
    "cantidadBeneficiarios": 808,
    "montoTotalCRC": 1757990716,
    "pensionPromedioMensualCRC": 2175731,
    "porcentaje": 14.2
  }
];

export const API_ENDPOINTS: ApiEndpointSpec[] = [
  {
    endpoint: '/comision',
    metodo: 'GET',
    nombre: 'Comisiones Cobradas por Operadora',
    descripcion: 'Retorna el historial y comisiones vigentes cobradas por cada operadora sobre saldo, aportes o rendimientos.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Mnemónico del fondo (ROP, FCL, VOLCA, etc.)', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha de inicio del rango (AAAA-MM-DD)', ejemplo: '2024-01-01' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha final del rango (AAAA-MM-DD)', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'entidad', tipo: 'string', descripcion: 'Código o nombre comercial de la operadora' },
      { campo: 'tipo', tipo: 'string', descripcion: 'Base de cobro: SALDO (vigente), APORTE o RENDIMIENTO' },
      { campo: 'comisión', tipo: 'number', descripcion: 'Porcentaje anualizado cobrado (ej. 0.35)' },
      { campo: 'fecha', tipo: 'string (ISO)', descripcion: 'Fecha de corte mensual' }
    ],
    ejemploRespuesta: [
      {
        entidad: "POPULAR",
        tipo: "SALDO",
        comisión: 0.35,
        fecha: "2024-01-31T00:00:00",
        codigoregimen: 2,
        régimen: "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
        codigofondo: "ROP",
        fondo: "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
      },
      {
        entidad: "BN-VITAL",
        tipo: "SALDO",
        comisión: 0.35,
        fecha: "2024-01-31T00:00:00",
        codigoregimen: 2,
        régimen: "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
        codigofondo: "ROP",
        fondo: "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
      }
    ]
  },
  {
    endpoint: '/rendimiento',
    metodo: 'GET',
    nombre: 'Rentabilidades Oficiales (Valor Cuota)',
    descripcion: 'Devuelve rentabilidades históricas y anualizadas oficiales calculadas mediante Valor Cuota Promedio Mensual, en términos nominales y reales netos de comisiones.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Código del fondo previsional', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha de inicio (AAAA-MM-DD)', ejemplo: '2024-01-01' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha final (AAAA-MM-DD)', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'entidad', tipo: 'string', descripcion: 'Nombre de la operadora' },
      { campo: 'tipo', tipo: 'string', descripcion: 'REAL (descuenta inflación IPC) o NOMINAL' },
      { campo: 'periodicidad', tipo: 'string', descripcion: '12 MESES, 36 MESES, 60 MESES, 10 AÑOS, HISTÓRICA' },
      { campo: 'rentabilidad', tipo: 'number', descripcion: 'Tasa porcentual anualizada geométrica' }
    ],
    ejemploRespuesta: [
      {
        entidad: "BACSJ PENSIONES",
        tipo: "REAL",
        periodicidad: "36 MESES",
        rentabilidad: 3.82,
        fecha: "2024-01-31T00:00:00",
        codigoregimen: 2,
        régimen: "RÉGIMEN OBLIGATORIO COMPLEMENTARIO",
        codigofondo: "ROP",
        fondo: "PENSIÓN OBLIGATORIA COMPLEMENTARIA"
      }
    ]
  },
  {
    endpoint: '/portafolio',
    metodo: 'GET',
    nombre: 'Composición Agregada de Portafolios',
    descripcion: 'Estructura agregada de las carteras de inversión clasificadas por emisor, sector, moneda, modalidad y plazo de vencimiento.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Fondo a consultar', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha inicio', ejemplo: '2024-01-31' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha fin', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'emisor_gestor', tipo: 'string', descripcion: 'Nombre del emisor (ej. MINISTERIO DE HACIENDA)' },
      { campo: 'sector', tipo: 'string', descripcion: 'PUBLICO, EXTERNO o PRIVADO' },
      { campo: 'montocolones', tipo: 'number', descripcion: 'Valor de mercado en colones' },
      { campo: 'montodolares', tipo: 'number', descripcion: 'Valor de mercado en dólares' }
    ],
    ejemploRespuesta: [
      {
        entidad: "BN-VITAL",
        codigoentidad: "A02",
        codigomoneda: 1,
        moneda: "COLONES",
        modalidadinversion: "(2020) DEUDA ESTANDARIZADA NIVEL I",
        instrumento: "DEUDA ESTANDARIZADA",
        plazo: "ENTRE 360 Y 1800 DÍAS",
        sector: "PUBLICO",
        emisor_gestor: "MINISTERIO DE HACIENDA",
        montocolones: 185420300450.0,
        montodolares: 361443080.8,
        fecha: "2024-01-31T00:00:00"
      }
    ]
  },
  {
    endpoint: '/portafolioISIN',
    metodo: 'GET',
    nombre: 'Detalle de Inversiones Granular por Código ISIN',
    descripcion: 'El endpoint más exhaustivo del API. Devuelve cada título valor individual identificado con su código ISIN internacional de 12 caracteres.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: true, descripcion: 'Fondo puntual (ROP, FCL)', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: true, descripcion: 'Misma fecha que fin', ejemplo: '2024-01-31' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: true, descripcion: 'Misma fecha que inicio', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'isin', tipo: 'string', descripcion: 'Código internacional único de 12 caracteres (CRG..., US..., IE...)' },
      { campo: 'emisor_gestor', tipo: 'string', descripcion: 'Emisor del título valor' },
      { campo: 'montocolones', tipo: 'number', descripcion: 'Posición valorada en colones' }
    ],
    ejemploRespuesta: [
      {
        entidad: "BN-VITAL",
        isin: "CRG0000B22J5",
        emisor_gestor: "MINISTERIO DE HACIENDA",
        instrumento: "DEUDA ESTANDARIZADA",
        montocolones: 1045145330.0,
        montodolares: 2037240.91,
        fecha: "2024-01-31T00:00:00"
      }
    ],
    consejosOptimizacion: 'SIEMPRE consultar para una única fecha de corte puntual (FechaInicio = FechaFinal) para evitar Timeout 504 debido al volumen masivo de títulos.'
  },
  {
    endpoint: '/LT',
    metodo: 'GET',
    nombre: 'Libre Transferencia (Traspasos entre OPCs)',
    descripcion: 'Matriz bilateral mensual de traslados de afiliados y dinero entre operadoras de origen y destino.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Fondo de origen', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha inicio', ejemplo: '2024-01-01' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha fin', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'entidadorigen', tipo: 'string', descripcion: 'Operadora de la que salen los fondos' },
      { campo: '[OPC]_C', tipo: 'integer', descripcion: 'Cantidad de personas transferidas hacia esa OPC' },
      { campo: '[OPC]_M', tipo: 'number', descripcion: 'Monto monetario transferido hacia esa OPC' }
    ],
    ejemploRespuesta: [
      {
        entidadorigen: "BCR-PENSION",
        BN_VITAL_C: 805,
        BN_VITAL_M: 2401130854.44,
        POPULAR_C: 1073,
        POPULAR_M: 7404409329.01,
        BACSJ_PENSIONES_C: 412,
        BACSJ_PENSIONES_M: 3150240110.20,
        fecha: "2024-01-31T00:00:00"
      }
    ]
  },
  {
    endpoint: '/Afiliado',
    metodo: 'GET',
    nombre: 'Demografía de Afiliados y Cotizantes',
    descripcion: 'Estadísticas de la población laboral afiliada y cotizante, clasificada por sexo, rango etario y salarios promedios.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Fondo previsional', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha inicio', ejemplo: '2024-01-01' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha fin', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'afiliados', tipo: 'integer', descripcion: 'Total de personas acumuladas registradas' },
      { campo: 'aportantes', tipo: 'integer', descripcion: 'Personas que cotizaron activamente en el mes' },
      { campo: 'salario_o_aporte_colones', tipo: 'number', descripcion: 'Salario o aporte promedio en colones' }
    ],
    ejemploRespuesta: [
      {
        entidad: "BN-VITAL",
        sexo: "FEMENINO",
        rangoedad: " 45 A < 59",
        afiliados: 60979,
        aportantes: 22454,
        salario_o_aporte_colones: 612149297.0,
        fecha: "2024-01-31T00:00:00"
      }
    ]
  },
  {
    endpoint: '/Beneficio',
    metodo: 'GET',
    nombre: 'Desembolsos y Retiro de Beneficios',
    descripcion: 'Reporte de beneficios desembolsados a los pensionados según modalidad (Renta Permanente, Retiro Programado, etc.), sexo y edad.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Fondo consultado', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha inicio', ejemplo: '2024-01-01' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha fin', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'tipobeneficio', tipo: 'string', descripcion: 'Modalidad de retiro o pensión' },
      { campo: 'beneficio', tipo: 'integer', descripcion: 'Cantidad de personas beneficiarias' },
      { campo: 'beneficiocolones', tipo: 'number', descripcion: 'Monto total pagado en colones' }
    ],
    ejemploRespuesta: [
      {
        entidad: "BACSJ PENSIONES",
        tipobeneficio: "RENTA PERMANENTE",
        beneficio: 29,
        beneficiocolones: 1150099.48,
        fecha: "2024-01-31T00:00:00"
      }
    ]
  },
  {
    endpoint: '/Cuenta',
    metodo: 'GET',
    nombre: 'Estados Contables y Valor Cuota (NAV)',
    descripcion: 'Información contable estandarizada de los fondos: Activo Neto, Valor Cuota (NAV), Patrimonio, Inversiones, Ingresos y Gastos.',
    parametros: [
      { nombre: 'Fondo', tipo: 'string', requerido: false, descripcion: 'Fondo previsional', ejemplo: 'ROP' },
      { nombre: 'FechaInicio', tipo: 'string', requerido: false, descripcion: 'Fecha inicio', ejemplo: '2024-01-01' },
      { nombre: 'FechaFinal', tipo: 'string', requerido: false, descripcion: 'Fecha fin', ejemplo: '2024-01-31' }
    ],
    camposClave: [
      { campo: 'codigocuenta', tipo: 'string', descripcion: '0110000000000 (Activo Neto), 0130000000000 (Valor Cuota)' },
      { campo: 'cuenta', tipo: 'string', descripcion: 'Denominación oficial de la cuenta contable' },
      { campo: 'montocolones', tipo: 'number', descripcion: 'Saldo contable en colones' }
    ],
    ejemploRespuesta: [
      {
        entidad: "BN-VITAL",
        codigocuenta: "0110000000000",
        cuenta: "ACTIVO NETO DEL FONDO DE PENSIONES",
        montocolones: 2144947850088.42,
        fecha: "2024-01-31T00:00:00"
      }
    ]
  }
];

export const GLOSARIO: GlosarioItem[] = [
  {
    sigla: 'ROP',
    nombre: 'Régimen Obligatorio de Pensión Complementaria',
    definicion: 'Fondo de capitalización individual obligatoria creado por la Ley 7983. Cada trabajador aporta el 1.0% de su salario y el patrono aporta el 3.25% (total 4.25% mensual). El dinero se acumula en una cuenta individual gestionada por la OPC elegida.',
    baseLegal: 'Ley de Protección al Trabajador (Ley N.° 7983), Artículos 9 al 24',
    categoria: 'Regímenes'
  },
  {
    sigla: 'FCL',
    nombre: 'Fondo de Capitalización Laboral',
    definicion: 'Auxilio anticipado de cesantía financiado exclusivamente por el patrono con un 1.5% mensual del salario. El trabajador puede retirarlo ante cese laboral o cada 5 años continuos con el mismo patrono (retiro quinquenal).',
    baseLegal: 'Ley 7983, Artículos 3 al 8',
    categoria: 'Regímenes'
  },
  {
    sigla: 'NAV',
    nombre: 'Valor Cuota (Net Asset Value)',
    definicion: 'Precio unitario de una porción del fondo de pensiones. Se calcula diariamente dividiendo el patrimonio total del fondo entre el número de cuotas en circulación. Es la base técnica matemática para determinar la rentabilidad real neta de comisiones.',
    baseLegal: 'Reglamento de Gestión de Activos CONASSIF / SUPEN',
    categoria: 'Finanzas y Rentabilidad'
  },
  {
    sigla: 'LT',
    nombre: 'Libre Transferencia',
    definicion: 'Derecho legal gratuito que tiene todo trabajador costarricense de trasladar sus fondos acumulados en el ROP o FCL hacia cualquier otra operadora autorizada tras cumplir 6 meses de permanencia.',
    baseLegal: 'Ley 7983, Artículo 10',
    categoria: 'Operación'
  },
  {
    sigla: 'Fee Drag',
    nombre: 'Costo Oculto de la Comisión por Interés Compuesto',
    definicion: 'Efecto multiplicador a largo plazo donde una comisión cobrada anualmente sobre el saldo total reduce drásticamente el patrimonio futuro que hubiera generado interés compuesto. Una comisión de 0.35% a 35 años reduce el saldo final un ~7.5%, mientras que la comisión histórica de 1.10% reducía más del 23%.',
    baseLegal: 'Reglamentación CONASSIF de Tope de Comisiones',
    categoria: 'Finanzas y Rentabilidad'
  },
  {
    sigla: 'Minusvalía',
    nombre: 'Minusvalía Contable vs. Pérdida Real',
    definicion: 'Reducción contable transitoria en la cotización a precios de mercado de los títulos del fondo (ej. por alzas en tasas de interés o tipo de cambio). No constituye una pérdida real a menos que el trabajador se traslade o liquide sus cuotas en ese momento.',
    baseLegal: 'Norma de Valoración a Precios de Mercado SUPEN',
    categoria: 'Finanzas y Rentabilidad'
  },
  {
    sigla: 'Fondos Generacionales',
    nombre: 'Fondos de Ciclo de Vida (Target-Date Funds 2029)',
    definicion: 'Reforma estructural aprobada por CONASSIF para regir en 2029: el fondo único del ROP se divide en 4 fondos según la década de nacimiento del trabajador (Fondo A a D), asignando carteras dinámicas a los jóvenes y carteras conservadoras a quienes están por jubilarse.',
    baseLegal: 'Acuerdo CONASSIF de Fondos Generacionales 2029',
    categoria: 'Regímenes'
  },
  {
    sigla: 'ISIN',
    nombre: 'International Securities Identification Number',
    definicion: 'Código alfanumérico global único de 12 caracteres que identifica inequívocamente una emisión de títulos valores (bonos soberanos costarricenses CRG..., acciones, ETFs estadounidenses US..., etc.).',
    baseLegal: 'Estándar ISO 6166 / BVA / SUPEN',
    categoria: 'Operación'
  }
];

// ==========================================
// SERIES TEMPORALES MULTI-GRANULARIDAD (DÍAS, MESES, AÑOS)
// Según estándar metodológico de la SUPEN / CONASSIF
// ==========================================

// ==========================================
// SERIES TEMPORALES MULTI-GRANULARIDAD (DÍAS, MESES, AÑOS)
// Según estándar metodológico de la SUPEN / CONASSIF
// ==========================================

// ==========================================
// SERIES TEMPORALES MULTI-GRANULARIDAD (DÍAS, MESES, AÑOS)
// Según estándar metodológico de la SUPEN / CONASSIF
// ==========================================

export const SERIE_DIARIA_VALOR_CUOTA: ValorCuotaDiario[] = [
  {
    "dia": 1,
    "fecha": "2026-09-01",
    "valores": {
      "POPULAR": 13953.17,
      "BN-VITAL": 13773.84,
      "BCR-PENSION": 13460.15,
      "BACSJ PENSIONES": 13545.69,
      "CCSS-OPC": 15352.13,
      "VIDA PLENA": 15461.45
    },
    "promedioSistema": 14257.74,
    "variacionDiariaPct": 0.0
  },
  {
    "dia": 2,
    "fecha": "2026-09-02",
    "valores": {
      "POPULAR": 13957.21,
      "BN-VITAL": 13720.09,
      "BCR-PENSION": 13461.16,
      "BACSJ PENSIONES": 13548.85,
      "CCSS-OPC": 15400.35,
      "VIDA PLENA": 15568.62
    },
    "promedioSistema": 14276.05,
    "variacionDiariaPct": 0.13
  },
  {
    "dia": 3,
    "fecha": "2026-09-03",
    "valores": {
      "POPULAR": 14040.8,
      "BN-VITAL": 13790.53,
      "BCR-PENSION": 13539.43,
      "BACSJ PENSIONES": 13637.19,
      "CCSS-OPC": 15470.09,
      "VIDA PLENA": 15619.22
    },
    "promedioSistema": 14349.54,
    "variacionDiariaPct": 0.51
  },
  {
    "dia": 4,
    "fecha": "2026-09-04",
    "valores": {
      "POPULAR": 14066.48,
      "BN-VITAL": 13850.95,
      "BCR-PENSION": 13549.98,
      "BACSJ PENSIONES": 13633.96,
      "CCSS-OPC": 15515.27,
      "VIDA PLENA": 15626.43
    },
    "promedioSistema": 14373.85,
    "variacionDiariaPct": 0.17
  },
  {
    "dia": 5,
    "fecha": "2026-09-05",
    "valores": {
      "POPULAR": 14062.16,
      "BN-VITAL": 13846.74,
      "BCR-PENSION": 13546.72,
      "BACSJ PENSIONES": 13630.89,
      "CCSS-OPC": 15510.67,
      "VIDA PLENA": 15623.45
    },
    "promedioSistema": 14370.11,
    "variacionDiariaPct": -0.03
  },
  {
    "dia": 6,
    "fecha": "2026-09-06",
    "valores": {
      "POPULAR": 14063.71,
      "BN-VITAL": 13848.23,
      "BCR-PENSION": 13548.4,
      "BACSJ PENSIONES": 13632.76,
      "CCSS-OPC": 15512.45,
      "VIDA PLENA": 15625.14
    },
    "promedioSistema": 14371.78,
    "variacionDiariaPct": 0.01
  },
  {
    "dia": 7,
    "fecha": "2026-09-07",
    "valores": {
      "POPULAR": 14075.92,
      "BN-VITAL": 13869.84,
      "BCR-PENSION": 13555.49,
      "BACSJ PENSIONES": 13633.66,
      "CCSS-OPC": 15519.24,
      "VIDA PLENA": 15632.96
    },
    "promedioSistema": 14381.18,
    "variacionDiariaPct": 0.07
  },
  {
    "dia": 8,
    "fecha": "2026-09-08",
    "valores": {
      "POPULAR": 14048.29,
      "BN-VITAL": 13850.83,
      "BCR-PENSION": 13531.0,
      "BACSJ PENSIONES": 13607.37,
      "CCSS-OPC": 15486.36,
      "VIDA PLENA": 15601.52
    },
    "promedioSistema": 14354.23,
    "variacionDiariaPct": -0.19
  },
  {
    "dia": 9,
    "fecha": "2026-09-09",
    "valores": {
      "POPULAR": 14041.22,
      "BN-VITAL": 13834.34,
      "BCR-PENSION": 13505.97,
      "BACSJ PENSIONES": 13577.16,
      "CCSS-OPC": 15485.34,
      "VIDA PLENA": 15593.06
    },
    "promedioSistema": 14339.51,
    "variacionDiariaPct": -0.1
  },
  {
    "dia": 10,
    "fecha": "2026-09-10",
    "valores": {
      "POPULAR": 13969.58,
      "BN-VITAL": 13760.77,
      "BCR-PENSION": 13464.57,
      "BACSJ PENSIONES": 13537.44,
      "CCSS-OPC": 15411.48,
      "VIDA PLENA": 15534.99
    },
    "promedioSistema": 14279.81,
    "variacionDiariaPct": -0.42
  },
  {
    "dia": 11,
    "fecha": "2026-09-11",
    "valores": {
      "POPULAR": 13986.67,
      "BN-VITAL": 13753.97,
      "BCR-PENSION": 13477.63,
      "BACSJ PENSIONES": 13552.38,
      "CCSS-OPC": 15422.49,
      "VIDA PLENA": 15534.37
    },
    "promedioSistema": 14287.92,
    "variacionDiariaPct": 0.06
  },
  {
    "dia": 12,
    "fecha": "2026-09-12",
    "valores": {
      "POPULAR": 13986.14,
      "BN-VITAL": 13753.34,
      "BCR-PENSION": 13477.52,
      "BACSJ PENSIONES": 13552.41,
      "CCSS-OPC": 15421.91,
      "VIDA PLENA": 15534.64
    },
    "promedioSistema": 14287.66,
    "variacionDiariaPct": -0.0
  },
  {
    "dia": 13,
    "fecha": "2026-09-13",
    "valores": {
      "POPULAR": 13987.81,
      "BN-VITAL": 13754.83,
      "BCR-PENSION": 13479.26,
      "BACSJ PENSIONES": 13554.28,
      "CCSS-OPC": 15423.71,
      "VIDA PLENA": 15536.67
    },
    "promedioSistema": 14289.43,
    "variacionDiariaPct": 0.01
  },
  {
    "dia": 14,
    "fecha": "2026-09-14",
    "valores": {
      "POPULAR": 13937.69,
      "BN-VITAL": 13701.87,
      "BCR-PENSION": 13431.11,
      "BACSJ PENSIONES": 13517.02,
      "CCSS-OPC": 15354.28,
      "VIDA PLENA": 15505.98
    },
    "promedioSistema": 14241.32,
    "variacionDiariaPct": -0.34
  },
  {
    "dia": 15,
    "fecha": "2026-09-15",
    "valores": {
      "POPULAR": 13944.99,
      "BN-VITAL": 13708.84,
      "BCR-PENSION": 13437.6,
      "BACSJ PENSIONES": 13523.62,
      "CCSS-OPC": 15362.21,
      "VIDA PLENA": 15512.49
    },
    "promedioSistema": 14248.29,
    "variacionDiariaPct": 0.05
  },
  {
    "dia": 16,
    "fecha": "2026-09-16",
    "valores": {
      "POPULAR": 13886.18,
      "BN-VITAL": 13709.31,
      "BCR-PENSION": 13442.89,
      "BACSJ PENSIONES": 13524.94,
      "CCSS-OPC": 15317.64,
      "VIDA PLENA": 15474.51
    },
    "promedioSistema": 14225.91,
    "variacionDiariaPct": -0.16
  },
  {
    "dia": 17,
    "fecha": "2026-09-17",
    "valores": {
      "POPULAR": 13967.83,
      "BN-VITAL": 13712.46,
      "BCR-PENSION": 13445.42,
      "BACSJ PENSIONES": 13527.16,
      "CCSS-OPC": 15377.91,
      "VIDA PLENA": 15503.15
    },
    "promedioSistema": 14255.65,
    "variacionDiariaPct": 0.21
  },
  {
    "dia": 18,
    "fecha": "2026-09-18",
    "valores": {
      "POPULAR": 13970.39,
      "BN-VITAL": 13741.39,
      "BCR-PENSION": 13435.21,
      "BACSJ PENSIONES": 13508.03,
      "CCSS-OPC": 15372.52,
      "VIDA PLENA": 15495.61
    },
    "promedioSistema": 14253.86,
    "variacionDiariaPct": -0.01
  },
  {
    "dia": 19,
    "fecha": "2026-09-19",
    "valores": {
      "POPULAR": 13973.08,
      "BN-VITAL": 13743.88,
      "BCR-PENSION": 13437.81,
      "BACSJ PENSIONES": 13510.75,
      "CCSS-OPC": 15375.43,
      "VIDA PLENA": 15498.44
    },
    "promedioSistema": 14256.57,
    "variacionDiariaPct": 0.02
  },
  {
    "dia": 20,
    "fecha": "2026-09-20",
    "valores": {
      "POPULAR": 13974.74,
      "BN-VITAL": 13745.37,
      "BCR-PENSION": 13439.56,
      "BACSJ PENSIONES": 13512.62,
      "CCSS-OPC": 15377.24,
      "VIDA PLENA": 15500.45
    },
    "promedioSistema": 14258.33,
    "variacionDiariaPct": 0.01
  },
  {
    "dia": 21,
    "fecha": "2026-09-21",
    "valores": {
      "POPULAR": 14099.05,
      "BN-VITAL": 13824.27,
      "BCR-PENSION": 13511.84,
      "BACSJ PENSIONES": 13579.29,
      "CCSS-OPC": 15492.66,
      "VIDA PLENA": 15552.01
    },
    "promedioSistema": 14343.19,
    "variacionDiariaPct": 0.6
  },
  {
    "dia": 22,
    "fecha": "2026-09-22",
    "valores": {
      "POPULAR": 14156.2,
      "BN-VITAL": 13930.97,
      "BCR-PENSION": 13560.44,
      "BACSJ PENSIONES": 13623.57,
      "CCSS-OPC": 15543.99,
      "VIDA PLENA": 15596.9
    },
    "promedioSistema": 14402.01,
    "variacionDiariaPct": 0.41
  },
  {
    "dia": 23,
    "fecha": "2026-09-23",
    "valores": {
      "POPULAR": 14148.6,
      "BN-VITAL": 13938.55,
      "BCR-PENSION": 13557.56,
      "BACSJ PENSIONES": 13613.61,
      "CCSS-OPC": 15536.27,
      "VIDA PLENA": 15591.56
    },
    "promedioSistema": 14397.69,
    "variacionDiariaPct": -0.03
  },
  {
    "dia": 24,
    "fecha": "2026-09-24",
    "valores": {
      "POPULAR": 14197.31,
      "BN-VITAL": 13922.62,
      "BCR-PENSION": 13563.45,
      "BACSJ PENSIONES": 13623.56,
      "CCSS-OPC": 15569.05,
      "VIDA PLENA": 15593.49
    },
    "promedioSistema": 14411.58,
    "variacionDiariaPct": 0.1
  },
  {
    "dia": 25,
    "fecha": "2026-09-25",
    "valores": {
      "POPULAR": 14230.42,
      "BN-VITAL": 13975.06,
      "BCR-PENSION": 13605.33,
      "BACSJ PENSIONES": 13664.27,
      "CCSS-OPC": 15595.54,
      "VIDA PLENA": 15618.8
    },
    "promedioSistema": 14448.24,
    "variacionDiariaPct": 0.25
  },
  {
    "dia": 26,
    "fecha": "2026-09-26",
    "valores": {
      "POPULAR": 14224.83,
      "BN-VITAL": 13969.48,
      "BCR-PENSION": 13601.04,
      "BACSJ PENSIONES": 13660.13,
      "CCSS-OPC": 15589.47,
      "VIDA PLENA": 15615.17
    },
    "promedioSistema": 14443.35,
    "variacionDiariaPct": -0.03
  },
  {
    "dia": 27,
    "fecha": "2026-09-27",
    "valores": {
      "POPULAR": 14226.5,
      "BN-VITAL": 13970.97,
      "BCR-PENSION": 13602.79,
      "BACSJ PENSIONES": 13661.99,
      "CCSS-OPC": 15591.27,
      "VIDA PLENA": 15617.18
    },
    "promedioSistema": 14445.12,
    "variacionDiariaPct": 0.01
  },
  {
    "dia": 28,
    "fecha": "2026-09-28",
    "valores": {
      "POPULAR": 14196.17,
      "BN-VITAL": 13944.95,
      "BCR-PENSION": 13574.71,
      "BACSJ PENSIONES": 13638.33,
      "CCSS-OPC": 15569.04,
      "VIDA PLENA": 15607.14
    },
    "promedioSistema": 14421.72,
    "variacionDiariaPct": -0.16
  },
  {
    "dia": 29,
    "fecha": "2026-09-29",
    "valores": {
      "POPULAR": 14226.13,
      "BN-VITAL": 13965.0,
      "BCR-PENSION": 13601.06,
      "BACSJ PENSIONES": 13655.48,
      "CCSS-OPC": 15594.65,
      "VIDA PLENA": 15624.89
    },
    "promedioSistema": 14444.53,
    "variacionDiariaPct": 0.16
  }
];

export const SERIE_MENSUAL_RENTABILIDAD: RentabilidadMensualPunto[] = [
  {
    "mesId": "2025-10",
    "mesLabel": "Oct 25",
    "mesNombre": "Octubre 2025",
    "año": 2025,
    "valores": {
      "POPULAR": 11.32,
      "BN-VITAL": 9.76,
      "BCR-PENSION": 7.8,
      "BACSJ PENSIONES": 10.22,
      "CCSS-OPC": 6.97,
      "VIDA PLENA": 8.3
    },
    "promedioRealSistema": 9.99,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2025-11",
    "mesLabel": "Nov 25",
    "mesNombre": "Noviembre 2025",
    "año": 2025,
    "valores": {
      "POPULAR": 11.05,
      "BN-VITAL": 9.61,
      "BCR-PENSION": 7.5,
      "BACSJ PENSIONES": 9.87,
      "CCSS-OPC": 7.28,
      "VIDA PLENA": 8.15
    },
    "promedioRealSistema": 9.75,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2025-12",
    "mesLabel": "Dic 25",
    "mesNombre": "Diciembre 2025",
    "año": 2025,
    "valores": {
      "POPULAR": 12.17,
      "BN-VITAL": 10.94,
      "BCR-PENSION": 9.17,
      "BACSJ PENSIONES": 11.88,
      "CCSS-OPC": 8.61,
      "VIDA PLENA": 10.15
    },
    "promedioRealSistema": 11.23,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-01",
    "mesLabel": "Ene 26",
    "mesNombre": "Enero 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 14.88,
      "BN-VITAL": 13.52,
      "BCR-PENSION": 11.66,
      "BACSJ PENSIONES": 14.6,
      "CCSS-OPC": 11.44,
      "VIDA PLENA": 12.64
    },
    "promedioRealSistema": 13.87,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-02",
    "mesLabel": "Feb 26",
    "mesNombre": "Febrero 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 12.66,
      "BN-VITAL": 11.61,
      "BCR-PENSION": 10.5,
      "BACSJ PENSIONES": 12.91,
      "CCSS-OPC": 10.69,
      "VIDA PLENA": 11.55
    },
    "promedioRealSistema": 12.07,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-03",
    "mesLabel": "Mar 26",
    "mesNombre": "Marzo 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 11.79,
      "BN-VITAL": 10.19,
      "BCR-PENSION": 8.22,
      "BACSJ PENSIONES": 11.44,
      "CCSS-OPC": 9.36,
      "VIDA PLENA": 9.59
    },
    "promedioRealSistema": 10.72,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-04",
    "mesLabel": "Abr 26",
    "mesNombre": "Abril 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 15.03,
      "BN-VITAL": 12.6,
      "BCR-PENSION": 9.31,
      "BACSJ PENSIONES": 14.05,
      "CCSS-OPC": 13.33,
      "VIDA PLENA": 10.53
    },
    "promedioRealSistema": 13.23,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-05",
    "mesLabel": "May 26",
    "mesNombre": "Mayo 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 13.89,
      "BN-VITAL": 11.02,
      "BCR-PENSION": 8.84,
      "BACSJ PENSIONES": 11.58,
      "CCSS-OPC": 11.83,
      "VIDA PLENA": 9.6
    },
    "promedioRealSistema": 11.89,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-06",
    "mesLabel": "Jun 26",
    "mesNombre": "Junio 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 13.36,
      "BN-VITAL": 10.26,
      "BCR-PENSION": 8.19,
      "BACSJ PENSIONES": 10.22,
      "CCSS-OPC": 11.26,
      "VIDA PLENA": 9.62
    },
    "promedioRealSistema": 11.24,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-07",
    "mesLabel": "Jul 26",
    "mesNombre": "Julio 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 10.73,
      "BN-VITAL": 8.04,
      "BCR-PENSION": 7.1,
      "BACSJ PENSIONES": 8.8,
      "CCSS-OPC": 9.68,
      "VIDA PLENA": 9.76
    },
    "promedioRealSistema": 9.39,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-08",
    "mesLabel": "Ago 26",
    "mesNombre": "Agosto 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 10.99,
      "BN-VITAL": 8.31,
      "BCR-PENSION": 7.57,
      "BACSJ PENSIONES": 9.42,
      "CCSS-OPC": 9.82,
      "VIDA PLENA": 9.96
    },
    "promedioRealSistema": 9.72,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  },
  {
    "mesId": "2026-09",
    "mesLabel": "Sep 26",
    "mesNombre": "Septiembre 2026",
    "año": 2026,
    "valores": {
      "POPULAR": 9.5,
      "BN-VITAL": 6.86,
      "BCR-PENSION": 6.26,
      "BACSJ PENSIONES": 7.67,
      "CCSS-OPC": 8.57,
      "VIDA PLENA": 9.19
    },
    "promedioRealSistema": 8.32,
    "ipcAño": -1.87,
    "activosNetosCRC": 15472154859965
  }
];

export const SERIE_ANUAL_HISTORICA: SerieAnualHistorica[] = [
  { año: 2015, valores: { 'BACSJ PENSIONES': 5.20, 'BN-VITAL': 4.80, 'BCR-PENSION': 4.60, 'POPULAR': 4.50, 'VIDA PLENA': 4.30, 'CCSS-OPC': 4.10 }, promedioRealSistema: 4.65, inflacionAnual: -0.81, activosTotalesCRC: 11200000000000, comisionTope: 0.70, totalAfiliados: 2150000, hito: 'Tope legal 0.70% CONASSIF' },
  { año: 2016, valores: { 'BACSJ PENSIONES': 5.60, 'BN-VITAL': 5.10, 'BCR-PENSION': 4.90, 'POPULAR': 4.80, 'VIDA PLENA': 4.60, 'CCSS-OPC': 4.35 }, promedioRealSistema: 5.00, inflacionAnual: 0.77, activosTotalesCRC: 13100000000000, comisionTope: 0.70, totalAfiliados: 2300000, hito: 'Crecimiento continuo de fondos' },
  { año: 2017, valores: { 'BACSJ PENSIONES': 6.30, 'BN-VITAL': 5.75, 'BCR-PENSION': 5.50, 'POPULAR': 5.40, 'VIDA PLENA': 5.20, 'CCSS-OPC': 4.90 }, promedioRealSistema: 5.60, inflacionAnual: 2.57, activosTotalesCRC: 15400000000000, comisionTope: 0.50, totalAfiliados: 2450000, hito: 'Desescalada escalonada a 0.50%' },
  { año: 2018, valores: { 'BACSJ PENSIONES': 4.20, 'BN-VITAL': 3.80, 'BCR-PENSION': 3.65, 'POPULAR': 3.55, 'VIDA PLENA': 3.40, 'CCSS-OPC': 3.15 }, promedioRealSistema: 3.70, inflacionAnual: 2.22, activosTotalesCRC: 17900000000000, comisionTope: 0.50, totalAfiliados: 2600000, hito: 'Estabilidad de tasas locales' },
  { año: 2019, valores: { 'BACSJ PENSIONES': 7.50, 'BN-VITAL': 6.90, 'BCR-PENSION': 6.70, 'POPULAR': 6.55, 'VIDA PLENA': 6.30, 'CCSS-OPC': 6.00 }, promedioRealSistema: 6.75, inflacionAnual: 1.52, activosTotalesCRC: 20200000000000, comisionTope: 0.50, totalAfiliados: 2750000, hito: 'Año bursátil excepcional' },
  { año: 2020, valores: { 'BACSJ PENSIONES': 8.80, 'BN-VITAL': 8.20, 'BCR-PENSION': 7.90, 'POPULAR': 7.75, 'VIDA PLENA': 7.50, 'CCSS-OPC': 7.15 }, promedioRealSistema: 8.00, inflacionAnual: 0.72, activosTotalesCRC: 22400000000000, comisionTope: 0.35, totalAfiliados: 2850000, hito: 'Fijación del tope definitivo 0.35%' },
  { año: 2021, valores: { 'BACSJ PENSIONES': 7.10, 'BN-VITAL': 6.50, 'BCR-PENSION': 6.20, 'POPULAR': 6.05, 'VIDA PLENA': 5.85, 'CCSS-OPC': 5.50 }, promedioRealSistema: 6.30, inflacionAnual: 3.30, activosTotalesCRC: 24100000000000, comisionTope: 0.35, totalAfiliados: 2950000, hito: 'Reapertura y reactivación económica' },
  { año: 2022, valores: { 'BACSJ PENSIONES': -0.90, 'BN-VITAL': -1.80, 'BCR-PENSION': -2.10, 'POPULAR': -2.40, 'VIDA PLENA': -2.70, 'CCSS-OPC': -3.10 }, promedioRealSistema: -2.15, inflacionAnual: 7.88, activosTotalesCRC: 23800000000000, comisionTope: 0.35, totalAfiliados: 3020000, hito: 'Minusvalías globales (Tasas Fed)' },
  { año: 2023, valores: { 'BACSJ PENSIONES': 6.80, 'BN-VITAL': 6.10, 'BCR-PENSION': 5.85, 'POPULAR': 5.70, 'VIDA PLENA': 5.55, 'CCSS-OPC': 5.30 }, promedioRealSistema: 5.95, inflacionAnual: -1.77, activosTotalesCRC: 27100000000000, comisionTope: 0.35, totalAfiliados: 3080000, hito: 'Rebote histórico del Valor Cuota' },
  { año: 2024, valores: { 'BACSJ PENSIONES': 6.84, 'BN-VITAL': 6.20, 'BCR-PENSION': 5.95, 'POPULAR': 5.80, 'VIDA PLENA': 5.65, 'CCSS-OPC': 5.42 }, promedioRealSistema: 6.04, inflacionAnual: -1.87, activosTotalesCRC: 27450890000000, comisionTope: 0.35, totalAfiliados: 3120450, hito: 'Consolidación récord (> ₡27.4B)' }
];
