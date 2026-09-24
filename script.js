const P=[
{t:"dog",e:"🎃",n:"Dýňové sušenky s lososovým olejem",p:"109 Kč",w:"200 g",d:"Křupavé sušenky s dýní a kapkou lososového oleje pro lesklou srst.",
c:"Ovesná mouka 50 %, dýně 30 %, vejce 10 %, lososový olej 5 %, přírodní rybí aroma 5 %",
a:"Vejce, ryby (olej), lepek (oves)",n2:"Bílkoviny 11 %, tuk 9 %, vláknina 6 %, popel 3 %, vlhkost 9 %",s:"6 měsíců"},
{t:"dog",e:"🥜",n:"Arašídové kosti",p:"119 Kč",w:"200 g",d:"Sušenky ve tvaru kostí s arašídovým máslem a banánem.",
c:"Ovesná mouka 45 %, arašídové máslo 100% 20 %, banán 20 %, vejce 10 %, skořice stopy",
a:"Arašídy, vejce, lepek (oves)",n2:"Bílkoviny 14 %, tuk 12 %, vláknina 5 %, popel 3 %, vlhkost 9 %",s:"6 měsíců"},
{t:"dog",e:"🍎",n:"Jablečné sušenky s jogurtem",p:"99 Kč",w:"200 g",d:"Lehký pamlsek pro citlivější žaludky.",
c:"Rýžová mouka 50 %, jablko 30 %, jogurt bílý bez cukru 10 %, kokosový olej 10 %",
a:"Mléko (jogurt)",n2:"Bílkoviny 7 %, tuk 8 %, vláknina 4 %, popel 2 %, vlhkost 8 %",s:"6 měsíců"},
{t:"dog",e:"🍠",n:"Batátové křupky s borůvkami",p:"129 Kč",w:"150 g",d:"Sušené batáty s borůvkami, bohaté na vlákninu a antioxidanty.",
c:"Batáty 75 %, borůvky 15 %, kokosový olej 5 %, ovesná mouka 5 %",
a:"Lepek (oves)",n2:"Bílkoviny 5 %, tuk 6 %, vláknina 8 %, popel 3 %, vlhkost 12 %",s:"9 měsíců"},
{t:"dog",e:"🥕",n:"Mrkvovo-petrželové sušenky",p:"99 Kč",w:"200 g",d:"Svěží sušenky s mrkví a petrželkou na dobrý dech.",
c:"Ovesná mouka 50 %, mrkev 30 %, vejce 10 %, petrželová nať 5 %, řepkový olej 5 %",
a:"Vejce, lepek (oves)",n2:"Bílkoviny 10 %, tuk 8 %, vláknina 6 %, popel 3 %, vlhkost 9 %",s:"6 měsíců"},
{t:"cat",e:"🐟",n:"Křupinky s lososovým olejem",p:"99 Kč",w:"60 g",d:"Malé křupavé polštářky s vůní lososa, bez masa.",
c:"Rýžová mouka 60 %, tapioka 20 %, lososový olej 8 %, přírodní rybí aroma 7 %, vejce 5 %",
a:"Ryby (olej), vejce",n2:"Bílkoviny 9 %, tuk 12 %, vláknina 2 %, popel 3 %, vlhkost 8 %",s:"6 měsíců"},
{t:"cat",e:"🌿",n:"Sušenky s catnipem",p:"89 Kč",w:"60 g",d:"Malé sušenky s kočičí mátou pro zábavu při hraní.",
c:"Ovesná mouka 70 %, vejce 15 %, catnip 10 %, kokosový olej 5 %",
a:"Vejce, lepek (oves)",n2:"Bílkoviny 12 %, tuk 8 %, vláknina 4 %, popel 3 %, vlhkost 9 %",s:"6 měsíců"},
{t:"cat",e:"🎃",n:"Dýňové polštářky",p:"89 Kč",w:"60 g",d:"Jemné polštářky s dýní, které podporují trávení.",
c:"Rýžová mouka 55 %, dýně 30 %, lososový olej 5 %, kočičí tráva 5 %, vejce 5 %",
a:"Ryby (olej), vejce",n2:"Bílkoviny 8 %, tuk 7 %, vláknina 5 %, popel 3 %, vlhkost 9 %",s:"6 měsíců"},
{t:"cat",e:"🍯",n:"Kuličky s pivovarskými kvasnicemi",p:"95 Kč",w:"60 g",d:"Chutné kuličky, které většina koček zbožňuje pro jejich vůni.",
c:"Ovesná mouka 60 %, pivovarské kvasnice 20 %, vejce 10 %, lososový olej 5 %, kočičí tráva 5 %",
a:"Ryby (olej), vejce, lepek (oves)",n2:"Bílkoviny 14 %, tuk 8 %, vláknina 4 %, popel 4 %, vlhkost 9 %",s:"6 měsíců"}
];
// Adresa, na kterou se objednávky odešlou (např. Formspree, Netlify Forms nebo vlastní server).
// Když zůstane prázdná, web běží v ukázkovém režimu a objednávku nikam neodešle.
const ORDER_ENDPOINT="";
const MIN_ORDER=200, FREE_SHIP=800, SHIP_FEE=65, COD_FEE=30;
const $=s=>document.querySelector(s);
const CZK=n=>n.toLocaleString('cs-CZ')+' Kč';
const unit=x=>parseInt(x.p,10);
let cart={};
try{cart=JSON.parse(localStorage.getItem('cart')||'{}')}catch(e){}
function save(){try{localStorage.setItem('cart',JSON.stringify(cart))}catch(e){}}

