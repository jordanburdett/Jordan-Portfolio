export type Project = {
    title: string;
    href: string;
    type: string;
    technologies: string[];
    summary: string;
    content: ProjectContent[];
    isHidden: boolean;
}

export type ProjectContent = {
    text: string;
    image?: string;
    imageAlt?: string;
}