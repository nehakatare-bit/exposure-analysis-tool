'use strict';

// ── MCC Lookup Table: { code: [description, industryDeliveryDays] } ───────────
const MCC_DATA = {
  // Airlines & Travel
  '3000':['United Airlines',365],'3001':['American Airlines',365],'3002':['Pan American',365],
  '3003':['Europa and Canada',365],'3004':['Air France',365],'3005':['British Airways',365],
  '3006':['Japan Airlines',365],'3007':['Air Portugal',365],'3008':['Scandinavian Airlines',365],
  '3009':['Swiss Air',365],'3010':['Iberia Airlines',365],'3011':['KLM Royal Dutch Airlines',365],
  '3012':['Lufthansa',365],'3013':['Air Canada',365],'3014':['Saudi Arabian Airlines',365],
  '3015':['Alitalia',365],'3016':['Singapore Airlines',365],'3017':['Aeromexico',365],
  '3018':['VARIG Airlines',365],'3020':['Air-India',365],'3021':['Air Algerie',365],
  '3022':['Philippine Airlines',365],'3023':['Mexicana',365],'3024':['Pakistan International',365],
  '3025':['Air New Zealand',365],'3026':['Emirates',365],'3027':['Etihad Airways',365],
  '3028':['Qatar Airways',365],'3029':['Turkish Airlines',365],'3030':['Aer Lingus',365],
  '3031':['Olympic Airways',365],'3032':['El Al Israel Airlines',365],'3033':['Ansett Airlines',365],
  '3034':['Austrilian Airlines',365],'3035':['TAP (Air Portugal)',365],'3036':['VASP Airlines',365],
  '3037':['EgyptAir',365],'3038':['Kuwait Airways',365],'3039':['Avianca',365],
  '3040':['Gulf Air',365],'3041':['Alia - The Royal Jordanian',365],'3042':['Malaysian Airline System',365],
  '3043':['Lan Chile',365],'3044':['Laker Airways',365],'3045':['Nigerian Airways',365],
  '3046':['Garuda Indonesia',365],'3047':['Braathens S.A.F.E.',365],'3048':['Royal Air Maroc',365],
  '3049':['Tunis Air',365],'3050':['Icelandair',365],'3051':['Austrian Airlines',365],
  '3052':['Lanchile',365],'3053':['Aviaco',365],'3054':['Ladeco',365],
  '3055':['LAB (Lloyd Aereo Boliviano)',365],'3056':['Polynesian Airlines',365],
  '3057':['South African Airways',365],'3058':['Air Lanka',365],'3059':['Nigerian Airways',365],
  '3060':['Air Pacific',365],'3061':['Air Zimbabwe',365],'3062':['Sunworld International',365],
  '3063':['Air Jamaica',365],'3064':['Biman Bangladesh',365],'3065':['Royal Nepal Airlines',365],
  '3066':['AirBaltic',365],'3067':['Biman Bangladesh Airlines',365],'3068':['Air Lesotho',365],
  '3069':['Air Gabon',365],'3070':['Gambia Airways',365],'3071':['BWIA',365],
  '3072':['Qatar Airways',365],'3075':['Singapore Airlines',365],'3076':['Aerolinas Argentinas',365],
  '3077':['All Nippon Airways',365],'3078':['BWIA International',365],'3079':['American West Airlines',365],
  '3082':['Midway Airlines',365],'3083':['Flying Tiger',365],'3084':['Southwest Airlines',365],
  '3085':['British Midland',365],'3086':['Midwest Express',365],'3087':['Metro Airlines',365],
  '3088':['Croatia Airlines',365],'3089':['Alaska Airlines',365],'3090':['United Express/Shuttle',365],
  '3094':['Bahamasair',365],'3096':['Frontier Airlines',365],'3097':['Thai Airways International',365],
  '3098':['Hawaiian Airlines',365],'3099':['Sunaire Express',365],
  '3100':['Budget Rent-a-Car',0],'3101':['National Car Rental',0],'3102':['Avis',0],
  '3103':['Hertz',0],'3104':['Dollar Rent A Car',0],'3105':['Thrifty Car Rental',0],
  '3106':['Tilden',0],'3107':['General Rent-A-Car',0],'3109':['Tropical Rent-a-Car',0],
  '3110':['Sixt AG',0],'3111':['Excellence Rent-A-Car',0],'3112':['Europcar',0],
  '3113':['Holiday Autos',0],'3114':['Brooks Rent-A-Car',0],'3115':['Practical Used Car',0],
  '3116':['Kenning',0],'3117':['Nippon Rent-A-Car',0],'3118':['National Car Rental / Europcar',0],
  '3119':['Kenning Motor Group',0],'3125':['Ansa International',0],
  '3351':['Budget Rent a Car',0],'3352':['Hertz',0],'3353':['Avis',0],
  '3354':['Avcar',0],'3355':['Dollar',0],'3356':['General',0],
  '3357':['National',0],'3358':['Thrifty',0],'3359':['Payless',0],
  '3360':['Snappy',0],'3361':['Airways',0],'3362':['Auto-Host',0],
  '3364':['Carey',0],'3366':['Deltacom',0],'3368':['Franchise Finance Corp of America',0],
  '3369':['Ugly Duckling',0],'3370':['U-Save',0],'3374':['Ams Car Rental',0],
  '3375':['Greenwheels',0],'3376':['ACE Rent A Car',0],'3377':['Rent-a-Wreck',0],
  '3380':['Triangle Rent-A-Car',0],'3381':['Europ Car',0],'3385':['Tropical',0],
  '3386':['Showcase',0],'3387':['Alamo Rent A Car',0],'3388':['Merchants Rent-A-Car',0],
  '3389':['Sandrews',0],'3390':['Eurocar',0],'3391':['Auto Europe',0],
  '3393':['National Interrent',0],'3394':['Interamerican',0],'3395':['Tempco',0],
  '3396':['Snappy',0],'3397':['Advantage',0],'3398':['Connex',0],
  '3399':['Agency Rent-A-Car',0],
  // Lodging/Hotels
  '3501':['Holiday Inns',30],'3502':['Best Western',30],'3503':['Sheraton',30],
  '3504':['Hilton',30],'3505':['Forte',30],'3506':['Golden Tulip',30],
  '3507':['Friendship Inns',30],'3508':['Quality Inns',30],'3509':['Marriott',30],
  '3510':['Days Inn',30],'3511':['Arabella',30],'3512':['Inter-Continental',30],
  '3513':['Westin',30],'3514':['Amerisuites',30],'3515':['Rodeway Inns',30],
  '3516':['La Quinta Motor Inns',30],'3517':['Americana Hotels',30],'3518':['Sol Hotels',30],
  '3519':['Pullman International',30],'3520':['Meridien Hotels',30],'3521':['Canadian Pacific Hotels',30],
  '3522':['Fiesta Americana',30],'3523':['Ohana',30],'3524':['Loews Hotels',30],
  '3525':['Camino Real',30],'3526':['Barbizon Hotels',30],'3527':['Parkroyal',30],
  '3528':['Jolly Hotels',30],'3529':['Baxter Hotels',30],'3530':['Husa Hotels',30],
  '3535':['Hyatt',30],'3536':['Accor',30],'3537':['Four Seasons',30],
  '3538':['Howard Johnson',30],'3539':['Motel 6',30],'3540':['Super 8 Motels',30],
  '3541':['Sofitel',30],'3542':['Novotel',30],'3543':['Ibis Hotels',30],
  '3544':['Etap Hotels',30],'3545':['Formule 1',30],'3546':['Extended Stay America',30],
  '3547':['Sandman Hotels',30],'3548':['Ritz Carlton',30],'3549':['InterContinental Hotels',30],
  '3550':['Forum Hotels',30],'3551':['Princes Hotels',30],'3552':['Southern Sun Hotels',30],
  '3553':['Kempinski Hotels',30],'3554':['Saddlebrook Resorts',30],'3555':['Forte Hotels',30],
  '3556':['Maritime Hotel',30],'3557':['Starwood Hotels',30],'3558':['Wyndham Hotels',30],
  '3559':['Conrad Hotels',30],'3560':['Delta Hotels',30],'3561':['Dorint Hotels',30],
  '3562':['Ramada Inn',30],'3563':['Renaissance',30],'3564':['Omni Hotels',30],
  '3565':['Outrigger Hotels',30],'3566':['Oberoi Hotels',30],'3567':['Ariadne',30],
  '3568':['Palace Hotel',30],'3569':['Aga Khan Hotels',30],'3570':['Swissotel',30],
  '3571':['Nikko Hotels',30],'3572':['Melia Hotels',30],'3573':['Palace Station',30],
  '3574':['Holiday Inn Garden Court',30],'3575':['Doubletree',30],'3576':['Compri Hotels',30],
  '3577':['Radisson Hotels',30],'3578':['Regent International Hotels',30],'3579':['Orient Express',30],
  '3580':['Gaylord Hotels',30],'3581':['Hiltels',30],'3582':['Colony Hotels & Resorts',30],
  '3583':['Sands Hotel Corporation',30],'3584':['Shilo Inn Hotels',30],'3585':['Cartwright Hotels',30],
  '3586':['Woodfin Suite Hotels',30],'3587':['Intercity Hotels',30],'3588':['Amfac Hotels',30],
  '3589':['Biltmore Hotel',30],'3590':['Doubletree Hotel',30],'3591':['Princess Hotels',30],
  '3592':['Stouffer Hotels',30],'3593':['Concorde Hotels',30],'3594':['Summerfield Hotel',30],
  '3595':['Travelodge (UK)',30],'3596':['Swissotel Hotels',30],'3597':['Mandarin Oriental',30],
  '3598':['Aga Khan',30],'3599':['Wyndham International',30],
  // Agriculture
  '0742':['Veterinary Services',0],'0763':['Agricultural Cooperative',7],'0780':['Landscaping',14],
  // Airlines (direct)
  '4111':['Local and Suburban Commuter Passenger Transportation',0],
  '4112':['Passenger Railways',0],'4119':['Ambulance Services',0],
  '4121':['Taxicabs and Limousines',0],'4131':['Bus Lines',0],
  '4214':['Motor Freight Carriers',7],'4215':['Courier Services',3],
  '4225':['Public Warehousing and Storage',30],'4411':['Cruise Lines',120],
  '4457':['Boat Rentals and Leases',60],'4468':['Marinas',60],
  '4511':['Airlines and Air Carriers',60],'4582':['Airports',60],
  '4722':['Travel Agencies and Tour Operators',68],'4723':['Package Tour Operators',68],
  '4761':['Telegraph Services',0],'4784':['Bridge and Road Fees',0],
  '4789':['Transportation Services',0],
  // Utilities
  '4812':['Telephone Services',15],'4813':['Telephone Services',15],
  '4814':['Telephone Services',30],'4815':['Monthly Summary Telephone Charges',0],
  '4816':['Computer Network/Information Services',15],'4821':['Telegraph Services',3],
  '4829':['Wire Transfer',0],'4899':['Cable and Other Pay Television Services',30],
  '4900':['Utilities',30],
  // Retail
  '5013':['Motor Vehicle Supplies and New Parts',7],
  '5021':['Commercial Furniture',30],'5039':['Construction Materials',7],
  '5044':['Office, Photographic, Photocopy Equipment',7],
  '5045':['Computers and Computer Peripherals Equipment',7],
  '5046':['Commercial Equipment',7],'5047':['Medical and Dental Instruments',7],
  '5051':['Metal Service Centers and Offices',7],
  '5065':['Electrical Parts and Equipment',7],
  '5072':['Hardware Equipment and Supplies',7],
  '5074':['Plumbing and Heating Equipment',7],
  '5085':['Industrial Supplies',7],'5094':['Jewelry, Watches, Clocks, Silverware',7],
  '5099':['Durable Goods',7],
  '5111':['Stationery, Office Supplies, Printing',3],
  '5122':['Drugs, Drug Proprietaries and Druggists\' Sundries',3],
  '5131':['Piece Goods, Notions and Dry Goods',7],
  '5137':['Men\'s, Women\'s, Children\'s Uniforms and Commercial Clothing',7],
  '5139':['Commercial Footwear',7],
  '5169':['Chemicals and Allied Products',7],
  '5172':['Petroleum and Petroleum Products',0],
  '5192':['Books, Periodicals and Newspapers',7],
  '5193':['Florists\' Supplies, Nursery Stock and Flowers',3],
  '5198':['Paints, Varnishes and Supplies',7],
  '5199':['Non-Durable Goods',7],
  '5200':['Home Supply Warehouse Stores',30],
  '5211':['Lumber, Building Material Stores',7],
  '5231':['Glass, Paint, Wallpaper Stores',3],
  '5251':['Hardware Stores',3],
  '5261':['Nurseries, Lawn and Garden Stores',3],
  '5271':['Mobile Home Dealers',14],
  '5300':['Wholesale Clubs',0],
  '5309':['Duty Free Stores',0],
  '5310':['Discount Stores',0],
  '5311':['Department Stores',3],
  '5331':['Variety Stores',0],
  '5399':['Miscellaneous General Merchandise',3],
  '5411':['Grocery Stores, Supermarkets',0],
  '5422':['Freezer, Locker Meat Provisioners',3],
  '5441':['Candy, Nut, Confectionery Stores',0],
  '5451':['Dairy Products Stores',0],
  '5462':['Bakeries',0],
  '5499':['Miscellaneous Food Stores',8],
  '5511':['Car and Truck Dealers (New and Used)',5],
  '5521':['Car and Truck Dealers (Used Only)',15],
  '5531':['Auto and Home Supply Stores',3],
  '5532':['Automotive Tire Stores',0],
  '5533':['Automotive Parts and Accessories Stores',3],
  '5541':['Service Stations',0],
  '5542':['Automated Fuel Dispensers',0],
  '5551':['Boat Dealers',14],
  '5561':['Camper, Recreational and Utility Trailer Dealers',14],
  '5571':['Motorcycle Shops and Dealers',7],
  '5592':['Motor Home Dealers',14],
  '5598':['Snowmobile Dealers',14],
  '5599':['Automotive, Aircraft and Farm Equipment Dealers',7],
  '5611':['Men\'s and Boys\' Clothing and Accessories Stores',7],
  '5621':['Women\'s Ready-to-Wear Stores',7],
  '5631':['Women\'s Accessory and Specialty Stores',7],
  '5641':['Children\'s and Infants\' Wear Stores',7],
  '5651':['Family Clothing Stores',7],
  '5655':['Sports and Riding Apparel Stores',7],
  '5661':['Shoe Stores',3],
  '5681':['Furriers and Fur Shops',14],
  '5691':['Men\'s and Women\'s Clothing Stores',7],
  '5697':['Tailors, Seamstresses, Mending and Alterations',14],
  '5698':['Wig and Toupee Stores',7],
  '5699':['Miscellaneous Apparel and Accessory Shops',7],
  '5712':['Furniture, Home Furnishings, and Equipment Stores',30],
  '5713':['Floor Covering Stores',30],
  '5714':['Drapery, Window Covering and Upholstery Stores',30],
  '5718':['Fireplace, Fireplace Screens and Accessories Stores',30],
  '5719':['Miscellaneous Home Furnishing Specialty Stores',30],
  '5722':['Household Appliance Stores',30],
  '5731':['Electronics Stores',7],
  '5732':['Electronics Stores',7],
  '5733':['Music Stores',7],
  '5734':['Computer Software Stores',15],
  '5735':['Record Stores',3],
  '5736':['Musical Instruments Stores',7],
  '5741':['Computer and Computer Software Stores',7],
  '5742':['Electronics Sales',7],
  '5743':['Musical Instruments Stores',7],
  '5761':['Catalog and Mail-Order Houses',14],
  '5771':['Pawn Shops and Salvage Yards',0],
  '5912':['Drug Stores and Pharmacies',0],
  '5921':['Package Stores - Beer, Wine, and Liquor',0],
  '5931':['Used Merchandise and Secondhand Stores',0],
  '5932':['Antique Shops',0],
  '5933':['Pawn Shops',0],
  '5935':['Wrecking and Salvage Yards',0],
  '5937':['Antique Reproduction Stores',7],
  '5940':['Sporting Goods Stores',7],
  '5941':['Sporting Goods Stores',7],
  '5942':['Book Stores',3],
  '5943':['Stationery, Office, and School Supply Stores',3],
  '5944':['Jewelry Stores, Watches, Clocks and Silverware',3],
  '5945':['Hobby, Toy and Game Shops',3],
  '5946':['Camera and Photographic Supply Stores',3],
  '5947':['Gift, Card, Novelty, and Souvenir Shops',3],
  '5948':['Luggage and Leather Goods Stores',3],
  '5949':['Sewing, Needlework, Fabric and Piece Goods',7],
  '5950':['Glassware/Crystal Stores',7],
  '5960':['Direct Marketing - Insurance Services',30],
  '5961':['Catalog and Mail-Order Houses',14],
  '5962':['Direct Marketing - Travel Related Arrangements Services',180],
  '5963':['Door-to-Door Sales',14],
  '5964':['Direct Marketing - Catalog Merchant',14],
  '5965':['Direct Marketing - Catalog and Catalog and Retail Merchant',14],
  '5966':['Direct Marketing - Outbound Telemarketing Merchant',30],
  '5967':['Direct Marketing - Inbound Teleservices Merchant',30],
  '5968':['Direct Marketing - Continuity/Subscription Merchant',30],
  '5969':['Direct Marketing - Other Direct Marketers',14],
  '5970':['Artist\'s Supply and Craft Shops',3],
  '5971':['Art Dealers and Galleries',14],
  '5972':['Stamp and Coin Stores',3],
  '5973':['Religious Goods Stores',7],
  '5975':['Hearing Aids Sales and Supplies',7],
  '5976':['Orthopedic Goods',7],
  '5977':['Cosmetic Stores',3],
  '5978':['Typewriter Stores',7],
  '5983':['Fuel Dealers',0],
  '5992':['Florists',3],
  '5993':['Cigar Stores and Stands',0],
  '5994':['News Dealers and Newsstands',0],
  '5995':['Pet Shops, Pet Food and Supplies',3],
  '5996':['Swimming Pools Sales',14],
  '5997':['Electric Razor Stores',3],
  '5998':['Tent and Awning Shops',14],
  '5999':['Miscellaneous and Specialty Retail Stores',7],
  // Food & Beverage
  '5811':['Caterers',7],
  '5812':['Eating Places and Restaurants',0],
  '5813':['Drinking Places (Alcoholic Beverages)',0],
  '5814':['Fast Food Restaurants',0],
  '5815':['Digital Goods: Media, Books, Movies, Music',0],
  '5816':['Digital Goods: Games',0],
  '5817':['Digital Goods: Applications',0],
  '5818':['Digital Goods: Large Digital Goods Merchant',0],
  // Professional Services
  '7011':['Hotels, Motels, Resorts',30],
  '7012':['Timeshares',30],
  '7032':['Sporting and Recreational Camps',30],
  '7033':['Trailer Parks and Campgrounds',30],
  '7210':['Laundry, Cleaning Services',0],
  '7211':['Laundry, Cleaning Services',0],
  '7216':['Dry Cleaners',0],
  '7217':['Carpet and Upholstery Cleaning',0],
  '7221':['Photographic Studios',7],
  '7230':['Beauty and Barber Shops',0],
  '7251':['Shoe Repair/Hat Cleaning',0],
  '7261':['Funeral Services and Crematories',7],
  '7273':['Dating and Escort Services',30],
  '7276':['Tax Preparation Service',30],
  '7277':['Counseling Services',30],
  '7278':['Buying and Shopping Services',7],
  '7296':['Clothing Rental',7],
  '7297':['Massage Parlors',7],
  '7298':['Health and Beauty Spas',15],
  '7299':['Miscellaneous Personal Services',7],
  '7311':['Advertising Services',30],
  '7321':['Consumer Credit Reporting Agencies',30],
  '7333':['Commercial Photography, Art and Graphics',14],
  '7338':['Quick Copy, Reproduction and Blueprinting Services',3],
  '7339':['Secretarial Support Services, Stenography Services',7],
  '7342':['Exterminating and Disinfecting Services',7],
  '7349':['Cleaning and Maintenance, Janitorial Services',14],
  '7361':['Help Supply Services',14],
  '7372':['Computer Programming, Data Processing',30],
  '7374':['Computer Processing and Data Preparation',30],
  '7375':['Computer Information Retrieval Services',0],
  '7379':['Computer Maintenance and Repair',7],
  '7392':['Management, Consulting and Public Relations Services',30],
  '7393':['Detective Agencies, Protective Agencies',14],
  '7394':['Equipment Rental and Leasing',30],
  '7395':['Photofinishing Laboratories, Photo Developing',7],
  '7399':['Business Services',14],
  // Automotive
  '7512':['Car Rental Agencies',60],
  '7513':['Truck and Utility Trailer Rentals',30],
  '7519':['Motor Home and Recreational Vehicle Rentals',30],
  '7523':['Automobile Parking Lots and Garages',0],
  '7531':['Automotive Body Repair Shops',7],
  '7534':['Tire Retreading and Repair',7],
  '7535':['Automotive Paint Shops',7],
  '7538':['Automotive Service Shops',7],
  '7542':['Car Washes',0],
  '7549':['Towing Services',0],
  // Entertainment & Recreation
  '7622':['Radio Repair Shops',2],
  '7623':['Air Conditioning and Refrigeration Repair',2],
  '7629':['Electrical and Small Appliance Repair',2],
  '7631':['Watch, Clock, Jewelry Repair',2],
  '7641':['Furniture Repair, Refinishing',30],
  '7692':['Welding Services',7],
  '7699':['Miscellaneous Repair Shops',7],
  '7829':['Motion Picture and Video Tape Distribution',14],
  '7832':['Motion Picture Theaters',30],
  '7841':['Video Tape Rental Stores',7],
  '7911':['Dance Hall, Studios, Schools',0],
  '7922':['Ticketing Agencies, Theatrical Producers, Ticket Agencies',60],
  '7929':['Bands, Orchestras, Actors',7],
  '7932':['Billiard and Pool Establishments',0],
  '7933':['Bowling Alleys',0],
  '7941':['Commercial Sports',0],
  '7991':['Tourist Attractions and Exhibits',0],
  '7992':['Golf Courses - Public',0],
  '7993':['Video Amusement Game Supplies',0],
  '7994':['Video Game Arcades/Establishments',0],
  '7995':['Gambling Transactions',0],
  '7996':['Amusement Parks, Carnivals, Circuses',14],
  '7997':['Country Clubs',182],
  '7998':['Aquariums, Seaquariums, Dolphinariums',14],
  '7999':['Recreation Services',15],
  // Health
  '8011':['Doctors and Physicians',0],
  '8021':['Dentists and Orthodontists',0],
  '8031':['Osteopaths',0],
  '8041':['Chiropractors',0],
  '8042':['Optometrists and Ophthalmologists',0],
  '8043':['Opticians, Optical Goods and Eyeglasses',7],
  '8049':['Podiatrists and Chiropodists',0],
  '8050':['Nursing and Personal Care Facilities',30],
  '8062':['Hospitals',0],
  '8071':['Medical and Dental Laboratories',7],
  '8099':['Health Practitioners, Medical Services',0],
  // Education
  '8211':['Elementary and Secondary Schools',90],
  '8220':['Colleges, Universities, Professional Schools',30],
  '8241':['Correspondence Schools',30],
  '8244':['Business and Secretarial Schools',30],
  '8249':['Trade and Vocational Schools',30],
  '8299':['Schools and Educational Services',90],
  // Financial & Crypto
  '6010':['Manual Cash Disbursements',0],
  '6011':['Automated Cash Disbursements',0],
  '6012':['Financial Institutions - Merchandise and Services',0],
  '6051':['Non-Financial Institutions - Foreign Currency, Non-Fiat Currency',0],
  '6211':['Security Brokers/Dealers',0],
  '6300':['Insurance Sales',30],
  '6381':['Insurance Premiums',30],
  '6399':['Insurance, not Elsewhere Classified',30],
  '6513':['Real Estate Agents and Managers - Rentals',30],
  '6411':['Insurance Agents, Brokers and Service',30],
  '6531':['Real Estate Agents and Managers',30],
  '6541':['Title Abstract Offices',30],
  '6552':['Land Subdividers and Developers',90],
  // Government
  '9211':['Court Costs',0],'9222':['Fines',0],'9223':['Bail and Bond Payments',0],
  '9311':['Tax Payments',0],'9399':['Government Services',0],
  '9402':['Postal Services - Government Only',0],
  '9405':['Intra-Government Purchases - Government Only',0],
  // Miscellaneous
  '7221':['Photographic Studios',7],
  '8911':['Architectural, Engineering and Surveying Services',14],
  '8931':['Accounting, Auditing and Bookkeeping Services',7],
  '8999':['Services, not Elsewhere Classified',7],
};

