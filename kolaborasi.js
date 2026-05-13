const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const show=(e,d=0)=>e&&setTimeout(()=>e.style.animation="f .6s forwards",d); // Tampilkan elemen dengan animasi fade-in
const onVisible=(id,fn,t=.3)=>{const el=document.getElementById(id);if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){fn();o.disconnect();}},{threshold:t});o.observe(el);}; // Jalankan fn() saat elemen masuk viewport

document.head.innerHTML+=`<style>
@keyframes f{to{opacity:1;transform:translateY(0)}} /* Fade-in slide up */
@keyframes fl{50%{transform:translateY(-12px)}} /* Floating naik-turun */
@keyframes b{50%{border-color:transparent}} /* Kedip kursor typewriter */
.navbar a{opacity:0;transform:translateY(-10px);position:relative;transition:.3s} /* Link navbar awalnya tersembunyi */
.navbar a::after{content:'';position:absolute;left:0;bottom:-5px;width:0;height:2px;background:#0ef;transition:.3s} /* Garis bawah animasi */
.navbar a:hover::after,.navbar a.active::after{width:100%} /* Tampilkan garis saat hover/aktif */
.navbar a:hover{color:#0ef}
.btn{transition:.3s}.btn:hover{transform:scale(1.08);box-shadow:0 0 15px #0ef} /* Efek hover tombol */
</style>`;

// Animasi masuk tiap link navbar dengan delay bertahap + tandai link aktif saat diklik
$$(".navbar a").forEach((a,i)=>{show(a,200+i*120);a.onclick=()=>($$(".navbar a").forEach(x=>x.classList.remove("active")),a.classList.add("active"));});

// Ubah background navbar saat scroll melewati 50px
onscroll=()=>$(".header").style.background=scrollY>50?"rgba(0,0,0,.85)":"rgba(0,0,0,.6)";

// Efek typewriter: ketik teks karakter per karakter dengan kursor berkedip
const type=(el,t,s)=>el&&(el.textContent="",el.style.cssText="border-right:3px solid #0ef",el.style.animation="b .7s infinite",[...t].forEach((c,i)=>setTimeout(()=>{el.textContent+=c;if(i==t.length-1)el.style.cssText+="border:none;animation:none";},i*s)));

type($("h1"),"FIRZA",150); // Ketik nama depan
setTimeout(()=>type($("h2"),"REVADIANTO",100),1000); // Ketik nama belakang setelah 1 detik
[["h3",300],["p",600],[".btn",1000]].forEach(([s,d])=>show($(s),d)); // Tampilkan elemen lain secara bertahap

// Animasi foto profil: fade-in saat load, lalu floating terus-menerus
const hi=$(".home-img");
if(hi){hi.style.opacity="0";window.addEventListener("load",()=>setTimeout(()=>{hi.style.animation="f .8s forwards";setTimeout(()=>hi.style.animation+=",fl 4s ease-in-out infinite",800);},300));}

// Siapkan stroke lingkaran skill (progress circle) dengan panjang penuh dulu
const K=2*Math.PI*50;
$$(".fill").forEach(e=>{e.style.strokeDasharray=K;e.style.strokeDashoffset=K;});

// Saat section skill terlihat: animasikan kartu skill & isi lingkaran progress
onVisible("skill",()=>{
  $$(".skill-card").forEach((c,i)=>{c.style.cssText="opacity:0;transform:translateY(40px)";setTimeout(()=>c.style.cssText="transition:opacity .6s,transform .6s;opacity:1;transform:translateY(0)",i*150);});
  $$(".fill").forEach((e,i)=>{const o=K-(e.getAttribute("data-persen")/100)*K;setTimeout(()=>{e.style.transition="stroke-dashoffset 1.5s ease";e.style.strokeDashoffset=o;},i*150);});
});

// Saat section portfolio terlihat: tampilkan kartu secara bertahap
onVisible("portfolio",()=>$$(".porto-card").forEach((c,i)=>setTimeout(()=>c.classList.add("visible"),i*130)),.15);

// Efek 3D tilt + sorotan cahaya pada kartu portfolio saat hover
$$(".porto-card").forEach(card=>{
  const sh=document.createElement("div"); // Elemen overlay cahaya
  sh.style.cssText="position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:2;opacity:0;transition:opacity .3s;background:radial-gradient(circle 100px at var(--mx,50%) var(--my,50%),rgba(255,255,255,.06) 0%,transparent 70%);";
  card.appendChild(sh);
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    const rx=((e.clientY-r.top-r.height/2)/(r.height/2))*-6,ry=((e.clientX-r.left-r.width/2)/(r.width/2))*6;
    card.style.transition="transform .1s ease";
    card.style.transform=`translateY(-10px) scale(1.02) rotateX(${rx}deg) rotateY(${ry}deg)`; // Tilt 3D mengikuti kursor
    sh.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");
    sh.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");
    sh.style.opacity="1"; // Tampilkan cahaya
  });
  card.addEventListener("mouseleave",()=>{
    card.style.transition="transform .5s cubic-bezier(.23,1,.32,1)";
    card.style.transform="translateY(0) scale(1) rotateX(0) rotateY(0)"; // Reset posisi kartu
    sh.style.opacity="0"; // Sembunyikan cahaya
  });
})
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const number = document.getElementById('number').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!fullname || !email || !number || !subject || !message) {
    showToast('Please fill in all fields!', true);
    return;
  }

  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address!', true);
    return;
  }

  showToast('Message sent successfully! ✓', false);
  form.reset();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showToast(message, isError) {
  toast.textContent = message;
  toast.style.backgroundColor = isError ? '#e74c3c' : '#1e90ff';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value.trim() !== '') {
      input.style.borderColor = '#1e90ff';
    } else {
      input.style.borderColor = '';
    }
  });
});
const menuLinks = document.querySelectorAll('.footer-menu a');

menuLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.paddingLeft = '6px';
    link.style.transition = 'padding-left 0.2s ease';
  });

  link.addEventListener('mouseleave', () => {
    link.style.paddingLeft = '0';
  });
});

const iconBtns = document.querySelectorAll('.icon-btn');

iconBtns.forEach((btn, index) => {
  btn.style.opacity = '0';
  btn.style.transform = 'translateY(10px)';
  btn.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;

  setTimeout(() => {
    btn.style.opacity = '1';
    btn.style.transform = 'translateY(0)';
  }, 100);
});