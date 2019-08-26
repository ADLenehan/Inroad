let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
var options = {
   allowedConnections: ['linkedin'],
   closable: false,
   theme: {
    logo: 'https://syllabus.inroad.co/assets/img/Inroad_logo_2G.png'
  },
   auth: {
   redirectUrl: window.location.origin,
   responseType: 'code',
  },
   languageDictionary: {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at tempus turpis, vel luctus est. Nulla nec efficitur sem. Donec at ex sed sapien malesuada sollicitudin. Pellentesque eget egestas arcu. Pellentesque libero dolor, elementum ac tincidunt nec, imperdiet at lectus. Nullam elit purus, fringilla molestie egestas quis, egestas at justo. Vestibulum condimentum a nulla a viverra. In quis orci leo. Vivamus nunc magna, maximus non viverra eget, vulputate non magna.",
    emailInputPlaceholder: "something@youremail.com"
  },
   popupOptions: { width: 800 }
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
    updateUI();
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

  if (isAuthenticated) {
    const user = await auth0.getUser();
    document.getElementById("gated-content").classList.remove("hidden");
    document.getElementById("btn-logout").classList.remove("hidden");
    document.getElementById("btn-login").classList.add("hidden");
    document.getElementById("ipt-access-token").innerHTML = JSON.stringify(user.name).replace(/\"/g, "");
    document.getElementById("profile-pic").classList.remove("hidden");
    document.getElementById("profile-pic").src = JSON.stringify(user.picture).replace(/\"/g, "");
     
  } else {
    document.getElementById("btn-logout").classList.add("hidden");
    document.getElementById("btn-login").classList.remove("hidden");
    document.getElementById("gated-content").classList.add("hidden");
    document.getElementById("ipt-access-token").innerHTML = "";
    document.getElementById("profile-pic").classList.add("hidden");
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
