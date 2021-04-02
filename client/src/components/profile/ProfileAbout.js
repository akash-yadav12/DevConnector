import React, { Component } from 'react'

import PropTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
  render() {

    const {profile} = this.props

    return (
      <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-light mb-3">
            <h3 class="text-center text-info">John's Bio</h3>
            <p class="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident fuga cum necessitatibus blanditiis vel,
              officia facere porro esse numquam assumenda doloremque saepe aliquam nemo excepturi aliquid maiores! Excepturi,
              libero repudiandae.
            </p>
            <hr />
            <h3 class="text-center text-info">Skill Set</h3>
            <div class="row">
              <div class="d-flex flex-wrap justify-content-center align-items-center">
                <div class="p-3">
                  <i class="fa fa-check"></i> HTML</div>
                <div class="p-3">
                  <i class="fa fa-check"></i> CSS</div>
                <div class="p-3">
                  <i class="fa fa-check"></i> JavaScript</div>
                <div class="p-3">
                  <i class="fa fa-check"></i> Python</div>
                <div class="p-3">
                  <i class="fa fa-check"></i> C#</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout
