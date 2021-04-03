import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'


class PostItem extends Component {

  onDeleteClick(id){
    this.props.deletePost(id)
    console.log('delete')
  }

  onLikeClick(id){
    this.props.addLike(id)
  }

  onUnlikeClick(id){
    this.props.removeLike(id)
  }


  findUserLike(likes){
    const { auth } = this.props
    if(likes.filter(like => like.user === auth.user.id).length > 0){
      return true
    }
    else{
      return false
    }
  }

  render() {

    const { post, auth } = this.props


    return (
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img className="rounded-circle d-none d-md-block" src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">
                  {post.text}
                </p>
                <button type="button" onClick={this.onLikeClick.bind(this,post._id)} className="btn btn-light me-1">
                  <i className={classnames('fas fa-thumbs-up', {
                    'text-info': this.findUserLike(post.likes)
                  })}></i>
                  <span className="badge bg-light text-dark"> {post.likes.length}</span>
                </button>
                <button type="button" onClick={this.onUnlikeClick.bind(this,post._id)} className="btn btn-light me-1">
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info me-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button onClick={this.onDeleteClick.bind(this,post._id)} type="button" className="btn btn-danger">
                    <i className="fas fa-times" ></i>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem)
