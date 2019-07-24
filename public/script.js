const socket = io()
const $form = document.querySelector('form')
const $messages_w = document.querySelector('.messages_w')
const $messageTemplate = document.querySelector('#message-template').innerHTML

$form.addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message)
})

socket.on('message', (message) => {
    console.log(message)

    const html = Mustache.render($messageTemplate, {
        message
    })

    $messages_w.insertAdjacentHTML('beforeend', html)
})

console.log(socket.Nname)