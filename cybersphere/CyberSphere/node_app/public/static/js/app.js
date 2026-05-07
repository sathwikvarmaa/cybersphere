// CyberSphere App JS
window.csx = {
  initNav: function() {
    const topbar = document.querySelector('.topbar');
    const toggle = document.querySelector('.nav-toggle');
    if (!topbar || !toggle) return;

    const closeMenu = () => {
      topbar.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = topbar.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    topbar.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 950) closeMenu();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 950) closeMenu();
    });
  },
  like: function(postId) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/reaction/like';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'postId';
    input.value = postId;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  },
  bookmark: function(postId) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/bookmark/add';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'postId';
    input.value = postId;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.csx.initNav();
});
