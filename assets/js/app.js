let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

var options = {
   allowedConnections: ['linkedin'],
   closable: false,
   languageDictionary: {
    title: "Log me innnnnns",
    emailInputPlaceholder: "something@youremail.com"
  },
   theme: {
    logo: 'https://syllabus.inroad.co/assets/img/Inroad_logo_2G.png'
  },
   auth: {
   redirectUrl: window.location.origin,
   responseType: 'code',
  }
};

var lock = new Auth0Lock('NHAcMO0QsAek2ftHsriSFGRi6RIr8QTO','inroad.auth0.com', options);

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

window.onload = async () => {
  await configureClient();

  // NEW - update the UI state
  updateUI();
  
    const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.getTokenSilently();
    
    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};


// NEW
const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
  
    if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently();

    document.getElementById("ipt-user-profile").innerHTML = JSON.stringify(
      await auth0.getUser()
    );

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
};

const login = async () => {
  lock.show();
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};
