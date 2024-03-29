import { Language } from "./language.enum";
import { en } from "./translations/en.translation";

export interface LanguageSettings {
    language: Language;
    translation: typeof en;
}