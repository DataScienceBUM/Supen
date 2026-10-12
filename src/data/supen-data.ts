import type {
  OperadoraInfo,
  KpiResumen,
  RentabilidadOpd,
  ComisionHistorica,
  PortafolioMacro,
  IsinTitulo,
  MovilidadResumen,
  AfiliadoDemografia,
  BeneficioModalidad,
  ApiEndpointSpec,
  GlosarioItem
} from './types';

export const KPI_SISTEMA: KpiResumen = {
  activosTotalesCRC: 27450890000000, // > ₡27.4 billones
  activosTotalesUSD: 53510506822,    // ~ $53.5 mil millones USD
  activosRopCRC: 13890450000000,    // ~ ₡13.89 billones ROP
  pesoPibRop: 29.4,                 // 29.4% del PIB
  totalAfiliados: 3120450,          // 3.12M registrados
  totalCotizantes: 1412890,         // 1.41M cotizantes activos en planilla SICERE
  tasaDensidadCotizacion: 45.28,    // 45.3% cotizan efectivamente cada mes
  rentabilidadReal5aPonderada: 3.42,// 3.42% real anualizada ponderada sistema
  comisionPromedio: 0.35,           // 0.35% sobre saldo vigente
  tipoCambioBccr: 513.00,           // ₡513 / USD tipo de cambio de referencia
  fechaCorte: '2024-01-31'
};

export const OPERADORAS: OperadoraInfo[] = [
  {
    id: 'POPULAR',
    codigo: 'A04',
    nombre: 'Popular Pensiones',
    nombreCorto: 'Popular',
    casaMatriz: 'Banco Popular y de Desarrollo Comunal',
    cuotaMercado: 39.8,
    colorHex: '#0284c7', // Sky blue
    colorTailwind: 'border-sky-500 text-sky-400 bg-sky-950/30',
    descripcion: 'Líder absoluto de mercado por activos y afiliados. Recibe la asignación legal por defecto de trabajadores no inscritos. Mayor cobertura territorial.',
    naturaleza: 'Ente Público no Estatal'
  },
  {
    id: 'BN-VITAL',
    codigo: 'A02',
    nombre: 'BN Vital',
    nombreCorto: 'BN Vital',
    casaMatriz: 'Banco Nacional de Costa Rica',
    cuotaMercado: 18.9,
    colorHex: '#16a34a', // Green
    colorTailwind: 'border-green-500 text-green-400 bg-green-950/30',
    descripcion: 'Segunda mayor operadora del país. Red de distribución bancaria más extensa a nivel nacional con fuerte peso corporativo e institucional.',
    naturaleza: 'Pública Comercial'
  },
  {
    id: 'BCR-PENSION',
    codigo: 'A01',
    nombre: 'BCR Pensión',
    nombreCorto: 'BCR',
    casaMatriz: 'Banco de Costa Rica',
    cuotaMercado: 15.3,
    colorHex: '#2563eb', // Blue
    colorTailwind: 'border-blue-500 text-blue-400 bg-blue-950/30',
    descripcion: 'Tercera posición del mercado. Muy consolidada en el sector empresarial e institucional ligado al conglomerado financiero BCR.',
    naturaleza: 'Pública Comercial'
  },
  {
    id: 'BACSJ PENSIONES',
    codigo: 'A05',
    nombre: 'BAC San José Pensiones',
    nombreCorto: 'BAC',
    casaMatriz: 'Grupo Financiero BAC Credomatic / Aval',
    cuotaMercado: 13.2,
    colorHex: '#dc2626', // Red
    colorTailwind: 'border-red-500 text-red-400 bg-red-950/30',
    descripcion: 'Líder del sector privado. Fuerte captación de masa salarial multinacional, plataformas digitales avanzadas y planes voluntarios en USD.',
    naturaleza: 'Privada'
  },
  {
    id: 'CCSS-OPC',
    codigo: 'A06',
    nombre: 'CCSS OPC',
    nombreCorto: 'CCSS',
    casaMatriz: 'Caja Costarricense de Seguro Social',
    cuotaMercado: 7.4,
    colorHex: '#0d9488', // Teal
    colorTailwind: 'border-teal-500 text-teal-400 bg-teal-950/30',
    descripcion: 'Creada por la Caja Costarricense de Seguro Social. Fuerte afinidad gremial con trabajadores del sector salud pública y funcionarios estatales.',
    naturaleza: 'Pública Autónoma'
  },
  {
    id: 'VIDA PLENA',
    codigo: 'A03',
    nombre: 'Vida Plena OPC',
    nombreCorto: 'Vida Plena',
    casaMatriz: 'Junta de Pensiones del Magisterio Nacional (JUPEMA)',
    cuotaMercado: 5.4,
    colorHex: '#d97706', // Amber
    colorTailwind: 'border-amber-500 text-amber-400 bg-amber-950/30',
    descripcion: 'Nicho magisterial y educativo. Fuerte arraigo en educadores y administrativos de escuelas, colegios y universidades públicas.',
    naturaleza: 'Gremial / Privada'
  }
];

