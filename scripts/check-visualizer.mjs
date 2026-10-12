import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// 1. Verificar existencia del archivo compilado en dist/api/index.html
const distApiPath = path.resolve('dist/api/index.html');
assert(fs.existsSync(distApiPath), 'dist/api/index.html debe existir tras astro build');

const htmlContent = fs.readFileSync(distApiPath, 'utf-8');

// 2. Verificar que los elementos visuales clave del Observatorio existan en el HTML
const requiredSelectors = [
  'id="active-ep-badge"',
  'id="main-chart-svg"',
  'id="chart-tooltip"',
  'id="chart-dynamic-controls"',
  'id="chart-legend"',
  'id="chart-kpis-grid"',
  'id="chart-accessible-table-container"',
  'id="btn-goto-comments"',
  'id="btn-view-visual"',
  'id="btn-view-comments"',
  'id="btn-view-console"',
  'id="section-visualizer"',
  'id="section-comments"',
  'id="section-console"',
  'id="comments-endpoint-selector"',
  'id="comments-content-panel"'
];

for (const sel of requiredSelectors) {
  assert(htmlContent.includes(sel), `HTML debe contener el elemento ${sel}`);
}

// 3. Verificar que los 8 endpoints estén referenciados en los botones
const endpoints = [
  '/comision',
  '/rendimiento',
  '/portafolio',
  '/portafolioISIN',
  '/LT',
  '/Afiliado',
  '/Beneficio',
  '/Cuenta'
];

for (const ep of endpoints) {
  assert(htmlContent.includes(ep), `HTML debe contener el endpoint ${ep}`);
}

// 4. Verificar que las 33 sub-vistas (3 a 5 por apartado) estén presentes en el bundle cliente
const subViews = [
  // /rendimiento (5)
  'comparativo', 'lineas', 'spread', 'cuota', 'ranking',
  // /comision (4)
  'linea', 'simulacion', 'feedrag', 'costo',
  // /portafolio (4)
  'macro', 'moneda', 'instrumento', 'plazos',
  // /portafolioISIN (4)
  'tenencia', 'topEmisiones', 'cupones', 'participacion',
  // /LT (4)
  'divergente', 'flujo', 'saldoMedio', 'rotacion',
  // /Afiliado (4)
  'piramide', 'formalidad', 'brecha', 'cuotaMercado',
  // /Beneficio (4)
  'modalidades', 'dualidad', 'pensionMedia', 'evolucion',
  // /Cuenta (4)
  'balance', 'evolucionNAV', 'composicion', 'aumOpcs'
];

// Encontrar el archivo JS generado en dist/
const distDir = path.resolve('dist');
function findJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findJsFiles(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  }
  return results;
}

const jsFiles = findJsFiles(distDir);
const combinedJs = jsFiles.map(f => fs.readFileSync(f, 'utf-8')).join('\n') + '\n' + htmlContent;

for (const v of subViews) {
  assert(combinedJs.includes(v), `El bundle debe incluir la sub-vista ${v}`);
}

console.log(`✅ Verificación OK: Todos los 8 apartados y sus 33 sub-vistas gráficas (3 a 5 por apartado) están debidamente compilados y verificados.`);
