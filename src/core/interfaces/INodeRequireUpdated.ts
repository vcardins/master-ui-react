interface INodeRequireUpdated extends NodeRequire {
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string ) => void;
}

export default INodeRequireUpdated;
