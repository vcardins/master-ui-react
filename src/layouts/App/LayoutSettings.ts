class LayoutSettings {
    public menuOrientation: string = 'vertical';
    public showTopBar: boolean = false;
    public showSlidingBar: boolean = true;
    public showProfileCard: boolean = false;
    public showFooter: boolean = false;

    private static _instance: LayoutSettings;

    public static getInstance(): LayoutSettings {
        return LayoutSettings._instance || (LayoutSettings._instance = new LayoutSettings());        
    }
}

export default LayoutSettings;
