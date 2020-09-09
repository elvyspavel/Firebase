const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const loginCheck = user => {
   if(user) {
      loggedInLinks.forEach(link => link.style.display = 'block');
      loggedOutLinks.forEach(link => link.style.display = 'none');
   } else {
      loggedInLinks.forEach(link => link.style.display = 'none');
      loggedOutLinks.forEach(link => link.style.display = 'block');
   }
}
// Signup
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', e => {
   e.preventDefault();
   
   const email = document.querySelector('#signup-email').value;
   const password = document.querySelector('#signup-password').value;

   auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {

         // clear the form
         signupForm.reset();
         //close the model
         $('#signupModal').modal('hide')
         console.log('sign up')
      })
})

//Sigin
const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', e => {
   e.preventDefault();
   
   const email = document.querySelector('#login-email').value;
   const password = document.querySelector('#login-password').value;

   auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {

         // clear the form
         signinForm.reset();
         //close the model
         $('#signinModal').modal('hide')
         console.log('sign in')
      })
 })

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
   e.preventDefault();
   auth.signOut().then(() => {
      console.log('sign out')
   })

})
//Google Login
const googleButton = document.querySelector('#googleLogin')
googleButton.addEventListener('click', e => {
   const provider = new firebase.auth.GoogleAuthProvider();
   auth.signInWithPopup(provider)
      .then(result => {
         console.log('google sing in')
         
         // clear the form
         signinForm.reset();
         //close the model
         $('#signinModal').modal('hide')
         console.log('sign in')
      })
      .catch(err => {
         console.log(err)
      })

})
//Facebook Login
const facebookButton = document.querySelector('#facebookLogin')
facebookButton.addEventListener('click', e => {
   e.preventDefault();
   
   const provider = new firebase.auth.FacebookAuthProvider();
   auth.signInWithPopup(provider)
      .then(result => {
         console.log('facebook sing in')
         
         // clear the form
         signinForm.reset();
         //close the model
         $('#signinModal').modal('hide')
         console.log('sign in')
      })
      .catch(err => {
         console.log(err)
      })
      

})

//Posts
const postList = document.querySelector('.posts')
const setupPosts = data => {
   if (data.length) {
      let html = '';
      data.forEach(doc => {
         const post = doc.data()
         const li = `
            <li class="list-group-item list-group-item-action">
               <h5>${post.title}</h5>
               <p>${post.description}</p>
            </li>
         `;
         html += li;
      });
      postList.innerHTML = html;
   } else{
      postList.innerHTML = '<p class="text-center">Login to see Posts</p>'
   }
}

// Events
//list for user auth state changes
auth.onAuthStateChanged(user => {
   if (user) {
      fs.collection('posts')
         .get()
         .then((snapshot) => {
            setupPosts(snapshot.docs)
            loginCheck(user);
         })
   }else{
      setupPosts([])
      loginCheck(user)

   }
})