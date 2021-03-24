/*
  Name: httpgunjs

  Created by: Lightnet

*/
// https://gun.eco/docs/SEA#quickstart
//import { el, mount } from "redom";
//import { el, mount, unmount } from "https://redom.js.org/redom.es.min.js";
const { el, mount, unmount } = redom;
let gunurl = window.location.origin+'/gun';
//console.log(gunurl);
var gun = Gun(gunurl);
gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  //console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
});
//===============================================
// COPY PUBLIC KEY
async function publicKeyCopy(){
  // Select the text
  try{
    // Copy the text
    let pubKey = document.getElementById('aliaspublickey').value;
    await navigator.clipboard.writeText(pubKey);
    console.log('Public Key copied to clipboard');
  }catch (ex){
    console.error('Failed to copy: ', err);
  }
}
function chatTimeStamp(isRecord){
  if(isRecord==null){isRecord=true;}
  //console.log(isRecord);
  let time =new Date();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;
  //let ms = time.getUTCMilliseconds();
  let ms = time.getMilliseconds();
  let str;
  if(isRecord==false){
    str = time.getFullYear() + "/" + month + "/" + day + ":";
  }else{
    str = time.getFullYear() + "/" + month + "/" + day + ":" +  hour + ":" + min + ":" + sec + "." + ms;
  }
  return str;
}
//===============================================
// DIV NAV MENU ONCE LOGIN
const divNavMenu = el("div",{id:'divNavMenu'},[
  el('button',{onclick:btnProfile,textContent:'Profile'}),
  el('button',{onclick:btnChangePassphrase,textContent:'Change Passphrase'}),
  el('button',{onclick:btnPassphraseHint,textContent:'Passphrase Hint'}),
  el('button',{onclick:btnMessage,textContent:'Message'}),
  el('button',{onclick:btnChatLogs,textContent:'Chat'}),
  el('span',{onclick:btnChatLogs,textContent:' - | - '}),
  el('button',{onclick:btnLogout,textContent:'Logout'}),
]);
// https://gun.eco/docs/User#user-leave
// LOGOUT
function btnLogout(){
  console.log('Logout');
  console.log('No Function yet!');
  let user = gun.user();
  //console.log(user.is);
  //console.log(user);
  //user.leave({},(ack)=>{
    //console.log(user.is);
    //console.log(ack);
  //});
  user.leave({});
  console.log(user.is);
  if(!user.is){
    console.log('Null Alias Logout pass!');
    mount(divAccessPanel, divNavMenuAccess);
    mount(divAccessPanel, divAccessContent);

    unmount(divAccessPanel, divAlias);
    unmount(divAccessPanel, divPublicKey);
    unmount(divAccessPanel, divNavMenu);

    unmount(divAccessPanel, divChangePassphrase);
    unmount(divAccessPanel, divPassphraseHint);
    unmount(divAccessPanel, divMessages);
    unmount(divAccessPanel, divChatLogs);
  }
}
// USER DELETE // REMOVE ACCOUNT TO DELETE
function aliasDelete(){
  let user = gun.user();
  console.log('No Function yet!');
  /*
  user.delete('alias','passprhase',(ack)=>{
    console.log(ack);
    if(ack.err){
      return console.log('FAIL');
    }
    if(ack.ok){
      return console.log('PASS');
    }
  });
  */
}
// DIV LOGIN
const divLogin = el("div",{id:'divLogin'},[
el('label','Alias: ')
, el('br')
, el('input',{id:'alias',value:'useralias'})
, el('br')
, el('label','Passphrase: ')
, el('br')
, el('input',{id:'passphrase',value:'pass'})
, el('br')
, el('button',{onclick:btnlogin,id:'btnlogin',textContent:'Enter'})
]);
// DIV REGISTER
const divRegister = el("div",{id:'divRegister'},[
  el('label','Alias: ')
  , el('input',{id:'ralias',value:'useralias'})
  , el('br')
  , el('label','Passphrase #1: ')
  , el('input',{id:'rpassphrase1',value:'pass'})
  , el('br')
  , el('label','Passphrase #1: ')
  , el('input',{id:'rpassphrase2',value:'pass'})
  , el('br')
  , el('button',{onclick:btnregister, id:'btnbacklogin',textContent:'Sign Up'})
]);
// DIV FORGOT
const divForgot = el("div",{id:'divforgot'},[
  el('label','Alias: ')
  , el('input',{id:'falias',value:'useralias'})
  , el('br')
  , el('label','Question 1: ')
  , el('input',{id:'fquestion1',value:'test'})
  , el('br')
  , el('label','Question 2: ')
  , el('input',{id:'fquestion2',value:'test'})
  , el('br')
  , el('label','Hint: ')
  , el('input',{id:'fhint',value:'testa'})
  , el('br')
  , el('button',{onclick:btnGetPassphraseHint,textContent:'Get Hint'})
]);
// CHANGE PASSPHRASE
const divChangePassphrase = el("div",{id:'divChangePassphrase'},[
  el('label','Old Passphrase: '),
  el('input',{id:'oldpassphrase',value:'',placeholder:'Old Passphrase'}),
  el('br'),
  el('label','New Passphrase: '),
  el('input',{id:'newpassphrase',value:'',placeholder:'New Passphrase'}),
  el('br'),
  el('button',{onclick:btnChangePassphraseApply, textContent:'Apply'})
]);
// SET PASSPHRASE HINT
const divPassphraseHint = el("div",{id:'divPassphraseHint'},[
  el('label','Question 1: '),
  el('input',{id:'question1',value:'',placeholder:'Question #1'}),
  el('br'),
  el('label','Question 2: '),
  el('input',{id:'question2',value:'',placeholder:'Question #2'}),
  el('br'),
  el('label','Hint: '),
  el('input',{id:'hint',value:'',placeholder:'Passphrase Hint'}),
  el('br'),
  el('button',{onclick:btnPassphraseHintApply, textContent:'Apply'})
]);
// DISPLAY ALIAS
const divAlias=el('label',{textContent:'User:'},el('label',{id:'username',textContent:'guest'}));
// PUBLIC KEY
const divPublicKey=el('label',{textContent:'Public Key:'},[
  el('input',{id:'aliaspublickey',readonly:true, size:'98'}),
  el('button',{ onclick:publicKeyCopy,id:'copypublickey',textContent:'Copy'})
]);
// PROFILE
class AliasProfile{
  constructor() {
    this.el = el("div",{id:'divProfile'},[
      el('label','Alias:'),
      el('input',{id:'palias',onkeyup:typingProfileAlias,placeholder:'Alias'}),
      //el('button',{textContent:'Get',onclick:getProfileAlias}),
      el('br'),
      el('label','Born:'),
      el('input',{id:'pborn',onkeyup:typingProfileBorn,placeholder:'Born'}),
      el('br'),
      el('label','Education:'),
      el('input',{id:'peducation',onkeyup:typingProfileEducation,placeholder:'Education'}),
      el('br'),
      el('label','Skills:'),
      el('input',{id:'pskills',onkeyup:typingProfileSkills,placeholder:'Skills'}),
      el('br'),
      el('br'),
      el('label','Pub:'),
      el('input',{id:'ppublickeysearch',placeholder:'public key alias search!'
      //,onkeypress:typingProfilePublicKeySearch
      ,onkeyup:typingProfilePublicKeySearch
      }),
      el('button',{onclick:btnSTextPaste,textContent:'Paste Key'}),
      el('label','Status:'),
      el('label',{id:'sstatuspubickey',textContent:'None'}),
      el('br'),
      el('label','Alias:'),
      el('input',{id:'salias',placeholder:'Alias'}),
      el('br'),
      el('label','Born:'),
      el('input',{id:'sborn',placeholder:'Born'}),
      el('br'),
      el('label','Education:'),
      el('input',{id:'seducation',placeholder:'Education'}),
      el('br'),
      el('label','Skills:'),
      el('input',{id:'sskills',placeholder:'Skills'}),
    ]);
  }

