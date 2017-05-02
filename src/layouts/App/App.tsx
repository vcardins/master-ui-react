import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import * as ReactGA from 'react-ga';
import { Container, Sidebar, Segment, Popup, Input, Icon } from 'semantic-ui-react';

import { BaseComponent } from 'core/decorators';
import { UserAuth, UserAction, UserProfile } from 'core/auth';
import { Api } from 'core/helpers';
import { PageInfo } from 'core/models';
import IMenuItem from './IMenuItem';
import LayoutSettings from './LayoutSettings';
import appSettings from 'core/settings';

import Header from './Header';
import LeftPanel from './LeftPanel';
import Footer from './Footer';
import SlidingPanel from './SlidingPanel';
import './index.scss';
import ColorSchemaPicker from 'widgets/ColorSchemaPicker';

import * as menu from '../menu.json';

const Console = console;

interface Props {
    dispatch: any;
    currentURL: string;
    children: string | JSX.Element;
    router: any;
    location: any;
}

interface State {    
    isNavBarCollapsed: boolean;
    page: PageInfo;
    user: UserProfile;
    layout: LayoutSettings;
}

class App extends BaseComponent<Props, State> {
    // tslint:disable-next-line:no-string-literal    
    routes: Array<IMenuItem> = menu['items'] as Array<IMenuItem>;
    currentRoute: string;
    
    leftBarHeader: JSX.Element = (
        <div>
            <div className="nav-title">
                <span className="nav-logo">
                    <Icon name="diamond"/>
                </span>
                <Link to="/">{ appSettings.title }</Link>
            </div>
            {/*<div className="searchbox">
                <Input icon="search" placeholder="Search ..." />
            </div>*/}
        </div>
    );

    state = {           
        isNavBarCollapsed: false,
        page: new PageInfo(),
        user: new UserProfile(),
        layout: LayoutSettings.getInstance(),
    };

    constructor(props: Props) {
        super();                
    }

    componentWillReceiveProps = (newProps) => {
        this.preparePageInfo(newProps);
    }

    componentDidMount() {
        const { dispatch, router } = this.props;      

        if (!UserAuth.isAuthenticated()) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            // dispatch(setRedirectUrl(currentURL))
            browserHistory.replace(appSettings.loginRoute);
        } else {
            /* const promises = [UserAction.getProfile()]; Api.get('lookup') //Promise.all(promises) */
            UserAction.getProfile()
                .then((result: any) => this.setState({ user: result }));
        }

        if (appSettings.analyticsId) {
            // Initialize Google Analytics
            ReactGA.initialize(appSettings.analyticsId, { debug: false });
            // Log page view as soon as page is loaded
            this.logPageView();
             browserHistory.listen((nextLocation: any) => {
                this.logPageView();
            });
        }

        const node = ReactDOM.findDOMNode(this).parentNode as HTMLElement;
        window.addEventListener('resize', this.handleWindowResize.bind(this, node));
        this.handleWindowResize(node);
    }
    
	logPageView() {
        ReactGA.set({ page: this.getLocationPath() });
        ReactGA.pageview(this.getLocationPath());
	}	

    getLocationPath() { 
        return this.props.router.getCurrentLocation().pathname; 
    }

    handleWindowResize(node: HTMLElement) { 
        if (!node) {
            return;
        }
        
        const w = window.innerWidth;
        let viewport;

        switch (true) {
            case (w <= 480) :  viewport = 'tiny'; break;
            case (w > 480 && w <= 667) :  viewport = 'mini'; break;
            case (w > 668 && w <= 768) :  viewport = 'small'; break;
            case (w > 768 && w <= 1024) :  viewport = 'medium'; break;
            case (w > 1024 && w <= 1366) :  viewport = 'default'; break;
            case (w > 1366 && w <= 1824) :  viewport = 'big'; break;
            case (w > 1824) :  viewport = 'large'; break;
        }

        if (!node.dataset.viewport !== viewport) {
            node.dataset.viewport = viewport;
        }        
    }

    handleLogout() {
        UserAuth.logout()
            .then(({redirect}) => redirect ? browserHistory.push(redirect) : () => {})
            .catch(Console.error);
    }

    handleTogglePanel(side: string, isCollapsed: boolean = false) {
        const { isNavBarCollapsed } = this.state;
        this.setState({ isNavBarCollapsed: !isNavBarCollapsed });
    }

    handleOpenSettings() {
        const { layout } = this.state;
        this.setState({ layout: Object.assign({}, layout, {showTopBar: !layout.showTopBar} ) });
    }

    preparePageInfo = (props) => {
        const { router, routes, params } = props;
        let breadcrumb = '';
        const pathname = router.getCurrentLocation().pathname;
        const currentRoute = routes.filter( ({path, name}) => pathname !== '/' ? path === pathname : !!name)[0]; 
        const page = new PageInfo(currentRoute);

        page.breadcrumb = routes
            .filter(({ path }) => !!path)
            .map(({ path, name, title}, i) => {
                document.title = `${appSettings.title}` + ( title ? `- ${title}` : '') ;  // set the document title if you want
                if (i < routes.length - 1 && routes[i + 1].path != null) {
                    let arr = path.split(/[:/]|(:\/)/g); // sometimes the path is like "/:product_id/details" so I need to extract the interesting part here.
                    arr = arr.map(function(obj) {
                        return (obj in params) ? params[obj] : obj; // We now have ":product_id" and "details" - the first one will exist in the "params" object.
                    });
                    breadcrumb += arr.filter(Boolean).join('/') + '/';  // clean out some garbage and add the "/" between paths.
                    return <Link key={i} to={breadcrumb}>{ i === 0 ? appSettings.title : name }</Link>;
                } else {
                    return <span key={i} className="active">{ i === 0 ? appSettings.title : name } / </span>;
                }
            },
        );
        this.setState({ page });
    }
    
    render(): JSX.Element {
        const { page, isNavBarCollapsed, layout } = this.state;
        const { router, children } = this.props;      
        const header = page.title && !page.headerless && (
            <div className="page-header">
                <h2>{ page.title }</h2>
            </div>);
                
        return ( <section id="container" className={`${isNavBarCollapsed ? 'collapsed' : ''} ${layout.menuOrientation}-menu`}>
                    { layout.showTopBar && this.renderTopBar() }
                    <main className="main">
                        { layout.menuOrientation === 'vertical' && this.renderLeftBar() }
                        <article className="page">                             
                            { children }
                        </article>
                        { layout.showSlidingBar && this.renderSlidingBar() }
                    </main>
                    { layout.showFooter && <Footer/> }
                 </section>
            );       
    }

    renderTopBar() {
        const { layout, page, user, isNavBarCollapsed } = this.state;

        return (<Header 
            user={user}
            onLogout={ this.handleLogout }
            onTogglePanel={ this.handleTogglePanel }
            routes={ layout.menuOrientation === 'horizontal' ? this.routes : null }
            activeRoute={ this.getLocationPath() }
            title={ appSettings.title } />);
    }

    renderLeftBar() {
        const { layout, user, isNavBarCollapsed } = this.state;
        
        return (<LeftPanel 
                    user={ user }
                    collapsed={ isNavBarCollapsed }
                    routes={ this.routes }
                    activeRoute={ this.getLocationPath() }
                    onTogglePanel={ () => this.handleTogglePanel('left') }
                    onOpenSettings={ this.handleOpenSettings }>
                    { !layout.showTopBar && this.leftBarHeader }
                </LeftPanel> );
    }

    renderSlidingBar() {
        return (<SlidingPanel position="right" ><ColorSchemaPicker/></SlidingPanel>);
    }
}
                        

export default App;
