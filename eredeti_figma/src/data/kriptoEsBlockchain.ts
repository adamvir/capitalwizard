import { BookViewTerm } from '../components/StandaloneBookView';

export const kriptoEsBlockchainData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Blockchain?',
    definition: 'Decentralizált, megváltoztathatatlan adatbázis. Blokkok lánca, minden blokk tranzakciókat tartalmaz. Nincs központi szerver! Peer-to-peer.',
    category: 'Blockchain Alapok'
  },
  {
    id: '2',
    term: 'Decentralizáció',
    definition: 'Nincs egyetlen kontrolláló entitás. Hálózat = sok node. Censorship resistant. Senki nem tud lekapcsolni.',
    category: 'Blockchain Alapok'
  },
  {
    id: '3',
    term: 'Bitcoin - Az Első',
    definition: 'Satoshi Nakamoto 2009. Digital gold. Limited supply: 21 million. Proof of Work. Store of value narrative.',
    category: 'Kriptovaluták'
  },
  {
    id: '4',
    term: 'Bitcoin Halving',
    definition: '~4 évente mining reward feleződik. Következő: 2024. Történelmileg bullish esemény halvingután 12-18 hónappal.',
    category: 'Kriptovaluták'
  },
  {
    id: '5',
    term: 'Bitcoin Stock-to-Flow',
    definition: 'S2F modell: scarcity méréssel ár jóslás. Kontroverziális, de sok követő. Halving miatt S2F emelkedik.',
    category: 'Kriptovaluták'
  },
  {
    id: '6',
    term: 'Ethereum - Smart Contract Platform',
    definition: 'Vitalik Buterin. Nem csak currency! Decentralized apps (dApps). DeFi, NFT alapja. Turing-complete.',
    category: 'Kriptovaluták'
  },
  {
    id: '7',
    term: 'Ethereum 2.0 / Proof of Stake',
    definition: '2022 Merge: PoW → PoS. 99% energia csökkentés. Staking rewards. Deflationary ETH (token burning).',
    category: 'Kriptovaluták'
  },
  {
    id: '8',
    term: 'Altcoins',
    definition: 'Alternative coins, nem Bitcoin. Ethereum, Solana, Cardano, XRP, stb. Higher risk, higher reward potential.',
    category: 'Kriptovaluták'
  },
  {
    id: '9',
    term: 'Stablecoins',
    definition: 'USD-peg cryptocurrency. USDT, USDC, DAI. Trading párnak, DeFi-ben, volatilitás elkerülésére.',
    category: 'Kriptovaluták'
  },
  {
    id: '10',
    term: 'Proof of Work (PoW)',
    definition: 'Mining = computational puzzle megoldás. Bitcoin, Litecoin. Energia intenzív, de secure. 51% attack nehéz.',
    category: 'Konszenzus Mechanizmusok'
  },
  {
    id: '11',
    term: 'Proof of Stake (PoS)',
    definition: 'Validator stake-el coins-okat. Kevesebb energia. Ethereum, Cardano, Polkadot. Rewards staking-ból.',
    category: 'Konszenzus Mechanizmusok'
  },
  {
    id: '12',
    term: 'Mining',
    definition: 'New Bitcoin "termelés" computational work-kel. GPUs, ASICs. Halving miatt reward csökken. Electricity cost kritikus.',
    category: 'Mining'
  },
  {
    id: '13',
    term: 'Mining Pool',
    definition: 'Minerek összefognak, rewards osztanak. Egyedül nagyon kicsi esély blokkot találni. Pool = stabil income.',
    category: 'Mining'
  },
  {
    id: '14',
    term: 'Hash Rate',
    definition: 'Network computational power. Magasabb hash rate = biztonságosabb hálózat. Bitcoin hash rate ATH-k bullish signal.',
    category: 'Mining'
  },
  {
    id: '15',
    term: 'Crypto Wallet',
    definition: 'Tároló private keys-hez. Hot wallet (online, exchange), cold wallet (offline, hardware). Security level különböző.',
    category: 'Tárolás'
  },
  {
    id: '16',
    term: 'Private Key',
    definition: 'Titkos kód, birtoklást igazolja. "Not your keys, not your coins!" Elveszted → coins elvesztek örökre. Nincs customer support!',
    category: 'Tárolás'
  },
  {
    id: '17',
    term: 'Seed Phrase',
    definition: '12-24 szó, wallet recovery-hez. ÍRD LE, tárold biztonságosan (nem digitálisan)! Elveszted = nincs visszaút.',
    category: 'Tárolás'
  },
  {
    id: '18',
    term: 'Hardware Wallet',
    definition: 'Ledger, Trezor. Offline tárolás. Hackelés lehetetlen (amíg te nem rontod el). Nagyobb összeghez must!',
    category: 'Tárolás'
  },
  {
    id: '19',
    term: 'Exchange Wallet',
    definition: 'Coinbase, Binance. Kényelmes, de custodial (ők tárolják). FTX összeomlás = emberek elvesztek pénzt. Csak trade-eléshez!',
    category: 'Tárolás'
  },
  {
    id: '20',
    term: 'DeFi - Decentralized Finance',
    definition: 'Pénzügyi szolgáltatások bankok nélkül. Lending, borrowing, swapping decentralizáltan. Smart contracts.',
    category: 'DeFi'
  },
  {
    id: '21',
    term: 'DEX - Decentralized Exchange',
    definition: 'Uniswap, PancakeSwap. P2P kereskedés. Nincs KYC. Liquidity pools. Higher fees, de censorship resistant.',
    category: 'DeFi'
  },
  {
    id: '22',
    term: 'Liquidity Pool',
    definition: 'Token párok locked smart contract-ban. Traders swap-elnek pool ellen. Liquidity providers (LP) kapnak fees-t.',
    category: 'DeFi'
  },
  {
    id: '23',
    term: 'Yield Farming',
    definition: 'LP token-ekből rewards. Magas APY-k (100%+). De! Impermanent loss risk, smart contract risk, rug pulls.',
    category: 'DeFi'
  },
  {
    id: '24',
    term: 'Impermanent Loss',
    definition: 'LP-ként veszteség árváltozásból. Ha token 2x, jobb volt hold-olni. Complicated math, de real risk!',
    category: 'DeFi'
  },
  {
    id: '25',
    term: 'Staking',
    definition: 'Lock-olod coins-okat hálózat biztonságáért, kapsz rewards-ot. Ethereum, Cardano, Solana. APR 4-20%.',
    category: 'DeFi'
  },
  {
    id: '26',
    term: 'Lending Protocols',
    definition: 'Aave, Compound. Kölcsönadod crypto-t, kapsz kamatot. Vagy kölcsönveszel collateral ellen. Decentralized.',
    category: 'DeFi'
  },
  {
    id: '27',
    term: 'NFT - Non-Fungible Token',
    definition: 'Egyedi token, nem cserélhető. Digital art, collectibles, gaming items. Hype 2021-2022, most csendesebb.',
    category: 'NFT'
  },
  {
    id: '28',
    term: 'NFT Marketplace',
    definition: 'OpenSea, Blur. Buy/sell NFT-k. Royalties creators-nek. Liquidity problem: nehéz eladni floor price alatt.',
    category: 'NFT'
  },
  {
    id: '29',
    term: 'NFT Utility',
    definition: 'Nem csak art! Access to communities, events, gaming assets, metaverse land. Jövő? Use case fejlődés.',
    category: 'NFT'
  },
  {
    id: '30',
    term: 'Smart Contract',
    definition: 'Self-executing code blockchain-en. "If this, then that." Trustless transactions. Ethereum standard.',
    category: 'Technológia'
  },
  {
    id: '31',
    term: 'Smart Contract Risk',
    definition: 'Code bugs → exploits. Millions stolen DAO hack, Poly Network, stb. Audit-ed contracts biztonságosabbak.',
    category: 'Technológia'
  },
  {
    id: '32',
    term: 'Gas Fees',
    definition: 'Transaction costs Ethereum-on. Változó: $1-$100+. High demand = high gas. Layer 2 solutions csökkentik.',
    category: 'Technológia'
  },
  {
    id: '33',
    term: 'Layer 2 Solutions',
    definition: 'Polygon, Arbitrum, Optimism. Off-chain transactions, on-chain settlement. Gyorsabb, olcsóbb. Ethereum scaling.',
    category: 'Technológia'
  },
  {
    id: '34',
    term: 'ERC-20 Tokens',
    definition: 'Ethereum token standard. Fungible tokens. Legtöbb altcoin ERC-20. Uniswap, Aave, stb.',
    category: 'Technológia'
  },
  {
    id: '35',
    term: 'ERC-721 (NFT Standard)',
    definition: 'Non-fungible token standard. Minden token egyedi. CryptoKitties volt első.',
    category: 'Technológia'
  },
  {
    id: '36',
    term: 'Crypto Bull Market',
    definition: 'Általában follows Bitcoin halving. 2017, 2021 volt bull cycles. Altcoins emelkednek többet. FOMO, mania phase.',
    category: 'Piaci Ciklusok'
  },
  {
    id: '37',
    term: 'Crypto Winter',
    definition: 'Bear market. -80% csökkenések normálisak! 2018, 2022. Accumulation time. "Buy when blood in streets."',
    category: 'Piaci Ciklusok'
  },
  {
    id: '38',
    term: 'Bitcoin Dominance',
    definition: 'BTC market cap / total crypto market cap. Magas dominance = altcoins gyengék. Csökkenő = altseason.',
    category: 'Piaci Ciklusok'
  },
  {
    id: '39',
    term: 'Altseason',
    definition: 'Altcoins outperform Bitcoin masszívan. Bull market végén általában. 10-50x returns lehetségesek, de extrém risky!',
    category: 'Piaci Ciklusok'
  },
  {
    id: '40',
    term: 'Crypto Fear & Greed Index',
    definition: '0-100 skála. <25 = extreme fear (buy signal). >75 = extreme greed (sell signal). Contrarian indicator.',
    category: 'Sentiment'
  },
  {
    id: '41',
    term: 'On-Chain Analysis',
    definition: 'Blockchain data elemzése. Whale movements, exchange flows, hodler behavior. Glassnode, CryptoQuant.',
    category: 'Analízis'
  },
  {
    id: '42',
    term: 'Exchange Inflow/Outflow',
    definition: 'Coins exchange-re = eladási szándék (bearish). Coins off exchange = hold szándék (bullish).',
    category: 'Analízis'
  },
  {
    id: '43',
    term: 'Whale Watching',
    definition: 'Large holders (1000+ BTC). Movements piaci hatással. Whale alert Twitter bot. De: lehet OTC deals, nem mindig sell signal.',
    category: 'Analízis'
  },
  {
    id: '44',
    term: 'HODL Stratégia',
    definition: 'Hold On for Dear Life. Buy and hold long-term. Ignore volatility. Történelmileg működött Bitcoin-nal.',
    category: 'Stratégiák'
  },
  {
    id: '45',
    term: 'DCA - Dollar Cost Averaging',
    definition: 'Fix összeg rendszeresen (heti/havi). Timing nem számít. Volatilitást átlag-olod. Érzelmileg könnyebb.',
    category: 'Stratégiák'
  },
  {
    id: '46',
    term: 'Taking Profits',
    definition: 'Crypto-ban MINDIG vegyél profitot! Nem realizált = lehet eltűnik. Bull market-ben ladder out: 25%, 50%, 75%.',
    category: 'Stratégiák'
  },
  {
    id: '47',
    term: 'Portfolio Allocation',
    definition: 'Crypto max 5-10% total portfólió-ból kezdőknek. Kockázatos asset class! BTC 50-70%, ETH 20-30%, altok 10-20%.',
    category: 'Stratégiák'
  },
  {
    id: '48',
    term: 'Rug Pull',
    definition: 'Developers elhagyják projektet, elveszik funds-okat. Főleg DeFi-ben. Red flags: anonymous team, no audit, unrealistic promises.',
    category: 'Scams és Kockázatok'
  },
  {
    id: '49',
    term: 'Pump and Dump',
    definition: 'Koordinált vásárlás (pump), aztán eladás (dump). Retail bag holders. Telegram groups, Twitter pumpers. KERÜLD!',
    category: 'Scams és Kockázatok'
  },
  {
    id: '50',
    term: 'Phishing Attacks',
    definition: 'Fake websites, emails, metamask popups. Akarod signature-öt → wallet drained. ALWAYS check URLs! Hardware wallet véd.',
    category: 'Scams és Kockázatok'
  },
  {
    id: '51',
    term: 'Exchange Risk',
    definition: 'FTX, Mt.Gox, stb. összeomlások. "Not your keys, not your coins." Csak trade-eléshez tarts exchange-en!',
    category: 'Scams és Kockázatok'
  },
  {
    id: '52',
    term: 'Regulatory Risk',
    definition: 'Governments változó szabályozás. China ban, SEC lawsuits. Regulatory news mozgatja piacot. Follow developments!',
    category: 'Scams és Kockázatok'
  },
  {
    id: '53',
    term: 'Taxation',
    definition: 'Crypto gains = taxable (legtöbb országban)! Every trade taxable event (US). Trackelj mindent! CoinTracker, Koinly.',
    category: 'Szabályozás'
  },
  {
    id: '54',
    term: 'KYC - Know Your Customer',
    definition: 'Exchange-eken identity verification. Privacy trade-off. DEX-ek nem kérnek KYC, de ott más riskok.',
    category: 'Szabályozás'
  },
  {
    id: '55',
    term: 'Bitcoin ETFs',
    definition: '2024: SEC approval spot Bitcoin ETF-ekre (GBTC, IBIT, etc). Hagyományos befektetők könnyebb hozzáférés. Bullish long-term.',
    category: 'Szabályozás'
  },
  {
    id: '56',
    term: 'Institutional Adoption',
    definition: 'Tesla, MicroStrategy, hedge funds Bitcoin holding. El Salvador legal tender. Legitimáció növekedik.',
    category: 'Adoption'
  },
  {
    id: '57',
    term: 'Bitcoin Maximalista',
    definition: 'Csak Bitcoin, altcoins scam. "Sound money" narratíva. Konzervatív, de Bitcoin survived longest.',
    category: 'Filozófiák'
  },
  {
    id: '58',
    term: 'Web3 Vision',
    definition: 'Decentralized internet. User ownership, no Big Tech. Blockchain-based. Controversial, de érdekes kísérlet.',
    category: 'Filozófiák'
  },
  {
    id: '59',
    term: 'Metaverse és Crypto',
    definition: 'Virtual worlds (Decentraland, Sandbox). NFT-based land, items. Hype 2021-2022, most bear. Long-term potential?',
    category: 'Trendek'
  },
  {
    id: '60',
    term: 'AI és Crypto Intersection',
    definition: 'AI-generated NFTs, AI trading bots, decentralized AI compute. Emerging space. Figyeld!',
    category: 'Trendek'
  },
  {
    id: '61',
    term: 'Crypto Trading Hours',
    definition: '24/7/365! Nem úgy mint stocks. Hétvégék volatilisak. Alíg miközben alacsony liquidity → extrém moves.',
    category: 'Trading'
  },
  {
    id: '62',
    term: 'Crypto Volatility',
    definition: '10-20% daily swings normálisak! 2-5x volatility vs stocks. Position sizing kritikus. Leverage gyilkos lehet.',
    category: 'Trading'
  },
  {
    id: '63',
    term: 'Leverage Trading Crypto',
    definition: '10x-100x leverage elérhető (Binance, Bybit). Likvidálások instant-ok. 90%+ emberek veszítenek. Kezdőknek: NE!',
    category: 'Trading'
  },
  {
    id: '64',
    term: 'Funding Rates',
    definition: 'Perpetual futures-ben longs fizetnek shorts-nak (vagy fordítva). High positive rate = túl sok long = reversal warning.',
    category: 'Trading'
  },
  {
    id: '65',
    term: 'Crypto Taxes Stratégia',
    definition: 'Tax-loss harvesting: realizálj veszteségeket offset-elni gains-eket. Long-term hold (1+ év) kedvezőbb adó (US).',
    category: 'Adózás'
  },
  {
    id: '66',
    term: 'Pszichológia: FOMO',
    definition: 'Crypto-ban EXTRÉM! Coin 10x → beugrok csúcson. Gyakorold türelmet. Mindig lesz következő lehetőség.',
    category: 'Pszichológia'
  },
  {
    id: '67',
    term: 'Pszichológia: HODL Pain',
    definition: '-80% drawdown-ok elviselése. Lehet sell bottom. Csak befektess amennyit elbírsz veszíteni!',
    category: 'Pszichológia'
  },
  {
    id: '68',
    term: 'Community Research',
    definition: 'Twitter Crypto, Discord servers, Reddit. Információk gyorsan terjednek. De DYOR (Do Your Own Research)!',
    category: 'Források'
  },
  {
    id: '69',
    term: 'Crypto Influencers',
    definition: 'Sokan pump własni bags-et. Vegyél kritikával! Ellenőrizd multi-source. Senki nem ismeri a jövőt.',
    category: 'Források'
  },
  {
    id: '70',
    term: 'Whitepapers',
    definition: 'Projekt technikai dokumentáció. Bitcoin whitepaper = 9 oldal, egyszerű. Altcoins: olvasd el, érted?',
    category: 'Kutatás'
  },
  {
    id: '71',
    term: 'Tokenomics',
    definition: 'Token supply, distribution, inflation rate, burning mechanism. Fundamentális elemzés crypto-ban!',
    category: 'Kutatás'
  },
  {
    id: '72',
    term: 'Team és Backing',
    definition: 'Kik a developers? Van VC backing? Anonymous team = red flag. Vitalik support = gyakran bullish.',
    category: 'Kutatás'
  },
  {
    id: '73',
    term: 'Use Case Validation',
    definition: 'Projekt megold valós problémát? Vagy csak hype? Real adoption vagy csak speculation? Critical thinking!',
    category: 'Kutatás'
  },
  {
    id: '74',
    term: 'Crypto Winter Survival',
    definition: 'DCA quality projects (BTC, ETH). Ne panic sell. Build position. Learn, develop skills. Bull market rewards patience.',
    category: 'Stratégiák'
  },
  {
    id: '75',
    term: 'Összefoglalás: Crypto Befektetés',
    definition: 'High risk, high reward asset class! Volatilitás extrém. Csak befektess amit elbírsz veszíteni. BTC + ETH core. Altcoins kis %. Hardware wallet nagyobb összeghez. HODL + DCA történelmileg működött. Vegyél profitot bull market-ben! Tax compliance! DYOR, ne influencers. Türelem és fegyelem crypto-ban még fontosabb, mint stocks-ban. Jövő? Senki nem tudja, de blockchain itt marad.',
    category: 'Összefoglalás'
  }
];
