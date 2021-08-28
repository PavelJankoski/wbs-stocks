import React, {useEffect, useRef, useState} from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';
import SettingsPanel from './example/settings/SettingsPanel';
import { withTranslation } from "react-i18next";


const App = (props) => {
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);
  const currentPath = useRef("");

  useEffect(() => {
    if (currentPath.current !== props.location.pathname) {
      currentPath.current = props.location.pathname;
      onRouteChanged()
    }
  });

  const onRouteChanged = () => {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (props.location.pathname === fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true);
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        setIsFullPageLayout(false)
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }
    let navbarComponent = !isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !isFullPageLayout ? <Sidebar/> : '';
    let SettingsPanelComponent = !isFullPageLayout ? <SettingsPanel/> : '';
    return (
      <div className="container-scroller">
        { navbarComponent }
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
              { SettingsPanelComponent }
            </div>
          </div>
        </div>
      </div>
    );

}

export default withTranslation()(withRouter(App));
