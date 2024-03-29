export interface Article {
    title: string | null;
    content: string | null;
    description: string | null;
    splitContent: string[];
    guesses: string[];
}