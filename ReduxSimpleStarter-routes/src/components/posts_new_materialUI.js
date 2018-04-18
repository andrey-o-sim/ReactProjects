import React, { Component } from 'react';
import { Field, reduxForm, FormSection, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

import TextField from 'material-ui/TextField';
import ModalForm from './ModalForm';

class PostsNewMaterialUI extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalFormValid: false,
      modalFormTouched: false,
      triggerValidation: false
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
    if (this.state.isModalFormValid) {
      console.log(values);
      this.props.createPost(values, () => {
        //this.props.history.push('/');
      });
    }

    this.setState({
      triggerValidation: true
    });
  }

  onSaveModalForm() {
    this.setState({
      isModalFormValid: true,
      modalFormTouched: true
    });
  }

  onCancleModalForm() {
    this.setState({
      modalFormTouched: true
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
          <div className="row">
            <div className="col-md-12">
              <FormSection name="modalFormProperty">
                <ModalForm
                  {...this.props}
                  onSave={this.onSaveModalForm.bind(this)}
                  onCancle={this.onCancleModalForm.bind(this)} />
              </FormSection>
              {!this.state.isModalFormValid && (this.state.modalFormTouched || this.state.triggerValidation) ?
                <div style={{ color: 'red' }}>Please, provide Modal Form Data</div> :
                null}
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
const selector = formValueSelector('PostsNewFormMaterialUI');
export default reduxForm({
  validate,
  form: 'PostsNewFormMaterialUI'
})(connect(getFormState, { createPost })(PostsNewMaterialUI));


function getFormState(state) {
  const modalFormTitle = selector(state, 'modalFormProperty.titleModal');
  //нельзя возвращать объект (например modalFormProperty:{titleModal:modalFormTitle})
  //если так сделать, то метод render будет постоянно срабатывать при попытке изменить
  //ЛЮБОЕ поле, а не конкретно titleModal
  //Это связано с тем, что modalFormProperty.titleModal пытается найти СВОЙСТВО для сравнения в возвращаемом объекте,
  //а не во внутренних объектах (возвращаемого объекта). В этом случае redux-form всегда будет считать что значения разные и будет
  //делать render формы.
  //Можно также делать const modalFormObj = selector(state, 'modalFormProperty');
  //В таком случае мы будем обращаться к свойству titleModal след. образом: modalFormObj.titleModal
  //Но в таком случае render формы будет срабатывать постоянно в случае изменения любого поля относящегося к секции формы modalFormProperty 
  return {
    modalFormTitle
  };
}