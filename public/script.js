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

socket.on('message', (msg) => {

    const html = Mustache.render($messageTemplate, {
        msg
    })

    $messages_w.insertAdjacentHTML('beforeend', html)

})

console.log(socket.Nname)