// ── CKO Risk Rating ───────────────────────────────────────────────────────────
// importedMccData: populated from the CKO MCC Risk List CSV (col B = MCC code,
// col C = MCC Title, col F = Avg NDX, col I = CKO Risk Rating)
let importedMccData = {}; // { mccCode: [description, industryDays, riskRating] }

// Built-in CKO risk ratings sourced directly from MCC Risk List sheet (col I)
// Values: Low | Medium | High | Restricted (EDD) | Prohibited
const CKO_RISK_BUILTIN = {
  '0742':'Low','0763':'Low','0780':'Low','1520':'Low',
  '1711':'Low','1731':'Low','1740':'Low','1750':'Low','1761':'Low','1771':'Low','1799':'Low',
  '2741':'Low','2791':'Low','2842':'Low',
  '4011':'Low','4111':'Low','4112':'Low','4119':'Low','4121':'Low','4131':'Low',
  '4214':'Low','4215':'Low','4225':'Low',
  '4411':'High','4457':'High','4468':'High','4511':'High','4582':'High',
  '4722':'High','4723':'High',
  '4784':'Low','4789':'Low',
  '4812':'Low','4813':'Low','4814':'High','4816':'High',
  '4821':'Low','4829':'Restricted (EDD)',
  '4899':'Medium','4900':'Low',
  '5013':'Low','5021':'High','5039':'Low','5044':'Low','5045':'Low','5046':'Low',
  '5047':'Low','5051':'Low','5065':'Low','5072':'Low','5074':'Low','5085':'Low',
  '5094':'Restricted (EDD)','5099':'Restricted (EDD)',
  '5111':'Low','5122':'Restricted (EDD)','5131':'Low','5137':'Low','5139':'Low',
  '5169':'Low','5172':'Low','5192':'Low','5193':'Low','5198':'Low','5199':'Low',
  '5200':'High','5211':'Low','5231':'Low','5251':'Low','5261':'Low',
  '5262':'Restricted (EDD)','5271':'Restricted (EDD)',
  '5300':'Low','5309':'Low','5310':'Low','5311':'Low','5331':'Low','5399':'Low',
  '5411':'Low','5422':'Low','5441':'Low','5451':'Low','5462':'Low',
  '5499':'High','5511':'High','5521':'Medium',
  '5531':'Low','5532':'Low','5533':'Low','5541':'Low','5542':'Low',
  '5551':'Medium','5552':'Low','5561':'Low','5571':'Low','5592':'Low','5598':'Low',
  '5599':'Restricted (EDD)',
  '5611':'High','5621':'Low','5631':'Low','5641':'Low','5651':'Low','5655':'Low',
  '5661':'Low','5681':'Low','5691':'Low','5697':'Low','5698':'Low','5699':'Low',
  '5712':'High','5713':'High','5714':'High','5718':'High','5719':'High',
  '5722':'High','5732':'High','5733':'Low','5734':'High','5735':'Low',
  '5811':'Low','5812':'Low','5813':'Restricted (EDD)','5814':'Low',
  '5815':'High','5816':'High','5817':'Low','5818':'Low',
  '5912':'Restricted (EDD)','5921':'Low','5931':'Low','5932':'Low','5933':'Low','5935':'Low',
  '5937':'Restricted (EDD)','5940':'Low','5941':'Low','5942':'Low','5943':'Low',
  '5944':'Restricted (EDD)','5945':'Low','5946':'Low','5947':'Low',
  '5948':'High','5949':'Low','5950':'Low',
  '5960':'Medium','5962':'High','5963':'Low','5964':'Low','5965':'Low',
  '5966':'Prohibited','5967':'Restricted (EDD)','5968':'Restricted (EDD)',
  '5969':'Medium','5970':'Low','5971':'Restricted (EDD)',
  '5972':'Low','5973':'Low','5975':'Low','5976':'Low','5977':'Low','5978':'Low',
  '5983':'Low','5992':'Low','5993':'Restricted (EDD)','5994':'Low','5995':'Low',
  '5996':'High','5997':'Low','5998':'Low','5999':'Medium',
  '6010':'Restricted (EDD)','6011':'Restricted (EDD)','6012':'Restricted (EDD)',
  '6050':'Restricted (EDD)','6051':'Restricted (EDD)',
  '6211':'Restricted (EDD)','6300':'High','6513':'Medium',
  '6532':'Restricted (EDD)','6533':'Restricted (EDD)','6536':'Restricted (EDD)',
  '6537':'Restricted (EDD)','6538':'Restricted (EDD)','6540':'Restricted (EDD)',
  '7011':'High','7012':'High','7032':'High','7033':'High',
  '7210':'Low','7211':'Low','7216':'Low','7217':'Low','7221':'Low',
  '7230':'Low','7251':'Low',
  '7261':'High','7273':'Restricted (EDD)','7276':'Low','7277':'Low',
  '7278':'High','7296':'Low','7297':'Restricted (EDD)','7298':'Medium','7299':'High',
  '7311':'High','7321':'High','7322':'Restricted (EDD)',
  '7333':'Low','7338':'Low','7339':'High','7342':'Low','7349':'Low',
  '7361':'High','7372':'Medium','7375':'High',
  '7379':'Low','7392':'Low','7393':'Low','7394':'Low','7395':'Low','7399':'Low',
  '7512':'High','7513':'High','7519':'High',
  '7523':'Low','7531':'Low','7534':'Low','7535':'Low','7538':'Low','7542':'Low','7549':'Low',
  '7622':'High','7623':'Low','7629':'Low','7631':'Low','7641':'High','7692':'Low','7699':'Low',
  '7800':'Restricted (EDD)','7801':'Restricted (EDD)','7802':'Restricted (EDD)',
  '7829':'Low','7832':'Low','7841':'Low',
  '7911':'High','7922':'High','7929':'High',
  '7932':'Low','7933':'Low','7941':'Low','7991':'Low',
  '7992':'High','7993':'High','7994':'High','7995':'Restricted (EDD)',
  '7996':'Medium','7997':'High','7998':'Medium','7999':'Low',
  '8011':'Medium','8021':'Low','8031':'Low','8041':'Low','8042':'Low','8043':'Low',
  '8049':'Low','8050':'Low','8062':'Low','8071':'Low','8099':'Low',
  '8111':'High',
  '8211':'High','8220':'High','8241':'High','8244':'High','8249':'High','8299':'High',
  '8351':'Low','8398':'Restricted (EDD)',
  '8641':'High','8651':'Restricted (EDD)','8661':'Restricted (EDD)',
  '8675':'High','8699':'High',
  '8734':'Low','8911':'Low','8931':'High','8999':'Medium',
  '9211':'Low','9222':'Low','9223':'Low','9311':'Low','9399':'Low',
  '9402':'Low','9405':'Low','9406':'Restricted (EDD)','9950':'Low',
  // CKO custom codes
  'CKO14':'High','CKO21':'High','CKO22':'Restricted (EDD)','CKO23':'Restricted (EDD)',
  'CKO24':'Medium','CKO25':'High','CKO26':'Restricted (EDD)','CKO77':'High',
};

const IMPORT_STORE_KEY = 'cko_mcc_import_v2'; // bump version to clear stale pre-fix data

function loadImportedMcc() {
  try {
    // Remove legacy key from before the column-index fix
    localStorage.removeItem('cko_mcc_import');
    const stored = localStorage.getItem(IMPORT_STORE_KEY);
    if (stored) { importedMccData = JSON.parse(stored); return true; }
  } catch (e) {}
  return false;
}

// Unified lookup: imported sheet data takes priority over built-in MCC_DATA
function getMccData(code) {
  if (importedMccData[code]) return importedMccData[code]; // [desc, days, risk]
  if (MCC_DATA[code]) return [MCC_DATA[code][0], MCC_DATA[code][1], getMccRisk(code)];
  // CKO custom codes and any code with a known built-in risk rating
  const builtinRisk = getMccRiskBuiltIn(code);
  if (builtinRisk) return [code, 0, builtinRisk];
  return null;
}

// Risk from imported data; falls back to built-in range estimates
function getMccRisk(code) {
  if (importedMccData[code]) return importedMccData[code][2] || '';
  return getMccRiskBuiltIn(code);
}

function getMccRiskBuiltIn(code) {
  // Direct lookup in the hardcoded CKO Risk List data (including CKO custom codes)
  return CKO_RISK_BUILTIN[code] || CKO_RISK_BUILTIN[code.toUpperCase()] || '';
}

// ── CSV import (col B = MCC code, col C = MCC Title, col F = Avg NDX, col I = CKO Risk Rating)
function parseRiskCsvRow(line) {
  const cols = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; }
    else if (c === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  cols.push(cur.trim());
  return cols;
}

function importRiskCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return { count: 0, error: 'File appears empty' };

  // Scan first 5 lines to find the header row (the one containing the 'MCC' column header)
  let headerLineIdx = 0;
  let mccIdx = -1, descIdx = -1, daysIdx = -1, riskIdx = -1;

  for (let li = 0; li < Math.min(5, lines.length); li++) {
    const row = parseRiskCsvRow(lines[li]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    // Look for an exact 'mcc' cell (column B in the CKO sheet)
    const mi = row.findIndex(h => h === 'mcc');
    if (mi >= 0) {
      headerLineIdx = li;
      mccIdx  = mi;
      // 'MCC Title' column (short description)
      descIdx = row.findIndex(h => h === 'mcctitle');
      if (descIdx < 0) descIdx = row.findIndex(h => h.includes('title') || h.includes('desc'));
      // 'Avg NDX' column (industry delivery days)
      daysIdx = row.findIndex(h => h === 'avgndx' || h.includes('ndx'));
      if (daysIdx < 0) daysIdx = row.findIndex(h => h.includes('day') || h.includes('deliv'));
      // 'CKO Risk Rating' column
      riskIdx = row.findIndex(h => h === 'ckoriskrating');
      if (riskIdx < 0) riskIdx = row.findIndex(h => h.includes('ckorisk') || h.includes('risk'));
      break;
    }
  }

  // Fallbacks to known fixed positions in the CKO MCC Risk List sheet
  if (mccIdx  < 0) mccIdx  = 1; // col B
  if (descIdx < 0) descIdx = 2; // col C (MCC Title)
  if (daysIdx < 0) daysIdx = 5; // col F (Avg NDX)
  if (riskIdx < 0) riskIdx = 8; // col I (CKO Risk Rating)

  const result = {};
  let count = 0;
  for (let i = headerLineIdx + 1; i < lines.length; i++) {
    const row = parseRiskCsvRow(lines[i]);
    const raw = (row[mccIdx] ?? '').trim();
    if (!raw) continue;

    // Preserve CKO custom codes (CKO14, CKO21, etc.) as-is; strip non-digits from numeric codes
    let code;
    if (/^CKO/i.test(raw)) {
      code = raw.toUpperCase();
    } else {
      code = raw.replace(/\D/g, '').replace(/^0+/, '');
    }

    if (!code) continue;
    // Numeric codes must be 3–4 digits; CKO codes are exempt from length check
    if (!/^CKO/.test(code) && (code.length < 3 || code.length > 4)) continue;

    const desc = (row[descIdx] ?? '').trim();
    const days = parseFloat(row[daysIdx]) || 0;
    const risk = (row[riskIdx] ?? '').trim();
    if (!risk) continue; // skip rows without a risk rating

    result[code] = [desc, days, risk];
    count++;
  }

  if (count === 0) return { count: 0, error: 'No valid MCC rows found — check column layout' };

  importedMccData = result;
  try { localStorage.setItem(IMPORT_STORE_KEY, JSON.stringify(result)); } catch (e) {}
  refreshAllMccRows();
  return { count, error: null };
}

function refreshAllMccRows() {
  document.querySelectorAll('.mcc-row').forEach(row => {
    const id = row.id.replace('mccRow', '');
    const code = document.getElementById(`mccCode${id}`)?.value.trim();
    if (!code) return;
    const data = getMccData(code);
    if (!data) return;
    const descEl    = document.getElementById(`mccDesc${id}`);
    const indDaysEl = document.getElementById(`mccIndDays${id}`);
    const riskEl    = document.getElementById(`mccRisk${id}`);
    if (descEl    && !descEl.dataset.manualEdit) descEl.value = data[0];
    if (indDaysEl) indDaysEl.value = data[1];
    if (riskEl)    setRiskBadge(riskEl, data[2] || '');
  });
}

function updateImportStatus() {
  const dot  = document.getElementById('riskImportDot');
  const text = document.getElementById('riskImportText');
  if (!dot || !text) return;
  const count = Object.keys(importedMccData).length;
  if (count > 0) {
    dot.className  = 'risk-import-dot risk-dot-active';
    text.textContent = `Risk ratings loaded from sheet (${count} MCCs)`;
  } else {
    dot.className  = 'risk-import-dot risk-dot-inactive';
    text.textContent = 'Risk ratings: using built-in defaults';
  }
}

function setRiskBadge(el, risk) {
  el.textContent = risk;
  el.className = 'risk-badge';
  if (!risk) return;
  if      (risk === 'Low')                   el.classList.add('risk-low');
  else if (risk === 'Medium')                el.classList.add('risk-medium');
  else if (risk === 'High')                  el.classList.add('risk-high');
  else if (risk === 'Restricted (EDD)')      el.classList.add('risk-restricted');
  else if (risk === 'Prohibited')            el.classList.add('risk-prohibited');
  else if (risk === 'Very High')             el.classList.add('risk-very-high');
  else                                       el.classList.add('risk-medium'); // unknown fallback
}

// ── MCC rows ──────────────────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

let mccCount = 0;
let peakChart = null;
let lastResult = null; // last successful calculation, used by generatePdf()

function buildMccHeaders() {
  const wrap = document.getElementById('mccRows');
  const h = document.createElement('div');
  h.className = 'mcc-headers';
  h.innerHTML = `
    <span class="mcc-col-header">MCC Code</span>
    <span class="mcc-col-header">Description</span>
    <span class="mcc-col-header">CKO Risk</span>
    <span class="mcc-col-header">Ind. Delivery Days</span>
    <span class="mcc-col-header">Manual Days</span>
    <span class="mcc-col-header">% of Volume</span>
    <span class="mcc-col-header">Product / Service</span>
    <span></span>`;
  wrap.appendChild(h);
}

function addMccRow() {
  if (mccCount >= 20) return;
  mccCount++;
  const id = mccCount;
  const wrap = document.getElementById('mccRows');
  const row = document.createElement('div');
  row.className = 'mcc-row';
  row.id = `mccRow${id}`;
  row.innerHTML = `
    <div><input type="text" id="mccCode${id}" placeholder="e.g. 5411" maxlength="4" /></div>
    <div><input type="text" id="mccDesc${id}" placeholder="Auto-filled" /></div>
    <div class="mcc-risk-cell"><span id="mccRisk${id}" class="risk-badge"></span></div>
    <div><input type="number" id="mccIndDays${id}" placeholder="—" min="0" readonly class="input-readonly" tabindex="-1" /></div>
    <div><input type="number" id="mccDays${id}" placeholder="Override" min="0" /></div>
    <div><input type="number" id="mccPct${id}" placeholder="0" step="0.1" min="0" max="100" /></div>
    <div><input type="text" id="mccProduct${id}" placeholder="e.g. Software" /></div>
    <button class="btn-remove" onclick="removeMccRow(${id})" title="Remove">×</button>`;
  wrap.appendChild(row);
  attachMccListener(id);
  attachMccCodeListener(id);
}

function removeMccRow(id) {
  const row = document.getElementById(`mccRow${id}`);
  if (row) row.remove();
  validateMccSum();
}

function attachMccListener(id) {
  document.getElementById(`mccPct${id}`).addEventListener('input', validateMccSum);
}

