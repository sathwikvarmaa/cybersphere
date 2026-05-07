window.csx = window.csx || {};

window.csx._csrf = function(){
  // For training: no real CSRF token is used.
  return null;
}

window.csx.postForm = async function(url, body){
  const r = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
    body: new URLSearchParams(body)
  });
  return r;
}

window.csx.initNav = function(){
  const topbar = document.querySelector('.topbar');
  const toggle = document.querySelector('.nav-toggle');
  if (!topbar || !toggle) return;

  const closeMenu = function(){
    topbar.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', function(){
    const isOpen = topbar.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  topbar.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click', function(){
      if (window.innerWidth <= 950) closeMenu();
    });
  });

  window.addEventListener('resize', function(){
    if (window.innerWidth > 950) closeMenu();
  });
};

window.csx.like = async function(postId){
  await window.csx.postForm('/reaction/like', { postId });
  location.reload();
}

window.csx.bookmark = async function(postId){
  await window.csx.postForm('/bookmark/add', { postId });
  location.reload();
}

document.addEventListener('DOMContentLoaded', function(){
  window.csx.initNav();
});

