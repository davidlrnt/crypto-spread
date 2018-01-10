import urllib.request as req
import json

# 1 US Dollar equals 1069.50 South Korean Won
# import pdb; pdb.set_trace()

cryptotickers = [('btc', 'bitcoin'), ('xrp', 'ripple'), ('eth', 'ethereum'), ('bch','bitcoin-cash') ,('ltc', 'litecoin'),('dash', 'dash') ,('xmr', 'monero'),('eos', 'eos'),('qtum', 'qtum'),('btg', 'bitcoin-gold'),('etc', 'ethereum-classic'),('zec', 'zcash')]

for ticker in cryptotickers:
	data1 = json.loads(req.urlopen("https://api.bithumb.com/public/ticker/{}".format(ticker[0])).read())
	
	print(ticker)
	kprice = int(data1['data']['sell_price'])/1069

	data2 = json.loads(req.urlopen("https://api.coinmarketcap.com/v1/ticker/{}".format(ticker[1])).read())
	usprice = float(data2[0]['price_usd'])
	
	change_percent = ((kprice-usprice)/usprice)*100

	print(change_percent, "%") 	