function attachMccCodeListener(id) {
  const codeInput = document.getElementById(`mccCode${id}`);
  codeInput.addEventListener('input', () => {
    const code = codeInput.value.trim();
    const data = getMccData(code); // [desc, days, risk] — imported sheet data takes priority
    const descEl    = document.getElementById(`mccDesc${id}`);
    const indDaysEl = document.getElementById(`mccIndDays${id}`);
    const manDaysEl = document.getElementById(`mccDays${id}`);
    const riskEl    = document.getElementById(`mccRisk${id}`);
    if (data) {
      if (!descEl.dataset.manualEdit) descEl.value = data[0];
      indDaysEl.value = data[1];
      // Pre-fill manual days only if user hasn't typed one yet
      if (!manDaysEl.dataset.manualEdit) manDaysEl.value = '';
      codeInput.classList.add('mcc-matched');
      codeInput.classList.remove('mcc-unmatched');
      if (riskEl) setRiskBadge(riskEl, data[2] || '');
    } else {
      if (!descEl.dataset.manualEdit) descEl.value = '';
      indDaysEl.value = '';
      codeInput.classList.remove('mcc-matched');
      if (code.length === 4) codeInput.classList.add('mcc-unmatched');
      else codeInput.classList.remove('mcc-unmatched');
      if (riskEl) setRiskBadge(riskEl, '');
    }
  });
  // Track manual edits
  ['mccDesc','mccDays'].forEach(prefix => {
    const el = document.getElementById(`${prefix}${id}`);
    el.addEventListener('input', () => { el.dataset.manualEdit = '1'; });
  });
}

function validateMccSum() {
  const sum = getMccRows().reduce((s, r) => s + (parseFloat(r.pct) || 0), 0);
  const err = document.getElementById('mccSumError');
  const off = Math.abs(sum - 100) > 0.01 && getMccRows().length > 0;
  err.classList.toggle('hidden', !off);
  return !off;
}

function getMccRows() {
  const rows = document.querySelectorAll('.mcc-row');
  return Array.from(rows).map(row => {
    const id = row.id.replace('mccRow', '');
    const manDays = document.getElementById(`mccDays${id}`)?.value;
    const indDays = document.getElementById(`mccIndDays${id}`)?.value;
    // Use manual override if entered, otherwise fall back to industry days
    const days = manDays !== '' && !isNaN(parseFloat(manDays))
      ? parseFloat(manDays)
      : (indDays !== '' && !isNaN(parseFloat(indDays)) ? parseFloat(indDays) : 0);
    return {
      code:    document.getElementById(`mccCode${id}`)?.value.trim() || '',
      desc:    document.getElementById(`mccDesc${id}`)?.value.trim() || '',
      days,
      pct:     parseFloat(document.getElementById(`mccPct${id}`)?.value) || 0,
      product: document.getElementById(`mccProduct${id}`)?.value.trim() || '',
    };
  });
}

// ── Monthly grid ──────────────────────────────────────────────────────────────
let monthlyMode = 'amount'; // 'amount' | 'percent'

function buildMonthlyGrid() {
  const grid = document.getElementById('monthlyGrid');
  MONTHS.forEach(m => {
    const div = document.createElement('div');
    div.className = 'monthly-row';
    div.innerHTML = `
      <span class="month-label">${m}</span>
      <input type="text" inputmode="numeric" id="month${m}" placeholder="Leave blank for auto" class="month-input" />
      <span class="month-computed" id="monthComputed${m}"></span>`;
    grid.appendChild(div);
    div.querySelector('input').addEventListener('input', updateMonthlyTotal);
  });
}

function setMonthlyMode(mode) {
  monthlyMode = mode;
  MONTHS.forEach(m => {
    const inp = document.getElementById(`month${m}`);
    inp.value = '';
    inp.dataset.manualEdit = '';
    inp.placeholder = mode === 'percent' ? 'e.g. 8.33' : 'Leave blank for auto';
  });
  document.getElementById('monthModeLabel').textContent =
    mode === 'percent' ? 'Computed (USD)' : '';
  updateMonthlyTotal();
}

function updateMonthlyTotal() {
  const apv = getNumVal('apv');
  let total = 0;
  MONTHS.forEach(m => {
    const raw = parseFloat((document.getElementById(`month${m}`)?.value || '').replace(/,/g, ''));
    const computed = document.getElementById(`monthComputed${m}`);
    if (monthlyMode === 'percent') {
      const usd = !isNaN(raw) && raw > 0 ? (raw / 100) * apv : 0;
      total += usd;
      computed.textContent = usd > 0 ? fmt(usd) : '—';
    } else {
      total += isNaN(raw) ? 0 : raw;
      computed.textContent = '';
    }
  });
  document.getElementById('monthlyTotal').textContent = fmt(total);
}

function getMonthlyValues(apv) {
  return MONTHS.map(m => {
    const raw = parseFloat((document.getElementById(`month${m}`)?.value || '').replace(/,/g, ''));
    if (isNaN(raw) || raw === 0) return apv / 12;
    return monthlyMode === 'percent' ? (raw / 100) * apv : raw;
  });
}

// ── Number helpers ────────────────────────────────────────────────────────────
function fmt(n) {
  if (n == null || isNaN(n)) return '—';
  return '$' + Math.round(n).toLocaleString('en-US');
}
function fmtPct(n) {
  if (n == null || isNaN(n)) return '—';
  return (n * 100).toFixed(3) + '%';
}
function ceiling(n, sig) { return Math.ceil(n / sig) * sig; }
function mround(n, multiple) { return Math.round(n / multiple) * multiple; }

// Strip commas and return a float — works for both type=number and type=text currency inputs
function getNumVal(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  return parseFloat((el.value || '').replace(/,/g, '')) || 0;
}

// Attach live comma-formatting to a text input (currency fields only)
function attachCurrencyInput(el) {
  if (!el) return;
  el.addEventListener('input', function () {
    // In percent mode, monthly inputs show decimals — skip formatting
    if (this.classList.contains('month-input') && monthlyMode === 'percent') return;
    const pos    = this.selectionStart;
    const raw    = this.value.replace(/\D/g, '');
    if (!raw) { this.value = ''; return; }
    // Count digits before cursor in the current (partially typed) string
    const digitsBeforeCursor = this.value.slice(0, pos).replace(/\D/g, '').length;
    const formatted = Number(raw).toLocaleString('en-US');
    this.value = formatted;
    // Reposition cursor so it stays at the same logical digit
    let count = 0, newPos = formatted.length;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        count++;
        if (count === digitsBeforeCursor) { newPos = i + 1; break; }
      }
    }
    if (digitsBeforeCursor === 0) newPos = 0;
    this.setSelectionRange(newPos, newPos);
  });
}

// ── Peak exposure (sliding window) ───────────────────────────────────────────
function calcPeakMonthly(monthlyVols, ndxDays, isAch, achPct) {
  const vols = monthlyVols.map(v => isAch ? v * (1 - achPct / 100) : v);
  // Build a 25-month sequence starting from December, exactly matching the
  // spreadsheet's "Peak Exposure Calculation" tab:
  //   [Dec, Jan, Feb, ..., Nov, Dec, Jan, Feb, ..., Nov, Dec]  (25 elements)
  // Starting from December is critical: it gives January correct prior history
  // (December), preventing the partial-month from being clamped to January itself.
  const ext = [vols[11], ...vols, ...vols]; // index 0=Dec, 1=Jan … 12=Dec, 13=Jan … 24=Dec
  return ext.map((_, i) => {
    if (i < 1) return 0; // first December has no prior history → 0
    if (ndxDays <= 0) return 0;
    if (ndxDays <= 30) return ndxDays * ext[i] / 30;
    const fullMonths = Math.floor(ndxDays / 30);
    const rem       = ndxDays % 30;
    let sum = 0;
    for (let j = i - fullMonths + 1; j <= i; j++) {
      if (j >= 0) sum += ext[j];
    }
    const partialIdx = i - fullMonths;
    if (partialIdx >= 0) sum += rem / 30 * ext[partialIdx];
    // partialIdx < 0 → no partial month (mirrors spreadsheet IFERROR → 0)
    return sum;
  }); // returns 25 values; caller takes Math.max(...) for the peak
}

