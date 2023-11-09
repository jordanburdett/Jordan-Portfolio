export type Project = {
    id: number;
    title: string;
    href: string;
    type: string;
    technologies: string[];
    summary: string;
    content: ProjectContent[];
    isHidden: boolean;
}

export type ProjectContent = {
    id: number;
    text: string;
    image?: string;
    imageAlt?: string;
}