const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000 // 3000 for running locally
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'abdelrahman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'abdelrahman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        name:"abdelrahman"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)//address is query string ?address=val
    {
        return res.send({
            error:"you must prvide an address"
        })
    }
   else
   {
    geocode(req.query.address,(error , {latitude,longitude,location} = {})=>{
        if(error)
        return res.send({error})//short hand
        else{
          forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            return res.send({error})//short hand
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
             })
          })
          
        }
    
        
        
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: req.query.address
    // })
   }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.' + port)
})