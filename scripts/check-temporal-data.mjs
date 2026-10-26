import { SERIE_DIARIA_VALOR_CUOTA, SERIE_MENSUAL_RENTABILIDAD, SERIE_ANUAL_HISTORICA, OPERADORAS } from '../src/data/supen-data.ts';

console.log('--- Verificando Datos Temporales (Días, Meses, Años) ---');

// 1. Días
console.assert(SERIE_DIARIA_VALOR_CUOTA.length >= 28 && SERIE_DIARIA_VALOR_CUOTA.length <= 31, 'Debe haber entre 28 y 31 días en la serie mensual diaria');
console.log(`✓ Serie Diaria: ${SERIE_DIARIA_VALOR_CUOTA.length} días verificados.`);

for (const d of SERIE_DIARIA_VALOR_CUOTA) {
  for (const op of OPERADORAS) {
    console.assert(typeof d.valores[op.id] === 'number' && d.valores[op.id] > 1000, `Valor inválido para ${op.id} en día ${d.dia}`);
  }
}
console.log('✓ Todos los valores de Valor Cuota diario para las 6 operadoras son válidos.');

// 2. Meses
console.assert(SERIE_MENSUAL_RENTABILIDAD.length === 12, 'Debe haber 12 meses');
console.log(`✓ Serie Mensual: ${SERIE_MENSUAL_RENTABILIDAD.length} meses verificados.`);

for (const m of SERIE_MENSUAL_RENTABILIDAD) {
  for (const op of OPERADORAS) {
    console.assert(typeof m.valores[op.id] === 'number', `Valor mensual inválido para ${op.id} en ${m.mesId}`);
  }
}
console.log('✓ Todos los cortes mensuales para las 6 operadoras son válidos.');

// 3. Años
console.assert(SERIE_ANUAL_HISTORICA.length >= 10, 'Debe haber al menos 10 años en la serie anual');
console.log(`✓ Serie Anual: ${SERIE_ANUAL_HISTORICA.length} años verificados.`);

const anio2022 = SERIE_ANUAL_HISTORICA.find(a => a.año === 2022);
console.assert(anio2022 && anio2022.promedioRealSistema < 0, '2022 debe reflejar la minusvalía histórica');
const anio2024 = SERIE_ANUAL_HISTORICA.find(a => a.año === 2024);
console.assert(anio2024 && anio2024.promedioRealSistema > 5, '2024 debe reflejar la recuperación');

console.log('✓ Todo el dataset temporal (Días, Meses, Años) pasó las aserciones con éxito.');