// ── Core calculation ──────────────────────────────────────────────────────────
function calculate() {
  const apv            = getNumVal('apv');
  const netRevenue     = getNumVal('netRevenue');
  const refundRateRaw  = document.getElementById('refundRate').value;
  const cbRateRaw      = document.getElementById('chargebackRate').value;
  const refundRate     = refundRateRaw === '' ? 0.10 : parseFloat(refundRateRaw) / 100;
  const cbRate         = cbRateRaw     === '' ? 0.005 : parseFloat(cbRateRaw) / 100;
  const isAch          = false;
  const achPct         = 0;
  const isPayfac       = document.getElementById('payfacEnabled').checked;
  const coveragePct    = parseFloat(document.getElementById('exposureCoverage').value) ?? 100;
  const coverage       = coveragePct / 100;
  const rrCaptureDays  = parseFloat(document.getElementById('rrCaptureDays').value) || 180;

  // Validate MCC
  const mccRows = getMccRows();
  const mccSum  = mccRows.reduce((s, r) => s + r.pct, 0);

  // Monthly volumes
  const monthlyVols = getMonthlyValues(apv);
  const monthlyTotal = monthlyVols.reduce((a, b) => a + b, 0);
  const monthlyMismatch = monthlyTotal > 0 && Math.abs(monthlyTotal - apv) > 1;

  // ── NDX (weighted average delivery days) ──
  let ndxDays;
  const ERROR = 'ERROR';
  if (mccRows.length === 0 || Math.abs(mccSum - 100) > 0.01 || monthlyMismatch) {
    ndxDays = ERROR;
  } else {
    ndxDays = mccRows.reduce((s, r) => s + r.days * (r.pct / 100), 0);
  }

  const effectiveAPV = isAch ? apv * (1 - achPct / 100) : apv;

  // ── Peak Exposure (25-month sliding window starting from December) ──
  const peakMonthly = ndxDays !== ERROR
    ? calcPeakMonthly(monthlyVols, ndxDays, isAch, achPct)
    : Array(25).fill(0);
  const peakExposure = Math.max(...peakMonthly);

  // ── NDX Exposure = CEILING(MAX(simple, peak), 1000) — matches spreadsheet D50 ──
  let ndxExposure;
  if (ndxDays === ERROR) {
    ndxExposure = ERROR;
  } else {
    const simple = ceiling(effectiveAPV / 365 * ndxDays, 1000);
    ndxExposure = ceiling(Math.max(simple, peakExposure), 1000);
  }

  // ── Per-MCC breakdown — matches spreadsheet D52:D56 ──
  // Each MCC's exposure = max(simple, peak × (mccDays/ndxDays) × pct)
  // The shared peak is distributed proportionally by delivery-days weight.
  const mccBreakdown = mccRows.map(r => {
    if (ndxDays === ERROR) return { ...r, exposure: ERROR };
    const exp = ceiling(
      Math.max(
        effectiveAPV * (r.pct / 100) / 365 * r.days,
        peakExposure * (r.days / (ndxDays || 1)) * (r.pct / 100)
      ), 1000);
    return { ...r, exposure: exp };
  });

  // ── Refund Exposure ──
  const REFUND_DAYS = 30;
  let refundExposure = 0;
  if (ndxDays !== ERROR) {
    if (REFUND_DAYS > ndxDays) {
      refundExposure = ceiling(ceiling(apv * refundRate / 365 * (REFUND_DAYS - ndxDays), 1), 1000);
    }
  }

  // ── Chargeback Exposure ──
  const CB_DAYS = 180;
  let cbExposure = 0;
  if (ndxDays !== ERROR) {
    if (CB_DAYS > ndxDays) {
      cbExposure = ceiling(ceiling(apv * cbRate / 365 * (CB_DAYS - ndxDays), 1), 1000);
    }
  }

  // ── Total Card ──
  const totalCardExposure = ndxExposure === ERROR ? ERROR
    : ndxExposure + refundExposure + cbExposure;

  // ── ACH ──
  const achNdxDays   = ndxDays !== ERROR ? Math.min(ndxDays, 60) : 60;
  const achNdxRate   = 0.05;
  const achNdxExp    = isAch ? ceiling(Math.min(achNdxDays, 60) * apv * (achPct / 100) * achNdxRate / 365, 1) : 0;
  const achUnauth    = isAch ? ceiling(60 * apv * (achPct / 100) * (achNdxRate) / 365, 1) : 0;
  const achOther     = isAch ? ceiling(2  * apv * (achPct / 100) * (achNdxRate) / 365, 1) : 0;
  const totalAch     = achNdxExp + achUnauth + achOther;

  // ── PayFac ──
  let payfacFundsDue = 0, payfacConc = 0, payfacDiscount = 0, totalPayfac = 0;
  if (isPayfac) {
    const subSettleDays = parseFloat(document.getElementById('subSettleDays').value) || 0;
    const subRRRate     = (parseFloat(document.getElementById('subRRRate').value) || 0) / 100;
    const subRRWeeks    = parseFloat(document.getElementById('subRRWeeks').value) || 0;
    const subFixed      = getNumVal('subFixedReserve');
    const discRate      = (parseFloat(document.getElementById('discountRate').value) || 0) / 100;
    const subMerchConc  = document.getElementById('subMerchantConc').value === 'Yes';

    payfacFundsDue = apv / 365 * subSettleDays
      + subRRRate * (subRRWeeks * 7 - subSettleDays) * apv / 365
      + subFixed;

    if (subMerchConc) {
      const sm1vol  = getNumVal('sm1Vol');
      const sm1days = parseFloat(document.getElementById('sm1Days').value) || 0;
      const sm2vol  = getNumVal('sm2Vol');
      const sm2days = parseFloat(document.getElementById('sm2Days').value) || 0;
      payfacConc = sm1vol * sm1days / 365 + sm2vol * sm2days / 365;
    }

    payfacDiscount = totalCardExposure !== ERROR ? totalCardExposure * (1 - discRate) * -1 + totalCardExposure : 0;
    // Actual formula: payfac discounted exposure = D59*(1-discountRate), applied as reduction
    payfacDiscount = totalCardExposure !== ERROR ? totalCardExposure * discRate : 0;
    totalPayfac = payfacFundsDue + payfacConc + (totalCardExposure !== ERROR ? totalCardExposure * (1 - discRate) - totalCardExposure : 0);
    totalPayfac = payfacFundsDue + payfacConc - payfacDiscount;
  }

  // ── Total Exposure ──
  let totalExposure;
  if (totalCardExposure === ERROR) {
    totalExposure = ERROR;
  } else if (isPayfac) {
    totalExposure = totalAch + totalPayfac;
  } else {
    totalExposure = totalCardExposure + totalAch;
  }

  // ── Reserve Calculator ──
  const fixedReserve = totalExposure !== ERROR ? coverage * totalExposure : 0;
  const rrPct        = totalExposure !== ERROR
    ? mround(fixedReserve / (rrCaptureDays * apv / 365), 0.005)
    : null;
  const rrDaily      = rrPct && apv ? rrPct * apv / 365 : null;
  const rrFull       = rrDaily ? rrDaily * rrCaptureDays : null;

  const t1pct = (parseFloat(document.getElementById('t1pct').value) || 0) / 100;
  const t2pct = (parseFloat(document.getElementById('t2pct').value) || 0) / 100;
  const t3pct = (parseFloat(document.getElementById('t3pct').value) || 0) / 100;

  // ── Break-Even Time ──
  let betStr = '—';
  if (totalExposure !== ERROR && netRevenue > 0 && totalExposure !== null) {
    const betYears = (totalExposure * coverage - coverage) / netRevenue;
    if (betYears >= 0) {
      const yrs  = Math.floor(betYears);
      const mths = Math.ceil((betYears - yrs) * 12);
      betStr = `${yrs} yr${yrs !== 1 ? 's' : ''} ${mths} mth${mths !== 1 ? 's' : ''}`;
    } else {
      betStr = '< 0';
    }
  }

  return {
    ndxDays, ndxExposure, refundRate, cbRate,
    refundExposure, cbExposure, totalCardExposure,
    achNdxExp, achUnauth, achOther, totalAch,
    payfacFundsDue, payfacConc, payfacDiscount, totalPayfac,
    totalExposure, fixedReserve, rrPct, rrDaily, rrFull,
    rrCaptureDays, coverage, netRevenue, betStr,
    t1pct, t2pct, t3pct, isAch, isPayfac,
    peakMonthly: peakMonthly.slice(13, 25), // Jan–Dec (year-2 window, full prior history)
    monthlyVols, mccBreakdown,
  };
}

// ── Looker ───────────────────────────────────────────────────────────────────
const LOOKER_LOOK_URL = 'https://checkoutinternal.eu.looker.com/looks/6812';
const LOOKER_FILTER   = 'NAS+Client+Name';

function openLooker() {
  const name = document.getElementById('companyName').value.trim();
  if (!name) {
    alert('Enter a Company Legal Name first so Looker can filter by it.');
    return;
  }
  // Use Looker's % wildcard (URL-encoded as %25) for a "contains" match,
  // so partial names and subsidiaries are still found.
  const filterValue = '%25' + encodeURIComponent(name) + '%25';
  window.open(`${LOOKER_LOOK_URL}?${LOOKER_FILTER}=${filterValue}`, '_blank');
}

