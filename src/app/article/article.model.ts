export interface Article {
    id?: string;
    lang: string;
    title: string | null;
    content: string | null;
    description: string | null;
    splitContent: string[];
    guesses: string[];
    loading: boolean;
}

export interface Library {
    articles: {
        [id: string]: Article;
    };
    selected: string | undefined;
    loading: boolean;
}