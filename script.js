const ENQUIRY_API_URL="https://script.google.com/macros/s/AKfycby-EpcZmSg5K5bHDsKJdjRXZk4c2mdmbI01rMinhLKsYXWxWgJFMPKfVfeUurgqz3_GBA/exec";

/* Navigation */
const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");

function closeNavigation(){
  if(!navLinks||!menuBtn)return;
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded","false");
  menuBtn.textContent="☰";
}

function openNavigation(){
  if(!navLinks||!menuBtn)return;
  navLinks.classList.add("open");
  menuBtn.setAttribute("aria-expanded","true");
  menuBtn.textContent="✕";
}

if(menuBtn&&navLinks){
  menuBtn.setAttribute("aria-expanded","false");

  menuBtn.addEventListener("click",event=>{
    event.stopPropagation();
    navLinks.classList.contains("open") ? closeNavigation() : openNavigation();
  });

  navLinks.addEventListener("click",event=>event.stopPropagation());

  document.addEventListener("click",event=>{
    if(navLinks.classList.contains("open") &&
       !navLinks.contains(event.target) &&
       !menuBtn.contains(event.target)){
      closeNavigation();
    }
  });

  document.querySelectorAll("#navLinks a").forEach(link=>{
    link.addEventListener("click",closeNavigation);
  });

  document.addEventListener("keydown",event=>{
    if(event.key==="Escape") closeNavigation();
  });

  window.addEventListener("resize",()=>{
    if(window.innerWidth>1180) closeNavigation();
  });
}

/* Enquiry forms */
document.querySelectorAll("form[data-enquiry]").forEach(form=>{
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    const status=form.querySelector(".form-status");
    const data=Object.fromEntries(new FormData(form).entries());

    if(!status)return;

    try{
      const response=await fetch(ENQUIRY_API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        body:new URLSearchParams(data)
      });

      if(!response.ok)throw new Error("Enquiry submission failed");

      status.style.display="block";
      status.style.background="#e9f8ef";
      status.style.color="#063d25";
      status.textContent="Thank you. Your enquiry has been submitted successfully. Our team will contact you.";
      form.reset();
    }catch(error){
      status.style.display="block";
      status.style.background="#fff0f0";
      status.style.color="#9b2226";
      status.textContent="We could not submit the enquiry right now. Please call or WhatsApp HD Facilities directly.";
    }
  });
});

/* Footer year */
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();
