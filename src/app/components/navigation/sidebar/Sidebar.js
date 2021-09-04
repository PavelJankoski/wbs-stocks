import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Trans} from 'react-i18next';
import {Collapse} from "react-bootstrap";

const Sidebar = (props) => {
  const [newsMenuOpen, setNewsMenuOpen] = useState(false);
  useEffect(() => {
    onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }, [])

  useEffect(() => {
    onRouteChanged();
  }, [props.location])

  const toggleMenuState = () => {
    setNewsMenuOpen(!newsMenuOpen);
  }
  const onRouteChanged = () => {
    document.querySelector('#sidebar').classList.remove('active');
  }

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  }
  return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <Link className="sidebar-brand brand-logo" to='/stocks'><img src={require("../../../../assets/images/logo_en.png")} alt="logo" /></Link>
          <Link className="sidebar-brand brand-logo-mini pt-3" to='/dashboard'><img src={require("../../../../assets/images/logo-mini.png" )} alt="logo" /></Link>
        </div>
        <ul className="nav">

          <li className={ isPathActive('/stocks') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/stocks">
              <i className="mdi mdi-chart-line menu-icon"/>
              <span className="menu-title"><Trans i18nKey="stocks"/></span>
            </Link>
          </li>
          <li className={ isPathActive('/cryptocurrency') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/cryptocurrency">
              <i className="mdi mdi-bitcoin menu-icon"/>
              <span className="menu-title"><Trans i18nKey="cryptocurrency"/></span>
            </Link>
          </li>
          <li className={ isPathActive('/news') ? 'nav-item active' : 'nav-item' } style={{cursor: "pointer"}}>
            <div className={ newsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState() } data-toggle="collapse">
              <i className="mdi mdi-newspaper menu-icon"/>
              <span className="menu-title"><Trans i18nKey="news"/></span>
              <i className="menu-arrow"/>
            </div>
            <Collapse in={newsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ isPathActive('/news/stocks-market') ? 'nav-link active' : 'nav-link' } to="/news/stocks-market"><Trans i18nKey="stocks"/></Link></li>
                <li className="nav-item"> <Link className={ isPathActive('/news/cryptocurrency-market') ? 'nav-link active' : 'nav-link' } to="/news/cryptocurrency-market"><Trans i18nKey="cryptocurrency"/></Link></li>
              </ul>
            </Collapse>
          </li>

        </ul>
      </nav>
  );
}

export default withRouter(Sidebar);
