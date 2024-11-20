
 
// salutations responses
const salutations = [
  'Hello to you too, {username}. How are you doing? https://64.media.tumblr.com/f392c89cbdce8acad50e4fa0790cbb49/tumblr_inline_pr3szbEuWA1vhssku_250.gif',
  '*Nods* {username}. It\'s good to see you too, pal. https://64.media.tumblr.com/9701af6ab4e2ba4b197145a0b0addf9e/tumblr_inline_p8ozuaF09F1swygin_250.gifv',
  'Morning {username}! You didn\'t see Thor? https://i.makeagif.com/media/1-12-2017/PsShE9.gif',
  'Hi {username}! You didn\'t see Tony? https://64.media.tumblr.com/8287de7011ad9e1015e23903af2e4324/dc65c6cb35aadec2-9a/s540x810/cb6e7144d352a70ddaf8dcfd4bc23550816123c8.gifv',
  'Hi {username}! You didn\'t see Clint? https://i.pinimg.com/originals/a3/4d/e1/a34de1361f265b72de7e9a1039d9454c.gif',
  'Hey {username}! You didn\'t see my peanut butter sandwich? https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHd0ZWxuajYxeW5senFnY3J4bm1idm15bWV2MHY4eG1sNTQ0amRqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VKFfxB2skRYZO/giphy.webp',
  'Hey, {username}! Hope you\'re doing just fine, dear. https://i.pinimg.com/originals/a3/4d/e1/a34de1361f265b72de7e9a1039d9454c.gif',
  'Hey {username}. https://64.media.tumblr.com/8287de7011ad9e1015e23903af2e4324/dc65c6cb35aadec2-9a/s540x810/cb6e7144d352a70ddaf8dcfd4bc23550816123c8.gifv'
];

function handleSalutations(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('bonjour') || userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('yo') || userMessage.includes('hey')) {
      let randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];
      randomSalutation = randomSalutation.replace('{username}', message.author.username);
      message.reply(randomSalutation);
    }
  }
  
  module.exports = { handleSalutations };