// ── PDF Export ───────────────────────────────────────────────────────────────
function generatePdf() {
  if (!lastResult) return;
  const r = lastResult;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const companyName = document.getElementById('companyName').value.trim() || 'Company';
  const dateStr     = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const pageW       = doc.internal.pageSize.getWidth();
  const M           = 14; // left/right margin
  let y             = 0;

  // ── Header bar ──
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageW, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.text('Exposure Analysis', M, 10);
  doc.setFontSize(9);  doc.setFont('helvetica', 'normal');
  doc.text(companyName + '   |   ' + dateStr, M, 17);
  y = 28;

  // helper: blue section heading with underline
  function sectionHead(title) {
    if (y > 260) { doc.addPage(); y = 14; }
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(title.toUpperCase(), M, y);
    doc.setDrawColor(37, 99, 235); doc.setLineWidth(0.25);
    doc.line(M, y + 1.2, pageW - M, y + 1.2);
    y += 6;
    doc.setTextColor(30, 41, 59); doc.setFont('helvetica', 'normal');
  }

  // helper: two-column key-value rows
  function kvTable(rows) {
    doc.autoTable({
      startY: y, margin: { left: M, right: M },
      theme: 'plain',
      styles: { fontSize: 8, cellPadding: [1.5, 2] },
      columnStyles: {
        0: { cellWidth: 72, fontStyle: 'bold', textColor: [100, 116, 139] },
        1: { cellWidth: 90 },
      },
      body: rows,
    });
    y = doc.lastAutoTable.finalY + 7;
  }

  // ── Processing Details ──
  sectionHead('Processing Details');
  const apv        = getNumVal('apv');
  const netRev     = getNumVal('netRevenue');
  const htv        = getNumVal('htv');
  const atv        = getNumVal('atv');
  const rRefund    = document.getElementById('refundRate').value;
  const rCb        = document.getElementById('chargebackRate').value;
  kvTable([
    ['Company Legal Name',               companyName],
    ['Annual Processing Volume (USD)',   fmt(apv)],
    ['Annual Net Revenue (USD)',         netRev ? fmt(netRev) : '—'],
    ['High Transaction Value (USD)',     htv  ? fmt(htv)  : '—'],
    ['Average Transaction Value (USD)',  atv  ? fmt(atv)  : '—'],
    ['Refund Rate',                      rRefund === '' ? '10% (default)' : rRefund + '%'],
    ['Chargeback Rate',                  rCb     === '' ? '0.5% (default)' : rCb     + '%'],
  ]);

  // ── MCC & Delivery ──
  sectionHead('MCC & Delivery Timeframe');
  const mccRows = getMccRows();
  // Read ind. days and manual days separately from DOM for the PDF table
  const mccPdfBody = Array.from(document.querySelectorAll('.mcc-row')).map(domRow => {
    const id      = domRow.id.replace('mccRow', '');
    const code    = document.getElementById(`mccCode${id}`)?.value.trim()    || '—';
    const desc    = document.getElementById(`mccDesc${id}`)?.value.trim()    || '—';
    const indVal  = document.getElementById(`mccIndDays${id}`)?.value ?? '';
    const manVal  = document.getElementById(`mccDays${id}`)?.value    ?? '';
    const pct     = parseFloat(document.getElementById(`mccPct${id}`)?.value) || 0;
    const product = document.getElementById(`mccProduct${id}`)?.value.trim() || '—';
    return [
      code,
      desc,
      indVal !== '' ? indVal + ' days' : '—',
      manVal !== '' ? manVal + ' days' : '—',
      pct.toFixed(1) + '%',
      product,
    ];
  });
  doc.autoTable({
    startY: y, margin: { left: M, right: M },
    theme: 'striped',
    headStyles: { fillColor: [241, 245, 249], textColor: [100, 116, 139], fontStyle: 'bold', fontSize: 7 },
    styles: { fontSize: 8, cellPadding: [1.5, 2], overflow: 'linebreak' },
    head: [['MCC', 'Description', 'Ind. Days', 'Manual Days', '% of APV', 'Product / Service']],
    body: mccPdfBody,
    columnStyles: {
      0: { cellWidth: 16 },
      1: { cellWidth: 52 },
      2: { halign: 'right', cellWidth: 22 },
      3: { halign: 'right', cellWidth: 25 },
      4: { halign: 'right', cellWidth: 20 },
      5: { cellWidth: 47 },
    },
    didParseCell: function(data) {
      // columnStyles.halign doesn't reliably apply to head cells — force it here
      if (data.section === 'head' && (data.column.index === 2 || data.column.index === 3 || data.column.index === 4)) {
        data.cell.styles.halign = 'right';
      }
    },
  });
  y = doc.lastAutoTable.finalY + 7;

  // ── Monthly Processing ──
  sectionHead('Monthly Processing');
  const monthlyToggleOn = document.getElementById('monthlyEnabled')?.checked;
  if (!monthlyToggleOn) {
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('Monthly inputs disabled — APV distributed evenly across all 12 months.', M, y);
    doc.setTextColor(30, 41, 59);
    y += 8;
  } else {
    const anyMonthly = MONTHS.some(m => document.getElementById(`month${m}`)?.value?.trim() !== '');
    if (anyMonthly) {
      doc.autoTable({
        startY: y, margin: { left: M, right: M },
        theme: 'striped',
        headStyles: { fillColor: [241, 245, 249], textColor: [100, 116, 139], fontStyle: 'bold', fontSize: 7 },
        styles: { fontSize: 8, cellPadding: [1.5, 2] },
        head: [['Month', 'Volume (USD)']],
        body: MONTHS.map(m => {
          const raw = parseFloat((document.getElementById(`month${m}`)?.value || '').replace(/,/g, ''));
          const usd = (isNaN(raw) || raw === 0)
            ? apv / 12
            : (monthlyMode === 'percent' ? (raw / 100) * apv : raw);
          const auto = (isNaN(raw) || raw === 0) ? ' (auto)' : '';
          return [m, fmt(usd) + auto];
        }),
        columnStyles: {
          0: { cellWidth: 40 },
          1: { halign: 'right' },
        },
      });
      y = doc.lastAutoTable.finalY + 7;
    } else {
      doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
      doc.text('No monthly overrides entered — APV distributed evenly across all 12 months.', M, y);
      doc.setTextColor(30, 41, 59);
      y += 8;
    }
  }

  // ── Exposure Results ──
  sectionHead('Exposure Results');

  // KPI summary row
  doc.autoTable({
    startY: y, margin: { left: M, right: M },
    theme: 'plain',
    styles: { cellPadding: [2, 3] },
    columnStyles: { 0: { cellWidth: (pageW - M * 2) / 3 }, 1: { cellWidth: (pageW - M * 2) / 3 }, 2: { cellWidth: (pageW - M * 2) / 3 } },
    body: [
      [
        { content: 'TOTAL EXPOSURE',          styles: { fontSize: 7, fontStyle: 'bold', textColor: [100,116,139] } },
        { content: 'WTD. AVG. DELIVERY DAYS', styles: { fontSize: 7, fontStyle: 'bold', textColor: [100,116,139] } },
        { content: 'ROLLING RESERVE %',       styles: { fontSize: 7, fontStyle: 'bold', textColor: [100,116,139] } },
      ],
      [
        { content: r.totalExposure === 'ERROR' ? 'ERROR' : fmt(r.totalExposure),                    styles: { fontSize: 13, fontStyle: 'bold', textColor: [37,99,235] } },
        { content: r.ndxDays       === 'ERROR' ? 'ERROR' : r.ndxDays.toFixed(1) + ' days',          styles: { fontSize: 13, fontStyle: 'bold', textColor: [37,99,235] } },
        { content: r.rrPct != null ? (r.rrPct * 100).toFixed(2) + '%' : '—',                        styles: { fontSize: 13, fontStyle: 'bold', textColor: [37,99,235] } },
      ],
    ],
  });
  y = doc.lastAutoTable.finalY + 7;

  // Exposure breakdown
  const bkBody = [];
  bkBody.push(['Non-Delivery Exposure (NDX)', r.ndxDays === 'ERROR' ? 'ERROR' : r.ndxDays.toFixed(1) + ' days', '—', r.ndxExposure === 'ERROR' ? 'ERROR' : fmt(r.ndxExposure)]);
  r.mccBreakdown.forEach(mb => {
    bkBody.push([
      '  > MCC ' + (mb.code || '—') + (mb.desc ? ' (' + mb.desc + ')' : ''),
      mb.days + ' days', mb.pct.toFixed(1) + '%',
      mb.exposure === 'ERROR' ? 'ERROR' : fmt(mb.exposure),
    ]);
  });
  bkBody.push(['Refund Exposure',    '30 days',  fmtPct(r.refundRate), fmt(r.refundExposure)]);
  bkBody.push(['Chargeback Exposure','180 days', fmtPct(r.cbRate),     fmt(r.cbExposure)]);
  if (r.isAch) {
    bkBody.push(['ACH – Non-Delivery Exposure', Math.min(r.ndxDays, 60).toFixed(0) + ' days', '—', fmt(r.achNdxExp)]);
    bkBody.push(['ACH – Unauthorised Returns',  '60 days', '—', fmt(r.achUnauth)]);
    bkBody.push(['ACH – Other Returns',         '2 days',  '—', fmt(r.achOther)]);
  }
  if (r.isPayfac) {
    bkBody.push(['PayFac – Funds Due to Merchant Liability',         '—','—', fmt(r.payfacFundsDue)]);
    bkBody.push(['PayFac – Sub-Merchant Concentration Liability',    '—','—', fmt(r.payfacConc)]);
    bkBody.push(['PayFac – Discounted Exposure Reduction',           '—','—', fmt(-r.payfacDiscount)]);
  }
  doc.autoTable({
    startY: y, margin: { left: M, right: M },
    theme: 'striped',
    headStyles: { fillColor: [241,245,249], textColor: [100,116,139], fontStyle: 'bold', fontSize: 7 },
    styles: { fontSize: 8, cellPadding: [1.5, 2], overflow: 'linebreak' },
    head: [['Component', 'Days', 'Rate', 'Exposure (USD)']],
    body: bkBody,
    foot: [['TOTAL EXPOSURE', '—', '—', r.totalExposure === 'ERROR' ? 'ERROR' : fmt(r.totalExposure)]],
    footStyles: { fontStyle: 'bold', fillColor: [239,246,255], textColor: [30,41,59] },
    showFoot: 'lastPage',
    columnStyles: {
      0: { halign: 'left', overflow: 'linebreak' },
      1: { halign: 'right', cellWidth: 22 },
      2: { halign: 'right', cellWidth: 22 },
      3: { halign: 'right', cellWidth: 32 },
    },
    didParseCell: function(data) {
      // Force right-align on head and foot for columns 1-3 (Days, Rate, Exposure)
      if ((data.section === 'head' || data.section === 'foot') && data.column.index > 0) {
        data.cell.styles.halign = 'right';
      }
    },
  });
  y = doc.lastAutoTable.finalY + 7;

  // ── Reserve Calculator ──
  if (y > 240) { doc.addPage(); y = 14; }
  sectionHead('Reserve Calculator');
  doc.autoTable({
    startY: y, margin: { left: M, right: M },
    theme: 'plain',
    styles: { fontSize: 8, cellPadding: [1.5, 2] },
    columnStyles: {
      0: { cellWidth: 62, fontStyle: 'bold', textColor: [100,116,139] },
      1: { cellWidth: 46, halign: 'right' },
      2: { cellWidth: 62, fontStyle: 'bold', textColor: [100,116,139] },
      3: { cellWidth: 46, halign: 'right' },
    },
    body: [
      ['Capture Timeframe',          r.rrCaptureDays + ' days',
       'Total Fixed Reserve (USD)',  r.fixedReserve ? fmt(r.fixedReserve) : '—'],
      ['Rolling Reserve %',          r.rrPct != null ? (r.rrPct * 100).toFixed(3) + '%' : '—',
       'Tranche 1',                  r.fixedReserve && r.t1pct ? fmt(r.fixedReserve * r.t1pct) : '—'],
      ['Daily Capture (USD)',        r.rrDaily != null ? fmt(r.rrDaily) : '—',
       'Tranche 2',                  r.fixedReserve && r.t2pct ? fmt(r.fixedReserve * r.t2pct) : '—'],
      ['Full Timeframe Capture (USD)', r.rrFull != null ? fmt(r.rrFull) : '—',
       'Tranche 3',                  r.fixedReserve && r.t3pct ? fmt(r.fixedReserve * r.t3pct) : '—'],
    ],
  });
  y = doc.lastAutoTable.finalY + 7;

  // ── Monthly Peak Exposure chart ──
  const canvas = document.getElementById('peakChart');
  if (canvas) {
    if (y > 220) { doc.addPage(); y = 14; }
    sectionHead('Monthly Peak Exposure');
    const imgData = canvas.toDataURL('image/png');
    const imgW    = pageW - M * 2;
    const imgH    = Math.min(imgW * canvas.height / canvas.width, 55);
    doc.addImage(imgData, 'PNG', M, y, imgW, imgH);
    y += imgH + 6;
  }

  // ── Save ──
  const safeName = companyName.replace(/[^\w\s\-]/g, '').trim() || 'Company';
  doc.save(safeName + '_Exposure Analysis.pdf');
}

