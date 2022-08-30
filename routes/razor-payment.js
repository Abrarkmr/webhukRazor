const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

router.get('/', (req,res)=>{
    res.json("hello")
})

router.post('/paymentDetails', (req,res)=>{

    console.log(req.body)
    const secret = '<Your Secret Key>';
    const crypto = require('crypto');

    const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log("----> "+digest, req.headers['x-razorpay-signature'])

    if(digest === req.headers['x-razorpay-signature']){
        if(req.body.event === "payment.authorized"){
            console.log("Authorised")
            require('fs').writeFileSync('paymentAuth.json', JSON.stringify(req.body, null, 4))
            res.json({status: 'ok'})
        }
        if(req.body.event === "payment.paid"){
            console.log('payment paid');
            require('fs').writeFileSync('paymentPaid.json', JSON.stringify(req.body, null, 4))
            res.json({status: 'ok'})
        }
        if(req.body.event === "payment.captured"){
            console.log('payment capt');
            require('fs').writeFileSync('paymentCap.json', JSON.stringify(req.body, null, 4))
            res.json({status: 'ok'})
        }
        if(req.body.event === "payment.failed"){
            console.log('request has been failed');
            res.json({status: 'ok'})
        }
    }
    else{
        console.log('request is fake')
        res.json({status: 'ok'})
    }
    

    
})

module.exports = router;