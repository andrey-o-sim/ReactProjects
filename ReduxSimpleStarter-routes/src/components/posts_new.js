import React, { Component } from 'react';
//Field это компонент, что мы используем для того чтобы указать input для этого компонента
//reduxForm это функция
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  //параметр field содержит event handlers, которые нам нужно подключить для jsx, который возвращает данная функция
  //данный параметр является связкой между input и Field. С помощью field мы говорим компоненту Field что наш компонент изменился
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    //field.input объект, который содержит имя нашего компонента (Field name="title" все свойства что мы ему зададим (например label)) и все события, что мы ему задали
    //например onBlur, onChange, onFocus и т.д.
    //{name: "title", onBlur: ƒ, onChange: ƒ, onDragStart: ƒ, onDrop: ƒ, …}
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {/* meta.error автоматически создается с validate function by redux*/}
        {/* у redux form есть три состояния: pristine, touched, invalid */}
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    //handleSubmit приходит с redux form (читать ниже)
    const { handleSubmit } = this.props;

    return (
      //когда пользователь сабмитит форму, запускается handleSubmit, выполняется валидация, и если валидация прошла и все нормально, то handleSubmit выполняет функцию this.onSubmit
      //при этом важный момент - страница не перезагружается, то есть мы все также продолжаем работать с SPA приложением без перезагрузки react
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          //name свойство привязывается к state. Поэтом если мы укажем два одинаковых имени для двух разных полей, то указав что-то в первом полу, это значение сразу же отобразится во втором поле
          name="title"
          label="Title"
          //component принимает функцию, которая возвращает jsx. При этом при вызове данной функции он передает параметр field-объект, который описывает данный компонент Field
          component={this.renderField} />

        <Field
          name="categories"
          label="Categories"
          component={this.renderField} />

        <Field
          name="content"
          label="Post Content"
          component={this.renderField} />

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

//values - это объект, содержащий значения, что пользователь ввел на форме
//свойста объекта errors должны совпадать с name наших Field
//функция должна возвращать объект
//если данный объект пустой, то валидация прошла успешно и форму можно сабмитить
//если данный объект содержит хоть какое-то свойство, то redux понимает это как форма содержит ошибки и она не засабмитится
function validate(values) {
  //values это объект = {title: "test title", categories: "test category", content: "test content"}
  const errors = {};

  //Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if (!values.content) {
    errors.content = "Enter some content!";
  }

  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//подключаем reduxForm для нашего компонента PostsNew
//redux form так же как и connect добавляет дополнительные свойства для нашего компонента (например handleSubmit)
export default reduxForm({
  //validate функция вызовится редаксом, когда юзер попытается сделать submit формы
  validate,
  //данное имя позволяет нам задать уникальное имя для формы, чтобы в случае нескольких форм на стрнаице мы могли идентифицировать нужную нам
  form: 'PostsNewForm'
})(
  //связываем action и reduxForm с нашим компонентом и 
  connect(null, { createPost })(PostsNew)
);