declare module "react-hot-loader";

declare module "*.json" {
    const value: any;
    export default value;
}

interface RequireImport {
    default: any;
}

interface NodeModuleHot extends NodeModule {
    hot: any;
}