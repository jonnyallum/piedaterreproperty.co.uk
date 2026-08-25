/**
 * Raw authored town content (prompt 07). Kept in its own file so the loader
 * (pages.ts) validates it at the module boundary and a thin or malformed page
 * fails the build rather than diluting the site.
 *
 * House rules for anyone editing this file:
 *
 * 1. No invented statistics. Every figure must be traceable. Where a number
 *    would help but is not sourced, write the qualitative version instead and
 *    leave a [CONFIRM] note for Charisma.
 * 2. No sentence may appear on two towns with only the name swapped. These
 *    pages exist to prove fifteen years of local knowledge, and a template
 *    destroys that claim faster than having no page at all.
 * 3. Only geographic and structural facts, named places, and honest qualitative
 *    market observation. No school ratings, which date. No price claims.
 */
import type { AreaContent } from './schema'

export const AREA_CONTENT: AreaContent[] = [
  // ---------------------------------------------------------------- Havant
  {
    slug: 'havant',
    name: 'Havant',
    metaTitle: 'Estate and letting agents in Havant',
    metaDescription:
      'Independent estate and letting agents in Havant. Real knowledge of the old town, Bedhampton, Langstone and Leigh Park, from a firm based minutes away.',
    h1: 'Estate and letting agents in Havant',
    intro:
      'Havant is a working market town rather than a picture postcard one, and it is the better for it. Four old streets meeting at the parish church, a station that goes almost everywhere, and Langstone Harbour ten minutes down the road.',
    housingStock: [
      'The oldest stock sits in the four streets around the parish church. East Street, West Street, North Street and South Street hold Georgian and early Victorian brick, some of it listed, most of it small by modern standards and tightly held when it does come up. The Homewell spring behind South Street is a reminder that this was a parchment town long before it was a commuter one.',
      'Push out from the centre and the pattern changes quickly. Bedhampton keeps a handful of genuinely old cottages around the church and the Old Manor, then gives way to interwar semis climbing towards Portsdown Hill. Bay fronted 1930s houses run along the older residential roads towards Warblington, and those are the ones families ask us for by name.',
      'North of the railway, Leigh Park is a different proposition again: a very large planned post war estate, mostly houses rather than flats, with gardens that would cost a great deal anywhere closer to the water. It is the most misunderstood part of our patch. Some roads let in days and some sit, and the difference is street by street rather than area wide.',
      'Langstone itself, at the southern edge, is the outlier. Waterside cottages along the shore, the mill, and a small number of houses looking over the harbour towards Hayling. There are very few of them and they rarely reach an open market.',
    ],
    whoMovesHere: [
      'Commuters dominate, and the station is the reason. Havant is a junction rather than a stop, which means direct trains to London Waterloo, straight through to Portsmouth Harbour, and the West Coastway east to Chichester, Worthing and Brighton. People who have to be in two of those places in one week end up living here.',
      'The second group are families who looked at Emsworth first. Havant buys more house and more garden for the same money, and the walk to a primary school is usually shorter. We see that move most often when a second child arrives.',
      'The third are downsizers coming off Hayling Island or out of larger houses in the villages, who want a flat, walkable centre with a doctor, a chemist and a train in it. The newer apartment schemes near the Meridian Centre exist almost entirely for that buyer.',
    ],
    gettingAround: [
      'Havant station carries the Portsmouth Direct line to London Waterloo and the West Coastway to Chichester and Brighton, so the town is unusual in having fast services in three directions from one set of platforms. Bedhampton station, one stop west, is quieter and useful if you live on that side.',
      'For drivers, junction 5 of the A3(M) sits at the top of the town and the A27 runs east to west just south of the centre, which puts Chichester, Fareham and the M27 within an easy run. The trade off is that the A27 also carries the summer traffic heading for Hayling, and the Langstone roundabout is where you notice it.',
      'Locally, buses run up to Leigh Park and Waterlooville and down to Hayling. The Hayling Billy Trail starts at Langstone and gives a traffic free route south for cyclists and walkers.',
    ],
    schoolsAndAmenities: [
      'Primary provision is spread across the town, with schools serving the centre, Bedhampton, Warblington and the Leigh Park side rather than one dominant catchment. Warblington School and Havant Academy are the main state secondaries, and Oaklands Catholic School in Waterlooville draws families from this side of the borough too.',
      'Havant and South Downs College has a campus on New Road, which matters for sixth form choices without a commute. Queen Alexandra Hospital in Cosham is the nearest general hospital and a significant employer for people living here.',
      'Day to day, the Meridian Centre and the surviving independents on East Street cover the basics, and there is a street market in the old town. For open space, Havant Park sits behind the centre, Staunton Country Park is on the Leigh Park side, and the foreshore path runs out past Warblington church towards Emsworth.',
    ],
    marketNotes: [
      'Havant behaves like two markets in one postcode. Anything walkable to the station and the old town moves quickly in both sales and lettings, and rental demand there is consistent through the year rather than seasonal. Family houses with parking and a real garden also let fast, because the competing stock in Portsmouth mostly has neither.',
      'What sits is stock priced as though it were Emsworth, and upper floor flats without allocated parking. Both are correctable with honest pricing rather than more advertising, which is a conversation we would rather have at the valuation than three months later.',
      '[CONFIRM: whether Charisma wants indicative achieved rent and price ranges for PO9 published here, and if so the source. We will not publish figures we cannot attribute.]',
    ],
    postcodes: ['PO9'],
    nearby: ['emsworth', 'hayling-island'],
  },

  // ------------------------------------------------------------ Portsmouth
  {
    slug: 'portsmouth',
    name: 'Portsmouth',
    metaTitle: 'Letting and estate agents in Portsmouth',
    metaDescription:
      'Letting and estate agents covering Portsmouth, from Southsea and Old Portsmouth to Fratton, Copnor, Cosham and Drayton. Independent, local and honest on value.',
    h1: 'Letting and estate agents in Portsmouth',
    intro:
      'Portsmouth is an island city and it is built like one. Land ran out early, so the answer was to build tight, build up and build again, and almost every decision about property here follows from that.',
    housingStock: [
      'The bulk of Portsea Island is Victorian and Edwardian terracing, and the differences between one terrace and the next are real. Fratton, Copnor, Baffins and North End are largely bay fronted two and three bedroom houses with small rear gardens, built for dockyard families. Milton has the same period stock on slightly wider plots. The bay itself, the tile pattern and whether there is a side return will change what a house is worth more than the postcode does.',
      'Southsea is the exception. Regency and early Victorian villas and terraces around Clarendon Road, Osborne Road and Palmerston Road, much of it long since converted into flats and maisonettes, with high ceilings, sash windows and the maintenance liabilities that come with both. This is where most of the city period flat market sits.',
      'Old Portsmouth is a small and separate world: Georgian houses on High Street and Lombard Street, the Camber and Spice Island, and almost no supply. At the other end of the age range, Gunwharf Quays and the harbourside schemes brought a genuine apartment market to the city, with service charges to match.',
      'Somers Town, Landport and Portsea carry the post war and 1960s rebuild, including tower blocks. The mainland side is different again: Cosham and Drayton are largely interwar and post war semis on the slope of Portsdown Hill, Paulsgrove is a large post war estate, and Port Solent is a purpose built marina development.',
    ],
    whoMovesHere: [
      'Portsmouth has an unusually reliable tenant base and it comes from four places at once: the University of Portsmouth in and around the city centre, the naval base and its supply chain, Queen Alexandra Hospital in Cosham, and the ferry port. Those are four different tenant profiles with four different requirements, and a landlord who understands which one a property actually suits does considerably better than one who advertises to all of them.',
      'Buyers fall into first time buyers who want to stay on the island, sailors and second home owners who want Southsea or Old Portsmouth specifically, and investors. Families more often move out than in, usually north to Drayton, Waterlooville or Havant, once a second bedroom stops being enough.',
      'The pattern we see most is the move from a Southsea flat to a Copnor or Baffins terrace, then out to the mainland. It is the standard local ladder, and it is the reason our lettings and sales books overlap so heavily in this city.',
    ],
    gettingAround: [
      'Five stations serve the city: Portsmouth Harbour at the very end of the line, Portsmouth and Southsea in the centre, Fratton, Hilsea and Cosham on the mainland edge. Between them they give direct services to London Waterloo, London Victoria by way of the coastway, Southampton and Brighton.',
      'By road, the M275 spur drops into the city from the M27 and the A27 runs across the top of Portsdown Hill. The thing to understand is that everything leaves the island by one of three crossings, so a problem on any of them is a problem for the whole city. Parking is a genuine factor in what a terraced house is worth: a resident permit zone or an off street space changes the rent it achieves.',
      'For the water, the Isle of Wight car ferry and the Gosport ferry run from the Hard, the hovercraft goes from Southsea Common, and the Hayling Ferry crosses from Eastney.',
    ],
    schoolsAndAmenities: [
      'The University of Portsmouth is spread through the centre and shapes the rental calendar around it. State secondaries include Admiral Lord Nelson School in Baffins, Mayfield School in North End and Priory School in Southsea. Independent options are The Portsmouth Grammar School in Old Portsmouth and Portsmouth High School in Southsea.',
      'Queen Alexandra Hospital in Cosham serves the whole of our patch rather than just the city, and its shift patterns are a real influence on where its staff choose to rent.',
      'For everything else: Gunwharf Quays and Commercial Road for shopping, Palmerston Road for Southsea, Albert Road for independents and the theatres, Southsea Common and Canoe Lake for open space, and the Historic Dockyard and the seafront for the reason most people visit in the first place.',
    ],
    marketNotes: [
      'Lettings here are seasonal in a way the rest of our patch is not. The student cycle pulls the centre and Southsea forward into the summer, while naval and hospital demand runs steadily all year, so a property marketed on the wrong calendar can look weak when it is simply early.',
      'On sales, well presented terraces in the established family roads of Copnor, Baffins and Milton continue to find buyers quickly. What sits is converted flats without parking, and anything where the freehold position, the lease length or the cladding position is unclear at the point of listing. Getting that paperwork straight before going live is worth more than any amount of portal spend.',
      '[CONFIRM: whether to publish indicative rent ranges by property type for PO1 to PO6, and the source. Portal averages are not a source we are willing to cite as fact.]',
    ],
    postcodes: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6'],
    nearby: ['havant', 'waterlooville'],
  },

  // --------------------------------------------------------- Waterlooville
  {
    slug: 'waterlooville',
    name: 'Waterlooville',
    metaTitle: 'Letting and estate agents in Waterlooville',
    metaDescription:
      'Letting and estate agents in Waterlooville, Cowplain, Lovedean, Purbrook and Denmead. Local agents who will tell you plainly what a home here will let for.',
    h1: 'Letting and estate agents in Waterlooville',
    intro:
      'Waterlooville is a young town by Hampshire standards. It grew from a crossroads and a coaching inn on the London road, which is why the housing here is measured in decades rather than centuries, and why the gardens are the size they are.',
    housingStock: [
      'There is almost nothing here from before the Victorian period, and that is the single most useful fact about the town. What you find instead is interwar and post war housing in quantity: semis and short terraces along Hulbert Road, Milton Road and the older residential streets off London Road, then successive waves of estate building through the 1960s, 1970s and 1980s outwards through Cowplain, Lovedean and Purbrook.',
      'Bungalows are a genuine speciality of this area rather than an afterthought, and there are far more of them here than anywhere else we cover. That makes Waterlooville and Cowplain the natural landing place for people downsizing off Hayling Island or out of large houses in the villages, and it keeps demand for a good bungalow consistently ahead of supply.',
      'Purbrook and Widley hold the older and more varied stock, running up the slope towards Portsdown Hill, with some larger houses and longer plots. Denmead sits apart from the town proper and keeps a village character, with detached family housing around it.',
      'The newest layer is the Berewood and West of Waterlooville development on the Denmead side, which has added a large volume of modern family housing with the estate management charges that usually accompany it. It is a distinct market with its own rhythm, and a modern house there does not compete with a 1970s house in Cowplain even at the same asking figure.',
    ],
    whoMovesHere: [
      'The dominant move into Waterlooville is out of Portsmouth. Families who want a driveway, a garden and a garage, and who have decided that the trade off for those things is a drive rather than a walk to the station. That decision is made once and it is rarely reversed, which is why family houses here hold their tenants and their owners for a long time.',
      'The second group are people working at Queen Alexandra Hospital or on the Portsmouth business parks, for whom the run over Portsdown Hill is short and predictable in a way that a cross city commute is not.',
      'The third are downsizers, and specifically bungalow buyers, who want level access, no stairs and a garden they can still manage. This is a larger part of our lettings and sales work here than most people expect.',
    ],
    gettingAround: [
      'The most important thing to say about Waterlooville is that it has no railway station, and anyone who tells you otherwise is thinking of Havant. The nearest stations are Havant and Bedhampton, both a short drive or a bus ride, with Rowlands Castle offering a quieter route towards London.',
      'The road network is the compensation. Junctions 2 and 3 of the A3(M) sit either side of the town, the A3 London Road runs straight through it, and Portsdown Hill Road drops over the ridge into Cosham and the city. Northbound, the A3 runs past Queen Elizabeth Country Park towards Petersfield and Guildford.',
      'Buses run frequently along London Road between Horndean, Waterlooville and Portsmouth, which makes properties on that corridor genuinely lettable to tenants without a car. Away from the corridor, parking provision is part of the valuation rather than a detail.',
    ],
    schoolsAndAmenities: [
      'Secondary provision is a real draw and one of the reasons families make the move. Oaklands Catholic School and Sixth Form is in Waterlooville, Crookhorn College sits to the south, Purbrook Park School serves Purbrook and Widley, and Horndean Technology College takes families from the northern edge. Cowplain and the newer Berewood development both have their own primary schools.',
      'Havant and South Downs College has its South Downs campus here, which keeps sixth form and vocational study local rather than a bus ride away.',
      'The town centre is a precinct rather than a high street, with Wellington Way, the shopping centre and two large supermarkets within a short distance. For open space, Staunton Country Park is just south, Queen Elizabeth Country Park is a short run up the A3, and Portsdown Hill gives the view over the whole harbour that most people move here having seen at least once.',
    ],
    marketNotes: [
      'Family houses with parking and a garden are the strongest part of this market in both sales and lettings, and good bungalows are the scarcest thing in it. Where we see a property stick, it is usually a three bedroom house presented as though it were competing with the new build stock at Berewood, when the buyer or tenant looking at it is making a completely different comparison.',
      'The London Road corridor and anything within a walk of the precinct lets well to tenants without a car. Further out on the estates, off street parking stops being a nice extra and becomes the thing the enquiry turns on.',
      '[CONFIRM: whether Charisma wants indicative rent ranges for PO7 and PO8 by bedroom count published, and the source for them.]',
    ],
    postcodes: ['PO7', 'PO8'],
    nearby: ['havant', 'portsmouth'],
  },

  // ------------------------------------------------------------- Emsworth
  {
    slug: 'emsworth',
    name: 'Emsworth',
    metaTitle: 'Estate and letting agents in Emsworth',
    metaDescription:
      'Estate and letting agents in Emsworth. We know the quay, the mill ponds and the conservation area streets, and why so little of it reaches the open market.',
    h1: 'Estate and letting agents in Emsworth',
    intro:
      'Emsworth is a tidal harbour village on the Hampshire and Sussex border, at the top of Chichester Harbour. It was an oyster town, then a quiet one, and it is now the most competitive small market on our patch.',
    housingStock: [
      'The centre is a conservation area and it behaves like one. Georgian and early Victorian brick along High Street, Queen Street, King Street and Tower Street, much of it two and three storeys straight onto the pavement, with the constraints on alteration that listing and conservation status bring. Buyers who have not owned a period house before should understand those constraints before they offer rather than afterwards.',
      'Nearer the water, the stock changes to former fishermen and workers cottages around the quay and the two mill ponds. These are small, characterful and almost always bought on the strength of the view or the walk rather than the floor area.',
      'The larger houses sit on the roads running south and east towards the harbour edge and out along Bath Road and Thorney Road, including a number of substantial Victorian and Edwardian family houses with real gardens. This is the part of the village where sales are most often agreed quietly.',
      'North of the main road and out towards Southbourne and Westbourne, the housing is largely twentieth century: interwar and post war semis and detached family homes. It is where most of the practical family stock actually is, and it is consistently underestimated by people who only look at the pretty streets.',
    ],
    whoMovesHere: [
      'Downsizers and retirees from London and the Home Counties are a significant part of demand, and many of them arrive having sailed here first. The two sailing clubs are not incidental to the property market in this village, they are a large part of why people choose it over the equally pretty ones inland.',
      'Alongside them are commuters who need Chichester or Portsmouth and are prepared to pay for a walk to the station, and families who want a village primary and a harbour footpath rather than a bigger garden.',
      'The second home and holiday buyer is present but far less dominant than on Hayling. The practical effect on the rental side is that good long let stock is genuinely scarce here, and a well presented house does not usually need to be advertised twice.',
    ],
    gettingAround: [
      'Emsworth station sits on the West Coastway line, with Chichester a short run east and Havant one stop west for the fast London Waterloo services. That combination, a village station plus a junction one stop away, is unusual and is a large part of what the village costs.',
      'The A27 runs just north of the village, giving Portsmouth in one direction and Chichester and Arundel in the other, with the A3(M) reached through Havant. Within the village the point is that you do not need the car: most of the conservation area is within a walk of the square, the quay and the station.',
      'On foot, the Chichester Harbour path runs west past Nore Barn Woods towards Warblington and Langstone, and east along the shore towards Thorney Island. That walk is the single most effective piece of marketing this village has.',
    ],
    schoolsAndAmenities: [
      'The village has its own primary school. For secondary, families look to Bourne Community College in Southbourne, Warblington School in Havant, or across the county boundary into the Chichester schools, and the independent options in Chichester and Portsmouth draw from here as well.',
      'Emsworth supports an unusual number of genuine independents for its size: delicatessens, butchers, bakers and restaurants along High Street and Queen Street, a square that still works as a square, and a regular farmers market. The museum sits by the town mill.',
      'For open space and water there is the quay itself, Slipper Mill Pond and the Town Millpond, Nore Barn Woods at the western edge, and the harbour foreshore in both directions. Chichester Harbour is an Area of Outstanding Natural Beauty, which is both the attraction and the reason new development inside the village is so limited.',
    ],
    marketNotes: [
      'Supply is the whole story in Emsworth. The conservation area and the harbour designation together mean very little is built, so the market is made almost entirely of existing stock changing hands. Good houses within a walk of the square attract competing interest, and a meaningful share of sales here are agreed before they are widely advertised.',
      'On lettings, long let stock is scarce and tenants who secure a good house here tend to stay, which suits landlords looking for stability rather than turnover. Where property does sit, it is almost always a period house where the maintenance position, or the extent of what can lawfully be altered, was not made clear at the outset.',
      'We would rather tell a seller here that their house needs two weeks of preparation than list it immediately, because in a village this small a stale listing is visible to everyone.',
      '[CONFIRM: whether Charisma wants indicative PO10 price and rent ranges published, and the source. Portal averages are not acceptable as a citation.]',
    ],
    postcodes: ['PO10'],
    nearby: ['havant', 'hayling-island'],
  },

  // -------------------------------------------------------- Hayling Island
  {
    slug: 'hayling-island',
    name: 'Hayling Island',
    metaTitle: 'Estate and letting agents on Hayling Island',
    metaDescription:
      'Estate and letting agents for Hayling Island, from Mengham and Eastoke to Northney and Sandy Point. Straight advice on bungalows, beach houses and the bridge.',
    h1: 'Estate and letting agents on Hayling Island',
    intro:
      'Hayling Island is reached by one bridge, and almost everything about living here follows from that single fact: the pace, the summer traffic, the beach at the end of the road, and the kind of person who decides it is worth it.',
    housingStock: [
      'This is a twentieth century island. Bungalows and chalet bungalows are the defining type, particularly through South Hayling, Mengham and Eastoke, alongside the 1930s to 1960s houses built when the island became a holiday destination. Anyone expecting Victorian terracing will not find it here, and that is precisely why downsizers do find it.',
      'The waterside stock is the other half of the market. Houses along the sea front and the roads running down to the shore, plus the newer apartments and houses at Beachlands, are bought for the view and the access rather than the room count, and they are valued accordingly.',
      'North Hayling is quieter and older in feel, with a scattering of cottages and farm buildings around the parish church at Northney and a marina at the top of the island. It is a genuinely different place from the seafront end, and people who have only ever visited the beach are usually surprised by it.',
      'There is also a substantial park home and holiday accommodation presence, which sits alongside the residential market rather than inside it. It matters for two practical reasons: it shapes what the roads feel like in August, and it means we are frequently asked whether a property can be holiday let. The answer depends on the title, the planning position and any covenant, and it should be checked before purchase rather than after.',
    ],
    whoMovesHere: [
      'Retirees and downsizers are the largest single group, drawn by level access, single storey living and a beach they can walk to. The bungalow stock and that buyer are the reason the island market has the shape it does.',
      'The second group are people who sail, windsurf or paddle. The sailing club is at the eastern tip and Sandy Point is well known within windsurfing as one of the sport early British homes. That community brings a steady flow of buyers who are looking at the water first and the house second.',
      'The third are second home and holiday let owners, and the fourth are families who accept a longer school and work run in exchange for the childhood the island offers. We would always rather a buyer in that last group drove the bridge at half past eight on a weekday before committing.',
    ],
    gettingAround: [
      'The Langstone Bridge is the only road on and off the island, and it is right to be plain about it. At peak times and on hot summer weekends the queue back from the bridge is a real and recurring feature of life here, and anyone valuing a property or planning a commute should factor it in honestly rather than discover it later.',
      'Havant station is a few miles north of the bridge for the London Waterloo and coastway services, and buses run from the island up to Havant. The Hayling Ferry crosses to Eastney for foot passengers and cyclists, which is much the quickest way into Portsmouth without a car when it is running.',
      'The Hayling Billy Trail follows the route of the old branch railway up the western side of the island to Langstone, and gives a traffic free walking and cycling link that is one of the island genuine assets.',
    ],
    schoolsAndAmenities: [
      'Primary provision is on the island, with junior and infant schools serving Mengham and Mill Rythe, and Hayling College provides secondary education locally. Havant and Emsworth schools also take island families, particularly at sixth form.',
      'Mengham is the practical centre for shops, with the parade around Elm Grove covering everyday needs, and Havant is the destination for anything larger. Beachlands is the seafront focus, with the funfair, the beach huts and the cafes.',
      'For open space, the island is largely made of it: the shingle beach along the southern shore, the common and golf course at the western end, the nature reserve at Sandy Point, and the harbour side paths on the northern shore looking back towards Langstone and Emsworth.',
    ],
    marketNotes: [
      'The island market is more seasonal than anywhere else we cover. Interest rises sharply with the weather, which flatters spring and summer listings and punishes anything that comes to market in November without a clear reason to look at it.',
      'Bungalows in good order and anything with a genuine water outlook are the strongest stock in both sales and lettings. What sits is property priced on a summer viewing in a winter market, and houses where the flood risk position, the insurance history or the holiday let permission has not been established before listing. Those three questions come up here far more often than anywhere else on our patch, and having the answers ready is worth more than any amount of marketing.',
      '[CONFIRM: whether Charisma wants indicative PO11 figures published, and separately whether the firm will take on holiday let management or is long lets only. Both are asked at almost every island valuation.]',
    ],
    postcodes: ['PO11'],
    nearby: ['havant', 'emsworth'],
  },
]
