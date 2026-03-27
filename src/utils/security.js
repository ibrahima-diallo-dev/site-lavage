const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;
const HTML_TAGS_REGEX = /<[^>]*>/g;

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const sanitizeText = (
  value,
  { maxLength = 120, multiline = false } = {},
) => {
  const rawValue = String(value ?? "")
    .replace(HTML_TAGS_REGEX, " ")
    .replace(/[<>]/g, "")
    .replace(CONTROL_CHARS_REGEX, multiline ? "" : " ");

  const normalized = multiline
    ? rawValue
        .replace(/\r\n?/g, "\n")
        .split("\n")
        .map((line) => line.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join("\n")
    : rawValue.replace(/\s+/g, " ").trim();

  return normalized.slice(0, maxLength);
};

export const sanitizeEmail = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 120);

export const sanitizePhone = (value) =>
  String(value ?? "")
    .replace(/[^\d+()\-\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24);

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);

export const isValidPhone = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
};

export const isValidFutureOrTodayDate = (value) => {
  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parsedDate >= today;
};

export const isHoneypotFilled = (value) =>
  String(value ?? "").trim().length > 0;

export const getRateLimitRemaining = (key, windowMs) => {
  const storage = getStorage();

  if (!storage) {
    return 0;
  }

  const lastAttempt = Number(storage.getItem(key) || 0);
  const remaining = windowMs - (Date.now() - lastAttempt);

  return remaining > 0 ? remaining : 0;
};

export const markRateLimitedAction = (key) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(key, String(Date.now()));
};