export const RENTABILIDADES: RentabilidadOpd[] = [
  {
    operadoraId: 'BACSJ PENSIONES',
    nombre: 'BAC San José Pensiones',
    rentabilidadReal12m: 6.84,
    rentabilidadReal36m: 3.82,
    rentabilidadReal60m: 4.15,
    rentabilidadReal10a: 4.62,
    rentabilidadNominal12m: 8.75,
    rentabilidadNominal36m: 7.95,
    rentabilidadNominal60m: 8.10,
    comision: 0.35,
    calificacionSemaforo: 'alta'
  },
  {
    operadoraId: 'BN-VITAL',
    nombre: 'BN Vital',
    rentabilidadReal12m: 6.20,
    rentabilidadReal36m: 3.45,
    rentabilidadReal60m: 3.65,
    rentabilidadReal10a: 4.30,
    rentabilidadNominal12m: 8.10,
    rentabilidadNominal36m: 7.55,
    rentabilidadNominal60m: 7.62,
    comision: 0.35,
    calificacionSemaforo: 'alta'
  },
  {
    operadoraId: 'BCR-PENSION',
    nombre: 'BCR Pensión',
    rentabilidadReal12m: 5.95,
    rentabilidadReal36m: 3.28,
    rentabilidadReal60m: 3.48,
    rentabilidadReal10a: 4.18,
    rentabilidadNominal12m: 7.82,
    rentabilidadNominal36m: 7.38,
    rentabilidadNominal60m: 7.42,
    comision: 0.35,
    calificacionSemaforo: 'media'
  },
  {
    operadoraId: 'POPULAR',
    nombre: 'Popular Pensiones',
    rentabilidadReal12m: 5.80,
    rentabilidadReal36m: 3.15,
    rentabilidadReal60m: 3.32,
    rentabilidadReal10a: 4.05,
    rentabilidadNominal12m: 7.65,
    rentabilidadNominal36m: 7.22,
    rentabilidadNominal60m: 7.28,
    comision: 0.35,
    calificacionSemaforo: 'media'
  },
  {
    operadoraId: 'VIDA PLENA',
    nombre: 'Vida Plena OPC',
    rentabilidadReal12m: 5.65,
    rentabilidadReal36m: 3.02,
    rentabilidadReal60m: 3.18,
    rentabilidadReal10a: 3.92,
    rentabilidadNominal12m: 7.50,
    rentabilidadNominal36m: 7.10,
    rentabilidadNominal60m: 7.12,
    comision: 0.35,
    calificacionSemaforo: 'media'
  },
  {
    operadoraId: 'CCSS-OPC',
    nombre: 'CCSS OPC',
    rentabilidadReal12m: 5.42,
    rentabilidadReal36m: 2.85,
    rentabilidadReal60m: 2.98,
    rentabilidadReal10a: 3.75,
    rentabilidadNominal12m: 7.25,
    rentabilidadNominal36m: 6.90,
    rentabilidadNominal60m: 6.95,
    comision: 0.35,
    calificacionSemaforo: 'baja'
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
    categoria: 'Gobierno Central (Ministerio de Hacienda)',
    montoCRC: 8112022800000,
    montoUSD: 15812910000,
    porcentaje: 58.4,
    color: '#0284c7', // Sky blue
    descripcion: 'Títulos de Deuda Interna soberana (bonos BTP en colones y dólares). Alta rentabilidad libre de riesgo crediticio pero sujeta a riesgo fiscal local.'
  },
  {
    categoria: 'Inversiones en el Exterior (ETFs / Deuda Global)',
    montoCRC: 2944775400000,
    montoUSD: 5740303000,
    porcentaje: 21.2,
    color: '#10b981', // Emerald
    descripcion: 'Vehículos de renta variable global (Vanguard S&P 500, iShares MSCI) y bonos grado de inversión. Proporciona diversificación cambiaria y geográfica.'
  },
  {
    categoria: 'Banco Central y Sector Financiero Público',
    montoCRC: 1958553450000,
    montoUSD: 3817843000,
    porcentaje: 14.1,
    color: '#6366f1', // Indigo
    descripcion: 'Bonos de estabilización monetaria del BCCR y certificados de depósito de bancos estatales (BNCR, BCR).'
  },
  {
    categoria: 'Sector Privado y Corporativo Local',
    montoCRC: 875098350000,
    montoUSD: 1705845000,
    porcentaje: 6.3,
    color: '#f59e0b', // Amber
    descripcion: 'Emisiones corporativas, fideicomisos de obra pública, cuotas de fondos de inversión y notas estructuradas locales.'
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
    operadoraId: 'BACSJ PENSIONES',
    nombre: 'BAC San José Pensiones',
    entradasPersonas: 4890,
    salidasPersonas: 1850,
    saldoNetoPersonas: 3040,
    entradasMontoCRC: 18450000000,
    salidasMontoCRC: 7210000000,
    saldoNetoMontoCRC: 11240000000
  },
  {
    operadoraId: 'BN-VITAL',
    nombre: 'BN Vital',
    entradasPersonas: 3620,
    salidasPersonas: 2410,
    saldoNetoPersonas: 1210,
    entradasMontoCRC: 12890000000,
    salidasMontoCRC: 9450000000,
    saldoNetoMontoCRC: 3440000000
  },
  {
    operadoraId: 'VIDA PLENA',
    nombre: 'Vida Plena OPC',
    entradasPersonas: 840,
    salidasPersonas: 710,
    saldoNetoPersonas: 130,
    entradasMontoCRC: 3120000000,
    salidasMontoCRC: 2780000000,
    saldoNetoMontoCRC: 340000000
  },
  {
    operadoraId: 'BCR-PENSION',
    nombre: 'BCR Pensión',
    entradasPersonas: 2150,
    salidasPersonas: 2680,
    saldoNetoPersonas: -530,
    entradasMontoCRC: 8120000000,
    salidasMontoCRC: 9890000000,
    saldoNetoMontoCRC: -1770000000
  },
  {
    operadoraId: 'CCSS-OPC',
    nombre: 'CCSS OPC',
    entradasPersonas: 920,
    salidasPersonas: 1540,
    saldoNetoPersonas: -620,
    entradasMontoCRC: 3450000000,
    salidasMontoCRC: 5680000000,
    saldoNetoMontoCRC: -2230000000
  },
  {
    operadoraId: 'POPULAR',
    nombre: 'Popular Pensiones',
    entradasPersonas: 4120,
    salidasPersonas: 7350,
    saldoNetoPersonas: -3230,
    entradasMontoCRC: 15920000000,
    salidasMontoCRC: 26940000000,
    saldoNetoMontoCRC: -11020000000
  }
];

