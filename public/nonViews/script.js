const socket = io()
const $form = document.querySelector('form')
const $messages_w = document.querySelector('.messages_w')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML
const $message_wrapper = document.querySelector('.message_wrapper')
const $messageTemplateForColor = document.querySelector('#message-template').firstChild
const $msg_area = document.getElementById('msg_area')
const $img = document.querySelector('.foto_w')

const messageColor = document.cookie.split('=')[1]

$msg_area.addEventListener('focus', () => {
    setTimeout(() => {$messages_w.scrollTop = $messages_w.scrollHeight * 4}, 500)
})

$img.addEventListener('dblclick', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const message = "<a href='https://google.com/maps?q="+ position.coords.latitude + "," + position.coords.longitude + "' target='_blank'>Εδώ είμαι</a>"
        socket.emit('sendMessage', {message, messageColor})
    })
})

$form.addEventListener('submit', (e) => {
    e.preventDefault()

    let message = e.target.elements.message.value

    socket.emit('sendMessage', {message , messageColor})

    $msg_area.value = '';
    $msg_area.focus()
})

socket.on('initialization', (arr) => {
    if(!$messages_w.hasChildNodes()){
        let msg = {}
        for(let el of arr){
            msg.message = el.content
            msg.messageColor = el.user
            msg.date = objToDate(el._id.toString())
            msg.date = moment(msg.date).format('HH:mm,DD/MM/YY');
            const html = Mustache.render($messageTemplate, {
                msg
            })
        
            $messages_w.insertAdjacentHTML('beforeend', html)
        }
    
    }
    $messages_w.scrollTop = $messages_w.scrollHeight
})

const objToDate = (objId) =>{
    return new Date(parseInt(objId.substring(0,8), 16) * 1000)
}

socket.on('message', (msg) => {

    msg.date = moment(msg.date).format('HH:mm, DD-MM-YY')
    const html = Mustache.render($messageTemplate, {
        msg
    })

    $messages_w.insertAdjacentHTML('beforeend', html)
    autoscroll()

})

const autoscroll = () => {

    const $newMessage = $messages_w.lastElementChild
    $a = parseInt(getComputedStyle($newMessage).marginBottom)
    if($messages_w.scrollHeight - $newMessage.offsetHeight - 5 <= $messages_w.scrollTop + $messages_w.offsetHeight){
        $messages_w.scrollTop = $messages_w.scrollHeight
    }

}