// ── Render results ────────────────────────────────────────────────────────────
function renderResults(r) {
  document.getElementById('resultsPlaceholder').classList.add('hidden');
  document.getElementById('resultsContent').classList.remove('hidden');

  const isErr = r.totalExposure === 'ERROR';

  // KPIs
  document.getElementById('kpiTotalExposure').textContent = isErr ? 'ERROR' : fmt(r.totalExposure);
  document.getElementById('kpiWadd').textContent          = r.ndxDays === 'ERROR' ? 'ERROR' : (r.ndxDays.toFixed(1) + ' days');
  document.getElementById('kpiRrPct').textContent         = r.rrPct != null ? (r.rrPct * 100).toFixed(2) + '%' : '—';

  // Exposure breakdown table
  const tbody = document.getElementById('exposureTableBody');
  const tfoot = document.getElementById('exposureTableFoot');
  tbody.innerHTML = '';
  tfoot.innerHTML = '';

  function row(label, days, rate, exposure, cls = '') {
    return `<tr class="${cls}">
      <td>${label}</td>
      <td class="text-right">${days}</td>
      <td class="text-right">${rate}</td>
      <td class="text-right">${exposure === 'ERROR' ? '<span class="text-danger">ERROR</span>' : fmt(exposure)}</td>
    </tr>`;
  }

  // NDX row
  tbody.innerHTML += row(
    'Non-Delivery Exposure (NDX)',
    r.ndxDays === 'ERROR' ? 'ERROR' : r.ndxDays.toFixed(1) + ' days',
    '—',
    r.ndxExposure
  );

  // Per-MCC rows
  r.mccBreakdown.forEach(m => {
    tbody.innerHTML += row(
      `&nbsp;&nbsp;↳ MCC ${m.code || '—'} ${m.desc ? '(' + m.desc + ')' : ''}`,
      m.days + ' days',
      (m.pct).toFixed(1) + '%',
      m.exposure,
      'mcc-sub'
    );
  });

  tbody.innerHTML += row('Refund Exposure',    '30 days', fmtPct(r.refundRate), r.refundExposure);
  tbody.innerHTML += row('Chargeback Exposure','180 days', fmtPct(r.cbRate),    r.cbExposure);

  tfoot.innerHTML += row('Total Card Processing Exposure', '—', '—', r.totalCardExposure, 'row-total');

  if (r.isAch) {
    tbody.innerHTML += row('ACH – Non-Delivery Exposure',  r.ndxDays === 'ERROR' ? '≤60 days' : Math.min(r.ndxDays, 60).toFixed(0) + ' days', '—', r.achNdxExp);
    tbody.innerHTML += row('ACH – Unauthorised Returns',  '60 days', '—', r.achUnauth);
    tbody.innerHTML += row('ACH – Other Returns',         '2 days',  '—', r.achOther);
    tfoot.innerHTML += row('Total ACH Processing Exposure', '—', '—', r.totalAch, 'row-total');
  }

  if (r.isPayfac) {
    tbody.innerHTML += row('PayFac – Funds Due to Merchant Liability', '—', '—', r.payfacFundsDue);
    tbody.innerHTML += row('PayFac – Sub-Merchant Concentration Liability', '—', '—', r.payfacConc);
    tbody.innerHTML += row('PayFac – Discounted Exposure Reduction', '—', '—', -r.payfacDiscount);
    tfoot.innerHTML += row('Total PayFac Exposure', '—', '—', r.totalPayfac, 'row-total');
  }

  tfoot.innerHTML += row('TOTAL EXPOSURE', '—', '—', r.totalExposure, 'row-total');

  // Reserve Calculator
  document.getElementById('rrDays').textContent  = r.rrCaptureDays + ' days';
  document.getElementById('rrPct').textContent   = r.rrPct != null ? (r.rrPct * 100).toFixed(3) + '%' : '—';
  document.getElementById('rrDaily').textContent = r.rrDaily != null ? fmt(r.rrDaily) : '—';
  document.getElementById('rrFull').textContent  = r.rrFull  != null ? fmt(r.rrFull)  : '—';

  document.getElementById('fixedTotal').textContent = fmt(r.fixedReserve);
  document.getElementById('fixedT1').textContent    = r.fixedReserve ? fmt(r.fixedReserve * r.t1pct) : '—';
  document.getElementById('fixedT2').textContent    = r.fixedReserve ? fmt(r.fixedReserve * r.t2pct) : '—';
  document.getElementById('fixedT3').textContent    = r.fixedReserve ? fmt(r.fixedReserve * r.t3pct) : '—';

  // Peak chart
  renderChart(r.peakMonthly);
}

function renderChart(peakMonthly) {
  const ctx = document.getElementById('peakChart').getContext('2d');
  if (peakChart) peakChart.destroy();
  peakChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [{
        label: 'Peak Exposure (USD)',
        data: peakMonthly,
        backgroundColor: 'rgba(37,99,235,.2)',
        borderColor: 'rgba(37,99,235,.8)',
        borderWidth: 1.5,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          ticks: {
            callback: v => '$' + (v >= 1e6 ? (v/1e6).toFixed(1)+'M' : v >= 1e3 ? (v/1e3).toFixed(0)+'K' : v),
            font: { size: 11 }
          },
          grid: { color: '#F1F5F9' }
        },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

// ── Validation ───────────────────────────────────────────────────────────────
function validateInputs() {
  const errors = [];
  const apv = getNumVal('apv');
  if (!apv || apv <= 0) errors.push('Annual Processing Volume (USD) is required');

  const mccRows = getMccRows();
  if (mccRows.length === 0) {
    errors.push('At least one MCC code is required');
  } else {
    const mccSum = mccRows.reduce((s, r) => s + r.pct, 0);
    if (Math.abs(mccSum - 100) > 0.01) {
      errors.push(`Percentage of Annual Processing Volume must sum to 100% (currently ${mccSum.toFixed(1)}%)`);
    }
    mccRows.forEach((r, i) => {
      if (!r.code) errors.push(`MCC row ${i + 1}: MCC code is missing`);
    });
  }

  // Monthly validation – only fire when all 12 months are filled and mode-converted total ≠ APV
  const allMonthlyRaw = MONTHS.map(m => document.getElementById(`month${m}`)?.value?.trim() ?? '');
  const anyFilled = allMonthlyRaw.some(v => v !== '');
  if (anyFilled && apv > 0) {
    const allFilled = allMonthlyRaw.every(v => v !== '');
    if (allFilled) {
      const monthlyUsd = allMonthlyRaw.map(v => {
        const raw = parseFloat((v || '').replace(/,/g, '')) || 0;
        return monthlyMode === 'percent' ? (raw / 100) * apv : raw;
      });
      const monthlyTotal = monthlyUsd.reduce((a, b) => a + b, 0);
      if (Math.abs(monthlyTotal - apv) > 1) {
        const label = monthlyMode === 'percent' ? 'Monthly % inputs' : 'Monthly processing inputs';
        errors.push(`${label} total (${fmt(monthlyTotal)}) must equal Annual Processing Volume (${fmt(apv)}), or leave all months blank for automatic distribution`);
      }
    }
  }

  return errors;
}

function showValidation(errors) {
  document.getElementById('resultsPlaceholder').classList.add('hidden');
  document.getElementById('resultsContent').classList.add('hidden');
  const panel = document.getElementById('validationPanel');
  const list  = document.getElementById('validationList');
  list.innerHTML = errors.map(e => `<li>${e}</li>`).join('');
  panel.classList.remove('hidden');
}

function hideValidation() {
  document.getElementById('validationPanel').classList.add('hidden');
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load any previously imported MCC risk data from localStorage
  loadImportedMcc();

  buildMccHeaders();
  addMccRow(); // start with one MCC row
  buildMonthlyGrid();
  updateImportStatus();

  // Attach comma-formatting to all currency (dollar) inputs
  ['apv', 'netRevenue', 'htv', 'atv', 'sm1Vol', 'sm2Vol', 'subFixedReserve'].forEach(id => {
    attachCurrencyInput(document.getElementById(id));
  });
  MONTHS.forEach(m => attachCurrencyInput(document.getElementById(`month${m}`)));

  // Wire up CSV import button
  const riskInput = document.getElementById('riskCsvInput');
  if (riskInput) {
    riskInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const { count, error } = importRiskCsv(ev.target.result);
        const text = document.getElementById('riskImportText');
        if (error) {
          if (text) text.textContent = `Import failed: ${error}`;
        } else {
          updateImportStatus();
        }
        riskInput.value = ''; // allow re-import of same file
      };
      reader.readAsText(file);
    });
  }

  document.getElementById('addMccRow').addEventListener('click', addMccRow);

  // Monthly mode toggle
  document.querySelectorAll('input[name="monthlyMode"]').forEach(radio => {
    radio.addEventListener('change', e => setMonthlyMode(e.target.value));
  });
  // Recompute monthly USD preview when APV changes
  document.getElementById('apv').addEventListener('input', () => {
    if (monthlyMode === 'percent') updateMonthlyTotal();
  });

  document.getElementById('payfacEnabled').addEventListener('change', e => {
    document.getElementById('payfacFields').classList.toggle('hidden', !e.target.checked);
  });

  document.getElementById('monthlyEnabled').addEventListener('change', e => {
    const on = e.target.checked;
    document.getElementById('monthlyFields').classList.toggle('hidden', !on);
    if (!on) {
      // Clear values so they don't affect calculation when toggle is off
      MONTHS.forEach(m => { const inp = document.getElementById(`month${m}`); if (inp) inp.value = ''; });
      updateMonthlyTotal();
    }
  });

  document.getElementById('calcBtn').addEventListener('click', () => {
    const errors = validateInputs();
    if (errors.length) {
      showValidation(errors);
      return;
    }
    hideValidation();
    lastResult = calculate();
    renderResults(lastResult);
  });

  document.getElementById('downloadPdfBtn').addEventListener('click', generatePdf);
  document.getElementById('openLookerBtn').addEventListener('click', openLooker);

  // Enter key triggers Calculate Exposure from any input field
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA') return;
    document.getElementById('calcBtn').click();
  });
});
