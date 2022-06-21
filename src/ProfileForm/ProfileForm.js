import React, { Component, createRef } from 'react';
import Control from './Control';
import s from './ProfileForm.module.css';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  accepted: false,
  touched: false,
  sex: 'male',
  touched: false,
  hobby: '',
  file: null,
  search: ''
};

const list = [
  'apple',
  'apple pie',
  'google',
  'facebook',
  'instargram',
  'goooooogle',
  'famous',
];

export default class ProfileForm extends Component {
  state = {
    ...INITIAL_STATE
  };
  ref = createRef(null);
  ref2 = createRef(null);

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onBlur = () => {
    this.setState({
      touched: true
    });
  };

  isFormValid() {
    const { firstName, lastName, accepted } = this.state;
    return firstName && lastName && accepted;
  }

  showError(name) {
    return !this.state[name] && this.state.touched;
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      touched: true
    });
    console.log(this.state);
  };

  acceptedChanged = () => {
    this.setState(prevState => ({
      accepted: !prevState.accepted
    }));
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onMiddleNameChange = (event) => {
    console.log(event.target.value);
  };

  render() {
    const { firstName, lastName, accepted, sex, hobby, search } = this.state;
    const filteredList = list.filter(item => item.startsWith(search));
    return (
      <div>I am working!
        <form onSubmit={this.onSubmit}>
          <div className={s.row}>
            <Control
              id='firstName'
              type='text'
              name='firstName'
              value={firstName}
              label='First Name'
              onChange={this.onChange}
              showError={this.showError('firstName')}
              errorMessage='First name is a required field'
            />
            <div className={s.marginLeft}>
              <label htmlFor='lastName' className={s.label}>Last Name</label>
              <input
                id='lastName'
                value={lastName}
                type='text'
                name='lastName'
                onChange={this.onChange}
              />
              {this.showError('lastName') && <div className={s.error}>Last name is a required field</div>}
            </div>
            <div className={s.marginLeft}>
              <label htmlFor='middleName' className={s.label}>MiddleName</label>
              <input
                id='middleName'
                defaultValue='232'
                ref={this.ref2}
                type='text'
                name='middleName'
                onChange={this.onMiddleNameChange}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor='terms' className={s.label}>Terms and Conditions Accepted</label>
              <input
                id='terms'
                type='checkbox'
                name='accepted'
                checked={accepted}
                onChange={this.acceptedChanged}
              />
              {this.showError('accepted') && <div className={s.error}>Terms and Conditions should be accepted</div>}
            </div>
          </div>
          <div className={s.row}>
            <div>
              <label htmlFor='male' className={s.label}>Male</label>
              <input
                id='male'
                type='radio'
                name='sex'
                checked={sex === 'male'}
                value='male'
                onChange={this.onChange}
              />
            </div>
            <div>
              <label htmlFor='female' className={s.label}>Female</label>
              <input
                id='female'
                type='radio'
                name='sex'
                checked={sex === 'female'}
                value='female'
                onChange={this.onChange}
              />
            </div>
          </div>
          <div>
          <label htmlFor='hobby' className={s.label}>Hobby</label>
            <select
              id='hobby'
              name='hobby'
              value={hobby}
              onChange={this.onChange}
            >
              <option value={30}>
                Chess
              </option>
              <option value={32}>
                Football
              </option>
              <option value={34}>
                Programming
              </option>
              <option value={35}>
                Travelling
              </option>
              <option value={39}>
                Swimming
              </option>
            </select>
          </div>
          <div>
            <label htmlFor='file' className={s.label}>File</label>
            <input
              id='file'
              type='file'
              name='file'
              ref={this.ref}
              accept="application/pdf,application/vnd.ms-excel"
            />
          </div>
          <div>
            <label htmlFor='search' className={s.label}>Search</label>
            <input
              id='search'
              type='text'
              name='search'
              onChange={this.onChange}
            />
            <div>
              <ul>
                {filteredList.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type='submit'
            className={s.saveButton}
          >
            Save Profile
          </button>
        </form>
      </div>
    );
  }
}