interface IToastFactory {
    info: () => void;
    success: () => void;
    warning: () => void;
    error: () => void;
}

export default IToastFactory;