export const DEMOGRAFIA_AFILIADOS: AfiliadoDemografia[] = [
  {
    rangoEdad: '< 31 años',
    afiliadosTotal: 842100,
    cotizantesEfectivos: 395400,
    porcentajeCotizantes: 46.9,
    hombresAfiliados: 442100,
    mujeresAfiliadas: 400000,
    hombresCotizantes: 212400,
    mujeresCotizantes: 183000,
    salarioPromedioHombresCRC: 512000,
    salarioPromedioMujeresCRC: 498000
  },
  {
    rangoEdad: '31 a < 45 años',
    afiliadosTotal: 1184500,
    cotizantesEfectivos: 586200,
    porcentajeCotizantes: 49.5,
    hombresAfiliados: 615000,
    mujeresAfiliadas: 569500,
    hombresCotizantes: 312000,
    mujeresCotizantes: 274200,
    salarioPromedioHombresCRC: 728000,
    salarioPromedioMujeresCRC: 685000
  },
  {
    rangoEdad: '45 a < 59 años',
    afiliadosTotal: 792400,
    cotizantesEfectivos: 348100,
    porcentajeCotizantes: 43.9,
    hombresAfiliados: 404000,
    mujeresAfiliadas: 388400,
    hombresCotizantes: 184500,
    mujeresCotizantes: 163600,
    salarioPromedioHombresCRC: 812000,
    salarioPromedioMujeresCRC: 742000
  },
  {
    rangoEdad: '59 a < 100 años',
    afiliadosTotal: 298450,
    cotizantesEfectivos: 82990,
    porcentajeCotizantes: 27.8,
    hombresAfiliados: 154000,
    mujeresAfiliadas: 144450,
    hombresCotizantes: 45200,
    mujeresCotizantes: 37790,
    salarioPromedioHombresCRC: 745000,
    salarioPromedioMujeresCRC: 695000
  },
  {
    rangoEdad: '>= 100 años',
    afiliadosTotal: 3000,
    cotizantesEfectivos: 200,
    porcentajeCotizantes: 6.7,
    hombresAfiliados: 1400,
    mujeresAfiliadas: 1600,
    hombresCotizantes: 110,
    mujeresCotizantes: 90,
    salarioPromedioHombresCRC: 410000,
    salarioPromedioMujeresCRC: 405000
  }
];

