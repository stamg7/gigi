const socket = io()
const $form = document.querySelector('form')
const $messages_w = document.querySelector('.messages_w')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $message_wrapper = document.querySelector('.message_wrapper')
const $messageTemplateForColor = document.querySelector('#message-template').firstChild

const messageColor = document.cookie.split('=')[1]

$form.addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', {message , messageColor})
})

socket.on('initialization', (arr) => {
    console.log($messages_w.hasChildNodes())
    if(!$messages_w.hasChildNodes()){
        let msg = {}
        for(let el of arr){
            msg.message = el.content
            msg.messageColor = el.user
            const html = Mustache.render($messageTemplate, {
                msg
            })
        
            $messages_w.insertAdjacentHTML('beforeend', html)
        }
    
    }
})

socket.on('message', (msg) => {

    const html = Mustache.render($messageTemplate, {
        msg
    })

    $messages_w.insertAdjacentHTML('beforeend', html)

    console.log($messages_w.hasChildNodes())

})