const g=$('#grid');
function row(l,v){return '<dt>'+l+'</dt><dd>'+v+'</dd>'}
function draw(f){
g.innerHTML=P.map((x,i)=>[x,i]).filter(([x])=>f==='all'||x.t===f).map(([x,i])=>
'<article class="card '+x.t+'"><div class="top"><div class="emoji" aria-hidden="true">'+x.e+'</div><div class="price">'+x.p+'</div></div>'+
'<h3>'+x.n+'</h3><div><span class="tag">'+(x.t==='dog'?'Pro psy':'Pro kočky')+'</span> <span class="tag">'+x.w+'</span></div>'+
'<p>'+x.d+'</p><details><summary>Složení a údaje</summary><dl>'+
row('Složení',x.c)+row('Alergeny',x.a)+row('Analytické složky',x.n2)+row('Trvanlivost',x.s)+
'</dl></details><button class="add" data-i="'+i+'">Do košíku</button></article>').join('');
}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
document.querySelectorAll('.filters button').forEach(o=>o.setAttribute('aria-pressed',o===b));
draw(b.dataset.f)});
g.addEventListener('click',e=>{
const b=e.target.closest('.add'); if(!b) return;
const i=b.dataset.i; cart[i]=(cart[i]||0)+1; save(); renderCart();
b.textContent='Přidáno ✓'; b.classList.add('ok');
setTimeout(()=>{b.textContent='Do košíku';b.classList.remove('ok')},1200);
});

