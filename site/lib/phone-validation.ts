/**
 * Валидация номера телефона Беларуси.
 * Допустимые коды операторов: 33, 29, 44
 * Формат: +375 (33|29|44) XXX XX XX
 */

const VALID_OPERATORS = ["33", "29", "44"] as const;

export function isValidBelarusPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  let normalized: string;
  if (digits.startsWith("375") && digits.length === 12) {
    normalized = digits;
  } else if (digits.startsWith("80") && digits.length === 11) {
    normalized = "375" + digits.slice(2);
  } else if ((digits.startsWith("33") || digits.startsWith("29") || digits.startsWith("44")) && digits.length === 9) {
    normalized = "375" + digits;
  } else {
    return false;
  }
  if (normalized.length !== 12) return false;
  const operator = normalized.slice(3, 5);
  return VALID_OPERATORS.includes(operator as (typeof VALID_OPERATORS)[number]);
}

export const PHONE_PLACEHOLDER = "+375 (33) 123 45 67";
export const PHONE_ERROR_MESSAGE =
  "Введите номер в формате +375 (33) XXX XX XX. Допустимы коды операторов: 33, 29, 44.";
