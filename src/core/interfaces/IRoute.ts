interface IRoute {
    id: string;
    href: string;
    label: string;
    icon?: string;
    children?: Array<IRoute>;
    isChild?: boolean;
}

export default IRoute;
