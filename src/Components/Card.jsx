import { useState, Suspense } from 'react'
import { useEffect } from 'react'
// import ReactPaginate from 'react-paginate';
import '../../src/App.css'

 export default function Card() {
    const [planet, setPlanet] = useState([])
    const [id, setId]=useState(1)
   const [showmore, setShowmore]=useState(false);
 
    const [resident,setResident]=useState([])

useEffect(()=>{
  fetch(`https://swapi.dev/api/planets/${id}`).then(
  async (res)=>{
    let json= await res.json();
   setPlanet(json) 
  fetchResidents(json.residents);

})
 
},[id])

const fetchResidents = async (residentUrls) => {
    try {
      const residentData = await Promise.all(
        residentUrls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
      );
      setResident(residentData);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };
  
  return (
  <div  className='container'>
    
          <div key={planet.name} className="planet-card">
            <h2>{planet.name}</h2>
        <div> 
            <ul>
                <li>Climate: <span> {planet.climate}</span></li>
                <li>Population:  <span> {planet.population}</span></li>
                <li>Terrain: <span> {planet.terrain}</span> </li>
                <li>rotation_period: <span> {planet.rotation_period}</span></li>
                <li>orbital_period: <span> {planet.orbital_period}</span></li>
                <li>diameter: <span> {planet.diameter}</span></li>
         
                <li>gravity:<span> {planet.gravity}</span></li>
                <li>surface_water: <span> {planet.surface_water}</span></li>
                <li>population: <span> </span></li>
            </ul>
           
            </div>
       <Suspense fallback={"Loading... Please Wait"}><Resident resident={resident} showmore={showmore} setShowmore={setShowmore}></Resident></Suspense> 
          
          </div>
<div className='button'>  
<button  className="b" onClick={()=>setId(1)}>1</button>
<button className="b" onClick={()=>setId(2)}>2</button>
<button className="b" onClick={()=>setId(3)}>3</button>
<button className="b" onClick={()=>setId(4)}>4</button>
<button className="b" onClick={()=>setId(5)}>5</button>
<button className="b" onClick={()=>setId(6)}>6</button>
<button className="b" onClick={()=>setId(7)}>7</button>
<button className="b" onClick={()=>setId(8)}>8</button>
<button className="b" onClick={()=>setId(9)}>9</button>
<button className="b" onClick={()=>setId(10)}>10</button>
</div>

     
  </div>
  )
}

function Resident({resident, showmore ,setShowmore}){
  return (
    <>
<div className='resident'>
            <h3 className='rtitle'>Residents</h3>

            
               <table>
                <tr><th>Name</th>
                <th>Height</th>
                <th>Gender</th>
                <th>Mass</th></tr>
              {
            (resident.length===0)?(
                <p>No One lives here</p>

             ) :(
              <>
               
                  {showmore ? (
                      resident.slice(2).map((resident) => (
                      
                          <tr key={resident.name} className='details'>
                              <td> {resident.name}</td>
                              <td> {resident.height}</td>
                              <td> {resident.gender}</td>
                              <td> {resident.mass}</td> 
                          </tr>
                      ))
                  ) : (
                      resident.slice(0, 2).map((resident) => (
                        <tr key={resident.name} className='details'>
                        <td> {resident.name}</td>
                        <td> {resident.height}</td>
                        <td> {resident.gender}</td>
                        <td> {resident.mass}</td> 
                    </tr>
                      ))
                  )}
              </>
          )
         
          }
  </table>
  {
    resident.length>1 && (
      <button  className="btn" onClick={() => setShowmore(!showmore)}>
  {showmore ? "Show less" : "Show more"}
</button>
  )
    }
  



</div>
</>
  )       
}
