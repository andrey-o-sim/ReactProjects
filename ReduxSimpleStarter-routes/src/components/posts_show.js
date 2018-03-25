import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';


class PostsShow extends Component {
    componentDidMount() {
        if (!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;
        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

//ownProps - это абсолютно идентичный объект с this.props нашего компонента. Поэтому мы можем получить объект params нашего роута и получить id поста
function mapStateToProps({ posts }, ownProps) {
    //теперь mapStateToProps возвращает только один post
    return { post: posts[ownProps.match.params.id] };
}

//связываем action (fetchPost и deletePost) с нашим компонентом и после этого эти функции можно будет получить через this.props свойство
//то же самое касается и mapStateToProps
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

// порядок выполнения
// 1) render()
// 2) componentDidMount() - получение поста
// 3) mapStateToProps - возвращение поста и установка его в props свойство для компонента
// 4) reRender компонента