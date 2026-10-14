const SERVICES = [
  {id:"general",name:"General Consultation",symbol:"✚",description:"A general clinic visit for routine, non-emergency concerns.",price:250,duration:"20 minutes"},
  {id:"dental",name:"Dental Consultation",symbol:"☼",description:"A sample booking option for a routine dental check-up.",price:350,duration:"30 minutes"},
  {id:"eye",name:"Eye Check-up",symbol:"◉",description:"Book a sample appointment for a basic vision check.",price:300,duration:"20 minutes"},
  {id:"nutrition",name:"Nutrition Consultation",symbol:"❋",description:"Discuss general food and lifestyle goals with a professional.",price:400,duration:"30 minutes"},
  {id:"physio",name:"Physiotherapy",symbol:"♧",description:"A sample appointment option for movement and mobility support.",price:450,duration:"30 minutes"},
  {id:"skin",name:"Skin Consultation",symbol:"✿",description:"A sample clinic consultation booking category.",price:400,duration:"20 minutes"}
];
const $ = (id) => document.getElementById(id);
let selectedService = SERVICES[0];
let toastTimer;
function read(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
function write(key,value){localStorage.setItem(key,JSON.stringify(value))}
function showToast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function showView(view){
  document.querySelectorAll(".view").forEach(el=>el.classList.add("hidden"));
  const target=$(view);if(target)target.classList.remove("hidden");
  document.querySelectorAll(".nav-link").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
  $("nav").classList.remove("open");
  if(view==="appointments")renderAppointments();
  if(view==="profile")loadProfile();
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-view]").forEach(el=>el.addEventListener("click",()=>showView(el.dataset.view)));
$("menuBtn").addEventListener("click",()=>$("nav").classList.toggle("open"));
function renderServices(query=""){
  const list=SERVICES.filter(s=>(s.name+" "+s.description).toLowerCase().includes(query.toLowerCase()));
  $("serviceGrid").innerHTML=list.length?list.map(s=>`<article class="service-card"><div class="service-symbol">${s.symbol}</div><h3>${s.name}</h3><p>${s.description}</p><div class="service-meta"><div><div class="price">₹${s.price}</div><small>${s.duration}</small></div><button class="small-btn" data-book="${s.id}">Book now →</button></div></article>`).join(""):`<div class="empty-state">No services match your search.</div>`;
  document.querySelectorAll("[data-book]").forEach(btn=>btn.addEventListener("click",()=>openBooking(btn.dataset.book)));
}
function openBooking(id){
  selectedService=SERVICES.find(s=>s.id===id)||SERVICES[0];
  $("chosenService").innerHTML=`<div class="service-symbol">${selectedService.symbol}</div><div><strong>${selectedService.name}</strong><small>${selectedService.duration} · Sample service</small></div>`;
  $("chosenPrice").textContent=`₹${selectedService.price}`;
  const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
  $("appointmentDate").min=today.toISOString().slice(0,10);
  const profile=read("cc_profile",{});
  if(profile.name)$("patientName").value=profile.name;
  if(profile.email)$("patientEmail").value=profile.email;
  showView("booking");
}
$("searchInput").addEventListener("input",e=>renderServices(e.target.value));
$("bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const booking={id:"CC"+Date.now().toString().slice(-7),serviceId:selectedService.id,service:selectedService.name,price:selectedService.price,name:$("patientName").value.trim(),email:$("patientEmail").value.trim(),date:$("appointmentDate").value,time:$("appointmentTime").value,payment:$("paymentMethod").value,status:"Requested",createdAt:new Date().toISOString()};
  if(!booking.name||!booking.email||!booking.date||!booking.time){showToast("Please complete all required fields.");return}
  const bookings=read("cc_bookings",[]);bookings.unshift(booking);write("cc_bookings",bookings);
  write("cc_profile",{name:booking.name,email:booking.email});
  $("bookingForm").reset();
  showView("appointments");showToast("Demo booking saved successfully!");
});
function renderAppointments(){
  const bookings=read("cc_bookings",[]);
  if(!bookings.length){$("appointmentList").innerHTML='<div class="empty-state"><div style="font-size:35px">▣</div><strong>No appointments yet</strong><p>Choose a clinic service to create your first demo booking.</p><button class="btn btn-primary" data-view="services">Browse services</button></div>';$("appointmentList").querySelector("[data-view]").addEventListener("click",()=>showView("services"));return}
  $("appointmentList").innerHTML=bookings.map(b=>`<article class="appointment-card"><div><span class="status">${escapeHtml(b.status)}</span><h3>${escapeHtml(b.service)}</h3><p>Booking ID: ${escapeHtml(b.id)}</p><p>📅 ${escapeHtml(b.date)} &nbsp; · &nbsp; ${escapeHtml(b.time)}</p><p>Payment: ${escapeHtml(b.payment)} · ₹${Number(b.price)||0}</p></div><div><button class="cancel-btn" data-cancel="${escapeHtml(b.id)}">Cancel request</button></div></article>`).join("");
  document.querySelectorAll("[data-cancel]").forEach(btn=>btn.addEventListener("click",()=>{const id=btn.dataset.cancel;write("cc_bookings",read("cc_bookings",[]).filter(b=>b.id!==id));renderAppointments();showToast("Demo booking removed.");}));
}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function loadProfile(){const p=read("cc_profile",{});$("profileName").value=p.name||"";$("profileEmail").value=p.email||""}
$("profileForm").addEventListener("submit",e=>{e.preventDefault();write("cc_profile",{name:$("profileName").value.trim(),email:$("profileEmail").value.trim()});$("profileMessage").textContent="Profile saved on this device.";showToast("Profile saved.");});
$("feedbackForm").addEventListener("submit",e=>{e.preventDefault();const items=read("cc_feedback",[]);items.push({rating:$("rating").value,comment:$("feedbackComment").value.trim(),createdAt:new Date().toISOString()});write("cc_feedback",items);$("feedbackMessage").textContent="Thank you! Your demo feedback has been saved on this device.";$("feedbackComment").value="";showToast("Feedback saved.");});
renderServices();
