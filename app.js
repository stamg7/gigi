const express = require('express')
const app = express()

console.log('stam')

app.listen(process.env.PORT || 3000, () => {
    console.log('all ok')
})