export const BENEFICIOS_RETIROS: BeneficioModalidad[] = [
  {
    codigo: '1',
    modalidad: 'Renta Permanente',
    descripcion: 'El afiliado retira periódicamente únicamente los rendimientos reales de los últimos 36 meses, preservando el capital para sus herederos.',
    cantidadBeneficiarios: 42150,
    montoTotalCRC: 6825000000,
    pensionPromedioMensualCRC: 161920,
    porcentaje: 48.5
  },
  {
    codigo: '2',
    modalidad: 'Retiro Programado',
    descripcion: 'El saldo permanece en la operadora generando rendimientos y la mensualidad se recalcula cada 12 meses dividiendo el capital entre la expectativa de vida actuarial.',
    cantidadBeneficiarios: 28400,
    montoTotalCRC: 5120000000,
    pensionPromedioMensualCRC: 180280,
    porcentaje: 32.7
  },
  {
    codigo: '3',
    modalidad: 'Transitorio XX (Ley 9906)',
    descripcion: 'Retiro acelerado en mensualidades iguales a la cantidad de cuotas aportadas al régimen (vigente temporalmente hasta 2030).',
    cantidadBeneficiarios: 12850,
    montoTotalCRC: 3410000000,
    pensionPromedioMensualCRC: 265370,
    porcentaje: 14.8
  },
  {
    codigo: '4',
    modalidad: 'Renta Vitalicia',
    descripcion: 'Se traslada el saldo total a una aseguradora (ej. INS) que garantiza una mensualidad fija indexada de por vida, asumiendo el riesgo de longevidad.',
    cantidadBeneficiarios: 3500,
    montoTotalCRC: 685000000,
    pensionPromedioMensualCRC: 195710,
    porcentaje: 4.0
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
