function onSuccess(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      console.log("Signed in as: " + xhr.responseText);
      if (xhr.responseText == "success") {
        signOut();
        location.assign("/pokedex");
      }
    };

    // let profile = googleUser.getBasicProfile()
    // let userImage = document.createElement('img')
    // userImage.setAttribute('src', profile.getImageUrl())

    xhr.send(JSON.stringify({ token: id_token }));
  }
  function onFailure(error) {
    console.log(error);
  }

  function renderButton() {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  }