  onmount() {
    console.log("mounted AliasProfile");
    let user = gun.user();
    user.get('profile').get('alias').once((ack)=>{
      console.log(ack);
      $('#palias').val(ack);
      //palias
    })
    user.get('profile').get('born').once((ack)=>{
      console.log(ack);
      $('#pborn').val(ack);
      //palias
    })
    user.get('profile').get('education').once((ack)=>{
      console.log(ack);
      $('#peducation').val(ack);
      //palias
    })
    user.get('profile').get('skills').once((ack)=>{
      console.log(ack);
      $('#pskills').val(ack);
      //palias
    })
  }

  onunmount() {
    console.log("unmounted ChatRoom");
    //need to clear name
    $('#palias').val('');
    $('#pborn').val('');
    $('#peducation').val('');
    $('#pskills').val('');
  }
}
const divProfile = new AliasProfile()
function typingProfileAlias(event){
  let user = gun.user();
  //user.get('profile').put();
  console.log($('#palias').val())
  user.get('profile').get('alias').put($('#palias').val());
}
function getProfileAlias(){
  let user = gun.user();
  user.get('profile').get('alias').once((ack)=>{
    console.log(ack);
  })
}
function typingProfileBorn(event){
  let user = gun.user();
  user.get('profile').get('born').put($('#pborn').val())
}
function typingProfileEducation(event){
  let user = gun.user();
  user.get('profile').get('education').put($('#peducation').val())
}
function typingProfileSkills(event){
  let user = gun.user();
  user.get('profile').get('skills').put($('#pskills').val())
}
// SEARCH PUBLIC KEY
var oldpublickey='';
async function typingProfilePublicKeySearch(){
  console.log('search pub...');
  let publickey = $('#ppublickeysearch').val();
  console.log(publickey);
  if(oldpublickey != publickey){
    oldpublickey=publickey;
    let user = gun.user(publickey);
    //console.log(user);
    let name = await user.get('alias').then();
    console.log(name);
    if(name){
      $('#sstatuspubickey').text('Found!');
      console.log("FOUND!");
      let pub = await user.get('pub').then();
      //console.log(pub);
      let salias = await user.get('profile').get('alias').then();
      $('#salias').val(salias);
      let sborn = await user.get('profile').get('born').then();
      $('#sborn').val(sborn);
      let seducation = await user.get('profile').get('education').then();
      $('#seducation').val(seducation);
      let sskills = await user.get('profile').get('skills').then();
      $('#sskills').val(sskills);
    }else{
      $('#sstatuspubickey').text('Null');
      $('#salias').val('');
      $('#sborn').val('');
      $('#seducation').val('');
      $('#sskills').val('');
    }
    console.log("NOT SAME???");
  }else{
    console.log("SAME???");
  }
}
// PASTE SEARCH PUB KEY
async function btnSTextPaste(){
  console.log(navigator.clipboard);
  if (!navigator.clipboard) {
    console.log('NULL clipboard!');
    return;
  }
  try {
    const text = await navigator.clipboard.readText();
    $('#ppublickeysearch').val(text);
    typingProfilePublicKeySearch();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
// MESSAGE
const divMessages = el("div",{id:'divMessages'},[
  el('label','message logs')
]);
// https://gun.eco/docs/API
//ev.off() //remove listener
// CHAT ROOM MESSAGES
var chat = gun.get('chat');
//var ev0 =null;
class ChatRoom{
  constructor() {
    this.el =el("div",{id:'divChatLogs'},[
      el('label','chat logs'),
      el('div',{ id:'chatmessages',
        style:{
          height:'200px',
          width:'500px',
          'border-style':'solid',
          'overflow-y': 'scroll'
        }
      })
      , el('input',{onkeyup:chatTypingInput,id:'chatinput'})
      , el('button',{onclick:btnChatMessage,textContent:'Enter'})
    ]);
  }

  onmount() {
    console.log("mounted ChatRoom");
    initChat();
  }

  onunmount() {
    console.log("unmounted ChatRoom");
    //turn off chat
    //ev0.off() // nope
    chat.off(); // node.on(listenerhandler)
  }

  onremount() {
    console.log("ONREMOUNT ChatRoom !!!!!!!!");
    $('#chatmessages').empty();
    initChat();
  }
}
const divChatLogs = new ChatRoom();
function chatTypingInput(event){
  console.log('typing...')
  if(event.keyCode == 13){
    //console.log($('#chatinput').val());
    processChatInput($('#chatinput').val())
  }
}
function btnChatMessage(){
  console.log('click...')
  processChatInput($('#chatinput').val());
}
function processChatInput(msg){
  let clocktime = chatTimeStamp();
  let user = gun.user();
  console.log(user.is.alias);
  
  gun.get('chat')
    .get(clocktime)
    .put({
      alias:user.is.alias,
      msg:msg,
      date:clocktime
    });
}
function chatMessageHandler(data,key, _msg, _ev){
  if(data !=null){
    ProcessChatMessage(data);
  }
}
function initChat(){
  let clocktime = chatTimeStamp(false);
  console.log(clocktime);
  //needs to be reinit to call off event
  chat = gun.get('chat');
  chat
    // {'>': 'start', '<': 'end'}
    //.get({'.':{'<':clocktime}, '%': 50000}).map()
    .get({'.':{'>':clocktime}, '%': 50000}).map()
    .once(chatMessageHandler);
}
// https://stackoverflow.com/questions/10503606/scroll-to-bottom-of-div-on-page-load-jquery/10503695
function ProcessChatMessage(data){
  console.log('incoming...');
  let msg = el('div',{id:data.date,textContent:`[${data.alias} ]: ${data.msg}`});
  $('#chatmessages').append(msg);
  $('#chatmessages').scrollTop($('#chatmessages')[0].scrollHeight);
}
// NAV MENU ACCESS BASIC
const divNavMenuAccess=el('div',[
  , el('button',{onclick:showLogin,textContent:'Login'})
  , el('button',{onclick:showRegister,textContent:'Register'})
  , el('button',{onclick:showForgot,textContent:'Forgot'})
])
const divAccessContent=el('div');
const divAccessPanel=el('div',[
  divNavMenuAccess,
  divAccessContent
])
//MAIN ENTRY DOC
mount(document.body, divAccessPanel);
mount(divAccessContent, divLogin);
function showLogin(){
  unmount(divAccessContent,divForgot)
  unmount(divAccessContent,divRegister)
  mount(divAccessContent, divLogin);
}
function showRegister(){
  unmount(divAccessContent,divForgot)
  unmount(divAccessContent,divLogin)
  mount(divAccessContent, divRegister);
}
function showForgot(){
  unmount(divAccessContent,divLogin)
  unmount(divAccessContent,divRegister)
  mount(divAccessContent, divForgot);
}
//===============================================
// LOGIN REQUEST
function btnlogin(){
  //console.log('login');
  let user = gun.user();
  //console.log($('#alias').val())
  //console.log($('#passphrase').val())
  user.auth($('#alias').val(), $('#passphrase').val(),(ack)=>{//user login username and password
    if(ack.err){
      console.log(ack.err);
      modalmessage('Fail Login');
    }else{
      console.log('PASS');
      unmount(divAccessPanel, divNavMenuAccess);
      unmount(divAccessPanel, divAccessContent);
      mount(divAccessPanel, divAlias);
      mount(divAccessPanel, divPublicKey);
      mount(divAccessPanel, divNavMenu);
      mount(divAccessPanel, divProfile);
      //console.log(ack);
      //console.log(user);
      //modalmessage('Login');
      $('#username').text(user.is.alias);
      $('#aliaskeycopy').text("Alias:"+$('#alias').val()+" (Key Copy)");
      $('#aliaspublickey').val(ack.sea.pub);
      //updateContacts();
    }
  });
};
//===============================================
// REGISTER REQUEST
function btnregister(){
  let user = gun.user();
  //console.log($('#ralias').val())
  //console.log($('#rpassphrase1').val())
  //console.log($('#rpassphrase2').val())
  user.create($('#ralias').val(), $('#rpassphrase1').val(),(ack)=>{//create user and password
    if(ack.err){
      console.log(ack.err);//if user exist or error
      modalmessage(ack.err);
    }else{
      console.log(ack);//pass if created
      modalmessage("Created " + $('#ralias').val() + "!");
    }
  });
};
// Change Passphrase Apply
function btnChangePassphraseApply(){
  let user = gun.user();
  //console.log('alias : ', user.is.alias);
  //console.log('oldpassphrase : ',$('#oldpassphrase').val());
  //console.log('newpassphrase : ',$('#newpassphrase').val());
  user.auth(user.is.alias, $('#oldpassphrase').val(), (ack) => {//user auth call
    let status = ack.err || "Saved!";//check if there error else saved message.
    console.log(status);
    modalmessage(status);
  }, {change: $('#newpassphrase').val()});//set config to change password
}
// Passphrase Hint Apply
async function btnPassphraseHintApply(){
  let user = gun.user();
  let q1 = $('#question1').val(); //get input id question 1
  let q2 = $('#question2').val(); //get input id question 2
  let hint = $('#hint').val(); //get input id hint
  let sec = await Gun.SEA.secret(user.is.epub, user._.sea);//mix key to decrypt
  let enc_q1 = await Gun.SEA.encrypt(q1, sec);//encrypt q1
  user.get('forgot').get('q1').put(enc_q1);//set hash q1 to user data store
  let enc_q2 = await Gun.SEA.encrypt(q2, sec);//encrypt q1
  user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
  sec = await Gun.SEA.work(q1,q2);//encrypt key
  //console.log(sec);
  let enc = await Gun.SEA.encrypt(hint, sec);//encrypt hint
  //console.log(enc);
  user.get('hint').put(enc,ack=>{//set hash hint
    //console.log(ack);
    if(ack.err){
      //console.log("Error!");
      modalmessage(ack.err);
      return;
    }
    if(ack.ok){
      //console.log('Hint Apply!');
      modalmessage('Hint Apply!');
    }
  });
}
// GET PASSPHRASE HINT
async function btnGetPassphraseHint(){
  let alias = $('#falias').val();
  alias = await gun.get('~@'+alias).then();//reused variable
  if(!alias){//check user exist if not return false.
    modalmessage('Not Found Alias!');
    return;
  }
  let publickey;
  for(let obj in alias){//object 
    //console.log(obj);
    publickey = obj;//property name for public key
  }
  publickey = SEA.opt.pub(publickey);//check and convert to key or null?
  let q1 = ($('#fquestion1').val() || '').trim(); //get id fquestion1 input
  let q2 = ($('#fquestion2').val() || '').trim(); //get id fquestion2 input
  if((!q1)||(!q2)){
    //console.log('Q Empty!');
    modalmessage('"Question (1 || 2) Empty!"');
    return;
  }
  let to = gun.user(publickey);//get user alias graph
  let hint = await to.get('hint').then();//get encrypt hint key graph
  let dec = await Gun.SEA.work(q1,q2);//get fquestion1 and fquestion2 string to mix key
  hint = await Gun.SEA.decrypt(hint,dec);//get hint and key decrypt message
  if(hint !=null){//check if hint is string or null
    $('#fhint').val(hint);
  }else{
    modalmessage("Fail Decrypt!");
  }
}
//===============================================
// DIALOG BOX MODEL
const divModel = el("div",{id:'divModel',class:'modal'},[
  el('div',{id:'dialog',class:'modal-content'},[
    el('p',{textContent:'Message: '},el('label',{id:'dialogmessage',textContent:'None'})),
    el('button',{onclick:btnDialogOkay,textContent:'Okay'})
  ])
]);
mount(document.body, divModel);
//$("#divModel").show();
//===============================================
// DIALOG MESSAGE
function modalmessage(_text){
  $("#dialogmessage").text(_text);
  $("#divModel").show();
}
function btnDialogOkay(){
  console.log('close model?');
  $("#divModel").hide();
};
//===============================================
// BUTTON NAV MENU ONCE LOGIN
function hidediv(){
  unmount(divAccessPanel, divProfile);
  unmount(divAccessPanel, divChangePassphrase);
  unmount(divAccessPanel, divPassphraseHint);
  unmount(divAccessPanel, divMessages);
  unmount(divAccessPanel, divChatLogs);
}
function btnProfile(){
  hidediv();
  mount(divAccessPanel, divProfile);
}
function btnChangePassphrase(){
  hidediv();
  mount(divAccessPanel, divChangePassphrase);
}
function btnPassphraseHint(){
  hidediv();
  mount(divAccessPanel, divPassphraseHint);
}
function btnMessage(){
  hidediv();
  mount(divAccessPanel, divMessages);
}
function btnChatLogs(){
  hidediv();
  mount(divAccessPanel, divChatLogs);
}