interface IMenuItem {
    id: string;
    href: string;
    label: string;
    icon?: string;
    children?: Array<IMenuItem>;
    isChild?: boolean;
}

export default IMenuItem;
