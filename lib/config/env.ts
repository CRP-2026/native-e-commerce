const raw = (process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '');

export const API_BASE_URL = raw;

const storeRaw = process.env.EXPO_PUBLIC_STORE_ID ?? '1';
export const STORE_ID = /^\d+$/.test(storeRaw) ? storeRaw : '1';
