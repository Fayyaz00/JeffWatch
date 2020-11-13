import { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

//https://observablehq.com/@d3/bubble-chart

const GenreBubbleChart = ({ ratings }) => {
  const d3Bubbles = useRef(null)
  const width = window.innerWidth < 700 ? window.innerWidth : window.innerWidth * .6
  const height = window.innerHeight * .9
  
  const [showRatingWeighting, setShowRatingWeighting] = useState(false)
  const [weightedData, setWeightedData] = useState([])
  const [defaultData, setDefaultData] = useState([])
  const [formattedData, setFormattedData] = useState([])

  const handleShowRatingWeighting = () => {
    setShowRatingWeighting(!showRatingWeighting)
  }

  const dod3stuff = useCallback((data) => {
    const pack = data => d3.pack()
      .size([width - 2, height - 2])
      .padding(3)
        (d3.hierarchy({children: data})
        .sum(d => d.value))
        
    const color = d3.scaleOrdinal(data.map(d => d.genre), d3.schemeCategory10)

    const root = pack(data)

    const svg = d3.select(d3Bubbles.current)

    const t = d3.transition().duration(750)

    // Join
    const circle = svg.selectAll('circle')
      .data(root.leaves(), d => d.data.genre)
    const text = svg.selectAll('text')
      .data(root.leaves(), d => d.data.genre)

    // Exit
    circle.exit()
      .attr('fill', d => color(d.data.genre))
      .transition(t)
        .attr('r', 1e-6)
        .remove()

    text.exit()
      .transition(t)
        .style('opacity', 1e-6)
        .remove()

    // Update
    circle
      .transition(t)
        .attr('fill', d => color(d.data.genre))
        .attr('r', d => d.r)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

    text
      .transition(t)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .text(d => d.r > 40 ? d.data.genre : null)
        .style('opacity', 1)

    // Enter
    const c = circle.enter().append('circle')
    c.attr('r', d => 1e-6)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', '#fff')
        .on('mouseover', function(d,i) {
          d3.select(this)
            .attr('fill-opacity', .7)
        })
        .on('mouseout', function(d,i) {
          d3.select(this)
            .attr('fill-opacity', 1)
        })
      .transition(t)
        .attr('fill', d => color(d.data.genre))
        .attr('r', d => d.r)

    c.append('title').text(d => d.data.genre)


    text.enter().append('text')
        .style('opacity', 1e-6)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .text(d => d.r > 40 ? d.data.genre : null)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
      .transition(t)
        .style('opacity', 1)

  }, [height, width])

  useEffect(() => {
    d3.select(d3Bubbles.current).selectAll('*').remove()

    setDefaultData(
      ratings
      .map(obj => obj.movie)
      .reduce((acc, val) => {
        val.genre.forEach(g => {
          if (!acc.map(v => v.genre).includes(g)) {
            acc.push({
              genre: g,
              value: 1
            })
          } else {
            acc.find(obj => obj.genre === g)['value']++
          }
        })
        return acc
      }, [])
    )
    
    setWeightedData( 
      ratings
      .reduce((acc, val) => {
        val.movie.genre.forEach(g => {
          if (!acc.map(v => v.genre).includes(g)) {
            acc.push({
              genre: g,
              value: val.rating ** 5
            })
          } else {
            acc.find(obj => obj.genre === g)['value'] += val.rating ** 5
          }
        })
        return acc
      }, [])
    )
  }, [ratings])

  useEffect(() => {
    setFormattedData(showRatingWeighting ? weightedData : defaultData)
    dod3stuff(formattedData)
  }, [formattedData, dod3stuff, defaultData, showRatingWeighting, weightedData])

  return (
    <div style={{width: width, height: height, border: '1px dashed'}}>
      <h2>Genres</h2>
      <input 
        type="checkbox" 
        checked={showRatingWeighting} 
        id="showRatingWeighting"
        onChange={handleShowRatingWeighting}
      />
      <label htmlFor="showRatingWeighting">Apply Rating Weighting</label>
      <svg 
        className="d3-bubbles"
        width={width}
        height={height}
        ref={d3Bubbles}
      />
    </div>
  )
}

export default GenreBubbleChart