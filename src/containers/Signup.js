import React from "react";
import { Form, Icon, Button } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { Field, reduxForm } from "redux-form";

// const FormItem = Form.Item;
// const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmitForm = e => {
    // console.log(e);
    // e.preventDefault();
    // console.log(this.props);

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

          <input type="text"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} className="form-control"
            placeholder="Username"
          />

          <Field
            name="email"
            component={this.renderField}
            label="Email"
            type="email"
          />
          <Field
            name="password"
            component={this.renderField}
            label="Password"
            type="password"
          />


          {/* )} */}
        </div>

        {/* <FormItem> */}
        {/* {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })( */}
        <input type="text"
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Email" className='form-control'
        />
        {/* )} */}
        {/* </FormItem> */}

        {/* <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })( */}
        <input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password" className='form-control'
        />
        {/* )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })( */}
        <input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password" className='form-control'
          onBlur={this.handleConfirmBlur}
        />
        {/* )}
        </FormItem> */}

        {
          /* <FormItem>
          {getFieldDecorator("userType", {
            rules: [
              {
                required: true,
                message: "Please select a user!"
              }
            ]
          })(
            <Select placeholder="Select a user type">
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          )}
        </FormItem> */}

        {/* <FormItem> */}
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
  // console.log('validate,', val)
  let errors = {}
  if (!val.email) {
    errors.email = "Email is required";
  }
  if (!val.password) {
    errors.password = "Password is required";
  }
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
