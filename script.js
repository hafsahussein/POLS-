// const input =document.querySelectorAll(".input");
// input.forEach(input=>{
//   if(input.value=='')
//   document.querySelector(".helper-text").dataset.error='you must fill this field';
  
// })
//Authentication
const signupForm= document.querySelector("#signup-form");
const email=signupForm['signup-email'].value;
const password=signupForm['signup-password'].value;
const confirm=signupForm['confirm'].value;

// //Form validation
// function validatePassword(){
//   if(password.value != confirm.value) {
//     confirm.setCustomValidity("Passwords Don't Match");
//   } else {
//     confirm.setCustomValidity('');
//   }
// }

// password.onchange = validatePassword;
// confirm.onkeyup = validatePassword;
// //Signup
signupForm.addEventListener('submit',(e)=>{
  e.preventDefault();	
  auth.createUserWithEmailAndPassword(email,password).then(cred=> {
		signupForm.reset();
	}).catch(err=>{
    alert(err.message);
  });
    });
//send verification link to the user email
				const sendVerifaction=()=>{
	const user=auth.currentUser;
	user.sendEmailVerification().then(()=>{
		alert(`Verification link sent to ${user.email}
Verify your email and refresh the page to continue to the system`)
	}).catch(error=>{
		alert('error:'+error.message)
	})
}
//login
const loginForm=document.querySelector('#signin-form');

loginForm.addEventListener('submit',e=>{
	e.preventDefault();
	
	const email=loginForm['signin-email'].value;
	const password=loginForm['signin-password'].value;
	auth.signInWithEmailAndPassword(email,password).
	then(cred=>{
		loginForm.reset();
	}).catch(err=>{
		alert(err.message);
	});})


// //signin with facebook
// const signInWithFacebook=document.querySelector("#sign-in-with-facebook");
// signInWithFacebook.addEventListener('click',(e)=>{
//   e.preventDefault();
//   const provider = new firebase.auth.FacebookAuthProvider();
//   firebase.auth().useDeviceLanguage();
//   firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     console.log(user)
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
// });
// //signin with google
// const signInWithGoogle=document.querySelector("#sign-in-with-google");
// signInWithGoogle.addEventListener('click',(e)=>{
//   e.preventDefault();
//   const provider = new firebase.auth.GoogleAuthProvider();
//logout
const logout= document.querySelectorAll('.logout');
logout.forEach(one=>{
	one.addEventListener('click',(e)=>{
		e.preventDefault();
		auth.signOut().then(()=>{
		});
	});
})
// checkig the file extension
	function extension(str){
	return str.slice(str.lastIndexOf('.'));	
	}
	const list=document.querySelector('#books-ul');
function renderBook(doc,collection,data) {
	
	const li=document.createElement('li');
	const nameHolder=document.createElement('div');
	const bookName=document.createElement('p');
	const downloadBTNHolder=document.createElement('div');
	const downloadBTN=document.createElement('a');
	const deleteBTNHolder=document.createElement('div');
	const deleteBTN=document.createElement('a');
		//add css classes
		li.classList.add('row');
		nameHolder.className='col s4 l5';
		bookName.classList.add('truncate');
		downloadBTNHolder.className='col s3 l2';
		downloadBTN.className='btn purple darken-3 buttons';
		deleteBTNHolder.className='col s2 offset-s2 l2';
		deleteBTN.className='btn purple darken-3 buttons';
		 		//set atributes
		downloadBTN.setAttribute('href',doc.data().url)
		li.setAttribute('data-id',doc.id);

			//set the inner text
		 bookName.innerText=doc.data().name;
		 deleteBTN.innerText='delete';
		 downloadBTN.innerText='download';
	
//append elements to the document
deleteBTNHolder.appendChild(deleteBTN);
downloadBTNHolder.appendChild(downloadBTN);
nameHolder.appendChild(bookName);
li.appendChild(nameHolder);
li.appendChild(downloadBTNHolder);
li.appendChild(deleteBTNHolder);
list.appendChild(li);
	//deleting data
deleteBTNHolder.addEventListener('click',(e)=>{
	e.stopPropagation();
	var desertRef = storageRef.child(data.name);

// Delete the file
desertRef.delete().then(function() {
  // File deleted successfully
}).catch(function(error) {
console.log(error.message)});

	let id=e.target.parentElement.parentElement.getAttribute('data-id');
	db.collection(collection).doc(id).delete();
})

}
//searching books
const searchBar=document.querySelector('#books-section input');
//const list=document.querySelector('#book-ul');
searchBar.addEventListener('keyup',function(e) {
const term=e.target.value.toLowerCase();
const books=list.querySelectorAll('li');
books.forEach(function(book) {
	const title=book.firstElementChild.textContent;
	if(title.toLowerCase().indexOf(term)>-1) {
		book.style.display='block';

	}
	else {
		book.style.display='none';
	}
})
})
  
	// For other browsers: 
	// Create a link pointing to the ObjectURL containing the blob.
