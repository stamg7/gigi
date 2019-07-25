const socket = io()
const $form = document.querySelector('form')
const $messages_w = document.querySelector('.messages_w')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $message_wrapper = document.querySelector('.message_wrapper')
const $messageTemplateForColor = document.querySelector('#message-template').firstChild
const $msg_area = document.getElementById('msg_area')

const messageColor = document.cookie.split('=')[1]

$form.addEventListener('submit', (e) => {
    e.preventDefault()

    let message = e.target.elements.message.value

    socket.emit('sendMessage', {message , messageColor})

    $msg_area.value = '';
})

socket.on('initialization', (arr) => {
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
    $messages_w.scrollTop = $messages_w.scrollHeight
})

socket.on('message', (msg) => {

    const html = Mustache.render($messageTemplate, {
        msg
    })

    $messages_w.insertAdjacentHTML('beforeend', html)
    autoscroll()

})

const autoscroll = () => {

    const $newMessage = $messages_w.lastElementChild
    console.log($messages_w.scrollHeight)
    console.log($newMessage.offsetHeight)
    console.log($messages_w.scrollTop)
    console.log($messages_w.offsetHeight)
    $a = parseInt(getComputedStyle($newMessage).marginBottom)
    console.log($a)

    if($messages_w.scrollHeight - $newMessage.offsetHeight - 5 <= $messages_w.scrollTop + $messages_w.offsetHeight){
        $messages_w.scrollTop = $messages_w.scrollHeight
    }

}
