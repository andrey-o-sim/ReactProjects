import React, { Component } from 'react';
import { Field, reduxForm, FormSection, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';

import TextField from 'material-ui/TextField';
import ModalForm from './ModalForm';

class PostsEditMaterialUI extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  renderTextField(field) {
    let { input, label, meta: { touched, error }, ...custom } = field;

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.createPost(values, () => {
      //this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    console.log('render');
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <Field
                name="title"
                label="Title"
                component={this.renderTextField} />

            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Field
                name="categories"
                label="Categories"
                component={this.renderTextField} />

            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Field
                name="content"
                label="Post Content"
                component={this.renderTextField} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if (!values.content) {
    errors.content = "Enter some content!";
  }

  return errors;
}

//https://redux-form.com/7.3.0/examples/selectingformvalues/
const selector = formValueSelector('PostsEditFormMaterialUI');
//связываем reduxForm с компонентом
//то есть reduxForm функция возвращает функцию принимающая компонент, и эта функция связывает 
//redux форму с данным компонентом и возвращает объект
PostsEditMaterialUI = reduxForm({
  form: 'PostsEditFormMaterialUI'
})(PostsEditMaterialUI);

//тут мы конектим наш объект со state и потом redux получает initialValues свойство и используя его
//как form state
PostsEditMaterialUI = connect(getFormState, { fetchPost })(PostsEditMaterialUI)

function getFormState(state, ownProps) {
  const modalFormTitle = selector(state, 'modalFormProperty.titleModal');
  return {
    initialValues: state.posts[ownProps.match.params.id],
    modalFormTitle
  };
}

export default PostsEditMaterialUI