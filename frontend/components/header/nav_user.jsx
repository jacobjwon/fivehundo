import React from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

class UserNavComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {showDropdown: false};
  }

  dropdownEnter () {
    this.setState({showDropdown: true});
  }

  dropdownLeave () {
    this.setState({showDropdown: false});
  }

  toggleDropdown () {
    let show = !this.state.showDropdown;
    this.setState({showDropdown: show});
  }

  showUpload () {
    this.props.toggleUploadModal();
  }

  handleClickOutside () {
    this.setState({showDropdown: false});
  }

  logout () {
    this.props.logout().then(() => {
      this.props.history.push('/');
    });
  }

  render () {
    let dropdownClass = this.state.showDropdown ? 'nav-dropdown visible' : 'nav-dropdown';
    let navIcon = {};
    if (this.props.currentUser.profilePhotoUrl) {
      navIcon = {backgroundImage: `url(${this.props.currentUser.profilePhotoUrl})`};
    }
    return (
      <div className='flex-center nav-component'>
        <div className='nav-user-profile'
          onClick={this.dropdownEnter.bind(this)}
          onMouseEnter={this.dropdownEnter.bind(this)}
          onMouseLeave={this.dropdownLeave.bind(this)}>
          <span className='nav-user-icon flex-center'
            style={navIcon}>
            <br />
            <ul className={dropdownClass}>
              <Link to={`/${this.props.currentUser.username}`} className='nav-dropdown-link'>My Profile</Link>
              <Link to='/manage' className='nav-dropdown-link'>Manage Photos</Link>
              <Link to='/feed' className='nav-dropdown-link'>My Feed</Link>
              <li className='nav-dropdown-link' onClick={this.logout.bind(this)}>Logout</li>
            </ul>
          </span>
        </div>
        <span onClick={this.showUpload.bind(this)} className='nav-btn-tall flex-center'>
          <i className='fa fa-cloud-upload display-if' aria-hidden='true' />
          <span className='nav-link-text'>Upload</span>
        </span>
      </div>
    );
  }
}

export default onClickOutside(UserNavComponent);
