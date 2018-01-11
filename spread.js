// import urllib.request as req
// import json

// # 1 US Dollar equals 1069.50 South Korean Won
// # import pdb; pdb.set_trace()

// cryptotickers = [('btc', 'bitcoin'), ('xrp', 'ripple'), ('eth', 'ethereum'), ('bch','bitcoin-cash') ,('ltc', 'litecoin'),('dash', 'dash') ,('xmr', 'monero'),('eos', 'eos'),('qtum', 'qtum'),('btg', 'bitcoin-gold'),('etc', 'ethereum-classic'),('zec', 'zcash')]

// for ticker in cryptotickers:
// 	data1 = json.loads(req.urlopen("https://api.bithumb.com/public/ticker/{}".format(ticker[0])).read())
	
// 	print(ticker)
// 	kprice = int(data1['data']['sell_price'])/1069

// 	data2 = json.loads(req.urlopen("https://api.coinmarketcap.com/v1/ticker/{}".format(ticker[1])).read())
// 	usprice = float(data2[0]['price_usd'])
	
// 	change_percent = ((kprice-usprice)/usprice)*100

// 	print(change_percent, "%") 	
var request = require('request');
const https = require('https')

cryptotickers = [['btc', 'bitcoin'], ['xrp', 'ripple'], ['eth', 'ethereum'], ['bch','bitcoin-cash'] ,['ltc', 'litecoin'],['dash', 'dash'] ,['xmr', 'monero'],['eos', 'eos'],['qtum', 'qtum'],['btg', 'bitcoin-gold'],['etc', 'ethereum-classic'],['zec', 'zcash']]

let allReq = []


for (var i = 0; i < cryptotickers.length; i++) {
	let ticker = cryptotickers[i]
	allReq.push(getPrices(ticker))
}

// console.log(allReq);

Promise.all(allReq).then(function(values) {

  console.log(values);
});

function getPrices(ticker) {
	return new Promise(function(resolve, reject) {
		let response = []
		console.log(ticker);
		response[0] = new Promise(function(res,rej){
				request(`https://api.coinmarketcap.com/v1/ticker/${ticker[1]}`, function (error, response, body) {
					res(JSON.parse(body)[0]['price_usd'])
				});
			})
		response[1] = new Promise(function(res,rej){
				request(`https://api.bithumb.com/public/ticker/${ticker[0]}`, function (error, response, body) {
					res(JSON.parse(body)['data']['sell_price']/1069)
				});
			})
  		Promise.all(response).then(function(values) {
		  let percent = ((values[1]-values[0])/values[0])*100
		  resolve(percent)
		});
	});
}



