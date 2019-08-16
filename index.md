<p>Welcome to our page!</p>
<button id="btn-login">Log in</button>
<button id="btn-logout" onclick="logout()">Log out</button>


<div class="hidden" id="gated-content">
    <p>
      You're seeing this content because you're currently
      <strong>logged in</strong>.
    </p>
    <label>
      Access token:
      <pre id="ipt-access-token"></pre>
    </label>
    <label>
      User profile:
      <pre id="ipt-user-profile"></pre>
    </label>
  </div>

<br>
<p><a href="https://inroad.co"><img src="/assets/img/Inroad_logo_2G.png" style="width: 50%; height: 50%" align="left" /></a></p>
<p style="clear: both;"></p>

# The Best of Product Management

Oh, hello! Having worked across a number of companies in the technology, startup universe, we find ourselves referencing the same material over an over again. Unlike a typical Product Management course, a lot of this material has been created and published by thought leaders that are successful Product Managers in their own right. In an effort to organize this material, we’ve consolidated these resources into a course syllabus (of sorts). 

Of course, we understand that every organization asks something different of its Product Management function. There are drastic differences between an early-stage startup looking for product market fit and a well-established company looking to capitalize on existing customer relationships and momentum. We believe the material below is generally across the spectrum of startup vs late-stage and B2B vs B2C, but if you disagree, we’d love to hear about it.

We’ve embedded audio and video content and linked to written content. We’ve also linked to authors’ twitter feeds where those authors are actively tweeting about relevant material. We’d recommend following those folks if you’re a Twitterer yourself. 

We've enabled comments using Disqus, so please feel free to leave any feedback in the comments section next to each of the main headings below. We’d especially love to hear about any materials you’ve discovered that you think could fit in here. As usual, also feel free to email us at [hello@inroad.co](mailto:hello@inroad.co)!


<script src="https://cdn.auth0.com/js/auth0-spa-js/1.0.0/auth0-spa-js.production.js"></script>
<script src="https://cdn.auth0.com/js/lock/11.17.2/lock.min.js">
    document.getElementById('btn-login').addEventListener('click', function() {
        lock.show();
    });
</script>
<script src="/assets/js/app.js"></script>
