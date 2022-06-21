import { createRef, PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './App.module.css';
import Dummy from './Dummy';
import Input from './Input';

class App extends PureComponent {  
  state = {
    post: '',
    description: '',
    posts: [],
    detailsId: null,
    details: null,
    toggle: true,
    value: ''
  };
  list = createRef();

  componentDidMount() {
    console.log('mount');
    const json = localStorage.getItem('posts');
    const posts = JSON.parse(json);
    this.setState({
      posts
    })
  }

  getSnapshotBeforeUpdate() {
    return this.list.current.getBoundingClientRect();
  }

  onInputChange = value => {
    this.setState({
      value
    })
  };

  componentDidUpdate(_prevProps, prevState, snapshot) {
    console.log('update');
    const { detailsId, posts } = this.state;
    if (detailsId !== prevState.detailsId) {
      const json = localStorage.getItem('posts');
      const posts = JSON.parse(json);
      const post = posts.find(p => p.id === detailsId);
      console.log(post);
      this.setState({
        details: post
      })
    }
    if (posts !== prevState.posts && snapshot) {
      const height = snapshot.height;
      this.list.current.scrollTop = snapshot.height;
      console.log('dsad', height);
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  savePost = () => {
    const { post, description } = this.state;
    const newPost = {
      id: uuidv4(),
      post,
      description
    };
    this.setState(prevState => ({
      post: '',
      description: '',
      posts: [...prevState.posts, newPost]
    }), () => {
      localStorage.setItem('posts', JSON.stringify(this.state.posts));
    });
  };

  onItemClick(postId) {
    this.setState({
      detailsId: postId
    })
  }

  toggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle 
    }));
  }

  render() {
    const { post, description, posts, details, toggle } = this.state;
    return (
      <div className="App">
        <label>Post</label>
        <input
          value={post}
          name='post'
          type='text'
          onChange={this.onChange}
        />
        <br/>
        <label>Description</label>
        <textarea
          value={description}
          name='description'
          onChange={this.onChange}
        >
        </textarea>
        <button onClick={this.savePost}>
          Submit
        </button>
        <hr />
        <div className={s.row}>
          <ul ref={this.list}>
            {posts.map((post) => (
              <li
                key={post.id}
                className={s.item}
                onClick={() => this.onItemClick(post.id)}
              >
                {post.post}
              </li>
            ))}
          </ul>
          {!!details && (
            <div>
              <h2>Details</h2>
              <strong>{details.post}</strong>
              <strong>{details.description}</strong>
            </div>
          )}
        </div>
        <button onClick={this.toggle}>Toggle Dummy</button>
        {toggle && <Dummy />}
        <Input value={this.state.value} onChange={this.onInputChange} />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
