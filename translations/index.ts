import { deepMerge } from "@/lib/i18n-merge";

export { en } from './en';
export { es } from './es';
export { fr } from './fr';
export { zh } from './zh';
export { id } from './id';
export { ar } from './ar';
export { fil } from './fil';
export { ur } from './ur';
export { vi } from './vi';
export { ja } from './ja';
export { ko } from './ko';
export type { TranslationKeys } from './en';

async function loadWithOverrides<T extends Record<string, unknown>>(
    baseLoader: () => Promise<T>,
    overrideLoader: () => Promise<Record<string, unknown>>,
): Promise<T> {
    const [base, overrides] = await Promise.all([baseLoader(), overrideLoader()]);
    return deepMerge(base, overrides) as T;
}

export const translations = {
    en: () => import('./en').then(m => m.en),
    es: () => import('./es').then(m => m.es),
    fr: () => import('./fr').then(m => m.fr),
    zh: () => loadWithOverrides(
        () => import('./zh').then(m => m.zh as Record<string, unknown>),
        () => import('./overrides/zh').then(m => m.zhOverrides),
    ),
    id: () => loadWithOverrides(
        () => import('./id').then(m => m.id as Record<string, unknown>),
        () => import('./overrides/id').then(m => m.idOverrides),
    ),
    ar: () => loadWithOverrides(
        () => import('./ar').then(m => m.ar as Record<string, unknown>),
        () => import('./overrides/ar').then(m => m.arOverrides),
    ),
    fil: () => loadWithOverrides(
        () => import('./fil').then(m => m.fil as Record<string, unknown>),
        () => import('./overrides/fil').then(m => m.filOverrides),
    ),
    ur: () => loadWithOverrides(
        () => import('./ur').then(m => m.ur as Record<string, unknown>),
        () => import('./overrides/ur').then(m => m.urOverrides),
    ),
    vi: () => loadWithOverrides(
        () => import('./vi').then(m => m.vi as Record<string, unknown>),
        () => import('./overrides/vi').then(m => m.viOverrides),
    ),
    ja: () => loadWithOverrides(
        () => import('./ja').then(m => m.ja as Record<string, unknown>),
        () => import('./overrides/ja').then(m => m.jaOverrides),
    ),
    ko: () => loadWithOverrides(
        () => import('./ko').then(m => m.ko as Record<string, unknown>),
        () => import('./overrides/ko').then(m => m.koOverrides),
    ),
};

export type Language = 'en' | 'es' | 'fr' | 'zh' | 'id' | 'ar' | 'fil' | 'ur' | 'vi' | 'ja' | 'ko';

export const languageNames: Record<Language, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    zh: '中文',
    id: 'Indonesian',
    ar: 'العربية',
    fil: 'Filipino',
    ur: 'اردو',
    vi: 'Tiếng Việt',
    ja: '日本語',
    ko: '한국어',
};
