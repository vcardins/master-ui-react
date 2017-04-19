import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Link } from 'react-router';
import { UserAuth, UserAction } from 'core/auth';
import { Api } from 'core/helpers';
import { PageInfo } from 'core/models';
import appSettings from 'core/settings';
import Header from './Header';
import LeftPanel from './LeftPanel';
import Footer from './Footer';
import { Container, Sidebar, Segment, Popup } from 'semantic-ui-react';
import './index.scss';
import { UserProfile } from 'core/auth';

const Console = console;

interface Route {
    id: string;
    href: string;
    label: string;
    icon?: string;
    children?: Array<Route>;
}

interface Props {
    dispatch: any;
    currentURL: string;
    children: string | JSX.Element;
    router: any;
    location: any;
}

interface State {    
    isSideBarCollapsed: Map<string, boolean>;
    page: PageInfo;
    user: UserProfile;
    showHeader: boolean;
}

class App extends React.Component<Props, State>  {

    routes: Array<Route>;       

    constructor(props: any) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this); 
        this.handleTogglePanel = this.handleTogglePanel.bind(this);
        this.handleOpenSettings = this.handleOpenSettings.bind(this);
        this.state = {           
            isSideBarCollapsed: new Map<string, boolean>([['left', false], ['right', false]]),
            page: new PageInfo(),
            user: new UserProfile(),
            showHeader: true,
        };
        this.routes = [
            { id: 'dashboard', href: '/', label: 'Dashboard', icon: 'dashboard' },
            { 
                id: 'geography', href: '', label: 'Geeography', icon: 'map',
                children: [
                    { id: 'countries', href: '/countries', label: 'Countries', icon: 'flag' },
                    { id: 'city', href: '/provinces', label: 'Provinces', icon: 'map' },
                ],
            },
            { id: 'countries', href: '/countries', label: 'Countries', icon: 'flag' },
            { id: 'city', href: '/provinces', label: 'Provinces', icon: 'map' },
            { id: 'reports', href: '/reports', label: 'Reports', icon: 'calculator' },
        ];
    }

    componentWillReceiveProps = (newProps) => {
        this._preparePageInfo(newProps);
    }

    componentDidMount() {
        const { dispatch, router } = this.props;      
        // this._preparePageInfo(this.props);

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

        const node = ReactDOM.findDOMNode(this).parentNode as HTMLElement;
        window.addEventListener('resize', this.handleWindowResize.bind(this, node));
        this.handleWindowResize(node);
    }
    
    handleWindowResize(node: HTMLElement) { 
        if (!node) {
            return;
        }
        const { isSideBarCollapsed } = this.state;
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
        const { isSideBarCollapsed } = this.state;
        isSideBarCollapsed.set(side, isCollapsed ? isCollapsed : !isSideBarCollapsed.get(side));
        this.setState({ isSideBarCollapsed });
    }

    handleOpenSettings() {
        console.log('Open Settings');
    }

    _preparePageInfo = (props) => {
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
        const { isSideBarCollapsed, page, user, showHeader } = this.state;
        const { router, children } = this.props;      
        const header = page.title && !page.headerless && (
            <div className="page-header">
                <h2>{ page.title }</h2>
            </div>);
        
        const isNavBarCollapsed = isSideBarCollapsed.get('left');
        const isSettingsBarCollapsed = isSideBarCollapsed.get('right');
        
        return ( <section id="container" className={`${isNavBarCollapsed ? 'collapsed' : ''}`}>
                    { showHeader && <Header 
                        user={user}
                        onLogout={ this.handleLogout }
                        onTogglePanel={ this.handleTogglePanel }
                        title="Master UI"/> }
                    <main className="main">
                        <LeftPanel 
                            user={user}
                            collapsed={ isNavBarCollapsed }
                            routes={ this.routes }
                            onTogglePanel={ () => this.handleTogglePanel('left') }
                            onOpenSettings={ this.handleOpenSettings }
                            />            
                        <article className="page">                             
                            { children }
                        </article>
                    </main>
                    {/*<Footer/>*/}
                 </section>
            );       
    }
}

export default App; 
