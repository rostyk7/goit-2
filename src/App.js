import { Component } from 'react';
import Post from './Post';
import s from './App.module.scss';

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        isLiked: false,
        count: 0,
        url: 'https://www.lukas-petereit.com/wp-content/uploads/2017/10/Rakotzbr%C3%BCcke-Bridge-Rakotz-Kromlau-Lake-Sun-Sunrise-Landscape-Reflection-Germany-Saxony-Travel-Photography-Nature-Photo-Spreewald-2.jpg'
      },
      {
        id: 2,
        isLiked: false,
        count: 0,
        url: 'https://expertphotography.b-cdn.net/wp-content/uploads/2018/07/nature-photography.jpg'
      },
      {
        id: 3,
        isLiked: false,
        count: 0,
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
      }
    ]
  };

  getLikesCount() {
    const { posts } = this.state;
    return posts.reduce((result, post) => post.isLiked ? result + 1 : result, 0);
  }

  onChange = (id) => {
    this.setState(prevState => {
      const prevPosts = prevState.posts;
      const currentPostIndex = prevPosts.findIndex(p => p.id === id);
      const oldPost = prevPosts[currentPostIndex];
      return {
        posts: [
          ...prevPosts.filter((_, index) => index < currentPostIndex),
          {
            id: oldPost.id,
            url: oldPost.url,
            isLiked: !oldPost.isLiked,
            count: oldPost.count + 1
          },
          ...prevPosts.filter((_p, index) => index > currentPostIndex)
        ]
      };
    });
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <div className={s.container}>
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              imageUrl={post.url}
              isLiked={post.isLiked}
              count={post.count}
              onChange={this.onChange}
            />
          ))}
        </div>
        <br />
        <div className={s.stats}>Likes count: {this.getLikesCount()}</div>
      </div>
    );
  }

}

export default App;
