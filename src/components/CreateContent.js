import React, { Component } from "react";

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h1>create</h1>
        <form
          action="/create_process"
          method="post"
          onSubmit={function (e) {
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
            e.preventDefault();
          }.bind(this)}
        >
          <p>
            <input type="text" name="title" placeholder="title" />
          </p>
          <p>
            <textarea name="desc" id="" placeholder="desc"></textarea>
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
