(function(){
// Update these values for the business contact form.
var EMAIL="gallanjuguna@gmail.com",WA="254736812679";
// Service records power cards, About-page shortcuts, and service detail dialogs. Keep icon order aligned with each page's SVG symbols.
var SERVICES=[
{title:"IT support and consulting",summary:"Practical help and honest advice for your people and systems.",detail:"Get a clear view of what is working, what needs attention, and what to do next. We can help your team remotely or on site, resolve day-to-day issues, and plan technology purchases around the way your business operates.",items:["Remote and on-site troubleshooting","Hardware and software setup","IT planning and budgeting"],image:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",imageAlt:"Technology professional working at a laptop"},
{title:"CCTV and electronic security",summary:"Cameras, access control and alarms, installed and monitored.",detail:"Protect your premises with a security system planned around your entrances, working areas and hours. We help select suitable equipment, install it neatly, and make sure the people who need access know how to use it.",items:["IP and analogue CCTV","Access control and alarms","Remote viewing on your phone"],image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=85",imageAlt:"Security camera monitoring equipment"},
{title:"Networking and connectivity",summary:"Wired and wireless networks that stay fast and stable.",detail:"Connect staff, devices and locations with a network designed for reliable coverage and straightforward maintenance. We can assess your current setup, install cabling and Wi-Fi, and help resolve connectivity issues.",items:["Wi-Fi design and installation","Structured cabling","Internet and VPN setup"],image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",imageAlt:"Network and server equipment"},
{title:"Cloud and business technology",summary:"Email, storage and software moved to the cloud without disruption.",detail:"Make everyday work easier to access across your team. We help plan cloud moves, configure business email and shared storage, and put backup and recovery arrangements in place before you need them.",items:["Business email and file storage","Cloud migration","Backup and recovery"],image:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=85",imageAlt:"Cloud-connected network infrastructure"},
{title:"Website design and development",summary:"Fast, professional websites that bring in customers.",detail:"Give customers a clear, credible place to learn about your business and take the next step. We build responsive company and service websites, then help with the domain, business email, hosting and updates.",items:["Company and service websites","Domains and business email","Updates and hosting"],image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",imageAlt:"Developer building a website on a laptop"},
{title:"Cybersecurity and data protection",summary:"Protection against attacks, plus backups that actually restore.",detail:"Reduce common security risks with practical controls that fit the way your team works. We can review your current setup, improve device and network protection, and help staff recognize suspicious activity.",items:["Security assessments","Firewalls and endpoint protection","Staff awareness guidance"],image:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85",imageAlt:"Digital cybersecurity and network protection visual"},
{title:"Managed IT maintenance",summary:"Monitoring and upkeep for a fixed monthly fee.",detail:"Keep business systems maintained with planned checks and ongoing support. We monitor agreed services, apply routine updates, and give your team a consistent point of contact when something needs attention.",items:["Monitoring and updates","Regular health checks","Fixed monthly plans"],image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",imageAlt:"Close-up of a computer circuit board"}
];

function createServiceCard(service,index){
return '<article class="tile"><button class="tile-trigger" type="button" data-service-index="'+index+'" aria-haspopup="dialog" aria-controls="service-dialog"><span class="ico" aria-hidden="true"><svg><use href="#i'+index+'"></use></svg></span><h3>'+service.title+'</h3><p>'+service.summary+'</p><span class="tile-hint">View More <span class="tile-arrow" aria-hidden="true">&#8594;</span></span></button></article>';
}

document.querySelectorAll("[data-svc]").forEach(function(grid){
grid.innerHTML=SERVICES.map(createServiceCard).join("");
});

var serviceSelect=document.querySelector('select[name="svc"]');
if(serviceSelect){
SERVICES.forEach(function(service){serviceSelect.add(new Option(service.title))});
serviceSelect.add(new Option("Not sure yet"));
}

var currentPage=document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(function(link){
if(link.dataset.link===currentPage)link.setAttribute("aria-current","page");
else link.removeAttribute("aria-current");
});

var navigation=document.getElementById("primary-navigation");
var navToggle=document.querySelector(".nav-toggle");
function setNavigationOpen(isOpen){
if(!navigation||!navToggle)return;
navigation.classList.toggle("open",isOpen);
navToggle.setAttribute("aria-expanded",String(isOpen));
navToggle.setAttribute("aria-label",isOpen?"Close navigation":"Open navigation");
}
if(navToggle){
navToggle.addEventListener("click",function(){
setNavigationOpen(navToggle.getAttribute("aria-expanded")!=="true");
});
}
if(navigation){
navigation.addEventListener("click",function(event){
if(event.target.closest("a"))setNavigationOpen(false);
});
}

var year=document.getElementById("y");
if(year)year.textContent=new Date().getFullYear();
var footer=document.getElementById("site-footer");
if(footer)footer.classList.add("arrive");

var serviceDialog=document.getElementById("service-dialog");
function openService(index){
var service=SERVICES[index];
if(!service||!serviceDialog)return;
serviceDialog.querySelector("#service-dialog-title").textContent=service.title;
serviceDialog.querySelector("#service-dialog-detail").textContent=service.detail;
var image=serviceDialog.querySelector("#service-dialog-image");
image.src=service.image;
image.alt=service.imageAlt;
var itemList=serviceDialog.querySelector("#service-dialog-items");
itemList.textContent="";
service.items.forEach(function(item){
var listItem=document.createElement("li");
listItem.textContent=item;
itemList.appendChild(listItem);
});
serviceDialog.showModal();
}
if(serviceDialog){
document.addEventListener("click",function(event){
var trigger=event.target.closest("[data-service-index]");
if(trigger){openService(Number(trigger.dataset.serviceIndex));return}
if(event.target.closest("[data-dialog-close]")){serviceDialog.close();return}
if(event.target===serviceDialog)serviceDialog.close();
});
document.addEventListener("keydown",function(event){
if(event.key==="Escape"&&serviceDialog.open){event.preventDefault();serviceDialog.close()}
});
var serviceIndex=new URLSearchParams(location.search).get("service");
if(serviceIndex!==null&&Number.isInteger(Number(serviceIndex)))openService(Number(serviceIndex));
}

var form=document.getElementById("f");
if(form){
form.querySelectorAll("button[data-m]").forEach(function(button){
button.addEventListener("click",function(){form.dataset.mode=button.dataset.m});
});
form.addEventListener("submit",function(event){
event.preventDefault();
var data=new FormData(form),mode=form.dataset.mode||"mail";
var body="Name: "+data.get("name")+"\nContact: "+data.get("contact")+"\nService: "+data.get("svc")+"\n\n"+data.get("msg");
if(mode==="wa")window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(body),"_blank","noopener");
else location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent("Enquiry: "+data.get("svc"))+"&body="+encodeURIComponent(body);
});
}
})();
