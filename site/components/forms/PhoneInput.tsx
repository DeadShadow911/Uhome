"use client";

import { useState } from "react";
import { isValidBelarusPhone, PHONE_ERROR_MESSAGE } from "@/lib/phone-validation";

export function usePhoneValidation() {
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) {
      setPhoneError("Укажите номер телефона");
      return false;
    }
    if (!isValidBelarusPhone(phone)) {
      setPhoneError(PHONE_ERROR_MESSAGE);
      return false;
    }
    setPhoneError(null);
    return true;
  };

  return { phoneError, setPhoneError, validatePhone };
}
