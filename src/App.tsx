import React, { ReactElement, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

import databaseSVG from './images/database.svg';
import securitySVG from './images/security-on.svg';

import { ArchieComponent } from './graph/ArchieComponent';

function App() {

  const d3Container = useRef(null)

  const buildGraph = async () => {

    if (!d3Container.current) return;

    d3.select(d3Container.current).selectAll("*").remove();

    // Set up the SVG container
    const svg = d3.select(d3Container.current)
      .append('svg')
      .attr('width', 1000)
      .attr('height', 1000);

    const embeddingsComp = new ArchieComponent({ top: 25, left: 25 }, {icon: databaseSVG, label: "Embeddings", sublabel: "VectorDB"})
    const authComp = new ArchieComponent({ top: 25, left: 25 + embeddingsComp.getDimensions().width + 24 }, {icon: securitySVG, label: "Authorization"})
    
    embeddingsComp.render(svg, d3Container)
    authComp.render(svg, d3Container)

    

  }

  useEffect(() => {

    buildGraph()

  }, [])

  return (
    <div className="App">
      {/* <ArchieComponent icon={<DBSVG />} title="Embeddings" subtitle="Vector DB" /> */}
      <div className='graph' ref={d3Container}>

      </div>
    </div>
  );
}

// function ArchieComponent(props: { icon: ReactElement<any, any>, title: string, subtitle?: string }) {

//   return (
//     <div className='archie-component'>
//       <div className='icon-container'>{props.icon}</div>
//       <div className='text-container'>
//         <div className='title'>Embeddings</div>
//         <div className='subtitle'>Vector DB</div>
//       </div>
//     </div>
//   )
// }

export default App;
