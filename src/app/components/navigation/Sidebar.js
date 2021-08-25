import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Trans} from 'react-i18next';

class Sidebar extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <Link className="sidebar-brand brand-logo" to='/stocks'><img src={require("../../../assets/images/logo.png")} alt="logo" /></Link>
          <Link className="sidebar-brand brand-logo-mini pt-3" to='/dashboard'><img src={require("../../../assets/images/logo-mini.png" )} alt="logo" /></Link>
        </div>
        <ul className="nav">
      
          <li className={ this.isPathActive('/stocks') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/stocks">
              <i className="mdi mdi-chart-line menu-icon"/>
              <span className="menu-title"><Trans i18nKey="stocks"/></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/cryptocurrency') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/cryptocurrency">
              <i className="mdi mdi-bitcoin menu-icon"/>
              <span className="menu-title"><Trans i18nKey="cryptocurrency"/></span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
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
  }

}

export default withRouter(Sidebar);