// 	const data = window.URL.createObjectURL(newBlob);
// 	const downloadFromWeb=document.querySelector('#download');
// 	downloadFromWeb.href = data;
// 	downloadFromWeb.download="file.pdf";
// 	downloadFromWeb.click();
// 	setTimeout(function(){
// 	  // For Firefox it is necessary to delay revoking the ObjectURL
// 	  window.URL.revokeObjectURL(data);
// 	}, 100);
//   }
  
//   fetch()
//   .then(r => r.blob())
//   .then(showFile)
//    
 const loggedOut=document.querySelector("#logged-out");
    const loggedIn=document.querySelector("#logged-in");
		const nav= document.querySelector('nav');
		const section=document.querySelector('section');
		const accountDetails=document.querySelector('.account-details');
	  auth.onAuthStateChanged(user=>{
		  if(user&&user.emailVerified){
        loggedIn.classList.remove('hide');
		loggedOut.classList.add('hide');
		//download book from other website
		// const urlHolder=document.querySelector('#url-holder');
		// downloadFromWeb.addEventListener('click',e=>{
		// 	// e.preventDefault();
		// 	const url=urlHolder.value;
		// 	e.target.setAttribute('href',url);
		// 	e.target.setAttribute('target','_blank')
		// //	e.target.setAttribute('download','tree-736885__340.jpgmy book');
		// //	download(url,"my book")
		// })
			  //upload books to the firebase
			  const fileElem=document.querySelector('#upload')
			  fileElem.addEventListener('change',e=>{
				for(let i=0;i<fileElem.files.length;i++){
					let bookFiles=[];
				 bookFiles[i]=fileElem.files[i];
				
				const validExtension=extension(bookFiles[i].name)== '.ppt'
				||extension(bookFiles[i].name)== '.pptx'
				||extension(bookFiles[i].name)== '.doc'
				||extension(bookFiles[i].name)== '.docx'
				||extension(bookFiles[i].name)== '.xls'
				||extension(bookFiles[i].name)== '.xlsx'
				||extension(bookFiles[i].name)== '.pdf'
				||extension(bookFiles[i].name)== '.txt';
				//console.log(extension(bookFile.name))
				let uploadTask;
				if(validExtension)
				uploadTask=storageRef.child(bookFiles[i].name).put(bookFiles[i])
						else alert('Make sure that your file is a document');
				
				///check if the upload process is completed
			uploadTask.on('state_changed', snapshot=>{
			 /* const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			 */ 
			}, error=> {
			  // Handle unsuccessful uploads
			}, ()=> {
			  // Handle successful uploads on complete
			  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
			  uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=> {
					  db.collection(user.email).add({
					name:bookFiles[i].name,
					url:downloadURL,
					uid:user.uid
					})
			
			  
			  });
			})}
			  })
const fileSelect=document.querySelectorAll('.upload-file');
fileSelect.forEach(button=>{
	button.addEventListener('click',e=>{
		if(fileElem)
		fileElem.click()
		});
})
	db.collection(user.email).onSnapshot (snapshot=>{
	let changes=snapshot.docChanges();
	changes.forEach(change=>{
		if(change.type=="added") {
			renderBook(change.doc,user.email,change.doc.data());
				
}
		else if(change.type=='removed'){
			let li=list.querySelector('[data-id='+change.doc.id+']');
			list.removeChild(li);
		}
	})
})

		}
		  	else if(user &&!user.emailVerified) {
			sendVerifaction();
      loggedOut.classList.remove('hide');

		}
	else{
		// wrappForms.style.display='block';
		// header.style.display='none';
		// section.style.display='none';
		// nav.style.display='none';
		// bookWrapp.style.display='none';
		// document.querySelector('#lines').style.display='none';
		// 	document.querySelector('#line-bg').style.display='none';
loggedOut.classList.remove('hide');
loggedIn.classList.add('hide');

}
	
 	  })
//})

// setup materialize components
$(document).ready(function(){
	$('.sidenav').sidenav({
	  closeOnClick: true
	});
	$('.modal').modal();
	$('.tabs').tabs();
  });