const ship=()=>document.querySelector('input[name=ship]:checked').value;
const pay=()=>{const p=document.querySelector('input[name=pay]:checked');return p?p.value:''};
function renderPay(){
const cur=pay(), opts=ship()==='pickup'
?[['bank','Bankovní převod předem'],['cash','Hotově při osobním odběru']]
:[['bank','Bankovní převod předem'],['cod','Dobírka (+30 Kč)']];
$('#payOpts').innerHTML=opts.map(([v,l],k)=>'<label class="opt"><input type="radio" name="pay" value="'+v+'"'+((cur===v||(!cur&&k===0))?' checked':'')+'> '+l+'</label>').join('');
}
function totals(){
let sub=0; Object.keys(cart).forEach(i=>sub+=unit(P[i])*cart[i]);
const sh=ship()==='zas'?(sub>=FREE_SHIP||sub===0?0:SHIP_FEE):0;
const cod=pay()==='cod'?COD_FEE:0;
return {sub,sh,cod,total:sub+sh+cod};
}
function renderCart(){
const ids=Object.keys(cart).filter(i=>cart[i]>0);
$('#cartCount').textContent=ids.reduce((s,i)=>s+cart[i],0);
$('#cartItems').innerHTML=ids.length?ids.map(i=>{const x=P[i];return '<div class="crow"><div><b>'+x.n+'</b><small>'+x.w+' · '+x.p+' / ks</small></div>'+
'<div class="qty"><button type="button" data-a="dec" data-i="'+i+'" aria-label="Ubrat kus">−</button><span aria-live="polite">'+cart[i]+'</span><button type="button" data-a="inc" data-i="'+i+'" aria-label="Přidat kus">+</button></div>'+
'<div><b>'+CZK(unit(x)*cart[i])+'</b> <button type="button" class="rm" data-a="rm" data-i="'+i+'">Odebrat</button></div></div>'}).join(''):'<p class="empty">Košík je zatím prázdný. Vyberte pamlsky v nabídce výše.</p>';
const t=totals();
$('#totals').innerHTML='<div><span>Zboží</span><span>'+CZK(t.sub)+'</span></div><div><span>Doprava</span><span>'+(t.sh?CZK(t.sh):'zdarma')+'</span></div>'+(t.cod?'<div><span>Dobírka</span><span>'+CZK(t.cod)+'</span></div>':'')+'<div class="sum"><span>Celkem</span><span>'+CZK(t.total)+'</span></div>';
$('#addrWrap').hidden=ship()!=='zas';
$('#addrWrap input').required=ship()==='zas';
}
$('#cartItems').addEventListener('click',e=>{
const b=e.target.closest('button[data-a]'); if(!b) return;
const i=b.dataset.i,a=b.dataset.a;
if(a==='inc')cart[i]++; else if(a==='dec')cart[i]--; else cart[i]=0;
if(cart[i]<=0)delete cart[i];
save(); renderCart();
});
document.querySelectorAll('input[name=ship]').forEach(r=>r.onchange=()=>{renderPay();renderCart()});
$('#payOpts').addEventListener('change',renderCart);

$('#orderForm').addEventListener('submit',async e=>{
e.preventDefault();
const msg=$('#msg'); msg.textContent='';
const t=totals(), ids=Object.keys(cart).filter(i=>cart[i]>0);
if(!ids.length){msg.textContent='Košík je prázdný. Přidejte alespoň jeden pamlsek.';return}
if(t.sub<MIN_ORDER){msg.textContent='Minimální hodnota objednávky je '+CZK(MIN_ORDER)+'. Chybí ještě '+CZK(MIN_ORDER-t.sub)+'.';return}
const f=new FormData(e.target);
const order={number:'MT'+Date.now().toString().slice(-8),
customer:{name:f.get('name'),email:f.get('email'),phone:f.get('phone'),address:f.get('address')||'',note:f.get('note')||''},
shipping:ship(),payment:pay(),
items:ids.map(i=>({name:P[i].n,weight:P[i].w,qty:cart[i],unitPrice:unit(P[i])})),
totals:t};
const btn=e.target.querySelector('button[type=submit]'); btn.disabled=true;
try{
if(ORDER_ENDPOINT){
const r=await fetch(ORDER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(order)});
if(!r.ok) throw new Error(r.status);
}
$('#doneText').textContent='Číslo objednávky: '+order.number+'. Celkem k úhradě '+CZK(t.total)+'. Potvrzení a platební údaje pošleme na '+order.customer.email+'.';
$('#demoNote').hidden=!!ORDER_ENDPOINT;
$('#checkout').hidden=true; $('#done').hidden=false; $('#done').focus();
cart={}; save(); renderCart(); e.target.reset(); renderPay();
}catch(err){msg.textContent='Objednávku se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište e-mail.'}
btn.disabled=false;
});
$('#newOrder').onclick=()=>{$('#done').hidden=true;$('#checkout').hidden=false;renderCart()};

draw('all'); renderPay(); renderCart();