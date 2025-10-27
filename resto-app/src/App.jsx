import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'

import cafeMarker from './assets/cafe_marker.png'
import sitDownMarker from './assets/sit_down_marker.png'
import quickBiteMarker from './assets/quick_bites_marker.png'
import barSweetMarker from './assets/bar_sweets_marker.png'
import legendLabel from './assets/icons.png'

// for markers:
// {
//   geocode: [],
//   name: "",
//   order: "",
//   link: ""
//  },
export default function App() {
  // markers
  const cafes = [
    {
      geocode: [55.68541724492662, 12.55336129977171],
      // popUp: "Darcy's Kaffe",
      name: "Darcy's Kaffe",
      order: "naughty croissant w/ egg, egg plate, espresso tonic",
      link: "https://www.google.com/maps/place/Darcy%E2%80%99s+Kaffe/@55.6853205,12.5507059,17z/data=!3m1!4b1!4m6!3m5!1s0x465253a14fb73023:0xd41a80b6eb1d16c7!8m2!3d55.6853205!4d12.5532862!16s%2Fg%2F11gwjmrfp7?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      geocode: [55.67319545581444, 12.550160374026595],
      name: "Sing Tehus",
      order: "matcha tonic, matcha latte", 
      link: "https://www.google.com/maps/place/Sing+Tehus/@55.6731038,12.5480508,17z/data=!3m1!4b1!4m6!3m5!1s0x4652531178f07cf9:0x2b1fa600dca73e62!8m2!3d55.6731038!4d12.550142!16s%2Fg%2F11b6vf1wvb?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      geocode: [34.05827795810045, -118.29375958928999],
      name: "Stagger",
      order: "double matcha",
      link: "https://www.google.com/maps/place/STAGGER+COFFEE/@34.0580513,-118.2938582,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhADycTjuCAVomfQdd8ABgsE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAG0ilSzWKqz-zxwjUTSd5lkV196MA4IxnikBFXxPSwTudPpuYIziutB_cL1hXNO5WG2AC5JLY3X-e81lElQPrYQKUGgZ7rY9jkCxAfUR0O-6PydBfWkdexwvdmt-krHxLHL6haIUrh6jroj0L822%3Dw192-h195-k-no!7i2018!8i2043!4m11!1m2!2m1!1sstagger!3m7!1s0x80c2c7e33f50397b:0x485c939e8f280192!8m2!3d34.0581891!4d-118.2937274!10e9!15sCgdzdGFnZ2VyWgkiB3N0YWdnZXKSAQtjb2ZmZWVfc2hvcKoBPgoNL2cvMTF3ajR5bWQ3MRABMh4QASIaJzR5yQ9-hzUY_wr101q0hE9yha0zAySWBOcyCxACIgdzdGFnZ2Vy4AEA!16s%2Fg%2F11wj4ymd71?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      geocode: [34.052646433291265, -118.30216427225861],
      name: "rōk",
      order: "matcha duo, coconut matcha einspanner",
      link: "https://www.google.com/maps/place/r%C5%8Dk+coffee+and+tea/@34.0524553,-118.3048304,17z/data=!3m1!4b1!4m6!3m5!1s0x80c2b95de82d2fd7:0x3b8ad5cc622b02b4!8m2!3d34.0524509!4d-118.3022501!16s%2Fg%2F11yc5wy28w?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      geocode: [32.71422168659962, -117.15267478024377],
      name: "rikka fika",
      order: "matcha tonic",
      link: "https://www.google.com/maps/place/Rikka+Fika/@32.7140547,-117.1555984,17z/data=!3m2!4b1!5s0x80d9535f03ddb21d:0xd395573958ac06d0!4m6!3m5!1s0x80dbf9c62a2af19f:0xef86738827a48121!8m2!3d32.7140502!4d-117.1530181!16s%2Fg%2F11t5zmwtdn?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      geocode: [32.83079303534202, -117.13895923558215],
      name: "easy does it",
      order: "matcha cloud",
      link: "https://www.google.com/maps/place/Easy+Does+It/@32.8306533,-117.1389646,17z/data=!3m1!4b1!4m6!3m5!1s0x80dbfffc8100074b:0xbf4968d949e308ab!8m2!3d32.8306533!4d-117.1389646!16s%2Fg%2F11yf3txfnt?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      geocode: [33.733597099073606, -117.82796688940722],
      name: "ayer",
      order: "matcha two, salt bread",
      link: "https://maps.app.goo.gl/WDQZ9D5XhBS2SR478"
    },
    {
      geocode: [33.77485218186107, -117.98698187406323],
      name: "airoma",
      order: "matcha einspanner",
      link: "https://maps.app.goo.gl/dvEY3EadyRbMvLXb6"
    },
    {
      geocode: [33.83912794263376, -118.38489620776127],
      name: "tot",
      order: "tot cream latte",
      link: "https://maps.app.goo.gl/3oksqB8Ft7Wt8ca67"
    },
    {
      geocode: [33.8217159248481, -118.32874208749134],
      name: "first flight",
      order: "first flight matcha",
      link: "https://maps.app.goo.gl/mz6TWJ5t8hjiSNQK7"
    }
  ]
  const sitDowns = [
    {
      geocode: [32.71524235022209, -117.17052200264928],
      name: "animae",
      order: "wagyu fried rice, charred carrots, crispy potatoes, taiwanese chicken, turon espresso martini, turon tart",
      link: "https://maps.app.goo.gl/YKj8JWWJaPgpyoSt8"
    },
    {
      geocode: [32.90683819699924, -117.17349083343056],
      name: "charminar",
      order: "chicken 65, butter chicken, garlic naan, plain basmati rice",
      link: "https://maps.app.goo.gl/g13dhHfejKUb2ffo9"
    },
    {
      geocode: [32.80896698303918, -117.21550895356857],
      name: "sushi ota",
      order: "spicy scallop hand, dragon roll, crunchy salmon roll, diego roll",
      link: "https://maps.app.goo.gl/DFD4Xr1AqNYLGLSQ6"
    },
    {
      geocode: [32.73207529070352, -117.16019126421779],
      name: "kinme omakase",
      order: "N/A",
      link: "https://maps.app.goo.gl/NvZUFMqS5Lnj5oDs7"
    },
    {
      geocode: [32.83144673928631, -117.18344022003686],
      name: "mike's red tacos",
      order: "loaded fries, red quasadilla",
      link: "https://maps.app.goo.gl/P4swxL5vxRZB7hhA6"
    },
    {
      geocode: [34.04075030791584, -118.44297869417107],
      name: "killer noodle",
      order: "dry tokyo dandan (numb 3/spice 3), red mabo rice bowl",
      link: "https://maps.app.goo.gl/rpQYJ2FZwYwT6ei38"
    },
    {
      geocode: [33.85721898359246, -118.29878517893084],
      name: "aunty maile's",
      order: "chicken katsu, teriyaki chicken, kalbi short ribs",
      link: "https://maps.app.goo.gl/qSs7zWqqpsVZVih56"
    },
    {
      geocode: [33.863198571924215, -118.39967693289164],
      name: "ryla",
      order: "hokkaido milk bread, nashville spiced hot chicken karaage, mapo paccheri pasta, white sesame caesar salad, matcha tiramisu",
      link: "https://maps.app.goo.gl/oemfmH2nsKGpB3gD6"
    },
    {
      geocode: [37.78097564981987, -122.48166313054506],
      name: "aziza",
      order: "(brunch) shakshuka with kefta, spiced lebni yogurt, gebhrir pancakes",
      link: "https://maps.app.goo.gl/YRtCGBLixDg5yG1bA"
    },
    {
      geocode: [37.79832376969812, -122.41879496259544],
      name: "seven hills",
      order: "orecchiette, tomato braised polpette, mixed chicory salad, squid ink pasta",
      link: "https://maps.app.goo.gl/6LRJkaDmtksHYbpJA"
    },
    {
      geocode: [33.883008182888425, -118.409416818565],
      name: "rice",
      order: "portabello mushroom, orange kale salad, rising sun, double dragon roll, ",
      link: "https://maps.app.goo.gl/mJm6S9ejB52TqRTE6"
    },
    {
      geocode: [55.67238512701468, 12.589410051148759],
      name: "kadeu",
      order: "N/A",
      link: "https://maps.app.goo.gl/EWqbgUmdMU4QMmcQ9"
    },
    {
      geocode: [32.94169372449035, -117.19907020325704],
      name: "addison",
      order: "N/A",
      link: "https://maps.app.goo.gl/nRcxif3fj65CmK5VA"
    },
    {
      geocode: [52.50253931239788, 13.336838097579546],
      name: "963",
      order: "falafel nachos, baklava",
      link: "https://maps.app.goo.gl/S25GceyTMJbaL4ap9"
    },
    {
      geocode: [55.70681665726985, 13.18964327075492],
      name: "swedish express",
      order: "swedish meatballs",
      link: "https://maps.app.goo.gl/xKvFc9oCpiBq789q6"
    },
    {
      geocode: [55.68408085462478, 12.565017626989068],
      name: "pizzeria la fiorita",
      order: "tiramisu, carbonara",
      link: "https://maps.app.goo.gl/z9WFDC156nXdstvf9"
    },
    {
      geocode: [34.05973648684378, -118.41873697377079],
      name: "haidilao hot pot",
      order: "N/A",
      link: "https://maps.app.goo.gl/JqqJuVSTnhh7ydLZA"
    },
    {
      geocode: [33.89453238807768, -118.36089862959483],
      name: "al-noor",
      order: "garlic naan, tikka masala, tandoori chicken",
      link: "https://maps.app.goo.gl/zTpaiGtLktrZu5g29"
    },
    {
      geocode: [34.011759745885904, -118.47254602602997],
      name: "the win~dow at american beauty",
      order: "cheeseburger, french fries",
      link: "https://maps.app.goo.gl/y96f6XkT6X3hB3jy7"
    },
    {
      geocode: [34.07225395288255, -118.36731288726162],
      name: "oste",
      order: "xxtra pepperoni lovers, tiramisu, insalata di arugula",
      link: "https://maps.app.goo.gl/BsCNUpfWwrhXHi2m8"
    },
    {
      geocode: [53.96044431206125, -1.0808877018389036],
      name: "double dutch pancake house",
      order: "half ban, go nuts",
      link: "https://maps.app.goo.gl/qTfNwpoDTCPVXB1n6"
    },
    {
      geocode: [51.50953684372434, -0.13273005776662966],
      name: "fallow",
      order: "corn ribs, black & blue burger, fries, chelsea tart",
      link: "https://maps.app.goo.gl/5Xm2zV7bZ2T3dDvaA"
    },
    {
      geocode: [51.52633493139049, -0.07503830777351449],
      name: "dishoom",
      order: "chicken ruby, house black daal, dahi bhalla chaat",
      link: "https://maps.app.goo.gl/U9BiSucpsQeJychD8"
    },
    {
      geocode: [33.71623343348569, -117.93973597378145],
      name: "nep cafe",
      order: "seafood ceviche, spicy wontons, bahn mi chao, 5 spice chicken, ube coconut ale",
      link: "https://maps.app.goo.gl/UtMVEEGZsnPReBuw7"
    },
  ]
  const quickBites = [
    {
      geocode: [34.061880222512514, -118.23967118726196],
      name: "howlin' ray's",
      order: "medium tenders, shake fries",
      link: "https://maps.app.goo.gl/nMwiCeRFSKX5w8ph9"
    },
    {
      geocode: [33.84969500742013, -118.38885590261444],
      name: "jus poke",
      order: "(sides) rice, seaweed salad, pickled cucumbers; (poke) shoyu, hawaiian, spicy",
      link: "https://maps.app.goo.gl/BafsdckXRWkXmiVRA"
    },
    {
      geocode: [55.66885408701626, 12.558478574098116],
      name: "comé",
      order: "tempura black tiger shrimp, tuna spicy mayo, teriyaki chicken",
      link: "https://maps.app.goo.gl/fETaS7mbgTCXd8CF6"
    },
    {
      geocode: [33.90151103709341, -118.3817769510165],
      name: "erewhon",
      order: "bacon breakfast burrito",
      link: "https://maps.app.goo.gl/9xfWj9w94xtdYombA"
    },
    {
      geocode: [37.75536040605075, -122.42010075274396],
      name: "breakfast little",
      order: "the og with bacon",
      link: "https://maps.app.goo.gl/rubDQ3eC8jXUAmZ68"
    },
    {
      geocode: [37.756208081444626, -122.40677985645128],
      name: "newkirk's",
      order: "bec",
      link: "https://maps.app.goo.gl/Ahs9ZLgsA114ia3m8"
    },
    {
      geocode: [52.52029868155315, 13.388111933021092],
      name: "pergamon döner",
      order: "doner kebab",
      link: "https://maps.app.goo.gl/TxaZuBfFEAms4Vqz9"
    },
    {
      geocode: [32.870451614150625, -117.23355076414101],
      name: "calvin's korean fried chicken",
      order: "garlicky soy, devil garlic",
      link: "https://maps.app.goo.gl/HVPp6DYpWLybBMuD9"
    },
    {
      geocode: [33.91484159401279, -118.39550753862596],
      name: "phanny's",
      order: "bacon egg burrito",
      link: "https://maps.app.goo.gl/XYoa6Dei9CCMT37cA"
    },
  ]
  const barSweets = [
    {
      geocode: [55.675884284181805, 12.544773036825497],
      name: "bird",
      order: "bird punch, jetlag, paradise martini",
      link: "https://maps.app.goo.gl/Z1rbiDthLvLLkc4f8"
    },
    {
      geocode: [51.51316101058006, -0.12605950194761972],
      name: "arôme",
      order: "pistachio chocolate escargot, almond croissant, arôme honey butter toast, sausage & cheese croissant",
      link: "https://maps.app.goo.gl/H4tDkd2ygyijC5Ux5"
    },
    {
      geocode: [52.508810562141996, 13.373077686458416],
      name: "posh bar",
      order: "the drinks i ordered are no longer available naurr",
      link: "https://maps.app.goo.gl/ZCnF8CoNTmbRwiYU6"
    },
    {
      geocode: [55.66745801006991, 12.579241701429991],
      name: "andersen bakery",
      order: "almond croissant, andersen signature",
      link: "https://maps.app.goo.gl/yg6Tr75vigEYpBbV7"
    },
    {
      geocode: [55.70619960812949, 12.581815198240776],
      name: "juno the bakery",
      order: "almond croissant, cardamom bun",
      link: "https://maps.app.goo.gl/vJNRqu1nxkyjGVM6A"
    },
    {
      geocode: [32.81830946977587, -117.15573614497268],
      name: "mngo cafe",
      order: "mngo sago, creme brulee, oh-man-go",
      link: "https://maps.app.goo.gl/Le98ZW61y3LnFQcS6"
    },
    {
      geocode: [37.78613123174917, -122.40399013190796],
      name: "heytea",
      order: "coconut mango boom, grape cloud",
      link: "https://maps.app.goo.gl/1oHaVUK2crZPnZsH7"
    },
    {
      geocode: [32.833405281145254, -117.14992801798971],
      name: "yiko yiko",
      order: "strawberry snowball mochi, mango snowball mochi, green tea mochi ball",
      link: "https://maps.app.goo.gl/n8Zx8Bv4uiR5eRx88"
    },
    {
      geocode: [32.842726542511315, -117.14776034596277],
      name: "matcha cafe maiko",
      order: "maiko special (matcha soft serve), matcha latte float (ube soft serve)",
      link: "https://maps.app.goo.gl/ZEoxp5LjZn5FegNTA"
    },
    {
      geocode: [37.76206252310387, -122.42412338630548],
      name: "arsicault bakery",
      order: "kouign amann, almond croissant",
      link: "https://maps.app.goo.gl/9spqBMGrZJXK98bV7"
    },
  ]

  // icons of markers
  const cafeIcon = new Icon({
    iconUrl: cafeMarker,
    iconSize: [30, 30]
  })
  const sitDownIcon = new Icon({
    iconUrl: sitDownMarker,
    iconSize: [30, 30]
  })
  const quickBitesIcon = new Icon({
    iconUrl: quickBiteMarker,
    iconSize: [30, 30]
  })
  const barSweetsIcon = new Icon({
    iconUrl: barSweetMarker,
    iconSize: [30, 30]
  })

  return (
    <>
    {/* center is positioned in Lisbon lol */}
    <MapContainer center={[38.95083510316075, -8.157920283441628]} zoom={1.5}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* to place markers on map:  */}
      {cafes.map((cafe) => (
        <Marker position={cafe.geocode} icon={cafeIcon}>
          <Popup>
            <div>
              <a 
                href={cafe.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                {cafe.name}
              </a>
            </div>
            <b>order:</b> {cafe.order}
          </Popup>
        </Marker>
      ))}
      {sitDowns.map((sit) =>(
        <Marker position={sit.geocode} icon={sitDownIcon}>
        <Popup>
          <div>
            <a 
              href={sit.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {sit.name}
            </a>
          </div>
          <b>order:</b> {sit.order}
        </Popup>
      </Marker>
      ))}
      {quickBites.map((quick) =>(
        <Marker position={quick.geocode} icon={quickBitesIcon}>
        <Popup>
          <div>
            <a 
              href={quick.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {quick.name}
            </a>
          </div>
          <b>order:</b> {quick.order}
        </Popup>
      </Marker>
      ))}

      {barSweets.map((barSweet) =>(
        <Marker position={barSweet.geocode} icon={barSweetsIcon}>
        <Popup>
          <div>
            <a 
              href={barSweet.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {barSweet.name}
            </a>
          </div>
          <b>order:</b> {barSweet.order}
        </Popup>
      </Marker>
      ))}
    </MapContainer>

    <img className= "lgnd_label" src={legendLabel} alt="label for map" />
    </>
  )
}

// export default App
