/**
 * Formateadores financieros con convenciones costarricenses
 * Nota: En español de Costa Rica, 1 billón = 10^12 (un millón de millones).
 */

export function formatColones(monto: number, compacto: boolean = false): string {
  if (compacto) {
    if (monto >= 1_000_000_000_000) {
      const billones = monto / 1_000_000_000_000;
      return `₡ ${billones.toFixed(2).replace('.', ',')} Billones`;
    }
    if (monto >= 1_000_000_000) {
      const milMillones = monto / 1_000_000_000;
      return `₡ ${milMillones.toFixed(2).replace('.', ',')} Mil Millones`;
    }
    if (monto >= 1_000_000) {
      const millones = monto / 1_000_000;
      return `₡ ${millones.toFixed(1).replace('.', ',')} M`;
    }
  }

  const partes = Math.round(monto).toString().split('');
  let resultado = '';
  for (let i = partes.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) resultado = '.' + resultado;
    resultado = partes[i] + resultado;
  }
  return `₡ ${resultado}`;
}

export function formatDolares(monto: number, compacto: boolean = false): string {
  if (compacto) {
    if (monto >= 1_000_000_000) {
      const milMillones = monto / 1_000_000_000;
      return `$ ${milMillones.toFixed(2).replace('.', ',')} B USD`;
    }
    if (monto >= 1_000_000) {
      const millones = monto / 1_000_000;
      return `$ ${millones.toFixed(1).replace('.', ',')} M USD`;
    }
  }
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(monto);
}

export function formatPorcentaje(valor: number, decimales: number = 2): string {
  return `${valor.toFixed(decimales).replace('.', ',')}%`;
}

export function formatNumero(num: number): string {
  return new Intl.NumberFormat('es-CR').format(num);
}
