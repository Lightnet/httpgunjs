/*
  Name: httpgunjs

  Created by: Lightnet

*/
// https://gun.eco/docs/SEA#quickstart
//storage.clear();
localStorage.clear();
//import { el, mount } from "redom";
//import { el, mount, unmount } from "https://redom.js.org/redom.es.min.js";
const { el, mount, unmount} = redom;
let gunurl = window.location.origin+'/gun';
;(async ()=>{
  /*
  if (!navigator.clipboard) {
    console.log('NULL clipboard!');
    return;
  }
  try {
    //await navigator.clipboard.writeText('');
    //console.log('Clear copied to clipboard: ');
    const text = await navigator.clipboard.readText();
    console.log(text);
  } catch (err) {
    console.error('paste purge: ', err);
  }
  */
})();
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
  if (!navigator.clipboard) {
    console.log('NULL clipboard!');
    return;
  }
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
//CHAT TIME STAMP
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
  ms= ('00' + ms).slice(-3);
  //ms = (ms < 10 ? "00" : "") + ms;
  //ms = (ms < 100 ? "0" : "") + ms;

  let str;
  if(isRecord==false){
    str = time.getFullYear() + "/" + month + "/" + day + ":";
  }else{
    str = time.getFullYear() + "/" + month + "/" + day + ":" +  hour + ":" + min + ":" + sec + "." + ms;
  }
  return str;
}
function DateToTimeInt(time){
  //let time = timeStampD();
  //console.log(time);
  //console.log(time.split('/'))
  //console.log(time.split(':'))
  //console.log(time.split('.'))
  let time0 =new Date();
  time0.setFullYear(time.split('/')[0]);
  time0.setMonth(time.split('/')[1]-1)
  time0.setDate(time.substring(10,8))
  //console.log(time.substring(10,8))
  //time0.setHours(time.split(':')[1])
  //console.log(time0.getHours());
  time0.setMinutes(time.split(':')[2])
  time0.setSeconds(time.substring(19,17))
  time0.setMilliseconds(time.split('.')[1])
  //time0.setTime(1)
  //console.log(time0);
  //console.log(time0.getTime());
  return time0.getTime();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//===============================================
// DIV NAV MENU ONCE LOGIN
const divNavMenu = el("div",{id:'divNavMenu'},[
  el('button',{onclick:btnNavMenuProfile,textContent:'Profile'}),
  el('button',{onclick:btnNavMenuChangePassphrase,textContent:'Change Passphrase'}),
  el('button',{onclick:btnNavMenuPassphraseHint,textContent:'Passphrase Hint'}),
  el('button',{onclick:btnNavMenuPrivateMessage,textContent:'Private Message'}),
  el('button',{onclick:btnNavMenuChatRoom,textContent:'Chat Room'}),
  el('span',{textContent:' - | - '}),
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
    unmount(divAccessPanel, divPrivateMessages);
    unmount(divAccessPanel, divChatRoom);
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
// DIV LOGIN CONTENT
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
// DIV REGISTER CONTENT
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
// DIV FORGOT CONTENT
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
// CHANGE PASSPHRASE CONTENT
const divChangePassphrase = el("div",{id:'divChangePassphrase'},[
  el('label','Old Passphrase: '),
  el('input',{id:'oldpassphrase',value:'',placeholder:'Old Passphrase'}),
  el('br'),
  el('label','New Passphrase: '),
  el('input',{id:'newpassphrase',value:'',placeholder:'New Passphrase'}),
  el('br'),
  el('button',{onclick:btnChangePassphraseApply, textContent:'Apply'})
]);
// SET PASSPHRASE HINT CONTENT
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
// DISPLAY ALIAS CONTENT
const divAlias=el('label',{textContent:'User:'},el('label',{id:'username',textContent:'guest'}));
// PUBLIC KEY CONTENT
const divPublicKey=el('label',{textContent:'Public Key:'},[
  el('input',{id:'aliaspublickey',readonly:true, size:'98'}),
  el('button',{ onclick:publicKeyCopy,id:'copypublickey',textContent:'Copy'})
]);
// PROFILE CONTENT
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
    //console.log("mounted AliasProfile");
    let user = gun.user();
    user.get('profile').get('alias').once((ack)=>{
      //console.log(ack);
      $('#palias').val(ack);
      //palias
    })
    user.get('profile').get('born').once((ack)=>{
      //console.log(ack);
      $('#pborn').val(ack);
      //palias
    })
    user.get('profile').get('education').once((ack)=>{
      //console.log(ack);
      $('#peducation').val(ack);
      //palias
    })
    user.get('profile').get('skills').once((ack)=>{
      //console.log(ack);
      $('#pskills').val(ack);
      //palias
    })
  }

  onunmount() {
    //console.log("unmounted AliasProfile");
    //need to clear name
    $('#palias').val('');
    $('#pborn').val('');
    $('#peducation').val('');
    $('#pskills').val('');
  }
}
// PROFILE PAGE
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
//PRIVATE MESSAGE VAR
var bInitPM= false;
var PMUser;
var PMTo;
// PRIVATE MESSAGE CONTENT
class PrivateMessage{
  constructor() {
    this.contact;
    this.el = el("div",{id:'divPrivateMessage'},[
      el('label','Private Messages'),
      el('label',' - | - '),
      el('label','Pub Key:'),
      el('select',{id:'pmcontacts',onchange:selectContactPM},[el('option',{default:true,textContent:'Select Public Keys'})]),
      el('input',{id:'pmpublickey',onkeyup:typingPMPubKeySearch,placeholder:'Alias Public Key'}),
      el('button',{onclick:copyPMPubKeySearch,textContent:'copy'}),
      el('button',{onclick:pastePMPubKeySearch,textContent:'paste'}),
      el('button',{onclick:addContactPMPubKeySearch,textContent:'+'}),
      el('button',{onclick:removeContactPMPubKeySearch,textContent:'-'}),
      el('label','Status: '),
      el('label',{id:'pmPubKeystatus',textContent:'None'}),
      el('div',{ id:'privatemessages',
        style:{
          height:'200px',
          width:'500px',
          'border-style':'solid',
          'overflow-y': 'scroll'
        }
      }),
      , el('button',{onclick:btnGetPMessages,textContent:'Get Messages'})
      , el('button',{onclick:btnPMSort,textContent:'Sort'})
      , el('input',{onkeyup:typingPrivateMessage,id:'privatemessageinput'})
      , el('button',{onclick:btnPrivateMessage,textContent:'Enter'})
    ]);
  }
  addContact(data){
    //console.log(data);
    let option = el('option',{id:data.id, value:data.pub},`${data.alias}`);
    $('#pmcontacts').append(option);
  }
  updateContact(){
    $('#pmcontacts').empty();
    $('#pmcontacts').append(el('option',{default:true,textContent:'Select Public Keys'}));
    let user = gun.user();
    //let contacts = [];
    let self = this;
    this.contact = user.get('contact').once().map().once(async(data,id)=>{
      //console.log(data);
      //console.log(id);
      if(data == null){
        return;
      }
      if(data){
        if(data == 'null'){
          return;
        }
        let name = await user.get('contact').get(id).get('alias').then();
        if(name){
          //console.log(name);
          //console.log("ADD CONTACT?");
          self.addContact({id:id,alias:name,pub:id});
        }
      }
    });
    this.contact.off();
  }
  onmount(){
    this.updateContact();
    $('#privatemessages').empty();
    //initPrivateMessages();
  }
  onunmount(){
    $('#pmpublickey').val('');
    bInitPM=false;
    if(PMUser){
      PMUser.off();
      PMUser=null;
    }
    if(PMTo){
      PMTo.off();
      PMTo=null;
    }
    try {
      this.contact.off();  
    } catch (error) {
      console.log(error);
    }
  }
}
// DIV SORT PM MESSAGES
function btnPMSort(){
  // https://stackoverflow.com/questions/7742090/how-to-sort-divs-by-content-date
  // https://jsfiddle.net/greguarr/2fr0vmhu/
  console.log('SORT?');
  //$('#privatemessages').sortContent({asc:true})
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  //list = document.getElementById("id01");
  //list = $('#privatemessages');
  list = document.getElementById('privatemessages');
  switching = true;
  //dir = "asc";
  dir = "desc";
  while (switching) {
    switching = false;
    b = list.getElementsByTagName('div');
    console.log(b.length);
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (dir == "asc") {
        console.log(b[i].id);
        //if (b[i].id > b[i + 1].id) {
        if (DateToTimeInt(b[i].id) > DateToTimeInt(b[i + 1].id)) {
          console.log('change true');
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if ( DateToTimeInt(b[i].id) < DateToTimeInt(b[i + 1].id)) {
          shouldSwitch= true;
          console.log('change true');
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  console.log('END SORT');
}
//TODOLIST 
async function btnGetPMessages(){
  console.log('CHECKING PM...');
  $('#privatemessages').empty();
  bInitPM=true;
  /*
  if(PMUser){
    PMUser.off();
    await sleep(200);
    PMUser=null;
  }
  if(PMTo){
    PMTo.off();
    await sleep(200);
    PMTo=null;
  }
  */
  await sleep(200);
  initPrivateMessages();
}
// SELECT CONTACT PM
function selectContactPM(){
  //console.log($('#pmcontacts').val());
  $('#pmpublickey').val($('#pmcontacts').val());
  typingPMPubKeySearch();
}
// SET UP PRIVATE MESSAGE
const divPrivateMessages = new PrivateMessage();
// BUTTON PRIVATE MESSAGE
function btnPrivateMessage(){
  //console.log('privatemessageinput');
  processPrivateMessage()
}
// TYPING PRIVATE MESSAGE
function typingPrivateMessage(event){
  if(event.keyCode == 13){
    processPrivateMessage();
  }
}
//PROCESS PRIVATE MESSAGE
async function processPrivateMessage(){
  let msg = $('#privatemessageinput').val();
  msg = (msg || '').trim();
  //console.log('PM');
  //console.log(msg);
  if(!msg) return;//check if not message empty
  let user = gun.user();
  //console.log(user);
  if(!user.is){ 
    console.log('NOT USER!');
    return 
  }//check if user exist
  let pub = $('#pmpublickey').val();
  //console.log('pub:',pub);
  pub = (pub || '').trim();
  if(!pub){ 
    console.log('EMPTY PUBLIC KEY!');
    return;
  }//check if not id empty
  let to = gun.user(pub);//get alias
  let who = await to.then() || {};//get alias data
  //console.log(who);
  if(!who.alias){
    //console.log("No Alias!");
    return;
  }
  if(user.is.pub == who.pub){
    //console.log('SAME ALIAS FOR PM');
    return;
  }
  let sec = await SEA.secret(who.epub, user._.sea); // Diffie-Hellman
  let enc = await SEA.encrypt(msg, sec); //encrypt message
  //console.log(enc);
  let clock = chatTimeStamp()
  //user.get('messages').get(pub).set(enc);
  user.get('messages').get(pub).get(clock).put(enc);
  if(bInitPM==false){
    initPrivateMessages();
  }
  bInitPM=true;
}
// INIT PRIVATE MESSAGES
async function initPrivateMessages(){
  let user = gun.user();
  if(!user.is){ return }//check if user exist
  let pub = ($('#pmpublickey').val() || '').trim();
  if(!pub) return;//check if not id empty
  let to = gun.user(pub);//get alias
  let who = await to.then() || {};//get alias data
  if(!who.alias){
    console.log("No Alias!");
    return;
  }
  UI.dec = await Gun.SEA.secret(who.epub, user._.sea); // Diffie-Hellman
  //console.log("getting message");
  // To deal test out listen turn off
  if(PMUser){
    PMUser.off();
  }
  if(PMTo){
    PMTo.off();
  }
  //.get({'.':{'>':clocktime}, '%': 50000}).map()
  //  .once(chatMessageHandler);
  let clocktime = chatTimeStamp(false); 
  //console.log('INIT SET UP PM');
  PMUser = user.get('messages').get(pub).get({'.':{'>':clocktime},'%': 50000});
  PMUser.map()
  .once((data,id)=>{
    UI(data,id,user.is.alias);
  });

  PMTo= to.get('messages').get(user._.sea.pub).get({'.':{'>':clocktime},'%': 50000});
  PMTo.map()
  .once((data,id)=>{
    UI(data,id,who.alias);
  });

  //user.get('messages').get(pub).map().once((data,id)=>{
    //UI(data,id,user.is.alias)
  //});
  //to.get('messages').get(user._.sea.pub).map().once((data,id)=>{
    //UI(data,id,who.alias)
  //});
  //console.log('END SET UP PM');
}
// ADD PM MESSAGE TO CONTENT
async function UI(say, id, alias){
  say = await Gun.SEA.decrypt(say, UI.dec);
  let msg = el('div',{id:id,textContent:`${alias} : ${say}`})
  $('#privatemessages').append(msg);
  $('#privatemessages').scrollTop($('#privatemessages')[0].scrollHeight);
}
// COPY PRIVATE MESSAGE PUB KEY
async function copyPMPubKeySearch(){
  if (!navigator.clipboard) {
    console.log('NULL clipboard!');
    return;
  }
  try {
    await navigator.clipboard.writeText($('#pmpublickey').val());
    console.log('Public Key copied to clipboard: ', $('#pmpublickey').val());
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
// PASTE PRIVATE MESSAGE PUB KEY
async function pastePMPubKeySearch(){
  if (!navigator.clipboard) {
    console.log('NULL clipboard!');
    return;
  }
  try {
    const text = await navigator.clipboard.readText();
    $('#pmpublickey').val(text);
    typingPMPubKeySearch();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
async function typingPMPubKeySearch(){
  //console.log('typing...');
  let user = gun.user($('#pmpublickey').val());
  let name = await user.get('alias').then();
  if(name){
    //console.log('Found!');
    $('#pmPubKeystatus').text(`Found Alias: ${name}`);
  }else{
    //console.log('Not Found!');
    $('#pmPubKeystatus').text('Not Found!');
  }
}
async function addContactPMPubKeySearch(){
  let owner = gun.user();
  let pmuser = gun.user($('#pmpublickey').val());
  let name = await pmuser.get('alias').then();
  let pub = await pmuser.get('pub').then();
  if(name){
    //console.log(pmuser);
    //console.log(owner.is.pub);
    //console.log(pub);
    if(owner.is.pub == pub){
      console.log('SAME ALIAS');
    }else{
      console.log('PROCESS');
      owner.get('contact').get(pub).put({
        alias:name,
        pub:pub
      },(ack)=>{
        console.log("CONTACT ADD:", ack);
      });
    }
  }
}
async function removeContactPMPubKeySearch(){
  let owner = gun.user();
  let pmuser = gun.user($('#pmpublickey').val());
  let name = await pmuser.get('alias').then();
  let pub = await pmuser.get('pub').then();
  if(name){
    //console.log(pmuser);
    //console.log(owner.is.pub);
    //console.log(pub);
    if(owner.is.pub == pub){
      console.log('SAME ALIAS');
    }else{
      console.log('PROCESS');
      owner.get('contact').get(pub).put('null',(ack)=>{
        console.log("CONTACT REMOVE:", ack);
      });
    }
  }
}
// https://gun.eco/docs/API
//ev.off() //remove listener
// CHAT ROOM MESSAGES
var chat;
// CHAT ROOM CONTENT
class ChatRoom{
  constructor() {
    this.el =el("div",{id:'divChatRoom'},[
      el('label','Chat Room Messages'),
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
  intChat(){
    let clocktime = chatTimeStamp(false);
    //console.log(clocktime);
    //needs to be reinit to call events
    chat = gun.get('chat');
    chat
      // {'>': 'start', '<': 'end'}
      //.get({'.':{'<':clocktime}, '%': 50000}).map()
      .get({'.':{'>':clocktime}, '%': 50000}).map()
      .once(chatMessageHandler);
  }
  onmount() {
    //console.log("mounted ChatRoom");
    $('#chatmessages').empty();
    this.intChat();
  }
  onunmount() {
    //console.log("unmounted ChatRoom");
    //turn off chat
    //ev0.off() // nope
    if(chat){
      chat.off(); // node.on(listenerhandler)
    }
  }
  onremount() {
    console.log("ONREMOUNT ChatRoom !!!!!!!!");
    $('#chatmessages').empty();
    this.intChat();
  }
}
const divChatRoom = new ChatRoom();
function chatTypingInput(event){
  //console.log('typing...')
  if(event.keyCode == 13){
    //console.log($('#chatinput').val());
    processChatInput($('#chatinput').val())
  }
}
function btnChatMessage(){
  //console.log('click...')
  processChatInput($('#chatinput').val());
}
function processChatInput(msg){
  let clocktime = chatTimeStamp();
  let user = gun.user();
  //console.log(user.is.alias);
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
// https://stackoverflow.com/questions/10503606/scroll-to-bottom-of-div-on-page-load-jquery/10503695
function ProcessChatMessage(data){
  //console.log('incoming...');
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
      //console.log('PASS');
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
// DIALOG MESSAGE TEXT
function modalmessage(_text){
  $("#dialogmessage").text(_text);
  $("#divModel").show();
}
// SIMPLE OKAY FUNCTION
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
  unmount(divAccessPanel, divPrivateMessages);
  unmount(divAccessPanel, divChatRoom);
}
function btnNavMenuProfile(){
  hidediv();
  mount(divAccessPanel, divProfile);
}
function btnNavMenuChangePassphrase(){
  hidediv();
  mount(divAccessPanel, divChangePassphrase);
}
function btnNavMenuPassphraseHint(){
  hidediv();
  mount(divAccessPanel, divPassphraseHint);
}
function btnNavMenuPrivateMessage(){
  hidediv();
  mount(divAccessPanel, divPrivateMessages);
}
function btnNavMenuChatRoom(){
  hidediv();
  mount(divAccessPanel, divChatRoom);
}