export default class Post {
  constructor(postData) {
    this.postData = postData;
  }
  logPost() {
    console.log(this.postData);
  }
  htmlPost() {
    let picture = Post.postPicture(this.postData);
    let profile = Post.postProfile(this.postData);
    let { title, body, author, created /*updated*/ } = this.postData;
    let html = `<div class="container col-11 col-xl-10 gy-3">
    <div class="card">
                <div class="card-body">
                ${profile}
                <h3>${title}</h3>
                  ${picture}
                    <p class="card-text px-xl-4">
                    ${body}
                       </p>
                    <div class="d-flex mt-3 justify-content-between px-xl-4">
                    <button type="button" class="btn btn-outline-dark col-3 m-0 px-0">View </button>
                    <div class="d-flex justify-content-end">
                        <p class="m-2">${created}</p>
                        <!--<p class="m-2">25 aug</p>-->
                    </div>
                </div>
            </div>
</div>
</div>`;
    return html;
  }
  static postPicture(post){
    let img = "";
    
    if(post.media){
      img = `<img src="${post.media} alt="test alt">"`;
    }
    return img;
  }
  static postProfile(post){
    let avatar = "";
    if(post.author.avatar){
      avatar = `<img src="${post.author.avatar}" class="border-rounded" alt="user test alt">`;
    }
    let userDiv = `<div>${avatar} <p><b class="me-1">${post.author.name}</b>Says:</p></div>`;
    return userDiv
  }
}
