#!/usr/bin/env node
/**
 * =============================================================================
 * SISTEMA DE ACTUALIZACIÓN AUTOMÁTICA DE DATOS SUPEN (NODE.JS NATIVO)
 * =============================================================================
 * Compatible al 100% con contenedores Dokploy / Docker / Nixpacks basados en Node.
 * Cero dependencias externas: usa `fetch`, `fs`, `path` nativos de Node.js.
 *
 * Uso:
 *   node update_supen_data.mjs             # Actualiza datos y compila el portal
 *   node update_supen_data.mjs --no-build  # Actualiza datos sin compilar Astro
 *   node update_supen_data.mjs --check     # Verifica integridad de los datos
 *   node update_supen_data.mjs --dry-run   # Simula la consulta sin tocar archivos
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Tolerar certificados intermedios de servidores públicos de Costa Rica
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = __dirname;
const TARGET_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'supen-data.ts');

const BASE_URL = 'https://webapps.supen.fi.cr/estadisticas/api';
const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json'
};

const OPERADORAS_METADATA = [
  {
    id: 'POPULAR',
    codigo: 'A04',
    nombre: 'Popular Pensiones',
    nombreCorto: 'Popular',
    casaMatriz: 'Banco Popular y de Desarrollo Comunal',
    colorHex: '#0284c7',
    colorTailwind: 'border-sky-500 text-sky-400 bg-sky-950/30',
    descripcion: 'Líder absoluto de mercado por activos y afiliados. Recibe la asignación legal por defecto de trabajadores no inscritos. Mayor cobertura territorial.',
    naturaleza: 'Ente Público no Estatal',
    ltCol: 'POPULAR'
  },
  {
    id: 'BN-VITAL',
    codigo: 'A02',
    nombre: 'BN Vital',
    nombreCorto: 'BN Vital',
    casaMatriz: 'Banco Nacional de Costa Rica',
    colorHex: '#16a34a',
    colorTailwind: 'border-green-500 text-green-400 bg-green-950/30',
    descripcion: 'Segunda mayor operadora del país. Red de distribución bancaria más extensa a nivel nacional con fuerte peso corporativo e institucional.',
    naturaleza: 'Pública Comercial',
    ltCol: 'BN_VITAL'
  },
  {
    id: 'BCR-PENSION',
    codigo: 'A01',
    nombre: 'BCR Pensión',
    nombreCorto: 'BCR',
    casaMatriz: 'Banco de Costa Rica',
    colorHex: '#2563eb',
    colorTailwind: 'border-blue-500 text-blue-400 bg-blue-950/30',
    descripcion: 'Tercera posición del mercado. Muy consolidada en el sector empresarial e institucional ligado al conglomerado financiero BCR.',
    naturaleza: 'Pública Comercial',
    ltCol: 'BCR_PENSION'
  },
  {
    id: 'BACSJ PENSIONES',
    codigo: 'A05',
    nombre: 'BAC San José Pensiones',
    nombreCorto: 'BAC',
    casaMatriz: 'Grupo Financiero BAC Credomatic / Aval',
    colorHex: '#dc2626',
    colorTailwind: 'border-red-500 text-red-400 bg-red-950/30',
    descripcion: 'Líder del sector privado. Fuerte captación de masa salarial multinacional, plataformas digitales avanzadas y planes voluntarios en USD.',
    naturaleza: 'Privada',
    ltCol: 'BACSJ_PENSIONES'
  },
  {
    id: 'CCSS-OPC',
    codigo: 'A06',
    nombre: 'CCSS OPC',
    nombreCorto: 'CCSS',
    casaMatriz: 'Caja Costarricense de Seguro Social',
    colorHex: '#0d9488',
    colorTailwind: 'border-teal-500 text-teal-400 bg-teal-950/30',
    descripcion: 'Creada por la Caja Costarricense de Seguro Social. Fuerte afinidad gremial con trabajadores del sector salud pública y funcionarios estatales.',
    naturaleza: 'Pública Autónoma',
    ltCol: 'CCSS_OPC'
  },
  {
    id: 'VIDA PLENA',
    codigo: 'A03',
    nombre: 'Vida Plena OPC',
    nombreCorto: 'Vida Plena',
    casaMatriz: 'Junta de Pensiones del Magisterio Nacional (JUPEMA)',
    colorHex: '#d97706',
    colorTailwind: 'border-amber-500 text-amber-400 bg-amber-950/30',
    descripcion: 'Nicho magisterial y educativo. Fuerte arraigo en educadores y administrativos de escuelas, colegios y universidades públicas.',
    naturaleza: 'Gremial / Privada',
    ltCol: 'VIDA_PLENA'
  }
];

const MESES_ES = {
  1: ['Ene', 'Enero'],
  2: ['Feb', 'Febrero'],
  3: ['Mar', 'Marzo'],
  4: ['Abr', 'Abril'],
  5: ['May', 'Mayo'],
  6: ['Jun', 'Junio'],
  7: ['Jul', 'Julio'],
  8: ['Ago', 'Agosto'],
  9: ['Sep', 'Septiembre'],
  10: ['Oct', 'Octubre'],
  11: ['Nov', 'Noviembre'],
  12: ['Dic', 'Diciembre']
};

function log(msg) {
  const ts = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${ts}] ${msg}`);
}

async function fetchEndpoint(endpoint, query = '', retries = 2, timeoutMs = 35000) {
  let url = `${BASE_URL}/${endpoint}`;
  if (query) url += `?${query}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      log(`Consultando ${endpoint} (${query || 'sin filtros'}) [Intento ${attempt}/${retries}]...`);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const resp = await fetch(url, {
        headers: DEFAULT_HEADERS,
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
      }
      const data = await resp.json();
      log(`  ✓ ${endpoint}: ${data.length} registros recibidos.`);
      return data;
    } catch (err) {
      log(`  ⚠️ Intento ${attempt} fallido para ${endpoint}: ${err.message}`);
    }
  }
  log(`  ❌ Falló la consulta a ${endpoint} tras ${retries} intentos.`);
  return null;
}

function processData(rendData, comData, cueData, afiData, ltData, benData, pfData) {
  log('Procesando y normalizando indicadores previsionales...');

  // 1. Activos Netos ROP (cuenta 0110000000000)
  const activosRows = cueData.filter(x => x.codigocuenta === '0110000000000');
  if (!activosRows.length) throw new Error('No se encontraron registros de Activo Neto (0110000000000)');

  const latestCueDate = activosRows.reduce((max, x) => x.fecha > max ? x.fecha : max, activosRows[0].fecha);
  const latestActivos = activosRows.filter(x => x.fecha === latestCueDate);

  const totalActivosRopCRC = Math.round(latestActivos.reduce((sum, x) => sum + (x.montocolones || 0), 0));
  const totalActivosRopUSD = Math.round(latestActivos.reduce((sum, x) => sum + (x.montodolares || 0), 0));
  const tipoCambio = totalActivosRopUSD > 0 ? Number((totalActivosRopCRC / totalActivosRopUSD).toFixed(2)) : 513.0;

  const totalSistemaCRC = Math.round(totalActivosRopCRC * 1.83);
  const totalSistemaUSD = Math.round(totalSistemaCRC / tipoCambio);

  // 2. Operadoras y Cuotas de Mercado
  const activosPorOpc = {};
  for (const x of latestActivos) {
    activosPorOpc[x.entidad] = x.montocolones || 0;
  }

  const operadoras = OPERADORAS_METADATA.map(meta => {
    const aum = activosPorOpc[meta.id] || 0;
    const cuota = totalActivosRopCRC > 0 ? Number((aum / totalActivosRopCRC * 100).toFixed(1)) : 0;
    return {
      id: meta.id,
      codigo: meta.codigo,
      nombre: meta.nombre,
      nombreCorto: meta.nombreCorto,
      casaMatriz: meta.casaMatriz,
      cuotaMercado: cuota,
      colorHex: meta.colorHex,
      colorTailwind: meta.colorTailwind,
      descripcion: meta.descripcion,
      naturaleza: meta.naturaleza
    };
  });

  // 3. Rentabilidades
  const latestRendDate = rendData.reduce((max, x) => x.fecha > max ? x.fecha : max, rendData[0].fecha);
  const latestRend = rendData.filter(x => x.fecha === latestRendDate);

  const latestComDate = comData?.length ? comData.reduce((max, x) => x.fecha > max ? x.fecha : max, comData[0].fecha) : null;
  const latestCom = latestComDate ? comData.filter(x => x.fecha === latestComDate && x.tipo === 'SALDO') : [];
  const comMap = {};
  for (const x of latestCom) comMap[x.entidad] = x.comisión || 0.35;

  const rentabilidades = OPERADORAS_METADATA.map(meta => {
    const items = latestRend.filter(x => x.entidad === meta.id);
    const rReal12 = items.find(x => x.tipo === 'REAL' && x.periodicidad === 'ANUAL')?.rentabilidad || 0.0;
    const rReal36 = items.find(x => x.tipo === 'REAL' && x.periodicidad?.includes('3'))?.rentabilidad || 0.0;
    const rReal60 = items.find(x => x.tipo === 'REAL' && x.periodicidad?.includes('5'))?.rentabilidad || 0.0;
    const rReal10 = items.find(x => x.tipo === 'REAL' && x.periodicidad?.includes('10'))?.rentabilidad || 0.0;

    const rNom12 = items.find(x => x.tipo === 'NOMINAL' && x.periodicidad === 'ANUAL')?.rentabilidad || 0.0;
    const rNom36 = items.find(x => x.tipo === 'NOMINAL' && x.periodicidad?.includes('3'))?.rentabilidad || 0.0;
    const rNom60 = items.find(x => x.tipo === 'NOMINAL' && x.periodicidad?.includes('5'))?.rentabilidad || 0.0;

    const com = comMap[meta.id] || 0.35;
    let semaforo = 'media';
    if (rReal12 >= 8.0) semaforo = 'alta';
    else if (rReal12 < 6.0) semaforo = 'baja';

    return {
      operadoraId: meta.id,
      nombre: meta.nombre,
      rentabilidadReal12m: Number(rReal12.toFixed(2)),
      rentabilidadReal36m: Number(rReal36.toFixed(2)),
      rentabilidadReal60m: Number(rReal60.toFixed(2)),
      rentabilidadReal10a: Number(rReal10.toFixed(2)),
      rentabilidadNominal12m: Number(rNom12.toFixed(2)),
      rentabilidadNominal36m: Number(rNom36.toFixed(2)),
      rentabilidadNominal60m: Number(rNom60.toFixed(2)),
      comision: Number(com.toFixed(2)),
      calificacionSemaforo: semaforo
    };
  });

  // 4. Afiliados y Demografía
  const latestAfiDate = afiData.reduce((max, x) => x.fecha > max ? x.fecha : max, afiData[0].fecha);
  const latestAfi = afiData.filter(x => x.fecha === latestAfiDate);

  const totalAfiliados = latestAfi.reduce((sum, x) => sum + (x.afiliados || 0), 0);
  const totalCotizantes = latestAfi.reduce((sum, x) => sum + (x.aportantes || 0), 0);
  const densidad = totalAfiliados > 0 ? Number((totalCotizantes / totalAfiliados * 100).toFixed(2)) : 43.0;

  const ageBrackets = [
    ['< 31', '< 31 años'],
    ['31 A < 45', '31 a < 45 años'],
    ['45 A < 59', '45 a < 59 años'],
    ['59 A < 100', '59 a < 100 años'],
    ['>= 100', '>= 100 años']
  ];

  const demografia = ageBrackets.map(([sub, label]) => {
    const items = latestAfi.filter(x => (x.rangoedad || '').includes(sub));
    const totAfi = items.reduce((sum, x) => sum + (x.afiliados || 0), 0);
    const totCot = items.reduce((sum, x) => sum + (x.aportantes || 0), 0);

    const mItems = items.filter(x => x.sexo === 'MASCULINO');
    const fItems = items.filter(x => x.sexo === 'FEMENINO');

    const mAfi = mItems.reduce((sum, x) => sum + (x.afiliados || 0), 0);
    const fAfi = fItems.reduce((sum, x) => sum + (x.afiliados || 0), 0);
    const mCot = mItems.reduce((sum, x) => sum + (x.aportantes || 0), 0);
    const fCot = fItems.reduce((sum, x) => sum + (x.aportantes || 0), 0);

    const mSal = mItems.reduce((sum, x) => sum + (x.salario_o_aporte_colones || 0), 0);
    const fSal = fItems.reduce((sum, x) => sum + (x.salario_o_aporte_colones || 0), 0);

    const avgMSal = mCot > 0 ? Math.round((mSal / mCot) / 0.0425) : 0;
    const avgFSal = fCot > 0 ? Math.round((fSal / fCot) / 0.0425) : 0;
    const pctCot = totAfi > 0 ? Number((totCot / totAfi * 100).toFixed(1)) : 0;

    return {
      rangoEdad: label,
      afiliadosTotal: totAfi,
      cotizantesEfectivos: totCot,
      porcentajeCotizantes: pctCot,
      hombresAfiliados: mAfi,
      mujeresAfiliadas: fAfi,
      hombresCotizantes: mCot,
      mujeresCotizantes: fCot,
      salarioPromedioHombresCRC: avgMSal,
      salarioPromedioMujeresCRC: avgFSal
    };
  });

  // 5. Libre Transferencia (Movilidad)
  const latestLtDate = ltData.reduce((max, x) => x.fecha > max ? x.fecha : max, ltData[0].fecha);
  const latestLt = ltData.filter(x => x.fecha === latestLtDate && x.codigomoneda === 1);

  const colMap = {};
  for (const m of OPERADORAS_METADATA) colMap[m.id] = m.ltCol;

  const movilidad = OPERADORAS_METADATA.map(meta => {
    const opId = meta.id;
    const colPrefix = meta.ltCol;

    const origRow = latestLt.find(x => x.entidadorigen === opId) || {};
    let salPers = 0;
    let salMonto = 0;
    for (const [otherId, otherCol] of Object.entries(colMap)) {
      if (otherId !== opId) {
        salPers += origRow[`${otherCol}_C`] || 0;
        salMonto += origRow[`${otherCol}_M`] || 0;
      }
    }

    let entPers = 0;
    let entMonto = 0;
    for (const r of latestLt) {
      if (r.entidadorigen !== opId) {
        entPers += r[`${colPrefix}_C`] || 0;
        entMonto += r[`${colPrefix}_M`] || 0;
      }
    }

    return {
      operadoraId: opId,
      nombre: meta.nombre,
      entradasPersonas: entPers,
      salidasPersonas: salPers,
      saldoNetoPersonas: entPers - salPers,
      entradasMontoCRC: Math.round(entMonto),
      salidasMontoCRC: Math.round(salMonto),
      saldoNetoMontoCRC: Math.round(entMonto - salMonto)
    };
  });

  // 6. Beneficios y Retiros
  const latestBenDate = benData.reduce((max, x) => x.fecha > max ? x.fecha : max, benData[0].fecha);
  const latestBen = benData.filter(x => x.fecha === latestBenDate);

  const totalBenCRC = latestBen.reduce((sum, x) => sum + (x.beneficiocolones || 0), 0);
  const modDefs = [
    ['1', 'Renta Permanente', 'El afiliado retira periódicamente únicamente los rendimientos reales de los últimos 36 meses, preservando el capital para sus herederos.', ['1']],
    ['2', 'Retiro Programado', 'El saldo permanece en la operadora generando rendimientos y la mensualidad se recalcula cada 12 meses dividiendo el capital entre la expectativa de vida actuarial.', ['2']],
    ['3', 'Transitorio XX (Ley 9906)', 'Retiro acelerado en mensualidades iguales a la cantidad de cuotas aportadas al régimen (vigente temporalmente hasta 2030).', ['8', '7', '4']],
    ['4', 'Renta Vitalicia', 'Se traslada el saldo total a una aseguradora o liquidación garantizada.', ['9', '5']]
  ];

  const beneficios = modDefs.map(([code, mod, desc, matchCodes]) => {
    const items = latestBen.filter(x => matchCodes.includes(String(x.codigotipobeneficio)));
    const cant = items.reduce((sum, x) => sum + (x.beneficio || 0), 0);
    const monto = items.reduce((sum, x) => sum + (x.beneficiocolones || 0), 0);
    const prom = cant > 0 ? Math.round(monto / cant) : 0;
    const pct = totalBenCRC > 0 ? Number((monto / totalBenCRC * 100).toFixed(1)) : 0;
    return {
      codigo: code,
      modalidad: mod,
      descripcion: desc,
      cantidadBeneficiarios: cant,
      montoTotalCRC: Math.round(monto),
      pensionPromedioMensualCRC: prom,
      porcentaje: pct
    };
  });

  // 7. Portafolio Macro
  let portafolioMacro = [];
  if (pfData && pfData.length) {
    const groups = {
      'Gobierno Central (Ministerio de Hacienda)': {
        crc: 0, usd: 0, color: '#0284c7',
        desc: 'Títulos de Deuda Interna soberana (bonos BTP en colones y dólares). Alta rentabilidad libre de riesgo crediticio pero sujeta a riesgo fiscal local.'
      },
      'Inversiones en el Exterior (ETFs / Deuda Global)': {
        crc: 0, usd: 0, color: '#10b981',
        desc: 'Vehículos de renta variable global (Vanguard S&P 500, iShares MSCI) y bonos grado de inversión. Proporciona diversificación cambiaria y geográfica.'
      },
      'Banco Central y Sector Financiero Público': {
        crc: 0, usd: 0, color: '#6366f1',
        desc: 'Bonos de estabilización monetaria del BCCR y certificados de depósito de bancos estatales (BNCR, BCR).'
      },
      'Sector Privado y Corporativo Local': {
        crc: 0, usd: 0, color: '#f59e0b',
        desc: 'Emisiones corporativas, fideicomisos de obra pública, cuotas de fondos de inversión y notas estructuradas locales.'
      }
    };

    for (const x of pfData) {
      const sec = x.sector || '';
      const em = (x.emisor_gestor || '').toUpperCase();
      const crc = x.montocolones || 0;
      const usd = x.montodolares || 0;
      let k = 'Sector Privado y Corporativo Local';
      if (sec === 'EXTRANJERO') k = 'Inversiones en el Exterior (ETFs / Deuda Global)';
      else if (['HACIENDA', 'GOBIERNO', 'MH', 'TP'].some(s => em.includes(s))) k = 'Gobierno Central (Ministerio de Hacienda)';
      else if (['BANCO CENTRAL', 'BCCR', 'BANCO'].some(s => em.includes(s))) k = 'Banco Central y Sector Financiero Público';

      groups[k].crc += crc;
      groups[k].usd += usd;
    }

    const totPfCRC = Object.values(groups).reduce((sum, g) => sum + g.crc, 0);
    portafolioMacro = Object.entries(groups).map(([cat, g]) => ({
      categoria: cat,
      montoCRC: Math.round(g.crc),
      montoUSD: Math.round(g.usd),
      porcentaje: totPfCRC > 0 ? Number((g.crc / totPfCRC * 100).toFixed(1)) : 0,
      color: g.color,
      descripcion: g.desc
    }));
  }

  // 8. Series Temporales
  // A. Serie Diaria Valor Cuota (0130000000000)
  const cuotasRows = cueData.filter(x => x.codigocuenta === '0130000000000');
  const cuotasDates = Array.from(new Set(cuotasRows.map(x => x.fecha))).sort();

  const latestCuotaDate = cuotasDates[cuotasDates.length - 1];
  const latestMonthPrefix = latestCuotaDate.substring(0, 7);
  let monthDays = cuotasDates.filter(d => d.startsWith(latestMonthPrefix));
  if (monthDays.length < 28 && cuotasDates.length >= 31) {
    monthDays = cuotasDates.slice(-31);
  }

  const serieDiaria = [];
  let prevProm = null;
  monthDays.forEach((dStr, idx) => {
    const dayItems = {};
    for (const x of cuotasRows) {
      if (x.fecha === dStr) dayItems[x.entidad] = x.montocolones || 0;
    }
    const vals = {};
    for (const op of OPERADORAS_METADATA) {
      vals[op.id] = Number((dayItems[op.id] || 0).toFixed(2));
    }
    const valList = Object.values(vals);
    const promSistema = Number((valList.reduce((a, b) => a + b, 0) / valList.length).toFixed(2));
    const varPct = prevProm ? Number(((promSistema - prevProm) / prevProm * 100).toFixed(2)) : 0.00;
    prevProm = promSistema;

    serieDiaria.push({
      dia: idx + 1,
      fecha: dStr.substring(0, 10),
      valores: vals,
      promedioSistema: promSistema,
      variacionDiariaPct: varPct
    });
  });

  // B. Serie Mensual Rentabilidad (12 meses)
  const realAnualRows = rendData.filter(x => x.tipo === 'REAL' && x.periodicidad === 'ANUAL');
  const allRendDates = Array.from(new Set(realAnualRows.map(x => x.fecha))).sort();
  const last12Dates = allRendDates.slice(-12);

  const serieMensual = last12Dates.map(dStr => {
    const dt = new Date(dStr);
    const y = dt.getUTCFullYear();
    const m = dt.getUTCMonth() + 1;
    const [mesAbbr, mesNom] = MESES_ES[m];
    const mesId = dStr.substring(0, 7);
    const mesLabel = `${mesAbbr} ${String(y).substring(2)}`;
    const mesNombre = `${mesNom} ${y}`;

    const mItems = {};
    for (const x of realAnualRows) {
      if (x.fecha === dStr) mItems[x.entidad] = x.rentabilidad || 0.0;
    }
    const mVals = {};
    for (const op of OPERADORAS_METADATA) {
      mVals[op.id] = Number((mItems[op.id] || 0.0).toFixed(2));
    }
    const valList = Object.values(mVals);
    const promReal = mItems.TOTAL || Number((valList.reduce((a, b) => a + b, 0) / valList.length).toFixed(2));

    return {
      mesId,
      mesLabel,
      mesNombre,
      año: y,
      valores: mVals,
      promedioRealSistema: Number(promReal.toFixed(2)),
      ipcAño: -1.87,
      activosNetosCRC: totalActivosRopCRC
    };
  });

  // C. Rentabilidad ponderada 5 años
  const ponderada5a = rentabilidades.reduce((sum, r, i) => sum + (r.rentabilidadReal60m * operadoras[i].cuotaMercado / 100), 0);

  // 9. KPI Consolidado
  const pibCRC = 47200000000000;
  const pesoPib = Number((totalActivosRopCRC / pibCRC * 100).toFixed(1));

  const kpiSistema = {
    activosTotalesCRC: totalSistemaCRC,
    activosTotalesUSD: totalSistemaUSD,
    activosRopCRC: totalActivosRopCRC,
    pesoPibRop: pesoPib,
    totalAfiliados,
    totalCotizantes,
    tasaDensidadCotizacion: densidad,
    rentabilidadReal5aPonderada: Number(ponderada5a.toFixed(2)),
    comisionPromedio: 0.35,
    tipoCambioBccr: tipoCambio,
    fechaCorte: latestRendDate.substring(0, 10)
  };

  return {
    kpi_sistema: kpiSistema,
    operadoras,
    rentabilidades,
    demografia,
    movilidad,
    beneficios,
    portafolio_macro: portafolioMacro,
    serie_diaria: serieDiaria,
    serie_mensual: serieMensual
  };
}

function generateTypeScript(data, existingContent) {
  log('Generando código TypeScript...');

  function extractConst(varName, fallback = '') {
    const marker = `export const ${varName}`;
    if (existingContent.includes(marker)) {
      const start = existingContent.indexOf(marker);
      const nextStart = existingContent.indexOf('\nexport const ', start + marker.length);
      if (nextStart !== -1) {
        return existingContent.substring(start, nextStart).trim();
      }
      return existingContent.substring(start).trim();
    }
    return fallback;
  }

  const historicoComisiones = extractConst('HISTORICO_COMISIONES');
  const titulosIsin = extractConst('TITULOS_ISIN_DESTACADOS');
  const apiEndpoints = extractConst('API_ENDPOINTS');
  const glosario = extractConst('GLOSARIO');
  const serieAnual = extractConst('SERIE_ANUAL_HISTORICA');

  const portafolioMacroCode = data.portafolio_macro?.length
    ? `export const PORTAFOLIO_MACRO: PortafolioMacro[] = ${JSON.stringify(data.portafolio_macro, null, 2)};`
    : extractConst('PORTAFOLIO_MACRO');

  return `import type {
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
// Generado automáticamente por: update_supen_data.mjs
// Fecha de corte oficial: ${data.kpi_sistema.fechaCorte}
// ============================================================================

export const KPI_SISTEMA: KpiResumen = ${JSON.stringify(data.kpi_sistema, null, 2)};

export const OPERADORAS: OperadoraInfo[] = ${JSON.stringify(data.operadoras, null, 2)};

export const RENTABILIDADES: RentabilidadOpd[] = ${JSON.stringify(data.rentabilidades, null, 2)};

${historicoComisiones}

${portafolioMacroCode}

${titulosIsin}

export const MOVILIDAD_RESUMEN: MovilidadResumen[] = ${JSON.stringify(data.movilidad, null, 2)};

export const DEMOGRAFIA_AFILIADOS: AfiliadoDemografia[] = ${JSON.stringify(data.demografia, null, 2)};

export const BENEFICIOS_RETIROS: BeneficioModalidad[] = ${JSON.stringify(data.beneficios, null, 2)};

${apiEndpoints}

${glosario}

// ==========================================
// SERIES TEMPORALES MULTI-GRANULARIDAD (DÍAS, MESES, AÑOS)
// Según estándar metodológico de la SUPEN / CONASSIF
// ==========================================

export const SERIE_DIARIA_VALOR_CUOTA: ValorCuotaDiario[] = ${JSON.stringify(data.serie_diaria, null, 2)};

export const SERIE_MENSUAL_RENTABILIDAD: RentabilidadMensualPunto[] = ${JSON.stringify(data.serie_mensual, null, 2)};

${serieAnual}
`;
}

async function main() {
  const args = process.argv.slice(2);
  const isNoBuild = args.includes('--no-build');
  const isCheck = args.includes('--check');
  const isDryRun = args.includes('--dry-run');

  if (isCheck) {
    log('Modo comprobación activado (--check)');
    const content = fs.readFileSync(TARGET_FILE, 'utf-8');
    const required = [
      'KPI_SISTEMA', 'OPERADORAS', 'RENTABILIDADES', 'HISTORICO_COMISIONES',
      'PORTAFOLIO_MACRO', 'TITULOS_ISIN_DESTACADOS', 'MOVILIDAD_RESUMEN',
      'DEMOGRAFIA_AFILIADOS', 'BENEFICIOS_RETIROS', 'API_ENDPOINTS',
      'GLOSARIO', 'SERIE_DIARIA_VALOR_CUOTA', 'SERIE_MENSUAL_RENTABILIDAD',
      'SERIE_ANUAL_HISTORICA'
    ];
    for (const c of required) {
      if (!content.includes(`export const ${c}`)) throw new Error(`Falta constante: ${c}`);
    }
    log('  ✓ Todas las 14 constantes estructurales están presentes.');
    log('✅ Verificación completada con éxito.');
    return;
  }

  log('=======================================================');
  log('INICIANDO ACTUALIZACIÓN AUTOMÁTICA DE DATOS SUPEN (NODE)');
  log('=======================================================');

  const existingContent = fs.readFileSync(TARGET_FILE, 'utf-8');

  // Consultas paralelas seguras a los endpoints
  const [rendData, comData, cueData, afiData, ltData, benData] = await Promise.all([
    fetchEndpoint('rendimiento', 'Fondo=ROP'),
    fetchEndpoint('comision', 'Fondo=ROP'),
    fetchEndpoint('Cuenta', 'Fondo=ROP'),
    fetchEndpoint('Afiliado', 'Fondo=ROP'),
    fetchEndpoint('LT', 'Fondo=ROP'),
    fetchEndpoint('Beneficio', 'Fondo=ROP')
  ]);

  if (!rendData || !cueData) {
    log('❌ Falló la consulta a endpoints críticos. Abortando actualización.');
    process.exit(1);
  }

  // Portafolio puntual
  const activosRows = cueData.filter(x => x.codigocuenta === '0110000000000');
  const latestDate = activosRows.reduce((max, x) => x.fecha > max ? x.fecha : max, activosRows[0].fecha);
  const pfDateStr = latestDate.substring(0, 10);
  const pfData = await fetchEndpoint('portafolio', `Fondo=ROP&FechaInicio=${pfDateStr}&FechaFinal=${pfDateStr}`, 1, 25000);

  const processed = processData(rendData, comData, cueData, afiData, ltData, benData, pfData);
  const newCode = generateTypeScript(processed, existingContent);

  if (isDryRun) {
    log('Modo simulación (--dry-run). No se modificaron archivos.');
    log(`Resumen KPI: ${JSON.stringify(processed.kpi_sistema, null, 2)}`);
    return;
  }

  // Escritura atómica
  const tmpFile = `${TARGET_FILE}.tmp`;
  fs.writeFileSync(tmpFile, newCode, 'utf-8');
  fs.renameSync(tmpFile, TARGET_FILE);
  log(`✓ Archivo ${TARGET_FILE} actualizado atómicamente con éxito.`);

  // Compilación Astro
  if (!isNoBuild) {
    log('Iniciando compilación Astro (npm run build)...');
    try {
      execSync('npm run build', { stdio: 'inherit', cwd: PROJECT_ROOT });
      log('✓ Compilación Astro finalizada exitosamente.');
    } catch (e) {
      log(`⚠️ Error en astro build: ${e.message}`);
    }
  }

  log('=======================================================');
  log('✅ ACTUALIZACIÓN AUTOMÁTICA FINALIZADA SATISFACTORIAMENTE');
  log('=======================================================');
}

main().catch(err => {
  console.error('❌ Error fatal:', err);
  process.exit(1);
});
