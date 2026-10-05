(() => {
  'use strict';
  const $ = (s, parent = document) => parent.querySelector(s);
  const $$ = (s, parent = document) => [...parent.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const config = window.STRONGER_CONFIG || {};
  const header = $('#header');
  const menuButton = $('.menu-toggle');
  const mobileNav = $('#mobileNav');
  const scrollProgress = $('.reading-progress');
  const mobileCTA = $('.mobile-cta');
  const enquire = $('#enquire');
  const backTop = $('.back-top');
  let scrollQueued = false;
  let lastDialogTrigger = null;
  function setMenu(open, restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.inert = !open;
    mobileNav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') setMenu(false, true);
    if (e.key === 'Tab') {
      const targets = [menuButton, ...$$('a', mobileNav)];
      const first = targets[0], last = targets[targets.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  function updateScroll() {
    scrollQueued = false;
    header.classList.toggle('scrolled', scrollY > 35);
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollProgress.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
    backTop.classList.toggle('visible', scrollY > 700);
    const top = enquire.getBoundingClientRect().top;
    mobileCTA.classList.toggle('visible', scrollY > 700 && top > innerHeight);
  }
  addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  addEventListener('resize', updateScroll);
  updateScroll();
  backTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' }));
  if ('IntersectionObserver' in window && !reduced) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .08 });
    $$('.reveal').forEach(el => revealObserver.observe(el));
    document.documentElement.classList.add('js');
  }
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) $$('.desktop-nav a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    }), { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    ['approach', 'programmes', 'experience', 'faq'].forEach(id => navObserver.observe($('#' + id)));
  }
  const weekTabs = $$('.month-tabs [role=tab]');
  function chooseWeek(index, focus = false) {
    weekTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      $('#' + tab.getAttribute('aria-controls')).hidden = i !== index;
    });
    if (focus) weekTabs[index].focus();
  }
  weekTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => chooseWeek(index));
    tab.addEventListener('keydown', e => {
      let next = index;
      if (e.key === 'ArrowRight') next = (index + 1) % weekTabs.length;
      else if (e.key === 'ArrowLeft') next = (index + weekTabs.length - 1) % weekTabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = weekTabs.length - 1;
      else return;
      e.preventDefault(); chooseWeek(next, true);
    });
  });
  const sessions = [
    { title: ['GET READY', 'TO MOVE.'], time: '00–10', copy: "Warm up the movements you'll use. Check how you're feeling and make any adjustments before the main work." },
    { title: ['PRACTISE', 'THE MAIN LIFT.'], time: '10–25', copy: 'Give the most technical movement your freshest attention. Practise the setup, then work through controlled sets with coaching cues when you need them.' },
    { title: ['BUILD USEFUL', 'STRENGTH.'], time: '25–45', copy: 'Use supporting exercises to build the muscles and movement patterns that matter to your goals. Keep the reps controlled and the load appropriate.' },
    { title: ['TRAIN', 'YOUR ENGINE.'], time: '45–55', copy: 'A focused conditioning block can build fitness, pacing and recovery. The exercise and intensity change to match the session and your starting level.' },
    { title: ['LEAVE WITH', 'A NEXT STEP.'], time: '55–60', copy: 'Note what went well, what needs practice and how you recovered. Leave with a useful cue or adjustment to carry into your next session.' }
  ];
  $$('[data-session]').forEach(button => button.addEventListener('click', () => {
    const session = sessions[Number(button.dataset.session)];
    $$('[data-session]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('#sessionTitle').replaceChildren(document.createTextNode(session.title[0]), document.createElement('br'), document.createTextNode(session.title[1]));
    $('#sessionCopy').textContent = session.copy;
    $('#sessionTime').textContent = session.time;
  }));
  const programmes = {
    personal: { title: 'PERSONAL TRAINING', description: 'Dedicated coaching built around your starting point. A useful choice if you want more explanation, individual feedback or a plan that can adapt each session.', features: ['One-to-one movement and technique coaching', 'Exercises selected around your goals', 'Session adjustments based on how you feel', 'Regular review of your routine and progress'] },
    strength: { title: 'STRENGTH & CONDITIONING', description: 'A structured mix of lifting and fitness work. Build dependable movement skills, then gradually add the work you can handle and recover from.', features: ['Progressive strength work', 'Conditioning selected for a purpose', 'Effort and load matched to your level', 'Progress measured beyond exhaustion'] },
    group: { title: 'SMALL-GROUP TRAINING', description: 'Shared sessions with coaching that still sees the individual. Follow a common structure while the movement, range and load can change for each person.', features: ['Coach-led session structure', 'Individual exercise and load adjustments', 'Strength and fitness in the same routine', 'Supportive energy from training together'] }
  };
  function showDialog(dialog, trigger) { lastDialogTrigger = trigger || document.activeElement; dialog.showModal(); }
  $$('dialog').forEach(dialog => {
    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      const r = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus({ preventScroll: true }); });
  });
  $$('.programme-open').forEach(button => button.addEventListener('click', () => {
    const p = programmes[button.dataset.programme];
    $('#programmeTitle').textContent = p.title;
    $('#programmeDescription').textContent = p.description;
    $('#programmeFeatures').replaceChildren(...p.features.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    $('#programmeEnquire').dataset.format = button.dataset.programme === 'group' ? 'Small group' : 'One-to-one';
    showDialog($('#programmeDialog'), button);
  }));
  $('#programmeEnquire').addEventListener('click', e => {
    const target = $$('input[name=format]').find(input => input.value === e.currentTarget.dataset.format);
    if (target) target.checked = true;
    $('#programmeDialog').close();
    setTimeout(() => $('input[name=name]').focus({ preventScroll: true }), reduced ? 0 : 600);
  });
  $$('[data-goal]').forEach(link => link.addEventListener('click', () => { $('select[name=goal]').value = link.dataset.goal; }));
  const galleryItems = $$('.gallery-item');
  let galleryIndex = 0;
  function showGalleryImage(index) {
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    const source = $('img', item);
    $('#galleryImage').src = source.getAttribute('src');
    $('#galleryImage').alt = source.alt;
    $('#galleryCaption').textContent = `${galleryIndex + 1} / ${galleryItems.length} — ${$('b', item).textContent}`;
  }
  galleryItems.forEach((button, index) => button.addEventListener('click', () => { showGalleryImage(index); showDialog($('#galleryDialog'), button); }));
  $('#galleryPrev').addEventListener('click', () => showGalleryImage(galleryIndex - 1));
  $('#galleryNext').addEventListener('click', () => showGalleryImage(galleryIndex + 1));
  $('#galleryDialog').addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { e.preventDefault(); showGalleryImage(galleryIndex - 1); } if (e.key === 'ArrowRight') { e.preventDefault(); showGalleryImage(galleryIndex + 1); } });
  const form = $('#enquiryForm');
  const status = $('#formStatus');
  const submit = $('.form-submit');
  const hasDelivery = Boolean(config.endpoint || config.whatsapp || config.email);
  if (hasDelivery) { submit.textContent = 'Send my enquiry'; $('#formNotice').textContent = config.endpoint ? 'Your details are used to respond to your training enquiry.' : `Review and send your enquiry in ${config.whatsapp ? 'WhatsApp' : 'your email app'}.`; }
  let enquiryText = '';
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    Object.keys(data).forEach(key => data[key] = String(data[key]).trim());
    if (!data.name || !/^[+0-9 ()-]{7,22}$/.test(data.phone) || data.phone.replace(/\D/g, '').length < 7) { status.textContent = 'Please enter your name and a valid phone number.'; return; }
    enquiryText = `Stronger Howrah training enquiry\n\nName: ${data.name}\nPhone: ${data.phone}\nGoal: ${data.goal}\nFormat: ${data.format}\nMessage: ${data.message || 'No additional message'}\n`;
    status.textContent = '';
    if (config.endpoint) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      submit.disabled = true; submit.textContent = 'Sending enquiry…';
      try {
        if (!/^https:\/\//i.test(config.endpoint)) throw new Error('Contact endpoint must use HTTPS');
        const response = await fetch(config.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: controller.signal });
        if (!response.ok) throw new Error('Delivery failed');
        status.textContent = 'Your enquiry has been received. Thank you for sharing your goals.';
        form.reset();
      } catch (_) {
        status.textContent = 'We could not confirm delivery. Your details are still here; please try again.';
      } finally { clearTimeout(timeout); submit.disabled = false; submit.textContent = 'Send my enquiry'; }
    } else if (config.whatsapp) {
      const number = String(config.whatsapp).replace(/\D/g, '');
      if (number.length < 8 || number.length > 15) { status.textContent = 'The contact number needs to be configured. You can save your enquiry below.'; $('#enquiryPreview').textContent = enquiryText; showDialog($('#enquiryDialog'), submit); return; }
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(enquiryText)}`, '_blank', 'noopener,noreferrer');
      status.textContent = 'Your enquiry is ready in WhatsApp. Review it and tap Send to share it.';
    } else if (config.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) { status.textContent = 'The contact email needs to be configured.'; return; }
      location.href = `mailto:${config.email}?subject=${encodeURIComponent('Training enquiry — Stronger Howrah')}&body=${encodeURIComponent(enquiryText)}`;
      status.textContent = 'Your enquiry is ready in your email app. Review it before sending.';
    } else { $('#enquiryPreview').textContent = enquiryText; showDialog($('#enquiryDialog'), submit); }
  });
  $('#saveEnquiry').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([enquiryText], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'stronger-howrah-enquiry.txt'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('#year').textContent = new Date().getFullYear();
})();
