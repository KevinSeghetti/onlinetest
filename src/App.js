import React,{useState} from 'react';
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import './App.css';

const DisplayImageList = ({imageData}) =>
{
    if(imageData.data)
    {
        const rows = imageData.data.map( (entry,index) =>
        {
            //let url =<img src="https://media3.giphy.com/media/tJU72w9lPzUPe/200.gif?cid=ecf05e47zjcyo52jtpwog4ifxxcho8fjlcznike8sutufmsw&rid=200.gif" alt="react" className="logo"/>
            let image = entry.images.fixed_width_small
            return <Col key={entry.id} className="Trending">
                    <img src={image.url} width={image.width} height={image.height} alt={entry.title} />
                </Col>
        }
        )

        return (
            <div>
                <Row>
                    {rows }
                </Row>
        </div>
        )
    }
    return "<h2>Loading<h2>"

}

DisplayImageList.propTypes = {
    imageData: PropTypes.object.isRequired,
}

// <img src="https://media3.giphy.com/media/tJU72w9lPzUPe/200.gif?cid=ecf05e47zjcyo52jtpwog4ifxxcho8fjlcznike8sutufmsw&rid=200.gif" alt="react" className="logo"/>
const api_key = '5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f'
const trendingUrl = 'http://api.giphy.com/v1/gifs/trending'

const InitialLoad = (urlRoot,setTrendingData) =>
{

    let url = `${urlRoot}?api_key=${api_key}&limit=25`
    console.log(url)

    fetch(`${trendingUrl}?api_key=${api_key}`
   )
  .then(response => response.json())
  .then(data =>
    {
        console.log(data)
        setTrendingData(data)

    });
}

function App() {

  let [trendingData,setTrendingData] = useState({})
  let [searchData,setSearchData] = useState({})

  if(!trendingData.data)
  {
      InitialLoad(trendingUrl,setTrendingData)
  }
  return (
    <div className="App">
        <h2>Trending Gifs!!</h2>
          <DisplayImageList imageData={trendingData}/>
          <InputGroup className="mb-3">
             <InputGroup.Prepend>
               <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
             </InputGroup.Prepend>
             <FormControl
               placeholder="Search String"
               aria-label="Search string"
              onEnter= {
                  console.log("###")
              }
             />
          </InputGroup>
              <h2>Search Results</h2>

          <DisplayImageList imageData={searchData}/>

          <br />

    </div>
  );
}

export default App;
