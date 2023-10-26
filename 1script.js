// script.js
const data = [
    { language: 'Telugu', value: 122 },
    { language: 'Spanish', value: 70 },
    { language: 'Korean', value: 56 },
    { language: 'Tamil', value: 43 },
    { language: 'Hindi', value: 34 },
    { language: 'Portuguese', value: 25 },
    { language: 'Russian', value: 18 },
    { language: 'Arabic', value: 14 }
];

const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select('.chart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const y = d3.scaleBand()
    .domain(data.map(d => d.language))
    .range([0, height])
    .padding(0.1);

const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([0, width]);

svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('y', d => y(d.language))
    .attr('x', 0)
    .attr('width', d => x(d.value))
    .attr('height', y.bandwidth())
    .on('mouseover', showTooltip)
    .on('mouseout', hideTooltip);

function showTooltip(d) {
    const tooltip = d3.select('.tooltip');
    tooltip
        .style('display', 'block')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 50) + 'px')
        .html(`<strong>${d.language}</strong>: ${d.value}`);
}

function hideTooltip() {
    const tooltip = d3.select('.tooltip');
    tooltip.style('display', 'none');
}
