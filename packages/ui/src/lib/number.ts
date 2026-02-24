export interface ClampOptions {
  min?: number;
  max?: number;
}

export const clampNumber = (n: number, { min, max }: ClampOptions = {}): number => {
  let result = n;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
};

const stripToNumeric = (input: string): string => input.replace(/[^0-9.,]/g, '');

const normalizeDecimal = (value: string): string => {
  const hasDot = value.includes('.');
  const hasComma = value.includes(',');

  if (!hasDot && !hasComma) return value;

  if (hasDot && hasComma) {
    const lastDot = value.lastIndexOf('.');
    const lastComma = value.lastIndexOf(',');
    const decimalSep = lastDot > lastComma ? '.' : ',';
    const parts = value.split(decimalSep);
    const intPart = parts.shift() ?? '';
    const fracPart = parts.join('');
    return `${intPart.replace(/[.,]/g, '')}.${fracPart.replace(/[.,]/g, '')}`;
  }

  const sep = hasDot ? '.' : ',';
  const parts = value.split(sep);
  if (parts.length === 1) return parts[0];

  const intPart = parts.slice(0, -1).join(sep);
  const fracPart = parts[parts.length - 1] ?? '';

  if (fracPart.length === 3 && intPart.length > 0) {
    return `${intPart.replace(/[.,]/g, '')}${fracPart}`;
  }

  return `${intPart.replace(/[.,]/g, '')}.${fracPart.replace(/[.,]/g, '')}`;
};

export const parseDecimalInput = (input: string): string => {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const negative = trimmed.startsWith('-');
  const numeric = stripToNumeric(negative ? trimmed.slice(1) : trimmed);
  const normalized = normalizeDecimal(numeric).replace(/^\./, '');

  if (!normalized) return '';

  return negative ? `-${normalized}` : normalized;
};

export const toNumberOrNull = (input: string): number | null => {
  const parsed = parseDecimalInput(input);
  if (!parsed) return null;
  const value = Number(parsed);
  return Number.isFinite(value) ? value : null;
};
