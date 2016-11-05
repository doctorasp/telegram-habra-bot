

var TelegramBot = require('node-telegram-bot-api');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio'); 
var flatten = require('array-flatten')
var $ = require("jquery");
var url_habra = 'https://api.vk.com/method/wall.get?owner_id=-20629724&count=50&filter=all&v=5.45&callback=?';

var token = '289136356:AAFXe1DWn4B8Y5BpBs70KKFqmv6PbT49zLk';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);


bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
 
    
    if (messageText === '/menu' || messageText==='Головне меню') {
        var opts = {
            //reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Habra'],
                    ['Dev info']
                ]
            })
        };
        bot.sendMessage(messageChatId, 'Голове меню', opts);
    }


    
    if (messageText === 'Habra') {
        bot.sendMessage(messageChatId, 'Habra', { caption: 'I\'m bot!' });
              
        request(url_habra, function (err, response, body) {
            if (err) throw err;
            
            var json = JSON.parse(body);
            
            json.response.items.forEach(function(item){
            
            if((item.text != 'undefined') && (item.text !== ''))
            {
                var now = new Date();
                if(convertVkDate(item.date).slice(0,10) == now.toDateString().slice(0,10) ){
                    bot.sendMessage(messageChatId, `----- ${convertVkDate(item.date)} -----\n`+item.text);        
                }
            }})
    });   
  }

    if (messageText === 'Dev info') {
         bot.sendMessage(messageChatId, 'deepbrain@gmail.com (Karachevstev Andrii)');
    }
    
});
        
function convertVkDate(data){
    return new Date(data*1000).toDateString();
}
        
function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
}