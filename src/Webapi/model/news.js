export type NewsI18N = {
    title: string,
    slug: string,
    subline: string,
    text: string,
    language: string
};

export type News = {
    url: string,
    status: string,
    image: string,
    category: number,
    i18n: Array<NewsI18N>
};

export type NewsCategory = {
    id: number,
    labels: Object
};