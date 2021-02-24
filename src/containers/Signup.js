import React from "react";
import { Form, Icon, Button } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { Field, reduxForm } from "redux-form";

import { emailFieldValidation, Required, phoneNumberPattern } from "../validation"

// const FormItem = Form.Item;
// const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmitForm = e => {
    console.log(e);
    // e.preventDefault();
    // console.log(this.props);
    return
    if (this.props.valid) {

      this.props.onAuth(
        e.userName,
        e.email,
        e.password,
        e.confirm
      );
      //     // this.props.history.push("/");
      //   }
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  renderError = ({ error, touched }) => {
    // console.log(error, touched)
    if (error && touched) {
      return (<span className="invalid-feedback"> {error} </span>)
    }
    return ''
  }

  renderField = ({ input, label, name, type, meta }) => {
    // console.log(meta);
    return (<div>
      <label>{label}</label>
      <div className='form-group'>
        <input {...input} type={type} className={meta.touched && meta.error ? 'is-invalid form-control' : 'form-control'} />
        {this.renderError(meta)}
      </div>
    </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <div>
          {/* {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })( */}

          <Field
            name="first_name"
            component={this.renderField}
            label="First Name"
            type="name" required="true"
          />

          <Field
            name="email"
            component={this.renderField}
            label="Email" validate={[emailFieldValidation, Required]}
            type="email"
          />
          <Field
            name="password"
            component={this.renderField}
            label="Password"
            type="password"
          />
          <Field
            name="phone_number" validate={phoneNumberPattern}
            component={this.renderField}
            label="Phone"
            type="text"
          />



        </div>

        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          Signup
          </Button>
          Or
        <NavLink style={{ marginRight: "10px" }} to="/login/">
          login
          </NavLink>
        {/* </FormItem> */}
      </form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};


const validate = val => {
  console.log('validate,', val)
  let errors = {}
  if (!val.email) {
    errors.email = "Email is required";
  }
  if (!val.first_name) {
    errors.first_name = "First Name is required";
  }
  if (!val.password) {
    errors.password = "Password is required";
  }
  // if (!val.password) {
  //   errors.password = "Password is required";
  // }
  // console.log('validate,2', val)

  return errors;
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_student) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_student)
      )
  };
};

let form = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);


export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form,
  validate
})(form)
